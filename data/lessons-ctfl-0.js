/* The QA Lab – “Bắt đầu từ số 0”: kiến thức nền cho người chưa từng làm phần mềm, cách thi và cách tự học. */
window.QALAB.certs.ctfl.lessons = window.QALAB.certs.ctfl.lessons || {};
window.QALAB.certs.ctfl.lessons[0] = [
{
  id: "0.1", title: "Phần mềm được làm ra như thế nào", en: "How software gets built", los: [], minutes: 20,
  example: "Một app giao đồ ăn muốn thêm tính năng “đặt món hẹn giờ”. Product Owner (PO) viết ý tưởng thành user story trong backlog. Business Analyst (BA) làm rõ quy tắc: chỉ hẹn trong 7 ngày tới, quán phải đang mở cửa. Designer vẽ màn hình. Dev viết code, đẩy lên Git; hệ thống CI tự build và chạy test. Tester kiểm tra trên môi trường test, báo lỗi “hẹn 23:59 thì đơn bị nhảy sang ngày hôm sau”. Dev sửa, tester kiểm tra lại. Cuối sprint, cả đội demo cho PO, rồi bản mới được triển khai lên production cho người dùng thật.",
  blocks: [
    {t: "p", v: "Syllabus CTFL giả định bạn đã quen với môi trường làm phần mềm. Mục này cho bạn bức tranh tối thiểu đó, để khi gặp các từ như user story, sprint, build, production ở chương sau thì không bị “ngợp”. Mục này **không thi**, nhưng đọc trước sẽ giúp hiểu nhanh hơn nhiều."},
    {t: "h", v: "Ai làm gì trong một dự án"},
    {t: "table", head: ["Vai trò", "Làm gì", "Tester làm việc với họ thế nào"], rows: [
      ["Khách hàng, người dùng", "Người trả tiền hoặc dùng sản phẩm", "Là người mà cuối cùng kiểm thử phải bảo vệ quyền lợi"],
      ["Product Owner (PO)", "Quyết định làm tính năng gì, thứ tự ưu tiên, quản lý backlog", "Cùng làm rõ tiêu chí chấp nhận, báo rủi ro để PO quyết định"],
      ["Business Analyst (BA)", "Phân tích nghiệp vụ, viết đặc tả yêu cầu", "Rà soát đặc tả để tìm chỗ mơ hồ, thiếu, mâu thuẫn"],
      ["Designer (UI/UX)", "Thiết kế giao diện và trải nghiệm", "Góp ý về khả năng sử dụng, đối chiếu màn hình thật với thiết kế"],
      ["Developer (dev)", "Viết code, viết unit test, sửa lỗi", "Báo lỗi, cùng tái hiện, kiểm tra lại bản sửa"],
      ["Tester / QA", "Kiểm thử sản phẩm, đánh giá chất lượng, báo cáo", "Chính là bạn"],
      ["DevOps / vận hành", "Dựng hạ tầng, pipeline, triển khai, giám sát hệ thống", "Cung cấp môi trường test, dữ liệu, log"],
      ["Project Manager / Scrum Master", "Điều phối tiến độ, gỡ vướng cho đội", "Nhận báo cáo tiến độ kiểm thử, rủi ro"]
    ]},
    {t: "h", v: "Hành trình của một tính năng"},
    {t: "steps", v: [
      ["Ý tưởng → yêu cầu", "Nhu cầu được viết thành tài liệu yêu cầu hoặc user story kèm tiêu chí chấp nhận"],
      ["Thiết kế", "Kiến trúc hệ thống, cơ sở dữ liệu, màn hình"],
      ["Lập trình", "Dev viết code trên máy mình, rồi đẩy lên kho mã (Git) qua code review"],
      ["Build và tích hợp", "Hệ thống tự ghép code thành bản chạy được (build) và chạy test tự động (CI)"],
      ["Kiểm thử", "Trên môi trường test hoặc staging, giống thật nhưng không ảnh hưởng người dùng"],
      ["Phát hành", "Bản đạt yêu cầu được triển khai (deploy) lên production, nơi người dùng thật sử dụng"],
      ["Vận hành và bảo trì", "Theo dõi, sửa lỗi phát sinh, nâng cấp; mỗi thay đổi lại cần kiểm thử"]
    ]},
    {t: "h", v: "Hai cách tổ chức công việc bạn sẽ gặp trong đề"},
    {t: "compare", l: {h: "Tuần tự (ví dụ thác nước, chữ V)", q: "Làm xong giai đoạn này mới sang giai đoạn sau", v: ["Yêu cầu → thiết kế → code → kiểm thử → phát hành", "Tài liệu chi tiết", "Kiểm thử chạy phần mềm thường diễn ra muộn"]}, r: {h: "Agile (ví dụ Scrum)", q: "Làm từng phần nhỏ, lặp lại liên tục", v: ["Chia thời gian thành **sprint** 1–4 tuần", "Mỗi sprint lấy vài story từ **backlog**, làm xong cả code lẫn test", "Họp ngắn hằng ngày (daily), demo cuối sprint, họp cải tiến (retrospective)", "Tài liệu gọn, nhiều tự động hóa"]}},
    {t: "h", v: "Bốn môi trường thường gặp"},
    {t: "table", head: ["Môi trường", "Dùng để", "Ghi nhớ"], rows: [
      ["Development (dev)", "Dev viết và thử code", "Hay thay đổi, không ổn định"],
      ["Test / QA", "Tester kiểm thử", "Có dữ liệu giả, có thể xóa làm lại"],
      ["Staging", "Thử lần cuối trước khi phát hành", "Giống production nhất có thể"],
      ["Production (prod)", "Người dùng thật sử dụng", "Lỗi ở đây ảnh hưởng thật tới khách hàng và doanh thu"]
    ]},
    {t: "tip", v: "Khi đọc đề, gặp “sprint”, “iteration”, “backlog”, “user story” là đề đang nói về bối cảnh Agile; gặp “giai đoạn”, “tài liệu đặc tả”, “mô hình chữ V” là bối cảnh tuần tự."}
  ],
  summary: ["Một dự án có nhiều vai trò: khách hàng, PO, BA, designer, dev, tester, DevOps, PM; tester làm việc với tất cả.", "Tính năng đi qua: yêu cầu → thiết kế → code → build/CI → kiểm thử → phát hành → vận hành và bảo trì.", "Tuần tự: xong giai đoạn mới sang giai đoạn sau. Agile/Scrum: sprint ngắn, backlog, daily, demo, retrospective.", "Môi trường: dev → test → staging → production; lỗi ở production ảnh hưởng người dùng thật."],
  terms: [["Product Owner (PO)", "chủ sản phẩm"], ["Business Analyst (BA)", "chuyên viên phân tích nghiệp vụ"], ["sprint / iteration", "vòng lặp"], ["backlog", "danh sách việc cần làm"], ["production", "môi trường thật"], ["staging", "môi trường tiền phát hành"]]
},
{
  id: "0.2", title: "Từ điển nhanh cho người mới", en: "Beginner's glossary", los: [], minutes: 15,
  example: "Bạn đọc câu: “Sau mỗi lần merge, pipeline CI chạy unit test và smoke test trên build mới, rồi deploy lên staging.” Nếu chưa quen, câu này như tiếng lạ. Dịch ra: mỗi khi code của dev được gộp vào nhánh chính, hệ thống tự động ghép code thành bản chạy được, chạy các test nhỏ cho từng hàm và vài test nhanh xem chức năng chính còn sống không, rồi đưa bản đó lên môi trường giống thật để kiểm tra tiếp.",
  blocks: [
    {t: "p", v: "Những từ dưới đây xuất hiện thường xuyên trong bài học và trong đề, nhưng syllabus không giải thích vì coi như bạn đã biết. Từ khóa chính thức của ISTQB (như khiếm khuyết, sự cố, ca kiểm thử) được giải thích kỹ trong từng bài và trong phần flashcard."},
    {t: "h", v: "Về sản phẩm và kỹ thuật"},
    {t: "table", head: ["Từ", "Nghĩa dễ hiểu"], rows: [
      ["Code / mã nguồn", "Các dòng lệnh dev viết để tạo ra phần mềm"],
      ["Hàm, module, component (thành phần)", "Một khối code nhỏ làm một việc, ghép lại thành hệ thống"],
      ["API", "Cổng để hai phần mềm nói chuyện với nhau, ví dụ app gọi API ngân hàng để thanh toán"],
      ["Giao diện người dùng (UI)", "Màn hình, nút bấm mà người dùng nhìn thấy"],
      ["Cơ sở dữ liệu (database)", "Nơi lưu dữ liệu như tài khoản, đơn hàng"],
      ["Build", "Bản phần mềm được ghép từ code, chạy được"],
      ["Phiên bản (version), bản phát hành (release)", "Một bản cụ thể của phần mềm, ví dụ 2.4.1"],
      ["Deploy / triển khai", "Đưa một bản build lên một môi trường"],
      ["Log", "Nhật ký hệ thống ghi lại điều đã xảy ra, rất hữu ích khi tìm lỗi"],
      ["Bug", "Cách nói đời thường của khiếm khuyết (defect)"],
      ["Hot fix", "Bản sửa lỗi khẩn, phát hành ngoài kế hoạch"]
    ]},
    {t: "h", v: "Về quy trình và công cụ"},
    {t: "table", head: ["Từ", "Nghĩa dễ hiểu"], rows: [
      ["Git, kho mã (repository)", "Nơi lưu code và lịch sử thay đổi; giúp quản lý phiên bản"],
      ["Merge", "Gộp code của một người vào nhánh chung"],
      ["Code review", "Đồng nghiệp đọc code của nhau trước khi gộp"],
      ["Refactor (tái cấu trúc)", "Sửa cho code gọn, dễ hiểu hơn mà không đổi hành vi"],
      ["CI (tích hợp liên tục)", "Mỗi lần có code mới, hệ thống tự build và chạy test"],
      ["CD (bàn giao liên tục)", "Bản build qua test được tự động đưa tới môi trường tiếp theo"],
      ["Pipeline", "Chuỗi bước tự động: build → test → deploy"],
      ["Unit test", "Test nhỏ cho một hàm hay thành phần, thường do dev viết"],
      ["Smoke test", "Vài test nhanh để xem chức năng chính còn chạy không, trước khi test kỹ"],
      ["End-to-end (E2E)", "Test cả luồng từ đầu tới cuối như người dùng thật"],
      ["Test tự động / thủ công", "Do công cụ chạy script / do người thao tác"],
      ["Framework", "Bộ khung có sẵn giúp viết code hay viết test nhanh hơn"],
      ["Jira, Xray, TestRail", "Ví dụ công cụ quản lý công việc, ca kiểm thử, lỗi"]
    ]},
    {t: "h", v: "Về con người và tổ chức"},
    {t: "table", head: ["Từ", "Nghĩa dễ hiểu"], rows: [
      ["Bên liên quan (stakeholder)", "Bất kỳ ai quan tâm hay chịu ảnh hưởng bởi sản phẩm: khách, PO, dev, quản lý, cơ quan quản lý"],
      ["Nghiệp vụ (business), lĩnh vực (domain)", "Hoạt động kinh doanh mà phần mềm phục vụ, ví dụ ngân hàng, y tế"],
      ["Rủi ro", "Điều xấu có thể xảy ra trong tương lai"],
      ["Metrics, KPI", "Con số đo lường, ví dụ số ca đã chạy, số lỗi còn mở"],
      ["Kiểm toán (audit)", "Kiểm tra độc lập xem có tuân thủ quy định không"],
      ["Hợp đồng, quy định pháp lý", "Ràng buộc bên ngoài mà phần mềm phải đáp ứng, ví dụ luật bảo vệ dữ liệu"]
    ]},
    {t: "trap", v: ["Trong đề ISTQB, “bug” được gọi chính thức là defect (khiếm khuyết). Đừng nhầm defect với failure (sự cố khi chạy) và error (sai sót của con người): chương 1 giải thích kỹ.", "“Test” trong đời thường thường chỉ việc chạy thử; trong ISTQB, kiểm thử gồm cả lập kế hoạch, phân tích, thiết kế, rà soát tài liệu."]}
  ],
  summary: ["Build = bản chạy được; deploy = đưa lên môi trường; release = bản phát hành; hot fix = bản sửa khẩn.", "CI tự build và chạy test mỗi lần có code mới; CD tự đưa bản đạt tới môi trường tiếp theo; pipeline = chuỗi bước tự động.", "Unit test = test nhỏ cho từng hàm; smoke test = test nhanh chức năng chính; E2E = test cả luồng như người dùng.", "Bên liên quan = bất kỳ ai quan tâm hay chịu ảnh hưởng bởi sản phẩm.", "Bug đời thường = defect (khiếm khuyết) trong ISTQB."],
  terms: [["build", "bản build"], ["deploy", "triển khai"], ["pipeline", "chuỗi tự động"], ["smoke test", "kiểm thử khói"], ["stakeholder", "bên liên quan"], ["log", "nhật ký hệ thống"]]
},
{
  id: "0.3", title: "Kỳ thi CTFL: cấu trúc và cách làm bài", en: "The CTFL exam and how to answer", los: [], minutes: 15,
  example: "Câu hỏi: “Hoạt động nào KHÔNG phải là hoạt động kiểm thử?” Người vội đọc lướt, thấy “thiết kế ca kiểm thử” quen quen nên chọn luôn. Người cẩn thận gạch chân chữ KHÔNG, loại ba phương án là hoạt động kiểm thử (lập kế hoạch, thiết kế, thực thi), chọn “gỡ lỗi”. Phần lớn câu sai của người mới không phải vì thiếu kiến thức mà vì đọc sót một chữ.",
  blocks: [
    {t: "h", v: "Thông tin chính về bài thi"},
    {t: "table", head: ["", "CTFL v4.0.1"], rows: [
      ["Số câu", "40 câu trắc nghiệm, mỗi câu 1 điểm"],
      ["Thời gian", "60 phút; thường được cộng 25% (75 phút) nếu thi không bằng tiếng mẹ đẻ"],
      ["Điểm đạt", "26/40 (65%)"],
      ["Phân bổ theo chương", "Ch.1: 8 · Ch.2: 6 · Ch.3: 4 · Ch.4: 11 · Ch.5: 9 · Ch.6: 2"],
      ["Kiểu câu", "Đa số chọn 1 đáp án đúng; một số câu yêu cầu chọn 2 đáp án, đề ghi rõ"],
      ["Nơi thi", "Qua đơn vị được ISTQB công nhận (ví dụ iSQI), thi online có giám sát hoặc tại trung tâm; kiểm tra ngôn ngữ đề có sẵn khi đăng ký"]
    ]},
    {t: "tip", v: "Chương 4 (11 câu) và chương 5 (9 câu) chiếm một nửa đề. Chương 4 có nhiều câu K3 phải tính toán: EP, BVA, bảng quyết định, chuyển trạng thái. Luyện kỹ bằng các Lab trong bài."},
    {t: "h", v: "Ba mức K: mỗi mục tiêu học tập được hỏi ở mức nào"},
    {t: "table", head: ["Mức", "Bạn cần", "Câu hỏi trông như thế nào"], rows: [
      ["K1 · Nhớ", "Nhận ra, nhớ lại định nghĩa, danh sách", "“Điều nào là một lợi ích của…”, “Vai trò nào…”"],
      ["K2 · Hiểu", "Giải thích, phân loại, so sánh, cho ví dụ", "Cho một tình huống, hỏi nó thuộc khái niệm nào, hoặc phát biểu nào đúng"],
      ["K3 · Áp dụng", "Dùng kỹ thuật cho tình huống cụ thể", "Cho yêu cầu hay sơ đồ, hỏi số ca tối thiểu, giá trị cần test, kết quả"]
    ]},
    {t: "p", v: "Trên The QA Lab, mỗi mục bài học ghi rõ mã LO và mức K (ví dụ `FL-4.2.2 · K3`). Mục K3 luôn có bài tập có lời giải và Lab để bạn tự làm."},
    {t: "h", v: "8 mẹo làm bài"},
    {t: "steps", v: [
      ["Gạch chân từ khóa phủ định", "KHÔNG, NGOẠI TRỪ, SAI (NOT, EXCEPT): rất nhiều câu đảo ngược như vậy"],
      ["Để ý từ chỉ mức độ", "TỐT NHẤT, CHỦ YẾU, PHÙ HỢP NHẤT (BEST, MOST): có thể nhiều phương án đúng một phần, chọn cái đúng nhất"],
      ["Cảnh giác với từ tuyệt đối", "“luôn luôn”, “chứng minh”, “không bao giờ”, “mọi”, “loại bỏ hoàn toàn” thường là đáp án sai"],
      ["Trả lời theo syllabus, không theo công ty bạn", "Thực tế mỗi nơi một kiểu, nhưng đề chấm theo định nghĩa của ISTQB"],
      ["Loại trừ trước", "Bỏ 2 phương án sai rõ ràng, rồi so 2 phương án còn lại"],
      ["Câu tính toán: viết ra giấy", "Vẽ vùng EP, đánh dấu biên, kẻ bảng quyết định hay vẽ sơ đồ trạng thái thay vì nhẩm"],
      ["Đánh dấu rồi quay lại", "Câu khó quá 2 phút thì đánh dấu, làm câu khác; không bỏ trống câu nào vì sai không bị trừ điểm"],
      ["Đọc hết các phương án", "Đừng chọn ngay phương án đầu tiên nghe hợp lý"]
    ]},
    {t: "trap", v: ["Đề có thể dùng tiếng Anh; học song ngữ thuật ngữ (phần Từ khóa của mỗi mục, chế độ song ngữ khi luyện) để không bị bối rối khi gặp từ gốc.", "Không cần thuộc lòng mã LO hay số trang syllabus; cần hiểu nội dung."]}
  ],
  summary: ["40 câu, 60 phút (75 phút nếu thi không bằng tiếng mẹ đẻ), đạt 26/40 = 65%.", "Phân bổ: Ch.1: 8, Ch.2: 6, Ch.3: 4, Ch.4: 11, Ch.5: 9, Ch.6: 2; chương 4 và 5 chiếm nửa đề.", "K1 nhớ, K2 hiểu (tình huống → khái niệm), K3 áp dụng kỹ thuật (tính toán).", "Gạch chân KHÔNG/NGOẠI TRỪ, để ý TỐT NHẤT, cảnh giác từ tuyệt đối như “luôn”, “chứng minh”.", "Trả lời theo syllabus; loại trừ trước; câu tính toán thì viết ra giấy; không bỏ trống."],
  terms: [["learning objective (LO)", "mục tiêu học tập"], ["K-level", "mức nhận thức"], ["syllabus", "đề cương"], ["sample exam", "đề mẫu"]]
},
{
  id: "0.4", title: "Lộ trình tự học 4 tuần và khi nào sẵn sàng đi thi", en: "A 4-week self-study plan", los: [], minutes: 10,
  example: "Chị Mai làm kế toán, muốn chuyển sang QA, mỗi tối học được 45–60 phút. Tuần 1 chị học chương 1–2 trên The QA Lab, làm hết kiểm tra nhanh. Tuần 2 chương 3–4, mỗi kỹ thuật làm lại Lab hai lần. Tuần 3 chương 5–6, rồi luyện câu sai. Tuần 4 mỗi ngày một đề thi thử và 15 phút Ôn nhanh bằng thẻ. Hai đề cuối chị được 31 và 33/40, lúc đó chị mới đăng ký thi.",
  blocks: [
    {t: "p", v: "Syllabus khuyến nghị khoảng **19 giờ học** (1.135 phút) cho cả 6 chương. Kế hoạch dưới đây dành cho người mới hoàn toàn, học 45–60 phút mỗi ngày, 5–6 ngày một tuần. Có nền tảng IT thì có thể rút còn 2 tuần."},
    {t: "table", head: ["Tuần", "Học (bước 1)", "Luyện (bước 2)", "Mục tiêu cuối tuần"], rows: [
      ["1", "Mục Bắt đầu, chương 1, chương 2", "Kiểm tra nhanh mỗi mục; luyện theo chương 1, 2", "Giải thích được bằng lời: kiểm thử là gì, 7 nguyên tắc, các cấp độ và loại kiểm thử"],
      ["2", "Chương 3, chương 4", "Mỗi kỹ thuật ở chương 4: làm bài tập có lời giải, rồi dùng Lab với số liệu tự nghĩ", "Tự làm đúng câu EP, BVA, bảng quyết định, chuyển trạng thái, câu lệnh/nhánh mà không xem lời giải"],
      ["3", "Chương 5, chương 6", "Luyện theo chương 5, 6; chế độ “Sai lần trước” cho mọi chương", "Ước lượng ba điểm, ưu tiên ca kiểm thử, viết báo cáo lỗi đủ nội dung"],
      ["4", "Ôn nhanh: thẻ tự kiểm tra 15 phút/ngày", "Mỗi ngày 1 đề thi thử 40 câu, xem lại từng câu sai và học lại mục liên quan", "3 đề liên tiếp từ 30/40 trở lên"]
    ]},
    {t: "h", v: "Cách học một mục cho chắc"},
    {t: "steps", v: [
      ["Đọc ví dụ thực tế trước", "Hình dung tình huống, rồi mới đọc phần lý thuyết"],
      ["Đọc nội dung, chú ý phần Bẫy", "Bẫy là những chỗ đề hay đánh lừa"],
      ["Tự làm bài tập rồi mới mở lời giải", "Với mục K3, thử thêm vài số liệu khác trong Lab"],
      ["Đọc tóm tắt, che đi và tự nói lại", "Nói được thành lời nghĩa là đã hiểu"],
      ["Làm kiểm tra nhanh", "Sai câu nào thì đọc lại đoạn tương ứng"],
      ["Bấm “Đã hiểu mục này”", "Ôn lại bằng trang Ôn nhanh sau 1 ngày, 3 ngày, 1 tuần"]
    ]},
    {t: "h", v: "Danh sách kiểm tra: đã sẵn sàng đi thi chưa?"},
    {t: "list", v: ["Tất cả mục của 6 chương đều đã bấm “Đã hiểu”.", "Kiểm tra nhanh và luyện theo chương đúng từ 80% trở lên ở mọi chương.", "Thẻ Ôn nhanh: nhớ được các ý chính của mọi mục mà không cần lật thẻ.", "Làm câu K3 chương 4 trong dưới 2 phút mỗi câu.", "Ít nhất 3 đề thi thử liên tiếp từ 30/40 trở lên (cao hơn mức đạt 26 để có biên an toàn).", "Đã đọc lại phần giải thích của mọi câu từng làm sai."]},
    {t: "tip", v: "Sau khi tự tin với đề trên The QA Lab, hãy làm thêm đề mẫu chính thức (sample exam) trên trang ISTQB để quen văn phong đề thật."}
  ],
  summary: ["Syllabus khuyến nghị khoảng 19 giờ học; người mới học 45–60 phút/ngày trong khoảng 4 tuần.", "Tuần 1: chương 1–2. Tuần 2: chương 3–4 (làm Lab kỹ). Tuần 3: chương 5–6 và câu sai. Tuần 4: mỗi ngày một đề thi thử và Ôn nhanh.", "Học một mục: ví dụ → nội dung và bẫy → tự làm bài tập → tóm tắt → kiểm tra nhanh → ôn lại theo khoảng cách.", "Sẵn sàng khi: hiểu hết mọi mục, luyện ≥ 80% mỗi chương, 3 đề thi thử liên tiếp ≥ 30/40."],
  terms: [["mock exam", "thi thử"], ["spaced repetition", "ôn tập ngắt quãng"]]
}
];
