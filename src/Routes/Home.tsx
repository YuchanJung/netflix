import {
  AnimatePresence,
  motion,
  useViewportScroll,
  Variants,
} from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  height: 200vh;
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 50px;
  width: 60%;
`;

const Overview = styled.p`
  font-size: 28px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieModal = styled(motion.div)<{ scrollY: number }>`
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

const ModalCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const ModalTitle = styled.h2`
  font-size: 36px;
  position: relative;
  top: -80px;
  padding: 20px;
`;

const ModalOverview = styled.p`
  position: relative;
  top: -80px;
  padding: 20px;
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

const offset = 6;

const NEFLIX_LOGO_URL =
  "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4";

function Home() {
  const navigate = useNavigate();
  const moviePathMatch = useMatch("/movie/:movieId");
  const { scrollY } = useViewportScroll();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const totalMovies = data?.results;
  const increaseIndex = () => {
    if (totalMovies) {
      if (leaving) return;
      toggleLeaving();
      const totalLength = totalMovies.length - 1;
      const maxIndex = Math.floor(totalLength / offset) - 1;
      setIndex((prev) => (maxIndex === prev ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const onOverlayClicked = () => {
    navigate(".");
  };
  const clickedMovie =
    moviePathMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {totalMovies
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
          </Slider>
          <AnimatePresence>
            {moviePathMatch && (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <MovieModal
                  layoutId={moviePathMatch.params.movieId}
                  scrollY={scrollY.get()}
                >
                  {clickedMovie && (
                    <>
                      <ModalCover
                        style={{
                          backgroundImage: `
                          linear-gradient(to top, black, transparent), 
                          url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      ></ModalCover>
                      <ModalTitle>{clickedMovie.title}</ModalTitle>
                      <ModalOverview>{clickedMovie.overview}</ModalOverview>
                    </>
                  )}
                </MovieModal>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
