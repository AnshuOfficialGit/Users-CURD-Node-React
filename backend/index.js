const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
require('./database/database')

const userRoutes = require('./routes/users/users')

app.use(express.json());
app.use(cors());

/* Routes calling */

app.use('/users',userRoutes);

const port = process.env.PORT || 4500;
app.listen(port, (req, res) => {
    console.log(`INFO  Server running on  [http://localhost:${port}]`);
    console.log("\x1b[33m%s\x1b[0m", "Press Ctrl+C to stop the server")
})
