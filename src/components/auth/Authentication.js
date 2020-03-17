import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Authentication extends Component {
  render() {
    const inputBoxes = (
      <div>
        <div>
          <label>이메일</label>
          <input name="username" type="text" className="validate" />
        </div>
        <div>
          <label>비밀번호</label>
          <input name="password" type="password" className="validate" />
        </div>
      </div>
    );

    const selectMenu = (
      <div className="footer">
        <div className="row">
          <div className="right">
            {this.props.mode ? (
              <Link to="/signup">회원가입</Link>
            ) : (
              <Link to="/login">로그인</Link>
            )}
            <Link to="/">메인</Link>
          </div>
        </div>
      </div>
    );

    const loginView = (
      <div>
        {inputBoxes}
        <div>SUBMIT</div>
        {selectMenu}
      </div>
    );

    const signUpView = (
      <div>
        {inputBoxes}
        <div>
          <label>비밀번호 확인</label>
          <input name="password" type="password" className="validate" />
        </div>
        <div>CREATE</div>
        {selectMenu}
      </div>
    );

    return (
      <div>
        <div>{this.props.mode ? "LOGIN" : "SIGNUP"}</div>
        {this.props.mode ? loginView : signUpView}
      </div>
    );
  }
}

Authentication.propTypes = {
  mode: PropTypes.bool,
  onLogin: PropTypes.func,
  onSignUp: PropTypes.func
};

Authentication.defaultProps = {
  mode: true,
  onLogin: (id, pw) => {
    console.error("login function not defined");
  },
  onSignUp: (id, pw) => {
    console.error("signUp function not defined");
  }
};

export default Authentication;
