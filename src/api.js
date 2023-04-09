const BASE_URL = "https://learn.codeit.kr/5675"; //codeit 제공 서버 URL

export async function getReviews() {
  const response = await fetch(`${BASE_URL}/film-reviews`);
  if (!response) {
    throw new Error("리뷰를 불러오는데 실패하였습니다.");
  }
  const body = await response.json();
  return body;
}