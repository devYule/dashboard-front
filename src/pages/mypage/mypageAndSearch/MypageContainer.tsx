import { useRef, useState } from "react";
import UserInfo from "../Infos/UserInfo";
import TextLogo from "../../search/comps/TextLogo";
import { useNavigate } from "react-router-dom";
import { ModalType } from "../../../interfaces/Interfaces";
import { MypageModalSetterContext } from "../../../pbl/Contexts";


export default function MypageConatiner() {

    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const mainRef = useRef<HTMLDivElement>(null);
    const navi = useNavigate();

    // modal
    const [curPwd, setCurPwd] = useState('');
    const [inputPwd, setInputPwd] = useState('');
    const [checkPwd, setCheckPwd] = useState('');

    const curPwdLengthChecker = curPwd.length === 0 ? true : curPwd.length < 6 ? false : curPwd.length > 20 ? false : true;
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
                    <UserInfo />
                </MypageModalSetterContext.Provider>

            </div>
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
                                                    onChange={e => setCurPwd(e.target.value)}
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
    function onCancelBtnClick() {
        setCurPwd('');
        setInputPwd('');
        setCheckPwd('');
        setModalType(ModalType.NONE);
    }
    function onSubmit() {
        console.log('enter onSubmit');
        if (canSubmit) {
            console.log('onSubmit -> caSubmit');
            // todo 비밀번호 ( 기존 비밀번호 체크 필요 ) 변경 통신
        }
        if (modalType === ModalType.RESET_WIDGET) {
            console.log('onSubmit -> resetWidget');
            // 위젯 초기화
        }
        if (modalType === ModalType.WITHDRAW) {
            console.log('onSubmit -> withdraw');
            // 회원 탈퇴
        }

    }

}