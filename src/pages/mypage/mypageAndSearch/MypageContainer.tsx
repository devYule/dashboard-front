import { useRef } from "react";
import UserInfo from "../Infos/UserInfo";
import TextLogo from "../../search/comps/TextLogo";
import { useNavigate } from "react-router-dom";

export default function MypageConatiner() {

    const mainRef = useRef<HTMLDivElement>(null);
    const navi = useNavigate();

    return (
        <div className="mypageContainer">
            <div className="header">
                <div className="logo pointer" onClick={() => navi('/main')}>
                    <TextLogo />
                </div>
            </div>
            <div className="main" ref={mainRef}>
                <UserInfo />
            </div>
        </div>
    );
}