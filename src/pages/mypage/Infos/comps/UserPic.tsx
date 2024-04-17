import { useRef, useState } from "react"

export default function UserPic() {

    const fileRef = useRef<HTMLInputElement>(null);
    const [imgUrl, setImgUrl] = useState<string>("https://i.imgur.com/Mx7dA2Y.jpg");

    return (
        <>
            <div className="circle pointer" onClick={circleOnClick}>
                <input type="file" id="file" ref={fileRef} onChange={e => inputOnChange(e)} />
                <img id="pic" src={imgUrl} alt="pic" />
            </div>
        </>
    );

    function circleOnClick() {
        if (fileRef === null) return;
        fileRef.current?.click();
    }
    function inputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setImgUrl(e.target.files![0].name);
    }
}