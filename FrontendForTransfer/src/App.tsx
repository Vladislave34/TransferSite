import './App.css'

import {BrowserRouter,  Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/main.tsx";
import AddCountry from "./pages/AddCountry/AddCountry.tsx";
import CountryDetails from "./pages/CountryDetails/CountryDetails.tsx";

import EditCountry from "./pages/EditCountry/EditCountry.tsx";
import AddCity from "./pages/AddCity/AddCity.tsx";
import LogPage from "./pages/LogPage/LogPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import Profile from "./pages/Profile/Profile.tsx";

import Header from "./components/Header/header.tsx";

import AdminPage from "./pages/AdminPage/AdminPage.tsx";

function App() {




    return (
        <div className="h-screen w-screen bg-[#F6ECFA]">


            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/Home" element={<Main />} />
                    <Route path="/Country/:id" element={<CountryDetails />} />
                    <Route path="/EditCountry/:id" element={<EditCountry  />} />
                    <Route path="/AddCountry" element={<AddCountry />} />
                    <Route path="/AddCity" element={<AddCity />} />
                    <Route path="/Log" element={<LogPage />} />
                    <Route path="/Register" element={<RegisterPage />} />
                    <Route path="/Login" element={<LoginPage />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/AdminPage" element={<AdminPage />} />
                    <Route path="*" element={<Navigate to="/Home" replace />}  />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App