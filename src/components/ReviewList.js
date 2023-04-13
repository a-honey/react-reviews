import "./ReviewList.css";

function ReviewListItem({ item }) {
  function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div className="ReviewListItem-box">
        <div className="ReviewListItem-title">{item.title}</div>
        <div className="ReviewListITem-rating">{item.rating}</div>
        <div className="ReviewListItem-createdAt">
          {formatDate(item.createdAt)}
        </div>
        <div className="ReviewListItem-content">{item.content}</div>
      </div>
    </div>
  );
}

function ReviewList({ items }) {
  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <ReviewListItem item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
