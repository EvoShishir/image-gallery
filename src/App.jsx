import { useState } from "react";
import "./App.css";
import { imagesList } from "./imagesList";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

const App = () => {
  const [images] = useState(imagesList);
  const [selectedImages, setSelectedImages] = useState([]);

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

  const onDragEnd = (event) => {
    console.log("onDragEnd", event);
  };

  return (
    <div className="center-container">
      <div className="container">
        <header className="header">
          <h3>Gallery</h3>
          {selectedImages.length > 0 && (
            <button onClick={deleteSelectedImages}>Delete files</button>
          )}
        </header>
        <br />
        <br />

        <section className="images-showcase">
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={images} strategy={rectSortingStrategy}>
              {images.map((image) => (
                <div className="image-container" key={image.id}>
                  <img className="image" src={image.src} alt={image.alt} />
                  <input
                    type="checkbox"
                    className="image-checkbox"
                    onChange={() => toggleImageSelection(image.id)}
                    checked={selectedImages.includes(image.id)}
                  />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </section>
      </div>
    </div>
  );
};

export default App;
