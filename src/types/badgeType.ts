export interface BadgeResponse {
  badgeId: number;
  badgeContent: string;
  level: number;
  badgeTitle: string;
  goal: number;
}

export interface BadgeListResponse {
  badgeResponse: BadgeResponse;
  missionStatus: "IN_PROGRESS" | "LOCKED" | "SUCCESS" | "GETTO";
  description: string;
}

export interface BadgeList {
  isSuccess: boolean;
  code: number;
  message: string;
  result: BadgeListResponse[];
}

export interface MyBadge {
  isSuccess: boolean;
  code: number;
  message: string;
  result: BadgeListResponse[];
}

export type MissionType =
  | "WRITE_QUESTION"
  | "WRITE_ANSWER"
  | "WRITE_KNOWLEDGE"
  | "WRITE_FREE_TALK"
  | "WRITE_COMMENT";
