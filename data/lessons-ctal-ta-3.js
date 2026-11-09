/* The QA Lab – bài học chi tiết CTAL-TA v4.0, chương 3: Phân tích và thiết kế kiểm thử. */
window.QALAB.certs["ctal-ta"].lessons[3] = [
{
 id:"3.1.1", title:"Domain testing", en:"Domain Testing", los:["TA-3.1.1"], minutes:60,
 example:"Ứng dụng xét vay tiêu dùng: hồ sơ được duyệt nhanh nếu “thu nhập ≥ 10 triệu VÀ tỷ lệ nợ/thu nhập < 40%”. Dev gõ nhầm “> 10 triệu”. Thử 15 triệu với tỷ lệ 20% → được duyệt, đúng. Thử 5 triệu → bị từ chối, đúng. Lỗi vẫn ẩn. Chỉ điểm nằm ĐÚNG trên biên – thu nhập đúng 10 triệu – mới lộ lỗi. Domain testing chỉ ra chính xác những điểm phải thử ở mỗi biên, kể cả khi điều kiện có nhiều biến.",
 blocks:[
  {t:"p",v:"Ba kỹ thuật **dựa trên dữ liệu** của CTAL-TA: **domain testing** (mở rộng EP và BVA cho nhiều tham số, phân vùng phức tạp), **combinatorial testing** (tương tác giữa nhiều tham số), **random testing** (chọn đầu vào ngẫu nhiên theo phân phối). “Domain” ở đây là **tập dữ liệu đầu vào** của test item."},
  {t:"h",v:"Phân vùng và biên"},
  {t:"p",v:"Domain testing kiểm tra hành vi trên các **phân vùng tương đương** và **tại biên** của chúng. Phân vùng được định nghĩa bằng biểu thức ghép các **điều kiện nguyên tử** bằng AND, OR, NOT, có thể gồm nhiều biến tương tác. **Mỗi điều kiện nguyên tử tạo một biên.**"},
  {t:"compare",l:{h:"Biên ĐÓNG",q:"Toán tử ≤, ≥, =",v:["Giá trị trên biên **thuộc** phân vùng","Ví dụ: tuổi ≥ 18 → 18 thuộc vùng"]},r:{h:"Biên MỞ",q:"Toán tử <, >, ≠",v:["Giá trị trên biên **không thuộc** phân vùng","Ví dụ: tuổi < 65 → 65 không thuộc vùng"]}},
  {t:"p",v:"Ví dụ syllabus: “chiều cao > 1,29 m AND cân nặng / chiều cao² ≥ 30” định nghĩa một phân vùng hai chiều với **hai biên**: một mở (> 1,29) và một đóng (≥ 30)."},
  {t:"h",v:"Bốn loại điểm kiểm thử"},
  {t:"table",head:["Điểm","Biên đóng (≤, ≥, =)","Biên mở (<, >, ≠)"],rows:[
   ["**ON**","Nằm **trên** biên","Nằm **trong** vùng, **gần biên nhất** theo độ chính xác"],
   ["**OFF**","Nằm **ngoài** vùng, **gần biên nhất** theo độ chính xác","Nằm **trên** biên"],
   ["**IN**","Thuộc vùng, không phải ON","Thuộc vùng, không phải ON"],
   ["**OUT**","Ngoài vùng, không phải OFF","Ngoài vùng, không phải OFF"]]},
  {t:"tip",v:"Mẹo nhớ: **ON luôn thuộc vùng, OFF luôn ngoài vùng.** Với biên đóng, “trên biên” thuộc vùng nên đó là ON; với biên mở, “trên biên” ngoài vùng nên đó là OFF. Một điểm có thể là loại khác nhau đối với các biên khác nhau."},
  {t:"h",v:"Hai tiêu chí bao phủ"},
  {t:"table",head:["Toán tử của biên","Simplified domain coverage","Reliable domain coverage"],rows:[
   ["<, ≤, >, ≥","1 ON + 1 OFF","1 ON + 1 OFF + 1 IN + 1 OUT"],
   ["=","1 ON + 2 OFF (hai phía biên)","1 ON + 2 OFF (hai phía biên)"],
   ["≠","1 OFF + 2 ON (hai phía biên)","1 OFF + 2 ON (hai phía biên)"]]},
  {t:"list",v:["Mỗi điểm OFF phải **càng gần điểm ON tương ứng càng tốt** theo độ chính xác.","Số mục bao phủ tăng **tuyến tính** theo số biên. Có thể tối ưu bằng **dùng chung điểm**: mọi biên dùng chung một điểm IN; cặp ON/OFF của một biên dùng làm OFF/ON cho biên của phân vùng kề. Domain nhiều biên có thuật toán tối ưu nâng cao.","**Reliable** nhiều mục hơn một chút nhưng **phát hiện nhiều lỗi miền hơn đáng kể**.","Domain testing dùng được ở **mọi cấp kiểm thử** và **tổng quát hóa EP, BVA** cho miền phức tạp."]},
  {t:"lab",kind:"domain"},
  {t:"worked",title:"Simplified domain coverage cho điều kiện hai biên",given:"Phân vùng “được duyệt nhanh”: thu nhập ≥ 10 (triệu, độ chính xác 0,1) AND tỷ lệ nợ < 40 (%, số nguyên). Tìm tập điểm đạt simplified domain coverage, giữ biến còn lại ở giá trị IN.",steps:["Biên 1 “thu nhập ≥ 10” – đóng: ON = 10,0; OFF = 9,9. Tỷ lệ nợ giữ IN, ví dụ 20.","Biên 2 “tỷ lệ < 40” – mở: ON = 39 (trong vùng, sát biên); OFF = 40 (trên biên). Thu nhập giữ IN, ví dụ 15,0.","Ghép: (10,0; 20) ON-1 · (9,9; 20) OFF-1 · (15,0; 39) ON-2 · (15,0; 40) OFF-2.","Kiểm tra lỗi “> 10” thay vì “≥ 10”: điểm (10,0; 20) mong đợi DUYỆT nhưng mã lỗi trả TỪ CHỐI → lộ lỗi."],answer:"4 điểm: (10,0; 20), (9,9; 20), (15,0; 39), (15,0; 40). Reliable coverage thêm điểm IN (ví dụ (15,0; 20) dùng chung) và OUT cho mỗi biên (ví dụ (3,0; 20) và (15,0; 75))."},
  {t:"trap",v:["Biên mở “x > 100”, độ chính xác 1: ON = **101**, OFF = **100**. Đừng đảo.","Toán tử “=”: **hai OFF**, một mỗi phía. Toán tử “≠”: **hai ON**, một mỗi phía.","Độ chính xác quan trọng: tiền 0,01 thì OFF của “≥ 100,00” là 99,99, không phải 99."]}
 ],
 summary:["Domain testing: kiểm tra phân vùng (biểu thức nhiều điều kiện, nhiều biến) và biên của chúng; mỗi điều kiện nguyên tử là một biên.","Biên đóng ≤ ≥ =; biên mở < > ≠.","ON luôn thuộc vùng (đóng: trên biên; mở: sát biên trong vùng); OFF luôn ngoài vùng (đóng: sát biên ngoài; mở: trên biên).","Simplified: ON + OFF mỗi biên; Reliable: ON + OFF + IN + OUT; “=” cần 1 ON 2 OFF, “≠” cần 1 OFF 2 ON.","Có thể dùng chung điểm; reliable phát hiện nhiều lỗi hơn đáng kể; áp dụng ở mọi cấp."],
 terms:[["domain","miền (tập dữ liệu đầu vào)"],["border","biên"],["closed / open border","biên đóng / biên mở"],["simplified domain coverage","bao phủ miền đơn giản"],["reliable domain coverage","bao phủ miền tin cậy"]]
},
{
 id:"3.1.2", title:"Combinatorial testing", en:"Combinatorial Testing", los:["TA-3.1.2"], minutes:55,
 example:"Website đặt phòng khách sạn chỉ lỗi khi: dùng Safari + chọn tiếng Anh + thanh toán bằng ví điện tử. Mỗi giá trị riêng lẻ đều chạy tốt; chỉ tổ hợp mới gây lỗi – đó là interaction failure. Thử hết mọi tổ hợp của 5 trình duyệt × 3 ngôn ngữ × 4 phương thức thanh toán × 2 thiết bị = 120 ca là quá nhiều. Pairwise chỉ cần khoảng 20 ca mà vẫn phủ mọi cặp giá trị – và phần lớn lỗi tương tác nằm ở cặp.",
 blocks:[
  {t:"p",v:"Một số sự cố chỉ xảy ra với **tổ hợp giá trị tham số cụ thể** – gọi là **interaction failure**. Combinatorial testing khám phá các tổ hợp đó. Một **cặp tham số–giá trị** là tham số và giá trị của nó, ví dụ (màu, đỏ)."},
  {t:"compare",l:{h:"Tổ hợp tham số cấu hình",q:"Cùng một ca kiểm thử chạy trên mỗi tổ hợp",v:["Trình duyệt × hệ điều hành × ngôn ngữ","Mỗi tổ hợp là một cấu hình môi trường"]},r:{h:"Tổ hợp giá trị đầu vào",q:"Mỗi tổ hợp trở thành một phần của ca kiểm thử",v:["Loại khách × gói × kênh thanh toán","Tạo bộ test cho hệ thống"]}},
  {t:"h",v:"Hai tiêu chí bao phủ chính"},
  {t:"table",head:["Tiêu chí","Mục bao phủ","Số ca"],rows:[
   ["**Base choice coverage**","Chọn một cặp **gốc** cho mỗi tham số (giá trị quan trọng nhất). Mục đầu tiên là tổ hợp gốc. Rồi với mỗi tham số, thay giá trị gốc bằng **từng** giá trị không gốc","**1 + Σ(số giá trị của mỗi tham số − 1)**"],
   ["**Pairwise coverage**","Mọi **cặp** gồm hai cặp tham số–giá trị của **hai tham số bất kỳ**","Tối thiểu ≥ tích số giá trị của **hai tham số lớn nhất**; tìm tập nhỏ nhất thường khó, dùng công cụ (ví dụ PICT)"]]},
  {t:"lab",kind:"pairwise"},
  {t:"h",v:"Làm gọn trước khi tổ hợp"},
  {t:"list",v:["Tham số có nhiều giá trị → áp dụng **EP** trước để giảm số giá trị.","Ghi tham số và giá trị vào **cây phân loại (classification tree)** hoặc **feature model**.","Số ca cuối cùng còn chịu ảnh hưởng bởi **ràng buộc** giữa các cặp, tổ hợp **bổ sung thủ công** đã biết là có vấn đề, và tổ hợp **không hợp lệ/không khả thi** (ví dụ Safari trên Windows)."]},
  {t:"h",v:"Vì sao pairwise hiệu quả?"},
  {t:"p",v:"Không phải tham số nào cũng góp vào sự cố; **phần lớn sự cố do một giá trị đơn lẻ hoặc tương tác của ít tham số**. Phù hợp **giả thuyết hiệu ứng ghép (coupling effect)**: tìm được lỗi đơn giản thường cũng lộ lỗi phức tạp. Một nghiên cứu (Kuhn et al., 2004) cho thấy khoảng **97% sự cố do một hoặc hai điều kiện tương tác**. Các tiêu chí khác: diff-pair-t, n-wise."},
  {t:"worked",title:"Đếm ca base choice và pairwise",given:"Tham số: Thiết bị {Điện thoại*, Máy tính bảng, Laptop}; Mạng {Wi-Fi*, 4G}; Ngôn ngữ {VI*, EN, JA}. (* là giá trị gốc.) (a) Base choice cần bao nhiêu ca? Liệt kê. (b) Pairwise tối thiểu bao nhiêu ca? (c) Có bao nhiêu mục bao phủ pairwise?",steps:["(a) Ca gốc: (Điện thoại, Wi-Fi, VI).","Thay Thiết bị: (Máy tính bảng, Wi-Fi, VI), (Laptop, Wi-Fi, VI) → 2 ca.","Thay Mạng: (Điện thoại, 4G, VI) → 1 ca. Thay Ngôn ngữ: (Điện thoại, Wi-Fi, EN), (Điện thoại, Wi-Fi, JA) → 2 ca.","Tổng: 1 + 2 + 1 + 2 = 6.","(b) Hai tham số lớn nhất: Thiết bị (3) × Ngôn ngữ (3) = 9 → cần ít nhất 9; với Mạng 2 giá trị có thể sắp được trong 9 ca → 9.","(c) Thiết bị–Mạng 3×2 = 6; Thiết bị–Ngôn ngữ 3×3 = 9; Mạng–Ngôn ngữ 2×3 = 6 → 21."],answer:"(a) 6 ca. (b) 9 ca. (c) 21 mục bao phủ pairwise. So với tổ hợp đầy đủ 3 × 2 × 3 = 18 ca."},
  {t:"trap",v:["Base choice: nhớ **cộng 1** cho ca gốc.","Số ca pairwise tối thiểu không phải số mục bao phủ: một ca phủ cùng lúc nhiều cặp.","Rủi ro rất cao → có thể cần **tổ hợp đầy đủ** thay vì pairwise (mục 3.5.1)."]}
 ],
 summary:["Combinatorial testing tìm interaction failure do tổ hợp giá trị tham số.","Hai hướng: tổ hợp tham số cấu hình (cùng ca) và tổ hợp giá trị đầu vào (thành ca).","Base choice: 1 ca gốc + mỗi giá trị không gốc một ca → 1 + Σ(nᵢ − 1).","Pairwise: phủ mọi cặp giá trị của mọi hai tham số; tối thiểu ≥ tích hai tham số lớn nhất.","Giảm giá trị bằng EP, cây phân loại; xét ràng buộc, tổ hợp không khả thi; ~97% sự cố do 1–2 điều kiện."],
 terms:[["interaction failure","sự cố do tương tác"],["parameter-value pair","cặp tham số–giá trị"],["base choice coverage","bao phủ lựa chọn gốc"],["pairwise coverage","bao phủ theo cặp"],["classification tree","cây phân loại"]]
},
{
 id:"3.1.3", title:"Random testing", en:"Random Testing", los:["TA-3.1.3"], minutes:25,
 example:"Thư viện chuyển đổi tiền tệ được thử bằng 1 triệu cặp (số tiền, loại tiền) sinh ngẫu nhiên mỗi đêm. Oracle tự động: đổi A→B rồi B→A phải ra gần số ban đầu (sai số làm tròn). Sau 3 đêm, một số tiền rất lớn kèm đồng yên làm tràn số – điều không tester nào nghĩ tới khi viết ca bằng tay.",
 blocks:[
  {t:"p",v:"Random testing chọn dữ liệu kiểm thử **ngẫu nhiên** từ miền đầu vào theo một **phân phối xác suất** xác định. (Syllabus chỉ bàn dữ liệu đầu vào ngẫu nhiên, không bàn sự kiện ngẫu nhiên.)"},
  {t:"compare",l:{h:"Mục đích THẨM ĐỊNH",q:"Hệ thống có phục vụ đúng cách người dùng thật dùng?",v:["Phân phối dựa trên **operational profile**"]},r:{h:"Mục đích THẨM TRA",q:"Hệ thống có đúng đặc tả trên toàn miền?",v:["Phân phối **không phụ thuộc cách dùng** (usage-agnostic) để tránh thiên lệch"]}},
  {t:"p",v:"Kết quả mong đợi thêm bằng **test oracle**, thường cần **oracle tự động** (vì số ca lớn)."},
  {t:"compare",l:{h:"Unguided – không định hướng",q:"Phân phối cố định",v:["Giữ nguyên suốt quá trình"]},r:{h:"Guided – có định hướng",q:"Phân phối thay đổi",v:["Điều chỉnh theo giá trị đã chọn, ví dụ **adaptive random testing**","Nhắm phủ miền hiệu quả vì lỗi hay tập trung theo vùng"]}},
  {t:"table",head:["Lợi ích","Hạn chế"],rows:[
   ["Hữu ích khi **ít kiến thức miền** hoặc cần **lượng dữ liệu lớn**","**Không có tiêu chí bao phủ** được công nhận; tiêu chí thoát chỉ dựa trên số test, thời gian…"],
   ["**Hiệu quả chi phí**, cho thông tin xác suất về **độ tin cậy**","Bỏ qua **ngữ nghĩa dữ liệu**, có thể sót lỗi liên quan ý nghĩa dữ liệu"],
   ["Tránh **thiên kiến** (tin nhầm vào một đoạn code, chức năng)","Sinh **test dư thừa**; sót một số lỗi"],
   ["Nghiên cứu gần đây: trong điều kiện phù hợp, có thể **hiệu quả hơn** kỹ thuật dữ liệu khác","Phụ thuộc **oracle tự động**; kết quả ngẫu nhiên gây **kết quả không nhất quán**"]]},
  {t:"tip",v:"Random testing còn được dùng trong **fuzz testing** và **chaos engineering**."},
  {t:"trap",v:["“Random testing luôn kém hiệu quả” – quan niệm cũ; syllabus nói trong điều kiện phù hợp nó có thể hiệu quả hơn.","Thẩm định → operational profile; thẩm tra → không phụ thuộc cách dùng. Đề hay đảo hai cái này."]}
 ],
 summary:["Random testing chọn dữ liệu ngẫu nhiên theo phân phối xác suất; cần oracle, thường là tự động.","Thẩm định dùng operational profile; thẩm tra dùng phân phối không thiên lệch.","Unguided giữ phân phối cố định; guided (adaptive random testing) điều chỉnh theo giá trị đã chọn.","Lợi ích: ít cần kiến thức miền, dữ liệu lớn, rẻ, đánh giá độ tin cậy, tránh thiên kiến.","Hạn chế: không có tiêu chí bao phủ, bỏ qua ngữ nghĩa, dư thừa, phụ thuộc oracle tự động, kết quả không nhất quán."],
 terms:[["random testing","kiểm thử ngẫu nhiên"],["probability distribution","phân phối xác suất"],["adaptive random testing","kiểm thử ngẫu nhiên thích nghi"],["fuzz testing","kiểm thử fuzz"]]
},
{
 id:"3.2.1", title:"Kiểm thử CRUD", en:"CRUD Testing", los:["TA-3.2.1"], minutes:30,
 example:"Hệ thống quản lý thư viện: chức năng “Đăng ký thẻ” tạo Độc giả, “Mượn sách” đọc Độc giả, đọc Sách, tạo Phiếu mượn, “Trả sách” cập nhật Phiếu mượn. Lập ma trận CRUD, TA thấy không chức năng nào xóa Phiếu mượn và không chức năng nào cập nhật Độc giả – vậy độc giả đổi số điện thoại thế nào? Câu hỏi được gửi lên BA trước khi viết dòng code nào.",
 blocks:[
  {t:"p",v:"Ba kỹ thuật **dựa trên hành vi** (hành vi động, phụ thuộc trạng thái): CRUD, chuyển đổi trạng thái, kịch bản. CRUD testing kiểm tra **vòng đời của thực thể dữ liệu**: **C**reate, **R**ead, **U**pdate, **D**elete."},
  {t:"h",v:"Ma trận CRUD"},
  {t:"p",v:"**Cột = thực thể, dòng = chức năng.** Ô ghi chữ cái thao tác chức năng thực hiện trên thực thể. Chú ý đặc biệt thao tác **R**, thường gắn ngầm với C, U, D."},
  {t:"table",head:["Chức năng \\ Thực thể","Độc giả","Sách","Phiếu mượn"],rows:[["Đăng ký thẻ","C",""," "],["Thêm sách","","C",""],["Mượn sách","R","R, U","C"],["Trả sách","R","U","R, U"],["Thanh lý sách","","D",""],["Tra cứu","","R","R"]]},
  {t:"compare",l:{h:"Completeness testing – kiểm thử tính đầy đủ",q:"TĨNH",v:["Mỗi thực thể có đủ C, R, U, D chưa?","Thiếu thao tác = **bất thường cần điều tra**","Ví dụ trên: Độc giả thiếu U, D; Phiếu mượn thiếu D"]},r:{h:"Consistency testing – kiểm thử tính nhất quán",q:"ĐỘNG",v:["Tích hợp các chức năng, kiểm tra thực thể được dùng nhất quán","Ca thiết kế **theo thực thể**, ghép chức năng để phủ trọn vòng đời","Phủ mọi thao tác trong ma trận, thêm **kiểm thử âm** (đọc thực thể chưa tạo)"]}},
  {t:"h",v:"Bao phủ CRUD"},
  {t:"p",v:"**Bao phủ CRUD = số thao tác đã thực thi / tổng số thao tác trong ma trận.** Bao phủ nghiêm ngặt hơn có thể coi **tổ hợp thao tác** là mục bao phủ (ví dụ sau mỗi U, phủ mọi R có thể)."},
  {t:"p",v:"Chủ yếu dùng ở **cấp hệ thống**. Nhắm vào lỗi xử lý thực thể: **vi phạm toàn vẹn dữ liệu, lỗi kiểm soát truy cập, dữ liệu không nhất quán**."},
  {t:"trap",v:["Completeness = **tĩnh** (soi ma trận); consistency = **động** (chạy chức năng). Đề hay đảo.","Thiếu D không chắc là lỗi (có thể chỉ “lưu trữ”), nhưng **luôn là bất thường cần điều tra**."]}
 ],
 summary:["CRUD testing kiểm tra vòng đời thực thể dữ liệu: tạo, đọc, cập nhật, xóa.","Ma trận CRUD: cột là thực thể, dòng là chức năng; chú ý R ngầm định.","Completeness (tĩnh): thực thể thiếu thao tác là bất thường cần điều tra.","Consistency (động): ghép chức năng theo thực thể, phủ mọi thao tác, thêm kiểm thử âm.","Bao phủ = thao tác đã chạy / tổng thao tác; dùng chủ yếu ở cấp hệ thống."],
 terms:[["CRUD matrix","ma trận CRUD"],["entity","thực thể"],["completeness testing","kiểm thử tính đầy đủ"],["consistency testing","kiểm thử tính nhất quán"]]
},
{
 id:"3.2.2", title:"Kiểm thử chuyển đổi trạng thái nâng cao", en:"State Transition Testing", los:["TA-3.2.2"], minutes:55,
 example:"Đơn hàng: Mới → Đã thanh toán → Đang giao → Đã nhận; từ Mới hoặc Đã thanh toán có thể Hủy. Bao phủ mọi chuyển đổi (CTFL) thì đạt hết. Nhưng lỗi thật chỉ xuất hiện khi khách thanh toán rồi hủy ngay: hệ thống quên hoàn tiền vì tưởng hủy từ trạng thái Mới. Lỗi nằm ở CHUỖI hai chuyển đổi “pay → cancel”. 1-switch coverage ép bạn thử mọi cặp chuyển đổi liên tiếp như vậy.",
 blocks:[
  {t:"p",v:"Hệ thống **có trạng thái** phản ứng với sự kiện tùy trạng thái hiện tại: hệ thống nhúng, hệ thống hội thoại, điều khiển, hệ thống xử lý vòng đời thực thể. Trạng thái đơn giản hóa chi tiết bên trong, giúp bên liên quan hiểu hành vi."},
  {t:"p",v:"Trong phân tích, TA đảm bảo mô hình trạng thái thể hiện hành vi **đủ chi tiết để kiểm thử**. Nếu test basis đã có mô hình: kiểm tra có chứa điều kiện kiểm thử không, điều chỉnh hoặc làm mô hình mới. Nút = trạng thái, cạnh = chuyển đổi; chuyển đổi được kích bởi **sự kiện**, có thể có **guard condition** và **hành động**. Biến thể: máy trạng thái hữu hạn mở rộng, Harel statechart, UML state machine."},
  {t:"h",v:"N-switch coverage"},
  {t:"list",v:["**N-switch** = chuỗi hợp lệ gồm **N+1 chuyển đổi liên tiếp**.","**0-switch** = một chuyển đổi → **0-switch coverage = valid transitions coverage** của CTFL.","**1-switch** = cặp chuyển đổi **vào – ra** tại một trạng thái.","Nối thêm chuyển đổi hợp lệ vào cuối N-switch → (N+1)-switch.","0- và 1-switch dùng nhiều trong thực tế. **2-switch trở lên** chỉ khi **rủi ro cao** do chuỗi sự kiện bất ngờ, vì số N-switch có thể **tăng theo hàm mũ**."]},
  {t:"h",v:"Round-trip coverage"},
  {t:"p",v:"**Round trip** là vòng lặp có **trạng thái đầu và cuối trùng nhau**, và **không trạng thái nào khác xuất hiện hai lần**. Mục bao phủ là các round trip. Nghiên cứu (Antoniol et al., 2002) thấy tiêu chí này phát hiện lỗi rất hiệu quả."},
  {t:"lab",kind:"nswitch"},
  {t:"worked",title:"Đếm 1-switch và số ca tối thiểu",given:"Mô hình: T1 Mới→Đã thanh toán; T2 Mới→Đã hủy; T3 Đã thanh toán→Đang giao; T4 Đã thanh toán→Đã hủy; T5 Đang giao→Đã nhận. Mọi ca bắt đầu ở Mới. (a) Có bao nhiêu 0-switch? (b) Liệt kê các 1-switch. (c) Số ca tối thiểu cho 100% 1-switch coverage?",steps:["(a) 0-switch = số chuyển đổi hợp lệ = 5.","(b) Xét từng trạng thái có cả chuyển đổi vào lẫn ra: Đã thanh toán (vào T1; ra T3, T4) → (T1,T3), (T1,T4). Đang giao (vào T3; ra T5) → (T3,T5). Mới không có chuyển đổi vào; Đã hủy, Đã nhận không có chuyển đổi ra.","→ 3 cặp 1-switch.","(c) Ca 1: Mới→Đã thanh toán→Đang giao→Đã nhận phủ (T1,T3), (T3,T5). Ca 2: Mới→Đã thanh toán→Đã hủy phủ (T1,T4)."],answer:"(a) 5; (b) (T1,T3), (T1,T4), (T3,T5); (c) 2 ca."},
  {t:"tip",v:"Cách đếm 1-switch nhanh: với mỗi trạng thái, **số chuyển đổi vào × số chuyển đổi ra**, rồi cộng lại."},
  {t:"p",v:"State transition testing **rất hợp tự động hóa** bằng công cụ model-based testing; góp phần **phòng ngừa khiếm khuyết** vì việc mô hình hóa lộ ra lỗi đặc tả; dùng được ở **mọi cấp**."},
  {t:"trap",v:["0-switch coverage ≠ bao phủ mọi trạng thái.","1-switch = **hai** chuyển đổi liên tiếp (N+1 với N = 1).","Đường đi lặp lại một trạng thái giữa chừng **không phải** round trip."]}
 ],
 summary:["Hệ thống có trạng thái: phản ứng tùy trạng thái; TA đảm bảo mô hình đủ chi tiết để kiểm thử.","N-switch = N+1 chuyển đổi liên tiếp; 0-switch coverage = mọi chuyển đổi hợp lệ.","1-switch = cặp vào–ra tại một trạng thái; đếm nhanh: vào × ra mỗi trạng thái.","2-switch trở lên chỉ khi rủi ro cao vì số lượng tăng theo hàm mũ.","Round trip: vòng lặp đầu = cuối, không trạng thái nào khác lặp; rất hiệu quả. Hợp MBT, mọi cấp."],
 terms:[["N-switch coverage","bao phủ N-switch"],["round-trip coverage","bao phủ khứ hồi"],["guard condition","điều kiện chặn"],["stateful system","hệ thống có trạng thái"]]
},
{
 id:"3.2.3", title:"Kiểm thử dựa trên kịch bản", en:"Scenario-Based Testing", los:["TA-3.2.3"], minutes:50,
 example:"Use case “Đặt vé máy bay”. Kịch bản chính: tìm chuyến → chọn chuyến → nhập hành khách → thanh toán → nhận vé. Extension: thẻ bị từ chối, khách đổi sang ví điện tử và vẫn có vé. Exception: hết chỗ trong lúc thanh toán, không đặt được. Vòng lặp “thêm hành khách” tối đa 9 người: TA thử 0, 1, 3 và 9 hành khách thêm. Một lỗi chỉ xuất hiện với đúng 9 hành khách thêm – trang thanh toán bị tràn.",
 blocks:[
  {t:"p",v:"Scenario-based testing đánh giá hành vi trong **kịch bản thực tế**. User research, user story, persona, user journey map giúp tìm kịch bản giá trị. TA tạo **mô hình kịch bản** từ chuỗi hành động tạo thành luồng công việc. Syllabus bàn hai mô hình: **activity diagram** và **use case** (còn có flowchart, BPMN, sequence diagram – không bàn)."},
  {t:"h",v:"Activity diagram"},
  {t:"p",v:"Biểu diễn đồ họa luồng công việc; hợp mô hình hóa **quy trình nghiệp vụ** và cả luồng điều khiển. Mở rộng flowchart, **mô hình hóa được song song**. Thành phần: nút bắt đầu/kết thúc, hành động, chuyển tiếp, nút quyết định, nút nhập (merge), nút **fork**, nút **join**, **swim lane**."},
  {t:"h",v:"Use case – ba loại kịch bản"},
  {t:"table",head:["Loại","Mô tả","Đạt mục tiêu?"],rows:[["**Main scenario** (happy path)","Chuỗi hành động điển hình, mong đợi. **Mỗi use case chỉ có MỘT**","Có"],["**Extension** (alternative)","Chuỗi khác kịch bản chính nhưng **cuối cùng vẫn đạt** mục tiêu","Có"],["**Exception**","Không đạt mục tiêu do hành động bất ngờ (dùng bất thường, đầu vào không hợp lệ)","**Không**"]]},
  {t:"h",v:"Thiết kế và bao phủ"},
  {t:"list",v:["Kịch bản là **mục bao phủ**, thường ưu tiên theo rủi ro.","**Không có vòng lặp** → mỗi kịch bản (đường đi) một ca; phủ được hết.","**Có vòng lặp** → số đường đi có thể vô hạn → dùng **simple loop coverage**: vòng lặp chạy **0 lần** (bỏ qua), **đúng 1 lần**, **nhiều lần** (số điển hình), **tối đa** (nếu có thể).","**Bao phủ kịch bản = số kịch bản đã chạy / số kịch bản đã xác định.**","Một kịch bản có thể cần **nhiều ca** (ví dụ thêm EP, BVA cho biến trong kịch bản)."]},
  {t:"worked",title:"Đếm kịch bản trong activity diagram",given:"Quy trình đặt đồ ăn: Bắt đầu → Chọn món → [Quyết định 1: giao tận nơi | tự đến lấy] → nhập → [Quyết định 2: trả trước | trả khi nhận] → nhập → [Quyết định 3: có mã giảm giá? có | không] → nhập → Kết thúc. Không có vòng lặp. (a) Có bao nhiêu kịch bản? (b) Nếu thêm vòng lặp “thêm món” (tối đa 20 món) sau Chọn món, cần những số lần lặp nào?",steps:["(a) Các quyết định nối tiếp, độc lập: 2 × 2 × 2 = 8 đường đi.","Không vòng lặp → mỗi đường một ca → 8 ca để phủ 100% kịch bản.","(b) Simple loop coverage: 0 lần (không thêm món), 1 lần, nhiều lần điển hình (ví dụ 3), tối đa 20."],answer:"(a) 8 kịch bản. (b) 0, 1, 3 (điển hình), 20 lần."},
  {t:"p",v:"Thường dùng ở **kiểm thử hệ thống, chấp nhận** dưới dạng **end-to-end** tập trung vào tính phù hợp chức năng từ góc nhìn người dùng. Cũng dùng được ở cấp khác (tích hợp thành phần theo giao thức tương tác, kiểm thử thành phần lớp hướng đối tượng có trạng thái) và **phi chức năng** (kịch bản làm phần tử của operational profile cho kiểm thử độ tin cậy, flexibility, compatibility)."},
  {t:"trap",v:["Extension **vẫn đạt mục tiêu**; exception **không đạt**. Nhập sai PIN một lần rồi đúng → extension; sai 3 lần bị giữ thẻ → exception.","Simple loop coverage có **4** giá trị: 0, 1, nhiều, tối đa – đừng quên 0."]}
 ],
 summary:["Scenario-based testing: hành vi trong kịch bản thực tế; mô hình activity diagram hoặc use case.","Activity diagram mô hình hóa quy trình, có song song (fork/join), swim lane.","Use case: một kịch bản chính, extension (vẫn đạt mục tiêu), exception (không đạt).","Không vòng lặp: mỗi đường một ca; có vòng lặp: simple loop coverage 0, 1, nhiều, tối đa.","Bao phủ = kịch bản đã chạy / đã xác định; thường end-to-end ở hệ thống, chấp nhận."],
 terms:[["activity diagram","sơ đồ hoạt động"],["use case","ca sử dụng"],["main scenario","kịch bản chính"],["extension / exception","kịch bản mở rộng / ngoại lệ"],["simple loop coverage","bao phủ vòng lặp đơn"]]
},
{
 id:"3.3.1", title:"Kiểm thử bảng quyết định nâng cao", en:"Decision Table Testing", los:["TA-3.3.1"], minutes:60,
 example:"Chính sách hoàn vé: thành viên vàng luôn được hoàn 100%; khách thường hủy trước 7 ngày được hoàn 70%, trước 1–6 ngày được 30%, trong ngày bay không hoàn – trừ khi mua gói bảo hiểm. Ba điều kiện, 2 × 3 × 2 = 12 tổ hợp. BA rút gọn còn 4 quy tắc, nhưng tính checksum chỉ được 11: có một tổ hợp bị bỏ quên. Chính tổ hợp đó gây khiếu nại khi lên production.",
 blocks:[
  {t:"p",v:"Hai kỹ thuật **dựa trên quy tắc** kiểm tra hành vi **không trạng thái** đặc tả bằng quy tắc đúng bất kể trạng thái (quy tắc nghiệp vụ): **bảng quyết định** và **metamorphic testing**. Thuật ngữ và ký hiệu theo chuẩn **OMG DMN**."},
  {t:"h",v:"Bảng đầy đủ và rút gọn"},
  {t:"list",v:["**Số quy tắc của bảng đầy đủ = tích số giá trị của các điều kiện** → tăng theo hàm mũ → cần rút gọn.","Rút gọn: từ bảng gốc (đầy đủ hoặc không) tạo bảng **tương đương** có ít quy tắc hơn, gộp bằng toán tử **“–” (don't care)**.","Nên **bỏ qua quy tắc không khả thi** khi gộp; thường loại chúng trước.","Thuật toán hệ thống: tìm quy tắc **tương đương hành động**, **chỉ khác một điều kiện** và **phủ mọi giá trị** của điều kiện đó → gộp, thay bằng “–”.","Kết quả phụ thuộc **thứ tự** gộp các cột, không luôn tối ưu → TA kiểm tra còn rút gọn được nữa không."]},
  {t:"lab",kind:"dt"},
  {t:"h",v:"Review bảng quyết định – 4 tiêu chí"},
  {t:"table",head:["Tiêu chí","Nghĩa"],rows:[["**Consistency** – nhất quán","Hai quy tắc áp dụng cho cùng tổ hợp thì phải tương đương hành động"],["**Feasibility** – khả thi","Không có quy tắc không khả thi"],["**Completeness** – đầy đủ","Không thiếu tổ hợp khả thi nào"],["**Correctness** – đúng","Quy tắc mô hình đúng hành vi mong muốn"]]},
  {t:"p",v:"Ngoài ra nên để quy tắc **không chồng lấn** (mỗi tổ hợp tối đa một quy tắc áp dụng). Chồng lấn hay xảy ra khi bảng gốc đã rút gọn hoặc gộp sai."},
  {t:"h",v:"Thủ tục checksum"},
  {t:"steps",v:[["Tính điểm từng quy tắc của bảng rút gọn","Không có “–” → 1 điểm. Mỗi “–” nhân điểm với số giá trị của điều kiện đó"],["Cộng lại","Tổng = checksum của bảng rút gọn"],["So với bảng gốc","**Nhỏ hơn** → thiếu (incomplete). **Lớn hơn** → chồng lấn hoặc thừa quy tắc (ví dụ không khả thi). **Bằng** → rút gọn có thể đúng"]]},
  {t:"tip",v:"Checksum bằng nhau **không đảm bảo** tương đương: có thể vừa thiếu một tổ hợp vừa chồng lấn một tổ hợp khác, bù trừ nhau."},
  {t:"worked",title:"Checksum bảng hoàn vé",given:"Điều kiện: Thành viên vàng (C/K), Thời điểm hủy (≥7 ngày / 1–6 ngày / trong ngày), Có bảo hiểm (C/K). Bảng gốc đầy đủ. Bảng rút gọn: R1 (C, –, –) → 100%; R2 (K, ≥7, –) → 70%; R3 (K, 1–6, –) → 30%; R4 (K, trong ngày, C) → 30%. Tính checksum và kết luận.",steps:["Bảng gốc: 2 × 3 × 2 = 12.","R1: “–” ở Thời điểm (3) và Bảo hiểm (2) → 3 × 2 = 6.","R2: “–” ở Bảo hiểm → 2. R3: 2. R4: không có “–” → 1.","Checksum = 6 + 2 + 2 + 1 = 11 < 12 → bảng rút gọn **thiếu**.","Tổ hợp thiếu: (K, trong ngày, K) – khách thường hủy trong ngày không bảo hiểm. Cần thêm R5 (K, trong ngày, K) → 0%."],answer:"Checksum 11 < 12: thiếu quy tắc (K, trong ngày, không bảo hiểm). Thêm R5 → checksum 12."},
  {t:"h",v:"Bao phủ và triển khai"},
  {t:"list",v:["**Bao phủ bảng quyết định = số cột đã thực thi / tổng số cột khả thi.**","Khi triển khai ca từ quy tắc có “–”, TA phải **quyết định giá trị cụ thể** cho “–” (vì “–” đại diện ít nhất hai giá trị).","**Rủi ro cao → không rút gọn**, đo bao phủ trên **các cột khả thi của bảng đầy đủ**."]},
  {t:"trap",v:["Bao phủ tính trên cột **khả thi**, không phải tổng cột.","Checksum lớn hơn ≠ thiếu; nhỏ hơn ≠ chồng lấn. Nhớ: **nhỏ = thiếu, lớn = thừa/chồng lấn**."]}
 ],
 summary:["Bảng đầy đủ có số quy tắc = tích số giá trị điều kiện; rút gọn bằng “–”, bỏ quy tắc không khả thi.","Gộp quy tắc tương đương hành động, khác đúng một điều kiện, phủ hết giá trị của nó; kết quả phụ thuộc thứ tự gộp.","Review: nhất quán, khả thi, đầy đủ, đúng; nên không chồng lấn.","Checksum: nhỏ hơn bảng gốc → thiếu; lớn hơn → chồng lấn/thừa; bằng nhau chưa chắc tương đương.","Bao phủ = cột đã chạy / cột khả thi; rủi ro cao thì không rút gọn."],
 terms:[["full decision table","bảng quyết định đầy đủ"],["minimization","rút gọn"],["don't care (–)","không quan tâm"],["checksum","tổng kiểm"],["overlapping rules","quy tắc chồng lấn"]]
},
{
 id:"3.3.2", title:"Metamorphic testing", en:"Metamorphic Testing", los:["TA-3.3.2"], minutes:45,
 example:"App bản đồ tính quãng đường Hà Nội → Hải Phòng là 120 km. Đúng hay sai? Tester không biết chính xác. Nhưng tester biết: đường hai chiều thì Hải Phòng → Hà Nội cũng phải 120 km; thêm điểm dừng ở Hải Dương thì quãng đường không thể ngắn hơn 120 km. Không cần biết đáp án đúng, chỉ cần kiểm tra các quan hệ đó – và đã có lần quãng đường chiều về ngắn hơn 4 km vì thuật toán bỏ qua đường một chiều sai.",
 blocks:[
  {t:"p",v:"Metamorphic testing (MT) sinh ca kiểm thử dựa trên một **ca nguồn (source test case)** có sẵn. Một hoặc nhiều **ca theo sau (follow-up test case)** được tạo bằng cách “biến hình” ca nguồn theo một **quan hệ biến hình (metamorphic relation – MR)**. MR định nghĩa một **thuộc tính** của test item, mô tả **thay đổi đầu vào phản ánh thế nào lên kết quả mong đợi**."},
  {t:"p",v:"TA ghép ca nguồn và ca theo sau của một MR thành **một thủ tục kiểm thử**, đánh giá kết quả **chung**: thỏa MR → đạt; không thỏa → trượt. Khi trượt, **gỡ lỗi** phải xác định ca nào trong các ca liên quan đã sai."},
  {t:"h",v:"Ví dụ: hàm tính trung bình"},
  {t:"table",head:["MR","Ca nguồn","Ca theo sau","Kết quả mong đợi"],rows:[["Hoán vị dãy số thì trung bình không đổi","(2, 4, 6) → 4","(6, 2, 4)","4"],["Nhân mỗi số với x thì trung bình nhân x","(2, 4, 6) → 4","x = 3: (6, 12, 18)","12"],["Kết hợp hai MR","(2, 4, 6) → 4","Hoán vị và nhân 2: (12, 4, 8)","8"]]},
  {t:"h",v:"Khi có bài toán oracle"},
  {t:"p",v:"MT dùng được **khi không có kết quả mong đợi** của cả ca nguồn lẫn ca theo sau: không đánh giá từng ca riêng, chỉ kiểm tra quan hệ. Ví dụ syllabus: chương trình bảo hiểm dùng AI dự đoán tuổi thọ – MR: tăng số điếu thuốc hút thì tuổi dự đoán phải giảm."},
  {t:"h",v:"Bao phủ và kết hợp"},
  {t:"list",v:["**Chưa có độ đo bao phủ được công nhận** làm tiêu chí thoát hữu ích. **Phủ mỗi MR một lần là không đủ** vì chỉ xác nhận được một phần kết quả.","Kết hợp với **random testing** để sinh nhiều ca nguồn và ca theo sau cho cùng MR (sinh ngẫu nhiên dãy số, hoán vị, hệ số nhân).","Dùng được cho hầu hết test item, cả **chức năng lẫn phi chức năng** (kiểm thử tải: sinh tải bằng ca theo sau; installability: tham số cài đặt theo nhiều thứ tự).","Là kỹ thuật **được ưu tiên cho hệ thống dựa trên AI**."]},
  {t:"worked",title:"Viết MR cho chức năng tìm kiếm",given:"Chức năng tìm kiếm sản phẩm có bộ lọc giá. Ca nguồn: tìm “tai nghe”, không lọc, ra N kết quả. Hãy viết 3 MR và ca theo sau tương ứng.",steps:["MR1 – thu hẹp: thêm bộ lọc giá 0–500.000 đ → số kết quả ≤ N, và mọi kết quả có giá trong khoảng.","MR2 – hoán vị điều kiện: tìm “tai nghe bluetooth” và “bluetooth tai nghe” → cùng tập kết quả (nếu đặc tả nói tìm không phụ thuộc thứ tự từ).","MR3 – hợp: kết quả lọc 0–500k cộng kết quả lọc trên 500k = đúng N kết quả, không trùng.","Mỗi MR không cần biết N bằng bao nhiêu – chỉ kiểm tra quan hệ."],answer:"Ví dụ: (1) thêm bộ lọc → ≤ N; (2) đảo thứ tự từ khóa → cùng kết quả; (3) chia khoảng giá → tổng hai phần = N. Có thể sinh ngẫu nhiên từ khóa và khoảng giá để chạy nhiều lần."},
  {t:"trap",v:["MR **không** nêu giá trị đúng tuyệt đối (“kết quả phải là 12,4 km” không phải MR).","Yêu cầu hiệu năng (“trả lời trong 1 giây”) không phải MR.","Phủ mỗi MR một lần **không** đủ làm tiêu chí thoát."]}
 ],
 summary:["MT sinh ca theo sau từ ca nguồn theo quan hệ biến hình (MR): thay đổi đầu vào phản ánh thế nào lên kết quả.","Ca nguồn và ca theo sau ghép thành một thủ tục, đánh giá chung; trượt thì gỡ lỗi để tìm ca sai.","Dùng được khi có bài toán oracle; được ưu tiên cho hệ thống AI.","Không có độ đo bao phủ công nhận; phủ mỗi MR một lần là không đủ; kết hợp random testing.","Áp dụng cho chức năng và phi chức năng; có thể kết hợp nhiều MR."],
 terms:[["metamorphic relation (MR)","quan hệ biến hình"],["source test case","ca nguồn"],["follow-up test case","ca theo sau"],["metamorphic testing","kiểm thử biến hình"]]
},
{
 id:"3.4.1", title:"Test charter cho kiểm thử theo phiên", en:"Test Charters Supporting Session-Based Testing", los:["TA-3.4.1"], minutes:40,
 example:"Thay vì viết 80 ca cho tính năng “đổi điểm thưởng” mới, TA soạn 3 charter, mỗi phiên 90 phút. Charter 1: “Explore luồng đổi điểm với tài khoản sắp hết hạn điểm, điểm âm và hai thiết bị đăng nhập cùng lúc to discover lỗi trừ điểm sai và tranh chấp đồng thời”. Ghi chú thêm: hệ thống không bao giờ được trừ điểm khi giao dịch thất bại; lỗi cũ: “trừ điểm hai lần khi bấm nhanh”. Trong phiên, cô ghi câu hỏi và ý tưởng vào session sheet, tìm ra 4 lỗi.",
 blocks:[
  {t:"p",v:"Các kỹ thuật dựa trên kinh nghiệm (session-based, checklist-based, crowd) dùng được trong **kiểm thử dựa trên cộng tác** như ATDD."},
  {t:"p",v:"Trong kiểm thử thăm dò, **test charter** là **nhiệm vụ của một phiên kiểm thử**: phạm vi, mục tiêu, giới hạn, thời hạn, rủi ro. Nó là **lộ trình**, giúp TA tập trung mà vẫn linh hoạt thăm dò. **Charter không chỉ định test suite sẽ chạy trong phiên.**"},
  {t:"h",v:"Ba nhóm yếu tố khi soạn charter"},
  {t:"table",head:["Nhóm","Ví dụ"],rows:[["**Khách hàng và yêu cầu**","Yêu cầu khách hàng, use case nghiệp vụ, yêu cầu chất lượng, **user journey map**"],["**Sản phẩm**","Luồng chức năng, mục tiêu chính, tính năng, thiết kế, giao diện"],["**Quản lý dự án**","Ràng buộc thời gian, mục đích dự án, công sức ước tính, **giá trị kinh doanh**"]]},
  {t:"h",v:"Mission – định dạng nhẹ (Hendrickson, 2013)"},
  {t:"p",v:"**Explore** [target] **With** [resources] **To discover** [information]"},
  {t:"list",v:["**Target**: khu vực, tính năng, rủi ro, thành phần, yêu cầu cần thăm dò.","**Resources**: dữ liệu, cấu hình, công cụ, ràng buộc, heuristic, phụ thuộc.","**Information**: loại thông tin muốn tìm – đánh giá đặc tính chất lượng, loại lỗi mong đợi, vi phạm chuẩn."]},
  {t:"h",v:"Thông tin bổ sung (Ghazi et al., 2017)"},
  {t:"list",v:["**Tổ chức**: thời lượng phiên, ngày giờ, tên tester","**Mục tiêu**: động lực, mission","**Phạm vi**: vùng quan tâm, cấp độ, kỹ thuật, ý tưởng test, tiêu chí thoát, ưu tiên, **những gì không test**","**Tiêu chí đầu vào**: tiền điều kiện để bắt đầu phiên","**Thông tin sản phẩm**: định nghĩa, dữ liệu, luồng giữa thành phần, kiến trúc","**Giới hạn (limitations)**: những gì sản phẩm **không bao giờ được làm**","Mô tả **môi trường**; **nguồn dữ liệu, tài liệu, công cụ** hỗ trợ","**Lịch sử**: lỗi cũ (ví dụ lỗi tương thích, tương tác), câu hỏi mở, mẫu sự cố trước đây","**Ràng buộc và rủi ro**: quy định, chuẩn"]},
  {t:"p",v:"Trong phiên, TA ghi **test log** gồm câu hỏi, quan sát, ý tưởng cho lần sau và kết quả vào **session sheet**."},
  {t:"compare",l:{h:"Charter thoáng",q:"Chỉ nêu mục tiêu chung",v:["Nhiều chỗ thăm dò","Hợp tester giàu kinh nghiệm, vùng mới"]},r:{h:"Charter chi tiết",q:"Thêm kỹ thuật bắt buộc, giới hạn",v:["Kỹ thuật bắt buộc **hạn chế** sự linh hoạt","Ghi rõ điều hệ thống **chắc chắn không làm** giúp **giảm dương tính giả**"]}},
  {t:"worked",title:"Soạn test charter",given:"Tính năng mới: “Chia hóa đơn nhóm” trong app thanh toán – một người trả, chia cho tối đa 10 người, mỗi người trả qua link. Rủi ro lớn: số tiền chia lệch, người đã trả vẫn bị nhắc. Hãy soạn mission và 4 mục thông tin bổ sung cho phiên 60 phút.",steps:["Mission: Explore tính năng chia hóa đơn **with** nhóm 1, 3 và 10 người, số tiền lẻ không chia hết (100.001 đ), link mở trên hai thiết bị **to discover** lỗi làm tròn, lệch tổng và trạng thái thanh toán sai.","Tổ chức: 60 phút, 14:00 thứ Ba, tester Lan.","Giới hạn: tổng các phần chia **không bao giờ** được khác tổng hóa đơn; người đã trả **không bao giờ** bị nhắc lại.","Lịch sử: lỗi cũ BUG-212 làm tròn sai khi chia 3.","Ngoài phạm vi: không test cổng thanh toán quốc tế."],answer:"Mission theo dạng Explore/With/To discover + thông tin tổ chức, giới hạn, lịch sử, phạm vi loại trừ. Không liệt kê test suite cụ thể."},
  {t:"trap",v:["Charter chỉ định danh sách TC cụ thể → sai bản chất.","“Limitations” = điều sản phẩm **không bao giờ được làm**, không phải hạn chế của tester."]}
 ],
 summary:["Test charter là nhiệm vụ của phiên: phạm vi, mục tiêu, giới hạn, thời hạn, rủi ro; không chỉ định test suite.","Ba nhóm yếu tố: khách hàng và yêu cầu, sản phẩm, quản lý dự án.","Mission: Explore [target] With [resources] To discover [information].","Thông tin thêm: tổ chức, mục tiêu, phạm vi, đầu vào, sản phẩm, giới hạn, môi trường, nguồn, lịch sử, ràng buộc.","Ghi test log vào session sheet; thêm kỹ thuật bắt buộc hạn chế linh hoạt, thêm giới hạn giảm dương tính giả."],
 terms:[["test charter","bản điều lệ kiểm thử"],["session-based testing","kiểm thử theo phiên"],["session sheet","bảng ghi phiên"],["user journey map","bản đồ hành trình người dùng"]]
},
{
 id:"3.4.2", title:"Checklist cho kiểm thử dựa trên kinh nghiệm", en:"Checklists Supporting Experience-Based Test Techniques", los:["TA-3.4.2"], minutes:40,
 example:"Đội test form đăng ký của 6 sản phẩm khác nhau. Mỗi lần, ai đó lại quên thử email có dấu “+” hoặc họ tên có dấu tiếng Việt. TA gom kinh nghiệm thành checklist “Form nhập liệu”, chia nhóm: Trường văn bản, Ngày tháng, Thông báo lỗi, Khả năng tiếp cận. Mục được viết dạng câu hỏi có/không, có độ ưu tiên. Sau mỗi release, lỗi nào lọt được thêm thành mục mới.",
 blocks:[
  {t:"p",v:"Checklist-based testing phổ biến vì **thích ứng, đơn giản, hiệu quả**. Checklist giúp TA phủ mọi khía cạnh thiết yếu đã biết, tránh bỏ sót; tạo **nhất quán** giữa các chu kỳ và giữa các TA; là cách **ghi lại kinh nghiệm** về sự cố và khiếm khuyết; là nguồn cảm hứng khi hết ý tưởng (ví dụ lúc thăm dò). Dùng lại checklist của mình hoặc đồng nghiệp tiết kiệm thời gian – **nếu phù hợp với test item**. Giảm công viết ca kiểm thử, có giá trị khi yêu cầu và phần mềm thay đổi liên tục."},
  {t:"h",v:"Ba bước soạn checklist"},
  {t:"steps",v:[["1. Phạm vi, mục tiêu, định dạng","Ảnh hưởng độ sâu và mức chi tiết. Chọn read-do hoặc do-confirm"],["2. Thu thập thông tin để định nghĩa mục","Chuyên gia giàu kinh nghiệm, **thư viện lỗi, taxonomy lỗi** (Beizer; Kaner), tài liệu, phân tích rủi ro, ca kiểm thử, kịch bản tiềm năng"],["3. Cấu trúc và tổ chức","Nhóm mục logic theo khu vực chức năng, vai trò người dùng, cấp kiểm thử… Đặc biệt hữu ích cho checklist dài"]]},
  {t:"compare",l:{h:"Read-do",q:"Đọc rồi làm",v:["Chứa yếu tố chính cần làm cho một quy trình","Ví dụ: mục chứa **đầu vào không hợp lệ cụ thể** cho một trường"]},r:{h:"Do-confirm",q:"Làm rồi xác nhận",v:["Hỗ trợ dẫn dắt tư duy, gợi ý ý tưởng thăm dò","Ví dụ: “kết quả tìm kiếm có liên quan không?”"]}},
  {t:"h",v:"Mục checklist tốt"},
  {t:"list",v:["**Rõ, cụ thể, không mơ hồ, nhất quán, liên quan, bảo trì được, hành động được, đo được.**","Viết dạng **câu hỏi** trả lời **có / không / không áp dụng**.","Có **độ ưu tiên** theo tầm quan trọng, tác động tiềm năng, mức rủi ro.","Checklist **không phải hướng dẫn how-to** đầy đủ; là công cụ nhanh, đơn giản cho người có chuyên môn."]},
  {t:"table",head:["Mục chưa tốt","Mục tốt"],rows:[["Kiểm tra giao diện đẹp","Nhãn của mọi trường bắt buộc có dấu * không?"],["Test đăng nhập","Sau 5 lần sai mật khẩu, tài khoản có bị khóa 15 phút không?"],["Kiểm tra thông báo lỗi","Thông báo lỗi có nêu đúng trường không hợp lệ không?"]]},
  {t:"h",v:"Duy trì"},
  {t:"p",v:"Dùng **mẫu và chuẩn** khi có thể để tiết kiệm công. Checklist **không bao giờ hoàn tất**: TA liên tục rà và tinh chỉnh theo phát hiện mới, ưu tiên thay đổi, phản hồi, bài học. **Chia sẻ** checklist giúp nhất quán, cộng tác và giúp người khác hiểu vùng quan trọng."},
  {t:"worked",title:"Viết checklist read-do và do-confirm",given:"Soạn checklist cho ô “Số điện thoại” của form đặt hàng (Việt Nam). Viết 3 mục read-do và 2 mục do-confirm, có ưu tiên.",steps:["Read-do (Cao): Nhập “0912345678” (10 số hợp lệ) – có được chấp nhận không?","Read-do (Cao): Nhập “091234567” (9 số) và “09123456789” (11 số) – có bị từ chối với thông báo đúng không?","Read-do (Trung bình): Nhập “+84912345678” – có được chuẩn hóa thành 0912345678 không?","Do-confirm (Trung bình): Thông báo lỗi có giúp người dùng biết cách sửa không?","Do-confirm (Thấp): Bàn phím số có tự bật trên điện thoại không?"],answer:"Read-do chứa giá trị cụ thể để làm theo; do-confirm gợi tư duy. Mỗi mục là câu hỏi có/không, có ưu tiên, nhóm dưới “Trường số điện thoại”."},
  {t:"trap",v:["Checklist bao trùm mọi khả năng, viết như hướng dẫn nhiều bước → sai.","TA không bị giới hạn chỉ ở các mục trong checklist."]}
 ],
 summary:["Checklist giúp phủ khía cạnh thiết yếu, nhất quán, ghi lại kinh nghiệm, giảm công viết ca.","Ba bước: phạm vi/mục tiêu/định dạng → thu thập thông tin → cấu trúc, nhóm mục.","Read-do: việc cụ thể (giá trị không hợp lệ cụ thể); do-confirm: gợi ý tư duy.","Mục: rõ, cụ thể, hành động và đo được, dạng câu hỏi có/không/N/A, có ưu tiên; không phải how-to.","Dùng mẫu chuẩn khi hợp; checklist không bao giờ hoàn tất; chia sẻ để cộng tác."],
 terms:[["checklist-based testing","kiểm thử dựa trên checklist"],["read-do checklist","checklist đọc – làm"],["do-confirm checklist","checklist làm – xác nhận"],["defect taxonomy","phân loại khiếm khuyết"]]
},
{
 id:"3.4.3", title:"Crowd testing", en:"Crowd Testing", los:["TA-3.4.3"], minutes:20,
 example:"App học tiếng Anh sắp ra mắt ở 5 nước. Đội nội bộ có 12 điện thoại. Họ thuê nền tảng crowd testing: 300 tester ở 5 nước, 180 mẫu máy, mạng 3G đến 5G, trong 3 ngày. Kết quả: 70 lỗi hiển thị font trên máy đời cũ – nhưng cũng 400 báo cáo trùng nhau, và đội phải ký NDA kỹ vì app chưa công bố.",
 blocks:[
  {t:"p",v:"Crowd testing phân phối kiểm thử cho **nhóm tester nội bộ hoặc bên ngoài** đa dạng về nền tảng và vị trí. Là cách **tiết kiệm** để thẩm định usability, phủ cả đặc tính **chức năng và phi chức năng**."},
  {t:"table",head:["Lợi ích","Hạn chế"],rows:[
   ["**Môi trường đa dạng**: nhiều vị trí, thiết bị, trình duyệt, điều kiện mạng","**Chất lượng không ổn định**: phụ thuộc kỹ năng từng người (ít quan trọng nếu mục tiêu là phản hồi trải nghiệm)"],
   ["**Linh hoạt**: mở rộng nhanh, nhiều test trong thời gian ngắn","**Khó giao tiếp**: múi giờ, văn hóa, ngôn ngữ"],
   ["**Tiết kiệm**: rẻ hơn duy trì đội nội bộ lớn, đa dạng","**Bảo mật**: chia sẻ phần mềm cho người ngoài; biện pháp phù hợp giúp giảm rủi ro, tránh lộ thông tin, đạo nhái"],
   ["**Phản hồi nhanh**","**Tài liệu và báo cáo**: khó quản lý nhiều phát hiện, **trùng lặp, dương tính giả**"],
   ["**Góc nhìn người dùng thật**, giá trị cho UAT",""],
   ["**Biến thiên**: mỗi lần do người khác chạy nên **kém lặp lại**, nhưng nhờ đó **phủ rộng hơn**, tăng cơ hội tìm lỗi",""]]},
  {t:"tip",v:"Crowd testing **không thay thế** TA dùng kỹ thuật kiểm thử; nó **tăng bao phủ môi trường đa dạng**."},
  {t:"trap",v:["“Biến thiên” vừa là hạn chế (không lặp lại được) vừa là lợi ích (phủ rộng) – syllabus xếp nó vào nhóm lợi ích.","Crowd testing không chỉ dùng người ngoài – có thể là tester nội bộ."]}
 ],
 summary:["Crowd testing phân phối test cho nhóm tester đa dạng (nội bộ hoặc bên ngoài), phủ chức năng và phi chức năng.","Lợi ích: môi trường đa dạng, linh hoạt, tiết kiệm, phản hồi nhanh, góc nhìn người dùng thật, biến thiên phủ rộng.","Hạn chế: chất lượng không ổn định, khó giao tiếp, bảo mật, khó quản lý báo cáo (trùng, dương tính giả).","Không thay thế TA; bổ sung bao phủ môi trường."],
 terms:[["crowd testing","kiểm thử cộng đồng"],["variability","tính biến thiên"],["non-disclosure agreement (NDA)","thỏa thuận bảo mật"]]
},
{
 id:"3.5.1", title:"Chọn kỹ thuật để giảm thiểu rủi ro sản phẩm", en:"Selecting Test Techniques to Mitigate Product Risks", los:["TA-3.5.1"], minutes:55,
 example:"Ba dự án, ba lựa chọn. Phần mềm tính kết cấu cầu: điều kiện an toàn là các bất đẳng thức – domain testing. Hệ thống xét duyệt tín dụng: hàng chục quy tắc chồng nhau – bảng quyết định. App gợi ý nhạc dùng AI: không có “đáp án đúng” – metamorphic và thăm dò. Ở dự án xe tự lái theo ISO 26262, tiêu chuẩn còn bắt buộc EP, BVA tùy mức ASIL. Chọn kỹ thuật không phải theo thói quen mà theo rủi ro và bối cảnh.",
 blocks:[
  {t:"p",v:"TA hỗ trợ test manager chọn kỹ thuật phù hợp nhất để kiểm thử **hiệu quả và hiệu suất**. Các yếu tố ảnh hưởng:"},
  {t:"table",head:["Yếu tố","Ảnh hưởng tới lựa chọn"],rows:[
   ["**Mục tiêu kiểm thử**","Phụ thuộc loại hệ thống: domain testing cho tính toán số học trong kỹ thuật; bảng quyết định cho quản lý rủi ro tín dụng"],
   ["**Rủi ro sản phẩm**","Mỗi nhóm kỹ thuật nhắm loại lỗi riêng (bảng dưới). Rủi ro càng cao, bao phủ càng nghiêm ngặt (tổ hợp đầy đủ thay vì pairwise), nhưng phải cân với công sức. **Kinh nghiệm** dùng khi khó định nghĩa bao phủ, rủi ro thấp, hoặc lịch gấp"],
   ["**Test basis**","Đặc tả dùng mô hình → kỹ thuật dựa trên mô hình đó. Khó suy ra oracle → **metamorphic** hoặc **kinh nghiệm**"],
   ["**Loại lỗi lặp lại**","Chọn kỹ thuật nhắm loại lỗi đó (ví dụ checklist). Kỹ thuật từng thành công có thể dùng lại"],
   ["**Kiến thức, kinh nghiệm tester**","Chưa quen kỹ thuật → không dùng cho việc quan trọng. Ít kiến thức miền → thăm dò có thể kém hiệu quả"],
   ["**SDLC**","Tuần tự → kỹ thuật hình thức hơn; lặp → kỹ thuật nhẹ (kinh nghiệm) hoặc khi thiết kế được tự động hóa"],
   ["**Hợp đồng, khách hàng**","Bộ kịch bản chấp nhận từ khách → kỹ thuật dựa trên kịch bản"],
   ["**Quy định**","ISO 26262: EP, BVA, error guessing tùy mức ASIL"],
   ["**Ràng buộc dự án**","Thời gian, ngân sách hạn chế kỹ thuật tốn kém"]]},
  {t:"h",v:"Nhóm kỹ thuật ↔ loại lỗi"},
  {t:"table",head:["Nhóm","Phát hiện tốt"],rows:[["**Dựa trên dữ liệu**","Lỗi xử lý dữ liệu, hiện thực miền, giao diện người dùng, tính toán, tổ hợp tham số"],["**Dựa trên hành vi**","Lỗi yêu cầu người dùng: thiếu tính năng, lỗi giao tiếp, lỗi xử lý"],["**Dựa trên quy tắc**","Lỗi logic và luồng điều khiển"]]},
  {t:"h",v:"Kết hợp kỹ thuật"},
  {t:"list",v:["**BVA** cho guard condition trong state transition testing.","**Domain testing** trong scenario-based testing để xác định giá trị điều kiện từ bảng quyết định hoặc biến.","**Scenario-based + decision coverage** (hộp trắng) để phủ nghiêm các quyết định trong quy trình nghiệp vụ (process cycle testing).","**Scenario-based + round-trip coverage** cho rủi ro của hoạt động nghiệp vụ **có chu kỳ**."]},
  {t:"worked",title:"Chọn kỹ thuật cho tình huống (dạng K4)",given:"Ứng dụng đặt lịch tiêm chủng. Rủi ro: (R1) độ tuổi được tiêm từng loại vắc-xin bị cài sai mốc (ví dụ “≥ 6 tháng VÀ < 5 tuổi”); (R2) mũi nhắc lại được xếp sai do các quy tắc khoảng cách giữa mũi, loại vắc-xin, tiền sử phản ứng đan xen; (R3) lịch hẹn đi qua Đã đặt → Đã xác nhận → Đã tiêm hoặc Đã hủy → Đặt lại, lỗi khi hủy rồi đặt lại; (R4) chạy trên 5 trình duyệt × 3 hệ điều hành × 2 ngôn ngữ. Chọn kỹ thuật cho mỗi rủi ro.",steps:["R1: điều kiện số học nhiều biên → **domain testing** (reliable coverage vì liên quan y tế).","R2: tổ hợp quy tắc nghiệp vụ → **bảng quyết định**, rủi ro cao nên không rút gọn, đo trên cột khả thi của bảng đầy đủ.","R3: vòng đời có vòng lặp hủy → đặt lại → **state transition** với **round-trip** hoặc **1-switch coverage**.","R4: tương tác cấu hình → **combinatorial, pairwise**."],answer:"R1 domain testing; R2 decision table (không rút gọn); R3 state transition với round-trip/1-switch; R4 pairwise."},
  {t:"trap",v:["Câu K4 thường có 2 phương án “nghe hợp lý”. Hỏi: rủi ro cụ thể là **loại lỗi gì**? rồi khớp với nhóm kỹ thuật.","Không có oracle → metamorphic **hoặc** kinh nghiệm – câu chọn hai hay hỏi đúng cặp này.","Rủi ro thấp + lịch gấp + khó định nghĩa bao phủ → kinh nghiệm."]}
 ],
 summary:["Chọn kỹ thuật theo: mục tiêu, rủi ro, test basis, loại lỗi lặp lại, kinh nghiệm tester, SDLC, hợp đồng, quy định, ràng buộc dự án.","Dữ liệu → lỗi dữ liệu, miền, tính toán, tổ hợp; hành vi → thiếu tính năng, giao tiếp, xử lý; quy tắc → logic, luồng điều khiển.","Rủi ro cao → bao phủ nghiêm ngặt hơn; rủi ro thấp, lịch gấp → kinh nghiệm.","Không có oracle → metamorphic hoặc kinh nghiệm.","Kết hợp: BVA + state transition; domain + scenario; scenario + decision coverage; scenario + round-trip."],
 terms:[["test technique selection","lựa chọn kỹ thuật kiểm thử"],["coverage strength","độ mạnh bao phủ"],["process cycle testing","kiểm thử chu trình quy trình"],["ASIL","mức toàn vẹn an toàn ô tô"]]
},
{
 id:"3.5.2", title:"Lợi ích và rủi ro khi tự động hóa thiết kế kiểm thử", en:"Benefits and Risks of Automating the Test Design", los:["TA-3.5.2"], minutes:25,
 example:"TA vẽ mô hình trạng thái của quy trình đăng ký vay trong công cụ MBT, đặt tiêu chí round-trip coverage, bấm “Generate”: 46 ca kiểm thử xuất ra Excel và file Robot Framework. Khi quy trình thêm trạng thái “Chờ bổ sung hồ sơ”, cô chỉ sửa mô hình và sinh lại. Nhưng một quy tắc về hạn mức không nằm trong mô hình trạng thái – và không ca sinh ra nào kiểm tra nó.",
 blocks:[
  {t:"p",v:"TA có thể dùng công cụ để áp dụng kỹ thuật, nhất là hộp đen. Khi **tự động hóa thiết kế kiểm thử**, TA tạo **mô hình kiểm thử** rồi **sinh testware tự động** từ mô hình. Ví dụ: vẽ mô hình chuyển đổi trạng thái, để công cụ MBT sinh ca cho round-trip coverage."},
  {t:"h",v:"9 lợi ích"},
  {t:"table",head:["Lợi ích","Giải thích"],rows:[
   ["Phòng ngừa khiếm khuyết","Mô hình hóa giúp đánh giá chất lượng test basis (5.2.1)"],
   ["Mở rộng năng lực","Áp dụng kỹ thuật và tiêu chí phức tạp: combinatorial, random, N-switch"],
   ["Dễ hiểu hơn","Tiêu chí chọn test trong công cụ thể hiện rõ điều kiện, giải thích bao phủ dễ hơn"],
   ["Bớt việc lặp lại","Sinh testware từ mô hình, giảm việc đặc tả test thủ công"],
   ["Giảm công bảo trì","Mô hình là **nguồn sự thật duy nhất**; chỉ cần bảo trì mô hình"],
   ["Ít lỗi testware hơn","Làm tay dễ sai; testware sinh ra chất lượng, nhất quán hơn"],
   ["Cộng tác nhóm tốt hơn","Bên liên quan review mô hình để tìm lỗi, hiểu điều kiện"],
   ["Truy vết tốt hơn","Liên kết phần tử mô hình với điều kiện dễ hơn; ca sinh ra kế thừa liên kết"],
   ["Nhiều định dạng đầu ra","Xuất testware theo định dạng cho công cụ và hoạt động sau"]]},
  {t:"h",v:"Rủi ro"},
  {t:"list",v:["**Bỏ sót điều kiện kiểm thử** không thể hiện trong mô hình.","**Đánh giá thấp** công bảo trì mô hình.","Bên liên quan thấy **mô hình khó hiểu**.","Rủi ro **chung của tự động hóa** (CTFL 6.2): kỳ vọng phi thực tế, ước lượng sai thời gian, chi phí, phụ thuộc quá nhiều vào công cụ…"]},
  {t:"tip",v:"Mẹo nhớ lợi ích: “Ngừa – Rộng – Rõ – Bớt – Gọn – Chuẩn – Chung – Vết – Dạng”."}
 ],
 summary:["Tự động hóa thiết kế: tạo mô hình kiểm thử, sinh testware từ mô hình (ví dụ MBT cho round-trip).","Lợi ích: phòng ngừa lỗi, mở rộng năng lực, dễ hiểu, bớt lặp, giảm bảo trì (mô hình là nguồn sự thật), ít lỗi testware.","Thêm: cộng tác tốt hơn, truy vết tốt hơn, nhiều định dạng đầu ra.","Rủi ro: bỏ sót điều kiện ngoài mô hình, đánh giá thấp bảo trì mô hình, mô hình khó hiểu, rủi ro chung của tự động hóa."],
 terms:[["test model","mô hình kiểm thử"],["model-based testing (MBT)","kiểm thử dựa trên mô hình"],["single source of truth","nguồn sự thật duy nhất"],["test generation","sinh ca kiểm thử"]]
}
];
