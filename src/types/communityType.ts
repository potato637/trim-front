export interface FreeTalkResponseI {
  freeTalkId: number;
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

export interface FreeTalkItemI {
  freeTalkResponse: FreeTalkResponseI;
  memberResponse: MemberResponseI;
  likeCount: number;
  answerCount: number;
  tagList: string[];
}

export interface FreeTalkResultI {
  questionResponseList: FreeTalkItemI[];
  page: number;
  totalPages: number;
}

export interface FreeTalkDataI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: FreeTalkResultI;
}
