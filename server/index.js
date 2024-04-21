const { v4: uuidv4 } = require('uuid');

const express = require('express')
const app = express()
const port = 126

app.get('/MountSus/drmChallengeResponse', (req, res) => {
  console.log(req.url);
  console.log(req.ip); // The second I see a lab126 IP istg-
  console.log(req.headers.filedata);
  console.log("");
  if (req.headers["filedata"]) {
    res.set({"Content-Disposition": 'attachment; filename="mntus.params"'})
    res.send(decodeURIComponent(req.headers.filedata));
  } else {
    res.status(400).send();
  }
})

app.get('/MountSus/jbDRM', (req, res) => {
  if (Math.random() > 0.25) {
    res.send({"error": "Hah! Nice try lab126! Give us a proper way to write Kindle apps and we wouldn't have to do this."});
  } else {
    res.send({"drmToken": uuidv4(), "lab126": "Why are you snooping? If you think this is worth patching you have problems."});
  }
});

app.get('/MountSus/kindleCrypt', (req, res) => {
  if (Math.random() > 0.1) {
    res.send({"error": "Invalid kindle data"});
  } else {
    res.send({"ok": "DRM Valid!", "respChallenge": uuidv4()});
  }
})

app.get('/MountSus/drmKey', (req, res) => {
  //res.sendFile("./drmKey.bin");
  res.send("TBA");
})

app.get('/MountSus/drmKey2', (req, res) => {
  //res.sendFile("./drmKey2.bin");
  res.send("TBA");
})

app.get('/MountSus/mountsusUpdate.js', (req, res) => {
  //res.sendFile("./mountsusUpdate.js");
  res.send("TBA");
})

app.get('/MountSus/FileUpload', (req, res) => {
  JSON.stringify(req.params);
})

app.listen(port, () => {
  console.log(`MountSus Listening On ${port}`)
})