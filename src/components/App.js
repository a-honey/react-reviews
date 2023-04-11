import { getReviews } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useState, useEffect } from "react";
import ticketImg from "../assets/ticket.png";
import "./App.css";
import logoImg from "../assets/logo.png";

function App() {
  const [order, setOrder] = useState("createdAt");
  const [reviews, setReviews] = useState([]);

  const sortedReviews = reviews.sort((a, b) => b[order] - a[order]);

  const handleUpdatedAt = () => setOrder("updatedAt");
  const handleRating = () => setOrder("rating");

  const handleLoad = async () => {
    const { reviews } = await getReviews();
    setReviews(reviews);
  };

  const handleDelete = (id) => {
    const nextReviews = reviews.filter((review) => review.id !== id);
    setReviews(nextReviews);
  };

  const handleSubmitSucess = (review) => {
    setReviews((prevReviews) => [review, ...prevReviews]);
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
        <ReviewList reviews={sortedReviews} onDelete={handleDelete} />
        더보기버튼 및 언어선택
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">언어선택</div>
      </footer>
    </div>
  );
}

export default App;
