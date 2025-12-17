import './App.css'

import {BrowserRouter,   Route, Routes} from "react-router-dom";
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
import {Outlet} from "react-router";
import UserProfiles from "./admin/pages/UserProfiles.tsx";
import BasicTables from "./admin/pages/Tables/BasicTables.tsx";
import Alerts from "./admin/pages/UiElements/Alerts.tsx";
import Images from "./admin/pages/UiElements/Images.tsx";
import Buttons from "./admin/pages/UiElements/Buttons.tsx";
import Badges from "./admin/pages/UiElements/Badges.tsx";
import Avatars from "./admin/pages/UiElements/Avatars.tsx";
import Videos from "./admin/pages/UiElements/Videos.tsx";
import LineChart from "./admin/pages/Charts/LineChart.tsx";
import BarChart from "./admin/pages/Charts/BarChart.tsx";

import FormElements from "./admin/pages/Forms/FormElements.tsx";
import Blank from "./admin/pages/Blank.tsx";
import Calendar from "./admin/pages/Calendar.tsx";
import AppLayout from "./admin/layout/AppLayout.tsx";
import Home from "./admin/pages/Dashboard/Home.tsx";
import SignIn from "./admin/pages/AuthPages/SignIn.tsx";
import SignUp from "./admin/pages/AuthPages/SignUp.tsx";
import NotFound from "./admin/pages/OtherPage/NotFound.tsx";


const MainLayout = ()=>{
    return(
        <div className="h-screen w-screen bg-[#F6ECFA]">
            <Header />
            <Outlet />
        </div>
    )
}


function App() {




    return (



            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Main />} />
                        <Route path="Country/:id" element={<CountryDetails />} />
                        <Route path="EditCountry/:id" element={<EditCountry  />} />
                        <Route path="AddCountry" element={<AddCountry />} />
                        <Route path="AddCity" element={<AddCity />} />
                        <Route path="Log" element={<LogPage />} />
                        <Route path="Register" element={<RegisterPage />} />
                        <Route path="Login" element={<LoginPage />} />
                        <Route path="Profile" element={<Profile />} />
                        <Route path="AdminPage" element={<AdminPage />} />

                    </Route>
                    <Route path={"/admin"} element={<AppLayout />}>
                        <Route index  element={<Home />} />

                        {/* Others Page */}
                        <Route path="profile" element={<UserProfiles />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="blank" element={<Blank />} />

                        {/* Forms */}
                        <Route path="form-elements" element={<FormElements />} />

                        {/* Tables */}
                        <Route path="basic-tables" element={<BasicTables />} />

                        {/* Ui Elements */}
                        <Route path="alerts" element={<Alerts />} />
                        <Route path="avatars" element={<Avatars />} />
                        <Route path="badge" element={<Badges />} />
                        <Route path="buttons" element={<Buttons />} />
                        <Route path="images" element={<Images />} />
                        <Route path="videos" element={<Videos />} />

                        {/* Charts */}
                        <Route path="line-chart" element={<LineChart />} />
                        <Route path="bar-chart" element={<BarChart />} />
                    </Route>
                    {/* Auth Layout */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>

    )
}

export default App