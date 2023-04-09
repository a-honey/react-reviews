import "./ReviewList.css";

function ReviewListItem({ review }) {
  const { imgUrl, content, title, rating, createdAt } = review;

  function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

  return (
    <div className="ReviewListItem-card">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div className="ReviewListItem">
        <div className="title">{title}</div>
        <div className="rating">{rating}</div>
        <div className="createAt">{formatDate(createdAt)}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  );
}

function ReviewList({ reviews }) {
  return (
    <div className="Cards">
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <ReviewListItem review={review} />
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
