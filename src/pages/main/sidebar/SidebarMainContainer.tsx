import RightSidebarContainer from "./RightSidebarContainer";
import { useLocation } from "react-router-dom";
import LeftSidebarContainer from "./LeftSidebarContainer";

export default function SidebarMainContainer() {
    const location = useLocation();
    console.log('SidebarMainContainer');

    return (
        <>
            {location.pathname === '/search' && <LeftSidebarContainer />}
            <RightSidebarContainer />
        </>
    );

}