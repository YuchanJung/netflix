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

const Row = styled(motion.div)<{ windowInnerWidth: number }>`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* grid-template-columns: repeat(${(props) =>
    Math.floor(props.windowInnerWidth / 210)}, 1fr); */
  gap: 5px;
  width: 100%;
  position: absolute;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 210px;
  height: 140px;
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

const Button = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: white;
  &:first-child {
    left: 15px;
  }
  &:last-child {
    right: 15px;
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
  movies: IMovie[];
}

// const offset = 6;

function returnMovies(movies: IMovie[], index: number, offset: number) {
  movies = movies.slice(1); // remove the first movie which was used for banner
  const totalLength = movies.length - 1;
  const maxIndex = Math.floor(totalLength / offset) - 1;
  const firstPreviewMovie =
    movies[index === 0 ? (maxIndex + 1) * offset - 1 : index * offset - 1];
  const lastPreviewMovie =
    movies[index === maxIndex ? 0 : (index + 1) * offset];
  const currentMovies = movies.slice(offset * index, offset * index + offset);
  return { currentMovies, firstPreviewMovie, lastPreviewMovie };
}

function Slider({ movies }: ISliderProps) {
  const offset = 6;
  /* 
  const offset = Math.floor(window.innerWidth / 210); 
  have to update offset responsively 
   */
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(false);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const toggleAnimationRunning = () => setAnimationRunning((prev) => !prev);
  const totalLength = movies.length - 1;
  const maxIndex = Math.floor(totalLength / offset) - 1;
  const changeIndex = () => {
    if (movies) {
      if (animationRunning) return; // to prevent a bug that occurs when button is clicked too fast
      toggleAnimationRunning();
      setIndex((prev) => (maxIndex === prev ? 0 : prev + 1));
    }
  };
  const { currentMovies, firstPreviewMovie, lastPreviewMovie } = returnMovies(
    movies,
    index,
    offset
  );
  return (
    <Wrapper>
      <Button>
        <AngleIcon direction="left" className="prevSlide" />
      </Button>
      <AnimatePresence initial={false} onExitComplete={toggleAnimationRunning}>
        <Row
          windowInnerWidth={window.innerWidth}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
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
      <Button onClick={changeIndex}>
        <AngleIcon direction="right" className="nextSlide" />
      </Button>
    </Wrapper>
  );
}

export default Slider;
