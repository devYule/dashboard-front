import { useContext, useEffect, useRef, useState } from "react";
import UserInfo from "../Infos/UserInfo";
import TextLogo from "../../search/comps/TextLogo";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ModalType } from "../../../interfaces/Interfaces";
import { AllUserDatasContext, MypageModalSetterContext, SetAllUserDatasContext } from "../../../pbl/Contexts";
import { axiosInstance } from "../../../pbl/AxiosUtil";


interface UserInfosRef {
    pic: string | null;
    nick: string;
    mail: string;
    sites: number[];
}


export default function MypageConatiner() {

    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const mainRef = useRef<HTMLDivElement>(null);
    const navi = useNavigate();


    // modal
    const [curPwd, setCurPwd] = useState('');
    const [inputPwd, setInputPwd] = useState('');
    const [checkPwd, setCheckPwd] = useState('');
    const [afterRequestPwProblem, setAfterRequestPwProblem] = useState(false);
    const [succeedChecker, setSucceedChecker] = useState(false);

    // infos
    const [userInfos, setUserInfos] = useState<UserInfosRef>({ pic: '', nick: '', mail: '', sites: [] });

    useEffect(() => {
        const titleEl = document.getElementsByTagName('title')[0];
        titleEl.innerText = 'My page';
        // 유저 정보 가져오기
        // 유저 사진, 유저 닉네임, 유저 메일, 유저 사이트

        async function getAllUserDatas() {
            await axiosInstance.get('/api/mypage')
                .then(res => {
                    setUserInfos({
                        ...userInfos, pic: res.data.pic, nick: res.data.nick, mail: res.data.mail,
                        sites: [...res.data.sites]
                    })
                }).catch(console.error);
        }
        getAllUserDatas();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    let curPwdLengthChecker = curPwd.length === 0 ? true : curPwd.length < 6 ? false : curPwd.length > 20 ? false : true;
    if (afterRequestPwProblem) curPwdLengthChecker = false;
    const newPwdLengthChecker = inputPwd.length === 0 ? true : inputPwd.length < 6 ? false : inputPwd.length > 20 ? false : true;
    const isCorrect = checkPwd.length === 0 ? true : inputPwd === checkPwd ? true : false;

    const canSubmit = curPwd.length > 0 && inputPwd.length > 0 && curPwdLengthChecker && newPwdLengthChecker && isCorrect;
    console.log(canSubmit);
    return (
        <div className="mypageContainer">
            <div className="header">
                <div className="logo pointer" onClick={() => navi('/main')}>
                    <TextLogo />
                </div>
            </div>
            <div className="main" ref={mainRef}>
                <MypageModalSetterContext.Provider value={setModalType}>
                    <AllUserDatasContext.Provider value={userInfos}>
                        <SetAllUserDatasContext.Provider value={setUserInfos}>
                            <UserInfo />
                        </SetAllUserDatasContext.Provider>
                    </AllUserDatasContext.Provider>
                </MypageModalSetterContext.Provider>

            </div>

            {/* modal */}
            {succeedChecker &&
                <div className="succeedChecker">
                    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 28.125C11.519 28.125 8.18064 26.7422 5.71922 24.2808C3.25781 21.8194 1.875 18.481 1.875 15C1.875 11.519 3.25781 8.18064 5.71922 5.71922C8.18064 3.25781 11.519 1.875 15 1.875C18.481 1.875 21.8194 3.25781 24.2808 5.71922C26.7422 8.18064 28.125 11.519 28.125 15C28.125 18.481 26.7422 21.8194 24.2808 24.2808C21.8194 26.7422 18.481 28.125 15 28.125ZM15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30Z" fill="#25E55B" />
                        <path d="M20.6407 9.40148L20.6038 9.44211L14.1923 17.6157L10.3285 13.7478C10.066 13.5031 9.71884 13.3699 9.36014 13.3762C9.00144 13.3825 8.65921 13.5279 8.40553 13.7817C8.15185 14.0356 8.00654 14.378 8.00022 14.7369C7.99389 15.0958 8.12703 15.4431 8.3716 15.7058L13.2563 20.5951C13.3879 20.7266 13.5446 20.8301 13.7171 20.8996C13.8896 20.9692 14.0743 21.0032 14.2602 20.9998C14.4461 20.9963 14.6294 20.9554 14.7991 20.8796C14.9689 20.8037 15.1216 20.6944 15.2483 20.5582L22.6179 11.341C22.8688 11.0774 23.006 10.7257 22.9998 10.3617C22.9936 9.99781 22.8445 9.65093 22.5847 9.39611C22.325 9.14129 21.9754 8.999 21.6116 9.00001C21.2478 9.00101 20.8991 9.14523 20.6407 9.40148Z" fill="#25E55B" />
                    </svg>
                </div>
            }
            {
                modalType === ModalType.NONE ? <></>
                    : (
                        <div className="modalContainer">
                            <div className="modal">
                                {
                                    modalType === ModalType.CHANGE_PASSWORD ?
                                        (
                                            <>
                                                <p>비밀번호 변경</p>
                                                <input id="curPwd" type="password" placeholder="현재 비밀번호"
                                                    onChange={e => onCurPwChange(e)}
                                                    style={{ borderColor: curPwdLengthChecker ? 'black' : 'red' }}></input>
                                                <input id="nextPwd" type="password" placeholder="변경할 비밀번호 ( 6 ~ 20자 사이 )"
                                                    onChange={e => setInputPwd(e.target.value)}
                                                    style={{ borderColor: newPwdLengthChecker ? 'black' : 'red' }}></input>
                                                <input id="nextPwdAgain" type="password" placeholder="변경할 비밀번호 확인 ( 6 ~ 20자 사이 )"
                                                    onChange={e => setCheckPwd(e.target.value)}
                                                    style={{ borderColor: isCorrect ? 'black' : 'red' }}></input>
                                                <section className="btns">
                                                    <button className="btn pointer"
                                                        disabled={!canSubmit}
                                                        onClick={onSubmit}><p>변경</p></button>
                                                    <button className="btn pointer" onClick={onCancelBtnClick}><p>취소</p></button>
                                                </section>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <p>{`정말 ${modalType === ModalType.RESET_WIDGET ? '모든 위젯을 초기화' : '탈퇴'} 하시겠습니까?`}</p>
                                                <section className="btns">
                                                    <button className="btn pointer" onClick={onSubmit}><p>{modalType === ModalType.RESET_WIDGET ? '초기화' : '탈퇴'}</p></button>
                                                    <button className="btn pointer" onClick={onCancelBtnClick}><p>취소</p></button>
                                                </section>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    )
            }

        </div >
    );

    function onCurPwChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAfterRequestPwProblem && setAfterRequestPwProblem(false);
        setCurPwd(e.target.value);
    }

    function onCancelBtnClick() {
        setCurPwd('');
        setInputPwd('');
        setCheckPwd('');
        setModalType(ModalType.NONE);
    }
    function onSubmit() {
        console.log('enter onSubmit');
        if (canSubmit) {
            if (curPwd.length < 6 || curPwd.length > 20 || inputPwd.length < 6 || inputPwd.length > 20 || !(inputPwd === checkPwd)) return;
            console.log('onSubmit -> caSubmit');
            // todo 비밀번호 ( 기존 비밀번호 체크 필요 ) 변경 통신
            changePw();
        }
        if (modalType === ModalType.RESET_WIDGET) {
            console.log('onSubmit -> resetWidget');
            // 위젯 초기화
            resetWidget();
        }
        if (modalType === ModalType.WITHDRAW) {
            console.log('onSubmit -> withdraw');
            // 회원 탈퇴
            withdraw();
        }

    }
    async function changePw() {
        await axiosInstance.put('/api/mypage/pw', { prevPw: curPwd, pw: inputPwd })
            .then(res => {
                console.log('code', res.data.code);
                console.log('value', res.data.value);
                if (res.data.code > 0) {
                    if (res.data.code === 497) {
                        setAfterRequestPwProblem(true);
                    }
                }
                if (res.data.value === 1) {
                    setModalType(ModalType.NONE);
                    setSucceedChecker(true);
                    setTimeout(() => {
                        setSucceedChecker(false);
                    }, 2000);
                }
            });
    }
    async function resetWidget() {
        await axiosInstance.delete('/api/widget/all')
            .then(res => {
                console.log('code', res.data.code);
                console.log('value', res.data.value);

                if (res.data.value > -1) {
                    setModalType(ModalType.NONE);
                    setSucceedChecker(true);
                    setTimeout(() => {
                        setSucceedChecker(false);
                    }, 2000);
                }
            })
    }
    async function withdraw() {
        await axiosInstance.delete('/api/mypage')
            .then(res => {
                console.log('code', res.data.code);
                console.log('value', res.data.value);

                if (res.data.value === 1) {
                    localStorage.removeItem('at');
                    localStorage.clear();
                    window.location.reload();
                }
            });
    }
}