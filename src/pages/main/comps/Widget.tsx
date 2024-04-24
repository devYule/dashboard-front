import { WidgetInter } from "../../../interfaces/Interfaces";


export default function Widget({ widget, gridStyle }: { widget: WidgetInter, gridStyle?: {gridColumn: string, gridRow: string, width: string, height: string} }) {

    // const sizeClassName: string | undefined = widget.isShown ? 'widget-item' : undefined;

    return (
        <div className="m-widget" style={gridStyle}>
            {/* 위젯에 포함된 url, 메모, 제목 등 여기서 사용하여 위젯 모양 만들기 */}
            
        </div>
    );
}