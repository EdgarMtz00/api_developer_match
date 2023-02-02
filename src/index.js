// Create eiMPROVExpress app
const express = require("express");
const cors = require("cors");
const app = express();
const cookieSession = require("cookie-session");
const auth_controller = require("./controllers/auth.controller");
const user_controller = require("./controllers/user.controller");
const authJwt = require("./middleware/auth.middleware");

// Server port
const HTTP_PORT = 8000;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "dev-match-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);


app.post("/api/auth/signup", auth_controller.signup);
app.post("/api/auth/login", auth_controller.login);
app.post("/api/auth/signout", auth_controller.signout);

app.get(
    "/api/user",
    [authJwt.verifyToken],
    user_controller.allUsers
);

app.delete(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    user_controller.deleteUser
);

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

// Root endpoint
app.get("/", (req, res) => {
    res.json({"message":"Ok"})
});
