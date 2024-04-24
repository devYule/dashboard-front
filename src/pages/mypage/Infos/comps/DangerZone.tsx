import { useContext } from "react"
import { MypageModalSetterContext } from "../../../../pbl/Contexts"
import { ModalType } from "../../../../interfaces/Interfaces";


export default function DangerZone() {


    const setModalType = useContext(MypageModalSetterContext);

    return (
        <div className="dangerZone">
            <p id="title">Danger Zone</p>
            <div className="part">
                <button className="changePassword pointer btns" onClick={onChangePwBtnClick}>비밀번호 변경</button>
                <button className="resetWidget pointer btns" onClick={onResetWidgetBtnClick}>위젯 초기화</button>
                <button className="withdraw pointer btns" onClick={onWithdrawBtnClick}>회원 탈퇴</button>
            </div>
        </div>
    )

    function onChangePwBtnClick() {
        setModalType(ModalType.CHANGE_PASSWORD);

    }
    function onResetWidgetBtnClick() {
        setModalType(ModalType.RESET_WIDGET);
    }
    function onWithdrawBtnClick() {
        setModalType(ModalType.WITHDRAW);
    }


}