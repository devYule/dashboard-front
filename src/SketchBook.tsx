import { useEffect, useState } from "react";
import Widget from "./pages/main/comps/Widget";
import '../src/pages/search/styles/search.scss'
import SidebarRight from "./pages/main/sidebar/right/SidebarRight";
import { SidebarActions } from "./interfaces/Interfaces";
import Contents from "./pages/search/comps/Contents";
import TextLogo from "./pages/search/comps/TextLogo";
import SearchBarContainer from "./pages/main/comps/SearchBarContainer";
import SidebarMainContainer from "./pages/main/sidebar/SidebarMainContainer";

const mkinit = () => {
    const initWdg = [];
    for (let i = 12; i < 30; i++) {
        initWdg.push({ id: i, order: i, width: 2, height: 1, url: 'www.naver.com', isShown: true });
    }
    return initWdg;
}
const initWidgets = [
    { id: 0, order: 1, width: 2, height: 1, url: 'www.naver.com', isShown: true },
    { id: 1, order: 2, width: 1, height: 1, url: 'www.daum.net', isShown: true },
    { id: 2, order: 3, width: 2, height: 2, url: 'www.google.com', isShown: true },
    { id: 3, order: 4, width: 1, height: 2, url: 'www.nate.com', isShown: true },
    { id: 4, order: 5, width: 2, height: 1, url: 'www.naver.com', isShown: true },
    { id: 5, order: 6, width: 1, height: 1, url: '', isShown: false },
    { id: 6, order: 7, width: 2, height: 1, url: 'www.google.com', isShown: true },
    { id: 7, order: 8, width: 2, height: 2, url: 'www.daum.net', isShown: true },
]

export default function SidebarLeft() {

    const [widgets, setWidgets] = useState(initWidgets);
    useEffect(() => {
        setWidgets(mkinit());
    }, []);
    return (<>
        <div className="logoutModal" >
            <button className="logoutBtn pointer" >
                <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clipRule="evenodd" d="M21.8738 30.625C21.8738 31.0118 21.7585 31.3827 21.5534 31.6562C21.3483 31.9297 21.0702 32.0833 20.7801 32.0833H3.28107C2.991 32.0833 2.71282 31.9297 2.50771 31.6562C2.30261 31.3827 2.18738 31.0118 2.18738 30.625V4.375C2.18738 3.98823 2.30261 3.61729 2.50771 3.3438C2.71282 3.07031 2.991 2.91667 3.28107 2.91667H20.7801C21.0702 2.91667 21.3483 3.07031 21.5534 3.3438C21.7585 3.61729 21.8738 3.98823 21.8738 4.375V10.2083C21.8738 10.5951 21.989 10.966 22.1941 11.2395C22.3992 11.513 22.6774 11.6667 22.9675 11.6667C23.2575 11.6667 23.5357 11.513 23.7408 11.2395C23.9459 10.966 24.0612 10.5951 24.0612 10.2083V4.375C24.0612 3.21468 23.7155 2.10188 23.1002 1.28141C22.4848 0.460936 21.6503 0 20.7801 0H3.28107C2.41087 0 1.57632 0.460936 0.961002 1.28141C0.345683 2.10188 0 3.21468 0 4.375L0 30.625C0 31.7853 0.345683 32.8981 0.961002 33.7186C1.57632 34.5391 2.41087 35 3.28107 35H20.7801C21.6503 35 22.4848 34.5391 23.1002 33.7186C23.7155 32.8981 24.0612 31.7853 24.0612 30.625V24.7917C24.0612 24.4049 23.9459 24.034 23.7408 23.7605C23.5357 23.487 23.2575 23.3333 22.9675 23.3333C22.6774 23.3333 22.3992 23.487 22.1941 23.7605C21.989 24.034 21.8738 24.4049 21.8738 24.7917V30.625Z" fill="black" />
                    <path fill-rule="evenodd" clipRule="evenodd" d="M34.6787 18.5325C34.7805 18.397 34.8613 18.2361 34.9165 18.0589C34.9716 17.8817 35 17.6918 35 17.5C35 17.3082 34.9716 17.1182 34.9165 16.941C34.8613 16.7639 34.7805 16.6029 34.6787 16.4675L28.1166 7.71747C27.9112 7.44363 27.6327 7.28979 27.3422 7.28979C27.0518 7.28979 26.7733 7.44363 26.5679 7.71747C26.3625 7.99131 26.2472 8.36271 26.2472 8.74997C26.2472 9.13723 26.3625 9.50864 26.5679 9.78247L31.2642 16.0416H12.0306C11.7405 16.0416 11.4623 16.1953 11.2572 16.4688C11.0521 16.7423 10.9369 17.1132 10.9369 17.5C10.9369 17.8867 11.0521 18.2577 11.2572 18.5312C11.4623 18.8047 11.7405 18.9583 12.0306 18.9583H31.2642L26.5679 25.2175C26.3625 25.4913 26.2472 25.8627 26.2472 26.25C26.2472 26.6372 26.3625 27.0086 26.5679 27.2825C26.7733 27.5563 27.0518 27.7101 27.3422 27.7101C27.6327 27.7101 27.9112 27.5563 28.1166 27.2825L34.6787 18.5325Z" fill="black" />
                </svg>
            </button>

        </div>

    </>
    )
}