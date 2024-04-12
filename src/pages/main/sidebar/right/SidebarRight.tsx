import { useContext } from "react"
import { SidebarSelectedItemContext } from "../../../../pbl/Contexts"
import MiniLogo from "../pbl/MiniLogo";

export default function SidebarRight() {

    const selectedItem = useContext(SidebarSelectedItemContext);

    // ADD_WIDGET 빼고는 전부 useEffect 로 통신해야함.
    // ADD_WIDGET 은 1X1, 1X2, 2X1, 2X2 의 이미지를 보여주고, 클릭시 해당 위젯 추가해야함.



    return (
        <div className="rightSidebar">
                {/* ADD_WIDGET 일 경우 */}
                <p className="sidebarText">위젯 추가</p>
                <div className="gridContainer">
                    <div id="oneTwo"></div>
                    <div id="twoTwo"></div>
                    <div id="oneOne"></div>
                    <div id="twoOne"></div>
                    <MiniLogo />
                </div>

                {/* BOOKMARK 일 경우 */}


                {/* MYPAGE 일 경우 */}


                {/* LOGOUT 일 경우? */}
        </div>
    )
}