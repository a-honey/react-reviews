import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClickClear = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const NextPreview = URL.createObjectURL(value);
    setPreview(NextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(value);
    };
  }, [value, initialPreview]);

  return (
    <div className="FoodForm-file">
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        accept="image.png, image.jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && <button onClick={handleClickClear}>X</button>}
    </div>
  );
}

export default FileInput;
