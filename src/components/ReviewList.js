import "./ReviewList.css";

function ReviewListItem({ item, onDelete }) {
  function formatDate(value) {
    const date = new Date(value);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

  const handleDeleteClick = () => onDelete(item.id);

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
        <div className="ReviewListItem-button">
          <button
            className="ReviewListItem-deletebutton"
            onClick={handleDeleteClick}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete }) {
  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} />
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
