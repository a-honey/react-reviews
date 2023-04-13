import { useCallback, useEffect, useState } from "react";
import { deleteReview, createReview, getReviews } from "../api";
import ReviewList from "./ReviewList";
import logoimg from "../assets/logo.png";
import "./App.css";
import ReviewForm from "./ReviewForm";
import useAsync from "../hooks/useAsync";

const LIMIT = 3;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  const [hasNext, setHasNext] = useState(false);

  const sorteditems = items.sort((a, b) => b[order] - a[order]);

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options);
      if (!result) return;

      const { paging, reviews } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + options.limit);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });
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
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

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
      <div className="app-more-button-wrap">
        {hasNext ? (
          <button
            className="app-more-button"
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            더보기
          </button>
        ) : (
          <div className="app-more-button" />
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </div>
  );
}

export default App;
