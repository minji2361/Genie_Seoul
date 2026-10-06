import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";
import { CLUBS, EVENT_TYPES, MEETING_TIMES, ONEDAY_CLASSES } from "@/app/interview/surveyConfig";

type TypeFilter = "all" | "adult" | "college" | "legacy";

const AGE_GROUPS = ["10대", "20대 초반", "20대 중반", "20대 후반", "30대", "40대 이상", "미상"] as const;
const GENDERS = ["여성", "남성", "기타/미상"] as const;
const MBTI_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ", "미상",
] as const;

const ETC = "기타";

const SURVEY = {
  event_types: { label: "행사 유형", options: [...EVENT_TYPES, ETC], etcKey: "event_types_etc" },
  meeting_times: { label: "모임 시간대", options: [...MEETING_TIMES], etcKey: null },
  oneday_classes: { label: "원데이클래스", options: [...ONEDAY_CLASSES, ETC], etcKey: "oneday_classes_etc" },
  clubs: { label: "동아리", options: [...CLUBS, ETC], etcKey: "clubs_etc" },
} as const;

type SurveyKey = keyof typeof SURVEY;
type DimensionKey = "age" | "gender" | "mbti";

type Row = Record<string, unknown>;

function toAgeGroup(raw: unknown): string {
  const n = parseInt(String(raw ?? "").replace(/[^0-9]/g, ""), 10);
  if (!Number.isFinite(n) || n <= 0) return "미상";
  if (n < 20) return "10대";
  if (n <= 23) return "20대 초반";
  if (n <= 26) return "20대 중반";
  if (n <= 29) return "20대 후반";
  if (n < 40) return "30대";
  return "40대 이상";
}

function toGender(raw: unknown): string {
  const v = String(raw ?? "").trim();
  if (/여/.test(v) || /^f/i.test(v)) return "여성";
  if (/남/.test(v) || /^m/i.test(v)) return "남성";
  return "기타/미상";
}

function toMbti(raw: unknown): string {
  const v = String(raw ?? "").trim().toUpperCase();
  const match = v.match(/[EI][NS][TF][JP]/);
  return match ? match[0] : "미상";
}

function selectedOptions(row: Row, key: SurveyKey): string[] {
  const def = SURVEY[key];
  const value = row[key];
  const picked = Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
  const known = picked.filter((v) => (def.options as readonly string[]).includes(v));
  if (def.etcKey && typeof row[def.etcKey] === "string" && (row[def.etcKey] as string).trim()) {
    known.push(ETC);
  }
  return Array.from(new Set(known));
}

function countBy(values: string[], order: readonly string[]) {
  const map = new Map<string, number>(order.map((k) => [k, 0]));
  for (const v of values) map.set(v, (map.get(v) ?? 0) + 1);
  return order.map((label) => ({ label, count: map.get(label) ?? 0 }));
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다." }, { status: 500 });
  }

  const typeParam = new URL(request.url).searchParams.get("type");
  const type: TypeFilter =
    typeParam === "adult" || typeParam === "college" || typeParam === "legacy" ? typeParam : "all";

  const { data, error } = await admin
    .from("int_interviews")
    .select(
      "interview_type, age, gender, mbti, event_types, event_types_etc, meeting_times, oneday_classes, oneday_classes_etc, clubs, clubs_etc",
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const allRows = (data ?? []) as Row[];
  const typeOf = (r: Row) => (r.interview_type === "adult" || r.interview_type === "college" ? r.interview_type : "legacy");
  const typeCounts = {
    adult: allRows.filter((r) => typeOf(r) === "adult").length,
    college: allRows.filter((r) => typeOf(r) === "college").length,
    legacy: allRows.filter((r) => typeOf(r) === "legacy").length,
  };
  const rows = allRows.filter((r) => type === "all" || typeOf(r) === type);

  const dimensions: Record<DimensionKey, { order: readonly string[]; of: (r: Row) => string }> = {
    age: { order: AGE_GROUPS, of: (r) => toAgeGroup(r.age) },
    gender: { order: GENDERS, of: (r) => toGender(r.gender) },
    mbti: { order: MBTI_TYPES, of: (r) => toMbti(r.mbti) },
  };

  const distribution = Object.fromEntries(
    (Object.keys(dimensions) as DimensionKey[]).map((d) => [
      d,
      countBy(rows.map(dimensions[d].of), dimensions[d].order),
    ]),
  );

  const surveyKeys = Object.keys(SURVEY) as SurveyKey[];

  const totals = Object.fromEntries(
    surveyKeys.map((k) => [
      k,
      countBy(rows.flatMap((r) => selectedOptions(r, k)), SURVEY[k].options),
    ]),
  );

  // crosstab[dimension][survey] = { options, rows: [{ group, n, counts: number[] }] }
  const crosstab = Object.fromEntries(
    (Object.keys(dimensions) as DimensionKey[]).map((d) => [
      d,
      Object.fromEntries(
        surveyKeys.map((k) => {
          const options = SURVEY[k].options;
          const groups = dimensions[d].order.map((group) => {
            const members = rows.filter((r) => dimensions[d].of(r) === group);
            const counts = options.map(
              (opt) => members.filter((r) => selectedOptions(r, k).includes(opt)).length,
            );
            return { group, n: members.length, counts };
          });
          return [k, { options, rows: groups.filter((g) => g.n > 0) }];
        }),
      ),
    ]),
  );

  return NextResponse.json({
    data: {
      type,
      total: rows.length,
      typeCounts,
      surveyLabels: Object.fromEntries(surveyKeys.map((k) => [k, SURVEY[k].label])),
      distribution,
      totals,
      crosstab,
    },
  });
}
