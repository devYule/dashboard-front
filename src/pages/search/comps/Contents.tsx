import { useState } from "react";

interface ContentsInter {
    title: string;
    content: string;
    isBookmarked: boolean;
}

const initDatas: ContentsInter[] = [
    { title: 'test1', content: 'test1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 contenttest1 content', isBookmarked: false },
    { title: 'test2', content: 'test2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 contenttest2 content', isBookmarked: false },
    { title: 'test3', content: 'test3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 contenttest3 content', isBookmarked: true },
    { title: 'test4', content: 'test4 contenttest4 contenttest4 contenttest4 contenttest4 contenttest4 contenttest4 contenttest4 contenttest4 contenttest4 contenttest4 contenttest4 contenttest4 content', isBookmarked: false },
    { title: 'test5', content: 'test5 content', isBookmarked: false },
    { title: 'test6', content: 'test6 content', isBookmarked: false },
    { title: 'test7', content: 'test7 content', isBookmarked: false },
    { title: 'test8', content: 'test8 content', isBookmarked: true },
    { title: 'test9', content: 'test9 content', isBookmarked: false },
    { title: 'test10', content: 'test10 content', isBookmarked: false },
    { title: 'test11', content: 'test11 content', isBookmarked: false },
    { title: 'test12', content: 'test12 content', isBookmarked: false },
    { title: 'test13', content: 'test13 content', isBookmarked: false },
    { title: 'test14', content: 'test14 content', isBookmarked: false },
    { title: 'test15', content: 'test15 content', isBookmarked: true },
    { title: 'test16', content: 'test16 content', isBookmarked: false },
    { title: 'test17', content: 'test17 content', isBookmarked: false },
    { title: 'test18', content: 'test18 content', isBookmarked: false },
    { title: 'test19', content: 'test19 content', isBookmarked: false },
    { title: 'test20', content: 'test20 content', isBookmarked: false },
];

enum BtnTypes {
    NONE, BOOKMAKRED, ADD, SUCCESS
}

export default function Contents() {

    const [contents, setcontents] = useState<ContentsInter[]>(initDatas);

    const [addedIdx, setAddedIdx] = useState<number>(-1);


    const addImg = <svg viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.92838e-07 33.9055V4.3749C2.92838e-07 3.2146 0.460936 2.10183 1.28141 1.28138C2.10188 0.460926 3.21468 0 4.375 0L21.875 0C23.0353 0 24.1481 0.460926 24.9686 1.28138C25.7891 2.10183 26.25 3.2146 26.25 4.3749V33.9055C26.2501 34.0954 26.2008 34.2821 26.1069 34.4472C26.013 34.6123 25.8777 34.75 25.7143 34.8469C25.5509 34.9438 25.3652 34.9965 25.1753 34.9998C24.9854 35.0031 24.7979 34.9569 24.6313 34.8658L13.125 28.5878L1.61875 34.8658C1.45213 34.9569 1.26463 35.0031 1.07473 34.9998C0.884824 34.9965 0.699053 34.9438 0.535701 34.8469C0.372349 34.75 0.237048 34.6123 0.143116 34.4472C0.0491849 34.2821 -0.000138674 34.0954 2.92838e-07 33.9055ZM14.2188 9.84352C14.2188 9.55345 14.1035 9.27526 13.8984 9.07014C13.6933 8.86503 13.4151 8.7498 13.125 8.7498C12.8349 8.7498 12.5567 8.86503 12.3516 9.07014C12.1465 9.27526 12.0312 9.55345 12.0312 9.84352V13.1247H8.75C8.45992 13.1247 8.18172 13.2399 7.9766 13.445C7.77148 13.6502 7.65625 13.9284 7.65625 14.2184C7.65625 14.5085 7.77148 14.7867 7.9766 14.9918C8.18172 15.1969 8.45992 15.3121 8.75 15.3121H12.0312V18.5933C12.0312 18.8834 12.1465 19.1616 12.3516 19.3667C12.5567 19.5718 12.8349 19.687 13.125 19.687C13.4151 19.687 13.6933 19.5718 13.8984 19.3667C14.1035 19.1616 14.2188 18.8834 14.2188 18.5933V15.3121H17.5C17.7901 15.3121 18.0683 15.1969 18.2734 14.9918C18.4785 14.7867 18.5938 14.5085 18.5938 14.2184C18.5938 13.9284 18.4785 13.6502 18.2734 13.445C18.0683 13.2399 17.7901 13.1247 17.5 13.1247H14.2188V9.84352Z" fill="black" />
    </svg>
    const bookmarkedImg = <svg viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.92838e-07 33.9055V4.3749C2.92838e-07 3.2146 0.460936 2.10183 1.28141 1.28138C2.10188 0.460926 3.21468 0 4.375 0L21.875 0C23.0353 0 24.1481 0.460926 24.9686 1.28138C25.7891 2.10183 26.25 3.2146 26.25 4.3749V33.9055C26.2501 34.0954 26.2008 34.2821 26.1069 34.4472C26.013 34.6123 25.8777 34.75 25.7143 34.8469C25.5509 34.9438 25.3652 34.9965 25.1753 34.9998C24.9854 35.0031 24.7979 34.9569 24.6313 34.8658L13.125 28.5878L1.61875 34.8658C1.45213 34.9569 1.26463 35.0031 1.07473 34.9998C0.884824 34.9965 0.699053 34.9438 0.535701 34.8469C0.372349 34.75 0.237048 34.6123 0.143116 34.4472C0.0491849 34.2821 -0.000138674 34.0954 2.92838e-07 33.9055ZM8.75 13.1247C8.45992 13.1247 8.18172 13.2399 7.9766 13.445C7.77148 13.6502 7.65625 13.9284 7.65625 14.2184C7.65625 14.5085 7.77148 14.7867 7.9766 14.9918C8.18172 15.1969 8.45992 15.3121 8.75 15.3121H17.5C17.7901 15.3121 18.0683 15.1969 18.2734 14.9918C18.4785 14.7867 18.5938 14.5085 18.5938 14.2184C18.5938 13.9284 18.4785 13.6502 18.2734 13.445C18.0683 13.2399 17.7901 13.1247 17.5 13.1247H8.75Z" fill="black" />
    </svg>
    const successImg = <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 28.125C11.519 28.125 8.18064 26.7422 5.71922 24.2808C3.25781 21.8194 1.875 18.481 1.875 15C1.875 11.519 3.25781 8.18064 5.71922 5.71922C8.18064 3.25781 11.519 1.875 15 1.875C18.481 1.875 21.8194 3.25781 24.2808 5.71922C26.7422 8.18064 28.125 11.519 28.125 15C28.125 18.481 26.7422 21.8194 24.2808 24.2808C21.8194 26.7422 18.481 28.125 15 28.125ZM15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30Z" fill="#25E55B" />
        <path d="M20.6407 9.40148L20.6038 9.44211L14.1923 17.6157L10.3285 13.7478C10.066 13.5031 9.71884 13.3699 9.36014 13.3762C9.00144 13.3825 8.65921 13.5279 8.40553 13.7817C8.15185 14.0356 8.00654 14.378 8.00022 14.7369C7.99389 15.0958 8.12703 15.4431 8.3716 15.7058L13.2563 20.5951C13.3879 20.7266 13.5446 20.8301 13.7171 20.8996C13.8896 20.9692 14.0743 21.0032 14.2602 20.9998C14.4461 20.9963 14.6294 20.9554 14.7991 20.8796C14.9689 20.8037 15.1216 20.6944 15.2483 20.5582L22.6179 11.341C22.8688 11.0774 23.006 10.7257 22.9998 10.3617C22.9936 9.99781 22.8445 9.65093 22.5847 9.39611C22.325 9.14129 21.9754 8.999 21.6116 9.00001C21.2478 9.00101 20.8991 9.14523 20.6407 9.40148Z" fill="#25E55B" />
    </svg>

    return (
        <div className="contentsContainer">
            {contents.map((content, idx) => {
                return (
                    <>
                        <div key={idx} className="content">
                            <p className="title" onMouseEnter={() => titleOnMouseEnter(idx + 'thBtn')} onMouseLeave={() => titleOnMouseLeave(idx + 'thBtn')}>{content.title}
                                {
                                    addedIdx === idx ?
                                        <button className="bookmarkBtns">{successImg}</button>
                                        :
                                        <button id={idx + 'thBtn'} className="bookmarkBtns pointer" style={{ visibility: 'hidden' }}
                                            onClick={content => bookmarBtnOnClick(content, idx)}>
                                            {content.isBookmarked ? bookmarkedImg : addImg}
                                        </button>
                                }

                            </p>

                            <p className="text">{content.content}</p>

                        </div>
                        <hr />
                    </>
                );
            })}
        </div>
    );
    function bookmarBtnOnClick(content: any, idx: number) {
        if (content.isBookmarked) {
            // 북마크 해제, 성공이면 isBookmarked 를 false 로 변경

        } else {
            // 북마크 등록, 성공이면 isBookmarked 를 true 로 변경

        }

        setcontents(contents.map((c: any, i: number) => {
            if (i === idx) {
                return { ...c, isBookmarked: !c.isBookmarked };
            }
            return c;
        }))

        setAddedIdx(idx);
        setTimeout(() => {
            setAddedIdx(-1);
        }, 2000);

    }
    function titleOnMouseEnter(btnId: string) {
        document.getElementById(btnId)?.style.setProperty('visibility', 'visible');
    }
    function titleOnMouseLeave(btnId: string) {
        document.getElementById(btnId)?.style.setProperty('visibility', 'hidden');
    }

}