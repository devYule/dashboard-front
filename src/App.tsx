import { Route, Routes } from "react-router-dom";
import LoginContainer from "./pages/login/LoginContainer";
import Main from "./pages/main/Main";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;