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

app.use(cors());
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
app.post("/api/auth/signin", auth_controller.signin);
app.post("/api/auth/signout", auth_controller.signout);

app.get("/api/user", user_controller.allUsers);

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
