import { useEffect, useState } from 'react';
import InputRegUserInfo from './InputRegUserInfo';
import InputRegEmail from './InputRegEmail';
import { useNavigate } from 'react-router-dom';

export default function Register({ userId }: { userId: string }) {
    console.log('render Register');

    const navi = useNavigate();

    const [id, setId] = useState(userId);

    const [isPassedUserInfo, setIsPassedUserInfo] = useState(false);

    const [servKet, setServKey] = useState('');




    return (
        <>
            {
                !isPassedUserInfo ?
                    <InputRegUserInfo
                        userId={id}
                        setIsPassedUserInfo={setIsPassedUserInfo} setServKey={setServKey} />
                    :
                    <InputRegEmail  servKey={servKet} />
            }

        </>
    );


}