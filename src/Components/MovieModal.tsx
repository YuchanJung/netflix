import { AnimatePresence, motion, Variants } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { allMoviesState } from "../atom";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Modal = styled(motion.div)`
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
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

const modalVariants: Variants = {
  overlayHidden: {
    scale: 1,
    opacity: 0,
  },
  hidden: {
    scale: 0.9,
    opacity: 0.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

interface IModal {
  layoutIdForModal: string;
}

function MovieModal({ layoutIdForModal }: IModal) {
  const allMovies = useRecoilValue(allMoviesState);
  const moviePathMatch = useMatch("/movie/:movieId");
  const navigate = useNavigate();
  const onOverlayClicked = () => {
    navigate(".");
  };
  const clickedMovie =
    moviePathMatch?.params.movieId &&
    allMovies.find(
      (movie) => String(movie.id) === moviePathMatch.params.movieId
    );
  return (
    <AnimatePresence>
      {clickedMovie && (
        <Overlay
          onClick={onOverlayClicked}
          variants={modalVariants}
          initial="overlayHidden"
          animate="visible"
          exit="overlayHidden"
          transition={{ duration: 0.15 }}
        >
          <Modal
            variants={modalVariants}
            layoutId={layoutIdForModal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "tween", duration: 0.15 }}
          >
            <Cover
              style={{
                backgroundImage: `
                  linear-gradient(to top, black, transparent), 
                  url(${makeImagePath(clickedMovie.backdrop_path, "w500")})`,
              }}
            />
            <Title>{clickedMovie.title}</Title>
            <Overview>{clickedMovie.overview}</Overview>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default MovieModal;
