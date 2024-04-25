import { useEffect, useState } from "react";
import { Bookmkarks } from "../../../interfaces/Interfaces"
import { axiosInstance } from "../../../pbl/AxiosUtil";

export default function BookmarkPage() {

    console.log("BookmarkPage");

    const [bookmarks, setBookmarks] = useState<Bookmkarks[]>([]);

    useEffect(() => {

        async function getBookmarks() {
            await axiosInstance.get('/api/bm')
                .then(res => {

                    if (res.data.code > 0) {
                        return;
                    }
                    setBookmarks(res.data.map((rsp: Bookmkarks) => {
                        return {
                            id: rsp.id,
                            title: rsp.title,
                            url: rsp.url,
                            memo: rsp.memo,
                        }
                    }));
                });
        }
        getBookmarks();
    }, []);

    return (
        <>
            <p className="sidebarText">북마크</p>
            <div className="gridContainer bookmark">

                {bookmarks.map(bookmark => {
                    return (
                        <section key={bookmark.id}>
                            <div>
                                <p id="title">{bookmark.title}</p>
                                <button className="pointer" id="btn" onClick={() => onBtnClick(bookmark.url)}>이동</button>
                            </div>
                            <p id="memo">{bookmark.memo}</p>
                            <a href={bookmark.url} target="_blank" rel="noreferrer noopener"><p id="url">
                                {bookmark.url.length > 30 ? bookmark.url.slice(0, 30) + "..." : bookmark.url}
                            </p></a>

                        </section>
                    )
                })}

            </div>
        </>
    )

    function onBtnClick(url: string) {
        console.log("btn clicked");
        window.open(url, "_blank");
    }
}