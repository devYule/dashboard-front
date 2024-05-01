import { useContext, useEffect, useState } from "react";
import {
  AllUserDatasContext,
  SetAllUserDatasContext,
} from "../../../../pbl/Contexts";
import { axiosInstance } from "../../../../pbl/AxiosUtil";
import ChangeLoadingComp from "./ChangeLoadingComp";
import ChangeInputSubmitBtn from "./ChangeInputSubmitBtn";
import ChangeInputComp from "./ChangeInputComp";
import ChangeInputContainer from "./ChangeInputContainer";
import ChangeTextComp from "./ChangeTextComp";
import ChangeTextEditBtnComp from "./ChangeTextEditBtnComp";
import ChangeInputCancelBtnComp from "./ChangeInputCancelBtnComp";

export default function UserNickAndMail() {
  const [hoverItem, setHoverItem] = useState<string>("none");
  const [clickedItem, setClickedItem] = useState<string>("none");
  // const [nick, setNick] = useState<string>('nickname');
  // const [mail, setMail] = useState<string>('mail@mail.com');
  const [nickInputVal, setNickInputVal] = useState<string>("");
  const [mailInputVal, setMailInputVal] = useState<string>("");
  const [codeInputVal, setCodeInputVal] = useState<string>("");
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
  console.log("nick", nickInputVal, "mail", mailInputVal);

  console.log("mailValidCode: ", mailValidCode);

  return (
    <>
      <div className="nickAndMail">
        {clickedItem !== "nick" ? (
          <ChangeTextComp
            id="nick"
            onMouseEnter={onMouseEnter}
            onMouseEnterParam="nick"
            onMouseLeave={onMouseLeave}
          >
            {clickedItem === "none" && hoverItem === "nick" && (
              <ChangeTextEditBtnComp
                className="edit nickEdit pointer"
                onClick={onClick}
                onClickParam="nick"
              />
            )}
            {userInfos.nick}
          </ChangeTextComp>
        ) : (
          <ChangeInputContainer>
            <ChangeInputCancelBtnComp onClick={onCancelBtnClick} />
            <ChangeInputComp
              className="input nickInput"
              inputVal={nickInputVal}
              onChange={onChange}
              style={inputErrStyle}
              onKeyUp={onKeyUpNick}
              autoFocus={true}
            />

            {submitButtonShow && (
              <ChangeInputSubmitBtn
                className="submitBtn nickSubmitBtn pointer"
                onClick={changeNick}
              />
            )}
          </ChangeInputContainer>
        )}

        {clickedItem !== "mail" ? (
          <ChangeTextComp
            id="mail"
            onMouseEnter={onMouseEnter}
            onMouseEnterParam="mail"
            onMouseLeave={onMouseLeave}
          >
            {clickedItem === "none" && hoverItem === "mail" && (
              <ChangeTextEditBtnComp
                className="edit mailEdit pointer"
                onClick={onClick}
                onClickParam="mail"
              />
            )}
            {userInfos.mail}
          </ChangeTextComp>
        ) : (
          <ChangeInputContainer>
            <ChangeInputCancelBtnComp onClick={onCancelBtnClick} />
            {mailValidCode ? (
              <ChangeInputComp
                inputVal={codeInputVal}
                className="input codeInput"
                onChange={onChange}
                placeHolder="인증 코드를 입력해주세요"
                onKeyUp={onKeyUpMail}
                style={inputErrStyle}
                autoFocus={true}
              />
            ) : (
              <ChangeInputComp
                inputVal={mailInputVal}
                className="input mailInput"
                onChange={onChange}
                onKeyUp={onKeyUpMail}
                style={inputErrStyle}
                autoFocus={true}
                disabled={mailDisabled}
              />
            )}
            {mailDisabled && <ChangeLoadingComp />}

            {submitButtonShow && (
              <ChangeInputSubmitBtn
                className="submitBtn mailSubmitBtn pointer"
                onClick={changeMail}
              />
            )}
          </ChangeInputContainer>
        )}
      </div>
    </>
  );
  function onKeyUpNick(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(e.key);

    if (e.key === "Enter") {
      changeNick();
    }
    if (e.key === "Escape") {
      onCancelBtnClick();
    }
  }
  function onKeyUpMail(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(e.key);
    if (e.key === "Enter") {
      if (mailInputVal.includes("@") && mailInputVal.includes(".")) {
        changeMail();
      }
    }
    if (e.key === "Escape") {
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
    setHoverItem("none");
  }
  function onClick(type: string) {
    setClickedItem(type);
  }
  function onCancelBtnClick() {
    if (timeoutCode) clearTimeout(timeoutCode);
    setTimeout(() => {
      if (clickedItem === "nick") {
        setNickInputVal(userInfos.nick);
      }
      if (clickedItem === "mail") {
        setMailInputVal(userInfos.mail);
        setCodeInputVal("");
        setMailValidCode(null);
      }

      setClickedItem("none");
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
    if (clickedItem === "nick") {
      if (userInfos.nick !== e.target.value) {
        setSubmitButtonShow(true);
      } else {
        setSubmitButtonShow(false);
      }
      setNickInputVal(e.target.value);
      return;
    }
    if (clickedItem === "mail") {
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
    await axiosInstance
      .put("/api/mypage/nick", { nick: nickInputVal })
      .then((res) => {
        if (res.data.code > 0) {
          if (res.data.code === 495) {
            // 닉 중복
            setInputErrStyle({ borderColor: "red" });
          }
        }
        if (res.data.value === 1) {
          setUserInfos({ ...userInfos, nick: nickInputVal });
          setClickedItem("none");
          setSubmitButtonShow(false);
        }
      })
      .catch(console.error);
  }
  async function changeMail() {
    if (!mailValidCode) {
      // 메일 인증 요청
      if (!(mailInputVal.includes("@") && mailInputVal.includes("."))) {
        return;
      }

      setMailDisabled(true);
      setSubmitButtonShow(false);
      await axiosInstance
        .put("/api/mypage/mail", { mail: mailInputVal })
        .then((res) => {
          console.log("changeMail.code: ", res.data.code);
          console.log("changeMail.value: ", res.data.value);
          timeoutCode = setTimeout(() => {
            setMailValidCode(res.data.key);
            setMailDisabled(false);
          }, 3000);
          setSubmitButtonShow(false);
          if (res.data.code > 0) {
            if (res.data.code === 493) {
              // 메일 중복
              setInputErrStyle({ borderColor: "red" });
              clearTimeout(timeoutCode);
              setMailValidCode(res.data.key);
              setMailDisabled(false);
            }
            if (res.data.code === 491) {
              // 실패
              setMailInputVal(userInfos.mail);
              setCodeInputVal("");
              setMailValidCode(null);
              setClickedItem("none");
              setSubmitButtonShow(false);
              setInputErrStyle({ borderColor: "red" });
            }
          }
        })
        .catch(console.error)
        .finally(() => {
          if (!timeoutCode) setMailValidCode(null);
        });
    } else {
      if (mailValidCode === "temp") return;
      if (!(mailInputVal.includes("@") && mailInputVal.includes("."))) return;
      if (codeInputVal.length !== 6) return;

      // mailInputVal = 변경된 메일
      if (mailInputVal === userInfos.mail) {
        return;
      }
      // 서버 요청

      await axiosInstance
        .post("/api/mypage/mail", { key: mailValidCode, code: codeInputVal })
        .then((res) => {
          if (res.data.code > 0) {
            if (res.data.code === 492) {
              setInputErrStyle({ borderColor: "red" });
            }
          }
          if (res.data.value === 1) {
            setUserInfos({ ...userInfos, mail: mailInputVal });
            setClickedItem("none");
            setSubmitButtonShow(false);
          }
        });
    }
  }
}
