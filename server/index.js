const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const mc = require(`${__dirname}/controllers/messages_controller`);
const createInitialSession = require(`${__dirname}/middlewares/session`);
const filter = require(`${__dirname}/middlewares/filter`);

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 7 * 1000
        }
    })
);
app.use(createInitialSession);
app.use((req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
        filter(req, res, next);
    }
    next();
});

const messagesBaseUrl = "/api/messages";
app.post(messagesBaseUrl, mc.create);
app.get(messagesBaseUrl, mc.read);
app.put(`${messagesBaseUrl}`, mc.update);
app.delete(`${messagesBaseUrl}`, mc.delete);

app.get(`${messagesBaseUrl}/history`, mc.history);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
