import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import DirectionBtn from "./DirectionBtn";
import InputLine from "./InputLine";
import axios from "axios";
import { InputPasswordProps } from "../../../interfaces/Interfaces";
import TitleText from "./TitleText";
import { axiosInstance } from "../../../pbl/AxiosUtil";
import { error } from "console";





export default function InputPassword({ userId, setUserIdStatus, servKey }: InputPasswordProps) {
    console.log('render InputPassword');
    const [password, setPassword] = useState('');
    const [passwordInputStyle, setPasswordInputStyle] = useState<CSSProperties>({ borderColor: 'black' });
    const [enterRecorder, setEnterRecorder] = useState(false);
    const navi = useNavigate();

    const svgVisiable: CSSProperties = {
        opacity: password.length > 5 ? 1 : 0.2,
    }

    return (
        <div className="pw">
            <section className="back">
                <DirectionBtn className="btns" onClick={onBackBtnClick} disabled={false} btnStyle={undefined} btnDirection={'left'} />
                <p>{userId}</p>
            </section>
            <TitleText >비밀번호</TitleText>
            <InputLine value={password} style={passwordInputStyle} type="password" onChange={passwordOnChange} onKeyDown={e => password.length > 5 && onKeyDown(e)} autoFocus={true} placeholder="비밀번호 ( 6 ~ 20자 사이 )" disabled={false} />
            <DirectionBtn className="btns" onClick={submitOnClick} disabled={password.length < 6 || password.length > 20} btnStyle={svgVisiable} btnDirection={'right'} />
        </div>
    );

    function onBackBtnClick() {
        setUserIdStatus({ status: undefined, userId: userId });
    }


    function passwordOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (passwordInputStyle.borderColor === 'red') setPasswordInputStyle({ borderColor: 'black' });
        setPassword(e.target.value);
        setEnterRecorder(false);
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (enterRecorder) return;
            console.log('onKeyDown');
            setEnterRecorder(true);
            submitOnClick();
        }

    }
    async function submitOnClick() {
        if (password.length < 6 || password.length > 20) return;
        console.log('submitOnClick');

        await axiosInstance.post('/api/user/pw', { key: servKey, pw: password })
            .then(res => {
                console.log(res.data);
                console.log(res.data ? 'true' : 'false');

                if (res.data.code > 0) {
                    setPasswordInputStyle({ borderColor: 'red' });
                    if (res.data.code === 501) {
                        console.log('key is blank');
                        window.location.reload();
                    }
                } else {
                    // todo TEST
                    localStorage.setItem('at', res.data.at);
                    window.location.reload();
                }
            }).catch(console.error);

    }
}
