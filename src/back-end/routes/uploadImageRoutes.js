import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();
const __dirname = path.resolve();
// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (process.env.NODE_ENV === "production") {
      cb(null, path.join(__dirname, "front-end/build/images/")); // Production: Save to the "images" folder
    } else {
      cb(null, "uploads/"); // Development: Save to the "uploads" folder
    }
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
// Hàm kiểm tra loại file cho multer
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

// Tạo middleware upload từ multer, sử dụng cấu hình đã thiết lập
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");
// Xử lý route POST để upload hình ảnh
router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const baseName = path.basename(req.file.path);
    if (process.env.NODE_ENV === "production") {
      return res.status(200).send({
        message: "Image uploaded successfully",
        image: `/images/${baseName}`,
      });
    } else {
      return res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    }
  });
});

export default router;
