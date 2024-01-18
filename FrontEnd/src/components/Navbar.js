import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg rounded navbar-dark m-1 "
        style={{ backgroundColor: "#00BFA5" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <strong>دار حفص</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/student"
                >
                  الطلاب
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/teacher"
                >
                  المدرسين
                </Link>
              </li>
              {/* Uncomment and modify the links below as needed */}
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/accounts"
                >
                  الحسابات
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/absence"
                >
                  الغياب
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
