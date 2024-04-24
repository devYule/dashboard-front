import axios from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../pbl/AxiosUtil";
import { useNavigate } from "react-router-dom";

interface OrderedSitesRef {
    contents: ContentsRef[]
}

interface ContentsRef {
    title: string;
    link: string;
    contents: string[];
    category: string;
    iconPath: string;
    subTitle: string;
    isBookmarked: number;
}

const initDatas: any[] = [
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

/* 

/ ---------------------------- response data example ----------------------------- /

[
    [
        {
            "title": [
                "[매경test 합격 후기] 매경테스트 난이도 및 시사용어 공부법"
            ],
            "link": "https://in.naver.com/fnhelp/contents/internal/685937062712576?areacode=ink*A&query=test",
            "content": [
                "3일 전안녕하세요 여러분, 금융권 및 은행권 취업 준비를 하시는 분들이라면 '매경test' 자격증을 따는 경우가 많은데요. 대기업과 공기업 채용 시 우대는 물론, 대학 졸업 논문 및 시험 대체와 학점은행제의 학점인정, 고교 학교생활기록부 기재 등으로 활용 범위가 넓기 때문입니다. 그래서 오늘은 취업에서 안정적인 합격을 위한 매경..."
            ],
            "category": "COMMUNITY",
            "iconPath": null,
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "버피테스트 효과 / 다이어트 운동 Burpee Test 칼로리 소모량"
            ],
            "link": "https://in.naver.com/apunis323/contents/internal/682515372225248?areacode=ink*A&query=test",
            "content": [
                "1주 전안녕하세요 워니파파버피루프입니다. 오늘은 우리의 건강한 몸매 유지 비결 중 하나, 바로 버피테스트에 대해 이야기해보려고 합니다. 다이어트와 체력 향상을 위해 많은 분들이 도전하지만, 그 효과와 칼로리 소모량에 대해서는 잘 모르시는 분들이 많더라고요. 다이어트 운동 버피테스트 효과/칼로리 버피테스트란? Burpee ..."
            ],
            "category": "COMMUNITY",
            "iconPath": null,
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "등가운데통증 원인은 목디스크? 증상 자가진단 TEST"
            ],
            "link": "https://in.naver.com/kokhospital/contents/internal/671337708597344?areacode=ink*A&query=test",
            "content": [
                "2024.03.12.목디스크는 목통증 외에도 다양한 부위에 증상이 나타날 수 있기에 초기 진단에 어려움을 겪을 수 있습니다. 디스크로 인해 발생할 수 있는 증상들인 등가운데통증, 두통, 날개뼈나 어깨통증, 손저림 등의 증상이 있다면 대부분 해당 부위에 문제가 발생한 것이라 생각하여 그에 대한 치료를 진행하게 되는데요.  이렇다 보니..."
            ],
            "category": "COMMUNITY",
            "iconPath": null,
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "2024학년도 시매쓰 영재통합반 초3 선발 TEST 안내"
            ],
            "link": "https://blog.naver.com/cmath_club/223368204453",
            "content": [
                "2024학년도 영재통합반 선발 TEST 안내 초등 저학년의 경우 사고력수학 NC를 활용해 창조적이고 자유로운 사고방식을 발달시켜 더 넓은 지적 용량을 구축해 나가는 것이 중요하죠. 이를 토대로 초등 고학년이 되었을때는 빠른 진도와 함께 깊이 있는 이해력을 길러낼수 있어요. 영재교육의 혁신! 2024학년도 영재통합반 선발 안내 교육의 목표는 단순히 암기..."
            ],
            "category": "COMMUNITY",
            "iconPath": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogpfthumb.phinf.naver.net%2FMjAyMDA1MTlfMTAz%2FMDAxNTg5ODc0MDU5OTI3.HosD96SswBAigSLr8he24yV98aSF-Gp48Qc5bqRR8IMg.p8BNlm9cgOOB5P-5ZLHLzco_4cmAfPOVtht6NflYc30g.JPEG.cmath_club%2F%2525BD%2525C3%2525B8%2525C5%2525BE%2525B2.jpg&type=f54_54",
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "논문통계이해 - TOST two one sided tests -equivalence test 동등성 검증"
            ],
            "link": "https://blog.naver.com/lucifer246/223425849931",
            "content": [
                "equivalence test TOST (two one sided tests) 동등성에 대한 결론을 내리기 위한 검증은 equivalence test 을 활용한다. Schuirmann’s (1987) 는 동등성 검증을 위해서 TOST (two one sided tests) 를 제안하였다. 이 검증을 사용하여 집단간 평균 차이가 실제로 어느정도로 큰 차이인지 실증할수 있다. 또한 작은 평균 차이에 대해서 동등하다고 결론내릴수 있다. equivalence 를..."
            ],
            "category": "COMMUNITY",
            "iconPath": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogpfthumb.phinf.naver.net%2FMjAxODAxMDhfNTQg%2FMDAxNTE1MzYwMjAwNjI4.4rmbSqSfRs7UFdiYC0gA0mV-J04XqXRADo-73wTgl8Qg.WpumLilJ2FC6C14XhbEYCaYGg55OGRVc3mXo4WAfGo0g.JPEG.lucifer246%2FprofileImage.jpg&type=f54_54",
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "영어쑥쑥어학원 정기 SR test 우수학생 포상~"
            ],
            "link": "https://blog.naver.com/olibie9/223344043053",
            "content": [
                "우리 영어쑥쑥어학원에서는 원서정독반, 5-6학년 브릿지반 아이들을 대상으로 3개월에 한번씩 정기 SR test를 보고 있습니다. SR test (Star reading test) 란? 미국에 본사를 두고 전세계 학교 및 기관에서 사용중인 르네상스에서 제공되는 리딩레벨 테스트입니다. 시험자의 정답속도와 정확도에 따라 다음문제가 달라지는 방식으로 34문제 를 푸는 테스트푼 후..."
            ],
            "category": "COMMUNITY",
            "iconPath": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogpfthumb.phinf.naver.net%2FMjAyMzEyMTVfMTM1%2FMDAxNzAyNTY2NDI4Mzk4.g9JxH593zqRJet6U0bQOj1Ixj33byLgyNXszX7LKjf0g.aPvvWs1JR3HpXlGWlibuhKvnJCm36j1QYxOAnd_XHSMg.JPEG.olibie9%2FprofileImage.jpg&type=f54_54",
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "[미국 대학 입시분석] Test-optional 제도 말기의 SAT 준비 방법"
            ],
            "link": "https://blog.naver.com/edusolomon/223317296641",
            "content": [
                "이 Post에서는 Test-optional 제도의 말기에서 SAT를 준비하는 방법에 대해 살펴 보도록 하겠습니다. 한국으로는 중3~고1, 미국으로는 고등학교 9~10학년 학생들에게 Standardized Test에서 성공 가능성을 극대화하기 위해 취해야 할 세 가지 중요한 단계가 있습니다: 1. 자신의 장점에 맞는 를 선택합니다. SAT와 ACT는 비슷하지만 형식과 내용이 다르며..."
            ],
            "category": "COMMUNITY",
            "iconPath": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogpfthumb.phinf.naver.net%2FMjAxOTEyMTZfMjYg%2FMDAxNTc2NDY1ODg2MDk1.UU9tHWZgnjbrOgBzu4ZVhhD6H1pXhX6pP4hFMhpBzmEg.fSOm_WHYTBm4F_eq4rxzNBS8R58pzzqF0N4eqQbkXbgg.JPEG.edusolomon%2Fbg_fff.jpg&type=f54_54",
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "초등영어시험 Primary English Test 공식 론치!"
            ],
            "link": "https://blog.naver.com/britishcouncilkorea/223373992147",
            "content": [
                "The right test at the right time 학생들의 성장에 따라 영어 학습, 지도, 평가 방법 또한 진화해야 합니다. 작년 영국문화원 개원 50주년을 맞아 'Young Learner Test'라는 가칭으로 시범 운영(piloting test)을 진행하며 소규모 그룹에 먼저 선보였고, 2024년에는 'Primary English '라는 정식 명칭과 함께 초등 영어 시장에 새로운 시험을..."
            ],
            "category": "COMMUNITY",
            "iconPath": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogpfthumb.phinf.naver.net%2FMjAyMDAzMjVfMzkg%2FMDAxNTg1MDk2MjcyMDIz.Y__HYJXPsvGo9xBNJ_ItRPCNl8h7fcEndUZS0MLHsA8g.guK42H3wHBcWEvA0eUGzR6Cg5Q87X1EgL8p-dWBwDAQg.PNG.britishcouncilkorea%2FBritish%252BCouncil_Social%252BMedia%252BProfile%252BPictures_Blue.png&type=f54_54",
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "[매경test 합격 후기] 매경테스트 난이도 및 시사용어 공부법"
            ],
            "link": "https://blog.naver.com/fnhelp/223423361925",
            "content": [
                "안녕하세요 여러분, 금융권 및 은행권 취업 준비를 하시는 분들이라면 '매경test' 자격증을 따는 경우가 많은데요. 대기업과 공기업 채용 시 우대는 물론, 대학 졸업 논문 및 시험 대체와 학점은행제의 학점인정, 고교 학교생활기록부 기재 등으로 활용 범위가 넓기 때문입니다. 그래서 오늘은 취업에서 안정적인 합격을 위한 매경 자격증에 대해서 알아보는 시간을..."
            ],
            "category": "COMMUNITY",
            "iconPath": "https://search.pstatic.net/common/?src=https%3A%2F%2Fblogpfthumb-phinf.pstatic.net%2FMjAxOTA2MjBfMjk5%2FMDAxNTYxMDIxNjYwNDk3.iW7cLxHIyA_yf1R2L0Cqg6S1Ps_jYib9Fuj7D7rzemQg.x7AoB7qlaLz3CCJZuUS1e1p2oVoZ0X2oXIRwU8NOKVYg.JPEG.fnhelp%2Fkakao-yellow-profile%252Bimage.jpg&type=f54_54",
            "subTitle": null,
            "isBookmarked": 0
        },
        {
            "title": [
                "MAP Test, 제주 국제학교 입학시험 맵테스트 알아보기!"
            ],
            "link": "https://cafe.naver.com/youhakcamp/772185?art=ZXh0ZXJuYWwtc2VydmljZS1uYXZlci1zZWFyY2gtY2FmZS1wcg.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYWZlVHlwZSI6IkNBRkVfVVJMIiwiY2FmZVVybCI6InlvdWhha2NhbXAiLCJhcnRpY2xlSWQiOjc3MjE4NSwiaXNzdWVkQXQiOjE3MTM5NzMwMTU2MDd9.qSGq15kAZO7kfE-Oy95hI6vdiYP0h7Z-fybkLVaaXqU",
            "content": [
                "오늘은 제주 국제학교 뿐만 아니라 다양한 국내 국제학교가 채택하고 있는 입학시험인 MAP Test, 맵테스트에 대해 알려드릴게요! MAP Test 정보, 구성 MAP Test는 Measures of Academic Progress의 줄임말로, 학업성취도 평가라고 생각하시면 됩니다. 컴퓨터 기반의 적응형 평가이기 때문에 학생들이 고르는 정답과 오답에 따라 실시간으로 문제의 난이도가..."
            ],
            "category": "COMMUNITY",
            "iconPath": "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMTAyMjBfMjAw%2FMDAxNjEzODAyMjcyNjgx.CdwxELQm6KNFlZhP4-SCR6SL96tf6G3lCfGkG_nKbtwg.OEW272Ee-jEi5GRB9bG-VwdMBhnbpx2JvZvUoYneEZcg.PNG%2F%25EC%25B9%25B4%25ED%258E%2598_%25EB%258C%2580%25ED%2591%259C%25EC%259D%25B4%25EB%25AF%25B8%25EC%25A7%2580.png&type=f54_54",
            "subTitle": null,
            "isBookmarked": 0
        }
    ]
]

*/



export default function Contents({ query }: { query: string | null }) {

    const [contents, setcontents] = useState<OrderedSitesRef[]>([]);
    const [addedIdx, setAddedIdx] = useState<number>(-1);
    const navi = useNavigate();

    useEffect(() => {
        async function fetchData() {

            await axiosInstance.get(`/api/search?query=${query}`)
                .then(res => {
                    console.log(res.data.code);
                    console.log(res.data);
                    if (res.data.code > 0) {
                        if (res.data.code === 479) {
                            navi('/mypage?err=site-is-empty');
                        }
                    }
                })
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
        <div className="contentsContainer">
            {contents.map((content, idx) =>
                <div key={idx} className="content">
                    <p className="title" onMouseEnter={() => titleOnMouseEnter(idx + 'thBtn')} onMouseLeave={() => titleOnMouseLeave(idx + 'thBtn')}>
                        {/* {content.title} */}
                        {
                            addedIdx === idx ?
                                <button className="bookmarkBtns">{successImg}</button>
                                :
                                <button id={idx + 'thBtn'} className="bookmarkBtns pointer" style={{ visibility: 'hidden' }}
                                    onClick={content => bookmarBtnOnClick(content, idx)}>
                                    {/* {content.isBookmarked === 1 ? bookmarkedImg : addImg} */}
                                </button>
                        }

                    </p>

                    <p className="text">
                        {/* {content.content} */}
                    </p>

                    <hr />
                </div>
            )}
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