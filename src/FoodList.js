function FoodListItem({ item }) {
  return (
    <div className="FoodListItem">
      <div className="FoodListItem-rows">
        <div className="FoodLIstItem-title">메뉴: {item.title}</div>
        <div className="FoodLIstItem-calorie">칼로리: {item.calorie}</div>
        <div className="FoodLIstItem-createdAt">날짜:{item.createdAt}</div>
        <div className="FoodLIstItem-content">내용: {item.content}</div>
      </div>
    </div>
  );
}

function FoodList({ items }) {
  return (
    <div className="FoodList">
      {items.map((item) => (
        <FoodListItem item={item} />
      ))}
    </div>
  );
}

export default FoodList;
