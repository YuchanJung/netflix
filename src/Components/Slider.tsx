import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie, NEFLIX_LOGO_URL } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 30vh;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 90%;
  position: absolute;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 36px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
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

const rowVariants: Variants = {
  hidden: {
    x: window.outerWidth + 5, // 5 for gap
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
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
  movies?: IMovie[];
}

const offset = 6;

function Slider({ movies }: ISliderProps) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const toggleAnimationRunning = () =>
    setAnimationRunning((prev) => !prev);
  const changeIndex = () => {
    if (movies) {
      if (animationRunning) return; // to prevent a bug that occurs when button is clicked too fast
      toggleAnimationRunning();
      const totalLength = movies.length - 1;
      const maxIndex = Math.floor(totalLength / offset) - 1;
      setIndex((prev) => (maxIndex === prev ? 0 : prev + 1));
    }
  };
  return (
    <Wrapper>
      <AnimatePresence initial={false} onExitComplete={toggleAnimationRunning}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {movies
            ?.slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => {
              const backDropPath = movie.backdrop_path
                ? makeImagePath(movie.backdrop_path, "w500")
                : NEFLIX_LOGO_URL;
              return (
                <Box
                  layoutId={movie.id.toString()}
                  key={movie.id}
                  bgPhoto={backDropPath}
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
    </Wrapper>
  );
}

export default Slider;
