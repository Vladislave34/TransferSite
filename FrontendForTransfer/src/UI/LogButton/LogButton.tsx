import { useGoogleLogin} from "@react-oauth/google";
import {googleApi} from "../../services/GoogleAuthServise/GoogleAuthServise.ts";

import {useAppDispatch} from "../../hooks/redux.ts";
import {loginSuccess} from "../../store/reducers/authSlice.ts";
import {useNavigate} from "react-router-dom";



const LogButton = () => {
    const[ login ] = googleApi.useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) =>
        {
            console.log("tokenResponse", tokenResponse.access_token);
            try {
                const response = await login(tokenResponse.access_token).unwrap();

                const {token} = response;

                dispatch(loginSuccess(token));
                navigate("/");
            } catch (error) {
                console.error("Google логін не вдалий:", error);
            }
        },
    });
    return (
        <div>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    loginUseGoogle();
                }}
                className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
            >
                {'LoginGoogle'}
            </button>
        </div>
    );
};

export default LogButton;