// add an event listener to the upload button to trigger file upload when clicked
document.getElementById("uploadButton").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);
  xhr.setRequestHeader("file-name", file.name);

  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
    }
  };

  // to handle the response after upload completes
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("message").innerText = "Upload successful!";
    } else {
      document.getElementById("message").innerText = "Upload failed!";
    }
  };

  xhr.onerror = function () {
    document.getElementById("message").innerText = "Upload failed!";
  };

  xhr.send(file);
});
