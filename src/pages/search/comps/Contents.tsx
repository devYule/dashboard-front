import { useEffect, useState } from "react";
import { axiosInstance } from "../../../pbl/AxiosUtil";
import { useNavigate } from "react-router-dom";
import { allSites, allSitesColors } from "../../../interfaces/Interfaces";

interface OrderedSitesRef {
    siteId: number;
    contents: ContentsRef[];
}

interface ContentsRef {
    title: string;
    link: string;
    content: string[];
    category: string;
    iconPath: string;
    subTitle: string;
    bookmarkId: number;
}

const maxSize = {
    titleMaxSize: 30,
    contentsSize: 300,
}


enum BtnTypes {
    NONE, BOOKMAKRED, ADD, SUCCESS
}



export default function Contents({ query }: { query: string | null }) {


    const [contents, setContents] = useState<OrderedSitesRef[]>([]);
    const [addedIdx, setAddedIdx] = useState<number>(-1);
    const [bookmarkMemo, setBookmarkMemo] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [typingIdx, setTypingIdx] = useState<number>(-1);
    const [timeoutIds, setTimeoutIds] = useState<NodeJS.Timeout[]>([]);

    const typingText = 'Loading...';

    const navi = useNavigate();

    let timeoutId: NodeJS.Timeout | undefined;





    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            // 500 ~ 1000
            setTimeout(() => {
                let addedTime = 0;
                for (let i = 0; i < typingText.length; i++) {
                    const time = (Math.random() * 150) + 151;
                    console.log('time: ', time);
                    setTimeoutIds([...timeoutIds, setTimeout(() => {
                        setTypingIdx(i);
                    }, addedTime += time)]);
                }
                for (let i = typingText.length; i > -1; i--) {
                    const time = (Math.random() * 150) + 151;
                    console.log('time: ', time);
                    setTimeoutIds([...timeoutIds, setTimeout(() => {
                        setTypingIdx(i);
                    }, addedTime += time)]);
                }
            });
            await axiosInstance.get(`/api/search?query=${query}`)
                .then(res => {
                    console.log(res.data.code);
                    console.log(res.data);
                    if (res.data.code > 0) {
                        if (res.data.code === 479) {
                            navi('/mypage?err=site-is-empty');
                        }
                    }
                    if (res.data.length > -1) {
                        setContents(res.data);
                        setIsLoading(false);
                        if (!isLoading) {
                            timeoutIds.forEach((id) => clearTimeout(id));
                        }
                    }
                });

        }
        fetchData();
    }, [query]);


    const addImg = <svg viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.92838e-07 33.9055V4.3749C2.92838e-07 3.2146 0.460936 2.10183 1.28141 1.28138C2.10188 0.460926 3.21468 0 4.375 0L21.875 0C23.0353 0 24.1481 0.460926 24.9686 1.28138C25.7891 2.10183 26.25 3.2146 26.25 4.3749V33.9055C26.2501 34.0954 26.2008 34.2821 26.1069 34.4472C26.013 34.6123 25.8777 34.75 25.7143 34.8469C25.5509 34.9438 25.3652 34.9965 25.1753 34.9998C24.9854 35.0031 24.7979 34.9569 24.6313 34.8658L13.125 28.5878L1.61875 34.8658C1.45213 34.9569 1.26463 35.0031 1.07473 34.9998C0.884824 34.9965 0.699053 34.9438 0.535701 34.8469C0.372349 34.75 0.237048 34.6123 0.143116 34.4472C0.0491849 34.2821 -0.000138674 34.0954 2.92838e-07 33.9055ZM14.2188 9.84352C14.2188 9.55345 14.1035 9.27526 13.8984 9.07014C13.6933 8.86503 13.4151 8.7498 13.125 8.7498C12.8349 8.7498 12.5567 8.86503 12.3516 9.07014C12.1465 9.27526 12.0312 9.55345 12.0312 9.84352V13.1247H8.75C8.45992 13.1247 8.18172 13.2399 7.9766 13.445C7.77148 13.6502 7.65625 13.9284 7.65625 14.2184C7.65625 14.5085 7.77148 14.7867 7.9766 14.9918C8.18172 15.1969 8.45992 15.3121 8.75 15.3121H12.0312V18.5933C12.0312 18.8834 12.1465 19.1616 12.3516 19.3667C12.5567 19.5718 12.8349 19.687 13.125 19.687C13.4151 19.687 13.6933 19.5718 13.8984 19.3667C14.1035 19.1616 14.2188 18.8834 14.2188 18.5933V15.3121H17.5C17.7901 15.3121 18.0683 15.1969 18.2734 14.9918C18.4785 14.7867 18.5938 14.5085 18.5938 14.2184C18.5938 13.9284 18.4785 13.6502 18.2734 13.445C18.0683 13.2399 17.7901 13.1247 17.5 13.1247H14.2188V9.84352Z" fill="black" />
    </svg>
    const bookmarkedImg = <svg viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.92838e-07 33.9055V4.3749C2.92838e-07 3.2146 0.460936 2.10183 1.28141 1.28138C2.10188 0.460926 3.21468 0 4.375 0L21.875 0C23.0353 0 24.1481 0.460926 24.9686 1.28138C25.7891 2.10183 26.25 3.2146 26.25 4.3749V33.9055C26.2501 34.0954 26.2008 34.2821 26.1069 34.4472C26.013 34.6123 25.8777 34.75 25.7143 34.8469C25.5509 34.9438 25.3652 34.9965 25.1753 34.9998C24.9854 35.0031 24.7979 34.9569 24.6313 34.8658L13.125 28.5878L1.61875 34.8658C1.45213 34.9569 1.26463 35.0031 1.07473 34.9998C0.884824 34.9965 0.699053 34.9438 0.535701 34.8469C0.372349 34.75 0.237048 34.6123 0.143116 34.4472C0.0491849 34.2821 -0.000138674 34.0954 2.92838e-07 33.9055ZM8.75 13.1247C8.45992 13.1247 8.18172 13.2399 7.9766 13.445C7.77148 13.6502 7.65625 13.9284 7.65625 14.2184C7.65625 14.5085 7.77148 14.7867 7.9766 14.9918C8.18172 15.1969 8.45992 15.3121 8.75 15.3121H17.5C17.7901 15.3121 18.0683 15.1969 18.2734 14.9918C18.4785 14.7867 18.5938 14.5085 18.5938 14.2184C18.5938 13.9284 18.4785 13.6502 18.2734 13.445C18.0683 13.2399 17.7901 13.1247 17.5 13.1247H8.75Z" fill="black" />
    </svg>
    const successImg = <svg id="checkAni" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 28.125C11.519 28.125 8.18064 26.7422 5.71922 24.2808C3.25781 21.8194 1.875 18.481 1.875 15C1.875 11.519 3.25781 8.18064 5.71922 5.71922C8.18064 3.25781 11.519 1.875 15 1.875C18.481 1.875 21.8194 3.25781 24.2808 5.71922C26.7422 8.18064 28.125 11.519 28.125 15C28.125 18.481 26.7422 21.8194 24.2808 24.2808C21.8194 26.7422 18.481 28.125 15 28.125ZM15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30Z" fill="#25E55B" />
        <path d="M20.6407 9.40148L20.6038 9.44211L14.1923 17.6157L10.3285 13.7478C10.066 13.5031 9.71884 13.3699 9.36014 13.3762C9.00144 13.3825 8.65921 13.5279 8.40553 13.7817C8.15185 14.0356 8.00654 14.378 8.00022 14.7369C7.99389 15.0958 8.12703 15.4431 8.3716 15.7058L13.2563 20.5951C13.3879 20.7266 13.5446 20.8301 13.7171 20.8996C13.8896 20.9692 14.0743 21.0032 14.2602 20.9998C14.4461 20.9963 14.6294 20.9554 14.7991 20.8796C14.9689 20.8037 15.1216 20.6944 15.2483 20.5582L22.6179 11.341C22.8688 11.0774 23.006 10.7257 22.9998 10.3617C22.9936 9.99781 22.8445 9.65093 22.5847 9.39611C22.325 9.14129 21.9754 8.999 21.6116 9.00001C21.2478 9.00101 20.8991 9.14523 20.6407 9.40148Z" fill="#25E55B" />
    </svg>

    return (
        <>
            {
                isLoading &&
                <div className="contentsModal">
                    <p className="typing-ani">{typingIdx > -1 && typingText.substring(0, typingIdx)}</p>
                    <p className="cursor">{'ㅣ'}</p>
                </div>
            }
            <div className="contentsContainer">
                {
                    contents.map((eachSite: OrderedSitesRef) => {
                        return (
                            <div key={eachSite.siteId} className={`site-box ${allSites[eachSite.siteId].title}`}>
                                {/* 각 사이트별 이름 */}
                                <div className="siteNameContainer" style={allSitesColors[eachSite.siteId]}>
                                    <p className="siteName">{allSites[eachSite.siteId].title}</p>
                                </div>
                                {/* 해당 사이트의 각 컨텐츠 */}
                                {eachSite.contents.map((content: ContentsRef, idx: number) => {
                                    // if (content.title.length < 1 && content.content.length < 1) return <></>;

                                    return (
                                        <div className="item" key={idx}>
                                            {/* title start */}
                                            <p className="title" onMouseEnter={() => titleOnMouseEnter(eachSite.siteId + '' + idx + 'thBtn')} onMouseLeave={() => titleOnMouseLeave(eachSite.siteId + '' + idx + 'thBtn')} onClick={() => onClickPlusRank(eachSite.siteId)}>
                                                {content.iconPath && content.iconPath.length > 0 ? (
                                                    <>
                                                        <img className="icon" src={content.iconPath} alt="icon" />
                                                    </>
                                                )

                                                    :
                                                    <div className="icon">
                                                        {
                                                            eachSite.siteId === 0 ?

                                                                <svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4.95829 1.75V5.25H4.52726L2.52295 2.50195H2.48703V5.25H2.04163V1.75H2.47266L4.48415 4.50488H4.52007V1.75H4.95829Z" fill="black" />
                                                                    <rect x="0.5" y="0.5" width="6" height="6" stroke="black" />
                                                                </svg>
                                                                :
                                                                <svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4.71339 2.75479C4.66934 2.62412 4.61127 2.50702 4.53919 2.40352C4.46844 2.29872 4.38368 2.20944 4.2849 2.1357C4.18745 2.06195 4.07666 2.00566 3.95252 1.96685C3.82838 1.92803 3.69222 1.90863 3.54405 1.90863C3.30111 1.90863 3.08019 1.96944 2.88129 2.09106C2.6824 2.21268 2.52422 2.39187 2.40675 2.62865C2.28928 2.86542 2.23055 3.15588 2.23055 3.50004C2.23055 3.8442 2.28995 4.13467 2.40875 4.37144C2.52756 4.60821 2.68841 4.7874 2.8913 4.90902C3.0942 5.03064 3.32246 5.09145 3.57609 5.09145C3.81102 5.09145 4.01793 5.04294 4.1968 4.9459C4.377 4.84757 4.51716 4.70913 4.61728 4.53058C4.71873 4.35074 4.76945 4.13919 4.76945 3.89595L4.92162 3.92701H3.68822V3.50004H5.25V3.92701C5.25 4.25434 5.17792 4.53899 5.03375 4.78093C4.89092 5.02288 4.69336 5.21049 4.44108 5.34375C4.19012 5.47572 3.90179 5.54171 3.57609 5.54171C3.21301 5.54171 2.89397 5.4589 2.61899 5.29329C2.34535 5.12768 2.13177 4.8922 1.97826 4.58686C1.82609 4.28152 1.75 3.91924 1.75 3.50004C1.75 3.18564 1.79338 2.90294 1.88015 2.65193C1.96825 2.39964 2.09239 2.18486 2.25257 2.00761C2.41276 1.83035 2.60231 1.6945 2.82122 1.60005C3.04014 1.5056 3.28108 1.45837 3.54405 1.45837C3.7603 1.45837 3.96186 1.49007 4.14874 1.55347C4.33696 1.61557 4.50448 1.7042 4.65132 1.81935C4.79949 1.93321 4.92296 2.06971 5.02174 2.22885C5.12052 2.3867 5.1886 2.56201 5.22597 2.75479H4.71339Z" fill="black" />
                                                                    <rect x="0.5" y="0.5" width="6" height="6" stroke="black" />
                                                                </svg>
                                                        }
                                                    </div>

                                                }
                                                <a target="_blank" rel="noopener noreferrer" className="titleLink" href={content.link}>
                                                    {stringSlicer(content.title, maxSize.titleMaxSize)}
                                                </a>
                                                {
                                                    addedIdx === idx ?
                                                        <button className="bookmarkBtns">{successImg}</button>
                                                        :
                                                        <button
                                                            id={eachSite.siteId + '' + idx + 'thBtn'}
                                                            className="bookmarkBtns pointer"
                                                            style={{ visibility: 'hidden' }}
                                                            onClick={() => bookmarBtnOnClick(content, eachSite.siteId, idx)}>
                                                            {content.bookmarkId > 0 ? bookmarkedImg : addImg}
                                                        </button>
                                                }
                                            </p>
                                            {/* title end */}

                                            {/* content start */}
                                            <div className="content-container">
                                                {
                                                    content.content.length > 1 ?
                                                        <>
                                                            <p className="date"> {stringSlicer(content.content[0], maxSize.contentsSize)}</p>
                                                            {content.content.map((c, idx) => {
                                                                if (idx === 0) return <></>;
                                                                return <p className="text">{stringSlicer(c, maxSize.contentsSize)}</p>
                                                            })}
                                                        </>
                                                        :
                                                        <p className="text">
                                                            {stringSlicer(content.content[0], maxSize.contentsSize)}
                                                        </p>
                                                }
                                            </div>
                                            {/* content end */}
                                            <hr />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
            <div className="search-modal">

            </div>
        </>
    );

    function stringSlicer(text: string, maxSize: number) {
        if (!text) return text;
        return text.length > maxSize ? text.substring(0, maxSize) : text;
    }
    async function bookmarBtnOnClick(content: ContentsRef, siteId: number, idx: number) {
        if (!isModalOpen) {
            setIsModalOpen(true);
            return;
        }
        if (content.bookmarkId > 0) {
            // 북마크 해제, 성공이면 isBookmarked 를 false 로 변경
            console.log('bookmarkId: ', content.bookmarkId);
            axiosInstance.delete(`/api/bm?id=${content.bookmarkId}`)
                .then(res => {
                    if (res.data.code > 0) return;
                    if (res.data.value === content.bookmarkId) {

                        setContents(contents.map((c: OrderedSitesRef) => {
                            if (c.siteId !== siteId) return c;
                            return {
                                siteId: siteId,
                                contents: c.contents.map((cc: ContentsRef, i: number) => {
                                    if (i !== idx) return cc;

                                    return { ...cc, bookmarkId: 0 };
                                })
                            }
                        }));

                    }
                });

        } else {
            // 북마크 등록, 성공이면 isBookmarked 를 true 로 변경

            // 메모 입력창 필요
            await axiosInstance.post('/api/bm', { title: content.title, url: content.link, memo: bookmarkMemo })
                .then(res => {

                    if (res.data.code > 0) {
                        return;
                    }

                    setContents(contents.map((c: OrderedSitesRef) => {
                        if (c.siteId !== siteId) return c;
                        return {
                            siteId: siteId,
                            contents: c.contents.map((cc: ContentsRef, i: number) => {
                                if (i !== idx) return cc;

                                return { ...cc, bookmarkId: res.data.value };
                            })
                        }
                    }));


                }).catch(console.error);

        }

        timeoutId && clearTimeout(timeoutId);
        setAddedIdx(idx);
        timeoutId = setTimeout(() => {
            setAddedIdx(-1);
        }, 2000);
    }

}

function titleOnMouseEnter(btnId: string) {
    document.getElementById(btnId)?.style.setProperty('visibility', 'visible');
}
function titleOnMouseLeave(btnId: string) {
    setTimeout(() => {
        document.getElementById(btnId)?.style.setProperty('visibility', 'hidden');
    }, 100);
}

function onClickPlusRank(siteId: number) {
    axiosInstance.get(`/api/user/rank?id=${siteId}`)
        .then(res => {
            console.log('did');
        });
}


