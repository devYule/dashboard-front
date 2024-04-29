import { CSSProperties, useRef, useState } from "react";
import styles from '../styles/Login.module.css'
import TitleText from "./TitleText";
import InputLineReg from "./InputLineReg";
import DirectionBtn from "./DirectionBtn";
import { axiosInstance } from "../../../pbl/AxiosUtil";

export default function InputRegUserInfo({ userId: superId, setIsPassedUserInfo, setServKey }: { userId: string, setIsPassedUserInfo: React.Dispatch<React.SetStateAction<boolean>>, setServKey: React.Dispatch<React.SetStateAction<string>> }) {



    const [id, setId] = useState(superId);
    const [nick, setNick] = useState('');
    const [pw, setPw] = useState('');
    const [checkPw, setCheckPw] = useState('');

    const [isIdPassed, setIsIdPassed] = useState(true);
    const [isNickPassed, setIsNickPassed] = useState(true);
    const [isPwPassed, setIsPwPassed] = useState(true);
    const [isCheckPwPassed, setIsCheckPwPassed] = useState(true);

    const refId = useRef<HTMLInputElement>(null);
    const refNick = useRef<HTMLInputElement>(null);
    const refPw = useRef<HTMLInputElement>(null);
    const refCheckPw = useRef<HTMLInputElement>(null);

    const refArr = [
        { ref: refId, identity: 'id' },
        { ref: refNick, identity: 'nick' },
        { ref: refPw, identity: 'pw' },
        { ref: refCheckPw, identity: 'checkPw' }
    ];

    const btnEnabled = isIdPassed && isNickPassed && isPwPassed && isCheckPwPassed;
    // const canSubmit = btnEnabled && (id.length > 4 && id.length < 21) && (nick.length > 3 && nick.length < 16) && (pw.length > 5 && pw.length < 21) && (pw === checkPw);



    const svgVisiable: CSSProperties = {
        opacity: btnEnabled ? 1 : 0.2,
    }
    const placeholderClass = "placeholder";

    return (
        <div className="info">
            <TitleText>회원가입</TitleText>
            <InputLineReg
                className={id.length < 1 ? placeholderClass : undefined}
                style={styleChecker(isIdPassed)} type='text' value={id}
                onChange={e => onChange(e, 5, 20, setId, setIsIdPassed)} onKeyDown={e => onKeyDown(e, 0)}
                autoFocus={id.length > 0 ? false : true} placeholder='아이디 ( 5 ~ 20자 사이 )' ref={refId} disabled={false} />
            <InputLineReg
                className={nick.length < 1 ? placeholderClass : undefined}
                style={styleChecker(isNickPassed)} type='text' value={nick}
                onChange={e => onChange(e, 4, 15, setNick, setIsNickPassed)} onKeyDown={e => onKeyDown(e, 1)}
                autoFocus={id.length > 0 ? true : false} placeholder='닉네임 ( 4 ~ 15자 사이 )' ref={refNick} disabled={false} />
            <InputLineReg
                className={pw.length < 1 ? placeholderClass : undefined}
                style={styleChecker(isPwPassed)} type='password' value={pw}
                onChange={e => onChangePw(e, setPw, setIsPwPassed)} onKeyDown={e => onKeyDown(e, 2)}
                autoFocus={false} placeholder='비밀번호 ( 6 ~ 20자 사이 )' ref={refPw} disabled={false} />
            <InputLineReg
                className={checkPw.length < 1 ? placeholderClass : undefined}
                style={styleChecker(isCheckPwPassed)} type='password' value={checkPw}
                onChange={e => onChangeCheckPw(e, setCheckPw, undefined)} onKeyDown={e => onKeyDown(e, 3)}
                autoFocus={false} placeholder='비밀번호 확인 ( 6 ~ 20자 사이 )' ref={refCheckPw} disabled={false} />
            <DirectionBtn className="btns" onClick={submitOnClick} disabled={!btnEnabled} btnStyle={svgVisiable} btnDirection={'right'} />
        </div>
    );

    function styleChecker(check: boolean): CSSProperties {
        return check ? { borderColor: 'black' } : { borderColor: 'red' };
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>, limitFrom: number, limitTo: number, setValueCallback: (value: string) => void, isPassedCallback: ((value: boolean) => void) | undefined) {

        setValueCallback(e.target.value);
        if (!isPassedCallback) return;
        if (e.target.value.length > 0 && (e.target.value.length < limitFrom || e.target.value.length > limitTo)) {
            console.log(e.target.value.length);
            isPassedCallback(false);
        } else {
            isPassedCallback(true);
        }
    }
    function onChangePw(e: React.ChangeEvent<HTMLInputElement>, setValueCallback: (value: string) => void, isPassedCallback: ((value: boolean) => void) | undefined) {
        onChange(e, 6, 20, setValueCallback, isPassedCallback);
        if (checkPw.length === 0) return;
        setIsCheckPwPassed(!isCheckPwPassed && (e.target.value === checkPw));
    }
    function onChangeCheckPw(e: React.ChangeEvent<HTMLInputElement>, setValueCallback: (value: string) => void, isPassedCallback: ((value: boolean) => void) | undefined) {
        onChange(e, 6, 20, setValueCallback, isPassedCallback);
        setIsCheckPwPassed(!isCheckPwPassed && (e.target.value === pw));
    }
    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
        if (e.key === 'Enter') {
            if (btnEnabled && !refArr[idx + 1]) {
                submitOnClick();
            }
            const nextRef = refArr[idx + 1];
            if (nextRef) {
                nextRef.ref.current?.focus();
            }
        }
    }
    async function submitOnClick() {
        if (!btnEnabled) return;
        console.log('onBtnClick');
        // 통신 -> id가 중복되거나 닉네임이 중복되면 상태 변경.
        // 1: 성공 -1: id 중복 -2: 닉네임 중복 -3: 둘다 중복
        await axiosInstance.post('/api/user/info', { loginId: id, nick: nick, pw: pw })
            .then(res => {
                const key = res.data.key;
                console.log(key);

                if (res.data.code > 0) {
                    if (res.data.code === 496) {
                        setIsIdPassed(false);
                        refArr.find(ref => ref.identity === 'id')?.ref.current?.focus();
                        return;

                    }
                    if (res.data.code === 495) {
                        setIsNickPassed(false);
                        refArr.find(ref => ref.identity === 'nick')?.ref.current?.focus();
                        return;
                    }
                    if (res.data.code === 494) {
                        setIsIdPassed(false);
                        refArr.find(ref => ref.identity === 'id')?.ref.current?.focus();
                        setIsNickPassed(false);
                        return;
                    }
                }

                if (key) {
                    setServKey(key);
                    btnEnabled && setIsPassedUserInfo(true);
                    return;
                }


            }).catch(console.error);
    }
}