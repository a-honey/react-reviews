import { useEffect, useRef, useState } from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset.png";
import "./ReviewForm.css";
import { createReview } from "../api";

function FileInput({ className = "", name, initialPreview, value, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <div className={`FileInput ${className}`}>
      <img
        className={`FileInput-preview ${preview ? "selected" : ""}`}
        src={preview || placeholderImg}
        alt="이미지 미리보기"
      />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} alt="선택해제" />
        </button>
      )}
    </div>
  );
}

function ReviewForm({ className = "", onSubmitSuccess }) {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, //왜 배열일까유?
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    const { review } = await createReview(formData);
    onSubmitSuccess(review);
    setValues({
      title: "",
      rating: 0,
      content: "",
      imgFile: null,
    });
  };

  return (
    <form className={`ReviewForm ${className}`} onSubmit={handleSubmit}>
      <FileInput
        className="ReviewForm-preview"
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <div className="ReviewForm-rows">
        <div className="ReviewForm-title-rating">
          <input
            className="ReviewForm-title"
            name="title"
            value={values.titile}
            onChange={handleInputChange}
          />
          <input
            className="ReviewForm-rating"
            name="rating"
            type="number"
            value={values.rating}
            onChange={handleInputChange}
          />
        </div>
        <textarea
          className="ReviewForm-content"
          name="content"
          value={values.content}
          onChange={handleInputChange}
        />
        <div className="ReviewForm-error-buttons">
          <div className="ReviewForm-error">에러메시지</div>
          <div className="ReviewForm-buttons">
            취소버튼
            <button type="submit">확인</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
