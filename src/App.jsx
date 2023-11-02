import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import "./App.css";

import { imagesList } from "./imagesList";

import { SortableItem } from "./SortableItem";

function App() {
  const [images, setImages] = useState(imagesList);
  const [selectedImages, setSelectedImages] = useState([]);

  console.log(selectedImages);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedimages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    images.length = 0;
    images.push(...updatedimages);
    setSelectedImages([]);
  };

  return (
    <div className="center-container">
      <div className="container">
        <header className="header">
          <h3>Gallery</h3>
          {selectedImages.length > 0 && (
            <>
              <p>
                <b>{selectedImages.length} item(s) selected</b>
              </p>
              <button onClick={deleteSelectedImages}>Delete files</button>
            </>
          )}
        </header>
        <br />
        <br />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <section className="images-showcase">
              {images.map((image) => (
                <div key={image.id} className="image-container ">
                  <SortableItem key={image.id} id={image.id} src={image.src} />
                  <input
                    type="checkbox"
                    className="image-checkbox"
                    onChange={() => toggleImageSelection(image.id)}
                    checked={selectedImages.includes(image.id)}
                  />
                </div>
              ))}
            </section>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((images) => {
        const oldIndex = images.findIndex((image) => image.id === active.id);
        const newIndex = images.findIndex((image) => image.id === over.id);

        return arrayMove(images, oldIndex, newIndex);
      });
    }
  }
}

export default App;
