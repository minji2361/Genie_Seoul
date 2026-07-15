import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { isAuthenticated } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";

const INTERVIEW_FIELDS = [
  "name",
  "age",
  "gender",
  "mbti",
  "region",
  "hobby",
  "dream",
  "major_job",
  "schedule",
  "q1_why_qa",
  "q2_current_interest",
  "q3_one_hour_wish",
  "q4_what_tires",
  "q5_energy_focus",
  "q6_what_lacking",
  "q7_local_taste",
  "q8_ideal_day",
  "q9_needed_gathering",
  "q10_life_priority",
  "q11_one_wish",
  "q12_interview_thoughts",
  "signatureurl",
] as const;

type InterviewField = (typeof INTERVIEW_FIELDS)[number];

const SURVEY_ARRAY_FIELDS = ["event_types", "meeting_times", "oneday_classes", "clubs"] as const;

function pickInterviewPayload(body: Record<string, unknown>) {
  const payload: Partial<Record<InterviewField, string>> = {};

  for (const field of INTERVIEW_FIELDS) {
    const value = body[field];
    if (typeof value === "string") {
      payload[field] = value;
    }
  }

  return payload;
}

function pickSurveyPayload(body: Record<string, unknown>) {
  const survey: Record<string, string[] | string> = {};

  for (const field of SURVEY_ARRAY_FIELDS) {
    const value = body[field];
    survey[field] = Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  }

  survey.event_types_etc =
    typeof body["event_types_etc"] === "string" ? (body["event_types_etc"] as string) : "";
  survey.oneday_classes_etc =
    typeof body["oneday_classes_etc"] === "string" ? (body["oneday_classes_etc"] as string) : "";
  survey.clubs_etc = typeof body["clubs_etc"] === "string" ? (body["clubs_etc"] as string) : "";

  return survey;
}

async function getCounselorId() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    return { counselorId: null, error: "Supabase 로그인 세션이 없습니다. 로그아웃 후 다시 로그인해 주세요." };
  }

  return { counselorId: session.user.id, error: null };
}

export async function GET() {
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { counselorId, error: sessionError } = await getCounselorId();
  if (!counselorId) {
    return NextResponse.json({ error: sessionError }, { status: 401 });
  }

  const admin = createAdminClient();
  const supabase = admin ?? createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("int_interviews")
    .select("*")
    .eq("counselors", counselorId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const payload = pickInterviewPayload(body as Record<string, unknown>);
  const surveyPayload = pickSurveyPayload(body as Record<string, unknown>);
  const required = ["name", "age", "gender", "mbti", "region"] as const;

  for (const field of required) {
    if (!payload[field]?.trim()) {
      return NextResponse.json({ error: `필수 항목이 누락되었습니다: ${field}` }, { status: 400 });
    }
  }

  const { counselorId, error: sessionError } = await getCounselorId();
  if (!counselorId) {
    return NextResponse.json({ error: sessionError }, { status: 401 });
  }

  const admin = createAdminClient();
  const supabase = admin ?? createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("int_interviews")
    .insert([
      {
        ...payload,
        hobby: payload.hobby ?? "",
        dream: payload.dream ?? "",
        major_job: payload.major_job ?? "",
        schedule: payload.schedule ?? "",
        q1_why_qa: payload.q1_why_qa ?? "",
        q2_current_interest: payload.q2_current_interest ?? "",
        q3_one_hour_wish: payload.q3_one_hour_wish ?? "",
        q4_what_tires: payload.q4_what_tires ?? "",
        q5_energy_focus: payload.q5_energy_focus ?? "",
        q6_what_lacking: payload.q6_what_lacking ?? "",
        q7_local_taste: payload.q7_local_taste ?? "",
        q8_ideal_day: payload.q8_ideal_day ?? "",
        q9_needed_gathering: payload.q9_needed_gathering ?? "",
        q10_life_priority: payload.q10_life_priority ?? "",
        q11_one_wish: payload.q11_one_wish ?? "",
        q12_interview_thoughts: payload.q12_interview_thoughts ?? "",
        signatureurl: payload.signatureurl ?? "",
        ...surveyPayload,
        counselors: counselorId,
      },
    ])
    .select()
    .single();

  if (error) {
    const isRls = error.code === "42501" || error.message.includes("row-level security");
    return NextResponse.json(
      {
        error: isRls
          ? "DB 권한 오류입니다. Supabase SQL Editor에서 supabase/policies-int-interviews.sql 을 실행하거나 .env.local 에 SUPABASE_SERVICE_ROLE_KEY 를 추가해 주세요."
          : error.message,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ data });
}
