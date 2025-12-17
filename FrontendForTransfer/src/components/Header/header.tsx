import {type FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/reducers/authSlice";
import API_ENV from "../../env";



import {
    CgProfile
} from "react-icons/cg";
import {
    FiLogOut,
    FiPlusCircle
} from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";
import {ThemeToggleButton} from "../../admin/components/common/ThemeToggleButton.tsx";
import NotificationDropdown from "../../admin/components/header/NotificationDropdown.tsx";

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((s) => s.authReducer.user);


    const [isUserOpen, setUserOpen] = useState(false);

    const isAdmin =
        user?.role &&
        (
            (Array.isArray(user.role) && user.role.includes("Admin")) ||
            user.role === "Admin"
        );

    const handleLogout = () => {
        dispatch(logout());
        setUserOpen(false);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">
                {/* Left */}
                <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            🌍 Countries App
          </span>
                </Link>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <ThemeToggleButton />
                    <NotificationDropdown />

                    {/* User */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserOpen(!isUserOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <img
                                    src={`${API_ENV.API_BASE_URL}/images/${user.image}`}
                                    alt={user.name}
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                                <span className="hidden text-sm font-medium text-gray-700 lg:block dark:text-gray-300">
                  {user.name}
                </span>
                            </button>

                            {/* Dropdown */}
                            {isUserOpen && (
                                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
                                    <MenuItem
                                        icon={<CgProfile size={18} />}
                                        text="Profile"
                                        onClick={() => navigate("/Profile")}
                                    />

                                    {isAdmin && (
                                        <>
                                            <MenuItem
                                                icon={<RiUserSettingsLine size={18} />}
                                                text="Admin Panel"
                                                onClick={() => navigate("/admin")}
                                            />
                                            <MenuItem
                                                icon={<FiPlusCircle size={18} />}
                                                text="Add City"
                                                onClick={() => navigate("/AddCity")}
                                            />
                                            <MenuItem
                                                icon={<FiPlusCircle size={18} />}
                                                text="Add Country"
                                                onClick={() => navigate("/AddCountry")}
                                            />
                                            <Divider />
                                        </>
                                    )}

                                    <MenuItem
                                        icon={<FiLogOut size={18} />}
                                        text="Logout"
                                        onClick={handleLogout}
                                        danger
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/Login"
                                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Login
                            </Link>
                            <Link
                                to="/Register"
                                className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

/* ------------------------------------------------------------------ */
/* Components */

const MenuItem = ({
                      icon,
                      text,
                      onClick,
                      danger,
                  }: {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
    danger?: boolean;
}) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition
      ${danger
            ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}
    `}
    >
        {icon}
        {text}
    </button>
);

const Divider = () => (
    <div className="h-px bg-gray-200 dark:bg-gray-800" />
);