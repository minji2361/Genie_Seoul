export type CategoryKey = "geniering" | "genius" | "genieday" | "genieclub" | "lightning";

export interface Category {
  key: CategoryKey;
  nameKr: string;
  nameEn: string;
  desc: string;
  tags: string[];
  color: "white" | "black" | "yellow";
  icon: string;
}

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryKey;
  categoryLabel: string;
  date: string;
  status: "모집중" | "진행중" | "마감임박" | "종료";
  isFeatured?: boolean;
  description: string;
  capacity: number;
  location: string;
  price: string;
  tags: string[];
}

export interface HistoryItem {
  period: string;
  events: string[];
}

export interface FormData {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export interface Review {
  id: string;
  name: string;
  age: number;
  program: string;
  content: string;
  rating: number;
}

export interface FAQ {
  q: string;
  a: string;
}
