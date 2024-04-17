import { useContext } from "react";
import { SidebarActionContext } from "../../../pbl/Contexts";
import { SidebarActions } from "../../../interfaces/Interfaces";

export default function SidebarClickBtn() {
    const setSidebarAction = useContext(SidebarActionContext);
    return (
        <div className="sidebarClickBtn sidebarBtns">
            <button id="btn" onClick={onClick} onMouseLeave={onMouseLeave}>
                <svg viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="52" height="52" rx="14.5" fill="black" /><rect x="2.5" y="2.5" width="52" height="52" rx="14.5" stroke="black" strokeWidth="5" /><path d="M34.2 46.0385C34.2 47.4339 33.6328 48.7722 32.6233 49.7589C31.6137 50.7457 30.2444 51.3 28.8167 51.3C27.3889 51.3 26.0197 50.7457 25.0101 49.7589C24.0005 48.7722 23.4333 47.4339 23.4333 46.0385C23.4333 44.643 24.0005 43.3047 25.0101 42.318C26.0197 41.3313 27.3889 40.7769 28.8167 40.7769C30.2444 40.7769 31.6137 41.3313 32.6233 42.318C33.6328 43.3047 34.2 44.643 34.2 46.0385ZM34.2 28.5C34.2 29.8955 33.6328 31.2338 32.6233 32.2205C31.6137 33.2072 30.2444 33.7616 28.8167 33.7616C27.3889 33.7616 26.0197 33.2072 25.0101 32.2205C24.0005 31.2338 23.4333 29.8955 23.4333 28.5C23.4333 27.1046 24.0005 25.7663 25.0101 24.7795C26.0197 23.7928 27.3889 23.2385 28.8167 23.2385C30.2444 23.2385 31.6137 23.7928 32.6233 24.7795C33.6328 25.7663 34.2 27.1046 34.2 28.5ZM34.2 10.9616C34.2 12.357 33.6328 13.6953 32.6233 14.682C31.6137 15.6688 30.2444 16.2231 28.8167 16.2231C27.3889 16.2231 26.0197 15.6688 25.0101 14.682C24.0005 13.6953 23.4333 12.357 23.4333 10.9616C23.4333 9.5661 24.0005 8.22781 25.0101 7.24108C26.0197 6.25435 27.3889 5.70001 28.8167 5.70001C30.2444 5.70001 31.6137 6.25435 32.6233 7.24108C33.6328 8.22781 34.2 9.5661 34.2 10.9616Z" fill="#E9E9E9" /></svg>
            </button>
        </div>
    );
    function onClick() {
        setSidebarAction(SidebarActions.CLICK);
    }
    function onMouseLeave() {
        console.log('SidebarClickBtn onMouseLeave');
        setSidebarAction(SidebarActions.NEAR);

    }
}