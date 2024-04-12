import { Route, Routes } from "react-router-dom";
import LoginContainer from "./pages/login/LoginContainer";
import Main from "./pages/main/MainContainer";
import SidebarHoverBtn from "./pages/main/sidebar/pbl/SidebarHoverBtn";
import SidebarClickBtn from "./pages/main/sidebar/pbl/SidebarClickBtn";
import SidebarExtendedBtn from "./pages/main/sidebar/pbl/SidebarExtendedBtn";
import SidebarRight from "./pages/main/sidebar/right/SidebarRight";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/main" element={<Main />} />

      {/* for test */}
      <Route path="/test" element={<SidebarHoverBtn />} />
      <Route path="/test2" element={<SidebarClickBtn />} />
      <Route path="/test3" element={<SidebarExtendedBtn />} />
      <Route path="/test4" element={<SidebarRight />} />
      
    </Routes>
  );
}

export default App;