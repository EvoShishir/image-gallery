import { useState } from "react";
import "./App.css";
import { imagesList } from "./imagesList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const deleteSelectedImages = () => {
    const updatedImagesList = imagesList.filter(
      (image) => !selectedImages.includes(image.id)
    );
    imagesList.length = 0;
    imagesList.push(...updatedImagesList);
    setSelectedImages([]);
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
        <DragDropContext>
          <Droppable droppableId="grid">
            {(provided) => (
              <section
                className="images-showcase"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {imagesList.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="image-container"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <img
                          className="image"
                          src={image.src}
                          alt={image.alt}
                        />
                        <input
                          type="checkbox"
                          className="image-checkbox"
                          onChange={() => toggleImageSelection(image.id)}
                          checked={selectedImages.includes(image.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
