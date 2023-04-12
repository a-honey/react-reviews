import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useCallback, useState, useEffect } from "react";
import "./App.css";
import logoImg from "../assets/logo.png";
import ticketImg from "../assets/ticket.png";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [reviews, setReviews] = useState([]);

  const sortedReviews = reviews.sort((a, b) => b[order] - a[order]);

  const handleUpdatedAt = () => setOrder("updatedAt");

  const handleRating = () => setOrder("rating");

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setReviews((prevReviews) => prevReviews.filter((review) => review.id ! ==id));
  }

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

  const handleDelete = (id) => {
    const nextReviews = reviews.filter((review) => review.id !== id);
    setReviews(nextReviews);
  };

  const handleSubmitSucess = (review) => {
    setReviews((prevReviews) => [review, ...prevReviews]);
  };

  const handleUpdateSuccess = (review) => {
    setReviews((prevReviews) => {
      const splitIdx = prevReviews.findIndex((item) => (item.id = review.id));
      return [
        ...prevReviews.slice(0, splitIdx),
        review,
        ...prevReviews.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} alt="로고" />
          언어추가
        </div>
      </nav>
      <div className="App-container">
        <div
          className="App-ReviewForm"
          style={{ backgroundImage: `url("${ticketImg})` }}
        >
          <ReviewForm onSubmitSuccess={handleSubmitSucess} />
        </div>
        <div className="App-sorts">
          <button className="AppSortButton" onClick={handleUpdatedAt}>
            최신순
          </button>
          <button className="AppSortButton" onClick={handleRating}>
            베스트순
          </button>
        </div>
      </div>
      <div className="App-ReviewList">
        <ReviewList
          reviews={sortedReviews}
          onDelete={handleDelete}
          onUpdate={updateReview}
          onUpdateSuccess={handleUpdateSuccess}
        />
        더보기버튼 및 언어선택
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">언어선택</div>
      </footer>
    </div>
  );
}

export default App;
