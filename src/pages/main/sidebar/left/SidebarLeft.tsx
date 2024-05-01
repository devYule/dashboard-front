import { useEffect, useState } from "react";
import Widget from "../../comps/Widget";
import { WidgetInter } from "../../../../interfaces/Interfaces";
import { axiosInstance } from "../../../../pbl/AxiosUtil";


export default function SidebarLeft() {
  const [widgets, setWidgets] = useState<WidgetInter[]>([]);

  useEffect(() => {
    getWidgets(1);
  }, []);

  return (
    <div className="leftSidebar">
      <div className="leftSidebarWidgetContainer" onScroll={onScroll}>
        {/* 추가된 위젯들 추가 */}
        {widgets.map((widget: WidgetInter) => (
          <Widget
            key={widget.id}
            widget={widget}
            titleMaxLength={8}
            gridStyle={{
              gridColumn: `${
                widget.width === 1 ? "auto / span 1" : "auto / span 2"
              }`,
              gridRow: `${
                widget.height === 1 ? "auto / span 1" : "auto / span 2"
              }`,
              height: `${widget.height === 1 ? "100px" : "210px"}`, // need to plus 15px cause gap is 15px
              width: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
  function onScroll() {
    console.log("scroll");
    const scrollTop = document.querySelector(".leftSidebarWidgetContainer")
      ?.scrollTop as number;
    console.log(scrollTop);
  }
  async function getWidgets(page: number) {
    if (page < 1) return;
    await axiosInstance.get(`/api/widget`).then((res) => {
      console.log(res.data);
      const newWidgets = res.data.map((w: WidgetInter) => {
        return {
          id: w.id,
          width: w.width,
          title: w.title,
          memo: w.memo,
          height: w.height,
          url: w.url,
          shot: w.shot,
        };
      });
      setWidgets([...widgets, ...newWidgets]);
    });
  }
}
