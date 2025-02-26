export interface KnowledgeResponseI {
  knowledgeId: number;
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

export interface KnowledgeItemI {
  knowledgeResponse: KnowledgeResponseI;
  memberResponse: MemberResponseI;
  likeCount: number;
  answerCount: number;
  tagList: string[];
}

export interface KnowledgeResultI {
  questionResponseList: KnowledgeItemI[];
  page: number;
  totalPages: number;
}

export interface KnowledgeDataI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: KnowledgeResultI;
}
