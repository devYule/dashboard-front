import { useContext, useState } from "react";
import { SidebarActionContext } from "../../../pbl/Contexts";
import { SidebarActions } from "../../../interfaces/Interfaces";
import { useLocation, useNavigate } from "react-router-dom";

interface HoverMenuId {
    id: string;
    content: string;
}


export default function SidebarExtendedBtn() {

    const setSidebarAction = useContext(SidebarActionContext);
    const [hoverMenuId, setHoverMenuId] = useState<HoverMenuId>({ id: '', content: '' });
    const [logoutBtnStack, setLogoutBtnStack] = useState<number>(0);
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
                    <button className="pointer" id="mypage"
                        onMouseEnter={() => onMouseEnterEachBtn({ id: 'm', content: '마이페이지' })}
                        onClick={() => navi('/mypage')}>

                        <p>M</p>
                    </button>
                    {/* logout */}
                    <button className="pointer" id="logout"
                        onMouseEnter={() => onMouseEnterEachBtn({ id: 'l', content: '로그아웃' })}
                        onMouseLeave={onMouseLeaveLogoutBtn}
                        onClick={logOutBtnOnClick}>
                        {/* Navi */}
                        <p>L</p>
                    </button>

                </section>

                <section className="middleSection">
                    <div className="separator"></div>

                </section>

                <section className="lowerSection">
                    {/* bookmarks */}
                    <button className="pointer" id="bookmarks"
                        onMouseEnter={() => onMouseEnterEachBtn({ id: 'b', content: '북마크' })}
                        onClick={() => onClickWidgetOrBookmark(SidebarActions.BOOKMARK)}>
                        {/* Sidebar */}
                        <p>B</p>
                    </button>
                    {locationInfo.pathname === '/main' ? (
                        <>
                            {/* widget */}
                            <button className="pointer" id="widgets"
                                onMouseEnter={() => onMouseEnterEachBtn({ id: 'w', content: '위젯' })}
                                onClick={() => onClickWidgetOrBookmark(SidebarActions.WIDGET)}>
                                {/* Sidebar */}
                                <p>W</p>
                            </button>
                        </>
                    ) : <></>}
                </section>
            </div>
        </>
    );

    function onMouseEnterEachBtn({ id, content }: HoverMenuId) {
        setHoverMenuId({ id, content });
    }

    function onClickWidgetOrBookmark(clicked: SidebarActions) {
        if (SidebarActions.WIDGET === clicked || SidebarActions.BOOKMARK === clicked) {
            setSidebarAction(clicked);
        }
    }

    function onMouseLeaveLogoutBtn() {
        setLogoutBtnStack(0);
    }
    function logOutBtnOnClick() {
        if (logoutBtnStack === 0) {
            setLogoutBtnStack(1);
            setHoverMenuId({ ...hoverMenuId, content: '한번 더 눌러주세요.' });
        }
        if (logoutBtnStack === 1) {
            doLogOut();
        }


    }
    function doLogOut() {
        localStorage.removeItem('at');
        window.location.reload();
    }
}