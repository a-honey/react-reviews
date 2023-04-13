import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useCallback, useState, useEffect } from "react";
import useAsync from "../hooks/useAsync";
import "./App.css";
import logoImg from "../assets/logo.png";
import ticketImg from "../assets/ticket.png";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false); //더 가져올 페이지 있는지 상태
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  //getReviews 함수를 실행하고, isLoading과 loadingError 상태 반환
  const [reviews, setReviews] = useState([]);

  const sortedReviews = reviews.sort((a, b) => b[order] - a[order]); //reviews를 오름차순으로

  const handleUpdatedAt = () => setOrder("updatedAt"); //order 상태 updateAt으로 바꾸기
  const handleRating = () => setOrder("rating"); //order상태 rating으로 바꾸기

  const handleDelete = async (id) => {
    const result = await deleteReview(id); //받은 id삭제하기
    if (!result) return;

    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    ); //해당 id 제외하고 렌더링
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options); //getReview의 상태 반환하는 함수
      if (!result) return;

      const { paging, reviews } = result;
      if (options.offset === 0) {
        setReviews(reviews); //result의 reviews 다 보여줌
      } else {
        setReviews((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + options.limit);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setReviews((prevItems) => [review, ...prevItems]);
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
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

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
          <ReviewForm
            onSubmit={createReview}
            onSubmitSuccess={handleCreateSuccess}
          />
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
        {hasNext ? (
          <button
            className="App-load-more-button"
            disabled={isLoading}
            onClick={handleLoadMore}
          >
            더보기언어
          </button>
        ) : (
          <div className="App-load-more-button" />
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">언어선택</div>
      </footer>
    </div>
  );
}

export default App;
