import { useState } from "react";
import FileInput from "./FileInput";
import "./ReviewForm.css";
import { createReview } from "../api";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  imgUrl: null,
  content: "",
};

function ReviewForm(
  initialValues = INITIAL_VALUE,
  initialPreview,
  onSubmit,
  onSubmitSuccess
) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataform = new FormData();
    dataform.append("title", values.title);
    dataform.append("rating", values.rating);
    dataform.append("content", values.content);
    dataform.append("imgUrl", values.imgUrl);

    const result = await createReview(dataform);
    if (!result) return;
    const { review } = result;
    setValues(INITIAL_VALUE);
    onSubmitSuccess(review);
  };

  return (
    <form className={`ReviewForm`} onSubmit={handleSubmit}>
      <FileInput
        className="ReviewForm-fileInput"
        name="imgUrl"
        value={values.imgUrl}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <div className="ReviewForm-items">
        <div className="inputbox">
          <input
            className="ReviewForm-title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
            placeholder="제목을 입력하세요"
          />
          <input
            type="number"
            className="ReviewForm-rating"
            name="rating"
            value={values.rating}
            onChange={handleInputChange}
          />
        </div>
        <textarea
          className="ReviewForm-content"
          name="content"
          value={values.content}
          onChange={handleInputChange}
          placeholder="내용을 입력하세요"
        />
        <button type="submit">확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
