import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import DirectionBtn from "./DirectionBtn";
import InputLine from "./InputLine";
import axios from "axios";
import { InputPasswordProps } from "../../../interfaces/Interfaces";
import TitleText from "./TitleText";





export default function InputPassword({ userId, setUserIdStatus }: InputPasswordProps) {
    console.log('render InputPassword');
    const [password, setPassword] = useState('');
    const [passwordInputStyle, setPasswordInputStyle] = useState<CSSProperties>({ borderColor: 'black' });
    const [enterRecorder, setEnterRecorder] = useState(false);
    const navi = useNavigate();

    const svgVisiable: CSSProperties = {
        opacity: password.length > 5 ? 1 : 0.2,
    }

    return (
        <div className={styles.pw}>
            <section className={styles.back}>
                <DirectionBtn className={styles.btns} onClick={onBackBtnClick} disabled={false} btnStyle={undefined} btnDirection={'left'} />
                <p>{userId}</p>
            </section>
            <TitleText >비밀번호</TitleText>
            <InputLine value={password} style={passwordInputStyle} type="password" onChange={passwordOnChange} onKeyDown={e => password.length > 5 && onKeyDown(e)} autoFocus={true} placeholder="" disabled={false} />
            <DirectionBtn className={styles.btns} onClick={submitOnClick} disabled={password.length < 6 || password.length > 20} btnStyle={svgVisiable} btnDirection={'right'} />
        </div>
    );

    function onBackBtnClick() {
        setUserIdStatus({ status: undefined, userId: userId});
    }


    function passwordOnChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        if(password.length < 6 || password.length > 20) return;
        console.log('submitOnClick');

        await axios.post('/api/user/pw', { userPw: password }).then(res => {
            console.log(res.data);
            console.log(res.data ? 'true' : 'false');
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                navi('/main');
            }
            else {
                setPasswordInputStyle({ borderColor: 'red' });
            }
        }).catch(console.error);

    }
}
