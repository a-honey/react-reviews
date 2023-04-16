import { useState } from "react";
import FileInput from "./FileInput";

const INITIAL_VALUE = {
  title: "",
  imgUrl: null,
  content: "",
  calorie: 0,
};

function FoodForm({
  initialValues = INITIAL_VALUE,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("calorie", values.calorie);
    formData.append("imgUrl", values.imgUrl);

    const result = await onSubmit(formData);
    if (!result) return;

    const { food } = result;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUE);
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgUrl"
        value={values.imgUrl}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <div className="FoodForm-rows">
        <input name="title" value={values.title} onChange={handleInputChange} />
        <input
          name="content"
          value={values.content}
          onChange={handleInputChange}
        />
        <input
          name="calorie"
          value={values.calorie}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">제출</button>
    </form>
  );
}

export default FoodForm;
