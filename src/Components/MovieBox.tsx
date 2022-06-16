import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie, NEFLIX_LOGO_URL } from "../api";
import { makeImagePath } from "../utils";
import MovieModal from "./MovieModal";

const Wrapper = styled(motion.div)`
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

const BasicScreen = styled(motion.div)<{ bgphoto: string }>`
  cursor: pointer;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 210px;
  min-height: 140px;
  border-radius: 5px;
`;

const PreviewModal = styled(motion.div)`
  position: absolute;
`;

const HoveredScreen = styled(BasicScreen)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const HoveredContentInfo = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  width: 210px;
  min-height: 120px;
  padding: 10px;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const modalVariants: Variants = {
  normal: {
    scale: 1,
    y: 0,
  },
  hover: {
    y: -50,
    scale: 1.4,
    zIndex: 2, // header z-index : 1
    transition: {
      delay: 0.6,
      duration: 0.3,
    },
  },
};

const infoVariants: Variants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    transition: {
      delay: 0.6,
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
    setIsHovered(false);
    navigate(`/movie/${movieId}`);
    // parameter state reset..? No. In Slider component, isRowHovered state is not reseted
  };
  return (
    <>
      <Wrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onBoxClicked(movie.id)}
      >
        <BasicScreen bgphoto={backDropPath}>
          {/* 3 layout id ? */}
          {/*onAnimationComplete={(definition) => {
              if (definition === "hover") {
                setIsHoverAnimationRunned(true);
                console.log(isHoverAnimationRunned);
              }
              if (definition === "normal") {
                setIsHoverAnimationRunned(false);
                console.log(isHoverAnimationRunned);
              }
            }}*/}
          <AnimatePresence>
            {isHovered && (
              <PreviewModal
                variants={modalVariants}
                initial="normal"
                animate="hover"
                exit="normal"
                transition={{ type: "tween" }}
              >
                <HoveredScreen bgphoto={backDropPath} />
                <HoveredContentInfo
                  variants={infoVariants}
                  initial="normal"
                  animate="hover"
                  exit="normal"
                >
                  <h4>{movie.title}</h4>
                </HoveredContentInfo>
              </PreviewModal>
            )}
          </AnimatePresence>
        </BasicScreen>
      </Wrapper>
      <MovieModal />
    </>
  );
}

export default MovieBox;
