import {
  CSSProperties,
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AllUserDatasContext,
  SetAllUserDatasContext,
} from "../../../../pbl/Contexts";
import { axiosInstance } from "../../../../pbl/AxiosUtil";
import { useSearchParams } from "react-router-dom";
import { allSites } from "../../../../interfaces/Interfaces";

export default function UserSites() {
  const [isHoverLastIdx, setIsHoverLastIdx] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [animationInit, setAnimationInit] = useState<number>(Math.random());

  const userInfos = useContext(AllUserDatasContext);
  const setUserInfos = useContext(SetAllUserDatasContext);

  const divRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [searchParam, setSearchParam] = useSearchParams();

  const errorIs = searchParam.get("err");

  useEffect(() => {
    if (errorIs === "site-is-empty") {
      if (divRef.current !== null) {
        divRef.current.className = "sites site-is-empty";
        setTimeout(() => {
          if (divRef.current !== null) {
            divRef.current.className = "sites";
          }
        }, 2000);
      }
      if (btnRef.current !== null) {
        btnRef.current.style.visibility = "visible";
        setTimeout(() => {
          if (btnRef.current !== null) {
            btnRef.current.style.visibility = "hidden";
          }
        }, 2000);
      }
    }
  }, [errorIs]);

  const btnStyle: CSSProperties = {
    visibility: isHoverLastIdx ? "visible" : "hidden",
  };
  const clickStyle: CSSProperties = {
    visibility: isClicked ? "visible" : "hidden",
  };
  let clickClassName = "box";
  if (isClicked) {
    clickClassName += " eachBox";
  } else {
    clickClassName += " lastBox";
  }
  const dropDownStyle: CSSProperties = {
    visibility: isFocus ? "visible" : "hidden",
  };
  console.log("userSites", userInfos.sites);
  return (
    <div className="sites" ref={divRef}>
      <p id="title">Sites</p>
      {userInfos.sites.map((site) => {
        return (
          <div key={site} className="box eachBox">
            {allSites[site].img}
            <button
              className="minusBtn totalBtns pointer"
              onClick={() => onMinusBtnClick(site)}
            >
              -
            </button>
          </div>
        );
      })}
      <section className="lastGrp" key={animationInit}>
        <div
          className={clickClassName}
          onMouseEnter={onMouseEnterBtn}
          onMouseLeave={onMouseLeaveBtn}
        >
          <input
            id="addInput"
            style={clickStyle}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            value={inputValue}
            onChange={(e) => onInputChange(e)}
          ></input>
          <button
            id="btn"
            className="totalBtns pointer"
            style={btnStyle}
            onClick={onClickBtn}
            ref={btnRef}
          >
            +
          </button>
        </div>
        <div className="dropDown" style={dropDownStyle}>
          {allSites.length === userInfos.sites.length ? (
            <p id="empty">empty...</p>
          ) : (
            allSites
              .filter((site) => !userInfos.sites.includes(site.id))
              .map((site) => {
                if (inputValue.length > 0) {
                  if (!site.title.includes(inputValue)) {
                    return <></>;
                  }
                }
                return (
                  <button
                    key={site.id}
                    onClick={() => dropDownOnClick(site.id)}
                    className="dropDownItemBtns pointer"
                  >
                    {site.img}
                  </button>
                );
              })
          )}
        </div>
      </section>
    </div>
  );
  function onMouseEnterBtn() {
    console.log("event1");
    setIsHoverLastIdx(true);
  }
  function onMouseLeaveBtn() {
    console.log("event2");
    if (isFocus) return;
    setIsHoverLastIdx(false);
    setIsClicked(false);
    setAnimationInit(Math.random());
  }
  function onClickBtn() {
    console.log("event3");
    setIsClicked(true);
  }
  function onFocusInput() {
    console.log("event4");
    setIsFocus(true);
  }
  function onBlurInput() {
    console.log("event5");
    setTimeout(() => {
      setIsFocus(false);
      setIsHoverLastIdx(false);
      setIsClicked(false);
      setInputValue("");
      setAnimationInit(Math.random());
    }, 150);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    console.log("event7");
    setInputValue(e.target.value);
  }

  function onMinusBtnClick(siteId: number) {
    if (siteId < 0 || siteId > 8) return;
    delSite(siteId);
  }
  function dropDownOnClick(siteId: number) {
    if (siteId < 0 || siteId > 8) return;
    console.log(siteId);
    // setTimeout(() => {
    //     setUserSites([...userSites, siteId]);
    // }, 100);

    setTimeout(() => {
      addSite(siteId);
    }, 100);
  }

  // minusBtn request
  async function delSite(siteId: number) {
    await axiosInstance
      .delete(`/api/mypage/site?id=${siteId}`)
      .then((res) => {
        // response: deleted id
        if (res.data.code > 0) {
          if (res.data.code === 489) {
            console.log("site id is unvalidated");
          }
          return;
        }
        if (res.data.value < 0 || res.data.value > 8) {
          console.log("site id length is unvalidated");
        }
        setUserInfos({
          ...userInfos,
          sites: userInfos.sites.filter((site) => site !== res.data.value),
        });
      })
      .catch(console.error);
  }

  // dropDownBtn request
  async function addSite(siteId: number) {
    await axiosInstance
      .post("/api/mypage/site", { site: siteId })
      .then((res) => {
        if (res.data.value < 0 || res.data.value > 8) {
          console.log("site id length is unvalidated");
        }
        setUserInfos({
          ...userInfos,
          sites: [...userInfos.sites, res.data.value],
        });
      })
      .catch(console.error);
  }
}
