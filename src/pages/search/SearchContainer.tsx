import { useEffect, useState } from "react";
import SearchBarContainer from "../main/comps/SearchBarContainer";
import SidebarMainContainer from "../main/sidebar/SidebarMainContainer";
import Contents from "./comps/Contents";
import TextLogo from "./comps/TextLogo";
import './styles/search.scss';
import { useNavigate } from "react-router-dom";

interface ScrollSize {
    before: number;
    after: number;
}

export default function SearchContainer() {

    const [isScrollOver, setIsScrollOver] = useState(false);
    const navi = useNavigate();
    const [scrolling, setScrolling] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('up');

    const scrollStyle = scrollDirection === 'down' ? ' miniHeader' : ' fullHeader';

    return (
        <div className="searchContainer" onScroll={onScroll}>
            <div className={'header' + scrollStyle}>
                <section className="logo pointer" onClick={() => navi('/main')}>
                    <TextLogo />
                </section>
                <SearchBarContainer />
            </div>
            <SidebarMainContainer />
            <div className="main" id="main">
                <Contents />
            </div>
        </div>
    );
    function onScroll() {
        const curScroll = document.querySelector('.searchContainer')?.scrollTop as number
        setScrollDirection(scrolling > curScroll ? 'up' : 'down');
        setScrolling(curScroll);

        // 

        const scrollTop = document.querySelector('.searchContainer')?.scrollTop as number;
        const scrollHeight = document.querySelector('.searchContainer')?.scrollHeight as number;
        const clientHeight = document.querySelector('.searchContainer')?.clientHeight as number;
        console.log('scrollTop: ', scrollTop);
        console.log('scrollHeigt: ', scrollHeight);
        console.log('clientHeight: ', clientHeight);
        console.log('scrollHeight - clientHeight + scrollTop: ', scrollHeight - (clientHeight + scrollTop));

    }

    // function onScroll() {
    //     console.log('scroll');
    //     setScrolling(window.scrollY);
    //     console.log(scrolling);
    //     console.log(document.querySelector('.searchContainer')?.scrollTop);
    //     console.log(document.querySelector('.searchContainer')?.scrollHeight);
    //     console.log(document.querySelector('.main')?.scrollHeight);
    //     console.log(document.querySelector('#main')?.scrollHeight);
    //     console.log(document.querySelector('.contentsContainer')?.scrollHeight);
    //     console.log(document.querySelector('.header')?.scrollHeight);

    //     console.log(document.querySelector('html')?.clientHeight);

    //     const a: number | undefined = document.querySelector('.header')?.scrollHeight;
    //     const b: number | undefined = document.querySelector('.contentsContainer')?.scrollHeight;

    //     if (a && b) {
    //         console.log(b - a);
    //     }

    // }


}