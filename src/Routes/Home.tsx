import { motion, Variants } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  IGetMoviesResult,
} from "../api";
import { allMoviesState } from "../atom";
import Slider from "../Components/Slider";
import { makeImagePath, returnRatioOfBannerHeightToWidth } from "../utils";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 200vw;
  background-color: #141414;
  &::-webkit-scrollbar {
    // position ?
  }
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled(motion.div)<{ bgphoto: string; ratio: number }>`
  width: 100%;
  height: ${(props) => props.ratio}vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  padding-left: 95px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)),
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

const Contents = styled.div`
  width: 100%;
  height: 120vh;
  // position: relative;
  // top: -100px;
  display: flex;
  flex-direction: column;
`;

const wrapperVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function Home() {
  const setAllMovies = useSetRecoilState(allMoviesState);
  const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );
  const { data: upcoming } = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );
  const nowPlayingMovies = nowPlaying?.results;
  const upcomingMovies = upcoming?.results;
  const bannerMovie = nowPlaying?.results[0];
  const bannerMovieImageUrl = makeImagePath(bannerMovie?.backdrop_path || "");
  const ratioOfBannerHeightToWidth =
    returnRatioOfBannerHeightToWidth(bannerMovieImageUrl);
  useEffect(() => {
    setAllMovies((prev) => [
      ...prev,
      ...(nowPlayingMovies || []),
      ...(upcomingMovies || []),
    ]);
  }, [nowPlayingMovies, upcomingMovies]);
  return (
    <Wrapper
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", duration: 0.5 }}
    >
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={bannerMovieImageUrl}
            ratio={ratioOfBannerHeightToWidth}
          >
            <Title>{bannerMovie?.title}</Title>
            <Overview>{bannerMovie?.overview}</Overview>
          </Banner>
          <Contents>
            {nowPlayingMovies && (
              <Slider movies={nowPlayingMovies.slice(1)} title="Now Playing" />
            )}
            {upcomingMovies && (
              <Slider movies={upcomingMovies} title="Upcoming" />
            )}
          </Contents>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
