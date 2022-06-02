import { useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getNowPlayingMovies, IGetMoviesResult } from "../api";
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

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
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
  display: flex;
  flex-direction: column;
`;

function Home() {
  const { scrollY } = useViewportScroll();
  /*
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );
  const totalMovies = data?.results;
  */
  console.log("home: ", scrollY.get());
  return (
    <Wrapper>
      {/*isLoading ? (
      {  <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SliderContents>
            {totalMovies && <Slider movies={totalMovies} />}
          </SliderContents>
          {totalMovies && (
            <MovieModal totalMovies={totalMovies} scrolly={scrollY.get()} />
          )}
        </>
          )}*/}

    </Wrapper>
  );
}

export default Home;
