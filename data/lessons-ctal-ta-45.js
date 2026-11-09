/* The QA Lab – bài học chi tiết CTAL-TA v4.0, chương 4 và 5. */
(function(){
const C = window.QALAB.certs["ctal-ta"];
C.lessons[4] = [
{
 id:"4.1.1", title:"Đúng đắn, thích đáng và đầy đủ chức năng", en:"Functional Testing", los:["TA-4.1.1"], minutes:25,
 example:"App đặt lịch khám. Yêu cầu có 12 chức năng nhưng bản build chỉ có 11 – thiếu “hủy lịch”: vấn đề đầy đủ. Đặt lịch 9:00 giờ Việt Nam từ điện thoại đang để giờ Singapore thì hiển thị 10:00: vấn đề đúng đắn. Mọi thứ đúng đặc tả nhưng người cao tuổi phải qua 7 màn hình mới đặt được lịch: vấn đề thích đáng.",
 blocks:[
  {t:"p",v:"Chương 4 dùng mô hình chất lượng **ISO/IEC 25010:2023** (thuật ngữ usability theo syllabus Usability Testing). Kiểm thử chức năng là **việc cốt lõi** của TA; CTFL chỉ tóm tắt, CTAL-TA đi vào ba **đặc tính con của tính phù hợp chức năng**. Không phải hoạt động kiểm thử nào cũng phủ ba cái như nhau – TA phải chọn cấp độ và kỹ thuật phù hợp với rủi ro của từng đặc tính con."},
  {t:"table",head:["","Completeness – Đầy đủ","Correctness – Đúng đắn","Appropriateness – Thích đáng"],rows:[
   ["Câu hỏi then chốt","Mọi thứ **được yêu cầu** đã được hiện thực?","Kết quả có **đúng** (chính xác, nhất quán) với đầu vào hợp lệ và không hợp lệ?","Mọi thứ **đã hiện thực** có đáp ứng **nhu cầu người dùng**, giúp hoàn thành nhiệm vụ?"],
   ["Khi nào","Sớm nhất có thể: review đặc tả (tuần tự), thảo luận user story và tiêu chí chấp nhận (Agile); động ở hệ thống, tích hợp hệ thống, chấp nhận","Mọi cấp. Theo **shift left**, phần lớn nên ở **kiểm thử thành phần và tích hợp thành phần** – TA nên góp phần dù không phụ trách","Review thiết kế giao diện; động từ kiểm thử hệ thống, chấp nhận (tuần tự) hoặc **demo** (Agile)"],
   ["Kỹ thuật hợp","Dựa trên hành vi (scenario-based); hộp đen khác cũng được. **Truy vết** là thiết yếu","Mọi kỹ thuật hộp đen, kinh nghiệm, cộng tác. Cần **test oracle** tốt","**Exploratory** và **collaboration-based** hợp nhất; hành vi cũng hợp"]]},
  {t:"tip",v:"Mẹo: **Đủ** – có chưa? **Đúng** – ra đúng không? **Dùng được** – có giúp làm xong việc không?"},
  {t:"trap",v:["Tính năng đúng đặc tả nhưng khó dùng để hoàn thành nhiệm vụ → appropriateness, không phải correctness.","Completeness cần **truy vết**; correctness cần **oracle**."]}
 ],
 summary:["Tính phù hợp chức năng gồm đầy đủ, đúng đắn, thích đáng (ISO 25010:2023).","Completeness: mọi thứ được yêu cầu có chưa; kiểm tra sớm bằng review, user story; cần truy vết; scenario-based hợp.","Correctness: kết quả đúng với đầu vào hợp lệ và không hợp lệ; cần oracle tốt; dịch trái vào kiểm thử thành phần.","Appropriateness: chức năng có giúp người dùng hoàn thành nhiệm vụ; review UI, exploratory, collaboration-based, demo."],
 terms:[["functional suitability","tính phù hợp chức năng"],["functional completeness","tính đầy đủ chức năng"],["functional correctness","tính đúng đắn chức năng"],["functional appropriateness","tính thích đáng chức năng"]]
},
{
 id:"4.2.1", title:"TA đóng góp vào kiểm thử khả năng sử dụng", en:"Usability Testing", los:["TA-4.2.1"], minutes:20,
 example:"Ngân hàng làm app cho người lớn tuổi. TA tùy biến checklist usability chung: thêm “cỡ chữ ≥ 16pt”, “không dùng cử chỉ vuốt nhiều ngón”. Cô viết kịch bản cho buổi usability test theo persona “bác Hoa, 68 tuổi, chỉ dùng Zalo”: chuyển tiền cho con trong 3 phút. Sau đó cô giúp thiết kế bảng hỏi và tổng hợp phản hồi. Với accessibility, cô xác định app cần đạt WCAG mức AA vì có người dùng thị lực kém.",
 blocks:[
  {t:"p",v:"Usability là khái niệm rộng về chất lượng hướng người dùng: **interaction capability** (mô hình chất lượng sản phẩm ISO 25010) và **beneficialness** (mô hình chất lượng khi sử dụng ISO 25019). Tham khảo thêm ISTQB-UT, ISO 9241-210, UXQB."},
  {t:"table",head:["Khía cạnh","Nội dung"],rows:[["**Interaction capability**","Giúp người dùng hoàn thành nhiệm vụ trong bối cảnh sử dụng **hiệu quả, hiệu suất, hài lòng**"],["**User experience**","Nhận thức của người dùng **trước, trong và sau** khi tương tác"],["**Accessibility**","Người khuyết tật, khác biệt văn hóa hoặc ngôn ngữ vẫn dùng **hiệu quả, hiệu suất**"]]},
  {t:"p",v:"TA tham gia **từ sớm** nhờ hiểu nhóm người dùng đích, mục tiêu, bối cảnh sử dụng, khó khăn tiềm năng, trải nghiệm tiêu cực."},
  {t:"h",v:"Ba kỹ thuật đánh giá và vai trò của TA"},
  {t:"table",head:["Kỹ thuật","Là gì","TA góp phần"],rows:[
   ["**Usability review**","Chuyên gia usability tìm vấn đề, sai lệch so với tiêu chí; từ không chính thức đến inspection","**Điều chỉnh tiêu chí review** theo nhóm người dùng, mục tiêu kinh doanh, bối cảnh (tùy biến checklist usability chung)"],
   ["**Usability test session**","Người dùng tương lai (hoặc đại diện) giải các nhiệm vụ định trước","**Thiết kế kịch bản** theo persona, nhóm người dùng, operational profile"],
   ["**Bảng hỏi / khảo sát**","Đo mức hài lòng: **SUMI**, **WAMMI**","Giúp **thiết kế** bảng hỏi và **đánh giá** phản hồi theo mục tiêu người dùng đích"]]},
  {t:"h",v:"Accessibility"},
  {t:"p",v:"Mục tiêu thường gặp: xác nhận **tuân thủ chuẩn**. **WCAG** có **ba mức A, AA, AAA** (tăng dần). Chuẩn quốc gia: Equality Act (Anh), ADA (Mỹ). TA **xác định mức tuân thủ cần thiết** và nhu cầu nhóm đích bằng cách **phân tích bối cảnh sử dụng**."},
  {t:"trap",v:["Usability review do **chuyên gia usability** làm; TA điều chỉnh tiêu chí, không thay chuyên gia.","SUMI, WAMMI là **bảng hỏi**, không phải review hay test session."]}
 ],
 summary:["Usability gồm interaction capability, user experience, accessibility.","TA tham gia sớm nhờ hiểu người dùng, mục tiêu, bối cảnh sử dụng.","Usability review: TA điều chỉnh tiêu chí; test session: TA thiết kế kịch bản theo persona; bảng hỏi (SUMI, WAMMI): TA thiết kế và đánh giá.","Accessibility: WCAG mức A, AA, AAA; TA xác định mức cần thiết từ bối cảnh sử dụng."],
 terms:[["interaction capability","khả năng tương tác người dùng"],["user experience","trải nghiệm người dùng"],["accessibility","khả năng tiếp cận"],["usability test session","phiên kiểm thử khả năng sử dụng"]]
},
{
 id:"4.3.1", title:"TA đóng góp vào kiểm thử adaptability và installability", en:"Flexibility Testing", los:["TA-4.3.1"], minutes:20,
 example:"App quản lý bán hàng phải chạy trên Android 11–15, iOS 16–18, máy tính bảng và điện thoại, tiếng Việt và tiếng Anh. TA liệt kê môi trường đích rồi dùng pairwise để chọn 14 cấu hình thay vì 60. Với installability, cô kiểm tra: cài mới, cập nhật từ bản cũ còn dữ liệu, gỡ cài đặt sạch, app xin quyền camera đúng lúc cần quét mã, và tài liệu hướng dẫn cài có khớp màn hình thật không.",
 blocks:[
  {t:"p",v:"**Flexibility** (còn gọi **portability**) kiểm tra đối tượng thích nghi được với thay đổi bối cảnh sử dụng hoặc môi trường. ISO 25010 có 4 đặc tính con: **adaptability, scalability, installability, replaceability**. TA tập trung **adaptability** và **installability**; scalability (ISTQB-PT) và replaceability (ISTQB-TTA) mang tính kỹ thuật."},
  {t:"h",v:"Adaptability"},
  {t:"p",v:"Kiểm tra đối tượng có thể **điều chỉnh hoặc chuyển sang** phần cứng, phần mềm, môi trường vận hành, sử dụng đích."},
  {t:"list",v:["TA **xác định môi trường đích** (phiên bản hệ điều hành mobile, trình duyệt…) và **thiết kế test phủ tổ hợp** các môi trường – thường dùng **combinatorial testing** (3.1.2).","Ví dụ khác: tích hợp các thành phần nền tảng vào dự án khách hàng để chắc tương thích môi trường đích.","Theo rủi ro: **smoke test** hoặc bộ test đầy đủ hơn.","Thực hành tốt: định nghĩa môi trường đích sớm, dùng combinatorial, smoke test trên môi trường mới, theo dõi lỗi đặc thù môi trường. Được hỗ trợ bởi **kiểm thử đa nền tảng tự động** của test automation engineer.","Lợi ích: phát hiện sớm lỗi đặc thù môi trường, tránh phải cập nhật lớn hay thiết kế lại sau triển khai, giảm chi phí bảo trì."]},
  {t:"h",v:"Installability"},
  {t:"p",v:"Kiểm tra đối tượng **cài, gỡ, cập nhật, cấu hình lại** đúng trong môi trường đã định – **không chỉ** kiểm tra thủ tục cài chạy xong. Mục tiêu TA tập trung:"},
  {t:"list",v:["Thủ tục cài đặt chạy đúng với **nhiều cấu hình môi trường** (combinatorial hữu ích).","Đối tượng **hoạt động đúng sau cài đặt hoặc cập nhật**.","**Mức dễ dàng** khi cài, gỡ, cập nhật – gồm **review tài liệu cài đặt**.","Hành vi liên quan **quyền (permissions)**, nhất là ứng dụng mobile (ISTQB-MAT)."]},
  {t:"trap",v:["Đo thông lượng, tải, khả năng mở rộng → không phải adaptability/installability.","Installability **không chỉ** là “cài chạy xong”."]}
 ],
 summary:["Flexibility (portability): adaptability, scalability, installability, replaceability; TA tập trung adaptability và installability.","Adaptability: xác định môi trường đích, thiết kế test phủ tổ hợp (combinatorial), smoke test theo rủi ro.","Hỗ trợ bởi kiểm thử đa nền tảng tự động; phát hiện sớm giúp giảm chi phí bảo trì.","Installability: cài trên nhiều cấu hình, hoạt động sau cài/cập nhật, dễ cài/gỡ/cập nhật (cả tài liệu), quyền trên mobile."],
 terms:[["flexibility / portability","tính linh hoạt / khả chuyển"],["adaptability","khả năng thích nghi"],["installability","khả năng cài đặt"],["target environment","môi trường đích"]]
},
{
 id:"4.4.1", title:"TA đóng góp vào kiểm thử interoperability", en:"Compatibility Testing", los:["TA-4.4.1"], minutes:20,
 example:"App đặt lịch khám gửi lịch hẹn sang hệ thống bệnh viện qua API chuẩn HL7 FHIR. Bệnh viện nhận được, nhưng ngày sinh “2001-03-04” bị hiểu thành 3 tháng 4 thay vì 4 tháng 3 vì bước chuyển đổi định dạng sai. Không có lỗi kết nối nào – lỗi nằm ở chuyển đổi và diễn giải dữ liệu. Kiểm thử interoperability phải bắt được những lỗi kiểu này.",
 blocks:[
  {t:"p",v:"**Compatibility** kiểm tra đối tượng có tương thích với thành phần, hệ thống khác khi dùng. ISO 25010 có hai đặc tính con:"},
  {t:"compare",l:{h:"Interoperability – TA",q:"Trao đổi và dùng thông tin",v:["Tương thích với thành phần, hệ thống **cần tương tác**","Thường là kiểm thử **chức năng hộp đen** → TA phụ trách"]},r:{h:"Coexistence – TTA",q:"Chung môi trường không ảnh hưởng",v:["Chia sẻ môi trường đích với hệ thống khác **không gây nhiễu**","Kiểm thử kỹ thuật (ISTQB-TTA)"]}},
  {t:"p",v:"Mục tiêu interoperability: xác nhận hai hay nhiều hệ thống **trao đổi thông tin** và **dùng được thông tin đã trao đổi**. Nếu trao đổi có **chuyển đổi dữ liệu**, phải **xác nhận cả phép chuyển đổi**. Đặc biệt quan trọng với cloud, web service, microservice, container, IoT."},
  {t:"p",v:"Tương tác diễn ra ở nhiều tầng kiến trúc; **không phải tương tác nào cũng có tài liệu**. TA có thể lấy thông tin gián tiếp từ tài liệu kiến trúc, thiết kế – cần hiểu chúng để test mọi khía cạnh quan trọng."},
  {t:"h",v:"Lỗi interoperability tìm được"},
  {t:"list",v:["Chuyển đổi dữ liệu khi trao đổi","Diễn giải hoặc sử dụng dữ liệu đã trao đổi","Luồng giao tiếp và giao thức","Tuân thủ chuẩn","Chức năng end-to-end","Tài liệu thiết kế"]},
  {t:"h",v:"Cách kiểm thử"},
  {t:"list",v:["Thường ở **kiểm thử tích hợp**.","Kỹ thuật hộp đen: **dựa trên dữ liệu** cho dữ liệu trao đổi; **dựa trên hành vi** cho diễn giải, sử dụng dữ liệu và end-to-end; **dựa trên quy tắc** cho chuyển đổi dữ liệu. Kinh nghiệm bổ sung tốt.","**Tái sử dụng** ca từ kiểm thử chức năng hoặc adaptability.","Chuẩn chung: ISO 15745, ISO 16100; ví dụ phương pháp cụ thể: ETSI EG 202 237 (viễn thông)."]},
  {t:"trap",v:["Coexistence là của **TTA**; interoperability là của **TA**.","Có chuyển đổi dữ liệu → **bắt buộc** kiểm tra phép chuyển đổi."]}
 ],
 summary:["Compatibility gồm interoperability (TA) và coexistence (TTA).","Interoperability: trao đổi và dùng thông tin; có chuyển đổi dữ liệu thì phải kiểm tra phép chuyển đổi.","TA cần hiểu tài liệu kiến trúc, thiết kế vì không phải tương tác nào cũng được tài liệu hóa.","Tìm lỗi chuyển đổi, diễn giải, giao thức, chuẩn, end-to-end, tài liệu thiết kế.","Thường ở kiểm thử tích hợp; kỹ thuật hộp đen + kinh nghiệm; tái sử dụng ca chức năng, adaptability."],
 terms:[["compatibility","tính tương thích"],["interoperability","khả năng tương tác"],["co-existence","khả năng cùng tồn tại"],["data transformation","chuyển đổi dữ liệu"]]
}
];

C.lessons[5] = [
{
 id:"5.1.1", title:"TA đóng góp vào phòng ngừa khiếm khuyết", en:"Defect Prevention Practices", los:["TA-5.1.1"], minutes:30,
 example:"Sau mỗi sprint, đội app giao hàng có khoảng 8 lỗi lọt lên production, chủ yếu do yêu cầu mơ hồ. TA đề xuất: review mọi user story trước sprint planning, mang thống kê lỗi vào retrospective, và tham gia phân tích nguyên nhân gốc. Ba tháng sau, cô đo lại: DRE tăng từ 82% lên 93%, PCE của giai đoạn yêu cầu từ 35% lên 60%.",
 blocks:[
  {t:"p",v:"Mục tiêu **phòng ngừa khiếm khuyết**: giảm khả năng khiếm khuyết **xuất hiện hoặc tái xuất hiện** và ngăn lan sang giai đoạn sau. Lợi ích: giảm chi phí, công sức, tăng năng suất, chất lượng. Là **trách nhiệm cả đội**; TA dùng kiến thức và kinh nghiệm riêng để góp phần."},
  {t:"table",head:["Thực hành phòng ngừa","Mục"],rows:[["Ngăn **đưa khiếm khuyết vào** (một phần của đảm bảo chất lượng)","—"],["Ngăn khiếm khuyết **lọt sang giai đoạn sau**","5.2"],["Ngăn khiếm khuyết **tái diễn**","5.3"]]},
  {t:"h",v:"TA đóng góp thế nào"},
  {t:"list",v:["**Tham gia phân tích rủi ro** – đảm bảo rủi ro được giảm thiểu đúng (chọn kỹ thuật phù hợp nhất).","**Review yêu cầu, mô hình, đặc tả** – phát hiện sớm lỗi test basis trước khi vào code, giảm mạnh chi phí sửa.","**Tham gia retrospective** – tìm cải tiến cho phân tích, thiết kế, triển khai, thực thi (kỹ thuật hiệu quả hơn, nhắm vùng rủi ro, cải thiện dữ liệu và môi trường để giảm dương tính và âm tính giả).","**Thu thập và đánh giá dữ liệu khiếm khuyết** – dữ liệu chi tiết để phân loại, thống kê, hỗ trợ RCA.","**Tham gia phân tích nguyên nhân gốc** – đề xuất hành động khắc phục để ngăn tái diễn."]},
  {t:"h",v:"Đo hiệu quả biện pháp (cùng test manager)"},
  {t:"table",head:["Chỉ số","Công thức","Lưu ý"],rows:[
   ["**DRE** – Defect removal efficiency","Lỗi loại bỏ **trước phát hành** / **tổng** lỗi","Mẫu số chưa biết → ước lượng hoặc lấy tổng lỗi tới một mốc (ví dụ 6 tháng sau phát hành). DRE cao → ít lỗi lọt; **không phân biệt** lỗi nhờ ngăn ngừa hay nhờ phát hiện"],
   ["**PCE** – Phase containment effectiveness","Lỗi **đưa vào và loại bỏ trong cùng giai đoạn** / tổng lỗi **đưa vào ở giai đoạn đó**","PCE cao → ít lỗi lọt sang giai đoạn sau"],
   ["**Cost of quality**","Quan hệ chi phí phòng ngừa, phát hiện, loại bỏ","Xem ISTQB-TM"]]},
  {t:"worked",title:"Tính DRE và PCE",given:"Release 3.0: trước phát hành tìm và sửa 150 lỗi; 6 tháng sau phát hành người dùng báo 25 lỗi. Riêng giai đoạn yêu cầu đưa vào 60 lỗi, trong đó 36 lỗi được phát hiện khi review yêu cầu; số còn lại lộ ra ở kiểm thử hệ thống và production.",steps:["DRE = 150 / (150 + 25) = 150 / 175 ≈ 85,7%.","PCE (yêu cầu) = 36 / 60 = 60%.","Nhận xét: 40% lỗi yêu cầu lọt sang giai đoạn sau → nên tăng cường review hoặc mô hình hóa yêu cầu (5.2)."],answer:"DRE ≈ 85,7%; PCE giai đoạn yêu cầu = 60%."},
  {t:"trap",v:["DRE dùng **tổng** lỗi (trước + sau phát hành) ở mẫu số.","PCE tính cho **một giai đoạn**: lỗi tìm ra trong chính giai đoạn đưa vào."]}
 ],
 summary:["Phòng ngừa: ngăn đưa vào, ngăn lọt sang giai đoạn sau, ngăn tái diễn; trách nhiệm cả đội.","TA góp phần: phân tích rủi ro, review yêu cầu/mô hình/đặc tả, retrospective, thu thập dữ liệu lỗi, RCA.","DRE = lỗi trước phát hành / tổng lỗi; không phân biệt ngăn ngừa với phát hiện.","PCE = lỗi đưa vào và loại bỏ cùng giai đoạn / lỗi đưa vào giai đoạn đó.","Cost of quality: quan hệ chi phí phòng ngừa, phát hiện, loại bỏ."],
 terms:[["defect prevention","phòng ngừa khiếm khuyết"],["defect removal efficiency (DRE)","hiệu suất loại bỏ khiếm khuyết"],["phase containment effectiveness (PCE)","hiệu quả khoanh vùng theo giai đoạn"],["cost of quality","chi phí chất lượng"]]
},
{
 id:"5.2.1", title:"Dùng mô hình để phát hiện khiếm khuyết", en:"Using Models to Detect Defects", los:["TA-5.2.1"], minutes:50,
 example:"Đặc tả phí ship: “Miễn phí cho đơn trên 300k; 30k cho đơn dưới 300k; 15k cho khách VIP với đơn từ 200k”. Đọc thì thấy ổn. TA vẽ trục số: đơn đúng 300k không rơi vào vùng nào (khoảng trống); khách VIP đơn 400k khớp cả “miễn phí” lẫn “15k” (chồng lấn). Hai lỗi được sửa trong đặc tả – rẻ hơn rất nhiều so với sửa sau khi code xong.",
 blocks:[
  {t:"p",v:"**Phase containment**: phát hiện và loại bỏ khiếm khuyết **ngay trong giai đoạn đưa nó vào** (Agile: shift left) → giảm chi phí chất lượng. Vì test basis là đầu vào chính của phân tích và thiết kế, TA đóng góp tốt nhất bằng **đánh giá chất lượng test basis**: **mô hình hóa** (mục này) và **review** (5.2.2)."},
  {t:"p",v:"Mô hình là trừu tượng hóa hệ thống ở một mức chính xác, chi tiết nhất định. Mô hình hóa hỗ trợ phase containment theo **ba cách**:"},
  {t:"h",v:"1. Phát hiện khiếm khuyết trong đặc tả"},
  {t:"p",v:"Đặc tả thường là văn bản không hình thức. TA **biểu diễn hình thức** bằng mô hình, ánh xạ điều kiện (yêu cầu) vào phần tử mô hình để truy vết. Hình thức hóa và trực quan hóa làm lộ **thiếu sót, mâu thuẫn, mơ hồ**. Điểm mạnh: đặc tả được **biến đổi** (review thì xem ở dạng gốc) → TA còn góp phần tìm **giải pháp**."},
  {t:"table",head:["Loại mô hình","Ví dụ","Phát hiện"],rows:[
   ["**Dựa trên dữ liệu**","Mô hình miền, mô hình combinatorial","Phân vùng **chồng lấn**, **khoảng trống** trong bao phủ miền, **phân vùng rỗng**, tổ hợp tham số thiếu hoặc sai"],
   ["**Dựa trên hành vi**","Ma trận CRUD, mô hình trạng thái, mô hình kịch bản","Vòng đời thực thể thiếu/không nhất quán, chuyển đổi thiếu/sai, **deadlock**, **vòng lặp vô hạn**, hành vi mơ hồ, thiếu xử lý ngoại lệ"],
   ["**Dựa trên quy tắc**","Bảng quyết định, quan hệ biến hình","Lỗi quy tắc nghiệp vụ: thiếu, mâu thuẫn, mơ hồ, dư thừa, kịch bản dễ lỗi, logic phức tạp"]]},
  {t:"p",v:"Mô hình hóa còn lộ: tên gọi không nhất quán, giá trị dữ liệu (biên), đầu vào/đầu ra; thông tin thiếu, không đầy đủ, mơ hồ, thừa."},
  {t:"h",v:"2. Phát hiện khiếm khuyết trong mô hình có sẵn"},
  {t:"table",head:["Mô hình","Khiếm khuyết điển hình"],rows:[
   ["**Sơ đồ chuyển đổi trạng thái**","Trạng thái thiếu/sai, chuyển đổi không đúng, guard hoặc hành động sai, trạng thái **dư thừa hoặc không tới được**, hành vi **không tất định**"],
   ["**Activity diagram**","Hành động thiếu, **không tới được**, **cụt** (dead-end); sai thứ tự; điều kiện tại nút quyết định **sai, không loại trừ nhau, không đầy đủ**; **thiếu điểm đồng bộ**; luồng song song đồng bộ sai"],
   ["**Bảng quyết định**","Quy tắc **chồng lấn, mâu thuẫn, không khả thi**; **không đầy đủ** (thiếu tổ hợp hoặc thiếu hành động cho tổ hợp)"],
   ["Mọi mô hình","Lỗi cú pháp, chính tả, trùng lặp, đặt tên không nhất quán"]]},
  {t:"h",v:"3. Phát hiện khiếm khuyết bằng model-based testing (MBT)"},
  {t:"p",v:"Công cụ MBT thiết kế và sinh ca, testware từ **mô hình MBT** và **tiêu chí chọn test** do TA định nghĩa. MBT hiệu quả tìm bất thường trong đặc tả nhờ bao phủ toàn diện và khám phá có hệ thống hành vi mong đợi. Mô hình (nhất là đồ họa) giúp giao tiếp, tạo hiểu biết chung về test basis (ISTQB-MBT)."},
  {t:"lab",kind:"domain"},
  {t:"worked",title:"Mô hình hóa đặc tả để tìm lỗi",given:"Đặc tả hoa hồng nhân viên bán hàng: “Doanh số dưới 50 triệu: 2%. Doanh số từ 50 đến 100 triệu: 4%. Doanh số trên 100 triệu: 6%. Nhân viên mới (dưới 3 tháng) nhận 3% bất kể doanh số. Nhân viên đạt KPI được cộng thêm 1%.” Hãy mô hình hóa và chỉ ra khiếm khuyết.",steps:["Mô hình miền doanh số: < 50 · [50, 100] · > 100 → không khoảng trống, không chồng lấn (100 thuộc vùng 4%). Ổn.","Bảng quyết định với điều kiện: Nhân viên mới (C/K), Vùng doanh số (3), Đạt KPI (C/K) → 12 quy tắc.","Mâu thuẫn/mơ hồ: nhân viên mới đạt KPI → 3% hay 3% + 1%? “Bất kể doanh số” có loại trừ cộng KPI không? → **mơ hồ**.","Thiếu: doanh số âm (trả hàng nhiều hơn bán) xử lý thế nào? Nhân viên đúng 3 tháng là “mới” hay không? → **thiếu thông tin biên**."],answer:"Ít nhất 3 khiếm khuyết: (1) mơ hồ về cộng KPI cho nhân viên mới; (2) thiếu định nghĩa biên “dưới 3 tháng” (đúng 3 tháng?); (3) thiếu quy tắc cho doanh số âm. Cách sửa: thêm quy tắc rõ ràng vào bảng quyết định và xác nhận với BA."},
  {t:"trap",v:["Mô hình hóa **biến đổi** đặc tả; review xem đặc tả **ở dạng gốc** – đây là điểm khác biệt syllabus nhấn mạnh.","Hai điều kiện “> X” và “< X” → luôn kiểm tra giá trị đúng bằng X (khoảng trống)."]}
 ],
 summary:["Phase containment: tìm và sửa lỗi ngay trong giai đoạn đưa vào; TA đánh giá chất lượng test basis bằng mô hình hóa và review.","Mô hình hóa đặc tả lộ thiếu sót, mâu thuẫn, mơ hồ; biến đổi đặc tả nên TA góp phần tìm giải pháp.","Mô hình dữ liệu: chồng lấn, khoảng trống, vùng rỗng; hành vi: vòng đời thiếu, chuyển đổi sai, deadlock, vòng lặp vô hạn; quy tắc: thiếu, mâu thuẫn, dư thừa.","Lỗi trong mô hình có sẵn: trạng thái không tới được, không tất định; hành động cụt, guard không đầy đủ, thiếu đồng bộ; quy tắc chồng lấn, mâu thuẫn.","MBT sinh test từ mô hình, khám phá có hệ thống, tăng giao tiếp."],
 terms:[["phase containment","khoanh vùng theo giai đoạn"],["unreachable state","trạng thái không tới được"],["deadlock","bế tắc"],["model-based testing (MBT)","kiểm thử dựa trên mô hình"]]
},
{
 id:"5.2.2", title:"Áp dụng kỹ thuật review lên test basis", en:"Applying Review Techniques", los:["TA-5.2.2"], minutes:45,
 example:"Đặc tả “Mở tài khoản online” 40 trang được 4 người review. Lần trước họ đọc tự do và nộp 120 nhận xét, 70 cái trùng nhau. Lần này TA chia vai: một người đóng persona “sinh viên lần đầu mở tài khoản”, một người là “nhân viên kiểm soát tuân thủ”, một người dùng checklist KYC, còn TA thử viết nháp ca kiểm thử chấp nhận từ đặc tả. Ít trùng lặp hơn, và TA phát hiện đặc tả không nói gì về CCCD hết hạn – vì không viết được kết quả mong đợi.",
 blocks:[
  {t:"p",v:"Test basis được định nghĩa tốt là **nền móng** cho chất lượng sản phẩm và thành công dự án. Review test basis giúp phát hiện sớm, ngăn lỗi lọt sang giai đoạn sau. TA dùng nhiều **kỹ thuật review** trong **review cá nhân** (theo ISO/IEC 20246). Chọn kỹ thuật dựa trên: mục tiêu review, mục tiêu dự án, nguồn lực, loại test basis, rủi ro, lĩnh vực, văn hóa công ty."},
  {t:"table",head:["Kỹ thuật","Cách làm","Ưu / nhược"],rows:[
   ["**Ad hoc**","Không chính thức, không quy trình, ít hoặc không hướng dẫn; đọc và ghi bất thường khi gặp","Ít chuẩn bị; phụ thuộc mạnh kỹ năng người review; không quản lý → **nhiều báo cáo trùng**"],
   ["**Checklist-based**","Đánh giá test basis theo checklist định sẵn; checklist chung hoặc theo đặc tính chất lượng, mục tiêu, loại test basis","Nhắc điểm cụ thể, **phi cá nhân hóa** review. TA **tùy biến** theo loại test basis, mức rủi ro, điều kiện; **cập nhật** với lỗi từng bị bỏ sót; checklist không bao trùm → **không bị giới hạn** bởi các mục"],
   ["**Scenario-based**","Mô phỏng quy trình, hoạt động: **chạy thử khô (dry run)** theo cách sử dụng dự kiến","Hiệu quả nhất khi test basis **dạng kịch bản** (use case, activity diagram). Không bị giới hạn bởi kịch bản đã viết, nên nghĩ rộng hơn"],
   ["**Role-based**","Giao **vai** cho người review: loại người dùng (giàu kinh nghiệm, mới, cao tuổi, trẻ em) hoặc vai trò tổ chức (admin, người dùng thường); mô tả bằng **persona**","Mỗi người tập trung một khía cạnh → bao phủ toàn diện, **tránh trùng lặp**"],
   ["**Perspective-based reading**","Đọc từ **góc nhìn** bên liên quan (thiết kế, tester, marketing, admin, người dùng cuối) và **thử tạo sản phẩm** họ sẽ tạo từ tài liệu","Review cá nhân sâu hơn, ít trùng; ví dụ tester **viết nháp ca kiểm thử chấp nhận** để xem đủ thông tin chưa"]]},
  {t:"compare",l:{h:"Role-based",q:"Đóng vai một kiểu người dùng/vai trò",v:["Persona: “người cao tuổi thị lực kém”","Hỏi: người này có dùng được không?"]},r:{h:"Perspective-based",q:"Nhìn từ góc độ một bên liên quan VÀ thử tạo sản phẩm của họ",v:["Tester viết nháp acceptance test; designer phác thiết kế","Hỏi: có đủ thông tin để làm ra sản phẩm của tôi không?"]}},
  {t:"worked",title:"Chọn kỹ thuật review",given:"Chọn kỹ thuật phù hợp nhất: (a) Bộ use case cho quy trình bồi thường bảo hiểm, cần kiểm tra luồng có “chạy” được không. (b) User story của module thanh toán rủi ro cao, đội có danh sách lỗi hay gặp từ 5 dự án trước. (c) Đặc tả app cho cả trẻ em, phụ huynh và giáo viên, cần tránh trùng nhận xét. (d) Đặc tả API, tester muốn chắc đủ thông tin để viết test. (e) Tài liệu 2 trang, cần nhận xét nhanh trong 30 phút.",steps:["(a) Test basis dạng kịch bản, cần dry run → scenario-based.","(b) Có kinh nghiệm lỗi tích lũy, rủi ro cao → checklist-based (tùy biến theo rủi ro).","(c) Nhiều nhóm người dùng, tránh trùng → role-based với persona.","(d) Thử tạo sản phẩm (ca kiểm thử) từ tài liệu → perspective-based reading.","(e) Ít thời gian chuẩn bị, tài liệu ngắn → ad hoc."],answer:"(a) scenario-based; (b) checklist-based; (c) role-based; (d) perspective-based reading; (e) ad hoc."},
  {t:"trap",v:["Perspective-based reading có dấu hiệu nhận biết: **thử tạo sản phẩm** (ví dụ ca kiểm thử chấp nhận) từ tài liệu.","Persona xuất hiện trong role-based; “góc nhìn designer/tester/marketer” là perspective-based.","“Không quản lý → nhiều báo cáo trùng” là đặc điểm của ad hoc."]}
 ],
 summary:["Review test basis giúp phát hiện sớm; chọn kỹ thuật theo mục tiêu, nguồn lực, loại test basis, rủi ro, lĩnh vực, văn hóa.","Ad hoc: ít chuẩn bị, phụ thuộc kỹ năng, dễ trùng lặp.","Checklist-based: tùy biến theo loại test basis và rủi ro, cập nhật lỗi bị bỏ sót, không bị giới hạn bởi các mục.","Scenario-based: dry run theo cách dùng, hợp use case/activity diagram; role-based: giao vai bằng persona, tránh trùng.","Perspective-based reading: đọc theo góc nhìn bên liên quan và thử tạo sản phẩm của họ từ tài liệu."],
 terms:[["ad hoc reviewing","review tự do"],["checklist-based reviewing","review theo checklist"],["scenario-based reviewing","review theo kịch bản"],["role-based reviewing","review theo vai"],["perspective-based reading","đọc theo góc nhìn"]]
},
{
 id:"5.3.1", title:"Phân tích kết quả kiểm thử để cải thiện phát hiện lỗi", en:"Analyzing Test Results to Improve Defect Detection", los:["TA-5.3.1"], minutes:55,
 example:"Sau release 4.0, 18 lỗi lọt lên production, 12 cái nằm trong module khuyến mãi – vùng mà phân tích rủi ro chấm “thấp”. TA tính DDP của kiểm thử hệ thống theo mức nghiêm trọng: lỗi nghiêm trọng chỉ đạt 70%. Test gap analysis cho thấy code khuyến mãi đổi nhiều trong 2 sprint cuối nhưng chẳng test nào chạy tới. Kết luận: nâng mức rủi ro của module, thêm bảng quyết định cho quy tắc khuyến mãi, và đưa test gap analysis vào mỗi sprint.",
 blocks:[
  {t:"p",v:"Kết quả kiểm thử không chỉ cho biết sự cố mà còn là **phản hồi** để TA cải thiện **hiệu quả phát hiện lỗi**. Năm kỹ thuật phân tích:"},
  {t:"table",head:["Kỹ thuật","Cách làm","Hành động cải tiến"],rows:[
   ["**Cụm lỗi dự đoán vs thực tế**","Sau test, xác định vùng nhiều lỗi thực tế, so với dự đoán. Dùng tiêu chí đo được (**mật độ lỗi, mức nghiêm trọng**). **Mức nghiêm trọng quan trọng**: cụm nhỏ lỗi critical/major quan trọng hơn cụm lớn lỗi nhỏ","Kiểm thử kỹ hơn ở vùng có nhiều lỗi hơn dự kiến"],
   ["**DDP**","Lỗi tìm ở cấp đó / (lỗi tìm ở cấp đó + lỗi lọt mà **cấp đó có thể phát hiện**). Đặt ranh giới đếm rõ: **giới hạn thời gian** sau phát hành, **loại trừ** (lỗi bên thứ ba, môi trường khách đặc thù). Nên **chia theo mức nghiêm trọng**","DDP thấp → phát hiện kém → phân tích lý do, làm cấp đó tập trung, nghiêm ngặt hơn"],
   ["**Phân tích bao phủ cấu trúc**","Đo mức test đã chạy tới vùng của đối tượng (statement, branch, **neuron coverage**) bằng công cụ","Tăng bao phủ vùng thấp, xét **mức rủi ro** khi chọn vùng"],
   ["**Test gap analysis**","Đo mức test đã chạy tới **thay đổi code gần đây**","Tập trung vào **thay đổi mới chưa được test**, thay vì mọi vùng bao phủ thấp lâu không đổi"],
   ["**Mẫu xuất hiện lỗi**","So số/mật độ lỗi theo giai đoạn (iteration) với mẫu lý thuyết, ví dụ **Rayleigh**: một đỉnh, lệch phải – tăng rồi giảm chậm về 0","Phát hiện **ổn định ở mức thấp** khi mẫu gợi ý phải tăng → test hiện có **quá yếu**"]]},
  {t:"lab",kind:"ddp"},
  {t:"h",v:"Cẩn thận với số liệu"},
  {t:"list",v:["Số liệu dựa trên kết quả test (đạt/trượt), báo cáo lỗi, số liệu cấu trúc (bao phủ, mật độ lỗi) – **không đọc dễ như tưởng**.","**Số test thất bại ≠ số khiếm khuyết.** Quan hệ test ↔ lỗi là **nhiều–nhiều**: nhiều test lộ cùng một lỗi; một test lộ nhiều lỗi. Phải **phân tích kết quả gỡ lỗi** để đếm đúng.","**Mức nghiêm trọng của lỗi có thể khác độ quan trọng của test**: test critical có thể trượt vì lỗi giao diện nhỏ."]},
  {t:"worked",title:"Phân tích DDP và cụm lỗi (dạng K4)",given:"Kiểm thử hệ thống tìm 120 lỗi (critical 10, major 40, minor 70). Trong 3 tháng sau phát hành có 30 lỗi được báo: 6 critical, 9 major, 15 minor; trong đó 4 lỗi minor do môi trường riêng của một khách hàng, kiểm thử hệ thống không thể phát hiện. (a) Tính DDP tổng. (b) Tính DDP theo critical. (c) Nên cải tiến gì?",steps:["Lỗi lọt có thể phát hiện: 30 − 4 = 26.","(a) DDP = 120 / (120 + 26) = 120 / 146 ≈ 82,2%.","(b) Critical: 10 / (10 + 6) = 62,5% – thấp hơn nhiều so với tổng.","(c) Gần 40% lỗi critical lọt → cần phân tích vì sao (vùng nào? kỹ thuật nào thiếu?), làm kiểm thử hệ thống tập trung và nghiêm ngặt hơn ở vùng có lỗi critical; DDP chia theo mức nghiêm trọng cho thấy vấn đề mà con số tổng che mất."],answer:"(a) ≈ 82,2%; (b) 62,5%; (c) ưu tiên cải thiện phát hiện lỗi critical: phân tích lỗi critical lọt, tăng độ nghiêm ngặt kỹ thuật ở vùng đó."},
  {t:"trap",v:["DDP: **loại** lỗi mà cấp kiểm thử không thể phát hiện khỏi mẫu số.","Bao phủ thấp ở code **cũ, không đổi, đã test** không phải ưu tiên của test gap analysis.","Cụm lỗi lớn toàn lỗi nhỏ **không** quan trọng hơn cụm nhỏ lỗi critical."]}
 ],
 summary:["Kết quả test là phản hồi để cải thiện hiệu quả phát hiện lỗi.","Cụm lỗi dự đoán vs thực tế: dùng mật độ và mức nghiêm trọng; cụm nhỏ lỗi nghiêm trọng quan trọng hơn.","DDP: chỉ tính lỗi lọt mà cấp đó có thể phát hiện, đặt giới hạn thời gian và loại trừ, chia theo mức nghiêm trọng.","Bao phủ cấu trúc nhắm vùng bao phủ thấp theo rủi ro; test gap analysis nhắm thay đổi mới chưa test; Rayleigh phẳng thấp → test yếu.","Số test trượt ≠ số lỗi (nhiều–nhiều); mức nghiêm trọng lỗi ≠ độ quan trọng test."],
 terms:[["defect detection percentage (DDP)","tỷ lệ phát hiện khiếm khuyết"],["test gap analysis","phân tích khoảng trống kiểm thử"],["defect arrival pattern","mẫu xuất hiện khiếm khuyết"],["structural coverage","bao phủ cấu trúc"],["defect density","mật độ khiếm khuyết"]]
},
{
 id:"5.3.2", title:"Phân loại khiếm khuyết hỗ trợ phân tích nguyên nhân gốc", en:"Supporting Root Cause Analysis with Defect Classification", los:["TA-5.3.2"], minutes:25,
 example:"Một năm có 900 lỗi. Không thể họp RCA cho từng lỗi. TA đề xuất phân loại theo ODC lúc báo và lúc sửa: loại lỗi (gán giá trị, kiểm tra điều kiện, giao diện…), yếu tố kích hoạt, nguồn. Thống kê cho thấy 38% là “kiểm tra điều kiện” và phần lớn đến từ cùng một nhóm quy tắc nghiệp vụ không có bảng quyết định. Một buổi RCA cho nhóm đó, dùng 5 Whys và biểu đồ xương cá, dẫn tới quy định: mọi quy tắc từ 3 điều kiện trở lên phải có bảng quyết định được review.",
 blocks:[
  {t:"p",v:"**RCA (root cause analysis)** tìm và xử lý **nguyên nhân nền tảng** của khiếm khuyết thay vì chỉ triệu chứng. Cách tiếp cận có cấu trúc để cải tiến chất lượng; **mục tiêu chính: ngăn tái diễn**. Kỹ thuật: **taxonomy lỗi, 5 Whys, biểu đồ nhân quả (xương cá), phân tích Pareto**."},
  {t:"h",v:"Vì sao cần phân loại?"},
  {t:"p",v:"RCA cổ điển: chuyên gia nghiên cứu **từng** lỗi rất chi tiết sau khi sửa. Nhưng lỗi thường rất nhiều → lập kế hoạch phòng ngừa cho **mỗi** lỗi là kém hiệu quả, tốn thời gian. Giải pháp: **phân loại lỗi rồi làm RCA cho các loại lỗi xuất hiện**."},
  {t:"list",v:["Mỗi lỗi chứa nhiều thông tin về **quy trình phát triển** và **hệ thống**. Phân loại giúp **biến thông tin đó thành số đo quy trình** → hiểu loại sai sót hay mắc → cải tiến quy trình.","Phân loại là **cầu nối** giữa **thống kê định lượng** và **RCA định tính**.","Để hỗ trợ RCA hiệu quả, lỗi phải được **phân loại thống nhất xuyên suốt SDLC**, từ kiểm thử sớm đến production.","TA nên hỗ trợ tổ chức **chuẩn hóa** phân loại → giao tiếp, trao đổi thông tin về lỗi tốt hơn giữa dev và tổ chức."]},
  {t:"h",v:"Các phương pháp phân loại"},
  {t:"table",head:["Phương pháp","Đặc điểm"],rows:[
   ["**ODC** – Orthogonal Defect Classification (Chillarege, 1992)","Mỗi lỗi được xếp theo các **thuộc tính trực giao** (loại trừ nhau), thu thập **cả khi báo lỗi lẫn khi sửa lỗi**"],
   ["**IEEE 1044**","Chuẩn phân loại bất thường phần mềm, cung cấp **bộ thuộc tính cốt lõi** cho sự cố và khiếm khuyết"],
   ["**Theo mức nghiêm trọng**","Critical, major, minor, trivial"],
   ["**Taxonomy lỗi**","Ví dụ Beizer (1990), Catolino et al. (2019)"]]},
  {t:"p",v:"Lỗi còn có thể ánh xạ sang **thuộc tính chất lượng** bằng mô hình như **ISO/IEC 25010** hoặc **FURPS**."},
  {t:"trap",v:["Mục tiêu chính của RCA: **ngăn tái diễn**, không phải tìm người có lỗi.","ODC: thu thập **ở hai thời điểm** (báo và sửa)."]}
 ],
 summary:["RCA xử lý nguyên nhân nền tảng, mục tiêu chính là ngăn tái diễn; dùng taxonomy, 5 Whys, xương cá, Pareto.","RCA từng lỗi kém hiệu quả → phân loại rồi RCA theo loại lỗi.","Phân loại biến thông tin lỗi thành số đo quy trình, nối thống kê định lượng với RCA định tính.","Phân loại thống nhất xuyên suốt SDLC; TA hỗ trợ chuẩn hóa.","Phương pháp: ODC (thuộc tính trực giao, lúc báo và lúc sửa), IEEE 1044, theo mức nghiêm trọng, taxonomy; ánh xạ ISO 25010, FURPS."],
 terms:[["root cause analysis (RCA)","phân tích nguyên nhân gốc"],["orthogonal defect classification (ODC)","phân loại khiếm khuyết trực giao"],["IEEE 1044","chuẩn phân loại bất thường IEEE 1044"],["five whys","kỹ thuật 5 tại sao"],["Pareto analysis","phân tích Pareto"]]
}
];
})();
