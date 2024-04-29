import { useEffect, useState } from "react";
import Widget from "../../comps/Widget";
import { WidgetInter } from "../../../../interfaces/Interfaces";
import { axiosInstance } from "../../../../pbl/AxiosUtil";

const initWidgets: WidgetInter[] = [
  {
    id: 0,
    order: 1,
    width: 2,
    height: 1,
    url: "www.naver.com",
    title: "test",
    memo: "",
    isShown: true,
  },
  {
    id: 1,
    order: 2,
    width: 1,
    height: 1,
    url: "www.daum.net",
    title: "test2",
    memo: "",
    isShown: true,
  },
  {
    id: 2,
    order: 3,
    width: 2,
    height: 2,
    url: "www.google.com",
    title: "test3333",
    memo: "awawgawegag",
    isShown: true,
  },
  {
    id: 3,
    order: 4,
    width: 1,
    height: 2,
    url: "www.nate.com",
    title: "tesarkot",
    memo: "wkoawrf",
    isShown: true,
  },
  {
    id: 4,
    order: 5,
    width: 2,
    height: 1,
    url: "www.naver.com",
    title: "taasdest",
    memo: "",
    isShown: true,
  },
  {
    id: 5,
    order: 6,
    width: 1,
    height: 1,
    url: "",
    isShown: false,
    title: "tesasaft",
    memo: "",
  },
  {
    id: 6,
    order: 7,
    width: 2,
    height: 1,
    url: "www.google.com",
    title: "tafsest",
    memo: "133",
    isShown: true,
  },
  {
    id: 7,
    order: 8,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "tasest",
    memo: "10104kaof",
    isShown: true,
  },
  {
    id: 8,
    order: 9,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "tesart",
    memo: "자ㅐ아재ㅏㅇ메잘",
    isShown: true,
  },
  {
    id: 9,
    order: 10,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "tesㄴㅇㅁㅈㄴㅇt",
    memo: "wpkfawof0",
    isShown: true,
  },
  {
    id: 10,
    order: 11,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "tawkawofest",
    memo: "awkofawkfowp",
    isShown: true,
  },
  {
    id: 11,
    order: 12,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "test2kjrfo2f",
    memo: "aksfopase",
    isShown: true,
  },
  {
    id: 12,
    order: 13,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "tadkgopgest",
    memo: "awkofakwf",
    isShown: true,
  },
  {
    id: 13,
    order: 14,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "twarkoest",
    memo: "290rkf2f",
    isShown: true,
  },
  {
    id: 14,
    order: 15,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "teawkofowast",
    memo: "wakofg",
    isShown: true,
  },
  {
    id: 15,
    order: 16,
    width: 2,
    height: 2,
    url: "www.daum.net",
    title: "teawfkawst",
    memo: "akfg902fk",
    isShown: true,
  },
];

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
    await axiosInstance.get(`/api/widget/${page}`).then((res) => {
      console.log(res.data);
      const newWidgets = res.data.map((w: WidgetInter) => {
        return {
          id: w.id,
          order: w.order,
          width: w.width,
          title: w.title,
          memo: w.memo,
          height: w.height,
          url: w.url,
          isShown: w.isShown,
          shot: w.shot,
        };
      });
      setWidgets([...widgets, ...newWidgets]);
    });
  }
}
