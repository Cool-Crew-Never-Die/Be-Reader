import express from "express";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";

/* setup routers & static directory */
import api from "./routes";

const app = express();
const port = 3000;

app.use("/", express.static(path.join(__dirname, "./../public")));

app.get("/hello", (req, res) => {
  return res.send("Hello CodeLab");
});

app.listen(port, () => {
  console.log("Express is listening on port", port);
});

app.use("/api", api);

/* mongodb connection */
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("Connected to mongodb server");
});

// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect("mongodb://localhost/BeReader");

/* use session */
app.use(
  session({
    secret: "CodeLab1$1$234",
    resave: false,
    saveUninitialized: true
  })
);

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

/* ... 코드 생략 ... */
app.use("/api", api);
/* ... 주의: API 하단부에 작성하세요 ... */

/* support client-side routing */
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../public/index.html"));
});
