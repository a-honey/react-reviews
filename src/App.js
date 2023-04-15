import { useEffect, useState } from "react";
import { deleteItem, getItems } from "./api";
import FoodList from "./FoodList";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState(null);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const hanldeCreatedAtOrder = () => setOrder("createdAt");
  const hanldeCalorieOrder = () => setOrder("calorie");

  const handleLoad = async (options) => {
    const response = await getItems(options);
    if (!response) return;
    const { foods, paging } = response;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(paging.nextCursor);
  };

  const handleLoadMore = async () => await handleLoad({ order, cursor });

  const handleDelete = async (id) => {
    const response = await deleteItem(id);
    if (!response) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    handleLoad({ order });
  }, [order]);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-button">
        <button onClick={hanldeCalorieOrder}>칼로리높은순</button>
        <button onClick={hanldeCreatedAtOrder}>최신순</button>
      </div>
      <div className="App-listbody">
        <FoodList items={sortedItems} onDelete={handleDelete} />
        {cursor && <button onClick={handleLoadMore}>더보기</button>}
      </div>
    </div>
  );
}

export default App;
