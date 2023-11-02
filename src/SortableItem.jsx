import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        className="image"
        style={{
          borderRadius: "10px",
          width: "100%",
          height: "100%",
          opacity: isDragging ? 0 : 1,
        }}
        src={props.src}
        alt={props.alt}
      />
    </div>
  );
}
