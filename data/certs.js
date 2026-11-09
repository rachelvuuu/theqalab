/* The QA Lab – danh mục chứng chỉ có trên site.
   Thêm một chứng chỉ mới:
   1. Tạo các file dữ liệu theo mẫu data/ctal-ta.js (chương, LO, thuật ngữ, cấu hình đề, câu hỏi, bài học).
   2. Thêm một mục vào QALAB.catalog bên dưới (files = danh sách file dữ liệu, ready: true để mở).
   3. Trong data/roadmap.js, gắn cert:"<mã>" cho bước tương ứng của lộ trình.
   Dữ liệu chỉ được tải khi người học mở chứng chỉ đó, nên thêm bao nhiêu chứng chỉ trang vẫn nhẹ. */
window.QALAB = window.QALAB || {certs: {}};
window.QALAB.build = "8";
window.QALAB.catalog = {
  "ctfl": {
    code: "CTFL", version: "v4.0.1", name: "Certified Tester Foundation Level", level: "Foundation", ready: true,
    pass: 26, sections: 64, questions: 213, ch0Title: "Bắt đầu từ số 0",
    blurb: "Nền tảng kiểm thử: quy trình, kỹ thuật thiết kế test, kiểm thử tĩnh, quản lý kiểm thử, công cụ. Học từ số 0.",
    tagline: "Ví dụ thực tế trước lý thuyết, câu hỏi song ngữ có giải thích.",
    files: ["data/ctfl.js", "data/ctfl-en.js", "data/ctfl-extra.js", "data/lessons-ctfl-0.js", "data/lessons-ctfl.js", "data/lessons-ctfl-23.js", "data/lessons-ctfl-4.js", "data/lessons-ctfl-56.js"]
  },
  "ctal-ta": {
    code: "CTAL-TA", version: "v4.0", name: "Advanced Level Test Analyst", level: "Advanced", ready: true,
    pass: 51, sections: 36, questions: 137, ch0Title: "Trước khi học CTAL-TA",
    blurb: "Phân tích và thiết kế test nâng cao: domain, combinatorial, state transition, decision table, metamorphic; rủi ro, đặc tính chất lượng, phòng ngừa lỗi.",
    tagline: "Bài học theo từng LO với bài tập có lời giải và lab tính toán, câu hỏi song ngữ có câu “chọn 2” như đề thật.",
    files: ["data/ctal-ta.js", "data/ctal-ta-q12.js", "data/ctal-ta-q3.js", "data/ctal-ta-q45.js", "data/lessons-ctal-ta-12.js", "data/lessons-ctal-ta-3.js", "data/lessons-ctal-ta-45.js"]
  }
};
