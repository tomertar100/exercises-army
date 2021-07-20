"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = express_1.default();
const arrayRouter = express_1.default.Router();
app.use('/array', arrayRouter);
//parses body of the request
app.use(express_1.default.json());
app.get('/api', (req, res) => {
    res.json({
        text: "just my api"
    });
});
//authing user
app.post('/api/login', (req, res) => {
    const user = { id: 3 };
    const token = jsonwebtoken_1.default.sign({ user }, 'secret_key');
    res.json({
        token: token
    });
});
app.get('/api/protected', (req, res) => {
    res.json({
        text: "this is protected"
    });
});
// function ensureToken(req, res,next) {
//     const bearerHeader = req.headers["authorization"]
//     if(typeof bearerHeader !== undefined){
//         const bearer = bearerHeader.split(" ")
//         const bearerToken = bearer[1]
//         req.token = bearerToken
//     }
//     else{
//         res.sendStatus(403)
//     }
// arrayRouter.get('/',(req,res)=>{
//     res.json({  
//         array : storageArray
//     })
// })
// arrayRouter.get('/:index',(req,res)=>{
//     const arrayIndex = isIndexInArray(req.params.index,storageArray);
//     if(arrayIndex !== -1){
//         const itemInIndex = storageArray[arrayIndex]
//         res.json({
//             itemInIndex: itemInIndex
//         })
//     }
//     else{
//         res.status(400).json({
//             index: "invalid index"
//         })
//     }
// })
// arrayRouter.post('/',(req,res)=>{
//     const value = req.body.value;
//     if(checkCorrectType(value)){
//     storageArray.push(value)
//     res.json({
//         array: storageArray
//     })
//     }
//     else{
//         res.status(400).json({
//             value: "invalid value entered"
//         })  
//     }
// })
// arrayRouter.put('/:index',(req,res)=>{
//     const value = req.body.value;
//     const arrayIndex = isIndexInArray(req.params.index,storageArray);
//     if(arrayIndex !== -1 && checkCorrectType(value)){
//         storageArray[arrayIndex] = value;
//         res.json({
//             array: storageArray
//         })
//     }
//     else{
//         res.status(404).json({
//             index: "invalid index"
//         })
//     }
// })
// arrayRouter.delete('/',(req,res)=>{
//     storageArray.pop()
//     res.json({
//         array: storageArray
//     })
// })
// arrayRouter.delete('/:index',(req,res)=>{
//     const arrayIndex = isIndexInArray(req.params.index,storageArray)
//     if(arrayIndex !== -1){
//         storageArray.splice(arrayIndex,1);
//         res.json({
//             array: storageArray
//         })
//     }
//     else{
//         res.status(400).json({
//             index: "invalid index"
//         })
//     }
// })
app.listen(3000, () => {
    console.log('listening at port 3000');
});
//# sourceMappingURL=server.js.map