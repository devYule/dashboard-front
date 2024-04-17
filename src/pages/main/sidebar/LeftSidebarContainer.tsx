import { useState } from "react";
import LeftSidebarHoverBtn from "../comps/LeftSidebarHoverBtn";
import { LeftSidebarActions } from "../../../interfaces/Interfaces";
import { LeftSidebarActionContext } from "../../../pbl/Contexts";
import SidebarLeft from "./left/SidebarLeft";

export default function LeftSidebarContainer() {
    const [leftSidebarAction, setLeftSidebarAction] = useState<LeftSidebarActions>(LeftSidebarActions.NONE);
    const [animationInit, setAnimationInit] = useState<number>(0);

    return (
        <div className="leftSidebarContainer" onMouseEnter={leftSidebarOnMouseEnter} onMouseLeave={leftSidebarOnMouseLeave}
            key={animationInit}>
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
        setAnimationInit(animationInit + 1);
    }
}