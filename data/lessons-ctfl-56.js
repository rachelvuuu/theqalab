/* The QA Lab – bài học chi tiết CTFL v4.0.1 (chương 5 và 6). Mỗi mục ứng với một mục tiêu học tập (LO) trong syllabus. */
window.QALAB.certs.ctfl.lessons = window.QALAB.certs.ctfl.lessons || {};
Object.assign(window.QALAB.certs.ctfl.lessons, {
 "5": [
  {
   "id": "5.1.1",
   "title": "Mục đích và nội dung của kế hoạch kiểm thử",
   "en": "Purpose and Content of a Test Plan",
   "los": [
    "FL-5.1.1"
   ],
   "minutes": 15,
   "example": "Dự án ví điện tử ra mắt sau 3 tháng. Test lead viết kế hoạch kiểm thử: phạm vi (thanh toán, nạp tiền, không gồm tính năng tích điểm), rủi ro lớn nhất (tính sai số dư), cấp độ và loại kiểm thử, ai làm gì, môi trường và dữ liệu cần, tiêu chí đầu ra, ngân sách và lịch.",
   "blocks": [
    {
     "t": "p",
     "v": "Kế hoạch kiểm thử mô tả **mục tiêu, nguồn lực và quy trình** của một dự án kiểm thử. Nó giúp: đảm bảo hoạt động kiểm thử đáp ứng tiêu chí đề ra; là phương tiện giao tiếp với đội và bên liên quan; chứng minh kiểm thử tuân theo chính sách và chiến lược kiểm thử hiện có (hoặc giải thích vì sao lệch)."
    },
    {
     "t": "p",
     "v": "Việc lập kế hoạch buộc tester **suy nghĩ trước** về các thách thức tương lai liên quan đến rủi ro, lịch, con người, công cụ, chi phí, công sức."
    },
    {
     "t": "table",
     "head": [
      "Nội dung điển hình",
      "Gồm"
     ],
     "rows": [
      [
       "Bối cảnh kiểm thử",
       "Phạm vi, mục tiêu, ràng buộc, cơ sở kiểm thử"
      ],
      [
       "Giả định và ràng buộc",
       "Của dự án kiểm thử"
      ],
      [
       "Bên liên quan",
       "Vai trò, trách nhiệm, mức liên quan tới kiểm thử, nhu cầu tuyển và đào tạo"
      ],
      [
       "Giao tiếp",
       "Hình thức, tần suất, mẫu tài liệu"
      ],
      [
       "Sổ đăng ký rủi ro (risk register)",
       "Rủi ro sản phẩm, rủi ro dự án"
      ],
      [
       "Cách tiếp cận kiểm thử",
       "Cấp độ, loại, kỹ thuật, sản phẩm bàn giao, tiêu chí đầu vào/đầu ra, mức độc lập, metrics, yêu cầu dữ liệu và môi trường, sai lệch so với thực hành chung"
      ],
      [
       "Ngân sách và lịch",
       ""
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Kế hoạch kiểm thử có thể là một tài liệu hoặc chia thành nhiều kế hoạch theo cấp độ, loại kiểm thử.",
      "Kế hoạch là tài liệu sống, cập nhật theo phản hồi trong dự án."
     ]
    }
   ],
   "summary": [
    "Test plan: mục tiêu, nguồn lực, quy trình; công cụ giao tiếp; chứng minh tuân thủ chính sách và chiến lược.",
    "Nội dung: bối cảnh, giả định/ràng buộc, bên liên quan, giao tiếp, sổ rủi ro, cách tiếp cận, ngân sách và lịch."
   ],
   "terms": [
    [
     "test plan",
     "kế hoạch kiểm thử"
    ],
    [
     "test approach",
     "cách tiếp cận kiểm thử"
    ],
    [
     "risk register",
     "sổ đăng ký rủi ro"
    ]
   ]
  },
  {
   "id": "5.1.2",
   "title": "Tester đóng góp gì khi lập kế hoạch phát hành và vòng lặp",
   "en": "Tester's Contribution to Iteration and Release Planning",
   "los": [
    "FL-5.1.2"
   ],
   "minutes": 15,
   "example": "Trong buổi lập kế hoạch phát hành, tester giúp PO viết lại story “thanh toán nhanh” sao cho test được và chỉ ra rủi ro tính sai số dư. Đầu mỗi sprint, tester cùng đội tách story thành task, thêm task test API và test hiệu năng, ước lượng công sức test và đánh dấu story nào khó kiểm thử.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Lập kế hoạch phát hành (release)",
      "q": "Nhìn tới lúc phát hành sản phẩm",
      "v": [
       "Xác định và tinh chỉnh product backlog; có thể tách story lớn thành story nhỏ",
       "Là cơ sở cho cách tiếp cận và kế hoạch kiểm thử xuyên suốt các vòng lặp",
       "Tester: viết user story và tiêu chí chấp nhận kiểm thử được",
       "Tham gia phân tích rủi ro dự án và chất lượng",
       "Ước lượng công sức test cho story",
       "Xác định cách tiếp cận kiểm thử, lập kế hoạch kiểm thử cho bản phát hành"
      ]
     },
     "r": {
      "h": "Lập kế hoạch vòng lặp (iteration)",
      "q": "Nhìn tới cuối một vòng lặp",
      "v": [
       "Quan tâm tới iteration backlog",
       "Tester: phân tích rủi ro chi tiết cho từng story",
       "Xác định khả năng kiểm thử của story",
       "Tách story thành task, nhất là task kiểm thử",
       "Ước lượng công sức cho mọi task kiểm thử",
       "Xác định và tinh chỉnh khía cạnh chức năng và phi chức năng của đối tượng kiểm thử"
      ]
     }
    },
    {
     "t": "trap",
     "v": [
      "Lập kế hoạch phát hành nhìn tới cả bản phát hành (product backlog); lập kế hoạch vòng lặp chỉ nhìn tới cuối một vòng lặp (iteration backlog)."
     ]
    }
   ],
   "summary": [
    "Release planning: tester viết story và tiêu chí test được, phân tích rủi ro, ước lượng, lên cách tiếp cận cho cả bản phát hành.",
    "Iteration planning: tester phân tích rủi ro chi tiết, đánh giá khả năng kiểm thử, tách task, ước lượng, tinh chỉnh khía cạnh chức năng và phi chức năng."
   ],
   "terms": [
    [
     "release planning",
     "lập kế hoạch phát hành"
    ],
    [
     "iteration planning",
     "lập kế hoạch vòng lặp"
    ]
   ]
  },
  {
   "id": "5.1.3",
   "title": "Tiêu chí đầu vào và đầu ra",
   "en": "Entry Criteria and Exit Criteria",
   "los": [
    "FL-5.1.3"
   ],
   "minutes": 15,
   "example": "Đội nhận bản build để test hệ thống, nhưng 3 trong 5 bài smoke test fail ngay: build không đạt tiêu chí đầu vào nên bị trả lại. Đến cuối sprint, đội chưa đạt 90% bao phủ yêu cầu như tiêu chí đầu ra, nhưng hết thời gian. PO xem xét rủi ro và chấp nhận phát hành, vì phần chưa test là màn hình ít dùng. Đó cũng là một tiêu chí đầu ra hợp lệ.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Tiêu chí đầu vào (entry)",
      "q": "Điều kiện để BẮT ĐẦU một hoạt động",
      "v": [
       "Sẵn sàng nguồn lực: người, công cụ, môi trường, dữ liệu, ngân sách, thời gian",
       "Sẵn sàng testware: cơ sở kiểm thử, yêu cầu test được, user story, ca kiểm thử",
       "Mức chất lượng ban đầu của đối tượng: ví dụ đã qua toàn bộ smoke test"
      ]
     },
     "r": {
      "h": "Tiêu chí đầu ra (exit)",
      "q": "Điều kiện để TUYÊN BỐ HOÀN TẤT",
      "v": [
       "Độ kỹ lưỡng: mức bao phủ, số lỗi chưa giải quyết, mật độ lỗi, số ca fail",
       "Hoàn tất: đã chạy test theo kế hoạch, đã kiểm thử tĩnh, đã báo cáo mọi lỗi tìm thấy, đã tự động hóa hồi quy",
       "Hết thời gian/ngân sách cũng hợp lệ nếu bên liên quan đã xem xét và chấp nhận rủi ro"
      ]
     }
    },
    {
     "t": "p",
     "v": "Trong Agile: tiêu chí đầu ra thường gọi là **Definition of Done**; tiêu chí đầu vào để một story được bắt đầu phát triển và/hoặc kiểm thử gọi là **Definition of Ready**."
    },
    {
     "t": "trap",
     "v": [
      "Hết thời gian hoặc ngân sách CÓ THỂ là tiêu chí đầu ra hợp lệ, nếu bên liên quan đã xem xét và chấp nhận rủi ro."
     ]
    }
   ],
   "summary": [
    "Entry: điều kiện để bắt đầu (nguồn lực, testware, chất lượng ban đầu như qua smoke test).",
    "Exit: điều kiện để hoàn tất (độ kỹ lưỡng như bao phủ, lỗi còn lại; mức hoàn tất như đã chạy hết test). Hết giờ/hết tiền hợp lệ nếu bên liên quan chấp nhận rủi ro.",
    "Agile: exit = Definition of Done; entry = Definition of Ready."
   ],
   "terms": [
    [
     "entry criteria",
     "tiêu chí đầu vào"
    ],
    [
     "exit criteria",
     "tiêu chí đầu ra"
    ],
    [
     "Definition of Done",
     "Định nghĩa Hoàn thành"
    ]
   ]
  },
  {
   "id": "5.1.4",
   "title": "Kỹ thuật ước lượng",
   "en": "Estimation Techniques",
   "los": [
    "FL-5.1.4"
   ],
   "minutes": 20,
   "example": "Dự án trước, cứ 3 ngày công dev cần 2 ngày công test; dự án mới dev ước 600 người-ngày nên test khoảng 400 (tỷ lệ). Sau 3 sprint đầu, mỗi sprint tốn trung bình 40 giờ test, nên đội ước sprint 4 cũng khoảng 40 giờ (ngoại suy). Với tính năng hoàn toàn mới, cả đội chơi Planning Poker cho tới khi thống nhất con số (Wideband Delphi).",
   "blocks": [
    {
     "t": "table",
     "head": [
      "Kỹ thuật",
      "Nhóm",
      "Cách làm"
     ],
     "rows": [
      [
       "Dựa trên tỷ lệ (ratios)",
       "Dựa trên số liệu",
       "Dùng tỷ lệ từ dự án trước, ví dụ dev : test = 3 : 2. Dev ước 600 người-ngày → test 400 người-ngày"
      ],
      [
       "Ngoại suy (extrapolation)",
       "Dựa trên số liệu",
       "Đo sớm trong chính dự án hiện tại, ngoại suy phần còn lại. Ví dụ lấy trung bình công sức test 3 vòng lặp gần nhất"
      ],
      [
       "Wideband Delphi",
       "Dựa trên chuyên gia",
       "Từng chuyên gia ước lượng riêng; gom kết quả, thảo luận chênh lệch; lặp tới khi đồng thuận. Planning Poker là một biến thể dùng thẻ số"
      ],
      [
       "Ước lượng ba điểm",
       "Dựa trên chuyên gia",
       "Lạc quan a, khả dĩ nhất m, bi quan b. E = (a + 4m + b) / 6; độ lệch chuẩn SD = (b − a) / 6"
      ]
     ]
    },
    {
     "t": "worked",
     "title": "Tự làm: ước lượng ba điểm (ví dụ trong syllabus)",
     "given": "a = 6, m = 9, b = 18 người-giờ. Tính E và khoảng ước lượng.",
     "steps": [
      "E = (6 + 4×9 + 18) / 6 = (6 + 36 + 18) / 6 = 60 / 6 = 10.",
      "SD = (18 − 6) / 6 = 12 / 6 = 2.",
      "Kết quả: 10 ± 2, tức từ 8 đến 12 người-giờ."
     ],
     "answer": "E = 10 người-giờ, SD = 2 → khoảng 8–12 người-giờ."
    },
    {
     "t": "lab",
     "kind": "est3"
    },
    {
     "t": "trap",
     "v": [
      "Nhớ hệ số 4 cho m và chia 6.",
      "Tỷ lệ và ngoại suy là dựa trên số liệu; Wideband Delphi và ba điểm là dựa trên chuyên gia.",
      "Ước lượng cho task nhỏ thường chính xác hơn task lớn; nên tách nhỏ."
     ]
    }
   ],
   "summary": [
    "Ước lượng dựa trên số liệu: tỷ lệ, ngoại suy. Dựa trên chuyên gia: Wideband Delphi (Planning Poker), ba điểm.",
    "Ba điểm: E = (a + 4m + b)/6, SD = (b − a)/6."
   ],
   "terms": [
    [
     "Wideband Delphi",
     "Wideband Delphi"
    ],
    [
     "three-point estimation",
     "ước lượng ba điểm"
    ],
    [
     "Planning Poker",
     "Planning Poker"
    ]
   ]
  },
  {
   "id": "5.1.5",
   "title": "Ưu tiên ca kiểm thử",
   "en": "Test Case Prioritization",
   "los": [
    "FL-5.1.5"
   ],
   "minutes": 12,
   "example": "Còn 2 ngày trước phát hành, đội không chạy hết 400 ca. Họ chạy theo rủi ro: thanh toán trước, đổi avatar sau. Nhưng ca “thanh toán bằng ví” phụ thuộc ca “liên kết ví” (ưu tiên thấp hơn), nên ca liên kết ví phải chạy trước. Ca “thanh toán thẻ quốc tế” chỉ chạy được sáng thứ Năm khi môi trường sandbox của ngân hàng mở, nên được xếp đúng giờ đó.",
   "blocks": [
    {
     "t": "table",
     "head": [
      "Chiến lược",
      "Thứ tự chạy"
     ],
     "rows": [
      [
       "Dựa trên rủi ro",
       "Theo kết quả phân tích rủi ro; ca phủ rủi ro quan trọng nhất chạy trước"
      ],
      [
       "Dựa trên bao phủ",
       "Ca đạt bao phủ cao nhất chạy trước. Biến thể **bao phủ bổ sung**: ca bao phủ cao nhất trước, mỗi ca tiếp theo là ca thêm được nhiều bao phủ nhất"
      ],
      [
       "Dựa trên yêu cầu",
       "Theo độ ưu tiên của yêu cầu do bên liên quan xác định"
      ]
     ]
    },
    {
     "t": "list",
     "v": [
      "Lý tưởng là chạy theo mức ưu tiên, nhưng **phụ thuộc** có thể đảo thứ tự: ca ưu tiên cao phụ thuộc ca ưu tiên thấp thì ca thấp chạy trước.",
      "Cũng phải tính đến **nguồn lực**: công cụ, môi trường, con người chỉ sẵn sàng trong khung thời gian nhất định."
     ]
    },
    {
     "t": "worked",
     "title": "Tự làm: ưu tiên theo bao phủ bổ sung",
     "given": "Bốn ca kiểm thử phủ các yêu cầu: TC1 {R1, R2}, TC2 {R2, R3, R4, R5}, TC3 {R1, R6}, TC4 {R3}. Sắp xếp theo ưu tiên dựa trên bao phủ bổ sung (additional coverage).",
     "steps": [
      "Chọn ca phủ nhiều nhất trước: TC2 phủ 4 yêu cầu → TC2. Đã phủ: R2, R3, R4, R5.",
      "Tính phần phủ THÊM của các ca còn lại: TC1 thêm R1 (1); TC3 thêm R1, R6 (2); TC4 thêm 0.",
      "Chọn TC3. Đã phủ đủ R1–R6.",
      "TC1 và TC4 không thêm bao phủ mới; xếp sau, theo tiêu chí phụ như rủi ro hoặc thời gian chạy."
     ],
     "answer": "TC2 → TC3 → (TC1, TC4). Lưu ý: nếu có phụ thuộc (ví dụ TC3 cần TC4 chạy trước) thì TC4 phải chạy trước TC3."
    },
    {
     "t": "trap",
     "v": [
      "Phụ thuộc giữa các ca có thể khiến ca ưu tiên thấp chạy trước."
     ]
    }
   ],
   "summary": [
    "3 chiến lược ưu tiên: dựa trên rủi ro, dựa trên bao phủ (kể cả bao phủ bổ sung), dựa trên yêu cầu.",
    "Phụ thuộc giữa ca và tính sẵn sàng của nguồn lực có thể thay đổi thứ tự chạy."
   ],
   "terms": [
    [
     "test prioritization",
     "ưu tiên kiểm thử"
    ],
    [
     "additional coverage prioritization",
     "ưu tiên theo bao phủ bổ sung"
    ]
   ]
  },
  {
   "id": "5.1.6",
   "title": "Kim tự tháp kiểm thử",
   "en": "Test Pyramid",
   "los": [
    "FL-5.1.6"
   ],
   "minutes": 8,
   "example": "App giao đồ ăn có 1.200 unit test chạy trong 40 giây, 150 test API chạy trong 5 phút, và chỉ 20 test giao diện end-to-end chạy trong 25 phút. Nhiều test nhỏ, nhanh ở đáy; ít test lớn, chậm ở đỉnh: đúng hình kim tự tháp.",
   "blocks": [
    {
     "t": "p",
     "v": "Mô hình cho thấy các test có **độ chi tiết (granularity)** khác nhau; hỗ trợ đội trong tự động hóa và phân bổ công sức. Các tầng **dưới** là test nhỏ, độc lập, nhanh, kiểm tra một phần nhỏ chức năng nên cần nhiều test. Các tầng **trên** là test phức tạp, mức cao, end-to-end, chậm hơn, kiểm tra chức năng mức cao. Số tầng và tên tầng có thể khác nhau: ví dụ unit → service → UI, hoặc unit (thành phần) → integration (tích hợp thành phần) → end-to-end."
    },
    {
     "t": "trap",
     "v": [
      "Kim tự tháp nói về số lượng và độ chi tiết của test ở mỗi tầng, không nói tầng trên kém quan trọng."
     ]
    }
   ],
   "summary": [
    "Kim tự tháp: dưới nhiều test nhỏ, nhanh, độc lập; trên ít test end-to-end, chậm hơn.",
    "Số tầng và tên tầng có thể khác nhau, ví dụ unit → service → UI."
   ],
   "terms": [
    [
     "test pyramid",
     "kim tự tháp kiểm thử"
    ]
   ]
  },
  {
   "id": "5.1.7",
   "title": "Bốn góc phần tư kiểm thử",
   "en": "Testing Quadrants",
   "los": [
    "FL-5.1.7"
   ],
   "minutes": 15,
   "example": "Team dùng bốn góc phần tư để soát kế hoạch test của sprint: đã có unit test (Q1) và test tiêu chí chấp nhận (Q2), nhưng chưa có phiên khám phá hay thử với người dùng (Q3) và chưa đo hiệu năng (Q4). Họ thêm hai việc đó vào sprint.",
   "blocks": [
    {
     "t": "p",
     "v": "Nhóm cấp độ kiểm thử với loại kiểm thử, hoạt động, kỹ thuật, sản phẩm trong Agile, giúp đảm bảo đủ mọi loại test và giải thích cho bên liên quan. Hai trục: **hướng nghiệp vụ vs hướng công nghệ**; **hỗ trợ đội (dẫn dắt phát triển) vs phản biện sản phẩm (đo hành vi so với kỳ vọng)**."
    },
    {
     "t": "table",
     "head": [
      "Góc",
      "Hướng",
      "Mục đích",
      "Gồm",
      "Thường"
     ],
     "rows": [
      [
       "Q1",
       "Công nghệ",
       "Hỗ trợ đội",
       "Test thành phần, test tích hợp thành phần",
       "Tự động, trong CI"
      ],
      [
       "Q2",
       "Nghiệp vụ",
       "Hỗ trợ đội",
       "Test chức năng, ví dụ, test user story, mẫu thử trải nghiệm, test API, mô phỏng; kiểm tra tiêu chí chấp nhận",
       "Thủ công hoặc tự động"
      ],
      [
       "Q3",
       "Nghiệp vụ",
       "Phản biện sản phẩm",
       "Kiểm thử khám phá, khả năng sử dụng, kiểm thử chấp nhận người dùng",
       "Hướng người dùng, thường thủ công"
      ],
      [
       "Q4",
       "Công nghệ",
       "Phản biện sản phẩm",
       "Smoke test và test phi chức năng (trừ khả năng sử dụng)",
       "Thường tự động"
      ]
     ]
    },
    {
     "t": "tip",
     "v": "Mẹo nhớ: Q1 = code (unit), Q2 = story (chức năng), Q3 = con người (khám phá, usability, UAT), Q4 = máy đo (hiệu năng, bảo mật, smoke)."
    },
    {
     "t": "trap",
     "v": [
      "Usability nằm ở Q3, không phải Q4 dù là phi chức năng."
     ]
    }
   ],
   "summary": [
    "Bốn góc phần tư: Q1 test thành phần (công nghệ, hỗ trợ đội, tự động); Q2 test chức năng, story, API (nghiệp vụ, hỗ trợ đội); Q3 khám phá, usability, UAT (nghiệp vụ, phản biện); Q4 smoke, phi chức năng trừ usability (công nghệ, phản biện).",
    "Bốn góc phần tư giúp đảm bảo đủ loại test và giải thích các loại test cho bên liên quan."
   ],
   "terms": [
    [
     "testing quadrants",
     "bốn góc phần tư kiểm thử"
    ]
   ]
  },
  {
   "id": "5.2.1",
   "title": "Định nghĩa rủi ro và mức rủi ro",
   "en": "Risk Definition and Risk Attributes",
   "los": [
    "FL-5.2.1"
   ],
   "minutes": 8,
   "example": "Rủi ro “app gửi nhắc lịch khám sai giờ”: khả năng xảy ra 4/5 vì logic múi giờ phức tạp, tác động 5/5 vì bệnh nhân lỡ hẹn. Mức rủi ro 4 × 5 = 20, cao nhất trong danh sách, nên được xử lý trước.",
   "blocks": [
    {
     "t": "p",
     "v": "Rủi ro là sự kiện, mối nguy, đe dọa hay tình huống tiềm ẩn mà nếu xảy ra sẽ gây **tác động bất lợi**. Rủi ro có hai yếu tố: **khả năng xảy ra (likelihood)** và **tác động (impact)**, tức mức thiệt hại. Hai yếu tố này tạo nên **mức rủi ro (risk level)**. Mức càng cao, việc xử lý càng quan trọng."
    },
    {
     "t": "p",
     "v": "Quản lý rủi ro gồm hai hoạt động chính: **phân tích rủi ro** (nhận diện, đánh giá) và **kiểm soát rủi ro** (giảm thiểu, theo dõi). Kiểm thử dựa trên rủi ro là cách tiếp cận trong đó hoạt động kiểm thử được chọn, ưu tiên, quản lý dựa trên phân tích và kiểm soát rủi ro."
    },
    {
     "t": "lab",
     "kind": "risk"
    }
   ],
   "summary": [
    "Rủi ro = khả năng xảy ra × tác động → mức rủi ro.",
    "Quản lý rủi ro = phân tích rủi ro (nhận diện, đánh giá) + kiểm soát rủi ro (giảm thiểu, theo dõi)."
   ],
   "terms": [
    [
     "risk",
     "rủi ro"
    ],
    [
     "risk level",
     "mức rủi ro"
    ],
    [
     "likelihood",
     "khả năng xảy ra"
    ],
    [
     "impact",
     "tác động"
    ],
    [
     "risk-based testing",
     "kiểm thử dựa trên rủi ro"
    ]
   ]
  },
  {
   "id": "5.2.2",
   "title": "Rủi ro dự án và rủi ro sản phẩm",
   "en": "Project Risks and Product Risks",
   "los": [
    "FL-5.2.2"
   ],
   "minutes": 10,
   "example": "App đặt lịch khám có hai rủi ro: (1) nhà cung cấp SMS có thể ngừng dịch vụ giữa dự án, (2) app có thể gửi nhắc lịch sai giờ do lỗi múi giờ. Rủi ro 1 là rủi ro DỰ ÁN (ảnh hưởng lịch, ngân sách), xử lý bằng hợp đồng dự phòng. Rủi ro 2 là rủi ro SẢN PHẨM (chất lượng), khả năng 4/5, tác động 5/5 → mức 20, nên được test sớm nhất, kỹ nhất, bằng BVA quanh mốc đổi giờ và test hồi quy.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Rủi ro dự án",
      "q": "Ảnh hưởng tới QUẢN LÝ và KIỂM SOÁT dự án",
      "v": [
       "Tổ chức: chậm bàn giao, ước lượng sai, cắt giảm chi phí",
       "Con người: thiếu kỹ năng, xung đột, giao tiếp kém, thiếu người",
       "Kỹ thuật: phình phạm vi (scope creep), công cụ hỗ trợ kém",
       "Nhà cung cấp: bên thứ ba không bàn giao, công ty hỗ trợ phá sản",
       "Hậu quả: ảnh hưởng lịch, ngân sách, phạm vi"
      ]
     },
     "r": {
      "h": "Rủi ro sản phẩm",
      "q": "Liên quan đến ĐẶC TÍNH CHẤT LƯỢNG của sản phẩm",
      "v": [
       "Thiếu hoặc sai chức năng, tính toán sai, lỗi khi chạy",
       "Kiến trúc kém, thuật toán kém hiệu quả, phản hồi chậm",
       "Trải nghiệm người dùng kém, lỗ hổng bảo mật",
       "Hậu quả: người dùng không hài lòng, mất doanh thu, uy tín, niềm tin; thiệt hại bên thứ ba; chi phí bảo trì cao; quá tải helpdesk; phạt hình sự; trường hợp xấu là thiệt hại vật chất, thương tích, tử vong"
      ]
     }
    },
    {
     "t": "trap",
     "v": [
      "Thiếu tester có kỹ năng, nhà cung cấp chậm trễ → rủi ro DỰ ÁN.",
      "Phản hồi chậm, tính sai, bảo mật yếu → rủi ro SẢN PHẨM."
     ]
    }
   ],
   "summary": [
    "Rủi ro dự án: tổ chức, con người, kỹ thuật, nhà cung cấp → ảnh hưởng lịch, ngân sách, phạm vi.",
    "Rủi ro sản phẩm: đặc tính chất lượng (chức năng, hiệu năng, bảo mật, UX…) → mất khách, uy tín, thậm chí thương vong."
   ],
   "terms": [
    [
     "project risk",
     "rủi ro dự án"
    ],
    [
     "product risk",
     "rủi ro sản phẩm"
    ]
   ]
  },
  {
   "id": "5.2.3",
   "title": "Phân tích rủi ro sản phẩm",
   "en": "Product Risk Analysis",
   "los": [
    "FL-5.2.3"
   ],
   "minutes": 10,
   "example": "Trước sprint, đội brainstorm 12 rủi ro sản phẩm cho tính năng chuyển tiền rồi chấm khả năng và tác động. Ba rủi ro cao nhất (chuyển nhầm số tiền, lộ thông tin tài khoản, giao dịch treo) được test bằng BVA, kiểm thử bảo mật và kiểm thử độ tin cậy; rủi ro thấp như sai màu nút chỉ được kiểm tra nhanh.",
   "blocks": [
    {
     "t": "p",
     "v": "Mục tiêu: nhận thức về rủi ro sản phẩm để tập trung kiểm thử, giảm **rủi ro còn lại (residual risk)**. Lý tưởng là bắt đầu sớm trong SDLC. Gồm **nhận diện** (brainstorming, workshop, phỏng vấn, sơ đồ nhân quả) và **đánh giá** (phân loại, xác định khả năng, tác động, mức rủi ro, ưu tiên, đề xuất cách xử lý). Đánh giá có thể **định lượng** (mức = khả năng × tác động) hoặc **định tính** (ma trận rủi ro)."
    },
    {
     "t": "list",
     "v": [
      "Kết quả phân tích ảnh hưởng tới: **phạm vi** kiểm thử; **cấp độ và loại** kiểm thử; **kỹ thuật và mức bao phủ**; **ước lượng công sức** cho từng task; **ưu tiên** để tìm lỗi nghiêm trọng sớm nhất; có cần hoạt động **ngoài kiểm thử** để giảm rủi ro không."
     ]
    }
   ],
   "summary": [
    "Phân tích rủi ro sản phẩm = nhận diện + đánh giá (định lượng hoặc định tính); ảnh hưởng phạm vi, cấp độ, loại, kỹ thuật, bao phủ, ước lượng, ưu tiên.",
    "Kết quả phân tích quyết định phạm vi, cấp độ, loại, kỹ thuật, mức bao phủ, công sức và thứ tự kiểm thử."
   ],
   "terms": [
    [
     "residual risk",
     "rủi ro còn lại"
    ]
   ]
  },
  {
   "id": "5.2.4",
   "title": "Kiểm soát rủi ro sản phẩm",
   "en": "Product Risk Control",
   "los": [
    "FL-5.2.4"
   ],
   "minutes": 7,
   "example": "Với rủi ro “lộ thông tin tài khoản”, đội giảm thiểu bằng kiểm thử: mời chuyên gia bảo mật độc lập, rà soát code, chạy kiểm thử bảo mật. Với rủi ro “cổng thanh toán bên thứ ba sập”, họ chuyển giao bằng điều khoản hợp đồng và lập kế hoạch dự phòng chuyển sang cổng thứ hai.",
   "blocks": [
    {
     "t": "p",
     "v": "Kiểm soát rủi ro sản phẩm là mọi biện pháp đáp lại các rủi ro đã được phân tích, gồm **giảm thiểu (mitigation)**: thực hiện các hành động đã đề xuất khi đánh giá để hạ mức rủi ro; và **theo dõi (monitoring)**: đảm bảo hành động giảm thiểu có hiệu quả, thu thập thêm thông tin để cải thiện đánh giá, và phát hiện rủi ro mới nổi."
    },
    {
     "t": "table",
     "head": [
      "Phản ứng với rủi ro",
      "Nghĩa",
      "Ví dụ"
     ],
     "rows": [
      [
       "Giảm thiểu bằng kiểm thử",
       "Dùng hoạt động kiểm thử để hạ mức rủi ro",
       "Rủi ro tính sai lãi suất → BVA, rà soát công thức, test hồi quy"
      ],
      [
       "Chấp nhận rủi ro",
       "Biết rủi ro nhưng quyết định không làm thêm, thường vì mức thấp hoặc xử lý quá tốn",
       "Màu nút hơi lệch thiết kế trên trình duyệt cũ"
      ],
      [
       "Chuyển giao rủi ro",
       "Chuyển hậu quả sang bên khác",
       "Mua bảo hiểm; điều khoản phạt trong hợp đồng với nhà cung cấp"
      ],
      [
       "Kế hoạch dự phòng",
       "Chuẩn bị sẵn cách xử lý nếu rủi ro xảy ra",
       "Cổng thanh toán chính sập thì chuyển sang cổng dự phòng"
      ]
     ]
    },
    {
     "t": "list",
     "v": [
      "Giảm thiểu bằng kiểm thử: chọn tester đúng kinh nghiệm và kỹ năng cho loại rủi ro.",
      "Áp dụng mức độc lập kiểm thử phù hợp.",
      "Rà soát và phân tích tĩnh.",
      "Chọn kỹ thuật và mức bao phủ phù hợp.",
      "Chọn loại kiểm thử nhắm vào đặc tính chất lượng bị ảnh hưởng.",
      "Kiểm thử động, bao gồm kiểm thử hồi quy."
     ]
    },
    {
     "t": "trap",
     "v": [
      "Kiểm thử không loại bỏ rủi ro, chỉ giảm; phần còn lại là rủi ro còn lại."
     ]
    }
   ],
   "summary": [
    "Kiểm soát: giảm thiểu bằng kiểm thử, chấp nhận, chuyển giao, kế hoạch dự phòng; cộng theo dõi rủi ro.",
    "Theo dõi rủi ro: kiểm tra biện pháp giảm thiểu có hiệu quả, cải thiện đánh giá, phát hiện rủi ro mới.",
    "Giảm thiểu bằng kiểm thử: đúng người, đúng mức độc lập, rà soát và phân tích tĩnh, đúng kỹ thuật và loại test, kiểm thử động và hồi quy."
   ],
   "terms": [
    [
     "risk mitigation",
     "giảm thiểu rủi ro"
    ]
   ]
  },
  {
   "id": "5.3.1",
   "title": "Giám sát, kiểm soát và metrics",
   "en": "Metrics used in Testing",
   "los": [
    "FL-5.3.1"
   ],
   "minutes": 10,
   "example": "Thứ Tư, dashboard cho thấy chỉ 40% ca đã chạy dù đã qua 70% thời gian, và môi trường staging chậm 2 ngày. Test lead đưa ra chỉ đạo kiểm soát: ưu tiên lại các ca rủi ro cao, xin thêm một tester, dời lịch test hiệu năng. Báo cáo tiến độ hằng tuần gửi cả đội qua chat; cuối dự án, báo cáo hoàn tất kiểm thử theo mẫu gửi ban lãnh đạo.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Giám sát kiểm thử (monitoring)",
      "q": "Thu thập thông tin",
      "v": [
       "Đánh giá tiến độ kiểm thử",
       "Đo xem tiêu chí đầu ra hoặc task kiểm thử gắn với tiêu chí đầu ra đã đạt chưa",
       "Ví dụ: đạt mục tiêu bao phủ rủi ro sản phẩm, yêu cầu, tiêu chí chấp nhận"
      ]
     },
     "r": {
      "h": "Kiểm soát kiểm thử (control)",
      "q": "Dùng thông tin đó để hành động",
      "v": [
       "Ưu tiên lại test khi một rủi ro đã thành vấn đề thật",
       "Đánh giá lại đối tượng có đạt tiêu chí đầu vào/đầu ra sau khi sửa",
       "Điều chỉnh lịch khi môi trường test bàn giao chậm",
       "Thêm nguồn lực khi và nơi cần"
      ]
     }
    },
    {
     "t": "p",
     "v": "**Hoàn tất kiểm thử** thu thập dữ liệu từ các hoạt động đã xong để tổng hợp kinh nghiệm, testware và các thông tin liên quan. Diễn ra tại các mốc: hoàn thành cấp độ kiểm thử, kết thúc vòng lặp Agile, hoàn tất (hoặc hủy) dự án, phát hành hệ thống, hoàn tất bản phát hành bảo trì."
    },
    {
     "t": "h",
     "v": "Các nhóm metrics"
    },
    {
     "t": "table",
     "head": [
      "Nhóm",
      "Ví dụ"
     ],
     "rows": [
      [
       "Tiến độ dự án",
       "Hoàn thành task, sử dụng nguồn lực, công sức kiểm thử"
      ],
      [
       "Tiến độ kiểm thử",
       "Tiến độ cài đặt ca kiểm thử, chuẩn bị môi trường, số ca đã chạy/chưa chạy, đạt/không đạt, thời gian chạy"
      ],
      [
       "Chất lượng sản phẩm",
       "Tính sẵn sàng, thời gian phản hồi, thời gian trung bình giữa các sự cố (MTTF)"
      ],
      [
       "Khiếm khuyết",
       "Số lượng và độ ưu tiên lỗi tìm thấy/đã sửa, mật độ lỗi, tỷ lệ phát hiện lỗi (DDP)"
      ],
      [
       "Rủi ro",
       "Mức rủi ro còn lại"
      ],
      [
       "Bao phủ",
       "Bao phủ yêu cầu, bao phủ code"
      ],
      [
       "Chi phí",
       "Chi phí kiểm thử, chi phí chất lượng của tổ chức"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Chỉ đạo kiểm soát (control directive) là hành động, giám sát chỉ là thu thập."
     ]
    }
   ],
   "summary": [
    "Giám sát = thu thập thông tin để đánh giá tiến độ và tiêu chí đầu ra; kiểm soát = hành động điều chỉnh (ưu tiên lại, dời lịch, thêm người).",
    "Hoàn tất kiểm thử ở các mốc: xong cấp độ, cuối vòng lặp, xong/hủy dự án, phát hành, bản bảo trì.",
    "Metrics: tiến độ dự án, tiến độ kiểm thử, chất lượng sản phẩm, khiếm khuyết, rủi ro, bao phủ, chi phí."
   ],
   "terms": [
    [
     "test monitoring",
     "giám sát kiểm thử"
    ],
    [
     "test control",
     "kiểm soát kiểm thử"
    ],
    [
     "test completion",
     "hoàn tất kiểm thử"
    ],
    [
     "defect density",
     "mật độ lỗi"
    ]
   ]
  },
  {
   "id": "5.3.2",
   "title": "Mục đích, nội dung và người nhận báo cáo kiểm thử",
   "en": "Purpose, Content and Audience for Test Reports",
   "los": [
    "FL-5.3.2"
   ],
   "minutes": 12,
   "example": "Mỗi thứ Sáu, test lead gửi báo cáo tiến độ ngắn vào kênh chat của đội: đã chạy 320/400 ca, chậm 1 ngày do môi trường, 2 rủi ro mới, tuần sau tập trung hồi quy. Cuối dự án, chị viết báo cáo hoàn tất theo mẫu công ty gửi ban lãnh đạo: đánh giá chất lượng, sai lệch so với kế hoạch, lỗi chưa sửa, bài học kinh nghiệm.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Báo cáo tiến độ (progress)",
      "q": "Trong lúc kiểm thử, định kỳ (ngày, tuần)",
      "v": [
       "Giai đoạn kiểm thử",
       "Tiến độ: trước hay sau lịch, sai lệch đáng chú ý",
       "Trở ngại và cách khắc phục",
       "Metrics",
       "Rủi ro mới hoặc thay đổi",
       "Kế hoạch kiểm thử cho kỳ tới"
      ]
     },
     "r": {
      "h": "Báo cáo hoàn tất (completion)",
      "q": "Khi xong dự án, cấp độ, loại kiểm thử",
      "v": [
       "Tóm tắt kiểm thử",
       "Đánh giá kiểm thử và chất lượng sản phẩm so với kế hoạch",
       "Sai lệch so với kế hoạch: lịch, thời lượng, công sức",
       "Trở ngại và cách khắc phục; metrics",
       "Rủi ro chưa giảm thiểu, lỗi chưa sửa",
       "Bài học kinh nghiệm"
      ]
     }
    },
    {
     "t": "p",
     "v": "Người nhận khác nhau cần thông tin và mức trang trọng khác nhau: báo cáo cho người trong đội thường xuyên và không chính thức; báo cáo hoàn tất theo mẫu và chỉ một lần."
    },
    {
     "t": "trap",
     "v": [
      "“Bài học kinh nghiệm” thuộc báo cáo HOÀN TẤT, không phải báo cáo tiến độ.",
      "“Kế hoạch cho kỳ tới” thuộc báo cáo TIẾN ĐỘ."
     ]
    }
   ],
   "summary": [
    "Báo cáo tiến độ: định kỳ, có kế hoạch kỳ tới. Báo cáo hoàn tất: một lần, theo mẫu, có bài học kinh nghiệm, rủi ro và lỗi còn lại.",
    "Người nhận khác nhau cần nội dung và mức trang trọng khác nhau."
   ],
   "terms": [
    [
     "test progress report",
     "báo cáo tiến độ kiểm thử"
    ],
    [
     "test completion report",
     "báo cáo hoàn tất kiểm thử"
    ]
   ]
  },
  {
   "id": "5.3.3",
   "title": "Truyền đạt tình trạng kiểm thử",
   "en": "Communicating the Status of Testing",
   "los": [
    "FL-5.3.3"
   ],
   "minutes": 8,
   "example": "Đội ở Hà Nội và Manila: hằng ngày cập nhật task board và burn-down chart, dashboard CI hiển thị kết quả build; mỗi tuần một cuộc họp ngắn; cuối đợt có báo cáo chính thức. Vì đội phân tán, họ ghi lại nhiều hơn so với đội ngồi chung phòng.",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Trao đổi trực tiếp với thành viên và bên liên quan",
      "Dashboard: CI/CD dashboard, task board, burn-down chart",
      "Kênh điện tử: email, chat",
      "Tài liệu trực tuyến",
      "Báo cáo kiểm thử chính thức",
      "Đội phân tán có thể cần giao tiếp chính thức hơn"
     ]
    }
   ],
   "summary": [
    "Truyền đạt: trực tiếp, dashboard, email/chat, tài liệu online, báo cáo chính thức.",
    "Đội phân tán có thể cần giao tiếp chính thức hơn."
   ],
   "terms": []
  },
  {
   "id": "5.4.1",
   "title": "Quản lý cấu hình",
   "en": "Configuration Management",
   "los": [
    "FL-5.4.1"
   ],
   "minutes": 12,
   "example": "Khách báo lỗi trên bản 2.4.1 trong khi đội đang test bản 2.6. Nhờ quản lý cấu hình, tester dựng lại đúng build 2.4.1, đúng bộ dữ liệu và cấu hình môi trường hôm đó (baseline), tái hiện được lỗi và biết ca kiểm thử nào đã chạy trên bản ấy.",
   "blocks": [
    {
     "t": "p",
     "v": "Là kỷ luật nhận diện, kiểm soát và theo dõi các sản phẩm như kế hoạch, chiến lược, điều kiện, ca kiểm thử, script, kết quả, log, báo cáo, coi chúng là **mục cấu hình (configuration item)**."
    },
    {
     "t": "list",
     "v": [
      "Với mục phức tạp như môi trường kiểm thử, ghi lại các thành phần, quan hệ và phiên bản của chúng.",
      "Khi mục cấu hình được duyệt cho kiểm thử, nó thành **baseline** và chỉ thay đổi qua **quy trình kiểm soát thay đổi chính thức**.",
      "Lưu lại các mục đã thay đổi khi tạo baseline mới; có thể **quay về baseline cũ** để tái tạo kết quả kiểm thử trước đó.",
      "Để hỗ trợ kiểm thử: mọi mục cấu hình, kể cả test item, được **định danh duy nhất, quản lý phiên bản, theo dõi thay đổi, liên kết với mục khác** để giữ truy vết; mọi tài liệu và phần mềm được tham chiếu rõ ràng trong testware.",
      "CI/CD và kiểm thử đi kèm thường nằm trong pipeline DevOps tự động, có quản lý cấu hình tự động."
     ]
    },
    {
     "t": "trap",
     "v": [
      "Baseline chỉ thay đổi qua kiểm soát thay đổi chính thức."
     ]
    }
   ],
   "summary": [
    "Quản lý cấu hình: định danh, kiểm soát, theo dõi các mục cấu hình (kể cả testware, môi trường).",
    "Baseline chỉ đổi qua kiểm soát thay đổi chính thức; quay về baseline cũ để tái tạo kết quả.",
    "Mục cấu hình: định danh duy nhất, có phiên bản, theo dõi thay đổi, liên kết truy vết."
   ],
   "terms": [
    [
     "configuration management",
     "quản lý cấu hình"
    ],
    [
     "configuration item",
     "mục cấu hình"
    ],
    [
     "baseline",
     "baseline (đường cơ sở)"
    ]
   ]
  },
  {
   "id": "5.5.1",
   "title": "Quản lý khiếm khuyết và báo cáo lỗi",
   "en": "Defect Management",
   "los": [
    "FL-5.5.1"
   ],
   "minutes": 18,
   "example": "Khách báo lỗi “không xuất được hóa đơn”. Tester mở lại đúng bản build 2.4.1, đúng bộ dữ liệu và cấu hình môi trường của tuần trước nhờ quản lý cấu hình, tái hiện được lỗi. Báo cáo lỗi ghi rõ: tiêu đề, môi trường, các bước, kết quả mong đợi và thực tế, ảnh chụp, log, mức nghiêm trọng Cao, độ ưu tiên Khẩn. Dev sửa, lỗi chuyển sang “chờ kiểm thử xác nhận”, tester xác nhận rồi đóng.",
   "blocks": [
    {
     "t": "p",
     "v": "Tổ chức cần quy trình quản lý khiếm khuyết với luồng công việc từ khi phát hiện tới khi đóng, và quy tắc phân loại. Bất thường được báo cáo có thể là lỗi thật, hoặc không (false positive), hoặc là yêu cầu thay đổi."
    },
    {
     "t": "p",
     "v": "Mục tiêu của báo cáo lỗi: cho người xử lý **đủ thông tin để giải quyết**; cung cấp cách **theo dõi chất lượng** sản phẩm; đưa ra **ý tưởng cải tiến** quy trình phát triển và kiểm thử."
    },
    {
     "t": "table",
     "head": [
      "Nội dung báo cáo lỗi (kiểm thử động)",
      "Ghi chú"
     ],
     "rows": [
      [
       "Mã định danh duy nhất",
       ""
      ],
      [
       "Tiêu đề và tóm tắt ngắn",
       ""
      ],
      [
       "Ngày quan sát, tổ chức và người báo cáo (vai trò)",
       ""
      ],
      [
       "Đối tượng kiểm thử và môi trường kiểm thử",
       "Phiên bản build, trình duyệt, thiết bị"
      ],
      [
       "Bối cảnh",
       "Ca kiểm thử đang chạy, hoạt động kiểm thử, giai đoạn SDLC, kỹ thuật, checklist, dữ liệu"
      ],
      [
       "Mô tả sự cố để tái hiện và giải quyết",
       "Các bước phát hiện, log, dump CSDL, ảnh chụp, video"
      ],
      [
       "Kết quả mong đợi và thực tế",
       ""
      ],
      [
       "Mức nghiêm trọng (severity)",
       "Mức tác động tới lợi ích bên liên quan hay yêu cầu"
      ],
      [
       "Độ ưu tiên sửa (priority)",
       ""
      ],
      [
       "Trạng thái",
       "open, deferred, duplicate, waiting to be fixed, awaiting confirmation testing, re-opened, closed, rejected"
      ],
      [
       "Tham chiếu",
       "Ví dụ tới ca kiểm thử"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Một số dữ liệu có thể do công cụ quản lý lỗi tự điền. Mẫu báo cáo tham khảo: **ISO/IEC/IEEE 29119-3** (gọi là incident report)."
    },
    {
     "t": "worked",
     "title": "Tự làm: sửa một báo cáo lỗi kém",
     "given": "Báo cáo gốc: “Tiêu đề: App lỗi. Mô tả: Không thanh toán được, sửa gấp!!!” Hãy viết lại thành báo cáo lỗi đủ nội dung.",
     "steps": [
      "ID và tiêu đề cụ thể: BUG-231 · Thanh toán bằng thẻ Visa báo lỗi 500 khi giỏ hàng có mã giảm giá.",
      "Ngày, người báo; đối tượng và môi trường: build 2.6.0, staging, iPhone 13 iOS 17, app bản 2.6.0.",
      "Bối cảnh: đang chạy TC-PAY-07, kiểm thử hệ thống, dữ liệu tài khoản test01.",
      "Các bước tái hiện: 1. Đăng nhập test01. 2. Thêm 1 món 120.000đ. 3. Áp mã SALE10. 4. Chọn Visa, bấm Thanh toán.",
      "Kết quả mong đợi: chuyển tới trang xác nhận, tổng 108.000đ. Kết quả thực tế: hiện “Lỗi 500”, đơn không được tạo. Đính kèm ảnh chụp, video, log lúc 10:42.",
      "Severity: cao (chặn luồng thanh toán). Priority: cao. Trạng thái: open. Tham chiếu: TC-PAY-07, REQ-PAY-03."
     ],
     "answer": "Một báo cáo tốt giúp dev tái hiện được ngay mà không phải hỏi lại. Không ghi cảm xúc (“sửa gấp!!!”), không đổ lỗi cho người, không đoán cách sửa code."
    },
    {
     "t": "trap",
     "v": [
      "Severity = mức tác động; priority = mức khẩn cấp phải sửa. Lỗi chính tả ở logo trang chủ: severity thấp, priority có thể cao.",
      "Báo cáo lỗi không gồm gợi ý cách sửa code hay tên dev gây lỗi."
     ]
    }
   ],
   "summary": [
    "Báo cáo lỗi nhằm: đủ thông tin để sửa, theo dõi chất lượng, ý tưởng cải tiến quy trình.",
    "Nội dung: ID, tiêu đề, ngày/người báo, đối tượng và môi trường, bối cảnh, bước tái hiện, kết quả mong đợi/thực tế, severity, priority, trạng thái, tham chiếu. Mẫu: ISO/IEC/IEEE 29119-3.",
    "Severity là mức tác động, priority là mức khẩn cấp phải sửa."
   ],
   "terms": [
    [
     "defect report",
     "báo cáo khiếm khuyết"
    ],
    [
     "severity",
     "mức nghiêm trọng"
    ],
    [
     "priority",
     "độ ưu tiên"
    ],
    [
     "defect management",
     "quản lý khiếm khuyết"
    ]
   ]
  }
 ],
 "6": [
  {
   "id": "6.1.1",
   "title": "Các nhóm công cụ hỗ trợ kiểm thử",
   "en": "Tool Support for Testing",
   "los": [
    "FL-6.1.1"
   ],
   "minutes": 8,
   "example": "Một tuần của tester: ghi ca kiểm thử và lỗi trên Jira (quản lý), xem cảnh báo SonarQube (kiểm thử tĩnh), chạy Playwright trong GitHub Actions (thực thi và DevOps), đo tải bằng k6 (phi chức năng), dựng môi trường bằng Docker (chuẩn hóa triển khai), trao đổi trên Slack (cộng tác).",
   "blocks": [
    {
     "t": "table",
     "head": [
      "Nhóm",
      "Hỗ trợ"
     ],
     "rows": [
      [
       "Quản lý kiểm thử",
       "Tăng hiệu quả bằng cách quản lý SDLC, yêu cầu, test, lỗi, cấu hình"
      ],
      [
       "Kiểm thử tĩnh",
       "Hỗ trợ rà soát và phân tích tĩnh"
      ],
      [
       "Thiết kế và cài đặt test",
       "Sinh ca kiểm thử, dữ liệu, thủ tục kiểm thử"
      ],
      [
       "Thực thi test và đo bao phủ",
       "Chạy test tự động, đo bao phủ"
      ],
      [
       "Kiểm thử phi chức năng",
       "Làm các test khó hoặc không thể làm thủ công, như tải lớn"
      ],
      [
       "DevOps",
       "Pipeline bàn giao, theo dõi luồng công việc, build tự động, CI/CD"
      ],
      [
       "Cộng tác",
       "Hỗ trợ giao tiếp"
      ],
      [
       "Mở rộng và chuẩn hóa triển khai",
       "Máy ảo, container"
      ],
      [
       "Công cụ khác",
       "Bất kỳ thứ gì hỗ trợ kiểm thử, ví dụ bảng tính"
      ]
     ]
    }
   ],
   "summary": [
    "Nhóm công cụ: quản lý, kiểm thử tĩnh, thiết kế và cài đặt test, thực thi và bao phủ, phi chức năng, DevOps, cộng tác, mở rộng và chuẩn hóa triển khai (VM, container), khác.",
    "Bảng tính cũng tính là công cụ hỗ trợ kiểm thử."
   ],
   "terms": [
    [
     "test management tool",
     "công cụ quản lý kiểm thử"
    ],
    [
     "test execution tool",
     "công cụ thực thi kiểm thử"
    ],
    [
     "coverage tool",
     "công cụ đo bao phủ"
    ]
   ]
  },
  {
   "id": "6.2.1",
   "title": "Lợi ích và rủi ro của tự động hóa",
   "en": "Benefits and Risks of Test Automation",
   "los": [
    "FL-6.2.1"
   ],
   "minutes": 12,
   "example": "Team mua công cụ tự động hóa UI đắt tiền, kỳ vọng “3 tháng tự động 100%”. Sau 3 tháng mới có 20% script, mỗi lần đổi giao diện lại phải sửa script. Ngược lại, khi đưa test hồi quy API vào pipeline CI, mỗi lần merge chỉ mất 6 phút để biết có làm hỏng gì không, và tester có thêm thời gian cho kiểm thử khám phá.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Lợi ích",
      "q": "Tiết kiệm, nhất quán, khách quan",
      "v": [
       "Tiết kiệm thời gian nhờ giảm việc thủ công lặp lại: chạy hồi quy, nhập lại dữ liệu, so sánh kết quả, kiểm tra chuẩn code",
       "Tránh lỗi đơn giản của con người nhờ nhất quán và lặp lại được",
       "Đánh giá khách quan hơn (bao phủ), đo được điều quá phức tạp với con người",
       "Dễ tiếp cận thông tin kiểm thử: thống kê, biểu đồ, tiến độ, tỷ lệ lỗi",
       "Rút ngắn thời gian chạy → phát hiện lỗi sớm, phản hồi nhanh, ra thị trường nhanh",
       "Tester có thêm thời gian thiết kế test mới, sâu và hiệu quả hơn"
      ]
     },
     "r": {
      "h": "Rủi ro",
      "q": "Kỳ vọng sai, phụ thuộc",
      "v": [
       "Kỳ vọng phi thực tế về lợi ích (chức năng, dễ dùng)",
       "Ước lượng sai thời gian, chi phí, công sức để đưa công cụ vào, bảo trì script, thay đổi quy trình",
       "Dùng công cụ khi kiểm thử thủ công phù hợp hơn",
       "Phụ thuộc công cụ quá mức, bỏ qua tư duy phản biện của con người",
       "Phụ thuộc nhà cung cấp: phá sản, ngừng công cụ, bán cho bên khác, hỗ trợ kém",
       "Phần mềm mã nguồn mở bị bỏ dở, hoặc cần cập nhật thường xuyên",
       "Công cụ không tương thích với nền tảng phát triển",
       "Chọn công cụ không đáp ứng yêu cầu pháp lý hoặc tiêu chuẩn an toàn"
      ]
     }
    },
    {
     "t": "trap",
     "v": [
      "Tự động hóa không thay thế hoàn toàn kiểm thử thủ công.",
      "“Phụ thuộc nhà cung cấp” và “mã nguồn mở bị bỏ dở” là RỦI RO.",
      "Đây là chương ít câu nhất trong đề (2/40), học nhanh nhưng đừng bỏ."
     ]
    }
   ],
   "summary": [
    "Lợi ích tự động hóa: bớt việc lặp lại, nhất quán, khách quan, thông tin dễ tiếp cận, phản hồi nhanh, tester có thời gian cho test sâu hơn.",
    "Rủi ro: kỳ vọng phi thực tế, ước lượng sai chi phí, dùng sai chỗ, phụ thuộc quá mức, phụ thuộc nhà cung cấp, mã nguồn mở bị bỏ, không tương thích, không đáp ứng pháp lý/an toàn."
   ],
   "terms": [
    [
     "test automation",
     "tự động hóa kiểm thử"
    ]
   ]
  }
 ]
});
