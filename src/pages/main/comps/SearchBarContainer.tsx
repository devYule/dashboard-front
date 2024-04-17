import SeacrhBar from './SearchBar';

export default function SearchBarContainer() {
    // todo type 은 유저정보에서 가져와야 함.
    // 로그인시 요청 데이터에서 스타일 정보를 가져오고 그것을 꺼내서 사용해야함.
    // 지금은 하드코딩 되어 있음.
    return (
        <>
            <SeacrhBar type={2} />
        </>
    );
}