import { useContext, useState } from "react"
import { SidebarActionContext, SidebarSelectedItemContext } from "../../../../pbl/Contexts"
import MiniLogo from "../pbl/MiniLogo";
import { SidebarActions } from "../../../../interfaces/Interfaces";
import Widget from "../../comps/Widget";

interface Bookmkarks {
    id: number;
    title: string;
    url: string;
    memo: string;
}

const initBookmarks: Bookmkarks[] = [
    { id: 0, title: "Google", url: "https://www.google.com", memo: "구글" },
    { id: 1, title: "Naver", url: "https://www.naver.com", memo: "네이버" },
    { id: 2, title: "Daum", url: "https://www.daum.net", memo: "다음" }
]

export default function SidebarRight({ type, rand }: { type: SidebarActions, rand: number }) {


    const setSidebarAction = useContext(SidebarActionContext);
    const [bookmarks, setBookmarks] = useState<Bookmkarks[]>(initBookmarks);
    // ADD_WIDGET 빼고는 전부 useEffect 로 통신해야함.
    // ADD_WIDGET 은 1X1, 1X2, 2X1, 2X2 의 이미지를 보여주고, 클릭시 해당 위젯 추가해야함.
    return (
        <>
            {
                type === SidebarActions.WIDGET ? (
                    <div className="rightSidebar" key={rand}>
                        {/* WIDGET 일 경우 */}
                        <p className="sidebarText">위젯 추가</p>
                        <div className="gridContainer widget">
                            <div id="oneTwo">
                                <button></button>
                            </div>
                            <div id="twoTwo">
                                <button></button>
                            </div>
                            <div id="oneOne">
                                <button></button>
                            </div>
                            <div id="twoOne">
                                <button></button>
                            </div>
                            <MiniLogo />
                        </div>
                    </div>
                ) : (
                    <div className="rightSidebar" key={rand}>
                        {/* BOOKMARK 일 경우 */}
                        <p className="sidebarText">북마크</p>
                        <div className="gridContainer bookmark">

                            {bookmarks.map(bookmark => {
                                return (
                                    <section key={bookmark.id}>
                                        <div>
                                            <p id="title">{bookmark.title}</p>
                                            <button id="btn" onClick={() => onBtnClick(bookmark.url)}>이동</button>
                                        </div>

                                        <p id="memo">{bookmark.memo}</p>
                                        <p id="url">{bookmark.url}</p>
                                    </section>
                                )
                            })}

                        </div>
                    </div>

                )
            }
        </>
    );
    function onBtnClick(url: string) {
        console.log("btn clicked");
        window.open(url, "_blank");
    }


}