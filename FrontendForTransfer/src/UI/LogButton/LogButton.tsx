import {GoogleLogin} from "@react-oauth/google";
import {googleApi} from "../../services/GoogleAuthServise/GoogleAuthServise.ts";

const LogButton = () => {
    const[ login ] = googleApi.useLoginMutation();
    return (
        <div>
            <GoogleLogin onSuccess={(credentialResponse)=>{
                login({credential: credentialResponse.credential})


            }}
                         onError={()=> console.log("fail")} />
        </div>
    );
};

export default LogButton;