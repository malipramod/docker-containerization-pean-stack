let express = require('express');
var cors = require('cors');

//Variable Intialization
let app = express();
let port = process.env.PORT | 3000;

//Middleware functions
app.use(express.json());
app.use(cors());

//Setting home page
app.get('/', (req, res) =>
    res.status(200).send("welcome")
);

//Setting API Path
app.use('/api/dataService',require('./api/routes/controllers/data.controller'));
app.use('/api/fileService',require('./api/routes/controllers/file.controller'));

app.listen(port, () => {
    console.log(`API is listening to port ${port}`);
});