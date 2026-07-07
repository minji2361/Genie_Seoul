import { InterviewShell } from "./InterviewShell";

export const dynamic = "force-dynamic";

export default function InterviewLayout({ children }: { children: React.ReactNode }) {
  return <InterviewShell>{children}</InterviewShell>;
}
