import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useState, useEffect } from "react";

function App() {
  const [reviews, setReviews] = useState([]);

  const handleLoad = async () => {
    const { reviews } = await getReviews();
    setReviews(reviews);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default App;
