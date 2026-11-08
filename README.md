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
data/ctfl-extra.js  câu hỏi bổ sung (song ngữ) để mỗi LO có ít nhất 3 câu, LO mức K3 có 5 câu
data/lessons-ctfl-0.js  mục “Bắt đầu từ số 0”: kiến thức nền, từ điển cho người mới, cách thi, lộ trình 4 tuần
data/lessons-ctfl*.js  bài học chi tiết theo mục: chương 1 (lessons-ctfl.js), 2–3, 4, 5–6
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


## Bài học chi tiết và Ôn nhanh

Mỗi mục bài học là một object trong `window.QALAB.certs.ctfl.lessons[chương]`:

```js
{ id: "4.2.2", title, en, los: ["FL-4.2.2"], minutes,   // mỗi mục = một LO, id trùng mã LO
  example: "tình huống thực tế",
  blocks: [ ... ],          // nội dung
  summary: ["ý 1", ...],    // tóm tắt cuối bài, tự gom vào trang Ôn nhanh (#review)
  terms: [["en", "vi"], ...] }
```

Các loại block: `h`, `p`, `list`, `table {head, rows}`, `compare {l, r}`, `steps`, `principles`, `tip`, `trap`,
`worked {title, given, steps, answer}` (bài tập có lời giải, ẩn tới khi người học mở),
`lab {kind}` với kind = `bva` (EP + BVA), `dt` (bảng quyết định), `est3` (ước lượng ba điểm và tỷ lệ), `risk` (ma trận rủi ro), `st` (mô phỏng chuyển trạng thái), `cov` (đo bao phủ câu lệnh/nhánh).
Viết `` `code` `` để hiển thị code.
Viết `**chữ đậm**` trong chuỗi để in đậm.

Trang Ôn nhanh lưu trạng thái “đã ôn” ở `localStorage` (`qalab_reviewed_ctfl`); mục ôn quá 3 ngày hiện “Nên ôn lại”.

Mục lục được nhóm theo mục syllabus (`lessonGroups` trong `data/lessons-ctfl.js`). `lessonMigrate` chuyển tiến độ đã lưu từ mã mục cũ sang mã mới.
Nút “Tạo carousel” (cuối mỗi bài và trong Ôn nhanh) sinh bộ ảnh 1080×1350 từ phần tóm tắt, kèm caption để đăng TikTok/Facebook/Threads.
