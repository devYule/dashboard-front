import { useState } from "react";
import { WidgetInter } from "../../../interfaces/Interfaces";
import { WidgetDelBtn } from "../../../globalStyle/GlobalStyles";
import { axiosInstance } from "../../../pbl/AxiosUtil";

export default function Widget({
  widget,
  gridStyle,
  widgetDel,
}: {
  widget: WidgetInter;
  gridStyle?: {
    gridColumn: string;
    gridRow: string;
    width: string;
    height: string;
  };
  widgetDel?: {
    prev: WidgetInter[];
    setter: React.Dispatch<React.SetStateAction<WidgetInter[]>>;
  };
}) {
  // const sizeClassName: string | undefined = widget.isShown ? 'widget-item' : undefined;

  const [addClass, setAddClass] = useState<string>("");
  const [popupDelBtn, setPopupDelBtn] = useState<boolean>(false);
  const [popupTimeouts, setPopupTimeouts] = useState<NodeJS.Timeout[]>([]);
  const [isDelBtnHover, setIsDelBtnHover] = useState<boolean>(false);

  return (
    <>
      <div
        className={"m-widget pointer " + addClass}
        style={gridStyle}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onWidgetClick}
      >
        {popupDelBtn && (
          <div style={{ position: "absolute" }}>
            <WidgetDelBtn
              className="pointer"
              onClick={widgetDelBtnOnClick}
              onMouseEnter={() => setIsDelBtnHover(true)}
              onMouseLeave={() => setIsDelBtnHover(false)}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35 17.5C35 22.1413 33.1563 26.5925 29.8744 29.8744C26.5925 33.1563 22.1413 35 17.5 35C12.8587 35 8.40752 33.1563 5.12563 29.8744C1.84374 26.5925 0 22.1413 0 17.5C0 12.8587 1.84374 8.40752 5.12563 5.12563C8.40752 1.84374 12.8587 0 17.5 0C22.1413 0 26.5925 1.84374 29.8744 5.12563C33.1563 8.40752 35 12.8587 35 17.5ZM11.7119 10.1631C11.5065 9.95775 11.2279 9.84237 10.9375 9.84237C10.6471 9.84237 10.3685 9.95775 10.1631 10.1631C9.95775 10.3685 9.84237 10.6471 9.84237 10.9375C9.84237 11.2279 9.95775 11.5065 10.1631 11.7119L15.9534 17.5L10.1631 23.2881C10.0614 23.3898 9.98077 23.5105 9.92573 23.6434C9.87069 23.7763 9.84237 23.9187 9.84237 24.0625C9.84237 24.2063 9.87069 24.3487 9.92573 24.4816C9.98077 24.6145 10.0614 24.7352 10.1631 24.8369C10.3685 25.0423 10.6471 25.1576 10.9375 25.1576C11.0813 25.1576 11.2237 25.1293 11.3566 25.0743C11.4895 25.0192 11.6102 24.9386 11.7119 24.8369L17.5 19.0466L23.2881 24.8369C23.3898 24.9386 23.5105 25.0192 23.6434 25.0743C23.7763 25.1293 23.9187 25.1576 24.0625 25.1576C24.2063 25.1576 24.3487 25.1293 24.4816 25.0743C24.6145 25.0192 24.7352 24.9386 24.8369 24.8369C24.9386 24.7352 25.0192 24.6145 25.0743 24.4816C25.1293 24.3487 25.1576 24.2063 25.1576 24.0625C25.1576 23.9187 25.1293 23.7763 25.0743 23.6434C25.0192 23.5105 24.9386 23.3898 24.8369 23.2881L19.0466 17.5L24.8369 11.7119C24.9386 11.6102 25.0192 11.4895 25.0743 11.3566C25.1293 11.2237 25.1576 11.0813 25.1576 10.9375C25.1576 10.7937 25.1293 10.6513 25.0743 10.5184C25.0192 10.3855 24.9386 10.2648 24.8369 10.1631C24.7352 10.0614 24.6145 9.98077 24.4816 9.92573C24.3487 9.87069 24.2063 9.84237 24.0625 9.84237C23.9187 9.84237 23.7763 9.87069 23.6434 9.92573C23.5105 9.98077 23.3898 10.0614 23.2881 10.1631L17.5 15.9534L11.7119 10.1631Z"
                  fill="black"
                />
              </svg>
            </WidgetDelBtn>
          </div>
        )}
        {/* 위젯에 포함된 url, 메모, 제목 등 여기서 사용하여 위젯 모양 만들기 */}
        <div className="basic-info">
          <p className="inner-w" id="title">
            {widget.title.length > 20
              ? widget.title.substring(0, 20) + "..."
              : widget.title}
          </p>
          <p className="inner-w" id="memo">
            {widget.memo.length > 15
              ? widget.memo.substring(0, 15) + "..."
              : widget.memo}
          </p>
          <p className="inner-w" id="url">
            {widget.url.length > 30
              ? widget.url.substring(0, 30) + "..."
              : widget.url}
          </p>
        </div>
        {widget.shot && (
          <div className="shot-info">
            <img src={`http://localhost:8080/pic/${widget.shot}`} alt=""></img>
          </div>
        )}
      </div>
    </>
  );
  function onMouseEnter() {
    setAddClass("hoverAnimation");
    const timeout = setTimeout(() => {
      setPopupDelBtn(true);
    }, 1100);
    setPopupTimeouts([...popupTimeouts, timeout]);
  }
  function onMouseLeave() {
    popupTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    setPopupTimeouts([]);
    setPopupDelBtn(false);
    isDelBtnHover && setIsDelBtnHover(false);
    setAddClass("leaveAnimation");
  }
  function onWidgetClick() {
    if (isDelBtnHover) return;
    window.open(widget.url, "_blank");
  }

  async function widgetDelBtnOnClick() {
    await axiosInstance.delete(`/api/widget/${widget.id}`).then((res) => {
      if (res.data.code > 0) return;
      if (res.data.value > 0) {
        widgetDel?.setter(
          widgetDel.prev.filter((pv) => pv.id !== res.data.value)
        );
      }
    });
  }
}
