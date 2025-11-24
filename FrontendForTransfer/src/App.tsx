import './App.css'
import MainComponent from "./components/MainComponent/mainComponent.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/main.tsx";
import AddCountry from "./pages/AddCountry/AddCountry.tsx";

function App() {



    return (
        <div className="h-screen w-screen bg-[#F6ECFA]">
            <BrowserRouter>
                <Routes>
                    <Route path="/Home" element={<Main />} />
                    {/*<Route path="/Coin/:Id" element={<CoinPage />} />*/}
                    <Route path="/AddCountry" element={<AddCountry />} />
                    <Route path="*" element={<Navigate to="/Home" replace />}  />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App