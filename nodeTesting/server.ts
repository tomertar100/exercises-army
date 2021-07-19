const path = require('path');
const fs = require('fs');
const express = require('express');
const storageArray = require('./storage');

const app = express();


//parses body of the request
app.use(express.json())

const arrayRouter = express.Router();
app.use('/array',arrayRouter);

arrayRouter.get('/',(req,res)=>{
    
    res.json({  
        array : storageArray
    })
})

function isIndexInArray(index,array){
    if(typeof array[index] === 'undefined'){
        return -1
    }
    else{
        return index;
    }
}

arrayRouter.get('/:index',(req,res)=>{
    const arrayIndex = isIndexInArray(req.params.index,storageArray);
    if(arrayIndex !== -1){
        const itemInIndex = storageArray[arrayIndex]
        res.json({
            itemInIndex: itemInIndex
        })

    }
    else{
        res.status(400).json({
            index: "invalid index"
        })
    }
    
})

arrayRouter.post('/',(req,res)=>{
    const value = req.body.value;
    if(typeof value === 'number' || typeof value === 'string'){
    storageArray.push(value)
    res.json({
        array: storageArray
    })
    }
    else{
        res.status(400).json({
            value: "invalid value entered"
        })  
    }
})


app.listen(3000,()=>{
    console.log('listening at port 3000')
})