import { useState } from "react";
import LeftSidebarHoverBtn from "../comps/LeftSidebarHoverBtn";
import { LeftSidebarActions } from "../../../interfaces/Interfaces";
import { LeftSidebarActionContext } from "../../../pbl/Contexts";
import SidebarLeft from "./left/SidebarLeft";

export default function LeftSidebarContainer() {
    const [leftSidebarAction, setLeftSidebarAction] = useState<LeftSidebarActions>(LeftSidebarActions.NONE);

    return (
        <div className="leftSidebarContainer" onMouseEnter={leftSidebarOnMouseEnter} onMouseLeave={leftSidebarOnMouseLeave}>
            <LeftSidebarActionContext.Provider value={setLeftSidebarAction}>
                {leftSidebarAction === LeftSidebarActions.NEAR && (
                        <LeftSidebarHoverBtn />
                        )}
                {leftSidebarAction === LeftSidebarActions.CLICK && (
                    <SidebarLeft />
                )}
                

            </LeftSidebarActionContext.Provider>
        </div>
    )

    function leftSidebarOnMouseEnter() {
        if (leftSidebarAction === LeftSidebarActions.NONE) {
            setLeftSidebarAction(LeftSidebarActions.NEAR);
        }
    }
    function leftSidebarOnMouseLeave() {
        setLeftSidebarAction(LeftSidebarActions.NONE);
    }
}