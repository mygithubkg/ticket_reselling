import Footer from "../Components/Footer";
import LoginPage from "../Components/Loginpage";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import RegisterPage from "../Components/Registerpage";

function SignIn(){
    return (
        <div>
            <LoginPage />
            <Footer />
        </div>
    );
}

export default SignIn;