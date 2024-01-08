import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();
// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
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

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  });
});

export default router;