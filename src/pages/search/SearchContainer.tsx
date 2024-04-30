import { useEffect, useState } from "react";
import SearchBarContainer from "../main/comps/SearchBarContainer";
import SidebarMainContainer from "../main/sidebar/SidebarMainContainer";
import Contents from "./comps/Contents";
import TextLogo from "./comps/TextLogo";
import "./styles/search.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CSSTransition from "react-transition-group/CSSTransition";

interface ScrollSize {
  before: number;
  after: number;
}

export default function SearchContainer() {
  const [scrolling, setScrolling] = useState(0);
  const [beforeScrollHeight, setBeforeScrollHeight] = useState(0);
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const navi = useNavigate();
  const animationDuration = {
    enter: 100,
    exit: 100,
  };

  useEffect(() => {
    const titleEl = document.getElementsByTagName("title")[0];
    titleEl.innerText = "Search";
  }, []);

  const [searchParam, setSearchParam] = useSearchParams();
  const query = searchParam.get("q");

  const curScroll = document.querySelector(".searchContainer")
    ?.scrollTop as number;
  const scrollHeight = document.querySelector(".searchContainer")
    ?.scrollHeight as number;

  // const scrollStyle = scrollDirection === 'down' ? ' miniHeader' : ' fullHeader';

  console.log(isHeaderShow);

  return (
    <div className="searchContainer" onScroll={onScroll}>
      <CSSTransition
        in={isHeaderShow}
        timeout={animationDuration}
        mountOnEnter
        unmountOnExit
        classNames="headerAnimation"
      >
        <div className={"header"}>
          <section className="logo pointer" onClick={() => navi("/main")}>
            <TextLogo />
          </section>
          <SearchBarContainer />
        </div>
      </CSSTransition>
      <SidebarMainContainer />
      <div className="main" id="main">
        <Contents query={query} isScroll={curScroll > 0} />
      </div>
    </div>
  );
  function onScroll() {
    if (curScroll === 0) {
      setIsHeaderShow(true);
      setScrolling(curScroll);
      setBeforeScrollHeight(scrollHeight);
      return;
    }

    // setScrollDirection(scrolling > curScroll ? 'up' : 'down');
    setScrolling(curScroll);
    setBeforeScrollHeight(scrollHeight);
    if (beforeScrollHeight === scrollHeight) {
      if (scrolling - 20 > curScroll) {
        setIsHeaderShow(true);
      }
      if (scrolling + 10 < curScroll) {
        setIsHeaderShow(false);
      }
      //   setIsHeaderShow(scrolling - 10 > curScroll ? true : false);
    }
    //

    console.log("scrollTop: ", curScroll);
    console.log("scrollHeigt: ", scrollHeight);
    const clientHeight = document.querySelector(".searchContainer")
      ?.clientHeight as number;
    console.log("clientHeight: ", clientHeight);
    console.log(
      "scrollHeight - clientHeight + scrollTop: ",
      scrollHeight - (clientHeight + curScroll)
    );
  }
}
