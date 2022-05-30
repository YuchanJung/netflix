import { useLocation, useSearchParams } from "react-router-dom";

function Search() {
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  console.log(keyword);
  return null;
}

export default Search;
