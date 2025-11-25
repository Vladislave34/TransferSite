import './App.css'

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main/main.tsx";
import AddCountry from "./pages/AddCountry/AddCountry.tsx";
import CountryDetails from "./pages/CountryDetails/CountryDetails.tsx";

import EditCountry from "./pages/EditCountry/EditCountry.tsx";

function App() {



    return (
        <div className="h-screen w-screen bg-[#F6ECFA]">
            <BrowserRouter>
                <Routes>
                    <Route path="/Home" element={<Main />} />
                    <Route path="/Country/:id" element={<CountryDetails />} />
                    <Route path="/EditCountry/:id" element={<EditCountry  />} />
                    <Route path="/AddCountry" element={<AddCountry />} />
                    <Route path="*" element={<Navigate to="/Home" replace />}  />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App