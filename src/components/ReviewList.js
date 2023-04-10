import "./ReviewList.css";

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
    <div className="ReviewListItem" key={review.id}>
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div className="ReviewListItem-rows">
        <h1 className="ReviewListItem-title">{title}</h1>
        <p className="ReviewListItem-rating">{rating}</p>
        <p className="ReviewListItem-date">{formatDate(createdAt)}</p>
        <p className="ReviewListItem-content">{content}</p>
        <div className="ReviewListItem-buttons">
          <button
            className="ReviewListItem-delete-button"
            onClick={handleDeleteClick}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ reviews, onDelete }) {
  return (
    <div className="ReviewList">
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
