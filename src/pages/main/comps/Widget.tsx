import { WidgetInter } from "../../../interfaces/Interfaces";


export default function Widget({ widget, gridStyle }: { widget: WidgetInter, gridStyle?: { gridColumn: string, gridRow: string, width: string, height: string } }) {

    // const sizeClassName: string | undefined = widget.isShown ? 'widget-item' : undefined;

    console.log('render Widget');
    console.log('id: ', widget.id);
    console.log('title: ', widget.title);
    console.log('url: ', widget.url);
    console.log('memo: ', widget.memo);

    return (
        <div className="m-widget" style={gridStyle}>
            {/* 위젯에 포함된 url, 메모, 제목 등 여기서 사용하여 위젯 모양 만들기 */}
            <div className="basic-info">
                <p className="inner-w" id="title">{widget.title.length > 12 ? widget.title.substring(0, 12) + '...' : widget.title}</p>
                <p className="inner-w" id="memo">{widget.memo.length > 15 ? widget.memo.substring(0, 15) + '...' : widget.memo}</p>
                <p className="inner-w" id="url">{widget.url.length > 12 ? widget.url.substring(0, 12) + '...' : widget.url}</p>
            </div>
        </div>
    );
}