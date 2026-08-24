"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type SessionRole = "coach" | "admin";

type AuthContextType = {
  isAuthenticated: boolean;
  role: SessionRole | null;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<SessionRole | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      setIsAuthenticated(Boolean(data.authenticated));
      setRole(data.role === "admin" || data.role === "coach" ? data.role : null);
    } catch {
      setIsAuthenticated(false);
      setRole(null);
    }
  }, []);

  useEffect(() => {
    refreshAuth();

    // 페이지 이동 없이 한 화면에 오래 머물러도 세션이 끊기지 않도록
    // 주기적으로 /api/auth/me 를 호출해 슬라이딩 세션을 갱신한다.
    const heartbeat = setInterval(refreshAuth, 5 * 60 * 1000);
    return () => clearInterval(heartbeat);
  }, [refreshAuth]);

  const login = async (id: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error ?? "로그인에 실패했습니다.");
    }

    if (data.supabaseConnected === false) {
      const detail = data.supabaseError ? `\n\n${data.supabaseError}` : "";
      const guidance =
        data.role === "admin"
          ? "Supabase에 관리자 계정을 등록한 뒤 다시 로그인해 주세요."
          : "서명 업로드·대상자 등록을 쓰려면 Supabase에 코치 계정을 등록한 뒤 다시 로그인해 주세요.";
      alert(`사이트 로그인은 되었지만 Supabase 연결에 실패했습니다. ${guidance}${detail}`);
    }

    await refreshAuth();
    router.replace("/");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setIsAuthenticated(false);
    setRole(null);
    if (
      pathname?.startsWith("/dashboard") ||
      pathname?.startsWith("/interview") ||
      pathname?.startsWith("/admin")
    ) {
      router.replace("/login");
    } else {
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
