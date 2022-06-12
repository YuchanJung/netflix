import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie, NEFLIX_LOGO_URL } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled(motion.div)`
  cursor: pointer;
  width: 210px;
  height: 140px;
  max-height: 140px;
  font-size: 36px;
  display: flex;
  flex-direction: column;
  &:nth-child(2) {
    transform-origin: center left;
  }
  &:nth-child(6) {
    transform-origin: center right;
  }
`;

const ContentScreen = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 210px;
  min-height: 140px;
  border-radius: 5px;
`;

const HoveredScreen = styled(ContentScreen)``;

const HoveredContentInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  width: 210px;
  min-height: 120px;
  opacity: 0;
  z-index: 1;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const boxVariants: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.4,
    y: -50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: {
      delay: 0.4,
      duration: 0.3,
    },
  },
};

const infoVariants: Variants = {
  normal: {
    opacity: 0,
    scale: 1,
  },
  hover: {
    opacity: 1,
    scale: 1.4,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    transition: {
      delay: 0.4,
      duration: 0.3,
    },
  },
};

interface IMovieBox {
  movie: IMovie;
}

function MovieBox({ movie }: IMovieBox) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const backDropPath = movie.backdrop_path
    ? makeImagePath(movie.backdrop_path, "w500")
    : NEFLIX_LOGO_URL;
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const toggleIsHovered = () => setIsHovered((prev) => !prev);
  return (
    <Wrapper
      onMouseEnter={toggleIsHovered}
      onMouseLeave={toggleIsHovered}
      onClick={() => onBoxClicked(movie.id)}
    >
      <ContentScreen bgphoto={backDropPath}>
        <AnimatePresence>
          {isHovered && (
            <HoveredScreen
              variants={boxVariants}
              initial="normal"
              animate="hover"
              exit="normal"
              transition={{ type: "tween" }}
              bgphoto={backDropPath}
            />
          )}
        </AnimatePresence>
      </ContentScreen>
      <AnimatePresence>
        {isHovered && (
          <HoveredContentInfo
            variants={infoVariants}
            initial="normal"
            animate="hover"
            exit="normal"
            transition={{ type: "tween" }}
          >
            <h4>{movie.title}</h4>
          </HoveredContentInfo>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default MovieBox;
