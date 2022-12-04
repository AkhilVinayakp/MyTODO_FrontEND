import "./App.css"
import Main from "./components/Main";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const App = ()=>{
    return(
        <>
            <Router>
            <ul className="menu menu-horizontal bg-base-100 rounded-box">
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>

                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/dashboard" element={<Main></Main>}></Route>
                </Routes>
            </Router>
            
        </>
    )
}

export default App;