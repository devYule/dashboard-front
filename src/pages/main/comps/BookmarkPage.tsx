import { useEffect, useState } from "react";
import { Bookmark } from "../../../interfaces/Interfaces";
import { axiosInstance } from "../../../pbl/AxiosUtil";
import BookmarkComp from "./BookmarkComp";
import { BookmarkNotExists } from "../../../globalStyle/GlobalStyles";

export default function BookmarkPage() {
  console.log("BookmarkPage");

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    async function getBookmarks() {
      await axiosInstance.get("/api/bm").then((res) => {
        if (res.data.code > 0) {
          return;
        }
        setBookmarks(
          res.data.map((rsp: Bookmark) => {
            return {
              id: rsp.id,
              title: rsp.title,
              url: rsp.url,
              memo: rsp.memo,
            };
          })
        );
      });
    }
    getBookmarks();
  }, []);

  
  return (
    <>
      <p className="sidebarText">북마크</p>
      <div className="gridContainer bookmark">
        {bookmarks.length === 0 ? (
          <BookmarkNotExists topVal="500%">텅~</BookmarkNotExists>
        ) : (
          bookmarks.map((bookmark) => (
            <BookmarkComp
              key={bookmark.id}
              bookmark={bookmark}
              onClick={onBtnClick}
              onClickParam={bookmark.url}
              btnName="이동"
              delBtn={{ bookmarks: bookmarks, setter: setBookmarks }}
            />
          ))
        )}
      </div>
    </>
  );

  function onBtnClick(url: string) {
    console.log("btn clicked");
    window.open(url, "_blank");
  }
}
