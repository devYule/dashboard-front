import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SeacrhBar({ type }: { type: number }) {
  const [inputValue, setInputValue] = useState("" as string);
  const [searchParam, setSearchParam] = useSearchParams();
  const navi = useNavigate();
  const query = searchParam.get("q");

  useEffect(() => {
    if (query) {
      setInputValue(query);
    }
  }, [query]);

  const style = getStyle(type);

  function getStyle(type: number) {
    if (type === 1) {
      return {
        borderRadius: "10px",
      };
    }
    if (type === 2) {
      return {
        borderTop: "0px",
        borderLeft: "0px",
        borderRight: "0px",
      };
    }
  }

  return (
    <div className="searchBar">
      <div id="searchBarItem" style={style}>
        <input
          value={inputValue} autoFocus
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => onKeyUp(e)}
        ></input>
        <button className="searchBtn pointer" onClick={btnOnClick}>
          <svg
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="7.5" r="7" stroke="black" />
            <path
              d="M13.9375 10.4021C15.6438 12.1085 17.616 14.0807 19.4133 15.878C20.3896 16.8543 20.3895 18.4371 19.4132 19.4134V19.4134C18.4369 20.3897 16.854 20.3897 15.8777 19.4134C14.0472 17.5829 12.0352 15.5709 10.3075 13.8432"
              stroke="black"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
  function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (inputValue === "") return;
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      btnOnClick();
    }
  }
  function btnOnClick() {
    if (inputValue === "") return;
    navi("/search?q=" + inputValue);
  }
}
