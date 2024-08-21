const express = require('express');
const app = express();
const multer=require('multer')
const {Storage}=require('@google-cloud/storage')
const storage=new Storage({
    keyFilename:"key.json"
})

const bucketName="cloud369"
const bucket=storage.bucket(bucketName)


app.set('view engine','ejs')


app.get('/', async (req, res) => {
    const [files] = await bucket.getFiles();
    const fileNames = files.map(file => file.name);
    res.render('index', { files: fileNames });
});




app.use(express.json())
app.use(express.urlencoded({extended:false}))
const upload=multer({
    storage:multer.memoryStorage()
})


app.post('/upload',upload.single('file'),async(req,res)=>{
    const file=req.file
    if(!file){
        res.status(400).send("No file Uploaded")
    }
    const fileName=Date.now()+"-"+file.originalname

    const blob=bucket.file(fileName)
    const blobStream=blob.createWriteStream({
        metadata:{
            contentType:file.mimetype
        }
    })

    blobStream.on('error',(err) =>{
        res.status(500).send(err)
    })

    blobStream.on('finish',()=>{
        res.redirect("/")
    })
    blobStream.end(file.buffer)
})

app.get('/download/:filename', async (req, res) => {
    const fileName = req.params.filename;
    const file = bucket.file(fileName);

    file.exists((err, exists) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!exists) {
            return res.status(404).send('File not found');
        }

        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        file.createReadStream().pipe(res);
    });
});


app.get('/view/:filename', async (req, res) => {
    const fileName = req.params.filename;
    const file = bucket.file(fileName);

    file.exists((err, exists) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!exists) {
            return res.status(404).send('File not found');
        }

        const stream = file.createReadStream();
        stream.on('error', (err) => res.status(500).send(err));
        stream.pipe(res);
    });
});


app.post('/delete',async(req,res)=>{
const filename=req.body.fileName
if(!filename){
    res.status(404).send("File not exists")
}
try{
    await bucket.file(filename).delete()
    res.redirect("/")

}catch(error){
    console.log(error)
}
}
)





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
