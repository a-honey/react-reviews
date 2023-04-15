import { useEffect, useState } from "react";
import { getItems } from "./api";
import FoodList from "./FoodList";

function App() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const { foods } = await getItems();
    setItems(foods);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-listbody">
        <FoodList items={items} />
      </div>
    </div>
  );
}

export default App;
