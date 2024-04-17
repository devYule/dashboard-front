import { useContext } from "react";
import { LeftSidebarActionContext } from "../../../pbl/Contexts";
import { LeftSidebarActions } from "../../../interfaces/Interfaces";

export default function LeftSidebarHoverBtn() {

    const setSidebarAction = useContext(LeftSidebarActionContext);

    return (
        <div className="leftSidebarHoverBtn sidebarBtns">
            <button id="btn" onMouseLeave={onMouseLeave} onClick={onClick}>
                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.9589 38.4813C12.8134 38.3361 12.698 38.1637 12.6192 37.9739C12.5404 37.784 12.4999 37.5805 12.4999 37.375C12.4999 37.1695 12.5404 36.966 12.6192 36.7761C12.698 36.5863 12.8134 36.4139 12.9589 36.2687L24.3558 24.875L12.9589 13.4813C12.6655 13.1879 12.5007 12.7899 12.5007 12.375C12.5007 11.9601 12.6655 11.5621 12.9589 11.2687C13.2523 10.9754 13.6503 10.8105 14.0652 10.8105C14.4801 10.8105 14.878 10.9754 15.1714 11.2687L27.6714 23.7687C27.8169 23.9139 27.9324 24.0863 28.0112 24.2761C28.0899 24.466 28.1305 24.6695 28.1305 24.875C28.1305 25.0805 28.0899 25.284 28.0112 25.4739C27.9324 25.6637 27.8169 25.8361 27.6714 25.9813L15.1714 38.4813C15.0263 38.6268 14.8539 38.7422 14.664 38.821C14.4742 38.8997 14.2707 38.9403 14.0652 38.9403C13.8597 38.9403 13.6562 38.8997 13.4663 38.821C13.2765 38.7422 13.1041 38.6268 12.9589 38.4813ZM35.9402 46.75C36.3546 46.75 36.752 46.5854 37.045 46.2924C37.3381 45.9993 37.5027 45.6019 37.5027 45.1875L37.5027 4.5625C37.5027 4.1481 37.3381 3.75067 37.045 3.45765C36.752 3.16462 36.3546 3 35.9402 3C35.5258 3 35.1284 3.16462 34.8353 3.45765C34.5423 3.75067 34.3777 4.1481 34.3777 4.5625L34.3777 45.1875C34.3777 45.6019 34.5423 45.9993 34.8353 46.2924C35.1284 46.5854 35.5258 46.75 35.9402 46.75Z" fill="black" />
                </svg>
            </button>
        </div>
    )

    function onMouseLeave() {
        console.log('SidebarHoverBtn onMouseLeave');
        setSidebarAction(LeftSidebarActions.NEAR);
    }
    function onClick() {
        console.log('SidebarHoverBtn onClick');
        setSidebarAction(LeftSidebarActions.CLICK);
    }

}