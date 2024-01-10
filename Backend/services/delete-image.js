// imageService.js
const fs = require("fs/promises"); // File system module (promisified for async/await)
const path = require("path");

// Function to delete an image based on the provided URL/path
const deleteImage = async (imageUrl) => {
  try {
    // Construct the absolute path to the image based on your folder structure
    const imagePath = path.join(__dirname, "..", "uploads", imageUrl); // Replace 'uploads' with your actual folder name

    // Check if the file exists before attempting to delete
    const fileExists = await fs.access(imagePath, fs.constants.F_OK);

    if (fileExists) {
      // Delete the image file
      await fs.unlink(imagePath);
      console.log("Image deleted successfully:", imageUrl);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
};

module.exports = { deleteImage };
