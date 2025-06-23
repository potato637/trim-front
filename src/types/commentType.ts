export interface CommentAPIResponseI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: CommentI[];
}

export interface CommentI {
  commentResponse: {
    boardId: number;
    commentId: number;
    content: string;
  };
  memberResponse: {
    memberId: number;
    role: string;
    email: string;
    socialType: string;
    nickname: string;
  };
  storedAvatarResponse: AvatarResponseI;
}

export interface ReResultI {
  replyResponse: {
    replyId: number;
    content: string;
    createdAt: number;
  };
  memberResponse: {
    memberId: number;
    role: string;
    email: string;
    socialType: string;
    nickname: string;
  };
  storedAvatarResponse: AvatarResponseI;
}

export interface AvatarResponseI {
  backgroundColor: string;
  mouthForURL: string;
  eyesForURL: string;
  clothForURL: string;
  hairForURL: string;
}

export interface ReCommentI {
  isSuccess: boolean;
  code: number;
  message: string;
  result: ReResultI[];
}
