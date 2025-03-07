export function formatDate(createdAt: number): string {
  const now = Date.now();
  const secondsAgo = Math.floor((now - createdAt) / 1000);
  if (secondsAgo < 0) return "방금 전";
  if (secondsAgo < 60) return `${secondsAgo}초 전`;
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo}분 전`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}시간 전`;
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) return `${daysAgo}일 전`;
  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo < 4) return `${weeksAgo}주 전`;
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) return `${monthsAgo}개월 전`;
  const yearsAgo = Math.floor(daysAgo / 365);
  return `${yearsAgo}년 전`;
}
