import { useState } from "react";
import FoodForm from "./FoodForm";
import useTranslate from "../hooks/useTranslate";
import "./FoodList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}년 ${date.getMonth() - 1}월 ${date.getDate()}일`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const t = useTranslate();
  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => {
    onEdit(item.id);
  };
  return (
    <div className="FoodListItem">
      <img className="FoodListItem-img" src={item.imgUrl} alt={item.imgUrl} />
      <div className="FoodListItem-rows">
        <div className="FoodLIstItem-title">
          {t("menu list")}: {item.title}
        </div>
        <div className="FoodLIstItem-calorie">
          {t("calorie list")}: {item.calorie}
        </div>
        <div className="FoodLIstItem-createdAt">
          {t("date list")}: {formatDate(item.createdAt)}
        </div>
        <div className="FoodLIstItem-content">
          {t("content list")}: {item.content}
        </div>
      </div>
      <div className="FoodListItem-button">
        <button className="FoodListItem-edit-button" onClick={handleEditClick}>
          {t("edit button")}
        </button>
        <button
          className="FoodListItem-delete-button"
          onClick={handleDeleteClick}
        >
          {t("delete button")}
        </button>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <div className="FoodList">
      {items.map((item) => {
        if (editingId === item.id) {
          const { id, title, imgUrl, content, calorie } = item;
          const initialValues = { title, imgUrl: null, content, calorie };

          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (food) => {
            onUpdateSuccess(food);
            setEditingId(null);
          };
          return (
            <div key={id}>
              <FoodForm
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
          <div className="FoodListItem-id" key={item.id}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FoodList;
