export interface CommentAPIResponseI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: CommentI[];
}

export interface CommentI {
  commentResponse: {
    boardID: number;
    content: string;
  };
  memberResponse: {
    memberID: number;
    role: string;
    email: string;
    socialType: string;
    nickname: string;
  };
}
