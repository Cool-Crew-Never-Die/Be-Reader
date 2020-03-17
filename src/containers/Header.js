import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AuthMenu } from "../components";

const Header = withRouter(({ location }) => {
  let re = /(login|signup)/;
  let isAuth = re.test(location.pathname);

  return (
    <div>
      <nav>
        <div className="nav-wrapper blue darken-1">
          <Link to="/" className="brand-logo center">
            :Be Reader
          </Link>

          {/* <ul>
            <li>
              <a>
                <i className="material-icons">search</i>
              </a>
            </li>
          </ul> */}

          {isAuth ? undefined : <AuthMenu />}
        </div>
      </nav>
    </div>
  );
});

export default Header;
