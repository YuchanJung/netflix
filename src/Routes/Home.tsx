import { motion, useViewportScroll, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  IMovie,
} from "../api";
import MovieModal from "../Components/MovieModal";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 200vh;
  background-color: #141414;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled(motion.div)<{ bgphoto: string }>`
  height: 100vh;
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
  position: relative;
  top: -100px;
  display: flex;
  flex-direction: column;
`;

const SliderTitle = styled.span`
  font-size: 28px;
  font-weight: bolder;
  padding-left: 95px;
  margin: 12px 0px;
`;

const wrapperVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function Home() {
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
  const allMovies: IMovie[] = [
    ...(nowPlayingMovies || []),
    ...(upcomingMovies || []),
  ];
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
            bgphoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>
          <Contents>
            <SliderTitle>Now Playing</SliderTitle>
            {nowPlayingMovies && <Slider movies={nowPlayingMovies.slice(1)} />}
            <SliderTitle>Upcoming</SliderTitle>
            {upcomingMovies && <Slider movies={upcomingMovies} />}
          </Contents>
          <MovieModal allMovies={allMovies} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
