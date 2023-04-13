import "./ReviewList.css";
import { useState } from "react";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function ReviewListItem({ review, onDelete, onEdit }) {
  const { imgUrl, content, title, rating, createdAt } = review;

  const handleDeleteClick = () => {
    onDelete(review.id);
  };

  const handleEditClick = () => {
    onEdit(review.id);
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
            className="ReviewListItem-edit-button"
            onClick={handleEditClick}
          >
            수정
          </button>
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

function ReviewList({ reviews, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);
  return (
    <div className="ReviewList">
      {reviews.map((review) => {
        if (review.id === editingId) {
          const { id, imgUrl, title, rating, content } = review;
          const initialValues = { title, rating, content, imgUrl: null };

          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };

          return (
            <div key={review.id}>
              <ReviewListItem
                initialValues={initialValues}
                initialPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </div>
          );
        }
        return (
          <div key={review.id}>
            <ReviewListItem
              review={review}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ReviewList;
