import React, { useState } from "react";
import "../styles/TagsInput.css";

function TagsInput() {
  const [tags, setTags] = useState([]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }
    const value = e.target.value;
    if (!value.trim()) {
      return;
    }
    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="tag-item-text">{tag}</span>
          <span className="close-tag" onClick={() => removeTag(index)} >&times;</span>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Add a tag"
        className="tags-input"
      />
    </div>
  );
}

export default TagsInput;
