function FoodListItem({ item, onDelete }) {
  const handleDeleteClick = () => onDelete(item.id);
  return (
    <div className="FoodListItem">
      <div className="FoodListItem-rows">
        <div className="FoodLIstItem-title">메뉴: {item.title}</div>
        <div className="FoodLIstItem-calorie">칼로리: {item.calorie}</div>
        <div className="FoodLIstItem-createdAt">날짜:{item.createdAt}</div>
        <div className="FoodLIstItem-content">내용: {item.content}</div>
      </div>
      <div className="FoodListItem-button">
        <button
          className="FoodListItem-delete-button"
          onClick={handleDeleteClick}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  return (
    <div className="FoodList">
      {items.map((item) => (
        <FoodListItem item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default FoodList;
