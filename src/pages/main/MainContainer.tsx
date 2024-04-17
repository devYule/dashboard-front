import { WidgetInter } from '../../interfaces/Interfaces';
import Logo from '../login/comps/Logo';
import SearchBarContainer from './comps/SearchBarContainer';
import Widget from './comps/Widget';

import SidebarMainContainer from './sidebar/SidebarMainContainer';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';



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



export default function Main() {
    console.log('render Main');

    const [widgets, setWidgets] = useState<WidgetInter[]>([]);

    const user = JSON.parse(localStorage.getItem('user') as string);
    console.log('user: ', user);

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
                    {/* <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} />
                    <Widget isShown={true} /> */}
                </div>

            </div>
        </div>
    );



}