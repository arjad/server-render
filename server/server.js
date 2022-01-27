import express from "express";
import fs from "fs";
import path from "path";
import Rect from "react";
import ReactDomServer from "react-dom/server";
import App from "../src/App";

const app = express();

app.use("^/$",(req,res,next)=>{
      fs.readFile(path.resolve('./build/index.html'),'utf-8',(err,data)=>{
          if(err)
          {
              console.log(err);
              return res.send(500).send("some error happned")
          }
          return res.send(
              data.replace('<div id="root"></div>',
                            `<div id="root">${ReactDomServer.renderToString(<App/>)}</div>`))
      })

})
app.use(express.static(path.resolve(__dirname,"..", 'build')));

app.listen(3000,()=>{
    console.log("server is running");
})