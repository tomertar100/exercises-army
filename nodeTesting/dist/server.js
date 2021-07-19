const path = require('path');
const fs = require('fs');
const express = require('express');
const storageArray = require('./storage');
const app = express();
const arrayRouter = express.Router();
app.use('/array', arrayRouter);
arrayRouter.get('/', (req, res) => {
    res.json({
        array: storageArray
    });
});
app.listen(3000, () => {
    console.log('listening at port 3000');
});
//# sourceMappingURL=server.js.map