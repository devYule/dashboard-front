import { CSSProperties, useState } from "react";
import styles from '../styles/Login.module.css'
import InputLine from "./InputLine";
import axios from "axios";
import { InputProps } from "../interfaces/Interfaces";



export default function InputId({ userId, setUserId }: InputProps) {
    console.log('render InputId');
    const [id, setId] = useState('');
    const [enterRecorder, setEnterRecorder] = useState(false);
    const btnDisabled = id.length < 5 || id.length > 20;

    const svgVisiable: CSSProperties = {
        opacity: id.length > 4 ? 1 : 0.2,
    }
    const inputColorStyle = {
        borderColor: userId === null ? 'red' : 'black',
    }


    return (
        <div className={styles.id}>
            <p className={styles.text}>아이디</p>
            <InputLine style={inputColorStyle} type={"text"} onChange={idOnChange} onKeyDown={e => id.length > 4 && onKeyDown(e)} autoFocus={true} />
            <section>
                <button className={styles.btns} onClick={submitOnClick} disabled={btnDisabled}>
                    <svg style={svgVisiable} width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 26.3205L24 17.6603L9 9" stroke="black" />
                    </svg>
                </button>
            </section>
        </div>
    );

    function idOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length < 5 || e.target.value.length > 20) return;
        setId(e.target.value);
        setEnterRecorder(false);
        userId !== undefined && setUserId(undefined);
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (enterRecorder) return;
            console.log('onKeyDown');
            setEnterRecorder(true);
            submitOnClick();
        }
    }

    // 통신 결과가 1이면 비번입력창 & -1이면 아이디 틀림, 0이면 회원가입 폼 -> url 이동 없이 구현.

    async function submitOnClick() {
        console.log('submitOnClick');
        // setIsCorrect((await axios.post('/api/user/id', { userLoginId: id })).data);

        // const res = await axios.post('/api/user/id', { userLoginId: id });

        await axios.post('/api/user/id', { userLoginId: id })
            .then(res => {
                console.log(res.data);
                setUserId(res.data.value === 1 ? id : res.data.value === 0 ? '' : null);
            })
            .catch(console.error);

    };
}