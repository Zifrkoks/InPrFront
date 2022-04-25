import Header from "./components/Header";
import {Col, Container, Row} from "react-bootstrap";
import { Router, Routes ,Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage.jsx";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";



function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route exact path="/" element={<MainPage/>}/>
                <Route exact path="/Auth" element={<AuthPage/>}/>
                <Route exact path="/Articles" element={<ArticlesListPage/>}/>
                <Route exact path="/Article/:id" element={<ArticlePage/>}/>
                <Route exact path="/Admin" element={<AdminPage/>}/>
                <Route exact path="/User" element={<UserPage/>}/>
            </Routes>
        </div>
    )
}

export default App;