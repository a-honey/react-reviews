const BASE_URL = "https://learn.codeit.kr/5675/foods";

export async function getItems({ order = "", cursor = "", limit = 10 }) {
  const query = `?order=${order}&cursor=${cursor}&limit=${limit}`;
  const items = await fetch(`${BASE_URL}${query}`);
  if (!items) {
    throw new Error("음식을 가져오는데 실패했습니다.");
  }
  const reviews = await items.json();
  const body = reviews;

  return body;
}
