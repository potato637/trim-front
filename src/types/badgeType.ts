export interface BadgeResponse {
  badgeId: number;
  badgeContent: string;
  level: number;
  badgeTitle: string;
  goal: number;
}

export interface BadgeListResponse {
  badgeResponse: BadgeResponse;
  missionStatus: "IN_PROGRESS" | "LOCK" | "SUCCESS";
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
