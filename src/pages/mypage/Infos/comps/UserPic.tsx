import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import { axiosInstance } from "../../../../pbl/AxiosUtil";
import { AllUserDatasContext, SetAllUserDatasContext } from "../../../../pbl/Contexts";

export default function UserPic() {

    const fileRef = useRef<HTMLInputElement>(null);
    // const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
    const [isImgHover, setIsImgHover] = useState<boolean>(false);
    const [randomKey, setRandomKey] = useState<number>(0); // 사진 경로가 prof.jpg 로 동일하므로, 강제 렌더링을 위해 랜덤 key 사용.

    const userInfos = useContext(AllUserDatasContext);
    const setUserInfos = useContext(SetAllUserDatasContext);

    const userPicFullPath = `http://220.89.48.242:35115/pic/${userInfos.pic}`;

    let timeoutKey: NodeJS.Timeout | null = null;

    return (
        <div className="picInfos">
            <div className="circle pointer" onClick={e => circleOnClick(e)}>
                <input type="file" id="file" ref={fileRef} onChange={e => inputOnChange(e)} value={''} />
                {userInfos.pic && userInfos.pic !== 'default' ?
                    <img key={randomKey} id="pic" src={userPicFullPath} alt="pic" onMouseEnter={imgOnMouseEnter} onMouseLeave={onmouseleave} />
                    :
                    <svg viewBox="0 0 235 235" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="117.5" cy="117.5" r="116.5" stroke="black" strokeWidth="2" />
                        <path d="M117.958 117.958C122.828 117.958 127.497 116.024 130.94 112.581C134.383 109.138 136.318 104.468 136.318 99.5989C136.318 94.7297 134.383 90.06 130.94 86.6169C127.497 83.1738 122.828 81.2396 117.958 81.2396C113.089 81.2396 108.419 83.1738 104.976 86.6169C101.533 90.06 99.599 94.7297 99.599 99.5989C99.599 104.468 101.533 109.138 104.976 112.581C108.419 116.024 113.089 117.958 117.958 117.958ZM130.198 99.5989C130.198 102.845 128.908 105.958 126.613 108.254C124.318 110.549 121.204 111.839 117.958 111.839C114.712 111.839 111.599 110.549 109.304 108.254C107.008 105.958 105.719 102.845 105.719 99.5989C105.719 96.3528 107.008 93.2396 109.304 90.9442C111.599 88.6489 114.712 87.3594 117.958 87.3594C121.204 87.3594 124.318 88.6489 126.613 90.9442C128.908 93.2396 130.198 96.3528 130.198 99.5989ZM154.677 148.557C154.677 154.677 148.557 154.677 148.557 154.677H87.3594C87.3594 154.677 81.2396 154.677 81.2396 148.557C81.2396 142.437 87.3594 124.078 117.958 124.078C148.557 124.078 154.677 142.437 154.677 148.557ZM148.557 148.533C148.551 147.027 147.615 142.499 143.466 138.349C139.476 134.359 131.967 130.198 117.958 130.198C103.95 130.198 96.4412 134.359 92.4511 138.349C88.3018 142.499 87.3716 147.027 87.3594 148.533H148.557Z" fill="black" />
                    </svg>
                }
            </div>
            {userInfos.pic && isImgHover && <p
                className="imgMouseOver pointer"
                onMouseEnter={imgOnMouseEnter}
                onMouseLeave={onmouseleave}
                onClick={removeBtnOnClick}
            >제거</p>}
        </div>
    );

    function circleOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (fileRef === null) return;
        fileRef.current?.click();
    }

    function imgOnMouseEnter() {
        if (timeoutKey) clearTimeout(timeoutKey);
        setIsImgHover(true);
    }
    function onmouseleave() {
        timeoutKey = setTimeout(() => {
            setIsImgHover(false);
        }, 100);

    }

    async function inputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const formData = new FormData();
        const files = e.target.files;
        if (!files) return;
        formData.append('pic', files[0]);

        await axios.put('/api/mypage/prof', formData, { headers: { "content-type": "multipart/form-data", "Authorization": "Bearer " + localStorage.getItem('at') } })
            .then(res => {
                const picPath = res.data.path;
                setUserInfos({ ...userInfos, pic: picPath });
                // setImgUrl(`http://localhost:8080/pic/${picPath}`);
                setRandomKey(Math.random());
            })
            .catch(console.error)
            .finally(() => e.target.value = '');
    }
    async function removeBtnOnClick() {
        await axiosInstance.delete('/api/mypage/prof')
            .then(res => {
                if (res.data.code > 0) {
                    if (res.data.code === 482) {
                        console.log('file is not exists in server !!!');
                        setUserInfos({ ...userInfos, pic: null })
                        // setImgUrl(undefined);
                        setRandomKey(0);
                        throw Error('file is not exists in server !!!');
                    }
                }
                if (res.data.value === 1) {
                    setUserInfos({ ...userInfos, pic: null })
                    // setImgUrl(undefined)
                    setRandomKey(0);
                }
            })
    }
}