import { Route, Routes } from "react-router-dom"
import MainPage from '../pages/MainPage';
import SinglePage from "../pages/SinglePage";

import './app.css';

function App() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/:id" element={<SinglePage />} />
    </Routes>

  );
}

export default App;
