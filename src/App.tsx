import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { offsetState } from "./atom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function returnOffsetByWindowInnerWidth(windowInnerWidth: number) {
  // change offset responsively
  let offset = 6;
  if (windowInnerWidth < 1385) offset = 5;
  if (windowInnerWidth < 1085) offset = 4;
  if (windowInnerWidth < 785) offset = 3;
  if (windowInnerWidth < 485) offset = 2;
  return offset;
}

function App() {
  const setOffset = useSetRecoilState(offsetState);
  const handleResize = () => {
    setOffset(returnOffsetByWindowInnerWidth(window.innerWidth));
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => { //cleanup
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  /*
  routes animation.. how to unmount animations in nested routes
  1. make location state with useLocation
  2. key depending on the state ? 
  */
  return (
    <BrowserRouter>
      <Header />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/movie/:movieId"></Route>
          </Route>
          <Route path="tv" element={<Tv />}></Route>
          <Route path="search" element={<Search />}></Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
