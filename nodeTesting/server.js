var express = require('express');
var storageArray = require('./storage');
var _a = require('./logics'), isIndexInArray = _a.isIndexInArray, checkCorrectType = _a.checkCorrectType;
var jwt = require('jsonwebtoken');
var app = express();
var arrayRouter = express.Router();
app.use('/array', arrayRouter);
//parses body of the request
app.use(express.json());
app.get('/api', function (req, res) {
    res.json({
        text: "just my api"
    });
});
arrayRouter.get('/', function (req, res) {
    res.json({
        array: storageArray
    });
});
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
    if (checkCorrectType(value)) {
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
arrayRouter.put('/:index', function (req, res) {
    var value = req.body.value;
    var arrayIndex = isIndexInArray(req.params.index, storageArray);
    if (arrayIndex !== -1 && checkCorrectType(value)) {
        storageArray[arrayIndex] = value;
        res.json({
            array: storageArray
        });
    }
    else {
        res.status(404).json({
            index: "invalid index"
        });
    }
});
arrayRouter["delete"]('/', function (req, res) {
    storageArray.pop();
    res.json({
        array: storageArray
    });
});
arrayRouter["delete"]('/:index', function (req, res) {
    var arrayIndex = isIndexInArray(req.params.index, storageArray);
    if (arrayIndex !== -1) {
        storageArray.splice(arrayIndex, 1);
        res.json({
            array: storageArray
        });
    }
    else {
        res.status(400).json({
            index: "invalid index"
        });
    }
});
app.listen(3000, function () {
    console.log('listening at port 3000');
});
