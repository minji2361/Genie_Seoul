"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/** 클라이언트 컴포넌트용 Supabase (genie 프로젝트와 동일 패턴) */
export const supabase = createClientComponentClient();
