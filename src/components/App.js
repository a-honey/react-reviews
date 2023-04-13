import { useEffect, useState } from "react";
import { getReviews } from "../api";
import ReviewList from "./ReviewList";

function App() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const { reviews } = await getReviews();
    setItems(reviews);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="App">
      <ReviewList items={items} />
    </div>
  );
}

export default App;
