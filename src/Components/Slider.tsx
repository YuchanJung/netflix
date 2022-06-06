import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { IMovie } from "../api";
import AngleIcon from "./Icons/AngleIcon";
import MovieBox from "./MovieBox";

const Wrapper = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Row = styled(motion.div)<{ windowinnerwidth: number }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* grid-template-columns: repeat(${(props) =>
    Math.floor(props.windowinnerwidth / 210)}, 1fr); */
  gap: 5px;
  position: absolute;
`;

const Overlay = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 95px;
  height: 140px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  &:nth-last-child(2) {
    padding-right: 20px;
    left: 0;
  }
  &:last-child {
    padding-left: 20px;
    right: 0;
  }
`;

const rowVariants: Variants = {
  hidden: (props: IRowVariants) => ({
    x:
      props.direction === "left"
        ? -window.outerWidth + props.animationLength
        : window.outerWidth - props.animationLength,
  }),
  visible: {
    x: 0,
  },
  exit: (props: IRowVariants) => ({
    x:
      props.direction === "left"
        ? window.outerWidth - props.animationLength
        : -window.outerWidth + props.animationLength,
  }),
  // 170 have to be changed responsively
};

interface ISlider {
  movies: IMovie[];
}

interface IRowVariants {
  direction: "left" | "right";
  animationLength: number;
}
// const offset = 6;

function returnCurrentMovies(movies: IMovie[], index: number, offset: number) {
  // movies = movies.slice(1); // remove the first movie which was used for banner
  const totalLength = movies.length;
  const maxIndex = Math.ceil(totalLength / offset) - 1;
  const remainder = (maxIndex + 1) * offset - totalLength;
  const firstPreviewMovie =
    movies[index === 0 ? totalLength - 1 : index * offset - 1];
  const lastPreviewMovie =
    movies[index === maxIndex ? remainder : (index + 1) * offset];
  let currentMovies = movies.slice(offset * index, offset * index + offset);
  if (index === maxIndex) {
    const remainderMovies = movies.slice(0, remainder);
    currentMovies.push(...remainderMovies);
  }
  currentMovies.splice(0, 0, firstPreviewMovie);
  currentMovies.push(lastPreviewMovie);
  return currentMovies;
}

function Slider({ movies }: ISlider) {
  const offset = 5;
  /* 
  const offset = Math.floor(window.innerWidth / 210); 
  have to update offset responsively 
   */
  const [index, setIndex] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [animationLength, setAnimationLength] = useState(200);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isRowHovered, setIsRowHovered] = useState(false);
  const totalLength = movies.length;
  const maxIndex = Math.ceil(totalLength / offset) - 1;
  const remainder = (maxIndex + 1) * offset - totalLength;
  const rowVariantsProps: IRowVariants = {
    direction,
    animationLength,
  };
  const currentMovies = returnCurrentMovies(movies, index, offset);
  const toggleAnimationRunning = () => setAnimationRunning((prev) => prev);
  const toggleIsRowHovered = () => setIsRowHovered((prev) => !prev);
  const changeIndex = (direction: "left" | "right") => {
    if (movies) {
      if (animationRunning) return; // to prevent a bug that occurs when button is clicked too fast
      toggleAnimationRunning();
      setDirection(direction);
      if (direction === "right") {
        setIndex((prev) => {
          if (prev === maxIndex) {
            setAnimationLength(205 + 215 * remainder);
            return 0;
          }
          setAnimationLength(205);
          return prev + 1;
        });
      } else {
        setIndex((prev) => {
          if (prev === 0) {
            setAnimationLength(205 + 215 * remainder);
            return maxIndex;
          }
          setAnimationLength(205);
          return prev - 1;
        });
      }
    }
  };
  return (
    <Wrapper>
      <AnimatePresence
        custom={rowVariantsProps}
        initial={false}
        onExitComplete={toggleAnimationRunning}
      >
        <Row
          onMouseEnter={toggleIsRowHovered}
          onMouseLeave={toggleIsRowHovered}
          windowinnerwidth={window.innerWidth}
          custom={rowVariantsProps}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.6 }}
          key={index} // do i need keyword of slider ?
        >
          {currentMovies.map((movie) => (
            <MovieBox movie={movie} key={movie.id} />
          ))}
        </Row>
      </AnimatePresence>
      <Overlay onClick={() => changeIndex("left")}>
        {isRowHovered && <AngleIcon direction="left" className="prevSlide" />}
      </Overlay>
      <Overlay onClick={() => changeIndex("right")}>
        {isRowHovered && <AngleIcon direction="right" className="nextSlide" />}
      </Overlay>
    </Wrapper>
  );
}

export default React.memo(Slider);
