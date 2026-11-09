/* Lộ trình chứng chỉ – tổng hợp từ danh mục ISTQB (istqb.org) và iSQI, cập nhật 11/2026.
   status: "open" = đã có trên The QA Lab, "next" = đang làm, "later" = dự kiến. */
window.QALAB = window.QALAB || {certs:{}};
window.QALAB.roadmapUpdated = "11/2026";
window.QALAB.tracks = [
{
  id:"specialist", title:"QA Specialist", tagline:"Chuyên gia kỹ thuật: thiết kế test sâu, automation, bảo mật, hiệu năng, AI.",
  steps:[
    {code:"CTFL v4.0", name:"Certified Tester Foundation Level", level:"Foundation", status:"open", cert:"ctfl",
     learn:"Nền tảng: quy trình kiểm thử, kỹ thuật thiết kế test, kiểm thử tĩnh, quản lý kiểm thử, công cụ.",
     req:"Không yêu cầu đầu vào. Là điều kiện cho mọi chứng chỉ ISTQB khác.", when:"Tháng 0–2"},
    {code:"CTAL-TA v4.0", name:"Advanced Level Test Analyst", level:"Advanced", status:"open", cert:"ctal-ta",
     learn:"Phân tích và thiết kế test nâng cao theo rủi ro, kỹ thuật hộp đen chuyên sâu (domain, combinatorial, state transition, decision table, metamorphic), đặc tính chất lượng nghiệp vụ, phòng ngừa khiếm khuyết.",
     req:"Có CTFL và đủ kinh nghiệm kiểm thử thực tế. Đề 45 câu, 78 điểm, đạt 51, 120 phút. Bản v3.1 đã ngừng thi tiếng Anh sau 16/5/2026.", when:"Tháng 6–9"},
    {code:"CTAL-TTA", name:"Advanced Level Technical Test Analyst", level:"Advanced", status:"later",
     learn:"Kiểm thử hộp trắng, phân tích tĩnh/động, đặc tính kỹ thuật: bảo mật, hiệu năng, khả năng bảo trì.",
     req:"Có CTFL. Khuyến nghị khoảng 18 tháng kinh nghiệm thực tế.", when:"Tháng 9–15"},
    {code:"Chọn 1–2 nhánh", name:"Specialist / Advanced chuyên sâu", level:"Specialist", status:"later", branch:true,
     learn:"Chọn theo công việc đang làm hoặc muốn làm.",
     options:[
       ["CTAL-TAE v2.0","Test Automation Engineering","Thiết kế và triển khai framework automation. Có CTFL, khuyến nghị 6 tháng kinh nghiệm."],
       ["CT-SEC → CT-STE","Security Tester → Security Test Engineer","Kiểm thử bảo mật, rồi đi sâu kỹ thuật tấn công và phòng thủ."],
       ["CT-PT","Performance Testing","Kiểm thử hiệu năng, tải, khả năng mở rộng."],
       ["CT-AI v2.0 · CT-GenAI","AI Testing · Testing with Generative AI","Kiểm thử hệ thống AI và dùng GenAI trong kiểm thử. CT-AI v1.0 đang ngừng."],
       ["CT-MAT","Mobile Application Testing","Kiểm thử ứng dụng di động."],
       ["CT-QDO","Quality in DevOps","Chất lượng trong pipeline DevOps."]
     ], req:"Hầu hết chỉ cần CTFL.", when:"Tháng 12–24"}
  ]
},
{
  id:"manager", title:"QA Manager", tagline:"Quản lý kiểm thử: kế hoạch, rủi ro, đội ngũ, chiến lược và cải tiến quy trình.",
  steps:[
    {code:"CTFL v4.0", name:"Certified Tester Foundation Level", level:"Foundation", status:"open", cert:"ctfl",
     learn:"Nền tảng chung cho cả hai lộ trình. Chương 5 (quản lý kiểm thử) là bước đệm cho Test Manager.",
     req:"Không yêu cầu đầu vào.", when:"Tháng 0–2"},
    {code:"CTAL-TM v3.0", name:"Advanced Level Test Management", level:"Advanced", status:"next",
     learn:"Quản lý hoạt động kiểm thử, quản lý sản phẩm, quản lý đội, đo lường và báo cáo.",
     req:"Có CTFL (v4.0 hoặc cũ hơn). Khuyến nghị mạnh 6 tháng kinh nghiệm.", when:"Tháng 6–10"},
    {code:"Bổ trợ", name:"Agile, chiến lược automation, mô hình quy trình", level:"Advanced / Specialist", status:"later", branch:true,
     learn:"Chọn theo môi trường làm việc.",
     options:[
       ["CT-TAS","Test Automation Strategy","Xây chiến lược automation ở cấp tổ chức."],
       ["CTAL-AT v2.0","Advanced Level Agile Tester","Kiểm thử trong đội Agile, thay cho Foundation Agile Tester đang ngừng."],
       ["CT-AcT","Acceptance Testing","Cộng tác PO/BA với tester ở kiểm thử chấp nhận."],
       ["TMMi-P","TMMi Professional","Mô hình trưởng thành quy trình kiểm thử (iSQI)."],
       ["TMAP QCFT","TMAP Quality for cross-functional teams","Chất lượng trong đội liên chức năng (iSQI)."]
     ], req:"Phần lớn chỉ cần CTFL.", when:"Tháng 10–24"},
    {code:"CTEL-TM", name:"Expert Level Test Management (3 phần)", level:"Expert", status:"later",
     learn:"Phần 1 Strategic Test Management · Phần 2 Operational Test Management · Phần 3 Managing the Test Team. Mỗi phần một bài thi.",
     req:"Có CTFL + CTAL-TM, ít nhất 5 năm kinh nghiệm kiểm thử và 2 năm ở mảng quản lý kiểm thử. Chứng chỉ Expert có hiệu lực 7 năm.", when:"Năm thứ 5 trở đi"},
    {code:"CTEL-ITP", name:"Expert Level Improving the Test Process (2 phần)", level:"Expert", status:"later",
     learn:"Phần 1 Assessing Test Processes · Phần 2 Implementing Test Process Improvement.",
     req:"Yêu cầu tương tự CTEL-TM.", when:"Tùy chọn"}
  ]
}
];
window.QALAB.roadmapNotes = [
  "Chứng chỉ Foundation, Advanced và Specialist của ISTQB có giá trị trọn đời; Expert có hiệu lực 7 năm.",
  "Giá thi tham khảo trên iSQI (11/2026): CTFL khoảng US$184, các bài Advanced khoảng US$218. Giá và lịch thi có thể đổi, hãy kiểm tra trước khi đăng ký.",
  "Mốc thời gian là gợi ý cho người vừa đạt CTFL, không phải yêu cầu của ISTQB."
];
window.QALAB.roadmapLinks = [
  ["Danh sách chứng chỉ ISTQB","https://istqb.org/certifications/certification-list"],
  ["Đăng ký thi trên iSQI","https://isqi.org/Software-Testing-Quality/?order=topseller&p=1&properties=cbb6d6020974402bbcc0d24eb72e1c63"]
];
