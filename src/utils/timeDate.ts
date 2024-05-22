import { Timestamp } from "firebase/firestore";

// Hàm kiểm tra và chuyển đổi serverTimestamp thành định dạng ngày tháng
export const convertServerTimestamp = (value: any) => {
  if (value instanceof Timestamp) {
    const date = value.toDate(); // Chuyển đổi thành đối tượng Date
    // return moment(date).format("DD-MM-YYYY");
    // Định dạng lại ngày tháng theo định dạng DD-MM-YYYY
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng được tính từ 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } else {
    return value; // Không phải là serverTimestamp, trả về null hoặc giá trị khác tùy ý
  }
};
