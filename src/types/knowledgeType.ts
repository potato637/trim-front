export interface KnowledgeResponseI {
  knowledgeId: number;
  title: string;
  content: string;
  createdAt: number;
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

export interface AvatarResponseI {
  backgroundColor: string;
  mouthForURL: string;
  eyesForURL: string;
  clothForURL: string;
  hairForURL: string;
}

export interface KnowledgeItemI {
  knowledgeResponse: KnowledgeResponseI;
  memberResponse: MemberResponseI;
  storedAvatarResponse: AvatarResponseI;
  likeCount: number;
  commentCount: number;
  tagList: string[];
}

export interface KnowledgeResultI {
  knowledgeResponseList: KnowledgeItemI[];
  page: number;
  totalPages: number;
}

export interface KnowledgeDataI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: KnowledgeResultI;
}

export interface KnowledgeI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    knowledgeResponse: KnowledgeResponseI;
    memberResponse: MemberResponseI;
    storedAvatarResponse: AvatarResponseI;
    commentResponses: [];
    tags: string[];
  };
}
