import {
  motion,
  useAnimation,
  useViewportScroll,
  Variants,
} from "framer-motion";
import { useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 4%;
  color: white;
  z-index: 1;
  @media screen and (max-width: 930px) {
    height: 45px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  transform: scale(1.05);
  @media screen and (max-width: 1130px) {
    margin-right: 22px;
  }
  @media screen and (max-width: 930px) {
    transform: scale(0.8);
  }

  /* have to set min-width */
  /* @media screen and (max-width: 850px) {
  } */
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 25px;
  font-size: 18px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  @media screen and (max-width: 1130px) {
    font-size: 14px;
  }
  @media screen and (max-width: 930px) {
    font-size: 12px;
    margin-right: 14px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -10px;
  width: 7px;
  height: 7px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.red};
  left: 0;
  right: 0;
  margin: 0 auto;
  @media screen and (max-width: 930px) {
    transform: scale(0.5);
  }
`;

const logoVariants: Variants = {
  initial: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariant: Variants = {
  top: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
  scroll: { backgroundColor: "rgba(0, 0, 0, 1)" },
};

function Header() {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 20) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);
  return (
    <Nav variants={navVariant} animate={navAnimation} initial="top">
      <Col>
        <Logo
          variants={logoVariants}
          animate="initial"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        {/* change to menu toggle under 850px. */}
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="tv">
              Tv Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search />
      </Col>
    </Nav>
  );
}

export default Header;
