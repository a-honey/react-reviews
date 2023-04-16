import { useEffect, useState } from "react";
import { createItem, deleteItem, getItems, updateItem } from "../api";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";

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

  const handleCreateSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSuccess = (food) => {
    setItems((prevItems) => {
      const splixId = prevItems.findIndex((item) => item.id === food.id);
      return [
        ...prevItems.slice(0, splixId),
        food,
        ...prevItems.slice(splixId + 1),
      ];
    });
  };
  useEffect(() => {
    handleLoad({ order });
  }, [order]);

  return (
    <div className="App">
      <header className="App-header"></header>
      <FoodForm
        className="App-foodform"
        onSubmit={createItem}
        onSubmitSuccess={handleCreateSuccess}
      />

      <div className="App-button">
        <button onClick={hanldeCalorieOrder}>칼로리높은순</button>
        <button onClick={hanldeCreatedAtOrder}>최신순</button>
      </div>
      <div className="App-listbody">
        <FoodList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateItem}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {cursor && <button onClick={handleLoadMore}>더보기</button>}
      </div>
    </div>
  );
}

export default App;
