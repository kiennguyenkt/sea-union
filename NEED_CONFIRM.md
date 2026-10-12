# Các điểm cần xác nhận

Ghi câu hỏi còn mở vào file này trước khi hỏi chủ dự án. Khi có trả lời, cập nhật trạng thái tại đây và tài liệu/code liên quan.

## Chờ xác nhận

### NC-01 — Index của hai cứ điểm giữa

- Nguồn: `specs/map-mid.PNG`, hàng cứ điểm ở giữa map.
- “Thành Địa Nghỉ Dưỡng” chỉ đọc được tiền tố `3-`.
- “Khách Sạn Cực Lạc” chỉ đọc được tiền tố `4-`.
- Cần xác nhận: index đầy đủ của hai node là gì, hay đây là ID độc lập `3` và `4`?
- Nếu ảnh đang thiếu index, cần chụp gần hai node này để thấy đầy đủ nhãn.
- Tạm thời: dùng ID `3`, `4` và đánh dấu `indexPending: true`; không tự thêm `3-4`.
- Không chặn việc tổ chức code hoặc hoàn thiện demo.
