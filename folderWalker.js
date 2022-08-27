const fs = require('fs');
const path = require('path');

const folderWalker=(dir, done) =>{
    let results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file){
            let UnObj={}
            UnObj.Name=file;
            UnObj.Path=path.resolve(dir, file);
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat){
                if (stat && stat.isDirectory()) {
                    UnObj.Type='D';
                    UnObj.SubDir=[];
                    folderWalker(file, function(err, res){
                        UnObj.SubDir=res;
                        results.push(UnObj)
                        if (!--pending) done(null, results);
                    });
    
                } else {
                    UnObj.Type='F';
                    results.push(UnObj);
                    if (!--pending) done(null, results);
                }
            })
            

        })
    })
}
const write2file=(err,data)=>{
    if(err){
        throw err;
    }
    const jsonString = JSON.stringify(data)
    fs.writeFile('./folderWalker.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

const DisplayF=(err,data)=>{
    if(err){
        throw err;
    }
    data.map((d)=>{
        console.log(d.Name);
        console.log(d.Path);
        console.log(d.Type);
        if (d.Type==='D')
        DisplayF(null,d.SubDir)
    })
}

const getFolderContent=async (folder)=>{
    
     // console.log("getFolderContent =>folder = ",folder) 
     var theresult
     folderWalker(folder, function(err,data){
        //console.log("folderWalker  =>getFolderContent =>data = ",data)
        theresult=data
        return  data
        })
        console.log("folderWalker  =>getFolderContent =>theresult = ",theresult)
    return theresult     
    }

    module.exports = {
        folderWalker,
      } 