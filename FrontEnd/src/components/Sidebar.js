import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <ul className="list-group">
        <li>
          <Link className="list-group-item-action active" to={"/student"}>
            {" "}
           الطلاب
          </Link>
        </li>
        <br></br>
        <li>
          <Link className="list-group-item-action active" to={"/teachers"}>
            {" "}
            المدرسين
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Sidebar;
