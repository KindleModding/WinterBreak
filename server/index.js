const express = require('express')
const app = express()
const port = 126

app.get('/MountSus/mntus.params', (req, res) => {
  console.log(req.url);
  console.log(req.ip); // The second I see a lab126 IP istg-
  console.log(req.headers.filedata);
  console.log("");
  if (req.headers["filedata"]) {
    res.set({"Content-Disposition": 'attachment; filename="mntus.params"'})
    res.sendFile(decodeURIComponent(req.headers.filedata));
  } else {
    res.status(400).send();
  }
})

app.listen(port, () => {
  console.log(`MountSus Listening On ${port}`)
})