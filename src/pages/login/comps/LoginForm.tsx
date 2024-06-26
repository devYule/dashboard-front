import { useState } from "react";
import InputPassword from "../modules/InputPassword";
import InputId from "../modules/InputId";
import Register from "../modules/InputRegister";

export default function LoginForm() {
  const [userIdStatus, setUserIdStatus] = useState<{
    status: number | undefined;
    userId: string;
  }>({ status: undefined, userId: "" });
  const [servKey, setServKey] = useState<string>("");

  return (
    <div className="loginForm">
      {userIdStatus.status === 1 ? (
        <InputPassword
          userId={userIdStatus.userId}
          setUserIdStatus={setUserIdStatus}
          servKey={servKey}
        />
      ) : userIdStatus.status === 0 ? (
        <Register userId={userIdStatus.userId} servKey={servKey} setServKey={setServKey} />
      ) : (
        <InputId
          userIdStatus={userIdStatus}
          setUserIdStatus={setUserIdStatus}
          setServKey={setServKey}
        />
      )}
    </div>
  );
}
