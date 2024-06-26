import { CSSProperties, useState } from "react";
import styles from "../styles/Login.module.css";
import InputLine from "./InputLine";
import { InputUserStatusProps } from "../../../interfaces/Interfaces";
import TitleText from "./TitleText";
import { axiosInstance } from "../../../pbl/AxiosUtil";

export default function InputId({
  userIdStatus,
  setUserIdStatus,
  setServKey,
}: InputUserStatusProps) {
  console.log("render InputId");
  const [id, setId] = useState("");
  const [enterRecorder, setEnterRecorder] = useState(false);
  const btnDisabled = id.length < 5 || id.length > 20;

  const svgVisiable: CSSProperties = {
    opacity: id.length > 4 ? 1 : 0.2,
  };
  const inputColorStyle = {
    borderColor: userIdStatus.status === -1 ? "red" : "black",
  };

  return (
    <div className="id">
      <TitleText>아이디</TitleText>
      <InputLine
        style={inputColorStyle}
        type={"text"}
        value={id}
        onChange={idOnChange}
        onKeyDown={(e) => id.length > 4 && onKeyDown(e)}
        autoFocus={true}
        placeholder="아이디 ( 5 ~ 20자 사이 )"
        disabled={false}
      />
      <section>
        <button className="btns" onClick={submitOnClick} disabled={btnDisabled}>
          <svg
            style={svgVisiable}
            width="34"
            height="35"
            viewBox="0 0 34 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 26.3205L24 17.6603L9 9" stroke="black" />
          </svg>
        </button>
      </section>
    </div>
  );

  function idOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
    setEnterRecorder(false);
    userIdStatus.status !== undefined &&
      setUserIdStatus({ ...userIdStatus, status: undefined });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (enterRecorder) return;
      console.log("onKeyDown");
      setEnterRecorder(true);
      submitOnClick();
    }
  }

  // 통신 결과가 1이면 비번입력창 & -1이면 아이디 틀림, 0이면 회원가입 폼 -> url 이동 없이 구현.

  async function submitOnClick() {
    if (btnDisabled) return;
    console.log("submitOnClick");
    // setIsCorrect((await axios.post('/api/user/id', { userLoginId: id })).data);

    // const res = await axios.post('/api/user/id', { userLoginId: id });

    await axiosInstance
      .post("/api/user/id", { loginId: id })
      .then((res) => {
        if (res.data.code === 499) {
          // id not exists
          setUserIdStatus({ status: 0, userId: id });
        } else if (res.data.code === 475) {
          // id language error
          setUserIdStatus({ status: -1, userId: id });
        } else {
          setServKey(res.data.key);
          setUserIdStatus({ status: 1, userId: id });
        }
      })
      .catch(console.error);
  }
}
