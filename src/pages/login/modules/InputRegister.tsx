import { useEffect, useState } from 'react';
import InputRegUserInfo from './InputRegUserInfo';
import InputRegEmail from './InputRegEmail';
import { useNavigate } from 'react-router-dom';

export default function Register({ userId }: { userId: string }) {
    console.log('render Register');

    const navi = useNavigate();

    const [id, setId] = useState(userId);
    const [nick, setNick] = useState('');
    const [pw, setPw] = useState('');
    const [email, setEmail] = useState('');

    const [isPassedUserInfo, setIsPassedUserInfo] = useState(false);
    const [isAllDone, setIsAllDone] = useState(false);


    useEffect(() => {
        if (isAllDone) {
            const userData = {
                id, nick, pw, email
            };
            localStorage.setItem('user', JSON.stringify(userData));
            navi('/main', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAllDone]);



    return (
        <>
            {
                !isPassedUserInfo ?
                    <InputRegUserInfo
                        userId={id}
                        setSuperId={setId} setSuperNick={setNick} setSuperPw={setPw}
                        setIsPassedUserInfo={setIsPassedUserInfo} />
                    :
                    <InputRegEmail setIsAllDone={setIsAllDone} setSuperEmail={setEmail} />
            }

        </>
    );


}