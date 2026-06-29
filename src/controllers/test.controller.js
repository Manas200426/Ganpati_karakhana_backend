const { uploadImage } = require("../services/cloudinary.service");

const uploadTest = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const image = await uploadImage(
      req.file.buffer,
      "ganpati-management/test"
    );

    res.json({
      success: true,
      image,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  uploadTest,
};