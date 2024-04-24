import { useState } from 'react';
import InputPassword from '../modules/InputPassword';
import InputId from '../modules/InputId';
import Register from '../modules/InputRegister';
import styles from '../styles/Login.module.css'

export default function LoginForm() {


    const [userIdStatus, setUserIdStatus] = useState<{status: number | undefined, userId: string}>({status: undefined, userId: ''});
    const [servKey, setServKey] = useState<string>('');

    return (
        <div className={styles.loginForm}>
            {
                userIdStatus.status === 1 ? <InputPassword userId={userIdStatus.userId} setUserIdStatus={setUserIdStatus} servKey={servKey} /> :
                    userIdStatus.status === 0 ?
                        <Register userId={userIdStatus.userId} /> :
                        <InputId userIdStatus={userIdStatus} setUserIdStatus={setUserIdStatus} setServKey={setServKey} />
            }
        </div>
    );

}




