import { AnimatePresence } from "framer-motion";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
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
