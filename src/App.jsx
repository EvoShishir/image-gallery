import { useState } from "react";
import "./App.css";
import { imagesList } from "./imagesList";

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

        <section className="images-showcase">
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
        </section>
      </div>
    </div>
  );
};

export default App;
