import { useContext } from "react"
import { SidebarActionContext, SidebarDirectionContext, SidebarSelectedItemContext } from "../../../pbl/Contexts"


export default function SidebarContainer() {

    // sidebarAction from <MainContainer />
    // 아래 상태들을 바탕으로 나타낼 컴포넌트들 결정.
    const sidebardAction = useContext(SidebarActionContext);
    const sidebarDirection = useContext(SidebarDirectionContext);
    const sidebarSelectedItem = useContext(SidebarSelectedItemContext);

    return (
        <div className="sidebarContainer">


        </div>
    )
}