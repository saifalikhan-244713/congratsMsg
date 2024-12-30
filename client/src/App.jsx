import { useState, useEffect, useRef } from "react";
import "./MarioJourney.css"; // Custom styles
import manFigure from "./man-figure.png"; // Character image
import smallBuildingImage from "./small-building.png"; // Small building image
import largeBuildingImage from "./large-building.png"; // Large building image

const App = () => {
  const [position, setPosition] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const canvasRef = useRef(null);
  const characterImageRef = useRef(null);
  const smallBuildingImageRef = useRef(null);
  const largeBuildingImageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load images
    const characterImg = new Image();
    characterImg.src = manFigure;
    characterImageRef.current = characterImg;

    const smallBuildingImg = new Image();
    smallBuildingImg.src = smallBuildingImage;
    smallBuildingImageRef.current = smallBuildingImg;

    const largeBuildingImg = new Image();
    largeBuildingImg.src = largeBuildingImage;
    largeBuildingImageRef.current = largeBuildingImg;

    const groundHeight = 150;

    // Adjust building and character positions
    const character = {
      x: 25,
      y: canvas.height - groundHeight - 220,
      width: 250,
      height: 250,
    };
    const smallBuilding = {
      x: 50,
      y: canvas.height - groundHeight - 100,
      width: 150,
      height: 100,
    };
    const largeBuilding = {
      x: 1350,
      y: canvas.height - groundHeight - 290,
      width: 300,
      height: 400,
    };

    // Update year positions
    const yearPositions = [300, 500, 700, 900, 1100, 1300]; // New positions for 2022 and 2024
    const years = [2014, 2016, 2018, 2020, 2022, 2024]; // Add 2022 and 2024

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sky
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height - groundHeight);

      // Draw ground
      ctx.fillStyle = "#6B8E23";
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

      // Draw small building
      if (smallBuildingImageRef.current.complete) {
        ctx.drawImage(
          smallBuildingImageRef.current,
          smallBuilding.x - position,
          smallBuilding.y,
          smallBuilding.width,
          smallBuilding.height
        );
      }

      // Draw large building
      if (largeBuildingImageRef.current.complete) {
        ctx.drawImage(
          largeBuildingImageRef.current,
          largeBuilding.x - position,
          largeBuilding.y,
          largeBuilding.width,
          largeBuilding.height
        );
      }

      // Draw character
      if (characterImageRef.current.complete) {
        ctx.drawImage(
          characterImageRef.current,
          character.x,
          character.y,
          character.width,
          character.height
        );
      }

      // Draw years between buildings
      yearPositions.forEach((yearX, index) => {
        if (yearX > position - 50 && yearX < position + canvas.width) {
          ctx.fillStyle = "black";
          ctx.font = "25px Arial";
          ctx.fillText(
            years[index],
            yearX - position,
            canvas.height - groundHeight - 20
          );
        }
      });
    };

    const animate = () => {
      drawScene();
      requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animate);
  }, [position]);

  const handleMove = () => {
    setPosition((prev) => {
      const newPosition = prev + 80;
      if (newPosition >= 1000 && !showMessage) {
        setShowMessage(true);
      }
      return newPosition;
    });
  };

  return (
    <div className="mario-container">
      {showMessage && (
        <div className="congrats-message">
          Congratulations on Completing Your Journey🎉🎉! Keep Moving Forward !!
        </div>
      )}
      <canvas ref={canvasRef} width={800} height={600}></canvas>
      <button className="move-button" onClick={handleMove}>
        Move Forward
      </button>
    </div>
  );
};

export default App;
