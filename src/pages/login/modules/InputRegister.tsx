import { Dispatch, SetStateAction, useState } from "react";
import InputRegUserInfo from "./InputRegUserInfo";
import InputRegEmail from "./InputRegEmail";

export default function Register({
  userId,
  servKey,
  setServKey,
}: {
  userId: string;
  servKey: string;
  setServKey: Dispatch<SetStateAction<string>>;
}) {
  console.log("render Register");

  const [isPassedUserInfo, setIsPassedUserInfo] = useState(false);

  return (
    <>
      {!isPassedUserInfo ? (
        <InputRegUserInfo
          userId={userId}
          setIsPassedUserInfo={setIsPassedUserInfo}
          setServKey={setServKey}
        />
      ) : (
        <InputRegEmail servKey={servKey} />
      )}
    </>
  );
}
