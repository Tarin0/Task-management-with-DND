import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {

    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // console.log("google login");
        googleLogin()
            .then(res => {
                // console.log(res)
                navigate('/')
            })
            .catch(err => {console.log(err)})
           
    }

    return (
        <div>
            <div className="divider">continue with</div>
            <div className="">
                <button onClick={handleGoogleLogin} className="btn bg-blue-200 flex mx-auto mb-5">Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;
