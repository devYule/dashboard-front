import { useState } from "react";
import Widget from "../../comps/Widget";


const initWidgets = [
    { id: 0, order: 1, width: 2, height: 1, url: 'www.naver.com', isShown: true },
    { id: 1, order: 2, width: 1, height: 1, url: 'www.daum.net', isShown: true },
    { id: 2, order: 3, width: 2, height: 2, url: 'www.google.com', isShown: true },
    { id: 3, order: 4, width: 1, height: 2, url: 'www.nate.com', isShown: true },
    { id: 4, order: 5, width: 2, height: 1, url: 'www.naver.com', isShown: true },
    { id: 5, order: 6, width: 1, height: 1, url: '', isShown: false },
    { id: 6, order: 7, width: 2, height: 1, url: 'www.google.com', isShown: true },
    { id: 7, order: 8, width: 2, height: 2, url: 'www.daum.net', isShown: true },
    { id: 8, order: 9, width: 2, height: 2, url: 'www.daum.net', isShown: true },
    { id: 9, order: 10, width: 2, height: 2, url: 'www.daum.net', isShown: true },
    { id: 10, order: 11, width: 2, height: 2, url: 'www.daum.net', isShown: true },
    { id: 11, order: 12, width: 2, height: 2, url: 'www.daum.net', isShown: true },
    { id: 12, order: 13, width: 2, height: 2, url: 'www.daum.net', isShown: true },
    { id: 13, order: 14, width: 2, height: 2, url: 'www.daum.net', isShown: true },
    { id: 14, order: 15, width: 2, height: 2, url: 'www.daum.net', isShown: true },
    { id: 15, order: 16, width: 2, height: 2, url: 'www.daum.net', isShown: true },


]


export default function SidebarLeft() {

    const [widgets, setWidgets] = useState(initWidgets);



    return (
        <div className="leftSidebar">
            <div className="leftSidebarWidgetContainer" onScroll={onScroll}>
                {/* 추가된 위젯들 추가 */}
                {widgets.map(widget => <Widget key={widget.id} widget={widget} />)}
            </div>
        </div>
    );
    function onScroll() {
        console.log('scroll');
        const scrollTop = document.querySelector('.leftSidebarWidgetContainer')?.scrollTop as number;
        console.log(scrollTop);
    }
}