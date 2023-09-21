const express = require('express');
const router = require('./router');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router);

app.listen(4000, () => {
    console.log("server running at post 4000")
})