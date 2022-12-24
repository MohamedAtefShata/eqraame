import React ,{useState} from "react";
import { Button } from "./Button";
import { Button1 } from "./Button1";
import "./Styles/Log_in.css";
import { Link  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

function Log_in() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          navigate("/prof");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="login-container">
        <form id="form" onSubmit={handleSubmit}>
          <h5 className="login-heading">log in to your eqraame account</h5>
          <div className="login-btn">
            <Button
              className="btns"
              buttonStyle="btn--outline--scr"
              buttonSize="btn--large"
              buttonTrans="btn--scr"
            >
              {/* <img className='googl-icon' src='./icons/google-icon.png' alt=''/> */}
              continue with google
            </Button>
            <Button
              className="btns"
              buttonStyle="btn--outline--scr"
              buttonSize="btn--large"
              buttonTrans="btn--scr"
            >
              continue with facebook
            </Button>
          </div>
          <div className="input-container">
            <div className="input-field">
              <input type="text" required="required" onChange={e => setEmail(e.target.value)} />
              <span>email</span>
            </div>
            <div className="input-field">
              <input type="password" required="required" onChange={e => setPassword(e.target.value)} />
              <span>password</span>
            </div>
          </div>
          <div className="log-btn">
            <Button1
              type="submit"
              className="btns"
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
            >
              log in
            </Button1>
            <h5>
              Don't have an account?
              <Link to="/signup"> Sign up</Link>
            </h5>
          </div>
        </form>
      </div>
    </>
  );
}
export default Log_in;