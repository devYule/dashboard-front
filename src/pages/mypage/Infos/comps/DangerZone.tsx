export default function DangerZone() {
    return (
        <div className="dangerZone">
            <p id="title">Danger Zone</p>
            <div className="part">
                <button className="pointer btns">비밀번호 변경</button>
                <button className="pointer btns">위젯 초기화</button>
                <button className="pointer btns">회원 탈퇴</button>
            </div>
        </div>
    )
}