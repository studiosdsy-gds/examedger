
export type ExamStatus = 'DONE' | 'POSTPONED' | 'UPCOMING' | 'OPEN';

export interface ExamDateInfo {
  registrationStart: string;
  registrationEnd: string;
  admitCardDate: string;
  examDate: string;
  resultDate: string;
}

export interface GuideLink {
  title: string;
  url: string;
  source: string;
}

export interface NewsItem {
  title: string;
  date: string;
  source: string;
  url?: string;
}

export interface ProminentLink {
  title: string;
  url: string;
}

export interface CommunityPost {
  user: string;
  role: string;
  tip: string;
  verified: boolean;
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  status: ExamStatus;
  type: string;
  description: string;
  dates: ExamDateInfo;
  requirements: string[];
  dos: string[];
  donts: string[];
  dressCode: string;
  thingsToCarry: string[];
  redditSummary: string;
  officialWebsite: string;
  toolRecommendation: string[];
  fileSizeLimit: string;
  mode: string;
  totalMarks: number;
  duration: string;
  guides: GuideLink[];
  news: NewsItem[];
  prominentLinks: ProminentLink[];
  communityPosts: CommunityPost[];
}

export interface UserStats {
  accuracy: number;
  testsCompleted: number;
  rank: number;
  studyHours: number[];
  labels: string[];
}
