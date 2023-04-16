const BASE_URL = "https://learn.codeit.kr/5675/foods";

export async function getItems({ order = "", cursor = "", limit = 10 }) {
  const query = `?order=${order}&cursor=${cursor}&limit=${limit}`;
  const items = await fetch(`${BASE_URL}${query}`);
  if (!items) {
    throw new Error("음식을 가져오는데 실패했습니다.");
  }
  const foods = await items.json();
  const body = foods;

  return body;
}

export async function deleteItem(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("음식을 삭제하는데 실패했습니다.");
  }
  const foods = await response.json();

  return foods;
}

export async function createItem(formData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 추가하는데 실패했습니다");
  }
  const food = await response.json();
  return food;
}

export async function updateItem(id, formData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 수정하는데 실패했습니다");
  }
  const food = await response.json();
  return food;
}
