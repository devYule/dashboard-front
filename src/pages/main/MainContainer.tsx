import axios from 'axios';
import { WidgetInter } from '../../interfaces/Interfaces';
import Logo from '../login/comps/Logo';
import SearchBarContainer from './comps/SearchBarContainer';
import Widget from './comps/Widget';

import SidebarMainContainer from './sidebar/SidebarMainContainer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../pbl/AxiosUtil';
import { orderBy } from 'lodash';



const initWidgets: WidgetInter[] = [
    { id: 0, order: 1, width: 2, height: 1, url: 'www.naver.com', isShown: true },
    { id: 1, order: 2, width: 1, height: 1, url: 'www.daum.net', isShown: true },
    { id: 2, order: 3, width: 2, height: 2, url: 'www.google.com', isShown: true },
    { id: 3, order: 4, width: 1, height: 2, url: 'www.nate.com', isShown: true },
    { id: 4, order: 5, width: 2, height: 1, url: 'www.naver.com', isShown: true },
    { id: 5, order: 6, width: 1, height: 1, url: '', isShown: false },
    { id: 6, order: 7, width: 2, height: 1, url: 'www.google.com', isShown: true },
    { id: 7, order: 8, width: 2, height: 2, url: 'www.daum.net', isShown: true },
]

interface LinesRef {
    lineNum: number; // 1 ~
    enabled: number[]; // default: [ 1, 2, 3, 4, 5, 6 ]
    disabled: number[]; // default: []
}
class Lines<LinesRef> {
    lineNum: number;
    enabled: number[];
    disabled: number[];

    constructor(prevLineNum: number) {
        this.lineNum = prevLineNum + 1;
        this.enabled = [1, 2, 3, 4, 5, 6];
        this.disabled = [];
    }

}

export default function Main() {

    // 이거 flex 자동 wrap 으로 될거 같다.
    // 위젯 사이즈를 min 을 설정하고, min 이하면 다음줄로 내려가게.
    // 그럼 30개라도, 다음줄 역시 min에 도달하면 내려갈 거니까.
    // 디바이스 사이즈 기준으로 한 페이지당 들어가는 개수 변경 (아이템 사이즈는 % 로 계산) 하여 반응형 구현.

    console.log('render Main');

    const [widgets, setWidgets] = useState<WidgetInter[]>([]);


    useEffect(() => {
        getWidgets(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const location = useLocation();

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
                const newWidgets = res.data.map((w: { id: Number, order: Number, width: number, height: number, url: string, isShown: number }) => {
                    return {
                        id: w.id,
                        order: w.order,
                        width: w.width,
                        height: w.height,
                        url: w.url,
                        isShown: w.isShown,
                    }
                })
                setWidgets([...widgets, ...newWidgets]);


            })
    }

}