import { useContext, useState } from "react";
import {
  BookmarkList,
  BookmarkNotExists,
  SelectedWidget,
  WidgetBookmarkContainer,
  WidgetBtn,
} from "../../../globalStyle/GlobalStyles";
import MiniLogo from "../sidebar/pbl/MiniLogo";
import { axiosInstance } from "../../../pbl/AxiosUtil";
import { Bookmark } from "../../../interfaces/Interfaces";
import BookmarkComp from "./BookmarkComp";
import { AddWidgetContext } from "../../../pbl/Contexts";

export default function WidgetPage() {
  // 추가 위젯 사이즈 기록용
  const [selectedWidget, setSelectedWidget] = useState<SelectedWidget>();
  // 북마크 리스트 페이징
  const [page, setPage] = useState<number>(2);
  const [hasNextPage, setHasNextPage] = useState(true);
  // 북마크
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const setAddWidget = useContext(AddWidgetContext);

  const widgetBtnList = ["oneTwo", "twoTwo", "oneOne", "twoOne"];

  return (
    <>
      {!selectedWidget ? (
        <>
          <p className="sidebarText">위젯 추가</p>
          <div className="gridContainer r-widget">
            {widgetBtnList.map((id: string) => {
              return (
                <WidgetBtn
                  key={id}
                  id={id}
                  onClick={() => onClickBtn(id)}
                  onMouseLeave={onMouseLeaveWidgetBtn}
                />
              );
            })}
            <MiniLogo />
          </div>
        </>
      ) : (
        <>
          <p className="sidebarText">북마크 선택</p>
          <WidgetBookmarkContainer
            className="gridContainer bookmark"
            id={`b-${selectedWidget.id}`}
            gridRow={selectedWidget.gridRow}
            gridColumn={selectedWidget.gridColumn}
          >
            {bookmarks.length === 0 ? (
              <BookmarkNotExists>텅~</BookmarkNotExists>
            ) : (
              bookmarks.map((b: Bookmark) => (
                <BookmarkComp
                  key={b.id}
                  bookmark={b}
                  onClick={onBookmarkClick}
                  onClickParam={b}
                  btnName="추가"
                />
              ))
            )}
          </WidgetBookmarkContainer>
        </>
      )}
    </>
  );

  function onBookmarkClick(b: Bookmark) {
    if (!selectedWidget) return;

    const row = selectedWidget.gridRow;
    const spanRow =
      parseInt(row.split(" / ")[1]) - parseInt(row.split(" / ")[0]);
    const column = selectedWidget.gridColumn;
    const spanColumn =
      parseInt(column.split(" / ")[1]) - parseInt(column.split(" / ")[0]);

    addWidget(spanRow, spanColumn, b);
  }

  function onClickBtn(targetId: string) {
    const row =
      targetId === "oneTwo"
        ? "1 / 2"
        : targetId === "twoTwo"
        ? "2 / 4"
        : targetId === "oneOne"
        ? "4 / 5"
        : "4 / 6";
    const column =
      targetId === "oneTwo" || targetId === "twoTwo"
        ? "1 / 3"
        : targetId === "oneOne"
        ? "1 / 2"
        : "2 / 3";

    setTimeout(() => {
      setSelectedWidget({
        id: targetId,
        gridRow: row,
        gridColumn: column,
      } as SelectedWidget);
    }, 100);

    if (bookmarks.length > 0) return;
    getBookmarksInit(targetId, row, column);
  }

  function onMouseLeaveWidgetBtn() {
    setSelectedWidget(undefined);
  }

  async function getBookmarksInit(
    targetId: string,
    row: string,
    column: string
  ) {
    await axiosInstance.get(`/api/bm/1`).then((res) => {
      if (res.data.code > 0) {
        return;
      }

      if (res.data.hasNext === 1) {
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
      setBookmarks([
        ...bookmarks,
        ...res.data.bookmarks.map((b: Bookmark) => {
          return { id: b.id, title: b.title, url: b.url, memo: b.memo };
        }),
      ]);
    });
  }

  async function addWidget(rowSize: number, columnSize: number, b: Bookmark) {
    await axiosInstance
      .post("api/widget", {
        order: 0,
        width: columnSize,
        height: rowSize,
        url: b.url,
        isShown: 1,
        type: 0,
        bookmarkId: b.id,
      })
      .then((res) => {
        if (res.data.code > 0) return;
        setAddWidget({
          id: res.data.id,
          order: 0,
          width: columnSize,
          height: rowSize,
          title: b.title,
          memo: b.memo,
          url: b.url,
          isShown: true,
          shot: res.data.shot
        });
      });
  }
}
