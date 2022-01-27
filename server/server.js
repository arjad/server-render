import express from "express";
import fs from "fs";
import path from "path";

const app = express();

app.use("^/$",(req,res,next)=>{
      fs.readFile(path.resolve('./build/index.html'),'utf-8',(err,data)=>{
          if(err)
          {
              console.log(err);
              return res.send(500).send("some error happned")
          }
          return res.send(data.replace('<div id="root"></div>','<div id="root">${}</div>'))
      })

})