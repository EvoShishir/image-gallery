import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
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

  const [foundImage, setFoundImage] = useState();

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

  const handleDragStart = (event) => {
    findImageById(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((images) => {
        const oldIndex = images.findIndex((image) => image.id === active.id);
        const newIndex = images.findIndex((image) => image.id === over.id);

        return arrayMove(images, oldIndex, newIndex);
      });
    }
  };

  function findImageById(id) {
    const image = images.find((image) => image.id === id);
    if (image) {
      setFoundImage(image);
    } else {
      setFoundImage(null);
    }
  }

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
          onDragStart={handleDragStart}
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
          <DragOverlay>
            {foundImage?.id ? (
              <div className="image-container">
                <img
                  className="image"
                  style={{ opacity: "0.5" }}
                  src={foundImage.src}
                  alt="image"
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
