const express = require("express");
const app = express();
app.use(express.static('public'));
const appController = require("./controllers/appController");
const connectDB = require("./config/db");
connectDB();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));



app.get("/", appController.login_page);
app.post("/", appController.login_post);
app.post("/billing/form", appController.billingform_post);
app.post("/billing/form/submit", appController.billingformsubmit_post);


app.get("/login/:page/:count", appController.page_loader_get)

app.post("/login/:page/:count", appController.page_loader_post)
app.post("/invalid/login/:page/:count", appController.invalidpage_loader_post)

app.get("/test", appController.test_page)


port = 8080;
app.listen(port, console.log(`App Running on http://localhost:${port}`));
