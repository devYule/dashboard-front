import { useState } from 'react';
import InputPassword from '../modules/InputPassword';
import InputId from '../modules/InputId';
import Register from '../modules/InputRegister';


export default function LoginForm() {
    
    const [userId, setUserId] = useState<string | null | undefined>(undefined);

    return (
        <>
            {
                userId ? <InputPassword userId={userId} setUserId={setUserId} /> :
                    userId === '' ?
                        <Register /> :
                        <InputId userId={userId} setUserId={setUserId} />
            }
        </>
    );

}




