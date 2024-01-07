// Hàm middleware asyncHandler nhận một hàm fn làm tham số
const asyncHandler = (fn) => (req, res, next) => {
    // Đảm bảo rằng fn(req, res, next) trả về một Promise và bắt lỗi nếu có
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  // Xuất hàm asyncHandler để có thể sử dụng trong các module khác
  export default asyncHandler;
  