import { motion, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IMovie, NEFLIX_LOGO_URL } from "../api";
import { allMoviesState } from "../atom";
import { makeImagePath } from "../utils";
import MovieModal from "./MovieModal";

const Wrapper = styled(motion.div)`
  cursor: pointer;
  // background-color: white;
  width: 210px;
  height: 140px;
  border-radius: 5px;
  font-size: 36px;
  &:nth-child(2) {
    transform-origin: center left;
  }
  &:nth-child(6) {
    transform-origin: center right;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  cursor: pointer;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 80px;
  bottom: -80px;
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const wrapperVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
    y: -50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: {
      type: "tween",
      delay: 0.4,
      duration: 0.2,
    },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    transition: {
      type: "tween",
      delay: 0.4,
      duration: 0.2,
    },
  },
};

interface IMovieBox {
  movie: IMovie;
}

function MovieBox({ movie }: IMovieBox) {
  const allMovies = useRecoilValue(allMoviesState);
  const navigate = useNavigate();
  const backDropPath = movie.backdrop_path
    ? makeImagePath(movie.backdrop_path, "w500")
    : NEFLIX_LOGO_URL;
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <>
      <Wrapper
        variants={wrapperVariants}
        initial="normal"
        whileHover="hover"
        transition={{ type: "tween" }}
        onClick={() => onBoxClicked(movie.id)}
      >
        <Box bgphoto={backDropPath} />
        <Info variants={infoVariants}>
          <h4>{movie.title}</h4>
        </Info>
      </Wrapper>
      <MovieModal />
    </>
  );
}

export default MovieBox;
