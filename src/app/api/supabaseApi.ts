import { supabase } from "@/app/lib/supabase";
import { Session } from '@supabase/auth-helpers-nextjs';

export const getSession = async (): Promise<Session | null> => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('getSession error:', error.message);
        return null;
    }
    return data.session;
};
export const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
    return await supabase.auth.signOut();
};

export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange(callback);
};

export const saveCoreEmotionTest = async (participantId: string, answers: Record<number, string[]>) => {
    return await supabase.from('core_emotion_tests').insert([
        {
            participant_id: participantId,
            answers,
            created_at: new Date().toISOString(),
        },
    ]);
};

export const savePersonalityTest = async (participantId: string, answers: Record<string, number>) => {
    return await supabase.from('personality_tests').insert([
        {
            participant_id: participantId,
            answers,
        },
    ]);
};
export const savePersonalityTest2 = async (participantId: string, answers: Record<string, number>) => {
    return await supabase.from('personality_tests2').insert([
        {
            participant_id: participantId,
            answers,
        },
    ]);
};

export const saveAttachmentTest = async (participantId: string, answers: Record<string, number>) => {
    return await supabase.from('attachment_tests').insert([
        {
            participant_id: participantId,
            answers,
        },
    ]);
};
export const getParticipants = async () => {
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('유저 정보 오류:', userError);
        return { data: [], error: userError };
    }

    const { data, error } = await supabase
        .from('participant')
        .select('*')
        .eq('counselors', user.id)
        .order('created_at', { ascending: false }); // 최신순 정렬 추가

    return { data, error };
};

export const addNewParticipant = async (participant: {
    name: string;
    birth_date: string;
    stress: string;
    religion: string;
    signatureurl: string;
    counselorId: string;
}) => {
    const { counselorId, ...rest } = participant;

    const { data, error } = await supabase
        .from('participant')
        .insert([{ ...rest, counselors: counselorId }])
        .select();

    return { data, error };
};
export async function getCoreEmotionTestResult(participantId: string) {
    const { data, error } = await supabase
        .from('core_emotion_tests')
        .select('*')
        .eq('participant_id', participantId)
        .limit(1)
        .single();
    if (error && error.code === 'PGRST116') {
        return { data: null, error: null };
    }
    return { data, error };
}

export const createCounselorAccount = async (email: string, password: string, name: string, region: string) => {
    const res = await fetch('/api/create-counselor', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, region }),
    });

    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message || '상담사 생성 실패');
    }
    return result;
};

export const uploadSignature = async (dataUrl: string, fileName: string) => {
    const res = await fetch("/api/participant/upload-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ dataUrl, fileName }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        return {
            url: null,
            error: { message: data.error ?? "서명 업로드에 실패했습니다." },
        };
    }

    return { url: data.url as string, error: null };
};
export async function deleteParticipant(id: string) {
    return await supabase.from('participant').delete().eq('id', id);
}

export type GenieInterview = {
    id: string;
    counselors: string;
    name: string;
    age: string;
    gender: string;
    mbti: string;
    region: string;
    hobby: string;
    dream: string;
    q1_why_qa: string;
    q2_current_interest: string;
    q3_one_hour_wish: string;
    q4_what_tires: string;
    q5_energy_focus: string;
    q6_what_lacking: string;
    q7_local_taste: string;
    q8_ideal_day: string;
    q9_needed_gathering: string;
    q10_life_priority: string;
    q11_one_wish: string;
    q12_interview_thoughts: string;
    event_types: string[];
    event_types_etc: string;
    meeting_times: string[];
    oneday_classes: string[];
    clubs: string[];
    signatureurl: string;
    created_at: string;
};

export const getGenieInterviews = async () => {
    const res = await fetch('/api/interview', { credentials: 'include' });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        return { data: [], error: { message: json.error ?? '인터뷰 목록을 불러오지 못했습니다.' } };
    }

    return { data: json.data ?? [], error: null };
};

export const getGenieInterviewById = async (id: string) => {
    const res = await fetch(`/api/interview/${id}`, { credentials: 'include' });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        return { data: null, error: { message: json.error ?? '인터뷰를 불러오지 못했습니다.' } };
    }

    return { data: json.data ?? null, error: null };
};

export const addGenieInterview = async (
    interview: Omit<GenieInterview, 'id' | 'created_at' | 'counselors' | 'signatureurl'> & {
        signatureurl: string;
        counselorId: string;
    },
) => {
    const { counselorId: _counselorId, ...rest } = interview;

    const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(rest),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        return { data: null, error: { message: json.error ?? '인터뷰 등록에 실패했습니다.' } };
    }

    return { data: json.data, error: null };
};

export async function deleteGenieInterview(id: string) {
    const res = await fetch(`/api/interview/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
        return { error: { message: json.error ?? '삭제에 실패했습니다.' } };
    }

    return { error: null };
}
