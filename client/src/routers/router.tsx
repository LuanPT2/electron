import { BrowserRouter ,Routes, Route, Link } from 'react-router-dom';
import Login from "pages/Authorization/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;