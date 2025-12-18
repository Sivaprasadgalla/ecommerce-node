const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function uploadToImgBB(localImagePath) {
  const API_KEY = process.env.IMAGE_API_KEY;
  const imagePath = localImagePath; // local image

  const form = new FormData();
form.append("key", API_KEY);
form.append("image", imagePath);

  try {
    const response = await axios.post("https://api.imgbb.com/1/upload",
      form,
      { headers: form.getHeaders() }
    );

    console.log("Image URL:", response.data.data.url);
    return response.data.data.url;
  } catch (err) {
    console.error("Upload failed:", err.error);
  }
}

module.exports = uploadToImgBB;
