import { useState } from "react";
import { SidebarActionContext } from "../../../pbl/Contexts";
import { SidebarActions } from "../../../interfaces/Interfaces";
import SidebarClickBtn from "../comps/SidebarClickBtn";
import SidebarHoverBtn from "../comps/SidebarHoverBtn";
import SidebarExtendedBtn from "../comps/SidebarExtendedBtn";
import SidebarRight from "./right/SidebarRight";

export default function RightSidebarContainer() {
    const [rightSidebarAction, setSidebarAction] = useState<SidebarActions>(SidebarActions.NONE);
    console.log('SidebarMainContainer');
    const [animationInit, setAnimationInit] = useState<number>(Math.random());


    return (
        <div className="rightSidebarContainer" onMouseEnter={rightSidebarOnMouseEnter} onMouseLeave={rightSidebarOnMouseLeave}>
            <SidebarActionContext.Provider value={setSidebarAction} key={animationInit}>
                {rightSidebarAction === SidebarActions.NEAR ? (
                    <SidebarHoverBtn />
                )
                    :
                    rightSidebarAction === SidebarActions.HOVER ? (
                        <SidebarClickBtn />
                    )
                        : rightSidebarAction === SidebarActions.CLICK ? (
                            <SidebarExtendedBtn />
                        )
                            : rightSidebarAction === SidebarActions.WIDGET || rightSidebarAction === SidebarActions.BOOKMARK ? (
                                <SidebarRight type={rightSidebarAction} rand={animationInit} />
                            )
                                :
                                <></>
                }
            </SidebarActionContext.Provider>

        </div>
    );

    function rightSidebarOnMouseEnter() {
        if (rightSidebarAction === SidebarActions.NONE) {
            setSidebarAction(SidebarActions.NEAR);
        }
    }
    function rightSidebarOnMouseLeave() {
        setSidebarAction(SidebarActions.NONE);
        setAnimationInit(Math.random());
    }
}