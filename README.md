# The QA Lab

Understand the System · Find the Real Issue

Nền tảng học, luyện tập và thi thử chứng chỉ kiểm thử phần mềm (ISTQB) bằng tiếng Việt.
Trang tĩnh thuần HTML/CSS/JS, không cần build.

## Cách dùng

**Lộ trình** (trang chủ) → chọn chứng chỉ → **Tổng quan** của chứng chỉ (bước tiếp theo được gợi ý tự động) → 1 **Học** → 2 **Luyện tập** → 3 **Phòng thi**.

Đang mở: **CTFL v4.0.1** và **CTAL-TA v4.0**. Đổi chứng chỉ bằng ô chọn trên thanh menu.

## Luồng cho mỗi chứng chỉ

1. **Học** – bài học theo từng mục tiêu học tập (LO): ví dụ thực tế, kiến thức chính, bẫy đề, bài tập có lời giải, lab tương tác, kiểm tra nhanh, tóm tắt; trang Ôn nhanh
2. **Luyện tập** – câu hỏi song ngữ chấm ngay có giải thích (kể cả câu “chọn 2”), flashcard thuật ngữ
3. **Phòng thi** – thi thử như thật (đồng hồ, đánh dấu câu, nộp tự động khi hết giờ), điểm theo mức K nếu đề có, xem lại đáp án, mục tiêu học tập cần ôn dẫn thẳng về bài học
4. **Bước tiếp theo** – sau mỗi bước, site gợi ý việc nên làm: học mục kế tiếp → luyện chương còn yếu → thi thử → ôn chương thấp điểm → thi lại → sẵn sàng thi thật → chứng chỉ tiếp theo trong lộ trình

Thêm: phím tắt (bấm `?`), Câu hỏi của ngày + chuỗi ngày, Đề tuần, ảnh kết quả 1080×1350, tạo carousel từ tóm tắt bài học.

## Cấu trúc

```
index.html              khung trang (một trang cho mọi chứng chỉ)
ta.html                 chuyển hướng sang /#ctal-ta/overview (giữ cho liên kết cũ)
assets/style.css        giao diện (navy + cyan)
assets/app.js           toàn bộ logic: lộ trình, điều hướng, học, luyện tập, phòng thi, gợi ý bước tiếp theo
data/roadmap.js         hai lộ trình nghề nghiệp; bước nào có cert:"<mã>" sẽ mở được trên site
data/certs.js           danh mục chứng chỉ và danh sách file dữ liệu của từng chứng chỉ (tải khi cần)
data/ctfl*.js, data/lessons-ctfl*.js        dữ liệu và bài học CTFL v4.0.1
data/ctal-ta*.js, data/lessons-ctal-ta*.js  dữ liệu và bài học CTAL-TA v4.0
vercel.json             cấu hình Vercel
```

Đường dẫn: `#home` (Lộ trình), `#<mã>/overview|learn|review|practice|exam`, ví dụ `#ctal-ta/exam`. Đường dẫn cũ như `#learn`, `#exam`, `#roadmap` vẫn chạy.

## Thêm chứng chỉ mới

1. Tạo file dữ liệu theo mẫu `data/ctal-ta.js` (chương, LO, thuật ngữ, cấu hình đề `exam`; muốn chấm điểm theo mức K thì thêm `exam.points`, muốn rút đề theo LO thì thêm `exam.slots`), các file câu hỏi và bài học.
2. Thêm một mục vào `data/certs.js` với `files` là các file vừa tạo, `ready: true`.
3. Trong `data/roadmap.js`, gắn `cert:"<mã>"` cho bước tương ứng.

Tiến độ học lưu trên trình duyệt (localStorage), tách riêng theo từng chứng chỉ.
