const express = require("express")
const port = 5000;
const app = express();
const connection = require("./expressapp/db/connection");
const cors = require("cors");
connection();

app.use(cors({
    origin: ["http://localhost:3000", "https://carsdotin.onrender.com"]
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.send("server is running....")
})

app.use(require("./expressapp/Routes/createUser"))
app.use(require("./expressapp/Routes/displayData"))
app.use(require("./expressapp/Routes/login"))

app.listen(port, () => {
    console.log("server is running...")
})