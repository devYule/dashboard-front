import { WidgetInter } from "../../interfaces/Interfaces";
import Logo from "../login/comps/Logo";
import SearchBarContainer from "./comps/SearchBarContainer";
import Widget from "./comps/Widget";

import SidebarMainContainer from "./sidebar/SidebarMainContainer";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../pbl/AxiosUtil";
import {
  AddWidgetContext,
  SetWidgetsContext,
  WidgetsContext,
} from "../../pbl/Contexts";

export default function Main() {
  console.log("render Main");

  const [widgets, setWidgets] = useState<WidgetInter[]>([]);

  const [addedWidget, setAddedWidget] = useState<WidgetInter | null>(null);

  useEffect(() => {
    const titleEl = document.getElementsByTagName("title")[0];
    titleEl.innerText = "Dashboard";
    getWidgets(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addedWidget) {
      setWidgets([addedWidget, ...widgets]);
      setAddedWidget(null);
    }
  }, [addedWidget]);

  return (
    <div className="mainContainer">
      <div className="header">
        <Logo />
      </div>
      <WidgetsContext.Provider value={widgets}>
        <SetWidgetsContext.Provider value={setWidgets}>
          <AddWidgetContext.Provider value={setAddedWidget}>
            <SidebarMainContainer />
          </AddWidgetContext.Provider>
        </SetWidgetsContext.Provider>
      </WidgetsContext.Provider>
      <div className="main">
        <SearchBarContainer />
        <div className="widgetContainer">
          {widgets.map((w) => (
            <>
              <Widget
                widgetDel={{ prev: widgets, setter: setWidgets }}
                key={w.id}
                widget={w}
                gridStyle={{
                  gridColumn: `${
                    w.width === 1 ? "auto / span 1" : "auto / span 2"
                  }`,
                  gridRow: `${
                    w.height === 1 ? "auto / span 1" : "auto / span 2"
                  }`,
                  height: `${w.height === 1 ? "200px" : "415px"}`, // need to plus 15px cause gap is 15px
                  width: "100%",
                }}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );

  async function getWidgets(page: number) {
    if (page < 1) return;
    await axiosInstance.get(`/api/widget`).then((res) => {
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
