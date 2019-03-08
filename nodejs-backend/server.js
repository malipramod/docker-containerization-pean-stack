let express = require('express');

//Variable Intialization
let app = express();
let port = process.env.PORT | 3000;

//Middleware functions
app.use(express.json());

//Setting home page
app.get('/', (req, res) =>
    res.status(200).send("welcome")
);

//Setting API Path
app.use('/api/dataService',require('./api/routes/controllers/data.controller'));

app.listen(port, () => {
    console.log(`API is listening to port ${port}`);
});