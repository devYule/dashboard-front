import { Navigate, Route, Routes } from "react-router-dom";
import LoginContainer from "./pages/login/LoginContainer";
import SketchBook from "./SketchBook";
import MainContainer from "./pages/main/MainContainer";
import MypageConatiner from "./pages/mypage/mypageAndSearch/MypageContainer";
import '../src/pages/main/style/main.scss';
import '../src/pages/mypage/styles/mypage.scss';
import './pbl/animator.scss';
import '../src/pages/search/styles/search.scss';
import SearchContainer from "./pages/search/SearchContainer";
import { useState } from "react";

const App = () => {
  console.log('App -> Render!!!');
  const [isLogin, setIsLogin] = useState(false);
  const at = localStorage.getItem('at');
  if (!localStorage.getItem('at')) {
    localStorage.removeItem('at');
  }

  if (at && !isLogin) {
    setIsLogin(true);
  }
  if (!at && isLogin) {
    setIsLogin(false);
  }



  return (
    <Routes>

      {!isLogin ?
        <>
          <Route path="/" element={<LoginContainer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
        :
        <>
          <Route path="/main" element={<MainContainer />} />
          <Route path="/mypage" element={<MypageConatiner />} />
          <Route path="/search" element={<SearchContainer />} />
          <Route path="*" element={<Navigate to="/main" />} />
        </>
      }
      {/* for test */}
      <Route path="/test" element={<SketchBook />} />

    </Routes>
  );
}

export default App;