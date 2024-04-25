import { SidebarActions } from "../../../../interfaces/Interfaces";
import WidgetPage from "../../comps/WidgetPage";
import BookmarkPage from "../../comps/BookmarkPage";



export default function SidebarRight({ type, rand }: { type: SidebarActions, rand: number }) {

    // ADD_WIDGET 빼고는 전부 useEffect 로 통신해야함.
    // ADD_WIDGET 은 1X1, 1X2, 2X1, 2X2 의 이미지를 보여주고, 클릭시 해당 위젯 추가해야함.

    return (
        <>
            <div className="rightSidebar" key={rand}>
                {
                    type === SidebarActions.WIDGET ? (
                        <WidgetPage />
                    ) : (
                        <BookmarkPage />
                    )
                }
            </div>
        </>
    );
}