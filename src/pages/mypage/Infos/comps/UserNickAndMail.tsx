import { useContext, useEffect, useState } from "react";
import { AllUserDatasContext, SetAllUserDatasContext } from "../../../../pbl/Contexts";
import { axiosInstance } from "../../../../pbl/AxiosUtil";

export default function UserNickAndMail() {
    const [hoverItem, setHoverItem] = useState<string>('none');
    const [clickedItem, setClickedItem] = useState<string>('none');
    // const [nick, setNick] = useState<string>('nickname');
    // const [mail, setMail] = useState<string>('mail@mail.com');
    const [nickInputVal, setNickInputVal] = useState<string>('');
    const [mailInputVal, setMailInputVal] = useState<string>('');
    const [codeInputVal, setCodeInputVal] = useState<string>('');
    const [submitButtonShow, setSubmitButtonShow] = useState<boolean>(false);
    const [inputErrStyle, setInputErrStyle] = useState({});
    const [mailValidCode, setMailValidCode] = useState<string | null>(null);
    const [mailDisabled, setMailDisabled] = useState<boolean>(false);


    let timeoutCode: NodeJS.Timeout | undefined;

    const userInfos = useContext(AllUserDatasContext);
    const setUserInfos = useContext(SetAllUserDatasContext);

    useEffect(() => {

        setNickInputVal(userInfos.nick);
        setMailInputVal(userInfos.mail);

    }, [userInfos.nick, userInfos.mail]);
    console.log('nick', nickInputVal, 'mail', mailInputVal);

    return (
        <>
            <div className="nickAndMail" >
                {clickedItem !== 'nick' ? <p id="nick" onMouseEnter={() => onMouseEnter('nick')} onMouseLeave={onMouseLeave}>
                    {clickedItem === 'none' && hoverItem === 'nick' && <button className="edit nickEdit pointer"
                        onClick={() => onClick('nick')}>
                        <p>edit</p>
                    </button>}{userInfos.nick}
                </p>
                    :
                    <div className="changeContainer">
                        <button className="cancelBtn pointer" onClick={onCancelBtnClick}>
                            <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35 17.5C35 22.1413 33.1563 26.5925 29.8744 29.8744C26.5925 33.1563 22.1413 35 17.5 35C12.8587 35 8.40752 33.1563 5.12563 29.8744C1.84375 26.5925 0 22.1413 0 17.5C0 12.8587 1.84375 8.40752 5.12563 5.12563C8.40752 1.84375 12.8587 0 17.5 0C22.1413 0 26.5925 1.84375 29.8744 5.12563C33.1563 8.40752 35 12.8587 35 17.5ZM11.7119 10.1631C11.5065 9.95775 11.2279 9.84237 10.9375 9.84237C10.6471 9.84237 10.3685 9.95775 10.1631 10.1631C9.95775 10.3685 9.84237 10.6471 9.84237 10.9375C9.84237 11.2279 9.95775 11.5065 10.1631 11.7119L15.9534 17.5L10.1631 23.2881C10.0614 23.3898 9.98077 23.5105 9.92573 23.6434C9.87069 23.7763 9.84237 23.9187 9.84237 24.0625C9.84237 24.2063 9.87069 24.3487 9.92573 24.4816C9.98077 24.6145 10.0614 24.7352 10.1631 24.8369C10.3685 25.0423 10.6471 25.1576 10.9375 25.1576C11.0813 25.1576 11.2237 25.1293 11.3566 25.0743C11.4895 25.0192 11.6102 24.9386 11.7119 24.8369L17.5 19.0466L23.2881 24.8369C23.3898 24.9386 23.5105 25.0192 23.6434 25.0743C23.7763 25.1293 23.9187 25.1576 24.0625 25.1576C24.2063 25.1576 24.3487 25.1293 24.4816 25.0743C24.6145 25.0192 24.7352 24.9386 24.8369 24.8369C24.9386 24.7352 25.0192 24.6145 25.0743 24.4816C25.1293 24.3487 25.1576 24.2063 25.1576 24.0625C25.1576 23.9187 25.1293 23.7763 25.0743 23.6434C25.0192 23.5105 24.9386 23.3898 24.8369 23.2881L19.0466 17.5L24.8369 11.7119C24.9386 11.6102 25.0192 11.4895 25.0743 11.3566C25.1293 11.2237 25.1576 11.0813 25.1576 10.9375C25.1576 10.7937 25.1293 10.6513 25.0743 10.5184C25.0192 10.3855 24.9386 10.2648 24.8369 10.1631C24.7352 10.0614 24.6145 9.98077 24.4816 9.92573C24.3487 9.87069 24.2063 9.84237 24.0625 9.84237C23.9187 9.84237 23.7763 9.87069 23.6434 9.92573C23.5105 9.98077 23.3898 10.0614 23.2881 10.1631L17.5 15.9534L11.7119 10.1631Z" fill="black" />
                            </svg>
                        </button>
                        <input value={nickInputVal}
                            className="input nickInput"
                            onChange={(e) => onChange(e)}
                            // onBlur={onBlur}
                            style={inputErrStyle}
                            onKeyUp={e => onKeyUpNick(e)}
                            autoFocus>

                        </input>
                        {submitButtonShow && <button className="submitBtn nickSubmitBtn pointer" onClick={changeNick}>
                            <svg viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 18.3205L16 9.66025L1 1" stroke="black" />
                            </svg></button>}
                    </div>
                }
                {clickedItem !== 'mail' ? <p id="mail" onMouseEnter={() => onMouseEnter('mail')} onMouseLeave={onMouseLeave}>
                    {clickedItem === 'none' && hoverItem === 'mail' && <button className="edit mailEdit pointer"
                        onClick={() => onClick('mail')}>
                        <p>edit</p>
                    </button>}{userInfos.mail}
                </p>
                    :
                    <div className="changeContainer">
                        <button className="cancelBtn pointer" onClick={onCancelBtnClick}>
                            <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35 17.5C35 22.1413 33.1563 26.5925 29.8744 29.8744C26.5925 33.1563 22.1413 35 17.5 35C12.8587 35 8.40752 33.1563 5.12563 29.8744C1.84375 26.5925 0 22.1413 0 17.5C0 12.8587 1.84375 8.40752 5.12563 5.12563C8.40752 1.84375 12.8587 0 17.5 0C22.1413 0 26.5925 1.84375 29.8744 5.12563C33.1563 8.40752 35 12.8587 35 17.5ZM11.7119 10.1631C11.5065 9.95775 11.2279 9.84237 10.9375 9.84237C10.6471 9.84237 10.3685 9.95775 10.1631 10.1631C9.95775 10.3685 9.84237 10.6471 9.84237 10.9375C9.84237 11.2279 9.95775 11.5065 10.1631 11.7119L15.9534 17.5L10.1631 23.2881C10.0614 23.3898 9.98077 23.5105 9.92573 23.6434C9.87069 23.7763 9.84237 23.9187 9.84237 24.0625C9.84237 24.2063 9.87069 24.3487 9.92573 24.4816C9.98077 24.6145 10.0614 24.7352 10.1631 24.8369C10.3685 25.0423 10.6471 25.1576 10.9375 25.1576C11.0813 25.1576 11.2237 25.1293 11.3566 25.0743C11.4895 25.0192 11.6102 24.9386 11.7119 24.8369L17.5 19.0466L23.2881 24.8369C23.3898 24.9386 23.5105 25.0192 23.6434 25.0743C23.7763 25.1293 23.9187 25.1576 24.0625 25.1576C24.2063 25.1576 24.3487 25.1293 24.4816 25.0743C24.6145 25.0192 24.7352 24.9386 24.8369 24.8369C24.9386 24.7352 25.0192 24.6145 25.0743 24.4816C25.1293 24.3487 25.1576 24.2063 25.1576 24.0625C25.1576 23.9187 25.1293 23.7763 25.0743 23.6434C25.0192 23.5105 24.9386 23.3898 24.8369 23.2881L19.0466 17.5L24.8369 11.7119C24.9386 11.6102 25.0192 11.4895 25.0743 11.3566C25.1293 11.2237 25.1576 11.0813 25.1576 10.9375C25.1576 10.7937 25.1293 10.6513 25.0743 10.5184C25.0192 10.3855 24.9386 10.2648 24.8369 10.1631C24.7352 10.0614 24.6145 9.98077 24.4816 9.92573C24.3487 9.87069 24.2063 9.84237 24.0625 9.84237C23.9187 9.84237 23.7763 9.87069 23.6434 9.92573C23.5105 9.98077 23.3898 10.0614 23.2881 10.1631L17.5 15.9534L11.7119 10.1631Z" fill="black" />
                            </svg>
                        </button>
                        {
                            mailValidCode ?
                                <input value={codeInputVal}
                                    className="input codeInput"
                                    onChange={(e) => onChange(e)}
                                    // onBlur={onBlur}
                                    placeholder="인증 코드를 입력해주세요."
                                    onKeyUp={e => onKeyUpMail(e)}
                                    style={inputErrStyle}
                                    autoFocus
                                />
                                :
                                <input value={mailInputVal}
                                    className="input mailInput"
                                    onChange={(e) => onChange(e)}
                                    // onBlur={onBlur}
                                    onKeyUp={e => onKeyUpMail(e)}
                                    style={inputErrStyle}
                                    autoFocus
                                    disabled={mailDisabled}
                                />

                        }
                        {mailDisabled &&
                            <div className="loading">
                                <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.375 18.75C11.8614 18.75 14.246 17.7623 16.0041 16.0041C17.7623 14.246 18.75 11.8614 18.75 9.375C18.75 6.8886 17.7623 4.50403 16.0041 2.74587C14.246 0.987719 11.8614 0 9.375 0C6.8886 0 4.50403 0.987719 2.74587 2.74587C0.987719 4.50403 0 6.8886 0 9.375C0 11.8614 0.987719 14.246 2.74587 16.0041C4.50403 17.7623 6.8886 18.75 9.375 18.75Z" fill="black" />
                                </svg>
                                <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.375 18.75C11.8614 18.75 14.246 17.7623 16.0041 16.0041C17.7623 14.246 18.75 11.8614 18.75 9.375C18.75 6.8886 17.7623 4.50403 16.0041 2.74587C14.246 0.987719 11.8614 0 9.375 0C6.8886 0 4.50403 0.987719 2.74587 2.74587C0.987719 4.50403 0 6.8886 0 9.375C0 11.8614 0.987719 14.246 2.74587 16.0041C4.50403 17.7623 6.8886 18.75 9.375 18.75Z" fill="black" />
                                </svg>
                                <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.375 18.75C11.8614 18.75 14.246 17.7623 16.0041 16.0041C17.7623 14.246 18.75 11.8614 18.75 9.375C18.75 6.8886 17.7623 4.50403 16.0041 2.74587C14.246 0.987719 11.8614 0 9.375 0C6.8886 0 4.50403 0.987719 2.74587 2.74587C0.987719 4.50403 0 6.8886 0 9.375C0 11.8614 0.987719 14.246 2.74587 16.0041C4.50403 17.7623 6.8886 18.75 9.375 18.75Z" fill="black" />
                                </svg>

                            </div>}

                        {submitButtonShow && <button className="submitBtn mailSubmitBtn pointer" onClick={changeMail}>
                            {mailValidCode && codeInputVal === '' ?
                                <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M48.6227 0.453666C48.839 0.670329 48.9869 0.945773 49.048 1.24578C49.1091 1.54579 49.0808 1.85715 48.9664 2.14117L30.782 47.6005C30.6218 48.0009 30.3542 48.3493 30.0087 48.6073C29.6632 48.8654 29.2532 49.0231 28.8239 49.0632C28.3945 49.1032 27.9624 49.0241 27.5752 48.8344C27.1879 48.6447 26.8605 48.3518 26.6289 47.988L16.6977 32.3787L1.08829 22.4474C0.723662 22.2161 0.430017 21.8886 0.239762 21.5009C0.0495066 21.1133 -0.0299633 20.6806 0.0101216 20.2507C0.0502064 19.8208 0.208288 19.4103 0.466922 19.0645C0.725555 18.7187 1.07469 18.4511 1.47579 18.2912L46.9352 0.113041C47.2192 -0.00129542 47.5305 -0.0296696 47.8306 0.0314435C48.1306 0.0925565 48.406 0.240463 48.6227 0.456791V0.453666ZM19.8164 31.4662L28.4445 45.0224L43.2352 8.04742L19.8164 31.4662ZM41.0258 5.83804L4.05079 20.6287L17.6102 29.2537L41.0258 5.83804Z" fill="black" />
                                </svg>
                                :
                                <svg viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 18.3205L16 9.66025L1 1" stroke="black" />
                                </svg>
                            }
                        </button>}

                    </div>
                }

            </div>

        </>
    );
    function onKeyUpNick(e: React.KeyboardEvent<HTMLInputElement>) {
        console.log(e.key);

        if (e.key === 'Enter') {
            changeNick();
        }
        if (e.key === 'Escape') {
            onCancelBtnClick();
        }

    }
    function onKeyUpMail(e: React.KeyboardEvent<HTMLInputElement>) {
        console.log(e.key);
        if (e.key === 'Enter') {
            if (mailInputVal.includes('@') && mailInputVal.includes('.')) {
                changeMail();
            }
        }
        if (e.key === 'Escape') {
            if (timeoutCode) {
                clearTimeout(timeoutCode);
            }
            onCancelBtnClick();
        }
    }
    function onMouseEnter(type: string) {
        setHoverItem(type);
    }
    function onMouseLeave() {
        setHoverItem('none');
    }
    function onClick(type: string) {
        setClickedItem(type);
    }
    function onCancelBtnClick() {
        if (timeoutCode) clearTimeout(timeoutCode);
        setTimeout(() => {
            if (clickedItem === 'nick') {
                setNickInputVal(userInfos.nick);
            }
            if (clickedItem === 'mail') {
                setMailInputVal(userInfos.mail);
                setCodeInputVal('');
                setMailValidCode(null);
            }

            setClickedItem('none');
            setSubmitButtonShow(false);
            setInputErrStyle({});
        }, 150);
    }
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputErrStyle({});
        if (mailValidCode) {
            setCodeInputVal(e.target.value);
            if (e.target.value.length === 6) {
                setSubmitButtonShow(true);
            } else {
                setSubmitButtonShow(false);
            }
            return;
        }
        if (clickedItem === 'nick') {
            if (userInfos.nick !== e.target.value) {
                setSubmitButtonShow(true);
            } else {
                setSubmitButtonShow(false);
            }
            setNickInputVal(e.target.value);
            return;
        }
        if (clickedItem === 'mail') {
            if (userInfos.mail !== e.target.value) {
                setSubmitButtonShow(true);
            } else {
                setSubmitButtonShow(false);
            }
            setMailInputVal(e.target.value);
            return;
        }

    }
    async function changeNick() {
        // nickInputVal = 변경된 닉네임
        if (nickInputVal === userInfos.nick) {
            return;
        }

        // 서버 요청
        await axiosInstance.put('/api/mypage/nick', { nick: nickInputVal })
            .then(res => {

                if (res.data.code > 0) {
                    if (res.data.code === 495) {
                        // 닉 중복
                        setInputErrStyle({ borderColor: 'red' });
                    }
                }
                if (res.data.value === 1) {
                    setUserInfos({ ...userInfos, nick: nickInputVal });
                    setClickedItem('none');
                    setSubmitButtonShow(false);
                }
            }).catch(console.error);

    }
    async function changeMail() {
        if (!mailValidCode) {
            // 메일 인증 요청
            if (!(mailInputVal.includes('@') && mailInputVal.includes('.'))) {
                return;
            }

            setMailDisabled(true);
            setSubmitButtonShow(false);
            await axiosInstance.put('/api/mypage/mail', { mail: mailInputVal })
                .then(res => {
                    console.log('changeMail.code: ', res.data.code);
                    console.log('changeMail.value: ', res.data.value);

                    if (res.data.code > 0) {
                        if (res.data.code === 493) {
                            // 메일 중복
                            setInputErrStyle({ borderColor: 'red' });
                        }
                        if (res.data.code === 491) {
                            // 실패
                            setMailInputVal(userInfos.mail);
                            setCodeInputVal('');
                            setMailValidCode(null);
                            setClickedItem('none');
                            setSubmitButtonShow(false);
                            setInputErrStyle({ borderColor: 'red' });
                        }
                    }

                    timeoutCode = setTimeout(() => {
                        setMailValidCode(res.data.key);
                        setMailDisabled(false);
                    }, 10000);
                    setSubmitButtonShow(false);
                })
                .catch(console.error)
                .finally(() => {
                    if (!timeoutCode) setMailValidCode(null);
                });

        } else {
            if (mailValidCode === 'temp') return;
            if (!(mailInputVal.includes('@') && mailInputVal.includes('.'))) return;
            if (codeInputVal.length !== 6) return;

            // mailInputVal = 변경된 메일
            if (mailInputVal === userInfos.mail) {
                return;
            }
            // 서버 요청

            await axiosInstance.post('/api/mypage/mail', { key: mailValidCode, code: codeInputVal })
                .then(res => {
                    if (res.data.code > 0) {
                        if (res.data.code === 492) {
                            setInputErrStyle({ borderColor: 'red' });
                        }
                    }
                    if (res.data.value === 1) {
                        setUserInfos({ ...userInfos, mail: mailInputVal });
                        setClickedItem('none');
                        setSubmitButtonShow(false);
                    }
                });

        }

    }

}
