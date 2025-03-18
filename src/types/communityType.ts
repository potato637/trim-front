export interface FreeTalkResponseI {
  freeTalkId: number;
  title: string;
  content: string;
  createdAt: number;
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
  commentCount: number;
}

export interface FreeTalkResultI {
  freeTalkResponseList: FreeTalkItemI[];
  page: number;
  totalPages: number;
}

export interface FreeTalkDataI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: FreeTalkResultI;
}

export interface FreeTalkI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    freeTalkResponse: FreeTalkResponseI;
    memberResponse: MemberResponseI;
  };
}
