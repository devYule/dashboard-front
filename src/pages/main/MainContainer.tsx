import { useState } from 'react';
import { SidebarActions, SidebarDirections, SidebarSelectedItems } from '../../interfaces/Interfaces';
import Logo from '../login/comps/Logo';
import SearchBarContainer from './comps/SearchBarContainer';
import Widget from './comps/Widget';
import './style/main.scss';
import SidebarContainer from './sidebar/SidebarContainer';
import { SidebarActionContext, SidebarDirectionContext, SidebarSelectedItemContext } from '../../pbl/Contexts';


export default function Main() {
    console.log('render Main');

    const [sidebarDirection, setSidebarDirection] = useState<SidebarDirections>(SidebarDirections.NONE);
    const [sidebarAction, setSidebarAction] = useState<SidebarActions>(SidebarActions.HOVER);
    const [sidebarSelectedItem, setSidebarSelectedItem] = useState<SidebarSelectedItems>(SidebarSelectedItems.ADD_WIDGET);


    const user = JSON.parse(localStorage.getItem('user') as string);
    console.log('user: ', user);




    return (


        <div className='mainContainer'>
            {/* 사이드바. 어디에 위치해야할지 모르겠어서 여기에 둠 ( sticky 때문에. ). */}
            <SidebarActionContext.Provider value={sidebarAction}>
                <SidebarDirectionContext.Provider value={sidebarDirection}>
                    <SidebarSelectedItemContext.Provider value={sidebarSelectedItem}>
                        <SidebarContainer />
                    </SidebarSelectedItemContext.Provider>
                </SidebarDirectionContext.Provider>
            </SidebarActionContext.Provider>

            <div className='header'>
                <Logo />
            </div>
            <div className='main'>

                <SearchBarContainer />
                <div className='widgetContainer'>
                    <Widget isShown={true} />
                    <Widget isShown={false} />
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

                </div>


            </div>
        </div>
    );
}