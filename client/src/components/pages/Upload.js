import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TagsInput from "../TagsInput";

function Upload() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("XS");

  const sizes = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
  ];

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", image.data);
    formData.append("name", name);
    formData.append("size", size);

    const response = await axios.post(
      "http://localhost:5001/uploadImg",
      formData,
      {
        withCredentials: true,
      }
    );

    navigate("/");
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
  };

  return (
    <div>
      <h1>Upload</h1>
      {image.preview && <img src={image.preview} width="100" height="100" />}
      <form onSubmit={submit} onKeyDown={(e) => checkKeyDown(e)}>
        <input type="file" name="image" onChange={handleFileChange} />
        <p>Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
        />
        <p>Color</p>

        <p>Size</p>
        <select value={size} onChange={handleSizeChange}>
          {sizes.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <p>Enter tags</p>
        <TagsInput />

        <br />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Upload;
