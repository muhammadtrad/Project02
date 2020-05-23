
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const bodyParser = require('body-parser');
const User = require('./models/User');
const path = require('path');

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.get("/", (req, res) => {

//     const user = new User({
//         handle: "jim",
//         email: "jim@jim.jim",
//         password: "jimisgreat123"
//     });
//     user.save();

//     res.send("Hello World")
// }
// );

app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
