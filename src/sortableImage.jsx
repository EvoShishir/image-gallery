import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const sortableImage = ({ image }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="image-container"
        key={image.id}
      >
        <img className="image" src={image.src} alt={image.alt} />
        <input
          type="checkbox"
          className="image-checkbox"
          // onChange={() => toggleImageSelection(image.id)}
          // checked={selectedImages.includes(image.id)}
        />
      </div>
    </div>
  );
};

export default sortableImage;
