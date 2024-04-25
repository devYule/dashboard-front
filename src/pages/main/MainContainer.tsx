import { WidgetInter } from '../../interfaces/Interfaces';
import Logo from '../login/comps/Logo';
import SearchBarContainer from './comps/SearchBarContainer';
import Widget from './comps/Widget';

import SidebarMainContainer from './sidebar/SidebarMainContainer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../pbl/AxiosUtil';
import { title } from 'process';

export default function Main() {

    console.log('render Main');

    const [widgets, setWidgets] = useState<WidgetInter[]>([]);


    useEffect(() => {
        getWidgets(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    return (


        <div className='mainContainer'>
            <div className='header'>
                <Logo />
            </div>
            <SidebarMainContainer />
            <div className='main'>
                <SearchBarContainer />
                <div className='widgetContainer'>
                    {widgets.map(w =>
                        <>
                            <Widget key={w.id}
                                widget={w}
                                gridStyle={
                                    {
                                        gridColumn:
                                            `${w.width === 1 ? "auto / span 1" : "auto / span 2"}`,
                                        gridRow: `${w.height === 1 ? "auto / span 1" : "auto / span 2"}`,
                                        height: `${w.height === 1 ? "200px" : "415px"}`, // need to plus 15px cause gap is 15px
                                        width: "100%"
                                    }
                                }
                            />
                        </>
                    )}

                </div>

            </div>
        </div>
    );


    async function getWidgets(page: number) {
        if (page < 1) return;
        await axiosInstance.get(`/api/widget/${page}`)
            .then(res => {
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
                    }
                })
                setWidgets([...widgets, ...newWidgets]);


            })
    }

}