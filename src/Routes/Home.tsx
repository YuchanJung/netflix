import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import MovieModal from "../Components/MovieModal";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  width: 100%;
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

const SliderContents = styled.div`
  width: 100%;
  height: 30vh;
  position: relative;
  top: -100px;
`;

function Home() {
  const moviePathMatch = useMatch("/movie/:movieId");
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const totalMovies = data?.results;
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
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SliderContents>
            <Slider movies={totalMovies} />
          </SliderContents>
          <AnimatePresence>
            {clickedMovie && (
              <MovieModal clickedMovie={clickedMovie} scrollY={scrollY.get()} />
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;