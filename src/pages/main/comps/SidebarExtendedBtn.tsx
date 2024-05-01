import { useContext, useState } from "react";
import { SidebarActionContext } from "../../../pbl/Contexts";
import { SidebarActions } from "../../../interfaces/Interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../pbl/AxiosUtil";

interface HoverMenuId {
  id: string;
  content: string;
}

export default function SidebarExtendedBtn() {
  const setSidebarAction = useContext(SidebarActionContext);
  const [hoverMenuId, setHoverMenuId] = useState<HoverMenuId>({
    id: "",
    content: "",
  });
  const [logoutBtnStack, setLogoutBtnStack] = useState<number>(0);
  const [searchType, setSearchType] = useState<number>();
  const locationInfo = useLocation();
  const navi = useNavigate();

  return (
    <>
      <div className="sidebarTooltip">
        <p id={hoverMenuId.id}>{hoverMenuId.content}</p>
      </div>
      <div className="sidebarExtendedContainer">
        <section className="upperSection">
          {/* mypage */}
          <button
            className="pointer"
            id="mypage"
            onMouseEnter={() =>
              onMouseEnterEachBtn({ id: "m", content: "마이페이지" })
            }
            onClick={() => navi("/mypage")}
          >
            <p>M</p>
          </button>
          {/* logout */}
          <button
            className="pointer"
            id="logout"
            onMouseEnter={() =>
              onMouseEnterEachBtn({ id: "l", content: "로그아웃" })
            }
            onMouseLeave={onMouseLeaveLogoutAndBtn}
            onClick={logOutBtnOnClick}
          >
            {/* Navi */}
            <p>L</p>
          </button>
          {/* search type */}
          <button
            className="pointer"
            id="search-type"
            onMouseEnter={() =>
              onMouseEnterEachBtn({ id: "s", content: "검색 타입" })
            }
            onClick={searchTypeBtnOnclick}
            onMouseLeave={onMouseLeaveSearchTypeBtn}
          >
            {/* Sidebar */}
            <p>S</p>
          </button>
        </section>

        <section className="middleSection">
          <div className="separator"></div>
        </section>

        <section className="lowerSection">
          {/* bookmarks */}
          <button
            className="pointer"
            id="bookmarks"
            onMouseEnter={() =>
              onMouseEnterEachBtn({ id: "b", content: "북마크" })
            }
            onClick={() => onClickWidgetOrBookmark(SidebarActions.BOOKMARK)}
          >
            {/* Sidebar */}
            <p>B</p>
          </button>
          {locationInfo.pathname === "/main" ? (
            <>
              {/* widget */}
              <button
                className="pointer"
                id="widgets"
                onMouseEnter={() =>
                  onMouseEnterEachBtn({ id: "w", content: "위젯" })
                }
                onClick={() => onClickWidgetOrBookmark(SidebarActions.WIDGET)}
              >
                {/* Sidebar */}
                <p>W</p>
              </button>
            </>
          ) : (
            <></>
          )}
        </section>
      </div>
    </>
  );

  function onMouseEnterEachBtn({ id, content }: HoverMenuId) {
    setHoverMenuId({ id, content });
  }

  function onClickWidgetOrBookmark(clicked: SidebarActions) {
    if (
      SidebarActions.WIDGET === clicked ||
      SidebarActions.BOOKMARK === clicked
    ) {
      setSidebarAction(clicked);
    }
  }

  function onMouseLeaveLogoutAndBtn() {
    setLogoutBtnStack(0);
  }

  async function onMouseLeaveSearchTypeBtn() {
    onMouseLeaveLogoutAndBtn();
    if (searchType === undefined) return;
    await axiosInstance.patch(`/api/search?type=${searchType}`).then((res) => {
      if (res.data.code > 0) {
        throw Error("server error");
      }
    });
  }

  function logOutBtnOnClick() {
    if (logoutBtnStack < 1) {
      setLogoutBtnStack(1);
      setHoverMenuId({ ...hoverMenuId, content: "한번 더 눌러주세요." });
      return;
    }
    doLogOut();
  }

  async function searchTypeBtnOnclick() {
    if (logoutBtnStack === 0) {
      setLogoutBtnStack(1);
      await axiosInstance.get("/api/search/type").then((res) => {
        if (res.data.code > 0) {
          throw Error("has not search type");
        }
        if (res.data.value === 0 || res.data.value === 1) {
          setSearchType(res.data.value);
          setHoverMenuId({
            ...hoverMenuId,
            content:
              res.data.value === 0
                ? "결과 우선으로 변경"
                : "속도 우선으로 변경",
          });
        }
      });
      return;
    }
    if (logoutBtnStack === 1) {
      let willChangeNum = searchType === 1 ? 0 : 1;
      setSearchType(willChangeNum);
      setHoverMenuId({
        ...hoverMenuId,
        content:
          willChangeNum === 0 ? "결과 우선으로 변경" : "속도 우선으로 변경",
      });
    }
  }

  function doLogOut() {
    localStorage.removeItem("at");
    window.location.reload();
  }
}
