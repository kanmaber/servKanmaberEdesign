const express = require("express");
const fs = require('fs');
const cors = require("cors"); 
const app = express(); /////
const dotenv=require("dotenv");
dotenv.config();  
const config=require('./config')
const {port}=config;
const messageAffficher= port ? `Le serveur est sur le port ${port}`:"Le server a bien démarré"

var corsOptions = {
  origin: "*"
};


async function readFolder(dir){
  const fsPromises =require ('fs/promises');
  const filenames = await fsPromises.readdir(dir);
  console.log("readFolder filenames  ",filenames);
  return filenames
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",async (req,res) => {
    return res.send("Salut tout le monde");
  });

 app.post("/listFolder", async(req,res) =>{
  
  let TheFolder=req.body.thePath
  let liste=await readFolder(TheFolder)
  console.log('Post "/listFolder" ',liste);
  res.send(liste)

 })
  app.post("/listfold",async (req,res) => {
    console.log(req.body)
     const ftp = require("basic-ftp")
     const client = new ftp.Client()
     client.ftp.verbose = false
     var laListe;
     try {
      await client.access({
        host: 'ftp.kanmaber-edesign.com',
        port: 21,
        user: 'kanma1943525',
        password: 'F2C3h5G5q4R2',
        debug: console.log,
        secure: false
      })
      //await client.cd("/")
      
      laListe= await client.list(req.body.thePath);
      console.log(laListe);
     }
     catch(err) {
      console.log(err)
     }
     client.close()
    return res.send(laListe);
  }); 
  
  app.post("/getfoldercontent", async (req, res)=> {
    console.log(req.body.thePath)
    let folder=req.body.thePath
    
    folderWalker(folder, function (err,data) {
      //console.log("post /getFolderContent =>data = ",data)
      res.send(data)
    })
    
    
  })

  app.get("/simplelist",async (req,res) => {
    var Liste; 
   try {
    Liste=await RunSimpleFtp()
    

   }
   catch (err) {
    Liste.push(err)
   }
   res.send(Liste)
  })

app.listen(port, () => {
    console.log(messageAffficher);
  });

async function RunSimpleFtp(){
  const FTPClient = require('ftp');
  let ftp_client = new FTPClient();
  const fs = require("fs");
  let ftpConfig = {
      host: "91.234.194.249",
      port: 21,
      user: 'cp1048097p04',
      password: 'qJtdZyxjt2',
  }
  ftp_client.connect(ftpConfig);
  ftp_client.on('ready', function() {
    //* type - _string_ - A single character denoting the entry type: 'd' for directory, '-' for file (or 'l' for symlink on **\*NIX only* 
    ftp_client.list(function(err, list) {
      if (err) return err;
      console.dir(list);
      ftp_client.end();
      return list
    });

  });
}
   async function RunBasicFtp(fichier,dest){
    // console.log("Début de la tentative de connection")
     const ftp = require("basic-ftp")
     const client = new ftp.Client()
     client.ftp.verbose = false
     try {
       await client.access({
         host: '91.234.194.249',
         port: 21,
         user: 'cp1048097p04',
         password: 'qJtdZyxjt2',
         debug: console.log,
         secure: false
       })
       //console.log(await client.list())
       //await client.cd(`${dest}`)
       console.log("Dossier en cours ",await client.pwd())
       
       //const { Readable } = require('stream');
       await client.upload(fs.createReadStream(fichier.path), fichier.originalname);
     
      //await client.upload(fichier.stream, fichier.originalname);
       console.log(`Fichier --> ${fichier.originalname} envoyé`)
       
       //supprimer tous les fichiers de présents dans dest
       //await client.uploadFrom("README.md", "README_FTP.md")
      // await client.downloadTo("README_COPY.md", "README_FTP.md")
      
      /*  upload(readableStream, remoteFilename): Promise<Response>
       Upload data from a readable stream and store it as a file 
       with a given filename in the current working directory.
       
       let upload = await self.client.upload(fs.createReadStream(sourcePath), remotePath);
       
       */

       /* 
         cd(remotePath): Promise<Response>
         Change the working directory.
       */
   }
   catch(err) {
       console.log(err)
   }
   client.close()
   }
   