import { Route, Routes } from "react-router-dom";
import LoginContainer from "./pages/login/LoginContainer";
import SketchBook from "./SketchBook";
import MainContainer from "./pages/main/MainContainer";
import MypageConatiner from "./pages/mypage/mypageAndSearch/MypageContainer";
import '../src/pages/main/style/main.scss';
import '../src/pages/mypage/styles/mypage.scss';
import './pbl/animator.scss';
import '../src/pages/search/styles/search.scss';
import SearchContainer from "./pages/search/SearchContainer";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/main" element={<MainContainer />} />
      <Route path="/mypage" element={<MypageConatiner />} />
      <Route path="/search" element={<SearchContainer />} />

      {/* for test */}
      <Route path="/test" element={<SketchBook />} />

    </Routes>
  );
}

export default App;