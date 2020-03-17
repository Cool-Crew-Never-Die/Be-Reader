import React from "react";
import { Link } from "react-router-dom";

const AuthMenu = () => {
  return (
    <div className="right">
      <ul>
        <li>
          <Link to="/login" className="brand-logo center">
            <i className="link-Login">로그인</i>
          </Link>
        </li>
        <li>
          <Link to="/signup" className="brand-logo center">
            <i className="link-SignUp">회원가입</i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthMenu;
