function FoodListItem({ item }) {
  return (
    <div className="FoodListItem">
      <div className="FoodLIstItem-title">{item.title}</div>
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
