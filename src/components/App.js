import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useState, useEffect } from "react";
import styled from "styled-components";

const SortUpdate = styled.button`
  background-color: black;
  width: 150px;
  height: 70px;
  padding: 10px;
  margin: 30px 5px 5px;
  color: white;
  border-radius: 10px;
  font-size: 20px;
  font-family: sans-serif;
  position: relative;
  top: 20px;
`;

function App() {
  const [reviews, setReviews] = useState([]);
  const [order, setOrder] = useState("createdAt");

  const sortedReviews = reviews.sort((a, b) => b[order] - a[order]);

  const handleUpdatedAt = () => setOrder("updatedAt");
  const handleRating = () => setOrder("rating");
  const handleLoad = async () => {
    const { reviews } = await getReviews();
    setReviews(reviews);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <div>
        <SortUpdate className="sortUpdate" onClick={handleUpdatedAt}>
          최신순
        </SortUpdate>
        <SortUpdate className="sortRating" onClick={handleRating}>
          베스트순
        </SortUpdate>
      </div>

      <ReviewList reviews={sortedReviews} />
    </div>
  );
}

export default App;
