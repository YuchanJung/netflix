import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Modal = styled(motion.div)<{ scrollY: number }>`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  top: ${(props) => props.scrollY + 50}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const Title = styled.h2`
  font-size: 36px;
  position: relative;
  top: -80px;
  padding: 20px;
`;

const Overview = styled.p`
  position: relative;
  top: -80px;
  padding: 20px;
`;

interface IMovieModal {
  clickedMovie: IMovie;
  scrollY: number;
}

function MovieModal({ clickedMovie, scrollY }: IMovieModal) {
  const navigate = useNavigate();
  const onOverlayClicked = () => {
    navigate(".");
  };
  return (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Modal layoutId={clickedMovie.id.toString()} scrollY={scrollY}>
        {clickedMovie && (
          <>
            <Cover
              style={{
                backgroundImage: `
                linear-gradient(to top, black, transparent), 
                url(${makeImagePath(clickedMovie.backdrop_path, "w500")})`,
              }}
            ></Cover>
            <Title>{clickedMovie.title}</Title>
            <Overview>{clickedMovie.overview}</Overview>
          </>
        )}
      </Modal>
    </>
  );
}

export default MovieModal;
