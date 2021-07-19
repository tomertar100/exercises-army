var path = require('path');
var fs = require('fs');
var express = require('express');
var storageArray = require('./storage');
var app = express();
//parses body of the request
app.use(express.json());
var arrayRouter = express.Router();
app.use('/array', arrayRouter);
arrayRouter.get('/', function (req, res) {
    res.json({
        array: storageArray
    });
});
function isIndexInArray(index, array) {
    if (typeof array[index] === 'undefined') {
        return -1;
    }
    else {
        return index;
    }
}
arrayRouter.get('/:index', function (req, res) {
    var arrayIndex = isIndexInArray(req.params.index, storageArray);
    if (arrayIndex !== -1) {
        var itemInIndex = storageArray[arrayIndex];
        res.json({
            itemInIndex: itemInIndex
        });
    }
    else {
        res.status(400).json({
            index: "invalid index"
        });
    }
});
arrayRouter.post('/', function (req, res) {
    var value = req.body.value;
    if (typeof value === 'number' || typeof value === 'string') {
        storageArray.push(value);
        res.json({
            array: storageArray
        });
    }
    else {
        res.status(400).json({
            value: "invalid value entered"
        });
    }
});
app.listen(3000, function () {
    console.log('listening at port 3000');
});
