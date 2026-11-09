/* The QA Lab – bài học chi tiết CTAL-TA v4.0: Bắt đầu, chương 1, chương 2. Mỗi mục ứng với một LO trong syllabus. */
(function(){
const C = window.QALAB.certs["ctal-ta"];
C.lessons = C.lessons || {};
C.lessonGroups = {
 "1.1":"Kiểm thử trong SDLC", "1.2":"Tham gia các hoạt động kiểm thử", "1.3":"Nhiệm vụ với sản phẩm công việc",
 "2.1":"Phân tích rủi ro", "2.2":"Kiểm soát rủi ro",
 "3.1":"Kỹ thuật dựa trên dữ liệu", "3.2":"Kỹ thuật dựa trên hành vi", "3.3":"Kỹ thuật dựa trên quy tắc", "3.4":"Kiểm thử dựa trên kinh nghiệm", "3.5":"Chọn kỹ thuật phù hợp nhất",
 "4.1":"Kiểm thử chức năng", "4.2":"Kiểm thử khả năng sử dụng", "4.3":"Kiểm thử tính linh hoạt", "4.4":"Kiểm thử tính tương thích",
 "5.1":"Thực hành phòng ngừa", "5.2":"Hỗ trợ khoanh vùng theo giai đoạn", "5.3":"Giảm tái diễn khiếm khuyết"
};
C.lessonMigrate = {};

C.lessons[0] = [
{
 id:"0.1", title:"Trước khi học: CTAL-TA là gì, thi thế nào", en:"About CTAL-TA and the exam", los:[], minutes:15,
 example:"Bạn đã có CTFL và làm tester được một thời gian. Bạn biết viết test case, biết phân vùng tương đương, nhưng khi gặp form vay vốn có điều kiện “thu nhập ≥ 10 triệu VÀ nợ/thu nhập < 40%”, bạn không chắc nên thử những điểm nào. Khi sếp hỏi “sprint này chạy lại test nào là đủ?”, bạn trả lời theo cảm tính. CTAL-TA dạy bạn trả lời những câu đó có phương pháp.",
 blocks:[
  {t:"p",v:"**CTAL-TA v4.0** (Certified Tester Advanced Level – Test Analyst) dành cho người muốn đi sâu vào **phân tích và thiết kế kiểm thử**. Test Analyst (TA) là vai trò tập trung vào **nhu cầu nghiệp vụ** của khách hàng hơn là kỹ thuật: chủ yếu kiểm thử chức năng, góp phần vào kiểm thử phi chức năng hướng người dùng (usability, adaptability, installability, interoperability), dùng kỹ thuật hộp đen và kinh nghiệm thay vì hộp trắng, và giúp **phòng ngừa khiếm khuyết**."},
  {t:"h",v:"Điều kiện dự thi"},
  {t:"list",v:["Có chứng chỉ **CTFL** (ưu tiên v4.0, bản cũ hơn vẫn được).","Có đủ kinh nghiệm thực tế – tiêu chí cụ thể do Member Board hoặc đơn vị tổ chức thi quy định.","Bản v3.1 đã ngừng thi tiếng Anh từ 16/5/2026 (ngôn ngữ khác: 16/11/2026). Hãy học bản **v4.0**."]},
  {t:"h",v:"Cấu trúc đề thi"},
  {t:"table",head:["","CTFL v4.0.1","CTAL-TA v4.0"],rows:[
   ["Số câu","40","**45**"],["Tổng điểm","40 (mỗi câu 1 điểm)","**78** (điểm theo mức K)"],["Điểm đạt","26 (65%)","**51** (65%)"],
   ["Thời gian","60 phút (+25%)","**120 phút** (+25% = 150 phút nếu thi bằng ngôn ngữ không phải tiếng mẹ đẻ)"],
   ["Mức K","K1–K3","**K2–K4** (không có K1)"]]},
  {t:"table",head:["Mức nhận thức","Ý nghĩa","Điểm mỗi câu","Số câu trong đề mẫu"],rows:[
   ["K2 – Hiểu","Giải thích, phân biệt, tóm tắt, nêu ví dụ","1","22 câu"],
   ["K3 – Áp dụng","Dùng kỹ thuật trên tình huống cụ thể: tính điểm biên, đếm ca, viết charter…","2","17 câu"],
   ["K4 – Phân tích","Phân tích tình huống phức tạp để chọn phương án tốt nhất","3","6 câu"]]},
  {t:"tip",v:"Chương 3 chiếm **22/45 câu và 42/78 điểm**. Học kỹ chương 3 là con đường ngắn nhất để đạt. Câu K3/K4 ăn 2–3 điểm, nhưng cũng lâu hơn: hãy làm câu K2 nhanh (dưới 1 phút) để dành thời gian."},
  {t:"h",v:"Câu “chọn HAI”"},
  {t:"p",v:"Một số câu yêu cầu chọn **hai** đáp án trong năm phương án. Phải chọn đúng cả hai mới được điểm. Trên The QA Lab, câu loại này có nhãn **Chọn 2** và bạn chọn đủ hai phương án rồi bấm Kiểm tra."},
  {t:"h",v:"Lộ trình học gợi ý (6–8 tuần, 1–2 giờ/ngày)"},
  {t:"steps",v:[["Tuần 1","Mục “Ôn lại CTFL”, chương 1 (vai trò TA, ca kiểm thử, oracle, dữ liệu, keyword)"],["Tuần 2","Chương 2 (rủi ro, chọn hồi quy) + bắt đầu chương 3.1 (domain, combinatorial)"],["Tuần 3–4","Chương 3.2–3.3 (CRUD, state transition, scenario, decision table, metamorphic). Làm hết bài tập có lời giải"],["Tuần 5","Chương 3.4–3.5 và chương 4"],["Tuần 6","Chương 5 (mô hình hóa, review, DDP, RCA)"],["Tuần 7–8","Thi thử ít nhất 3 đề, đạt ổn định từ 58/78 trở lên; ôn lại mọi câu sai"]]},
  {t:"trap",v:["Đừng mang thói quen CTFL “mỗi câu 1 điểm”: bỏ một câu K4 là mất 3 điểm.","Từ khóa trong đề luôn bằng tiếng Anh chuẩn ISTQB. Hãy học song song thuật ngữ tiếng Anh ở phần Thẻ ghi nhớ."]}
 ],
 summary:["CTAL-TA v4.0: 45 câu, 78 điểm, đạt 51, 120 phút (+25%).","K2 = 1 điểm, K3 = 2 điểm, K4 = 3 điểm; có câu chọn hai.","Chương 3 chiếm gần nửa đề: 22 câu, 42 điểm.","Cần có CTFL; học bản v4.0, bản v3.1 đã ngừng thi tiếng Anh."],
 terms:[["test analyst","chuyên viên phân tích kiểm thử"],["learning objective (LO)","mục tiêu học tập"],["K-level","mức nhận thức"]]
},
{
 id:"0.2", title:"Ôn lại CTFL: những gì CTAL-TA dùng lại", en:"CTFL refresher", los:[], minutes:20,
 example:"Ô “Số tiền chuyển” chấp nhận 10.000–50.000.000 đ. Ở CTFL, bạn chia 3 vùng (dưới, hợp lệ, trên) và thử biên 9.999 / 10.000 / 50.000.000 / 50.000.001. CTAL-TA đi tiếp: nếu điều kiện có hai biến (“số tiền ≤ số dư VÀ số tiền ≤ hạn mức còn lại”) thì sao? Đó là domain testing. Nhưng trước hết bạn cần nhớ chắc phần nền tảng dưới đây.",
 blocks:[
  {t:"p",v:"Syllabus CTAL-TA nhiều lần viết “xem ISTQB-CTFL v4.0.1, mục …”. Nghĩa là đề có thể giả định bạn đã thuộc các khái niệm này. Mục này **không có câu hỏi riêng**, nhưng thiếu nó bạn sẽ khó hiểu chương 1–3."},
  {t:"h",v:"Bảy hoạt động kiểm thử – TA làm bốn"},
  {t:"table",head:["Hoạt động","Câu hỏi","Ai chính"],rows:[
   ["Lập kế hoạch","Mục tiêu, phạm vi, cách tiếp cận?","Test manager (TA hỗ trợ)"],["Giám sát và điều khiển","Đang đúng kế hoạch không?","Test manager"],
   ["**Phân tích**","Kiểm thử **cái gì**? (điều kiện kiểm thử)","**TA**"],["**Thiết kế**","Kiểm thử **thế nào**? (ca kiểm thử)","**TA**"],
   ["**Triển khai**","Đã sẵn sàng chạy chưa? (thủ tục, dữ liệu, môi trường)","**TA**"],["**Thực thi**","Chạy, so sánh, báo lỗi","**TA**"],["Hoàn tất","Tổng kết, bài học","Test manager"]]},
  {t:"h",v:"Kỹ thuật hộp đen ở CTFL"},
  {t:"list",v:["**Phân vùng tương đương (EP)**: chia miền giá trị thành vùng được xử lý giống nhau; mỗi vùng ít nhất một ca.","**Phân tích giá trị biên (BVA)**: thử ngay tại biên và sát biên (2 giá trị hoặc 3 giá trị).","**Bảng quyết định**: mỗi cột là một quy tắc (tổ hợp điều kiện → hành động); bao phủ = cột khả thi đã thử / tổng cột khả thi.","**Chuyển đổi trạng thái**: bao phủ mọi trạng thái, mọi chuyển đổi hợp lệ (0-switch), mọi chuyển đổi kể cả không hợp lệ."]},
  {t:"lab",kind:"bva"},
  {t:"h",v:"Rủi ro"},
  {t:"p",v:"**Mức rủi ro = khả năng xảy ra × tác động.** Rủi ro sản phẩm gắn với chất lượng sản phẩm (tính năng tính sai tiền); rủi ro dự án gắn với việc quản lý dự án (thiếu người). Kiểm thử dựa trên rủi ro ưu tiên công sức theo mức rủi ro."},
  {t:"h",v:"Kiểm thử xác nhận và hồi quy"},
  {t:"compare",l:{h:"Confirmation testing",q:"Lỗi vừa sửa đã hết chưa?",v:["Chạy lại đúng ca đã thất bại","Ngay sau khi sửa"]},r:{h:"Regression testing",q:"Thay đổi có làm hỏng chỗ khác không?",v:["Chạy các ca ở vùng có thể bị ảnh hưởng","Chương 2 CTAL-TA dạy cách CHỌN ca hồi quy"]}},
  {t:"tip",v:"Nếu thấy hổng phần nào, chuyển sang chứng chỉ CTFL trên The QA Lab và học lại chương 4 (kỹ thuật) và 5.2 (rủi ro) trước khi vào chương 3 của CTAL-TA."}
 ],
 summary:["TA làm 4 hoạt động: phân tích (cái gì), thiết kế (thế nào), triển khai (sẵn sàng), thực thi (chạy).","EP, BVA, bảng quyết định, chuyển đổi trạng thái là nền cho chương 3.","Rủi ro = khả năng × tác động; kiểm thử dựa trên rủi ro ưu tiên theo mức rủi ro.","Xác nhận: lỗi đã hết chưa; hồi quy: có hỏng chỗ khác không."],
 terms:[["test condition","điều kiện kiểm thử"],["equivalence partitioning","phân vùng tương đương"],["boundary value analysis","phân tích giá trị biên"],["confirmation testing","kiểm thử xác nhận"]]
}
];

C.lessons[1] = [
{
 id:"1.1.1", title:"TA trong các vòng đời phát triển", en:"Testing in the Software Development Lifecycle", los:["TA-1.1.1"], minutes:20,
 example:"Cùng một tester, ba dự án. Dự án A làm phần mềm kế toán cho cơ quan nhà nước theo mô hình chữ V: tháng 1–2 cô ấy hỗ trợ lập kế hoạch, tháng 3 phân tích tài liệu yêu cầu, tháng 6 mới có bản chạy để test. Dự án B làm app bán hàng theo từng gói: mỗi 6 tuần một increment, mỗi lần cô làm trọn phân tích → thực thi và phải gom lại bộ hồi quy. Dự án C làm sản phẩm mới theo Scrum, sprint 2 tuần, yêu cầu đổi liên tục: cô ngồi cùng PO và dev hằng ngày, sửa test liên tục.",
 blocks:[
  {t:"p",v:"Foundation mô tả hai vai trò: **quản lý kiểm thử** và **kiểm thử**. CTAL-TA gọi người trong vai trò kiểm thử phụ trách **khía cạnh nghiệp vụ** là **Test Analyst (TA)**. Hiếm khi có chức danh riêng, nhưng nhiệm vụ và năng lực thì rõ ràng."},
  {t:"table",head:["Khía cạnh","Trọng tâm của TA"],rows:[["Cấp độ kiểm thử","Kiểm thử hệ thống, kiểm thử chấp nhận, kiểm thử tích hợp hệ thống"],["Đặc tính chất lượng","Tính phù hợp chức năng; usability, adaptability, installability, interoperability"],["Kỹ thuật","Hộp đen, dựa trên kinh nghiệm (hộp trắng là của TTA)"]]},
  {t:"h",v:"Ba kiểu SDLC, ba cách tham gia"},
  {t:"table",head:["Mô hình","Đặc điểm","TA làm gì"],rows:[
   ["**Tuần tự** (thác nước, chữ V)","Giai đoạn nối tiếp, ít chồng lấn","Việc thay đổi theo thời gian: đầu kỳ hỗ trợ **lập kế hoạch** → **phân tích** khi test basis đang được viết → **thiết kế, triển khai** song song với thiết kế, lập trình → cuối kỳ **thực thi** và hỗ trợ hoàn tất"],
   ["**Tăng dần** (incremental)","Chia phần mềm thành các phần nhỏ, mỗi phần phát triển và kiểm thử độc lập","Lặp đủ các hoạt động cho **mỗi increment**, có thể tổ chức khác nhau. Tập trung vào tính năng mới/thay đổi. Rủi ro hồi quy tăng → chú ý **refactor và ghép bộ hồi quy**"],
   ["**Lặp** (iterative)","Chu kỳ: làm mẫu, kiểm thử, tinh chỉnh, triển khai lặp lại","Vai trò **năng động, thích nghi**; cộng tác chặt với dev và đại diện nghiệp vụ; sửa điều kiện và ca theo sản phẩm; góp ý cải tiến quy trình mỗi vòng. **Lặp càng dày, bảo trì bộ hồi quy càng quan trọng**"]]},
  {t:"p",v:"SDLC thực tế thường **kết hợp** nhiều mô hình (Agile = lặp + tăng dần). Khi đó cách TA tham gia phụ thuộc đặc điểm cụ thể của sự kết hợp."},
  {t:"tip",v:"Thực hành tốt chung cho **mọi** mô hình: TA tham gia **ngay từ các giai đoạn đầu** của SDLC."},
  {t:"trap",v:["Trong mô hình tuần tự, TA không “ngồi chờ có code”: phân tích bắt đầu khi test basis **đang được tạo ra**.","Từ khóa của mô hình tăng dần là **regression risk → refactoring + assembly of regression test suites**; của mô hình lặp là **dynamic, adaptive**."]}
 ],
 summary:["TA = vai trò kiểm thử phụ trách khía cạnh nghiệp vụ; tập trung kiểm thử hệ thống, chấp nhận, tích hợp hệ thống.","Tuần tự: việc của TA đổi theo giai đoạn, phân tích bắt đầu khi test basis đang hình thành.","Tăng dần: lặp đủ hoạt động cho mỗi increment, chú ý refactor và ghép bộ hồi quy.","Lặp: năng động, thích nghi; lặp càng dày bộ hồi quy càng quan trọng.","Mọi mô hình: TA tham gia từ sớm."],
 terms:[["sequential development model","mô hình phát triển tuần tự"],["incremental development model","mô hình tăng dần"],["iterative development model","mô hình lặp"],["regression test suite","bộ kiểm thử hồi quy"]]
},
{
 id:"1.2.1", title:"Nhiệm vụ trong phân tích kiểm thử", en:"Test Analysis", los:["TA-1.2.1"], minutes:20,
 example:"User story: “Là khách hàng, tôi muốn đặt lịch chuyển tiền định kỳ hằng tháng”. Trong buổi refinement, TA hỏi: “Ngày 31 thì sao với tháng 2?”, “Nếu số dư không đủ thì thử lại mấy lần?”. Đó là kiểm tra test basis có đủ không và tìm khiếm khuyết trong đó. Sau buổi họp, TA ghi điều kiện mức cao “Lịch định kỳ – ngày đặc biệt”, rồi chi tiết “Lịch ngày 31 chạy vào ngày cuối tháng với tháng 30 ngày”, gắn với tiêu chí chấp nhận và rủi ro “chuyển sai ngày” mức cao.",
 blocks:[
  {t:"p",v:"Phân tích kiểm thử trả lời câu hỏi **“kiểm thử cái gì?”**. Đầu ra chính là **điều kiện kiểm thử** đã được ưu tiên và truy vết được."},
  {t:"h",v:"Tiêu chí đầu vào TA kiểm tra"},
  {t:"list",v:["Đã lập kế hoạch kiểm thử: **phạm vi, mục tiêu, cách tiếp cận** rõ ràng.","**Test basis** (yêu cầu, user story…) đã được xác định.","Các **rủi ro sản phẩm** đã nhận diện được đánh giá và ghi nhận nếu cần."]},
  {t:"h",v:"Các nhiệm vụ chính"},
  {t:"steps",v:[["Kiểm tra độ đầy đủ của test basis","Thu thập thêm thông tin, kể cả thông tin nói miệng (ví dụ khi cùng viết user story). Thay đổi test basis có thể dẫn tới điều chỉnh phạm vi cùng test manager"],["Đánh giá test basis","Tìm khiếm khuyết, đánh giá khả năng kiểm thử, phản hồi sớm cho product owner. Có thể **mô hình hóa** hành vi (chương 3, 5.2.1) và **review** (5.2.2). Khiếm khuyết chưa sửa ngay phải được ghi nhận"],["Xác định test oracle cần thiết","Biết lấy kết quả mong đợi từ đâu (mục 1.3.4)"],["Định nghĩa và ưu tiên điều kiện kiểm thử","Cho từng test item trong phạm vi; gắn với mục tiêu kiểm thử; **truy vết** tới test basis; phạm vi và trọng tâm theo **rủi ro sản phẩm**. Trong mô hình lặp/tăng dần: xác định phạm vi hồi quy bằng **phân tích tác động**"],["Review điều kiện với bên liên quan","Đảm bảo hiểu đúng test basis và khớp mục tiêu kiểm thử"]]},
  {t:"h",v:"Đi từ mức cao xuống chi tiết"},
  {t:"compare",l:{h:"Điều kiện mức cao",q:"“Chức năng của màn hình X”",v:["Có ngay khi user story còn thô","Giúp không bỏ sót vùng nào"]},r:{h:"Điều kiện chi tiết",q:"“Màn hình X từ chối số tài khoản thiếu một chữ số”",v:["Thêm dần khi yêu cầu rõ hơn","Đủ cụ thể để thiết kế ca"]}},
  {t:"p",v:"Làm theo từng bước giúp **bao phủ đầy đủ** và **bắt đầu thiết kế sớm**, kể cả với user story còn cần tinh chỉnh. Trong Agile, điều kiện kiểm thử có thể được viết dưới dạng **tiêu chí chấp nhận** phản ánh rủi ro của user story."},
  {t:"trap",v:["Xác định test oracle thuộc **phân tích**, không phải thực thi.","Smoke test môi trường, sắp xếp test suite thuộc **triển khai**; ghi kết quả thực tế thuộc **thực thi**."]}
 ],
 summary:["Phân tích = kiểm thử cái gì; đầu ra là điều kiện kiểm thử đã ưu tiên, truy vết được.","Tiêu chí đầu vào: đã lập kế hoạch, test basis đã xác định, rủi ro đã đánh giá.","TA đánh giá test basis (mô hình hóa, review), ghi nhận khiếm khuyết, xác định test oracle.","Điều kiện theo rủi ro; lặp/tăng dần dùng phân tích tác động cho phạm vi hồi quy.","Đi từ điều kiện mức cao đến chi tiết để bao phủ đủ và thiết kế sớm; review với bên liên quan."],
 terms:[["test basis","cơ sở kiểm thử"],["testability","khả năng kiểm thử"],["entry criteria","tiêu chí đầu vào"],["acceptance criteria","tiêu chí chấp nhận"]]
},
{
 id:"1.2.2", title:"Nhiệm vụ trong thiết kế kiểm thử", en:"Test Design", los:["TA-1.2.2"], minutes:20,
 example:"Với điều kiện “Lịch ngày 31 chạy vào ngày cuối tháng”, TA viết ca mức cao cho phần ổn định (“lịch ngày 31, tháng 30 ngày → chạy ngày 30”) và để dữ liệu cụ thể cho bước triển khai. Với tính năng thanh toán hóa đơn đã có từ trước, TA không viết mới mà chọn lại 12 ca hồi quy hiện có theo ưu tiên. Ca nào cũng ghi rõ tiêu chí đạt/trượt, liên kết tới điều kiện và user story, kèm yêu cầu “giả lập ngân hàng đích” và “tài khoản có số dư đủ/không đủ”.",
 blocks:[
  {t:"p",v:"Thiết kế kiểm thử trả lời **“kiểm thử thế nào?”**, thường bằng **ca kiểm thử**. Cách làm phụ thuộc: mức bao phủ cần đạt, test basis, SDLC, ràng buộc dự án, kiến thức và kinh nghiệm của tester."},
  {t:"h",v:"Các nhiệm vụ chính"},
  {t:"list",v:["Quyết định vùng nào dùng **ca mức thấp**, vùng nào dùng **ca mức cao** (mục 1.3.1). Dù loại nào cũng phải có **tiêu chí đạt/trượt rõ ràng**.","Thiết kế ca cho điều kiện **mới hoặc thay đổi** theo các tiêu chí chất lượng (mục 1.3.2).","Với **hồi quy**: thường chỉ cần **chọn** ca mức cao hiện có hoặc **điều chỉnh** ca mức thấp hiện có theo ưu tiên.","Ghi nhận **truy vết** test basis ↔ điều kiện ↔ ca kiểm thử.","Định nghĩa **yêu cầu môi trường** (1.3.3) và xác định, tạo, đặc tả **yêu cầu dữ liệu** (1.3.5)."]},
  {t:"h",v:"Khi nào thiết kế đủ?"},
  {t:"p",v:"Dùng **tiêu chí thoát** từ kế hoạch. Ngoài ra, **mức rủi ro còn lại** hoặc **ràng buộc dự án** (ngân sách, thời gian) cũng cho biết lúc có thể dừng."},
  {t:"h",v:"Ca kiểm thử là công cụ giao tiếp"},
  {t:"p",v:"Ca kiểm thử không phải lúc nào cũng do tác giả chạy. Người khác cần hiểu **cách chạy**, **mục tiêu** (điều kiện nền tảng) và **tầm quan trọng** của nó. Developer có thể hiện thực hoặc chạy lại khi lỗi; **auditor** có thể phải phê duyệt."},
  {t:"tip",v:"Thiết kế có thể dùng công cụ hỗ trợ nhưng nên **độc lập với công cụ và công nghệ**. Thiết kế có hệ thống (dùng kỹ thuật) hoặc ad hoc. Trong kiểm thử dựa trên kinh nghiệm, ca không phải lúc nào cũng được viết ra; điều kiện kiểm thử có thể dẫn dắt việc thực thi."},
  {t:"trap",v:["“Thiết kế phải luôn tạo ca mức thấp” – sai.","Dừng thiết kế không chỉ dựa vào tiêu chí thoát trong kế hoạch: rủi ro còn lại và ràng buộc dự án cũng được tính."]}
 ],
 summary:["Thiết kế = kiểm thử thế nào, chủ yếu bằng ca kiểm thử.","Chọn ca mức cao hay mức thấp theo vùng; luôn có tiêu chí đạt/trượt rõ.","Hồi quy: chọn hoặc điều chỉnh ca có sẵn theo ưu tiên là thường đủ.","Ghi truy vết; đặc tả yêu cầu môi trường và dữ liệu.","Dừng theo tiêu chí thoát, rủi ro còn lại hoặc ràng buộc dự án; thiết kế độc lập công cụ, dễ hiểu với người khác."],
 terms:[["test design","thiết kế kiểm thử"],["exit criteria","tiêu chí thoát"],["residual risk","rủi ro còn lại"],["pass/fail criteria","tiêu chí đạt/trượt"]]
},
{
 id:"1.2.3", title:"Nhiệm vụ trong triển khai kiểm thử", en:"Test Implementation", los:["TA-1.2.3"], minutes:20,
 example:"Thứ Sáu trước ngày chạy test, TA ghép 40 ca thành 3 thủ tục: “Tạo lịch định kỳ”, “Chạy lịch tới hạn”, “Hủy lịch”. Thủ tục 2 phải chạy sau thủ tục 1 vì cần lịch đã tạo. Mỗi thủ tục có bước nạp dữ liệu tài khoản từ kho dữ liệu, bước chỉnh đồng hồ hệ thống sang ngày 31, bước kiểm tra số dư, và bước reset cơ sở dữ liệu. Sáng thứ Hai, TA chạy smoke test 5 phút: đăng nhập, xem số dư, tạo một lịch – tất cả đạt, môi trường sẵn sàng.",
 blocks:[
  {t:"p",v:"Triển khai kiểm thử chuẩn bị **mọi testware cần cho thực thi**. Câu hỏi: **“Đã sẵn sàng chạy chưa?”**"},
  {t:"h",v:"Các nhiệm vụ chính"},
  {t:"table",head:["Nhiệm vụ","Chi tiết"],rows:[
   ["Tổ chức thủ tục và kịch bản","Gom vào **test suite**; gợi ý ca nên tự động hóa"],
   ["Định nghĩa thủ tục kiểm thử","Xác định ràng buộc, phụ thuộc ảnh hưởng **thứ tự chạy**. Ngoài các bước của ca, thủ tục có bước **thiết lập điều kiện tiên quyết** (nạp dữ liệu), **kiểm tra kết quả và hậu điều kiện**, **reset** (cơ sở dữ liệu, môi trường, hệ thống)"],
   ["Ưu tiên","Theo tiêu chí ưu tiên từ **phân tích rủi ro và lập kế hoạch**; chọn thủ tục chạy trên **phiên bản hiện tại** để chạy chung (tính năng mới, hồi quy)"],
   ["Cập nhật truy vết","Test basis ↔ thủ tục, kịch bản, suite"],
   ["Hỗ trợ lịch thực thi","Giúp test manager xác định thứ tự chạy, phân bổ nguồn lực"],
   ["Chuẩn bị dữ liệu","Tạo dữ liệu đầu vào và dữ liệu môi trường **phù hợp mục đích** (fit for purpose)"],
   ["Xác nhận môi trường sẵn sàng","Tốt nhất bằng **smoke test**"]]},
  {t:"p",v:"Môi trường tốt phải: **làm lộ khiếm khuyết** khi chạy test, **hoạt động bình thường** khi không có sự cố, và **mô phỏng đủ** môi trường production hoặc người dùng cuối nếu cần."},
  {t:"p",v:"Mức chi tiết của triển khai phụ thuộc mức chi tiết của điều kiện và ca. Trong lĩnh vực có quy định (ví dụ hàng không, RTCA DO-178C), testware còn phải là **bằng chứng tuân thủ**."},
  {t:"trap",v:["Smoke test để xác nhận môi trường thuộc **triển khai**, không phải thực thi.","Ưu tiên ở triển khai dựa trên **tiêu chí từ phân tích rủi ro và lập kế hoạch**, không phải theo sở thích của tester."]}
 ],
 summary:["Triển khai = chuẩn bị mọi testware cho thực thi.","Thủ tục = bước của ca + thiết lập tiền điều kiện + kiểm tra kết quả, hậu điều kiện + reset.","Xác định phụ thuộc và thứ tự chạy; ưu tiên theo rủi ro và kế hoạch; chọn cái chạy trên phiên bản hiện tại.","Tạo dữ liệu phù hợp mục đích; xác nhận môi trường bằng smoke test.","Môi trường tốt: lộ được lỗi, chạy ổn khi không lỗi, mô phỏng đủ production."],
 terms:[["test procedure","thủ tục kiểm thử"],["test suite","bộ kiểm thử"],["smoke test","kiểm thử khói"],["test execution schedule","lịch thực thi kiểm thử"]]
},
{
 id:"1.2.4", title:"Nhiệm vụ trong thực thi kiểm thử", en:"Test Execution", los:["TA-1.2.4"], minutes:20,
 example:"Đêm qua pipeline báo 7 test tự động đỏ. Sáng nay TA chạy tay lại: 4 test đạt – do môi trường giả lập ngân hàng bị khởi động lại lúc 2 giờ sáng (dương tính giả). 3 test còn lại cùng đỏ ở bước tính phí, TA phân tích và thấy cả ba do cùng một khiếm khuyết. Cô báo 1 lỗi, cập nhật truy vết để dashboard cho thấy điều kiện “phí chuyển liên ngân hàng” đang trượt, ghi chú rằng module phí có 5 lỗi trong 2 sprint – cần test thêm – và đề xuất bổ sung 2 ca vào bộ hồi quy.",
 blocks:[
  {t:"p",v:"Thực thi chạy theo **lịch thực thi**. Việc điển hình: chạy test, so sánh thực tế với mong đợi, **phân tích bất thường**, báo khiếm khuyết, ghi kết quả."},
  {t:"h",v:"TA chạy gì?"},
  {t:"p",v:"TA chạy **tay**: kiểm thử thăm dò (có thể theo phiên với test charter, mục 3.4.1), thủ tục kiểm thử, hồi quy, xác nhận. TA cũng có thể chạy script tự động, nhưng chạy và phân tích automation khi thất bại có thể là việc của dev, TAE hoặc TTA."},
  {t:"h",v:"Phân tích bất thường"},
  {t:"p",v:"Bất thường có thể do khiếm khuyết trong đối tượng kiểm thử, **nhưng cũng có thể do**: thiếu điều kiện tiên quyết, dữ liệu sai, lỗi trong script hoặc môi trường, hiểu sai đặc tả. TA ghi kết quả thực tế, thông báo khiếm khuyết dựa trên sự cố quan sát được và báo cáo khi cần."},
  {t:"h",v:"Cập nhật truy vết theo kết quả"},
  {t:"p",v:"Truy vết cho phép biến kết quả kiểm thử thành **thông tin rủi ro và bao phủ mức cao** để bên liên quan ra quyết định, ví dụ bao nhiêu ca của một điều kiện đã đạt hay trượt."},
  {t:"h",v:"Đánh giá kết quả – 6 việc thêm"},
  {t:"list",v:["Nhận ra **cụm khiếm khuyết** → cần test thêm vùng đó (5.3.1).","**Chạy tay lại test tự động bị thất bại** để chắc automation không cho dương tính giả.","Đề xuất **test bổ sung** từ những gì học được.","Nhận diện **rủi ro mới** từ thông tin khi chạy.","Đề xuất cải tiến **thiết kế, triển khai** (ví dụ thủ tục) hoặc thậm chí **hệ thống**.","Đề xuất cải tiến **bộ hồi quy**: refactor, điều chỉnh phạm vi, tự động hóa (2.2)."]},
  {t:"trap",v:["“Mọi bất thường đều là lỗi phần mềm” – sai.","Dương tính giả (false positive) = test báo lỗi nhưng phần mềm không lỗi. Chạy tay lại là cách syllabus nêu để loại trừ."]}
 ],
 summary:["Thực thi: chạy, so sánh, phân tích bất thường, báo khiếm khuyết, ghi kết quả.","TA chủ yếu chạy tay: thăm dò, thủ tục, hồi quy, xác nhận.","Bất thường có thể do tiền điều kiện, dữ liệu, script, môi trường hoặc hiểu sai đặc tả.","Cập nhật truy vết để chuyển kết quả thành thông tin rủi ro, bao phủ.","Đánh giá: cụm lỗi, chạy tay lại test tự động đỏ, đề xuất test và rủi ro mới, cải tiến testware và bộ hồi quy."],
 terms:[["anomaly","bất thường"],["false-positive result","kết quả dương tính giả"],["defect cluster","cụm khiếm khuyết"],["test log","nhật ký kiểm thử"]]
},
{
 id:"1.3.1", title:"Ca kiểm thử mức cao và mức thấp", en:"High-Level and Low-Level Test Cases", los:["TA-1.3.1"], minutes:20,
 example:"Ca mức cao: “Đặt hơn một cuốn sách, tổng tiền đạt ngưỡng giảm giá; mong đợi: được giảm giá”. Ca mức thấp từ nó: “Đặt sách B1 (100.000 đ) và B2 (200.000 đ), tổng 300.000 đ; mong đợi: giảm 10%, thanh toán 270.000 đ”. Một ca mức cao có thể thành nhiều ca mức thấp: thêm “đặt B1 và B3, tổng đúng 300.000 đ” để thử biên.",
 blocks:[
  {t:"compare",l:{h:"Ca mức cao (high-level)",q:"Còn gọi: abstract / logical test case",v:["Cho biết điều kiện nào được kiểm thử, trong hoàn cảnh nào","Tiền điều kiện, đầu vào, kết quả mong đợi, hậu điều kiện ở **mức trừu tượng**","Tốt để đảm bảo phủ đủ điều kiện","Dễ bảo trì, linh hoạt khi chạy"]},r:{h:"Ca mức thấp (low-level)",q:"Còn gọi: concrete / physical test case",v:["Chi tiết hóa ca mức cao","Dữ liệu cần chuẩn bị, hành động cụ thể, kết quả mong đợi **cụ thể**","Có tiền điều kiện, đầu vào, kết quả, hậu điều kiện **cụ thể**","Ai cũng chạy lại được y hệt, hợp tự động hóa"]}},
  {t:"h",v:"Từ cao xuống thấp"},
  {t:"list",v:["Thường TA thiết kế ca mức cao trước, làm nền cho ca mức thấp. **Một ca mức cao → một hoặc nhiều ca mức thấp.**","Có khi ca giữ ở mức cao, TA tự quyết giá trị cụ thể lúc chạy, ví dụ làm mục tiêu trong **test charter** (3.4.1).","Chuyển từ cao xuống thấp **không chỉ là điền số**: đó là bước **từ khái niệm sang kỹ thuật**, thường dời từ thiết kế sang **triển khai**, nhất là khi cần dữ liệu cụ thể. TA phải chắc mọi thứ cần để chạy ca mức thấp đều đã biết.","Thực tế nhiều ca là **lai**: cụ thể chỗ này, trừu tượng chỗ khác, do **đánh đổi giữa khả năng bảo trì và tính dễ hiểu**."]},
  {t:"worked",title:"Phân loại ca kiểm thử",given:"Xếp mỗi mô tả vào mức cao, mức thấp hoặc lai: (1) “Đăng nhập bằng tài khoản bị khóa; mong đợi: bị từ chối”. (2) “Đăng nhập user=lan.nguyen, mật khẩu=Abc@1234, tài khoản khóa lúc 09:00 hôm nay; mong đợi: thông báo ‘Tài khoản đã bị khóa, liên hệ 1900 xxxx’, không tạo phiên”. (3) “Đăng nhập user=lan.nguyen với mật khẩu bất kỳ sai 3 lần; mong đợi: bị khóa”.",steps:["(1) Không có giá trị cụ thể nào → mức cao.","(2) Đủ dữ liệu, trạng thái, thông báo chính xác → mức thấp.","(3) User cụ thể nhưng mật khẩu và nội dung thông báo để trừu tượng → lai."],answer:"(1) mức cao, (2) mức thấp, (3) lai."},
  {t:"trap",v:["Ca mức cao vẫn phải có **tiêu chí đạt/trượt rõ** – chỉ là ở mức trừu tượng.","“Một ca mức cao chỉ thành đúng một ca mức thấp” – sai."]}
 ],
 summary:["Ca mức cao (abstract/logical): nêu điều kiện được kiểm thử, giá trị ở mức trừu tượng; tốt cho bao phủ.","Ca mức thấp (concrete/physical): dữ liệu, hành động, kết quả, tiền/hậu điều kiện cụ thể.","Một ca mức cao → một hoặc nhiều ca mức thấp; có thể giữ mức cao cho test charter.","Chuyển từ cao xuống thấp là bước từ khái niệm sang kỹ thuật, thường dời sang triển khai.","Ca lai phổ biến do đánh đổi bảo trì và dễ hiểu."],
 terms:[["high-level test case","ca kiểm thử mức cao"],["low-level test case","ca kiểm thử mức thấp"],["abstract / logical test case","ca trừu tượng / logic"],["concrete / physical test case","ca cụ thể / vật lý"]]
},
{
 id:"1.3.2", title:"Tiêu chí chất lượng của ca kiểm thử", en:"Quality Criteria for Test Cases", los:["TA-1.3.2"], minutes:25,
 example:"Một đội có 3.000 ca kiểm thử nhưng chẳng ai dám xóa ca nào: nhiều ca trùng nhau, có ca ghi “nhập dữ liệu phù hợp”, có ca dài 60 bước kiểm tra cả đăng nhập lẫn xuất hóa đơn. Mỗi release họ mất 2 tuần chỉ để cập nhật test. Áp 9 tiêu chí chất lượng giúp họ giảm còn 1.800 ca, dễ hiểu và dễ bảo trì hơn.",
 blocks:[
  {t:"p",v:"Bỏ qua chất lượng ca kiểm thử dẫn tới chi phí bảo trì cao, khó hiểu, chậm thực thi. **9 tiêu chí** là bước đầu để có ca dễ bảo trì:"},
  {t:"table",head:["Tiêu chí","Nghĩa","Dấu hiệu vi phạm"],rows:[
   ["**Correctness** – Đúng","Kiểm tra chính xác điều kiện nền tảng","Kết quả mong đợi sai so với yêu cầu"],
   ["**Feasibility** – Khả thi","Phải chạy được","Cần dữ liệu không thể tạo, môi trường không có"],
   ["**Necessity** – Cần thiết","Mỗi ca một mục tiêu rõ (thể hiện ở tên/tóm tắt); tránh trùng; không thiết kế cho thứ không cần test","Hai ca giống hệt nhau"],
   ["**Understandability** – Dễ hiểu","Người khác review, sửa, chạy được; ngôn ngữ và định dạng mọi bên hiểu, không giải thích điều hiển nhiên; ca phức tạp thì tách","Chỉ tác giả hiểu"],
   ["**Traceability** – Truy vết","Truy tới điều kiện, yêu cầu, rủi ro để cập nhật","Không biết ca phục vụ yêu cầu nào"],
   ["**Consistency** – Nhất quán","Thống nhất ngôn ngữ, định dạng, cấu trúc; có thể dùng glossary","Ca gọi “khách hàng”, ca gọi “user”, ca gọi “người mua”"],
   ["**Precision** – Chính xác","Chỉ **một cách hiểu**; tránh “phù hợp”, “khi cần”, “vài”","Gây dương tính / âm tính giả"],
   ["**Completeness** – Đầy đủ","Đủ thuộc tính (ISO/IEC/IEEE 29119-3), có dữ liệu và kết quả mong đợi rõ","Thiếu kết quả mong đợi"],
   ["**Conciseness** – Ngắn gọn","Độ chi tiết tương ứng test basis; ưu tiên ca nhỏ tập trung ít mục bao phủ","Ca 60 bước, lỗi bước 5 chặn mọi kiểm tra sau"]]},
  {t:"p",v:"Ca nhỏ được ưa chuộng vì: dễ tìm nguyên nhân sự cố, ghép linh hoạt thành thủ tục và suite, và một sự cố **không chặn** các test khác."},
  {t:"tip",v:"Định dạng và mức chi tiết của ca phụ thuộc bối cảnh dự án, sản phẩm và **nên được thống nhất trong đội**."},
  {t:"worked",title:"Bắt lỗi ca kiểm thử",given:"Ca TC-17: “Tiêu đề: Kiểm tra thanh toán. Bước: đăng nhập, thêm vài sản phẩm, thanh toán bằng thẻ phù hợp, kiểm tra hóa đơn, đổi mật khẩu, đăng xuất. Kết quả: hệ thống chạy ổn.” Chỉ ra ít nhất 4 tiêu chí bị vi phạm.",steps:["“vài sản phẩm”, “thẻ phù hợp”, “chạy ổn” → vi phạm **precision**.","Không có kết quả mong đợi cụ thể, không có dữ liệu → vi phạm **completeness**.","Gộp thanh toán, hóa đơn, đổi mật khẩu → vi phạm **conciseness** (và tiêu đề không phản ánh mục tiêu → **necessity**).","Không gắn với yêu cầu hay rủi ro → vi phạm **traceability**."],answer:"Precision, completeness, conciseness, necessity, traceability. Nên tách thành ít nhất 2 ca (thanh toán, đổi mật khẩu), ghi dữ liệu và kết quả cụ thể, gắn ID yêu cầu."}
 ],
 summary:["9 tiêu chí: đúng, khả thi, cần thiết, dễ hiểu, truy vết, nhất quán, chính xác, đầy đủ, ngắn gọn.","Precision: chỉ một cách hiểu, tránh từ mơ hồ → tránh dương tính, âm tính giả.","Necessity: mục tiêu rõ, không trùng lặp.","Conciseness: ưu tiên ca nhỏ; lỗi một ca không chặn ca khác.","Định dạng và mức chi tiết thống nhất trong đội theo bối cảnh."],
 terms:[["precision","tính chính xác (một cách hiểu)"],["conciseness","tính ngắn gọn"],["necessity","tính cần thiết"],["feasibility","tính khả thi"]]
},
{
 id:"1.3.3", title:"Yêu cầu môi trường kiểm thử", en:"Test Environment Requirements", los:["TA-1.3.3"], minutes:20,
 example:"Kiểm thử hệ thống app ví điện tử cần: 2 máy chủ ứng dụng giống production nhưng 1/4 cấu hình, giả lập Napas (vì Napas thật không có môi trường test), 5 điện thoại thật Android/iOS, VPN vào mạng test, và quyền admin để đổi giờ hệ thống. Mỗi hạng mục được ghi: mã ENV-03, mô tả, ai cung cấp (đội hạ tầng), cần từ 1/12 đến 20/12, và độ trung thực: “giả lập chỉ trả mã thành công/thất bại, không mô phỏng độ trễ thật”.",
 blocks:[
  {t:"p",v:"Môi trường kiểm thử là **yếu tố thành công then chốt** cho cả test tay lẫn tự động: ảnh hưởng khả năng kiểm thử, phát hiện lỗi, chi phí và **độ tin cậy kết quả**. Lý tưởng: một ca đạt hay trượt trong môi trường test thì cũng cho kết quả y vậy ở production; môi trường ổn định, dự đoán được, tích hợp framework automation nếu cần."},
  {t:"h",v:"TA xây yêu cầu môi trường từ ba nguồn phân tích"},
  {t:"list",v:["**Điều kiện, ca kiểm thử và yêu cầu dữ liệu** → điều kiện cần để dựng và duy trì môi trường, đảm bảo tiền điều kiện của thực thi.","**Cấp độ và loại kiểm thử** → đánh đổi giữa **sự linh hoạt** và **độ giống production** (kiểm thử chấp nhận cần giống thật hơn).","**Tính sẵn có và độc lập** của thành phần, hệ thống → có thể cần **test double** (stub, driver)."]},
  {t:"p",v:"Hạng mục môi trường có nhiều loại: phần cứng, middleware, phần mềm, dịch vụ ảo hóa, mạng, giao diện, công cụ, bảo mật, cấu hình, địa điểm."},
  {t:"h",v:"Thông tin cho mỗi hạng mục (ISO/IEC/IEEE 29119-3)"},
  {t:"table",head:["Thuộc tính","Ý nghĩa"],rows:[["Unique identifier","Định danh duy nhất, phục vụ truy vết"],["Description","Mô tả đủ chi tiết để dựng đúng"],["Responsibility","Ai chịu trách nhiệm cung cấp"],["Period needed","Cần khi nào, trong bao lâu"],["Fidelity","Mức độ hạng mục đại diện hoặc **lệch** khỏi production"]]},
  {t:"p",v:"Yêu cầu còn phải nêu nhu cầu chung: thiết lập, **sao lưu và khôi phục**, bảo mật, khả năng thay đổi môi trường, vai trò và phân quyền."},
  {t:"tip",v:"Viết rõ, gọn, mạch lạc; dùng sơ đồ, bảng; tham chiếu môi trường có sẵn và chỉ nêu nhu cầu riêng của cấp kiểm thử. Bên liên quan (dev, TTA, TAE, BA, sponsor, PO) cần review, phê duyệt, cập nhật."}
 ],
 summary:["Môi trường quyết định độ tin cậy kết quả; lý tưởng là kết quả giống production.","Nguồn yêu cầu: điều kiện/ca/dữ liệu; cấp và loại kiểm thử (linh hoạt vs giống thật); tính sẵn có (test double).","Mỗi hạng mục: định danh, mô tả, trách nhiệm, thời gian cần, độ trung thực (fidelity).","Nhu cầu chung: thiết lập, sao lưu và khôi phục, bảo mật, thay đổi, phân quyền.","Viết gọn, dùng bảng/sơ đồ, được bên liên quan review và phê duyệt."],
 terms:[["test environment item","hạng mục môi trường kiểm thử"],["fidelity","độ trung thực"],["test double","đối tượng thay thế (stub, driver…)"],["service virtualization","ảo hóa dịch vụ"]]
},
{
 id:"1.3.4", title:"Xác định test oracle", en:"Determining Test Oracles", los:["TA-1.3.4"], minutes:25,
 example:"Ngân hàng chuyển hệ thống tính lãi từ COBOL sang Java. Không ai có “đáp án đúng” cho 2 triệu khoản vay, nhưng hệ thống cũ vẫn chạy: chạy cùng dữ liệu qua cả hai rồi so – đó là pseudo-oracle. Ở dự án khác, chatbot AI trả lời khác nhau mỗi lần: không có kết quả mong đợi duy nhất – bài toán oracle; đội dùng metamorphic testing (hỏi cùng ý theo hai cách, câu trả lời phải nhất quán) và chuyên gia nghiệp vụ chấm mẫu (oracle con người).",
 blocks:[
  {t:"p",v:"**Test oracle** là nguồn xác định kết quả mong đợi trong kiểm thử động. Lý tưởng là test basis cung cấp (đặc tả văn bản hoặc hình thức). Kinh nghiệm, hiểu biết của con người cũng là oracle. Oracle **tự động** có thể cần vì chi phí (đầu vào sinh tự động, oracle con người đắt)."},
  {t:"h",v:"Bài toán test oracle"},
  {t:"p",v:"Khi **không có oracle hiệu quả về chi phí** do test basis kém hoặc đặc điểm hệ thống. Yếu tố điển hình: **dữ liệu phức tạp**, **không tất định** (ví dụ AI), **hành vi xác suất**, **yêu cầu thiếu hoặc mơ hồ**."},
  {t:"h",v:"Năm lời giải (Barr et al., 2014)"},
  {t:"table",head:["Lời giải","Cách làm","Lưu ý"],rows:[
   ["**Pseudo-oracle**","Hệ thống phát triển độc lập thỏa cùng đặc tả (hệ thống cũ, bản đơn giản) để so","Tự làm cho hệ thống phức tạp thì đắt, nhưng phổ biến với hệ thống quan trọng"],
   ["**Model-based testing**","Hình thức hóa oracle trong mô hình; sinh kết quả mong đợi và test từ mô hình","Kỹ thuật dựa trên hành vi thường kèm oracle tự động"],
   ["**Property-based testing**","Dùng thuộc tính đã đặc tả để kiểm tra quan hệ giữa đầu vào và kết quả của từng ca","Rất hợp tự động hóa; hiệu quả phụ thuộc quan hệ, có thể khó xác định"],
   ["**Metamorphic testing**","Quan hệ giữa ca nguồn và ca theo sau (mục 3.3.2)","Dùng được cả khi không biết kết quả từng ca"],
   ["**Human oracle**","Con người quyết định kết quả mong đợi","Đắt và khan hiếm, nhưng được ưa chuộng trong exploratory testing"]]},
  {t:"compare",l:{h:"Property-based",q:"Kiểm tra từng ca với một thuộc tính",v:["Sắp xếp: kết quả tăng dần và cùng phần tử với đầu vào","Một ca, một kiểm tra"]},r:{h:"Metamorphic",q:"Kiểm tra quan hệ giữa hai hay nhiều ca",v:["Hoán vị đầu vào thì kết quả sắp xếp không đổi","Cần ca nguồn và ca theo sau"]}},
  {t:"p",v:"**Assertion** có thể đặt trong code automation hoặc ngay trong đối tượng kiểm thử để làm oracle tự động: câu lệnh thực thi được kiểm tra trạng thái, hành vi. Khi đặt trong đối tượng kiểm thử, chúng thường chỉ kiểm tra **những gì cần để tiếp tục tác vụ**."},
  {t:"trap",v:["Có hệ thống cũ cùng đặc tả → nghĩ ngay tới **pseudo-oracle**.","AI, không tất định, không có đáp án chính xác → bài toán oracle → **metamorphic** hoặc **oracle con người**."]}
 ],
 summary:["Test oracle là nguồn kết quả mong đợi: test basis, con người, oracle tự động.","Bài toán oracle: không có oracle hiệu quả chi phí – do dữ liệu phức tạp, không tất định (AI), xác suất, yêu cầu thiếu.","Lời giải: pseudo-oracle, model-based, property-based, metamorphic, human oracle.","Property-based kiểm tra từng ca theo thuộc tính; metamorphic kiểm tra quan hệ giữa các ca.","Assertion trong code test hoặc trong đối tượng kiểm thử làm oracle tự động."],
 terms:[["test oracle","nguồn đối chiếu kết quả"],["pseudo-oracle","hệ thống đối chứng"],["property-based testing","kiểm thử dựa trên thuộc tính"],["assertion","khẳng định"]]
},
{
 id:"1.3.5", title:"Yêu cầu dữ liệu kiểm thử", en:"Test Data Requirements", los:["TA-1.3.5"], minutes:25,
 example:"Đội test app bảo hiểm cần dữ liệu khách hàng. Dùng thẳng bản sao production? Vi phạm Luật Bảo vệ dữ liệu cá nhân. Họ bí danh hóa: thay tên, CCCD bằng mã giả nhưng vẫn giữ quan hệ giữa hợp đồng và bồi thường. Với tính năng mới chưa có dữ liệu thật, họ sinh dữ liệu tổng hợp theo 4 persona: sinh viên, công nhân, chủ doanh nghiệp, người về hưu. Hợp đồng “sắp hết hạn” được tạo tương đối theo ngày chạy để không bị “lão hóa” sau một tháng.",
 blocks:[
  {t:"p",v:"Khi thiết kế, TA xác định và yêu cầu dữ liệu cần chuẩn bị hoặc cấp phát. Cân nhắc **mục đích, định dạng, bối cảnh sử dụng** (ISO/IEC/IEEE 29119-3, mục 8.5). Mười khía cạnh chính:"},
  {t:"table",head:["Khía cạnh","Nội dung"],rows:[
   ["**Giống production**","Dữ liệu thật phản ánh thực tế nhưng có thể thiếu đa dạng. Dữ liệu **tổng hợp** cho phép kiểm soát biến thiên, phải phản ánh mẫu, phân phối, giá trị ngoại lai, nhưng có thể bỏ sót lỗi chỉ xảy ra với dữ liệu thật. Chưa có production → tổng hợp theo kịch bản thực tế; **persona** giúp tạo dữ liệu đa dạng"],
   ["**Bảo mật**","Dữ liệu nhạy cảm cần bảo vệ. **Bí danh hóa** (pseudonymized): thay thông tin cá nhân bằng định danh nhân tạo. **Ẩn danh hóa** (anonymized): xóa thông tin định danh. Tuân thủ GDPR, HIPAA…"],
   ["**Mục đích**","Quyết định tiền điều kiện và kết quả mong đợi, trạng thái và cấu hình hệ thống (ngày giờ hệ thống), quyền người dùng, quan hệ giữa sản phẩm, phòng ban, danh mục"],
   ["**Tiêu chí bao phủ**","Khớp tiêu chí của kỹ thuật đã chọn; cần cả dữ liệu **không hợp lệ** cho kiểm thử âm"],
   ["**Định dạng**","Quản lý có hệ thống (API) có thể cần dữ liệu có cấu trúc: CSV, JSON, XML, cơ sở dữ liệu"],
   ["**Truy vết**","Giúp bảo trì dữ liệu khi ca thay đổi"],
   ["**Bảo trì**","Tránh **ghi cứng** dữ liệu trong ca mức thấp; **tách logic kiểm thử khỏi dữ liệu**"],
   ["**Phụ thuộc**","Dữ liệu phụ thuộc cần chuỗi bước để tạo (đơn hàng cần khách hàng, sản phẩm trước)"],
   ["**Sẵn có**","**Ảo hóa dịch vụ** bù dữ liệu thiếu bằng cách mô phỏng dịch vụ vắng mặt"],
   ["**Nhạy thời gian, lão hóa**","Dữ liệu lỗi thời hoặc phụ thuộc thời gian có thể làm hệ thống phản ứng bất ngờ"]]},
  {t:"trap",v:["Bí danh hóa vẫn có thể liên kết lại (có định danh nhân tạo); ẩn danh hóa thì xóa hẳn khả năng định danh.","Dữ liệu tổng hợp không thay thế hoàn toàn dữ liệu thật: có lỗi chỉ lộ ra với dữ liệu thật."]},
  {t:"tip",v:"Mẹo nhớ 10 khía cạnh: “Giống – Kín – Đích – Phủ – Dạng – Vết – Bảo – Phụ – Có – Thời”."}
 ],
 summary:["TA xác định, yêu cầu dữ liệu theo mục đích, định dạng, bối cảnh sử dụng.","Production thật nhưng ít biến thiên; tổng hợp kiểm soát được, dùng persona khi chưa có production.","Bí danh hóa thay bằng định danh nhân tạo; ẩn danh hóa xóa định danh; tuân thủ GDPR/HIPAA.","Khớp tiêu chí bao phủ, có dữ liệu không hợp lệ; dữ liệu có cấu trúc cho API.","Không ghi cứng, tách logic khỏi dữ liệu; lưu ý phụ thuộc, ảo hóa dịch vụ, dữ liệu lão hóa."],
 terms:[["synthetic data","dữ liệu tổng hợp"],["pseudonymized data","dữ liệu bí danh hóa"],["anonymized data","dữ liệu ẩn danh hóa"],["persona","chân dung người dùng"]]
},
{
 id:"1.3.6", title:"Viết kịch bản bằng keyword-driven testing", en:"Developing Test Scripts Using Keyword-Driven Testing", los:["TA-1.3.6"], minutes:40,
 example:"Phòng gym có user story “Là hội viên, tôi muốn xác thực để vào cửa” với tiêu chí “thẻ hội viên hợp lệ dùng để xác thực được”. TA đặt keyword hành động “Authenticate Member” (tham số: thẻ) và keyword kiểm tra “Verify Access”. Kịch bản: Authenticate Member(thẻ còn hạn) → Verify Access(được vào). Kỹ sư automation hiện thực “Authenticate Member” bằng các keyword tầng thấp “Scan Card”, “Read Response”. Khi máy quét đổi model, chỉ tầng thấp phải sửa; kịch bản của TA giữ nguyên.",
 blocks:[
  {t:"p",v:"Với keyword-driven testing, **TA viết kịch bản bằng keyword**; **hiện thực** kịch bản là việc của **TTA, TAE hoặc developer**. TA xác định keyword bằng cách phân tích test basis hoặc cộng tác với bên liên quan."},
  {t:"h",v:"Hai loại keyword"},
  {t:"compare",l:{h:"Action keyword – hành động",q:"Tương tác với…",v:["Đối tượng kiểm thử: chạy chức năng, gửi dữ liệu, điều hướng","Môi trường: thiết lập cấu hình, bật giả lập","Hệ thống khác: kích hoạt giao diện"]},r:{h:"Verification keyword – kiểm tra",q:"Assertion",v:["So kết quả thực tế với mong đợi","Ví dụ: Verify Balance, Verify Access, Verify Message"]}},
  {t:"h",v:"Tầng trừu tượng"},
  {t:"table",head:["Tầng","Đặc điểm","Ví dụ"],rows:[["**Domain layer** – nghiệp vụ","Hành động nghiệp vụ, thuật ngữ miền, ẩn chi tiết kỹ thuật","Transfer Funds, Borrow Book"],["(Tầng trung gian – tùy chọn)","Hỗ trợ bảo trì","Fill Transfer Form"],["**Test interface layer** – giao diện kiểm thử","Thấp nhất; giao tiếp với đối tượng, môi trường, hệ thống khác qua giao diện kiểm thử","Click Button(id), Send Request(endpoint)"]]},
  {t:"p",v:"Keyword có thể **nguyên tử** hoặc **ghép** từ keyword khác. Cấu trúc và tầng là **hai thuộc tính độc lập**, nhưng keyword ghép thường ở tầng cao, keyword nguyên tử thường ở tầng giao diện kiểm thử."},
  {t:"h",v:"6 quy tắc đặt keyword"},
  {t:"list",v:["Có **động từ** (+ danh từ)","Động từ ở dạng **mệnh lệnh** (Create Order, không phải Order Creation)","**Nghĩa duy nhất** (không có hai keyword làm cùng một việc)","Được **tài liệu hóa** đầy đủ","Phản ánh **từ vựng nghiệp vụ**","**Tái sử dụng** được"]},
  {t:"h",v:"Nhiệm vụ của TA"},
  {t:"list",v:["Đặc tả keyword và tham số","Đặc tả **keyword test case** (kịch bản dùng keyword), dạng danh sách hoặc bảng","Đặc tả bước bổ sung: tiền điều kiện, kiểm tra, dọn môi trường sau test","Bảo trì kịch bản theo thay đổi của đối tượng kiểm thử","Chạy kịch bản keyword (tự động hoặc tay)","Phân tích kịch bản thất bại để tìm nguyên nhân"]},
  {t:"worked",title:"Viết kịch bản keyword cho tiêu chí chấp nhận",given:"User story: “Là khách hàng, tôi muốn chuyển tiền cho người nhận đã lưu”. Tiêu chí: “Chuyển vượt số dư thì bị từ chối và số dư không đổi”. Có sẵn: Log In(user), Select Saved Recipient(tên), Transfer Funds(số tiền), Verify Message(nội dung), Verify Balance(số tiền). Viết kịch bản cho tài khoản có số dư 2.000.000 đ.",steps:["Tiền điều kiện: Log In(khach01) – tài khoản có số dư 2.000.000 đ (dữ liệu chuẩn bị trước).","Hành động: Select Saved Recipient(“Mẹ”) → Transfer Funds(2.000.001).","Kiểm tra: Verify Message(“Số dư không đủ”) → Verify Balance(2.000.000).","Nhận xét: cần thêm keyword dọn dẹp? Giao dịch bị từ chối nên không cần; nếu thiếu keyword nào khi viết, TA đặc tả ngay."],answer:"Log In(khach01) → Select Saved Recipient(“Mẹ”) → Transfer Funds(2.000.001) → Verify Message(“Số dư không đủ”) → Verify Balance(2.000.000). Vừa có hành động vừa có kiểm tra, đúng tầng nghiệp vụ, dùng giá trị biên (số dư + 1)."},
  {t:"tip",v:"Keyword-driven là cách tiếp cận automation, nhưng **test tay cũng hưởng lợi**: viết theo keyword từ đầu giúp chuyển sang tự động sau này dễ dàng."},
  {t:"trap",v:["TA **không** code keyword.","“Click btnSubmit” là tầng giao diện kiểm thử – không hợp làm keyword nghiệp vụ.","Kịch bản thiếu keyword kiểm tra thì không biết đạt hay trượt."]}
 ],
 summary:["TA đặc tả keyword và viết kịch bản keyword; TTA/TAE/dev hiện thực.","Keyword hành động tương tác với đối tượng, môi trường, hệ thống khác; keyword kiểm tra là assertion.","Ít nhất hai tầng: nghiệp vụ và giao diện kiểm thử; keyword ghép thường ở tầng cao.","Quy tắc: động từ (+ danh từ), mệnh lệnh, nghĩa duy nhất, có tài liệu, từ vựng nghiệp vụ, tái sử dụng.","Tránh keyword dư thừa để giảm bảo trì; test tay cũng hưởng lợi."],
 terms:[["keyword-driven testing","kiểm thử hướng từ khóa"],["action keyword","từ khóa hành động"],["verification keyword","từ khóa kiểm tra"],["domain layer","tầng nghiệp vụ"],["test interface layer","tầng giao diện kiểm thử"]]
},
{
 id:"1.3.7", title:"Công cụ quản lý testware", en:"Tools Applied in Managing the Testware", los:["TA-1.3.7"], minutes:15,
 example:"Release 5.2 lỗi ở màn hình thanh toán. TA mở Jira/Xray: lọc ca theo phiên bản đặc tả 5.2, thấy ca TC-88 đạt ở bản 5.1 nhưng trượt ở 5.2 – điểm lỗi xuất hiện nằm giữa hai bản. Từ ca đó, cô lần ra yêu cầu REQ-41 (trong công cụ quản lý yêu cầu) vừa đổi, và lỗi BUG-310 (trong công cụ quản lý lỗi) đã được báo. Dữ liệu thẻ test lấy từ công cụ quản lý dữ liệu đã che số thẻ.",
 blocks:[
  {t:"p",v:"Quản lý testware bằng công cụ giúp TA nắm trạng thái sản phẩm công việc, hỗ trợ giám sát và điều khiển. Khi có sự cố, công cụ cho phép **xem kết quả các lần chạy trước** và phân tích **thời điểm khiếm khuyết xuất hiện**."},
  {t:"table",head:["Loại công cụ","Chức năng"],rows:[
   ["**Quản lý kiểm thử**","Kho chứa mọi testware (điều kiện, ca, script, suite, lần chạy); truy vết (ma trận truy vết), tìm ca, lên lịch chạy, ghi kết quả, báo cáo tiến độ và chất lượng"],
   ["**Quản lý khiếm khuyết**","Ghi nhận, ưu tiên, theo dõi xử lý khiếm khuyết"],
   ["**Quản lý dữ liệu kiểm thử**","Tạo, duy trì dữ liệu, kể cả **bảo vệ dữ liệu nhạy cảm**"],
   ["**Quản lý cấu hình**","Hỗ trợ hoạt động kiểm thử trong phát triển, phát hành, vận hành; quản lý cấu hình và tính sẵn có của môi trường"],
   ["**Quản lý yêu cầu**","Chứa, theo dõi yêu cầu mức cao: định nghĩa rõ, có phiên bản, truy vết suốt SDLC"]]},
  {t:"h",v:"TA hỗ trợ quản lý testware bằng cách"},
  {t:"list",v:["Phân tích dự án, release để chọn **đúng tập testware** (đặc tả đúng phiên bản của SUT)","Định cấu trúc tổ chức ca trong công cụ: theo **chức năng** (tính năng, module) hoặc **kỹ thuật** (loại test, môi trường)","Thêm **metadata** (công sức thực thi, môi trường cần)","Đảm bảo **truy vết** yêu cầu ↔ điều kiện ↔ test ↔ lần chạy ↔ khiếm khuyết","Chọn đúng **suite hồi quy** (tay, tự động)","**Quản lý cấu hình ca**, nhận diện ca lỗi thời"]}
 ],
 summary:["Công cụ quản lý testware hỗ trợ giám sát, điều khiển, tra lịch sử kết quả để biết lỗi xuất hiện khi nào.","5 loại: quản lý kiểm thử, khiếm khuyết, dữ liệu kiểm thử, cấu hình, yêu cầu.","Quản lý dữ liệu kiểm thử gồm bảo vệ dữ liệu nhạy cảm.","TA: chọn đúng tập testware theo phiên bản, định cấu trúc, thêm metadata, đảm bảo truy vết.","TA chọn suite hồi quy và quản lý cấu hình ca, loại ca lỗi thời."],
 terms:[["test management tool","công cụ quản lý kiểm thử"],["defect management tool","công cụ quản lý khiếm khuyết"],["traceability matrix","ma trận truy vết"],["metadata","siêu dữ liệu"]]
}
];

C.lessons[2] = [
{
 id:"2.1.1", title:"Đóng góp của TA vào phân tích rủi ro sản phẩm", en:"Risk Analysis", los:["TA-2.1.1"], minutes:35,
 example:"Ví điện tử chuẩn bị thêm “trả góp 0%”. Test manager tổ chức workshop rủi ro. TA góp ý: “Lần đổi phí trước, lịch sử giao dịch hiển thị sai số dư” và đề xuất phỏng vấn đội CSKH. Khi chấm điểm, TA không chấm chung cả tính năng mà tách: tính lãi (rủi ro cao – tần suất lớn, thiệt hại tài chính), màn hình giới thiệu (thấp), gửi SMS nhắc nợ (trung bình – yêu cầu pháp lý). Với rủi ro “tính lãi sai”, TA đề xuất review công thức ngay từ user story (dịch trái) và bảng quyết định ở kiểm thử hệ thống.",
 blocks:[
  {t:"p",v:"**Kiểm thử dựa trên rủi ro** ưu tiên công sức theo mức rủi ro của test item. **Test manager quyết định** cách tiếp cận; **TA đóng vai trò tích cực** khi triển khai. Gồm phân tích rủi ro, kiểm soát rủi ro, và **giám sát rủi ro định kỳ** (vì rủi ro thay đổi theo thời gian; vòng lặp: khoảng một lần mỗi iteration). TA cập nhật **risk register** theo thay đổi và điều chỉnh biện pháp giảm thiểu."},
  {t:"p",v:"TA thường có **hiểu biết riêng về hệ thống**, kinh nghiệm và trực giác về **cái gì hay hỏng, tác động ra sao, test cách nào giảm được** – nên là bên liên quan giá trị trong phân tích rủi ro sản phẩm."},
  {t:"h",v:"Nhận diện rủi ro"},
  {t:"list",v:["Góp kinh nghiệm, kiến thức trong **retrospective, workshop rủi ro, brainstorming**, tạo **checklist**.","**Phỏng vấn** bên liên quan để hiểu rủi ro nào họ coi là quan trọng nhất."]},
  {t:"h",v:"Đánh giá rủi ro – TA cùng bên liên quan ước lượng"},
  {t:"list",v:["Tần suất sử dụng và độ quan trọng của tính năng bị ảnh hưởng","Độ quan trọng của mục tiêu kinh doanh bị ảnh hưởng","Thiệt hại tài chính, môi trường, danh tiếng","**Chất lượng của test basis**","Nhu cầu pháp lý hoặc an toàn"]},
  {t:"p",v:"TA giúp **phân loại** rủi ro theo đặc tính chất lượng bị ảnh hưởng (ví dụ mô hình ISO/IEC 25010:2023). Rủi ro **không phân bố đều** → chia đối tượng thành **test item** (thành phần, giao diện, tính năng) và đánh giá từng cái."},
  {t:"h",v:"Đề xuất hoạt động giảm thiểu"},
  {t:"p",v:"Với mỗi rủi ro, TA đề xuất hoạt động kiểm thử (tĩnh hoặc động) phù hợp, chỉ ra **cấp độ, loại, kỹ thuật, mức độc lập, độ kỹ lưỡng** cần thiết. Theo **shift left**, TA chỉ ra hoạt động nào giảm rủi ro **sớm nhất** để tối thiểu công sức."},
  {t:"lab",kind:"risk"},
  {t:"trap",v:["Ai **quyết định** dùng kiểm thử dựa trên rủi ro? Test manager. TA **triển khai tích cực**.","“Chất lượng test basis” là yếu tố đánh giá rủi ro – test basis kém thì rủi ro cao hơn.","Câu “chọn HAI yếu tố” hay có phương án gây nhiễu như lương dev, số tester, kinh nghiệm test manager."]}
 ],
 summary:["Test manager quyết định cách tiếp cận dựa trên rủi ro; TA triển khai tích cực, cập nhật risk register.","Nhận diện: retrospective, workshop, brainstorming, checklist, phỏng vấn.","Đánh giá: tần suất dùng và độ quan trọng, mục tiêu kinh doanh, thiệt hại, chất lượng test basis, pháp lý/an toàn.","Phân loại theo ISO 25010; rủi ro không đều thì đánh giá theo từng test item.","Đề xuất hoạt động kiểm thử phù hợp và sớm nhất (shift left)."],
 terms:[["product risk","rủi ro sản phẩm"],["risk identification","nhận diện rủi ro"],["risk assessment","đánh giá rủi ro"],["risk register","sổ đăng ký rủi ro"],["risk monitoring","giám sát rủi ro"]]
},
{
 id:"2.2.1", title:"Phân tích tác động để xác định phạm vi hồi quy", en:"Risk Control · Regression Test Selection", los:["TA-2.2.1"], minutes:55,
 example:"Sprint 14, dev sửa hàm làm tròn tiền trong module thanh toán. Bộ hồi quy có 1.200 test tự động (chạy mất 9 giờ) và 300 test tay (mất 5 ngày). Chu kỳ chỉ có 2 ngày. Với test tự động, công cụ phân tích tác động chọn 140 test chạm vào module thanh toán. Với test tay, TA kết hợp: ma trận truy vết (yêu cầu làm tròn liên quan hóa đơn và hoàn tiền), lịch sử (bộ test hoàn tiền từng bắt lỗi khi đổi làm tròn), và operational profile (luồng mua hàng phổ biến nhất). Sau sprint, cô xem kỹ thuật nào bắt được lỗi để giữ lại.",
 blocks:[
  {t:"p",v:"**Kiểm soát rủi ro = giảm thiểu + giám sát.** TA hiểu chức năng và rủi ro nên quan trọng trong các biện pháp giảm thiểu (CTFL 5.2.4): thực hiện **review** (5.2.2), áp dụng **kỹ thuật và mức bao phủ** phù hợp (3.5), áp dụng **loại kiểm thử** phù hợp (chương 4), và **kiểm thử hồi quy** (mục này)."},
  {t:"h",v:"Vì sao phải chọn test hồi quy?"},
  {t:"p",v:"Mục tiêu hồi quy: **tự tin về chất lượng sau thay đổi**. Nhưng thường không chạy hết được (thời gian, ngân sách, môi trường, dữ liệu) – chủ yếu với test tay, nhưng cả test tự động khi chu kỳ ngắn và test chạy lâu. Phải **rà phạm vi hồi quy mỗi chu kỳ**; có thể phải điều chỉnh bộ hồi quy."},
  {t:"compare",l:{h:"Test tự động",q:"Kỹ thuật đáng tin cậy nhất",v:["**Phân tích tác động có công cụ hỗ trợ**","Dựa trên quản lý cấu hình tự động: ghi lại hạng mục cấu hình nào được kích hoạt khi chạy mỗi test","Khi có thay đổi: chọn test tương tác với hạng mục đã đổi → tập trung nơi dễ có sự cố nhất"]},r:{h:"Test tay",q:"Không có kỹ thuật vượt trội rõ ràng",v:["Kết quả phụ thuộc nhiều yếu tố (Engström et al., 2010)","TA chọn kỹ thuật theo tình huống","Thường **kết hợp** nhiều kỹ thuật"]}},
  {t:"h",v:"Sáu kỹ thuật chọn hồi quy thường dùng"},
  {t:"table",head:["Kỹ thuật","Cách chọn","Dùng khi"],rows:[
   ["**Risk-based**","Bộ hồi quy truy vết tới risk register; khi thay đổi làm cập nhật rủi ro, điều chỉnh để phủ **mức rủi ro cao nhất**","Có risk register được duy trì"],
   ["**History-based**","Test từng **lộ lỗi** hoặc **nhạy với thay đổi tương tự**; thêm vài test **lâu chưa chạy** để chắc vẫn đạt","Có dữ liệu lịch sử chạy"],
   ["**Coverage-based**","Ít test nhất mà đạt **bao phủ cao nhất** theo kỹ thuật đã chọn; cân bằng số test với mức tăng bao phủ","Có mô hình bao phủ"],
   ["**Requirement traceability matrix**","Đánh giá tác động của thay đổi yêu cầu; chọn test cho phần **bị ảnh hưởng trực tiếp và tính năng liên quan** (tác dụng phụ). Agile: test phủ tiêu chí chấp nhận bị ảnh hưởng","Yêu cầu mới/đổi ảnh hưởng gián tiếp tính năng cũ"],
   ["**Operational profile**","Theo **mẫu sử dụng** (đăng nhập → tìm → giỏ hàng → đặt hàng). Cho **cái nhìn nhanh toàn hệ thống** khi thay đổi lớn; quá nhiều thì ưu tiên mẫu thường dùng, quan trọng","Thay đổi lớn, cần tổng quan nhanh"],
   ["**Impact analysis**","Cũng dùng được cho test tay nếu TA biết test nào tương tác với hạng mục đã đổi","Biết ánh xạ test ↔ hạng mục cấu hình"]]},
  {t:"p",v:"Sau mỗi chu kỳ, TA **phân tích kết quả** để đánh giá hiệu quả kỹ thuật đã dùng (5.3.1): **giữ kỹ thuật hiệu quả, thay kỹ thuật kém** → cải tiến liên tục, đặc biệt quan trọng trong mô hình lặp và tăng dần."},
  {t:"worked",title:"Chọn phạm vi hồi quy (dạng K4)",given:"Thay đổi: sửa hạng mục cấu hình CI-3 (tính phí). Thông tin: T1 chạm CI-1, CI-3 – rủi ro cao; T2 chạm CI-2 – thấp; T3 chạm CI-3, CI-4 – trung bình; T4 chạm CI-4 – cao; T5 chạm CI-5 – thấp, 12 tháng chưa chạy; T6 chạm CI-3 – thấp, 3 lần gần nhất đều lộ lỗi khi đổi phí. (a) Chọn theo phân tích tác động. (b) Đội còn thời gian cho đúng 1 test nữa ngoài nhóm (a), lại muốn kiểm tra test lâu chưa chạy. Chọn test nào?",steps:["Phân tích tác động: chọn test tương tác với CI-3 → T1, T3, T6.","T4 rủi ro cao nhưng không chạm CI-3 – không thuộc phân tích tác động (chỉ thuộc risk-based nếu risk register đổi).","History-based còn khuyên thêm test lâu chưa chạy để chắc vẫn đạt → T5.","T6 vừa thuộc tác động vừa thuộc lịch sử → ưu tiên cao nhất trong nhóm (a)."],answer:"(a) T1, T3, T6 (T6 ưu tiên đầu). (b) T5 – tiêu chí history-based “test lâu chưa chạy”."},
  {t:"trap",v:["Đề hay cho bảng test – hạng mục – rủi ro – lịch sử. Đọc kỹ đề hỏi **kỹ thuật nào**: phân tích tác động chỉ nhìn **hạng mục bị đổi**, không nhìn mức rủi ro.","“Với test tay, luôn dùng X là tốt nhất” – sai, không có kỹ thuật vượt trội.","Ma trận truy vết yêu cầu: chọn cả phần **liên quan gián tiếp**, không chỉ phần đổi trực tiếp."]},
  {t:"tip",v:"Đây là LO mức **K4** (3 điểm, thường 2 câu). Luyện thói quen: gạch chân thay đổi gì → kỹ thuật đề yêu cầu → lọc bảng theo đúng tiêu chí của kỹ thuật đó."}
 ],
 summary:["Kiểm soát rủi ro = giảm thiểu + giám sát; TA góp qua review, kỹ thuật, loại kiểm thử, hồi quy.","Không chạy hết hồi quy được → phải chọn; rà phạm vi mỗi chu kỳ.","Test tự động: phân tích tác động có công cụ là đáng tin nhất.","Test tay: không có kỹ thuật vượt trội; kết hợp risk-based, history-based, coverage-based, ma trận truy vết, operational profile, phân tích tác động.","Sau mỗi chu kỳ giữ kỹ thuật hiệu quả, thay kỹ thuật kém."],
 terms:[["impact analysis","phân tích tác động"],["configuration item","hạng mục cấu hình"],["history-based testing","kiểm thử dựa trên lịch sử"],["operational profile","hồ sơ vận hành"],["requirement traceability matrix","ma trận truy vết yêu cầu"]]
}
];
})();
