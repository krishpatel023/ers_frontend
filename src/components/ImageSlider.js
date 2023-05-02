import { useCallback, useEffect, useRef, useState } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  zIndex: "0",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

// const rightArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   right: "32px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const leftArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   left: "32px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

const sliderStyles = {
  position: "relative",
  height: "100%",
  zIndex: "0",
};

// const dotsContainerStyles = {
//   display: "flex",
//   justifyContent: "center",
// };

// const dotStyle = {
//   margin: "0 3px",
//   cursor: "pointer",
//   fontSize: "20px",
// };
const quotestyle = {
  position: "absolute",
  color: "white",
  zIndex: 100,
  top: "60%",
  backgroundColor: "rgba(82, 82, 82,0.750)",
  //backgroundColor: "rgba(1, 14, 35, 0.793)",
  fontSize: "1.9rem",
  textAlign: "center",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  // marginLeft: "15.9rem",
  width: "60%",
  minHeight:"30%",
  borderRadius: "0.5rem",
};
const slidesContainerStyles = {
  display: "flex",
  height: "100%",
  transition: "transform ease-out 0.3s",
};

const slidesContainerOverflowStyles = {
  overflow: "hidden",
  height: "100%",
};
const slides = [
  {
    url: "https://images.pexels.com/photos/4021262/pexels-photo-4021262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    url: "https://images.pexels.com/photos/942560/pexels-photo-942560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    url: "https://images.pexels.com/photos/6471926/pexels-photo-6471926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    url: "https://images.pexels.com/photos/15486030/pexels-photo-15486030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    url: "https://images.pexels.com/photos/6314946/pexels-photo-6314946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];
const ImageSlider = ({  parentWidth }) => {
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const goToPrevious = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };
  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);
  // const goToSlide = (slideIndex) => {
  //   setCurrentIndex(slideIndex);
  // };
  const getSlideStylesWithBackground = (slideIndex) => ({
    ...slideStyles,
    backgroundImage: `url(${slides[slideIndex].url})`,
    width: `${parentWidth}px`,
  });
  const getSlidesContainerStylesWithWidth = () => ({
    ...slidesContainerStyles,
    width: parentWidth * slides.length,
    transform: `translateX(${-(currentIndex * parentWidth)}px)`,
  });

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div style={sliderStyles}>
      {/* <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div> */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <h1 style={quotestyle}>
            "THROUGH THE STORM WE STAND,UNITED IN OUR FIGHT AGAINST NATURE'S HAND"
        </h1>
      </div>
      <div style={slidesContainerOverflowStyles}>
        <div style={getSlidesContainerStylesWithWidth()}>
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              style={getSlideStylesWithBackground(slideIndex)}
            ></div>
          ))}
        </div>
      </div>
      {/* <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
        //   <div
        //     style={dotStyle}
        //     key={slideIndex}
        //     onClick={() => goToSlide(slideIndex)}
        //   >
        //     ●
        //   </div>
        ))}
      </div> */}
    </div>
  );
};

export default ImageSlider;
