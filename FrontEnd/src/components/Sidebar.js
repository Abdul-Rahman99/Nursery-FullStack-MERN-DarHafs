// Sidebar.jsx
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div
        className="p-3 rounded text-light position-fixed m-1 p-3"
        style={{
          height: "100%",
          width: "17%",
          backgroundColor: "#00BFA5",
          fontSize: "auto",
        }}
      >
        <h3 className="mb-4 text-dark">القائمة</h3>
        <ul className="list">
          <li>
            <Link className="text-dark list-group-item-action active" to={"/"}>
              <i className="bi bi-house-door"></i> الصفحة الرئيسية
            </Link>
          </li>
          <br />
          <li>
            <Link
              className="text-dark list-group-item-action active"
              to={"/student"}
            >
              <i className="bi bi-person"></i> الطلاب
            </Link>
          </li>
          <br />
          <li>
            <Link
              className="text-dark list-group-item-action active"
              to={"/teacher"}
            >
              <i className="bi bi-person"></i> المعلمين
            </Link>
          </li>
          <br />
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
