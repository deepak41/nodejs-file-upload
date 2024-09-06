const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// middleware to serve static files from the "public" directory
app.use(express.static("public"));

// ensure the "uploads" directory exists to store uploaded files
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// route to handle file upload
app.post("/upload", (req, res) => {
  const uploadedFileName = req.headers["file-name"];
  const totalFileSize = parseInt(req.headers["content-length"]);
  if (!uploadedFileName) {
    return res.status(400).send("File name is required.");
  }
  const destFilePath = path.join(uploadsDir, uploadedFileName);
  const writeStream = fs.createWriteStream(destFilePath);

  console.log("Stream opened ...  0.00%");
  req.pipe(writeStream);

  // drain is fired whenever a data chunk is written
  writeStream.on("drain", () => {
    const uploadedBytes = parseInt(writeStream.bytesWritten);
    const uploadedPercentage = ((uploadedBytes / totalFileSize) * 100).toFixed(2);
    console.log(`Uploading ...  ${uploadedPercentage}% complete`);
  });

  // event listener for when the file upload is complete
  writeStream.on("close", () => {
    console.log("Uploading ...  100% - Completed");
    res.send("File uploaded successfully!");
  });

  writeStream.on("error", (err) => {
    console.error("Error during file upload:", err);
    res.status(500).send("An error occurred during file upload.");
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
