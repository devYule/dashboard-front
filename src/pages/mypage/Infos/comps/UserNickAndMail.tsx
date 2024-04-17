import { useState } from "react";

export default function UserNickAndMail() {
    const [hoverItem, setHoverItem] = useState<string>('none');
    const [clickedItem, setClickedItem] = useState<string>('none');
    const [nick, setNick] = useState<string>('nickname');
    const [mail, setMail] = useState<string>('mail@mail.com');
    const [nickInputVal, setNickInputVal] = useState<string>(nick);
    const [mailInputVal, setMailInputVal] = useState<string>(mail);
    const [submitButtonShow, setSubmitButtonShow] = useState<boolean>(false);


    return (
        <div className="nickAndMail" >
            {clickedItem !== 'nick' ? <p id="nick" onMouseEnter={() => onMouseEnter('nick')} onMouseLeave={onMouseLeave}>
                {clickedItem === 'none' && hoverItem === 'nick' && <button className="edit nickEdit pointer"
                    onClick={() => onClick('nick')}>
                    <p>edit</p>
                </button>}{nick}
            </p>
                :
                <div className="changeContainer">
                    <input value={nickInputVal}
                        className="input nickInput"
                        onChange={(e) => onChange(e)}
                        onBlur={onBlur}
                        onKeyUp={e => {
                            console.log(e.key);

                            if (e.key === 'Enter') {
                                setNick(nickInputVal);
                                setClickedItem('none');
                                setSubmitButtonShow(false);
                            }
                            if (e.key === 'Escape') {
                                onBlur();
                            }
                        }}
                        autoFocus>

                    </input>
                    {submitButtonShow && <button className="submitBtn nickSubmitBtn pointer" onClick={() => setNick(nickInputVal)}>
                        <svg viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 18.3205L16 9.66025L1 1" stroke="black" />
                        </svg></button>}
                </div>
            }
            {clickedItem !== 'mail' ? <p id="mail" onMouseEnter={() => onMouseEnter('mail')} onMouseLeave={onMouseLeave}>
                {clickedItem === 'none' && hoverItem === 'mail' && <button className="edit mailEdit pointer"
                    onClick={() => onClick('mail')}>
                    <p>edit</p>
                </button>}{mail}
            </p>
                :
                <div className="changeContainer">
                    <input value={mailInputVal}
                        className="input nickInput"
                        onChange={(e) => onChange(e)} onBlur={onBlur}
                        onKeyUp={e => {
                            console.log(e.key);
                            if (e.key === 'Enter') {
                                if (mailInputVal.includes('@') && mailInputVal.includes('.')) {
                                    setMail(mailInputVal);
                                }
                                setClickedItem('none');
                                setSubmitButtonShow(false);
                            }
                            if (e.key === 'Escape') {
                                onBlur();

                            }
                        }}
                        autoFocus>

                    </input>
                    {submitButtonShow && <button className="submitBtn mailSubmitBtn pointer" onClick={() => {
                        if (mailInputVal.includes('@') && mailInputVal.includes('.')) {
                            setMail(mailInputVal);
                        }
                    }}>
                        <svg viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 18.3205L16 9.66025L1 1" stroke="black" />
                        </svg>
                    </button>}
                </div>
            }
        </div>
    );
    function onMouseEnter(type: string) {
        setHoverItem(type);
    }
    function onMouseLeave() {
        setHoverItem('none');
    }
    function onClick(type: string) {
        setClickedItem(type);
    }
    function onBlur() {
        clickedItem === 'nick' ? setNickInputVal(nick) : setMailInputVal(mail);
        setClickedItem('none');
        setSubmitButtonShow(false);
    }
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (clickedItem === 'nick') {
            if (nick !== e.target.value) {
                setSubmitButtonShow(true);
            } else {
                setSubmitButtonShow(false);
            }
            setNickInputVal(e.target.value);
        }
        if (clickedItem === 'mail') {
            if (mail !== e.target.value) {
                setSubmitButtonShow(true);
            } else {
                setSubmitButtonShow(false);
            }
            setMailInputVal(e.target.value);
        }
    }

}
