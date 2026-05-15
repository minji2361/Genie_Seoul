export interface Question {
    id: string;
    text: string;
}

export interface TestResult {
    name: string;
    birthdate: string;
    scores: { [key: string]: number };
}
