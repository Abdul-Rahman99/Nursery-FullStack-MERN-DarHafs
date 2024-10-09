// const userRoute = require("./routes/usersRoute");
// const authRoute = require("./routes/authRoute");

const studentRoute = require("./studentRoute");
const teacherRoute = require("./teacherRoute");

const mountRoutes = (app) => {
  // app.use("/api/v1/users", userRoute);
  // app.use("/api/v1/auth", authRoute) ;
  app.use("/api/v1/teacher", teacherRoute);
  app.use("/api/v1/student", studentRoute);
};

module.exports = mountRoutes;
