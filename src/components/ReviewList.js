import "./ReviewList.css";
import styled from "styled-components";

const Deletebutton = styled.button`
  color: red;
`;

function ReviewListItem({ review, onDelete }) {
  const { imgUrl, content, title, rating, createdAt } = review;

  function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

  const handleDeleteClick = () => {
    onDelete(review.id);
  };

  return (
    <div className="ReviewListItem-card">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div className="ReviewListItem">
        <div className="title">{title}</div>
        <div className="rating">{rating}</div>
        <div className="createAt">{formatDate(createdAt)}</div>
        <div className="content">{content}</div>
      </div>
      <Deletebutton className="deletebutton" onClick={handleDeleteClick}>
        삭제
      </Deletebutton>
    </div>
  );
}

function ReviewList({ reviews, onDelete }) {
  return (
    <div className="Cards">
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <ReviewListItem review={review} onDelete={onDelete} />
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
