import type { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import API_ENV from "../../env";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/reducers/authSlice";
import { CgProfile } from "react-icons/cg";
import {RiUserSettingsLine} from "react-icons/ri";
import {FaPlus} from "react-icons/fa";
import {FiLogOut, FiPlusCircle} from "react-icons/fi";
const Header: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.authReducer.user);

    const [open, setOpen] = useState(false);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `
    px-4 py-2
    rounded-xl
    font-medium
    shadow-md
    transition-all duration-300
    ${
            isActive
                ? "bg-[#BDE0FE] text-gray-900"
                : "bg-white/40 hover:bg-white/60 text-gray-900"
        }
  `;

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
        navigate("/");
    };



    // Чи користувач є Admin
    // safe check
    const isAdmin =
        user?.role &&
        (
            (Array.isArray(user.role) && user.role.includes("Admin")) ||
            (typeof user.role === "string" && user.role === "Admin")
        );

    return (
        <header
            className="
        w-full mb-8
        rounded-3xl shadow-lg
        bg-gradient-to-r
        from-[#CDB4DB] via-[#FFC8DD] to-[#A2D2FF]
        border border-white/20
        px-6 py-4
        flex items-center justify-between
      "
        >
            {/* Left */}
            <div className="cursor-pointer" onClick={() => navigate("/")}>
                <h1 className="text-2xl font-bold text-gray-900 drop-shadow">
                    🌍 Countries App
                </h1>
                <p className="text-xs uppercase tracking-wide opacity-80">
                    Explore the world
                </p>
            </div>

            {/* Center */}
            <nav className="flex gap-3">
                <NavLink to="/" className={linkClass}>
                    Home
                </NavLink>
            </nav>

            {/* Right */}
            <div className="relative">
                {user ? (
                    <>
                        {/* User button */}
                        <div
                            className="
                flex items-center gap-3
                cursor-pointer
                px-3 py-2
                rounded-2xl
                bg-white/40 hover:bg-white/60
                transition-all duration-300
                shadow-md
              "
                            onClick={() => setOpen(prev => !prev)}
                        >
                            <img
                                src={`${API_ENV.API_BASE_URL}/images/${user.image}`}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover border border-white/50"
                            />
                            <p className="text-sm font-semibold text-gray-900">
                                {user.name}
                            </p>
                        </div>

                        {/* Dropdown */}
                        {open && (
                            <div
                                className="
                  absolute right-0 mt-3
                  w-56
                  rounded-2xl
                  shadow-xl
                  bg-gradient-to-b
                  from-[#CDB4DB]
                  via-[#FFC8DD]
                  to-[#A2D2FF]
                  border border-white/30
                  overflow-hidden
                  z-50
                "
                            >
                                <div className="flex flex-row items-center gap-2 hover:bg-white/30 transition">
                                    <CgProfile size={24} className="ml-4" />

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpen(false);
                                            navigate("/Profile");
                                        }}
                                        className="text-left px-4 py-3 font-medium "
                                    >
                                        Profile
                                    </button>
                                </div>

                                {/* Пункти для Admin */}
                                {isAdmin && (
                                    <>
                                        <div className="flex flex-row items-center gap-2 hover:bg-white/30 transition">

                                            <RiUserSettingsLine  size={24} className="ml-4" />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpen(false);
                                                    navigate("/AdminPage");
                                                }}
                                                className="text-left px-4 py-3 font-medium "
                                            >
                                                Admin Page
                                            </button>
                                        </div>
                                        <div className="flex flex-row items-center gap-2 hover:bg-white/30 transition">

                                            <FiPlusCircle  size={24} className="ml-4" />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpen(false);
                                                    navigate("/AddCity");
                                                }}
                                                className="text-left px-4 py-3 font-medium "
                                            >
                                                Add City
                                            </button>
                                        </div>



                                        <div className="flex flex-row items-center gap-2 hover:bg-white/30 transition">

                                            <FiPlusCircle  size={24} className="ml-4" />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpen(false);
                                                    navigate("/AddCountry");
                                                }}
                                                className="text-left px-4 py-3 font-medium "
                                            >
                                                Add Country
                                            </button>
                                        </div>

                                        <div className="h-px bg-white/40 " />
                                    </>
                                )}

                                {/* Logout для всіх */}
                                <div className="flex flex-row items-center gap-2 hover:bg-white/30 transition">

                                    <FiLogOut  size={24} className="ml-4" />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLogout()
                                        }}
                                        className="text-left px-4 py-3 font-medium "
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex gap-3">
                        <NavLink to="/Login" className={linkClass}>
                            Login
                        </NavLink>
                        <NavLink to="/Register" className={linkClass}>
                            Register
                        </NavLink>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;