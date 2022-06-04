import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie, NEFLIX_LOGO_URL } from "../api";
import { makeImagePath } from "../utils";
import AngleIcon from "./Icons/AngleIcon";

const Wrapper = styled.div`
  width: 100%;
  height: 30vh;
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

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 210px;
  height: 140px;
  font-size: 36px;
  &:nth-child(2) {
    transform-origin: center left;
  }
  &:nth-child(6) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 16px;
  }
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
  hidden: (props: IRowVariantsProps) => ({
    x:
      props.direction === "left"
        ? -window.outerWidth + props.animationLength
        : window.outerWidth - props.animationLength,
  }),
  visible: {
    x: 0,
  },
  exit: (props: IRowVariantsProps) => ({
    x:
      props.direction === "left"
        ? window.outerWidth - props.animationLength
        : -window.outerWidth + props.animationLength,
  }),
  // 170 have to be changed responsively
};

const boxVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3,
    },
  },
};

interface ISliderProps {
  movies: IMovie[];
}

interface IRowVariantsProps {
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

function Slider({ movies }: ISliderProps) {
  const offset = 5;
  /* 
  const offset = Math.floor(window.innerWidth / 210); 
  have to update offset responsively 
   */
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [animationLength, setAnimationLength] = useState(200);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const totalLength = movies.length;
  const maxIndex = Math.ceil(totalLength / offset) - 1;
  const remainder = (maxIndex + 1) * offset - totalLength;
  const rowVariantsProps: IRowVariantsProps = {
    direction,
    animationLength,
  };
  const currentMovies = returnCurrentMovies(movies, index, offset);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const toggleAnimationRunning = () => setAnimationRunning((prev) => !prev);
  const changeIndex = (direction: "left" | "right") => {
    if (movies) {
      if (animationRunning) return; // to prevent a bug that occurs when button is clicked too fast
      toggleAnimationRunning();
      setDirection(direction);
      if (direction === "right") {
        setIndex((prev) => {
          if (prev === maxIndex) {
            setAnimationLength(210 * (remainder + 1) - 10);
            return 0;
          }
          setAnimationLength(200);
          return prev + 1;
        });
      } else {
        setIndex((prev) => {
          if (prev === 0) {
            setAnimationLength(210 * (remainder + 1) - 10);
            return maxIndex;
          }
          setAnimationLength(200);
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
          windowinnerwidth={window.innerWidth}
          custom={rowVariantsProps}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.6 }}
          key={index}
        >
          {currentMovies.map((movie) => {
            const backDropPath = movie.backdrop_path
              ? makeImagePath(movie.backdrop_path, "w500")
              : NEFLIX_LOGO_URL;
            return (
              <Box
                layoutId={movie.id.toString()}
                key={movie.id}
                bgphoto={backDropPath}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                onClick={() => onBoxClicked(movie.id)}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            );
          })}
        </Row>
      </AnimatePresence>
      <Overlay onClick={() => changeIndex("left")}>
        <AngleIcon direction="left" className="prevSlide" />
      </Overlay>
      <Overlay onClick={() => changeIndex("right")}>
        <AngleIcon direction="right" className="nextSlide" />
      </Overlay>
    </Wrapper>
  );
}

export default Slider;
