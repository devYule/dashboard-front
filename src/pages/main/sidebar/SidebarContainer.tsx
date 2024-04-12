import { useContext } from "react"
import { SidebarActionContext, SidebarDirectionContext, SidebarSelectedItemContext } from "../../../pbl/Contexts"


export default function SidebarContainer() {

    // sidebarAction from <MainContainer />
    const sidebardAction = useContext(SidebarActionContext);
    const sidebarDirection = useContext(SidebarDirectionContext);

    return (
        <div className="sidebarContainer">

            
        </div>
    )
}