import MiniLogo from "../sidebar/pbl/MiniLogo";

export default function WidgetPage() {
    return (
        <>
            <p className="sidebarText">위젯 추가</p>
            <div className="gridContainer widget">
                <div id="oneTwo">
                    <button></button>
                </div>
                <div id="twoTwo">
                    <button></button>
                </div>
                <div id="oneOne">
                    <button></button>
                </div>
                <div id="twoOne">
                    <button></button>
                </div>
                <MiniLogo />
            </div>
        </>
    );
}