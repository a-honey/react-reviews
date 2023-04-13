const BASE_URL = "https://learn.codeit.kr/5675/film-reviews";

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 3,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}?${query}`);
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
  const body = await response.json();
  return body;
}

export async function deleteReview(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response) {
    throw new Error("리뷰를 삭제하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
