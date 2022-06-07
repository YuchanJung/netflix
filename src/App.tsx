import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Header />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />}>
          <Route path="/movie/:movieId"></Route>
        </Route>
        <Route path="tv" element={<Tv />}></Route>
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
