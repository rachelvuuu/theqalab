/* The QA Lab – dữ liệu CTAL-TA v4.0 (Advanced Level Test Analyst).
   Nội dung và câu hỏi tự soạn dựa trên ISTQB® CTAL-TA Syllabus v4.0 (2025/05/02), không phải câu hỏi thi thật.
   Cấu trúc đề theo ISTQB: 45 câu, 78 điểm, đạt từ 51 điểm (65%), 120 phút (+25% nếu thi bằng ngôn ngữ không phải tiếng mẹ đẻ).
   Điểm mỗi câu theo mức nhận thức: K2 = 1 điểm, K3 = 2 điểm, K4 = 3 điểm. */
(function(){
window.QALAB = window.QALAB || {certs:{}};

const CHAPTERS = [
{n:1, title:"Nhiệm vụ của Test Analyst trong quy trình kiểm thử", time:225, exam:8,
 story:"Một ngân hàng làm tính năng “chuyển tiền định kỳ” theo Scrum. Ngay buổi viết user story, Test Analyst (TA) hỏi: “Nếu ngày chuyển rơi vào ngày 31 mà tháng chỉ có 30 ngày thì sao?” – đó là phân tích kiểm thử. TA viết ca kiểm thử mức cao (“chuyển định kỳ rơi vào ngày không tồn tại”), rồi mức thấp với số tài khoản, số tiền, ngày cụ thể. TA đặt yêu cầu môi trường (giả lập Napas), yêu cầu dữ liệu (tài khoản đã ẩn danh), viết kịch bản bằng keyword (“Tạo lệnh định kỳ”, “Kiểm tra số dư”) để đội automation hiện thực. Khi chạy, một test tự động đỏ – TA chạy tay lại và thấy lỗi nằm ở dữ liệu test chứ không ở phần mềm.",
 points:[
  "TA = người trong vai trò kiểm thử, phụ trách khía cạnh nghiệp vụ. Tập trung ở kiểm thử hệ thống, chấp nhận, tích hợp hệ thống; đặc tính: tính phù hợp chức năng + usability, adaptability, installability, interoperability.",
  "Tuần tự: TA đổi việc theo giai đoạn. Tăng dần: lặp lại đủ hoạt động cho mỗi increment, chú ý refactor và ghép bộ hồi quy. Lặp: thích nghi liên tục, lặp càng dày bộ hồi quy càng quan trọng. Mọi mô hình: tham gia từ sớm.",
  "TA tập trung 4 hoạt động: phân tích, thiết kế, triển khai, thực thi kiểm thử.",
  "Phân tích: kiểm tra test basis đủ chưa, tìm khiếm khuyết trong đó, xác định test oracle, định nghĩa và ưu tiên điều kiện kiểm thử truy vết được.",
  "Thiết kế: chọn ca mức cao hay mức thấp, tiêu chí đạt/trượt rõ, truy vết, yêu cầu môi trường và dữ liệu. Thiết kế độc lập công cụ.",
  "Triển khai: thủ tục kiểm thử (thiết lập, kiểm tra, dọn dẹp), ưu tiên theo rủi ro, chuẩn bị dữ liệu, smoke test môi trường.",
  "Thực thi: chạy, so sánh, phân tích bất thường (không phải lúc nào cũng do phần mềm), chạy tay lại test tự động bị đỏ để loại dương tính giả.",
  "9 tiêu chí chất lượng ca kiểm thử: đúng, khả thi, cần thiết, dễ hiểu, truy vết được, nhất quán, chính xác (một cách hiểu), đầy đủ, ngắn gọn.",
  "Bài toán test oracle và 5 lời giải: pseudo-oracle, MBT, property-based, metamorphic, oracle con người.",
  "Keyword-driven: TA đặc tả keyword hành động và keyword kiểm tra; tầng nghiệp vụ và tầng giao diện kiểm thử; keyword là động từ (+ danh từ), mệnh lệnh, duy nhất, tái sử dụng."
 ],
 traps:[
  "TA KHÔNG hiện thực (code) keyword – đó là việc của TTA, TAE hoặc dev. TA đặc tả keyword và viết kịch bản keyword.",
  "Ca mức cao không có giá trị cụ thể; ca mức thấp có. Chuyển từ cao xuống thấp không chỉ là điền số, mà là bước từ khái niệm sang kỹ thuật.",
  "Dữ liệu ẩn danh (anonymized) xóa thông tin định danh; dữ liệu bí danh (pseudonymized) thay bằng định danh nhân tạo.",
  "Smoke test là cách tốt nhất để xác nhận môi trường sẵn sàng – thuộc hoạt động triển khai, không phải thực thi."
 ],
 mnemonic:"9 tiêu chí ca kiểm thử: “Đúng – Khả – Cần – Hiểu – Vết – Nhất – Xác – Đủ – Gọn”."},
{n:2, title:"Nhiệm vụ của Test Analyst trong kiểm thử dựa trên rủi ro", time:90, exam:3,
 story:"App ví điện tử sắp thêm tính năng trả góp. Trong buổi workshop rủi ro, TA kể: “Lần trước đổi công thức phí, màn hình lịch sử giao dịch hiển thị sai số dư”. Rủi ro được đánh giá cao vì tần suất dùng lớn và thiệt hại tài chính. Hai tuần sau, dev sửa module tính phí. Không đủ thời gian chạy 1.200 test hồi quy, TA dùng công cụ phân tích tác động để chọn các test có chạm vào module vừa sửa, cộng thêm các test từng bắt lỗi ở những lần đổi tương tự.",
 points:[
  "Kiểm thử dựa trên rủi ro do test manager quyết định; TA đóng vai trò tích cực khi triển khai. Gồm phân tích rủi ro, kiểm soát rủi ro và giám sát rủi ro định kỳ.",
  "Nhận diện rủi ro: TA góp kinh nghiệm trong retrospective, workshop, brainstorming, checklist, phỏng vấn bên liên quan.",
  "Đánh giá rủi ro: tần suất sử dụng và độ quan trọng của tính năng, mục tiêu kinh doanh, thiệt hại tài chính/môi trường/danh tiếng, chất lượng test basis, yêu cầu pháp lý/an toàn.",
  "Rủi ro không đều → chia đối tượng kiểm thử thành test item và đánh giá từng cái. Đề xuất hoạt động kiểm thử giảm rủi ro sớm nhất (shift left).",
  "Kiểm soát rủi ro = giảm thiểu + giám sát. TA góp phần qua review, chọn kỹ thuật và mức bao phủ, chọn loại kiểm thử, kiểm thử hồi quy.",
  "Chọn test hồi quy: tự động → phân tích tác động bằng công cụ là đáng tin nhất. Thủ công → chưa có kỹ thuật vượt trội; kết hợp theo rủi ro, lịch sử, bao phủ, ma trận truy vết yêu cầu, operational profile, phân tích tác động.",
  "Sau mỗi chu kỳ: giữ kỹ thuật chọn hiệu quả, thay kỹ thuật kém."
 ],
 traps:[
  "Người QUYẾT ĐỊNH cách tiếp cận dựa trên rủi ro là test manager, không phải TA.",
  "Với test chạy tay, syllabus nói KHÔNG có bằng chứng kỹ thuật chọn hồi quy nào vượt trội – đáp án “luôn dùng X” thường sai.",
  "Operational profile cho cái nhìn nhanh về toàn hệ thống sau thay đổi lớn; history-based tận dụng test từng phát hiện lỗi với thay đổi tương tự."
 ],
 mnemonic:"6 cách chọn hồi quy: “Rủi – Sử – Phủ – Vết – Dùng – Động” (Rủi ro, lịch Sử, bao Phủ, truy Vết yêu cầu, cách Dùng/operational profile, tác Động)."},
{n:3, title:"Phân tích và thiết kế kiểm thử", time:615, exam:22,
 story:"Website bán vé máy bay: giá phụ thuộc tuổi hành khách và hạng ghế (domain testing tìm lỗi “<” thay vì “≤”); chạy trên nhiều trình duyệt × hệ điều hành × ngôn ngữ (pairwise); đơn đặt chỗ đi qua các trạng thái Giữ chỗ → Đã thanh toán → Đã xuất vé → Đã hoàn (state transition, 1-switch); luồng đặt vé có rẽ nhánh và vòng lặp thêm hành khách (scenario-based, simple loop); quy tắc hoàn vé chồng chéo (decision table và checksum); module gợi ý giá rẻ dùng AI nên không có đáp án chính xác (metamorphic: đổi chiều chặng bay thì khoảng cách không đổi). Phần còn lại do kinh nghiệm: test charter, checklist và crowd testing trên thiết bị thật.",
 points:[
  "Ba nhóm kỹ thuật hộp đen: dựa trên dữ liệu (domain, combinatorial, random), dựa trên hành vi (CRUD, state transition, scenario), dựa trên quy tắc (decision table, metamorphic).",
  "Domain testing: biên đóng (≤, ≥, =) có ON nằm trên biên; biên mở (<, >, ≠) có ON nằm trong vùng sát biên, OFF nằm trên biên. Simplified = ON + OFF mỗi biên; Reliable = ON + OFF + IN + OUT mỗi biên.",
  "Combinatorial: base choice (1 ca gốc + mỗi giá trị không gốc một ca) và pairwise (mọi cặp giá trị của mọi hai tham số). Khoảng 97% lỗi do 1–2 điều kiện tương tác.",
  "Random testing: không có tiêu chí bao phủ; thẩm định dùng operational profile, thẩm tra dùng phân phối không thiên lệch; cần oracle tự động.",
  "CRUD: kiểm thử tính đầy đủ (tĩnh: thực thể nào thiếu C/R/U/D) và tính nhất quán (động: các chức năng phối hợp đúng trên thực thể).",
  "State transition nâng cao: N-switch (N+1 chuyển đổi liên tiếp; 0-switch = mọi chuyển đổi hợp lệ) và round-trip (vòng lặp về trạng thái đầu, không trạng thái nào lặp lại).",
  "Scenario-based: activity diagram, use case (1 kịch bản chính, extension đạt mục tiêu, exception không đạt). Có vòng lặp → simple loop coverage: 0, 1, nhiều, tối đa lần.",
  "Decision table: rút gọn bằng “–”, review 4 tiêu chí (nhất quán, khả thi, đầy đủ, đúng), checksum để phát hiện thiếu hoặc chồng lấn. Rủi ro cao → không rút gọn.",
  "Metamorphic: quan hệ biến hình (MR) sinh ca theo sau từ ca nguồn; hữu ích khi có bài toán oracle, đặc biệt với hệ thống AI.",
  "Kinh nghiệm: test charter “Explore … with … to discover …”, checklist (read-do / do-confirm), crowd testing (đa môi trường, rẻ, nhưng chất lượng không đều, bảo mật).",
  "Chọn kỹ thuật theo mục tiêu, rủi ro, test basis, loại lỗi lặp lại, kinh nghiệm tester, SDLC, hợp đồng, quy định, ràng buộc dự án. Tự động hóa thiết kế test: nhiều lợi ích, nhưng có thể bỏ sót điều kiện không có trong mô hình."
 ],
 traps:[
  "Với biên MỞ (ví dụ x > 100), điểm OFF là chính 100 (nằm TRÊN biên), còn ON là 101 (với độ chính xác 1). Rất hay bị đảo.",
  "0-switch coverage = bao phủ mọi chuyển đổi hợp lệ, KHÔNG phải bao phủ mọi trạng thái.",
  "Checksum bằng nhau KHÔNG đảm bảo bảng rút gọn tương đương bảng gốc.",
  "Random testing và metamorphic testing không có độ đo bao phủ được công nhận làm tiêu chí thoát.",
  "Test charter KHÔNG chỉ định bộ test (test suite) sẽ chạy trong phiên.",
  "Crowd testing không thay thế TA dùng kỹ thuật kiểm thử."
 ],
 mnemonic:"3 nhóm hộp đen: “Dữ – Hành – Luật”: Dữ liệu (Domain, Combinatorial, Random), Hành vi (CRUD, State, Scenario), Luật (Decision table, Metamorphic)."},
{n:4, title:"Kiểm thử các đặc tính chất lượng", time:60, exam:4,
 story:"App đặt lịch khám bệnh: kiểm tra mọi chức năng trong yêu cầu đã có chưa (đầy đủ), giờ hẹn quy đổi múi giờ có đúng không (đúng đắn), bệnh nhân lớn tuổi có đặt được lịch trong vài bước không (phù hợp chức năng và usability). Ứng dụng phải chạy trên Android 12–15 và iOS 16–18 (adaptability), cài và cập nhật trơn tru, xin quyền camera hợp lý (installability), và gửi lịch hẹn sang hệ thống bệnh viện qua chuẩn HL7 FHIR (interoperability).",
 points:[
  "Dùng mô hình chất lượng ISO/IEC 25010:2023. Tính phù hợp chức năng có 3 đặc tính con.",
  "Functional completeness: mọi thứ được yêu cầu đã được hiện thực chưa? Kiểm tra sớm bằng review yêu cầu / thảo luận user story; truy vết là then chốt.",
  "Functional correctness: kết quả có đúng (chính xác, nhất quán) với đầu vào hợp lệ và không hợp lệ? Cần oracle tốt; dịch trái vào kiểm thử thành phần và tích hợp thành phần.",
  "Functional appropriateness: mọi thứ đã hiện thực có giúp người dùng hoàn thành nhiệm vụ? Review thiết kế giao diện, exploratory, collaboration-based.",
  "Usability gồm interaction capability, user experience, accessibility. TA góp phần vào usability review, usability test session, bảng hỏi (SUMI, WAMMI). WCAG có 3 mức A, AA, AAA.",
  "Flexibility (portability): TA tập trung adaptability (môi trường đích, tổ hợp → combinatorial) và installability (cài, gỡ, cập nhật, cấu hình lại, tài liệu, quyền trên mobile).",
  "Compatibility: TA phụ trách interoperability (trao đổi và dùng thông tin, chuyển đổi dữ liệu, giao thức, chuẩn); coexistence là việc của TTA."
 ],
 traps:[
  "Completeness = “có đủ chưa”; correctness = “có đúng không”; appropriateness = “có giúp làm được việc không”.",
  "Scalability và replaceability KHÔNG thuộc trọng tâm của TA (thuộc PT và TTA).",
  "Coexistence (chung môi trường không gây ảnh hưởng) là của TTA; interoperability (trao đổi thông tin) là của TA."
 ],
 mnemonic:"Phù hợp chức năng: “Đủ – Đúng – Dùng được” (Completeness – Correctness – Appropriateness)."},
{n:5, title:"Phòng ngừa khiếm khuyết", time:225, exam:8,
 story:"Sau ba release, đội app giao đồ ăn thấy lỗi tính phí ship cứ lặp lại. TA mô hình hóa đặc tả phí ship thành bảng miền giá trị và thấy đơn đúng 300.000 đ không thuộc vùng nào – lỗi nằm ngay trong yêu cầu. Khi review user story, TA dùng perspective-based reading: thử viết ca kiểm thử chấp nhận từ yêu cầu để xem có thiếu thông tin. Sau release, TA tính DDP của kiểm thử hệ thống, phân loại lỗi theo ODC và cùng đội làm phân tích nguyên nhân gốc theo từng nhóm lỗi.",
 points:[
  "Phòng ngừa gồm: ngăn đưa khiếm khuyết vào, ngăn lọt sang giai đoạn sau (phase containment), ngăn tái diễn.",
  "TA đóng góp: phân tích rủi ro, review yêu cầu/mô hình/đặc tả, retrospective, thu thập dữ liệu lỗi, phân tích nguyên nhân gốc.",
  "Đo hiệu quả: DRE = lỗi loại bỏ trước phát hành / tổng lỗi; PCE = lỗi tìm ra ngay trong giai đoạn đưa vào / tổng lỗi đưa vào ở giai đoạn đó; chi phí chất lượng.",
  "Mô hình hóa phát hiện lỗi đặc tả: mô hình dữ liệu (chồng lấn, khoảng trống), hành vi (vòng đời thiếu, chuyển đổi sai, deadlock), quy tắc (thiếu, mâu thuẫn, dư thừa).",
  "Lỗi trong mô hình: sơ đồ trạng thái (trạng thái không tới được, không tất định), activity diagram (hành động cụt, điều kiện không đầy đủ, thiếu đồng bộ), bảng quyết định (chồng lấn, mâu thuẫn, thiếu).",
  "5 kỹ thuật review: ad hoc, checklist-based, scenario-based (dry run), role-based (persona), perspective-based reading (thử tạo sản phẩm từ tài liệu).",
  "Phân tích kết quả test: cụm lỗi dự đoán vs thực tế, DDP, bao phủ cấu trúc, test gap analysis, mẫu xuất hiện lỗi (Rayleigh).",
  "Phân loại lỗi (ODC, IEEE 1044, theo mức nghiêm trọng, taxonomy) giúp RCA theo nhóm lỗi thay vì từng lỗi."
 ],
 traps:[
  "DRE không phân biệt lỗi được ngăn ngừa hay được phát hiện.",
  "Khi tính DDP, chỉ tính các lỗi lọt mà cấp độ kiểm thử đó CÓ THỂ phát hiện (loại lỗi bên thứ ba, môi trường đặc thù của khách).",
  "Số test thất bại ≠ số khiếm khuyết (quan hệ nhiều – nhiều).",
  "Cụm nhỏ lỗi nghiêm trọng quan trọng hơn cụm lớn lỗi nhỏ.",
  "Perspective-based reading yêu cầu người review THỬ TẠO sản phẩm từ tài liệu (ví dụ bản nháp ca kiểm thử chấp nhận)."
 ],
 mnemonic:"5 kỹ thuật review: “Tùy – Danh – Cảnh – Vai – Góc” (Ad hoc, Checklist, Scenario, Role, Perspective)."}
];

const LOS = {
"TA-1.1.1":["K2","Tóm tắt sự tham gia của test analyst trong các vòng đời phát triển phần mềm khác nhau","Summarize the involvement of the test analyst in various software development lifecycles"],
"TA-1.2.1":["K2","Tóm tắt các nhiệm vụ của test analyst trong phân tích kiểm thử","Summarize the tasks performed by the test analyst as part of test analysis"],
"TA-1.2.2":["K2","Tóm tắt các nhiệm vụ của test analyst trong thiết kế kiểm thử","Summarize the tasks performed by the test analyst as part of test design"],
"TA-1.2.3":["K2","Tóm tắt các nhiệm vụ của test analyst trong triển khai kiểm thử","Summarize the tasks performed by the test analyst as part of test implementation"],
"TA-1.2.4":["K2","Tóm tắt các nhiệm vụ của test analyst trong thực thi kiểm thử","Summarize the tasks performed by the test analyst as part of test execution"],
"TA-1.3.1":["K2","Phân biệt ca kiểm thử mức cao và ca kiểm thử mức thấp","Differentiate between high-level test cases and low-level test cases"],
"TA-1.3.2":["K2","Giải thích các tiêu chí chất lượng của ca kiểm thử","Explain the quality criteria for test cases"],
"TA-1.3.3":["K2","Nêu ví dụ về yêu cầu môi trường kiểm thử","Give examples of test environment requirements"],
"TA-1.3.4":["K2","Giải thích bài toán test oracle và các lời giải tiềm năng","Explain the test oracle problem and potential solutions"],
"TA-1.3.5":["K2","Nêu ví dụ về yêu cầu dữ liệu kiểm thử","Give examples of test data requirements"],
"TA-1.3.6":["K3","Dùng kiểm thử hướng từ khóa để xây dựng kịch bản kiểm thử","Use keyword-driven testing to develop test scripts"],
"TA-1.3.7":["K2","Tóm tắt các loại công cụ quản lý testware","Summarize the types of tools to manage the testware"],
"TA-2.1.1":["K2","Tóm tắt đóng góp của test analyst vào phân tích rủi ro sản phẩm","Summarize the test analyst’s contribution to product risk analysis"],
"TA-2.2.1":["K4","Phân tích tác động của thay đổi để xác định phạm vi kiểm thử hồi quy","Analyze the impact of changes to determine the scope of regression testing"],
"TA-3.1.1":["K3","Áp dụng domain testing","Apply domain testing"],
"TA-3.1.2":["K3","Áp dụng kiểm thử tổ hợp (combinatorial testing)","Apply combinatorial testing"],
"TA-3.1.3":["K2","Tóm tắt lợi ích và hạn chế của kiểm thử ngẫu nhiên","Summarize the benefits and limitations of random testing"],
"TA-3.2.1":["K2","Giải thích kiểm thử CRUD","Explain CRUD testing"],
"TA-3.2.2":["K3","Áp dụng kiểm thử chuyển đổi trạng thái","Apply state transition testing"],
"TA-3.2.3":["K3","Áp dụng kiểm thử dựa trên kịch bản","Apply scenario-based testing"],
"TA-3.3.1":["K3","Áp dụng kiểm thử bảng quyết định","Apply decision table testing"],
"TA-3.3.2":["K3","Áp dụng kiểm thử biến hình (metamorphic testing)","Apply metamorphic testing"],
"TA-3.4.1":["K3","Chuẩn bị test charter cho kiểm thử theo phiên","Prepare test charters for session-based testing"],
"TA-3.4.2":["K3","Chuẩn bị checklist hỗ trợ kiểm thử dựa trên kinh nghiệm","Prepare checklists that support experience-based testing"],
"TA-3.4.3":["K2","Nêu ví dụ về lợi ích và hạn chế của crowd testing","Give examples of the benefits and limitations of crowd testing"],
"TA-3.5.1":["K4","Chọn kỹ thuật kiểm thử phù hợp để giảm thiểu rủi ro sản phẩm trong một tình huống cụ thể","Select appropriate test techniques to mitigate product risks for a given situation"],
"TA-3.5.2":["K2","Giải thích lợi ích và rủi ro của việc tự động hóa thiết kế kiểm thử","Explain the benefits and risks of automating the test design"],
"TA-4.1.1":["K2","Phân biệt kiểm thử tính đúng đắn, tính phù hợp và tính đầy đủ của chức năng","Differentiate between functional correctness, functional appropriateness, and functional completeness testing"],
"TA-4.2.1":["K2","Giải thích cách test analyst đóng góp vào kiểm thử khả năng sử dụng","Explain how the test analyst contributes to usability testing"],
"TA-4.3.1":["K2","Giải thích cách test analyst đóng góp vào kiểm thử khả năng thích nghi và khả năng cài đặt","Explain how the test analyst contributes to adaptability and installability testing"],
"TA-4.4.1":["K2","Giải thích cách test analyst đóng góp vào kiểm thử khả năng tương tác","Explain how the test analyst contributes to interoperability testing"],
"TA-5.1.1":["K2","Giải thích cách test analyst có thể đóng góp vào phòng ngừa khiếm khuyết","Explain how the test analyst can contribute to defect prevention"],
"TA-5.2.1":["K3","Dùng mô hình của đối tượng kiểm thử để phát hiện khiếm khuyết trong đặc tả","Use a model of the test object to detect defects in a specification"],
"TA-5.2.2":["K3","Áp dụng một kỹ thuật review lên test basis để tìm khiếm khuyết","Apply a review technique to a test basis to find defects"],
"TA-5.3.1":["K4","Phân tích kết quả kiểm thử để xác định cải tiến tiềm năng cho việc phát hiện khiếm khuyết","Analyze test results to identify potential improvements to defect detection"],
"TA-5.3.2":["K2","Giải thích cách phân loại khiếm khuyết hỗ trợ phân tích nguyên nhân gốc","Explain how defect classification supports root cause analysis"]
};

const GLOSSARY = [
["test analyst (TA)","chuyên viên phân tích kiểm thử","Người trong vai trò kiểm thử chịu trách nhiệm các khía cạnh nghiệp vụ của phần mềm.",1],
["high-level test case","ca kiểm thử mức cao (trừu tượng, logic)","Ca kiểm thử không có giá trị cụ thể cho điều kiện tiên quyết, đầu vào, kết quả mong đợi.",1],
["low-level test case","ca kiểm thử mức thấp (cụ thể, vật lý)","Ca kiểm thử có giá trị cụ thể cho điều kiện tiên quyết, đầu vào, kết quả mong đợi và hậu điều kiện.",1],
["test condition","điều kiện kiểm thử","Khía cạnh có thể kiểm thử của thành phần hoặc hệ thống, được xác định làm cơ sở cho kiểm thử.",1],
["test oracle","nguồn đối chiếu kết quả (test oracle)","Nguồn để xác định kết quả mong đợi khi so với kết quả thực tế.",1],
["test oracle problem","bài toán test oracle","Tình huống không có nguồn đối chiếu kết quả hiệu quả về chi phí.",1],
["pseudo-oracle","oracle giả (hệ thống đối chứng)","Hệ thống phát triển độc lập thỏa cùng đặc tả, dùng để so kết quả.",1],
["test environment","môi trường kiểm thử","Môi trường gồm phần cứng, phần mềm, công cụ và yếu tố khác cần để thực hiện kiểm thử.",1],
["test data","dữ liệu kiểm thử","Dữ liệu cần để thực thi kiểm thử.",1],
["keyword-driven testing","kiểm thử hướng từ khóa","Cách viết kịch bản kiểm thử bằng từ khóa mô tả hành động và kiểm tra, có thể tự động hóa.",1],
["keyword","từ khóa","Tên đại diện cho một hành động hoặc một kiểm tra trong kịch bản kiểm thử.",1],
["test script","kịch bản kiểm thử","Chuỗi lệnh để thực thi kiểm thử.",1],
["testware","sản phẩm kiểm thử","Các sản phẩm công việc tạo ra trong quá trình kiểm thử.",1],
["product risk","rủi ro sản phẩm","Rủi ro gắn với chất lượng của sản phẩm.",2],
["risk-based testing","kiểm thử dựa trên rủi ro","Cách tiếp cận ưu tiên công sức kiểm thử theo mức rủi ro của các test item.",2],
["risk analysis","phân tích rủi ro","Gồm nhận diện rủi ro và đánh giá rủi ro.",2],
["risk control","kiểm soát rủi ro","Gồm giảm thiểu rủi ro và giám sát rủi ro.",2],
["impact analysis","phân tích tác động","Xác định các phần bị ảnh hưởng bởi một thay đổi.",2],
["regression testing","kiểm thử hồi quy","Kiểm thử để phát hiện khiếm khuyết mới phát sinh do thay đổi.",2],
["operational profile","hồ sơ vận hành","Mô tả cách hệ thống thực sự được sử dụng (mẫu sử dụng và tần suất).",2],
["data-based test technique","kỹ thuật dựa trên dữ liệu","Kỹ thuật hộp đen mô hình hóa các phần tử dữ liệu.",3],
["domain testing","kiểm thử miền","Kiểm tra hành vi trên các phân vùng tương đương (nhiều biến) và tại biên của chúng.",3],
["ON / OFF / IN / OUT point","điểm ON / OFF / IN / OUT","Các điểm kiểm thử của domain testing, định nghĩa theo biên đóng hay mở.",3],
["combinatorial testing","kiểm thử tổ hợp","Kỹ thuật tìm sự cố do tổ hợp giá trị của nhiều tham số.",3],
["pairwise testing","kiểm thử theo cặp","Bao phủ mọi cặp giá trị của mọi hai tham số.",3],
["base choice coverage","bao phủ lựa chọn gốc","Một ca gốc, rồi lần lượt thay mỗi giá trị không gốc của từng tham số.",3],
["random testing","kiểm thử ngẫu nhiên","Chọn dữ liệu kiểm thử ngẫu nhiên theo một phân phối xác suất.",3],
["behavior-based test technique","kỹ thuật dựa trên hành vi","Kỹ thuật hộp đen dựa trên hành vi động (phụ thuộc trạng thái).",3],
["CRUD testing","kiểm thử CRUD","Kiểm thử vòng đời thực thể dữ liệu: tạo, đọc, cập nhật, xóa.",3],
["N-switch coverage","bao phủ N-switch","Bao phủ các chuỗi hợp lệ gồm N+1 chuyển đổi liên tiếp.",3],
["round-trip coverage","bao phủ khứ hồi","Bao phủ các vòng lặp bắt đầu và kết thúc ở cùng trạng thái, không trạng thái nào khác lặp lại.",3],
["scenario-based testing","kiểm thử dựa trên kịch bản","Kiểm thử hành vi trong các kịch bản thực tế (activity diagram, use case).",3],
["simple loop coverage","bao phủ vòng lặp đơn","Chạy vòng lặp 0 lần, 1 lần, nhiều lần và tối đa số lần.",3],
["rule-based test technique","kỹ thuật dựa trên quy tắc","Kỹ thuật hộp đen cho hành vi không trạng thái, đặc tả bằng quy tắc.",3],
["decision table testing","kiểm thử bảng quyết định","Thiết kế ca kiểm thử từ các quy tắc của bảng quyết định.",3],
["metamorphic testing","kiểm thử biến hình","Sinh ca theo sau từ ca nguồn dựa trên quan hệ biến hình.",3],
["metamorphic relation (MR)","quan hệ biến hình","Thuộc tính mô tả thay đổi đầu vào phản ánh thế nào lên kết quả mong đợi.",3],
["session-based testing","kiểm thử theo phiên","Kiểm thử thăm dò trong các phiên có khung thời gian và test charter.",3],
["test charter","bản điều lệ kiểm thử (test charter)","Nhiệm vụ của một phiên kiểm thử: phạm vi, mục tiêu và thông tin liên quan.",3],
["checklist-based testing","kiểm thử dựa trên checklist","Kỹ thuật kinh nghiệm dùng danh sách mục cần kiểm tra.",3],
["crowd testing","kiểm thử cộng đồng","Phân phối kiểm thử cho nhóm tester đa dạng về nền tảng và vị trí.",3],
["functional suitability","tính phù hợp chức năng","Mức độ chức năng đáp ứng nhu cầu đã nêu và ngầm định.",4],
["functional completeness","tính đầy đủ chức năng","Chức năng bao phủ mọi nhiệm vụ và mục tiêu người dùng đã đặc tả.",4],
["functional correctness","tính đúng đắn chức năng","Chức năng cho kết quả đúng với độ chính xác cần thiết.",4],
["functional appropriateness","tính thích đáng chức năng","Chức năng giúp hoàn thành nhiệm vụ và mục tiêu đã đặc tả.",4],
["usability","khả năng sử dụng","Khái niệm rộng gồm interaction capability, trải nghiệm người dùng, khả năng tiếp cận.",4],
["accessibility","khả năng tiếp cận","Người khuyết tật hoặc khác biệt văn hóa, ngôn ngữ vẫn dùng được hiệu quả.",4],
["adaptability","khả năng thích nghi","Có thể điều chỉnh hoặc chuyển sang phần cứng, phần mềm, môi trường đích.",4],
["installability","khả năng cài đặt","Cài, gỡ, cập nhật, cấu hình lại thành công trong môi trường đã định.",4],
["interoperability","khả năng tương tác","Hai hay nhiều hệ thống trao đổi và sử dụng thông tin đã trao đổi.",4],
["defect prevention","phòng ngừa khiếm khuyết","Hành động giảm khả năng khiếm khuyết xuất hiện hoặc tái diễn.",5],
["phase containment","khoanh vùng theo giai đoạn","Phát hiện và loại bỏ khiếm khuyết ngay trong giai đoạn đưa nó vào.",5],
["perspective-based reading","đọc theo góc nhìn","Review từ góc nhìn một bên liên quan, thử tạo sản phẩm họ sẽ tạo từ tài liệu.",5],
["role-based reviewing","review theo vai","Người review đóng vai loại người dùng hoặc vai trò cụ thể (persona).",5],
["scenario-based reviewing","review theo kịch bản","Chạy thử khô (dry run) quy trình theo kịch bản sử dụng.",5],
["root cause analysis (RCA)","phân tích nguyên nhân gốc","Tìm và xử lý nguyên nhân nền tảng của khiếm khuyết thay vì triệu chứng.",5],
["defect detection percentage (DDP)","tỷ lệ phát hiện khiếm khuyết","Số lỗi tìm ra ở một cấp độ / (số đó + số lỗi lọt mà cấp đó có thể tìm ra).",5],
["orthogonal defect classification (ODC)","phân loại khiếm khuyết trực giao","Phân loại mỗi lỗi theo các thuộc tính loại trừ nhau, thu thập khi báo và khi sửa.",5]
];

/* Phân bổ đề thi theo mẫu ISTQB (45 câu, 78 điểm). Mỗi nhóm: chọn n câu, mỗi câu thuộc một LO khác nhau nếu có thể. */
const SLOTS = [
 {c:1, n:7, from:["1.1.1","1.2.1","1.2.2","1.2.3","1.2.4","1.3.1","1.3.2","1.3.3","1.3.4","1.3.5","1.3.7"]},
 {c:1, n:1, from:["1.3.6"]},
 {c:2, n:1, from:["2.1.1"]}, {c:2, n:2, from:["2.2.1"]},
 {c:3, n:2, from:["3.1.1"]}, {c:3, n:2, from:["3.1.2"]}, {c:3, n:1, from:["3.1.3"]}, {c:3, n:1, from:["3.2.1"]},
 {c:3, n:2, from:["3.2.2"]}, {c:3, n:2, from:["3.2.3"]}, {c:3, n:2, from:["3.3.1"]}, {c:3, n:2, from:["3.3.2"]},
 {c:3, n:2, from:["3.4.1"]}, {c:3, n:2, from:["3.4.2"]}, {c:3, n:1, from:["3.4.3"]}, {c:3, n:2, from:["3.5.1"]}, {c:3, n:1, from:["3.5.2"]},
 {c:4, n:1, from:["4.1.1"]}, {c:4, n:1, from:["4.2.1"]}, {c:4, n:1, from:["4.3.1"]}, {c:4, n:1, from:["4.4.1"]},
 {c:5, n:1, from:["5.1.1"]}, {c:5, n:2, from:["5.2.1"]}, {c:5, n:2, from:["5.2.2"]}, {c:5, n:2, from:["5.3.1"]}, {c:5, n:1, from:["5.3.2"]}
].map(s => Object.assign(s, {from: s.from.map(x => "TA-" + x)}));

const C = window.QALAB.certs["ctal-ta"] = {
  id:"ctal-ta", code:"CTAL-TA", version:"v4.0", name:"Advanced Level Test Analyst", short:"Test Analyst", loPrefix:"TA-",
  syllabusNote:"Nội dung tự soạn dựa trên ISTQB® CTAL-TA Syllabus v4.0.",
  exam:{count:45, minutes:120, extra:30, pass:51, total:78, points:{K1:1,K2:1,K3:2,K4:3}, slots:SLOTS,
        dist:{1:8,2:3,3:22,4:4,5:8}},
  chapters:CHAPTERS,
  los:Object.fromEntries(Object.entries(LOS).map(([k, v]) => [k, [v[0], v[1]]])),
  glossary:GLOSSARY,
  bank:[],
  en:{q:{}, los:Object.fromEntries(Object.entries(LOS).map(([k, v]) => [k, v[2]])),
      chapters:{1:"The Tasks of the Test Analyst in the Test Process",2:"The Tasks of the Test Analyst in Risk-Based Testing",3:"Test Analysis and Test Design",4:"Testing Quality Characteristics",5:"Software Defect Prevention"}},
  lessons:{}
};

/* Thêm câu hỏi: [LO, câu hỏi, [phương án], đáp án (số hoặc mảng nếu chọn hai), giải thích, question, [options]] */
/* Đảo vị trí phương án theo một hoán vị cố định (cùng một câu luôn cùng thứ tự) để đáp án không dồn về một chữ cái. */
function perm(n, seed){
  let h = 2166136261; for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const p = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--){ h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [p[i], p[j]] = [p[j], p[i]]; }
  return p;
}
C.add = function(list){
  list.forEach(x => {
    const lo = "TA-" + x[0], id = "ta-" + C.bank.length, p = perm(x[2].length, id + x[1]);
    const inv = a => p.indexOf(a), a = Array.isArray(x[3]) ? x[3].map(inv).sort() : inv(x[3]);
    C.bank.push({id, c:+x[0][0], lo, k:LOS[lo][0], q:x[1], o:p.map(i => x[2][i]), a, e:x[4]});
    if (x[5]) C.en.q[id] = {q:x[5], o:p.map(i => x[6][i])};
  });
};
})();
