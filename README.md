# The QA Lab

Understand the System · Find the Real Issue

Nền tảng học, luyện tập và thi thử chứng chỉ kiểm thử phần mềm (ISTQB) bằng tiếng Việt.
Trang tĩnh thuần HTML/CSS/JS, không cần build.

## Luồng cho mỗi chứng chỉ

1. **Học** – ví dụ thực tế, kiến thức chính, bẫy đề, mẹo nhớ, mục tiêu học tập theo chương
2. **Luyện tập** – câu hỏi theo chương chấm ngay có giải thích, flashcard thuật ngữ
3. **Phòng thi** – thi thử như thật (đồng hồ, đánh dấu câu, nộp tự động khi hết giờ), xem lại đáp án, rút kinh nghiệm theo mục tiêu học tập

Thêm: câu hỏi song ngữ Việt – Anh, phím tắt (bấm `?`), Câu hỏi của ngày + chuỗi ngày, Đề tuần (cả cộng đồng cùng một đề), ảnh kết quả 1080×1350 để chia sẻ.

Kèm trang **Lộ trình** lên QA Specialist và QA Manager.

## Cấu trúc

```
index.html          khung trang
assets/style.css    giao diện (navy + cyan)
assets/app.js       toàn bộ logic: điều hướng, học, luyện tập, phòng thi, lộ trình
data/ctfl.js        dữ liệu CTFL v4.0.1: chương, thuật ngữ, mục tiêu học tập, ngân hàng câu hỏi
data/ctfl-en.js     bản tiếng Anh của câu hỏi, phương án và mục tiêu học tập (chế độ song ngữ)
data/roadmap.js     dữ liệu hai lộ trình chứng chỉ
vercel.json         cấu hình Vercel
```

Tiến độ, lịch sử thi và bài thi đang làm được lưu trong `localStorage` của từng trình duyệt (khóa bắt đầu bằng `qalab_`).

## Thêm câu hỏi

Trong `data/ctfl.js`, các mảng `Q1` … `Q6`:

```js
{c:1, lo:"FL-1.1.1", k:"K1", q:"Câu hỏi", o:["A","B","C","D"], a:0, e:"Giải thích"}
```

Thêm bản tiếng Anh cùng thứ tự phương án trong `data/ctfl-en.js` (khóa `ctfl-<số thứ tự>`).

`a` là vị trí đáp án đúng trong mảng `o` (0 = phương án đầu). Thứ tự phương án được trộn khi hiển thị. Không chèn câu vào giữa mảng: id câu (`ctfl-<số thứ tự>`) dùng để lưu tiến độ, nên chỉ thêm câu mới vào cuối mảng `Q6` hoặc thêm mảng mới.

## Deploy lên Vercel

1. Đẩy toàn bộ thư mục này lên một repo GitHub.
2. vercel.com/new → Import repo.
3. Framework Preset: **Other**, để trống Build Command và Output Directory → **Deploy**.

## Ghi chú

Nội dung câu hỏi là câu tự soạn dựa trên ISTQB® CTFL Syllabus v4.0.1, không phải câu hỏi thi thật.
ISTQB® là nhãn hiệu đã đăng ký của International Software Testing Qualifications Board; The QA Lab không phải đơn vị của ISTQB.
