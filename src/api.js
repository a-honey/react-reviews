const BASE_URL = "https://learn.codeit.kr/5675/film-reviews";

export async function getReviews() {
  const response = await fetch(BASE_URL);
  if (!response) {
    throw new Error("리뷰를 가져오는데 실패하였습니다.");
  }
  const result = await response.json();

  return result;
}

export async function createReview(dataform) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: dataform,
  });

  if (!response.ok) {
    throw new Error("리뷰를 생성하는데 실패했습니다.");
  }

  const result = await response.json();

  return result;
}
