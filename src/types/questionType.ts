export interface QuestionResponseI {
  questionId: number;
  title: string;
  content: string;
  createdAt: string;
  resolveStatus: "UNRESOLVED" | "RESOLVED";
  majorType:
    | "INDUSTRIAL_ENGINEERING"
    | "PHYSICAL_EDUCATION"
    | "FINE_ARTS"
    | "NATURAL_SCIENCES";
}
export interface MemberResponseI {
  memberId: number;
  role: "USER" | "GUEST";
  email: string;
  socialType: "TRIM" | "GOOGLE" | "KAKAO" | "NAVER";
  nickname: string;
}

export interface QuestionItemI {
  questionResponse: QuestionResponseI;
  memberResponse: MemberResponseI;
  likeCount: number;
  answerCount: number;
  tagList: string[];
}

export interface QuestionResultI {
  questionResponseList: QuestionItemI[];
  page: number;
  totalPages: number;
}

export interface QuestionDataI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: QuestionResponseI;
}

export interface InfiniteQuestionDataI {
  pageParams: number[];
  pages: QuestionDataI[];
}
