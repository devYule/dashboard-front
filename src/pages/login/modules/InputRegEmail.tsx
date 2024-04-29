import { useState } from 'react';
import styles from '../styles/Login.module.css'
import TitleText from './TitleText'
import DirectionBtn from './DirectionBtn';
import axios from 'axios';
import MailValidBtn from './MailValidBtn';
import InputLineMail from './InputLineMail';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../pbl/AxiosUtil';

export default function InputRegEmail({ servKey }:
    { servKey: string }) {


    const [email, setEmail] = useState<string>('');
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [emailChecker, setEmailChecker] = useState<boolean>(true);

    const [code, setCode] = useState<string>('');
    const [codeChecker, setCodeChecker] = useState<boolean>(true);
    const [isRequested, setIsRequested] = useState<boolean>(false);

    const navi = useNavigate();

    const mailContainerClassName = isValidating ? "code" : "mail";

    const enabled = email.indexOf('@') > -1;
    const placeholder = email.length === 0;

    const mailPlaceholderClass = placeholder ? "placeholder" : '';
    const codePlaceholderClass = code.length === 0 ? "placeholder" : '';

    const emailInputStyle = {
        borderColor: emailChecker && enabled ? 'black' : placeholder ? 'black' : 'red'
    }
    const emailBtnStyle = {
        opacity: emailInputStyle.borderColor === 'black' ? email.length === 0 ? 0.2 : 1 : 0.2
    }
    const codeInputStyle = {
        borderColor: codeChecker ? 'black' : code.length === 0 ? 'black' : 'red'
    }
    const codeBtnStyle = {
        opacity: codeInputStyle.borderColor === 'black' ? code.length === 0 ? 0.2 : 1 : 0.2
    }

    return (
        <>
            {!isValidating ? (
                <div className={mailContainerClassName}>
                    <TitleText>이메일 인증</TitleText>
                    <InputLineMail className={mailPlaceholderClass} style={emailInputStyle} type='mail' value={email}
                        onChange={e => onChange(e, 7, 35, setEmail, setEmailChecker)} onKeyDown={e => onKeyDown(e)}
                        autoFocus placeholder='이메일' disabled={isValidating} />
                    <MailValidBtn className="btns" style={emailBtnStyle} onClick={onBtnClick} disabled={!enabled}>
                        <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M49.5437 0.45626C49.7601 0.672923 49.908 0.948367 49.9691 1.24838C50.0302 1.54839 50.0018 1.85974 49.8875 2.14376L31.7031 47.6031C31.5429 48.0035 31.2753 48.3519 30.9298 48.6099C30.5843 48.868 30.1743 49.0257 29.745 49.0658C29.3156 49.1058 28.8835 49.0267 28.4962 48.837C28.109 48.6473 27.7815 48.3544 27.55 47.9906L17.6188 32.3813L2.00937 22.45C1.64474 22.2187 1.3511 21.8912 1.16084 21.5035C0.970588 21.1159 0.891118 20.6832 0.931203 20.2533C0.971288 19.8234 1.12937 19.4128 1.388 19.0671C1.64664 18.7213 1.99577 18.4537 2.39688 18.2938L47.8562 0.115635C48.1403 0.00129857 48.4516 -0.0270756 48.7516 0.0340375C49.0516 0.0951505 49.3271 0.243058 49.5437 0.459385V0.45626ZM20.7375 31.4688L29.3656 45.025L44.1562 8.05001L20.7375 31.4688ZM41.9469 5.84064L4.97187 20.6313L18.5312 29.2563L41.9469 5.84064Z" fill="black" /></svg>
                    </MailValidBtn>
                </div>
            ) : (
                <nav className={mailContainerClassName}>
                    <TitleText>코드</TitleText>
                    <InputLineMail className={mailPlaceholderClass} style={emailInputStyle} type='mail' value={email}
                        onChange={e => onChange(e, 7, 35, setEmail, setEmailChecker)} onKeyDown={e => onKeyDown(e)}
                        autoFocus placeholder='이메일' disabled={isValidating} />

                    <InputLineMail className={codePlaceholderClass} style={codeInputStyle} type='text' value={code}
                        onChange={e => onChange(e, 6, 6, setCode, setCodeChecker)} onKeyDown={e => onKeyDown(e)}
                        autoFocus placeholder='인증코드 ( 6자 )' disabled={!isValidating} />
                    <DirectionBtn className="btns" onClick={onBtnClick} disabled={!isValidating} btnStyle={codeBtnStyle} btnDirection={'right'} />
                </nav>
            )}
        </>
    );

    function onChange(e: React.ChangeEvent<HTMLInputElement>, min: number, max: number, setCallback: React.Dispatch<React.SetStateAction<string>>, setChecker: React.Dispatch<React.SetStateAction<boolean>>) {
        setCallback(e.target.value);
        if (e.target.value.length === 0) {
            setChecker(true);
            return;
        }
        e.target.value.length < min || e.target.value.length > max ? setChecker(false) : setChecker(true);
    }
    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            onBtnClick();
        }
    }
    async function onBtnClick() {
        if (isRequested) return;
        if (!isValidating) {
            if (email.length < 7 || email.length > 35) return;
            // 이메일 인증 요청
            setIsRequested(true);
            await axiosInstance.post('/api/user/mail', { key: servKey, mail: email })
                .then(res => {
                    if (res.data.code > 0) {
                        if (res.data.code === 493) {
                            setEmailChecker(false);
                        }
                        return;
                    }
                    setIsValidating(true);
                }).catch(console.error)
                .finally(() => setIsRequested(false));

            return;
        }

        if (code.length !== 6) return;
        await axiosInstance.post(`/api/user/mail/check`, { key: servKey, code: code })
            .then(res => {
                if (res.data.code > 0) {
                    if (res.data.code === 491) {
                        window.location.reload();
                    }
                    if (res.data.code === 492) {
                        setCodeChecker(false);
                    }
                    return;
                }
                if (res.data.at) {
                    localStorage.setItem('at', res.data.at);
                    window.location.reload();
                    return;
                }
                setCodeChecker(false);
            }).catch(console.error);
    }

}