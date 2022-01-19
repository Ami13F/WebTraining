import React from "react";

const Highlighted = ({ text = "", highlight = "" }) => {
  highlight = highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${[highlight]})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts
        .filter(part => part)
        .map(
          (part, i) =>
            regex.test(part) ? <mark key={i}>{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment> // React.Fragmet allow you to create an empty tag but also use tags(like key)
        )}
    </>
  );
};

export default Highlighted;
