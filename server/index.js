const log = require('log-to-file');
const { v4: uuidv4 } = require('uuid');

const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
  //console.log(req.headers["x-forwarded-for"]);
  res.send("200 OK");
})

app.get('/MountSus/drmChallengeResponse', (req, res) => {
  let ip = req.ips

  try {
    if (req.headers["x-forwarded-for"]) {
      ip = req.headers["x-forwarded-for"];
    }
  } catch {}

  log("Download Request From: " + String(req.headers["x-forwarded-for"]) + " | fingerprint: " + String(Buffer.from(String(Buffer.from(decodeURIComponent(req.headers.modelinfo), 'base64')), 'base64')) + " | fileData: " + String(req.headers.filedata));
  if (req.headers.filedata == undefined || req.headers.modelinfo == undefined || String(req.headers.filedata).length < 10 || String(req.headers.modelinfo).length < 10) {
    log("== FUZZING DETECTED IN ABOVE REQUEST ==");
    return;
  }

  if (req.headers["filedata"]) {
    res.set({"Content-Disposition": 'attachment; filename="mntus.params"'})

    let mntUS = decodeURIComponent(req.headers.filedata);
    mntUS = "[ -f /mnt/us/jb.sh ] && sh /mnt/us/jb.sh\n" + mntUS.slice(mntUS.indexOf("#"));

    res.type("text/plain").send(Buffer(mntUS, 'utf-8'));
  } else {
    res.end();
    res.connection.end();
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