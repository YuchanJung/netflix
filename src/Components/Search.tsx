import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const MagnifierSvg = styled(motion.svg)``;

const Input = styled(motion.input)`
  position: absolute;
  width: 250px;
  height: 30px;
  right: 0;
  transform-origin: right center;
  background-color: black;
  color: white;
  border: 1px solid ${(props) => props.theme.white.lighter};
  padding: 5px 10px;
  padding-left: 30px;
  font-size: 14px;
  z-index: -1;
`;

interface IForm {
  keyword: string;
}

function Search() {
  const inputAnimation = useAnimation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`search?keyword=${data.keyword}`);
  };
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <MagnifierSvg
        onClick={toggleSearch}
        animate={{ x: searchOpen ? -220 : 0 }}
        transition={{ type: "linear" }}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        ></path>
      </MagnifierSvg>
      <Input
        {...register("keyword", { required: true, minLength: 2 })}
        initial={{ scaleX: 0 }}
        animate={inputAnimation}
        transition={{ type: "linear" }}
        placeholder="Search for movie or tv show..."
      />
    </Form>
  );
}

export default Search;