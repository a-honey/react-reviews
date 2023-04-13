import { useEffect, useState } from "react";
import { deleteReview, createReview, getReviews } from "../api";
import ReviewList from "./ReviewList";
import logoimg from "../assets/logo.png";
import "./App.css";
import ReviewForm from "./ReviewForm";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sorteditems = items.sort((a, b) => b[order] - a[order]);

  const handleLoad = async () => {
    const { reviews } = await getReviews();
    setItems(reviews);
  };

  const handleCreatedAtOrder = () => setOrder("createdAt");

  const handleRatingOrder = () => setOrder("rating");

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    handleLoad();
  }, [order]);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logoimg} alt="logo" />
      </header>
      <ReviewForm
        onSubmit={createReview}
        onSubmitSuccess={handleCreateSuccess}
      />
      <div className="app-body">
        <div className="app-nav">
          <button
            className="app-nav-button createdAt"
            onClick={handleCreatedAtOrder}
          >
            최신순
          </button>
          <button className="app-nav-button rating" onClick={handleRatingOrder}>
            별점순
          </button>
        </div>
        <ReviewList
          className="ReviewList"
          items={sorteditems}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
