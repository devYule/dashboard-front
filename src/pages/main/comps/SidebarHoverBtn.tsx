import { useContext, useState } from "react";
import { SidebarActionContext } from "../../../pbl/Contexts";
import { SidebarActions } from "../../../interfaces/Interfaces";

export default function SidebarHoverBtn() {
    const setSidebarAction = useContext(SidebarActionContext);




    return (
        <div className="sidebarHoverBtn sidebarBtns" >
            <button id="btn" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M37.0438 11.3937C37.1893 11.5389 37.3047 11.7113 37.3835 11.9011C37.4622 12.091 37.5028 12.2945 37.5028 12.5C37.5028 12.7055 37.4622 12.909 37.3835 13.0989C37.3047 13.2887 37.1893 13.4611 37.0438 13.6063L25.6469 25L37.0438 36.3937C37.3371 36.6871 37.502 37.0851 37.502 37.5C37.502 37.9149 37.3371 38.3129 37.0438 38.6063C36.7504 38.8996 36.3524 39.0645 35.9375 39.0645C35.5226 39.0645 35.1246 38.8996 34.8312 38.6063L22.3312 26.1063C22.1857 25.9611 22.0703 25.7887 21.9915 25.5989C21.9128 25.409 21.8722 25.2055 21.8722 25C21.8722 24.7945 21.9128 24.591 21.9915 24.4011C22.0703 24.2113 22.1857 24.0389 22.3312 23.8937L34.8312 11.3937C34.9764 11.2482 35.1488 11.1328 35.3386 11.054C35.5285 10.9753 35.732 10.9347 35.9375 10.9347C36.143 10.9347 36.3465 10.9753 36.5364 11.054C36.7262 11.1328 36.8986 11.2482 37.0438 11.3937ZM14.0625 3.125C13.6481 3.125 13.2507 3.28962 12.9576 3.58265C12.6646 3.87567 12.5 4.2731 12.5 4.6875V45.3125C12.5 45.7269 12.6646 46.1243 12.9576 46.4174C13.2507 46.7104 13.6481 46.875 14.0625 46.875C14.4769 46.875 14.8743 46.7104 15.1674 46.4174C15.4604 46.1243 15.625 45.7269 15.625 45.3125V4.6875C15.625 4.2731 15.4604 3.87567 15.1674 3.58265C14.8743 3.28962 14.4769 3.125 14.0625 3.125Z" fill="black" /></svg>
            </button>
        </div>
    );


    function onMouseEnter() {
        setSidebarAction(SidebarActions.HOVER);
    }
    function onMouseLeave() {
        console.log('SidebarHoverBtn onMouseLeave');
        setSidebarAction(SidebarActions.NEAR);
    }

}