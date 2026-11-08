/* The QA Lab – bài học chi tiết CTFL v4.0.1 (chương 2 và 3). Mỗi mục ứng với một mục tiêu học tập (LO) trong syllabus. */
window.QALAB.certs.ctfl.lessons = window.QALAB.certs.ctfl.lessons || {};
Object.assign(window.QALAB.certs.ctfl.lessons, {
 "2": [
  {
   "id": "2.1.1",
   "title": "Tác động của SDLC tới kiểm thử",
   "en": "Impact of the SDLC on Testing",
   "los": [
    "FL-2.1.1"
   ],
   "minutes": 15,
   "example": "Cùng là app ngân hàng nhưng hai team làm rất khác. Team A theo mô hình chữ V: tester rà soát tài liệu yêu cầu từ tháng đầu, viết sẵn kịch bản kiểm thử hệ thống, nhưng phải đợi tới tháng thứ 4 mới có bản build để chạy. Team B làm Scrum, mỗi 2 tuần có một bản chạy được, nên trong mỗi sprint tester vừa rà soát story vừa chạy test, phần lớn hồi quy đã được tự động hóa, tài liệu test gọn hơn nhiều. Không team nào sai: kiểm thử phải được điều chỉnh theo SDLC.",
   "blocks": [
    {
     "t": "h",
     "v": "Mô hình SDLC là gì"
    },
    {
     "t": "p",
     "v": "Mô hình SDLC là bức tranh ở mức cao về quy trình phát triển phần mềm: có những giai đoạn nào, các loại hoạt động liên quan nhau thế nào về **logic** và **thời gian**."
    },
    {
     "t": "table",
     "head": [
      "Nhóm mô hình",
      "Ví dụ"
     ],
     "rows": [
      [
       "Tuần tự (sequential)",
       "Thác nước (waterfall), mô hình chữ V"
      ],
      [
       "Lặp (iterative)",
       "Xoắn ốc (spiral), làm mẫu thử (prototyping)"
      ],
      [
       "Tăng dần (incremental)",
       "Unified Process"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Một số hoạt động được mô tả chi tiết hơn bằng các phương pháp và thực hành Agile: ATDD, BDD, DDD, XP, FDD, Kanban, Lean IT, Scrum, TDD."
    },
    {
     "t": "h",
     "v": "SDLC được chọn tác động tới kiểm thử ở 5 điểm"
    },
    {
     "t": "list",
     "v": [
      "Phạm vi và **thời điểm** của hoạt động kiểm thử (cấp độ, loại kiểm thử)",
      "Mức độ chi tiết của tài liệu kiểm thử",
      "Lựa chọn kỹ thuật và cách tiếp cận kiểm thử",
      "Mức độ tự động hóa kiểm thử",
      "Vai trò và trách nhiệm của tester"
     ]
    },
    {
     "t": "table",
     "head": [
      "",
      "Tuần tự",
      "Lặp và tăng dần",
      "Agile"
     ],
     "rows": [
      [
       "Giai đoạn đầu tester làm gì",
       "Rà soát yêu cầu, phân tích và thiết kế test",
       "Cả kiểm thử tĩnh và động trong mỗi vòng lặp",
       "Cả hai, liên tục trong sprint"
      ],
      [
       "Kiểm thử động",
       "Thường chỉ ở giai đoạn sau, khi có code chạy được",
       "Ở mọi cấp độ trong mỗi vòng lặp",
       "Ngay trong sprint"
      ],
      [
       "Hồi quy",
       "Ít vòng hơn",
       "Cần phản hồi nhanh, hồi quy rộng",
       "Tự động hóa rộng để hồi quy dễ"
      ],
      [
       "Tài liệu",
       "Chi tiết",
       "Vừa phải",
       "Gọn nhẹ"
      ],
      [
       "Kiểm thử thủ công",
       "Theo kịch bản chi tiết",
       "Kết hợp",
       "Phần lớn dùng kỹ thuật dựa trên kinh nghiệm"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Agile vẫn có kiểm thử thủ công, chủ yếu dùng kỹ thuật dựa trên kinh nghiệm.",
      "Bảy nguyên tắc kiểm thử không phụ thuộc SDLC."
     ]
    }
   ],
   "summary": [
    "Mô hình SDLC mô tả các giai đoạn và quan hệ logic, thời gian giữa các hoạt động: tuần tự, lặp, tăng dần, cùng các thực hành Agile.",
    "SDLC tác động tới: phạm vi và thời điểm kiểm thử, mức chi tiết tài liệu, kỹ thuật, mức tự động hóa, vai trò tester.",
    "Tuần tự: kiểm thử động muộn. Lặp/tăng dần: test tĩnh và động mỗi vòng lặp, cần hồi quy rộng. Agile: tài liệu gọn, tự động hóa rộng, test thủ công dựa trên kinh nghiệm."
   ],
   "terms": [
    [
     "software development lifecycle (SDLC)",
     "vòng đời phát triển phần mềm"
    ],
    [
     "sequential model",
     "mô hình tuần tự"
    ],
    [
     "iterative model",
     "mô hình lặp"
    ],
    [
     "incremental model",
     "mô hình tăng dần"
    ]
   ]
  },
  {
   "id": "2.1.2",
   "title": "Thực hành tốt cho mọi SDLC",
   "en": "SDLC and Good Testing Practices",
   "los": [
    "FL-2.1.2"
   ],
   "minutes": 10,
   "example": "Dự án app đặt phòng: khi BA viết đặc tả, tester rà soát ngay bản nháp; khi kiến trúc sư thiết kế hệ thống, tester bắt đầu phân tích và thiết kế test hệ thống. Dev làm unit test để kiểm tra từng hàm, đội test kiểm thử hệ thống để kiểm tra luồng đặt phòng end-to-end, hai cấp không test trùng mục tiêu của nhau.",
   "blocks": [
    {
     "t": "steps",
     "v": [
      [
       "Mỗi hoạt động phát triển có một hoạt động kiểm thử tương ứng",
       "Để mọi hoạt động phát triển đều được kiểm soát chất lượng"
      ],
      [
       "Mỗi cấp độ kiểm thử có mục tiêu riêng và khác nhau",
       "Đủ toàn diện mà không trùng lặp"
      ],
      [
       "Phân tích và thiết kế test của một cấp độ bắt đầu ngay trong giai đoạn phát triển tương ứng",
       "Tuân thủ nguyên tắc kiểm thử sớm"
      ],
      [
       "Tester tham gia rà soát sản phẩm ngay khi có bản nháp",
       "Kiểm thử sớm, hỗ trợ dịch trái (shift left)"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Đáp án “mọi cấp độ kiểm thử có cùng mục tiêu” là sai: mỗi cấp độ có mục tiêu riêng."
     ]
    }
   ],
   "summary": [
    "4 thực hành tốt cho mọi SDLC: hoạt động test tương ứng, mục tiêu riêng cho mỗi cấp độ, phân tích/thiết kế test sớm, rà soát từ bản nháp.",
    "Mỗi cấp độ có mục tiêu riêng để đủ toàn diện mà không trùng lặp; rà soát từ bản nháp hỗ trợ dịch trái."
   ],
   "terms": []
  },
  {
   "id": "2.1.3",
   "title": "Kiểm thử dẫn dắt phát triển: TDD, ATDD, BDD",
   "en": "Testing as a Driver for Software Development",
   "los": [
    "FL-2.1.3"
   ],
   "minutes": 15,
   "example": "Tính năng “áp mã giảm giá”. Dev viết test đơn vị “mã SALE10 giảm 10%” trước, chạy thấy đỏ, rồi viết code cho xanh, rồi dọn code (TDD). Trước đó cả đội ngồi với PO viết tiêu chí chấp nhận và biến chúng thành ca kiểm thử chấp nhận (ATDD). PO viết thêm kịch bản “Given giỏ hàng 200.000đ, When áp mã SALE10, Then tổng còn 180.000đ”, và công cụ chạy kịch bản này tự động (BDD).",
   "blocks": [
    {
     "t": "p",
     "v": "Điểm chung: test được xác định **trước khi viết code**, dùng test để định hướng phát triển. Cả ba hiện thực hóa nguyên tắc kiểm thử sớm, theo hướng dịch trái, hỗ trợ mô hình lặp, và test có thể được giữ lại thành test tự động cho các lần tái cấu trúc sau."
    },
    {
     "t": "table",
     "head": [
      "",
      "TDD",
      "ATDD",
      "BDD"
     ],
     "rows": [
      [
       "Tên đầy đủ",
       "Test-Driven Development",
       "Acceptance Test-Driven Development",
       "Behavior-Driven Development"
      ],
      [
       "Test dựa trên",
       "Định hướng code qua ca kiểm thử thay vì thiết kế chi tiết",
       "Tiêu chí chấp nhận, như một phần của thiết kế hệ thống",
       "Hành vi mong muốn, viết bằng ngôn ngữ tự nhiên dễ hiểu"
      ],
      [
       "Trình tự",
       "Viết test → viết code cho test đạt → tái cấu trúc cả test và code",
       "Viết test trước khi phát triển phần cần thỏa mãn test",
       "Viết kịch bản Given/When/Then → chuyển tự động thành test chạy được"
      ],
      [
       "Cấp độ hay gặp",
       "Thành phần (unit)",
       "Chấp nhận",
       "Chấp nhận, hệ thống"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Given/When/Then là dấu hiệu của BDD.",
      "“Test được viết từ tiêu chí chấp nhận” là ATDD; “viết test → code → refactor” là TDD."
     ]
    }
   ],
   "summary": [
    "TDD, ATDD, BDD đều viết test trước code, theo nguyên tắc kiểm thử sớm và dịch trái, hỗ trợ mô hình lặp.",
    "TDD: test → code → refactor, định hướng code bằng test. ATDD: test từ tiêu chí chấp nhận. BDD: Given/When/Then, chuyển tự động thành test."
   ],
   "terms": [
    [
     "test-driven development (TDD)",
     "phát triển hướng kiểm thử"
    ],
    [
     "acceptance test-driven development (ATDD)",
     "phát triển hướng kiểm thử chấp nhận"
    ],
    [
     "behavior-driven development (BDD)",
     "phát triển hướng hành vi"
    ]
   ]
  },
  {
   "id": "2.1.4",
   "title": "DevOps và kiểm thử",
   "en": "DevOps and Testing",
   "los": [
    "FL-2.1.4"
   ],
   "minutes": 15,
   "example": "Mỗi lần dev merge code, pipeline CI/CD tự build, chạy test thành phần, phân tích tĩnh và bộ hồi quy API trong vài phút rồi tự triển khai lên staging. Có test đỏ thì pipeline dừng và báo ngay vào kênh chat của đội. Tester vẫn dành thời gian kiểm thử khám phá từ góc nhìn người dùng.",
   "blocks": [
    {
     "t": "p",
     "v": "DevOps là cách tiếp cận **tổ chức**, đưa phát triển (gồm kiểm thử) và vận hành cùng làm việc để đạt mục tiêu chung. Nó cần thay đổi văn hóa: coi trọng như nhau hai phía, đội tự chủ, phản hồi nhanh, chuỗi công cụ tích hợp, và các thực hành kỹ thuật như **tích hợp liên tục (CI)** và **bàn giao liên tục (CD)**, qua một **pipeline bàn giao DevOps**."
    },
    {
     "t": "compare",
     "l": {
      "h": "Lợi ích cho kiểm thử",
      "q": "Nhanh và ổn định hơn",
      "v": [
       "Phản hồi nhanh về chất lượng code và về việc thay đổi có làm hỏng code cũ không",
       "CI thúc đẩy dịch trái: dev đẩy code kèm test thành phần và phân tích tĩnh",
       "Quy trình tự động CI/CD giúp dựng môi trường kiểm thử ổn định",
       "Thấy rõ hơn các đặc tính phi chức năng như hiệu suất, độ tin cậy",
       "Tự động hóa qua pipeline giảm test thủ công lặp lại",
       "Giảm rủi ro hồi quy nhờ bộ hồi quy tự động lớn"
      ]
     },
     "r": {
      "h": "Rủi ro và thách thức",
      "q": "Cần đầu tư",
      "v": [
       "Phải định nghĩa và dựng pipeline bàn giao",
       "Phải đưa vào và bảo trì công cụ CI/CD",
       "Tự động hóa cần thêm nguồn lực, khó dựng và duy trì",
       "Kiểm thử thủ công, nhất là từ góc nhìn người dùng, VẪN cần"
      ]
     }
    },
    {
     "t": "trap",
     "v": [
      "DevOps không loại bỏ kiểm thử thủ công."
     ]
    }
   ],
   "summary": [
    "DevOps: phát triển (gồm kiểm thử) và vận hành cùng mục tiêu; CI/CD, phản hồi nhanh, pipeline tự động.",
    "Lợi ích: phản hồi nhanh, môi trường ổn định, giảm test tay lặp lại, giảm rủi ro hồi quy. Thách thức: dựng pipeline, bảo trì tool, tự động hóa tốn nguồn lực; test thủ công vẫn cần."
   ],
   "terms": [
    [
     "continuous integration (CI)",
     "tích hợp liên tục"
    ],
    [
     "continuous delivery (CD)",
     "bàn giao liên tục"
    ],
    [
     "delivery pipeline",
     "pipeline bàn giao"
    ]
   ]
  },
  {
   "id": "2.1.5",
   "title": "Dịch trái (shift left)",
   "en": "Shift Left",
   "los": [
    "FL-2.1.5"
   ],
   "minutes": 10,
   "example": "Trước đây team chỉ test hiệu năng vào tuần cuối trước khi ra mắt, và lần nào cũng phát hiện API tìm kiếm quá chậm khi đã hết thời gian sửa. Team chuyển sang: tester rà soát story từ khi còn nháp, dev chạy phân tích tĩnh trong CI, và đo thời gian phản hồi của API ngay từ test thành phần. Vấn đề chậm được bắt từ ngày thứ ba của sprint.",
   "blocks": [
    {
     "t": "p",
     "v": "Dịch trái là tên gọi khác của nguyên tắc **kiểm thử sớm**: đưa kiểm thử về sớm hơn trong SDLC. Nó **không** có nghĩa là bỏ kiểm thử ở các giai đoạn sau."
    },
    {
     "t": "h",
     "v": "5 thực hành dịch trái"
    },
    {
     "t": "steps",
     "v": [
      [
       "Rà soát đặc tả từ góc nhìn tester",
       "Thường phát hiện mơ hồ, thiếu sót, mâu thuẫn"
      ],
      [
       "Viết ca kiểm thử trước khi viết code",
       "Chạy code trong khung kiểm thử (test harness) khi đang viết"
      ],
      [
       "Dùng CI, tốt hơn nữa là CD",
       "Phản hồi nhanh, test thành phần tự động đi kèm mỗi lần đẩy code"
      ],
      [
       "Hoàn thành phân tích tĩnh trước kiểm thử động",
       "Hoặc đưa vào quy trình tự động"
      ],
      [
       "Bắt đầu kiểm thử phi chức năng từ cấp thành phần khi có thể",
       "Vì loại test này thường làm muộn, khi đã có hệ thống và môi trường đầy đủ"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Dịch trái có thể tốn thêm đào tạo, công sức, chi phí ở giai đoạn đầu, nhưng được kỳ vọng tiết kiệm về sau. Muốn thành công, **các bên liên quan phải được thuyết phục và ủng hộ**."
    },
    {
     "t": "trap",
     "v": [
      "Dịch trái không có nghĩa bỏ kiểm thử ở cuối SDLC."
     ]
    }
   ],
   "summary": [
    "Dịch trái = kiểm thử sớm hơn, không bỏ kiểm thử về sau.",
    "5 thực hành: rà soát đặc tả từ góc nhìn tester; viết test trước code; CI/CD; phân tích tĩnh trước kiểm thử động; test phi chức năng từ cấp thành phần.",
    "Tốn thêm ban đầu, tiết kiệm về sau; cần bên liên quan ủng hộ."
   ],
   "terms": [
    [
     "shift left",
     "dịch trái"
    ],
    [
     "test harness",
     "khung kiểm thử"
    ]
   ]
  },
  {
   "id": "2.1.6",
   "title": "Họp cải tiến và cải tiến quy trình",
   "en": "Retrospectives and Process Improvement",
   "los": [
    "FL-2.1.6"
   ],
   "minutes": 10,
   "example": "Cuối sprint, cả đội ngồi 45 phút. Điều làm tốt: demo sớm cho PO. Điều chưa tốt: môi trường test hay sập. Hành động: dựng môi trường bằng container, giao một bạn dev theo dõi. Kết quả được ghi lại, và buổi retro sau đội kiểm tra xem hành động đã làm chưa.",
   "blocks": [
    {
     "t": "p",
     "v": "Thường tổ chức cuối dự án, cuối vòng lặp, ở mốc phát hành, hoặc khi cần. Người tham gia không chỉ tester mà cả dev, kiến trúc sư, PO, BA. Ba câu hỏi:"
    },
    {
     "t": "list",
     "v": [
      "Điều gì đã làm tốt và nên giữ?",
      "Điều gì chưa tốt và có thể cải thiện?",
      "Làm sao áp dụng cải tiến và giữ những điều tốt trong tương lai?"
     ]
    },
    {
     "t": "p",
     "v": "Kết quả nên được ghi lại, thường nằm trong **báo cáo hoàn tất kiểm thử**. Cải tiến đề xuất phải được theo dõi thực hiện."
    },
    {
     "t": "table",
     "head": [
      "Lợi ích cho kiểm thử",
      "Ví dụ"
     ],
     "rows": [
      [
       "Tăng hiệu lực / hiệu quả kiểm thử",
       "Áp dụng đề xuất cải tiến quy trình"
      ],
      [
       "Nâng chất lượng testware",
       "Cùng nhau rà soát quy trình kiểm thử"
      ],
      [
       "Gắn kết và học hỏi trong đội",
       "Có cơ hội nêu vấn đề, đề xuất cải tiến"
      ],
      [
       "Cải thiện chất lượng cơ sở kiểm thử",
       "Xử lý thiếu sót về phạm vi và chất lượng của yêu cầu"
      ],
      [
       "Cộng tác dev – test tốt hơn",
       "Cộng tác được xem xét và tối ưu thường xuyên"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Retrospective KHÔNG dùng để đánh giá hiệu suất cá nhân."
     ]
    }
   ],
   "summary": [
    "Retrospective: điều gì tốt, điều gì cần cải thiện, áp dụng thế nào. Kết quả thường nằm trong báo cáo hoàn tất kiểm thử.",
    "Lợi ích: hiệu lực/hiệu quả, chất lượng testware, gắn kết đội, chất lượng cơ sở kiểm thử, cộng tác dev–test."
   ],
   "terms": [
    [
     "retrospective",
     "họp cải tiến"
    ],
    [
     "process improvement",
     "cải tiến quy trình"
    ]
   ]
  },
  {
   "id": "2.2.1",
   "title": "Cấp độ kiểm thử",
   "en": "Test Levels",
   "los": [
    "FL-2.2.1"
   ],
   "minutes": 20,
   "example": "Tính năng “Thanh toán QR” của app giao đồ ăn: dev test riêng hàm tính tổng tiền (thành phần); kiểm tra module giỏ hàng truyền đúng dữ liệu sang module thanh toán (tích hợp thành phần); tester chạy cả luồng từ chọn món tới nhận hóa đơn, kèm đo tốc độ (hệ thống); kiểm tra app nói chuyện đúng với cổng thanh toán ngân hàng (tích hợp hệ thống); cuối cùng một nhóm người dùng thật dùng thử trước khi mở cho tất cả (chấp nhận, beta). Ở mỗi cấp, đội đều làm cả test chức năng lẫn phi chức năng.",
   "blocks": [
    {
     "t": "h",
     "v": "Hai khái niệm khác nhau"
    },
    {
     "t": "compare",
     "l": {
      "h": "Cấp độ kiểm thử · test level",
      "q": "Kiểm thử ở GIAI ĐOẠN nào của sản phẩm?",
      "v": [
       "Nhóm hoạt động được tổ chức và quản lý cùng nhau",
       "Mỗi cấp là một thể hiện của quy trình kiểm thử",
       "Từ thành phần riêng lẻ tới hệ thống hoàn chỉnh hay hệ thống của các hệ thống"
      ]
     },
     "r": {
      "h": "Loại kiểm thử · test type",
      "q": "Kiểm thử ĐẶC TÍNH CHẤT LƯỢNG nào?",
      "v": [
       "Nhóm hoạt động liên quan tới đặc tính chất lượng cụ thể",
       "Phần lớn có thể làm ở MỌI cấp độ",
       "Trọng tâm mỗi cấp khác nhau"
      ]
     }
    },
    {
     "t": "p",
     "v": "Trong SDLC tuần tự, tiêu chí đầu ra của cấp này thường là một phần tiêu chí đầu vào của cấp sau. Ở mô hình lặp có thể không như vậy. Các cấp độ có thể chồng lấn về thời gian."
    },
    {
     "t": "h",
     "v": "5 cấp độ kiểm thử"
    },
    {
     "t": "table",
     "head": [
      "Cấp độ",
      "Tập trung vào",
      "Ai, ở đâu",
      "Ghi nhớ"
     ],
     "rows": [
      [
       "Kiểm thử thành phần (component / unit)",
       "Từng thành phần tách biệt",
       "Thường là dev, trong môi trường phát triển",
       "Cần khung kiểm thử hoặc framework unit test"
      ],
      [
       "Kiểm thử tích hợp thành phần",
       "Giao diện và tương tác GIỮA các thành phần",
       "Thường là dev",
       "Phụ thuộc chiến lược tích hợp: bottom-up, top-down, big-bang"
      ],
      [
       "Kiểm thử hệ thống",
       "Hành vi và năng lực tổng thể của cả hệ thống",
       "Có thể là đội test độc lập",
       "Chức năng end-to-end + phi chức năng; có thể dùng mô phỏng hệ thống con"
      ],
      [
       "Kiểm thử tích hợp hệ thống",
       "Giao diện với HỆ THỐNG KHÁC và dịch vụ bên ngoài",
       "Đội test",
       "Cần môi trường giống vận hành"
      ],
      [
       "Kiểm thử chấp nhận",
       "Thẩm định, sẵn sàng triển khai, đáp ứng nhu cầu nghiệp vụ",
       "Lý tưởng là người dùng dự kiến",
       "Gồm UAT, vận hành (OAT), hợp đồng, quy định, alpha, beta"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Các cấp độ được phân biệt bằng: **đối tượng kiểm thử, mục tiêu kiểm thử, cơ sở kiểm thử, khiếm khuyết và sự cố, cách tiếp cận và trách nhiệm**."
    },
    {
     "t": "trap",
     "v": [
      "Tích hợp THÀNH PHẦN = giữa các module bên trong. Tích hợp HỆ THỐNG = với hệ thống, dịch vụ bên ngoài."
     ]
    }
   ],
   "summary": [
    "Cấp độ = test ở giai đoạn nào; loại = test đặc tính chất lượng nào. Loại kiểm thử làm được ở mọi cấp độ.",
    "5 cấp độ: thành phần → tích hợp thành phần → hệ thống → tích hợp hệ thống → chấp nhận (UAT, OAT, hợp đồng, quy định, alpha, beta).",
    "Phân biệt cấp độ bằng: đối tượng, mục tiêu, cơ sở kiểm thử, khiếm khuyết/sự cố, cách tiếp cận và trách nhiệm."
   ],
   "terms": [
    [
     "test level",
     "cấp độ kiểm thử"
    ],
    [
     "component testing",
     "kiểm thử thành phần"
    ],
    [
     "component integration testing",
     "kiểm thử tích hợp thành phần"
    ],
    [
     "system testing",
     "kiểm thử hệ thống"
    ],
    [
     "system integration testing",
     "kiểm thử tích hợp hệ thống"
    ],
    [
     "acceptance testing",
     "kiểm thử chấp nhận"
    ]
   ]
  },
  {
   "id": "2.2.2",
   "title": "Loại kiểm thử",
   "en": "Test Types",
   "los": [
    "FL-2.2.2"
   ],
   "minutes": 20,
   "example": "Cùng màn hình đăng nhập: kiểm tra nhập đúng mật khẩu thì vào được (chức năng); đo thời gian đăng nhập dưới 2 giây khi 1.000 người cùng vào (phi chức năng, hiệu suất); thử theo đặc tả mà không xem code (hộp đen); đảm bảo mọi nhánh trong hàm xác thực đều đã chạy (hộp trắng).",
   "blocks": [
    {
     "t": "table",
     "head": [
      "Loại",
      "Câu hỏi",
      "Mục tiêu chính"
     ],
     "rows": [
      [
       "Kiểm thử chức năng",
       "Hệ thống làm CÁI GÌ?",
       "Tính đầy đủ, đúng đắn, phù hợp của chức năng"
      ],
      [
       "Kiểm thử phi chức năng",
       "Hệ thống làm TỐT ĐẾN MỨC NÀO?",
       "Các đặc tính chất lượng phi chức năng"
      ],
      [
       "Kiểm thử hộp đen",
       "Hành vi có đúng đặc tả không?",
       "Dựa trên đặc tả, không xét cấu trúc bên trong"
      ],
      [
       "Kiểm thử hộp trắng",
       "Cấu trúc bên trong đã được bao phủ đủ chưa?",
       "Dựa trên code, kiến trúc, luồng công việc, luồng dữ liệu"
      ]
     ]
    },
    {
     "t": "h",
     "v": "8 đặc tính phi chức năng (ISO/IEC 25010)"
    },
    {
     "t": "table",
     "head": [
      "Đặc tính",
      "Ví dụ kiểm thử"
     ],
     "rows": [
      [
       "Hiệu suất (performance efficiency)",
       "Thời gian phản hồi khi 1.000 người dùng"
      ],
      [
       "Tính tương thích (compatibility)",
       "Chạy cùng ứng dụng khác, nhiều trình duyệt"
      ],
      [
       "Khả năng sử dụng (usability, nay gọi interaction capability)",
       "Người mới dùng có đặt hàng được không"
      ],
      [
       "Độ tin cậy (reliability)",
       "Chạy liên tục 72 giờ không lỗi"
      ],
      [
       "Bảo mật (security)",
       "Chống truy cập trái phép"
      ],
      [
       "Khả năng bảo trì (maintainability)",
       "Dễ sửa, dễ mở rộng code"
      ],
      [
       "Tính khả chuyển (portability, nay gọi flexibility)",
       "Cài được trên hệ điều hành mới"
      ],
      [
       "An toàn (safety)",
       "Không gây nguy hiểm cho người hay môi trường"
      ]
     ]
    },
    {
     "t": "list",
     "v": [
      "Nên bắt đầu kiểm thử phi chức năng **sớm** (trong rà soát, kiểm thử thành phần).",
      "Nhiều test phi chức năng được suy ra từ test chức năng: cùng thao tác nhưng kiểm tra thêm ràng buộc, ví dụ phải xong trong 2 giây.",
      "Phát hiện muộn lỗi phi chức năng có thể đe dọa cả dự án.",
      "Đôi khi cần môi trường rất đặc thù, như phòng lab khả năng sử dụng."
     ]
    },
    {
     "t": "trap",
     "v": [
      "Cả 4 loại kiểm thử đều làm được ở mọi cấp độ.",
      "Tính đúng đắn chức năng (functional correctness) KHÔNG phải đặc tính phi chức năng."
     ]
    }
   ],
   "summary": [
    "4 loại: chức năng (CÁI GÌ), phi chức năng (TỐT ĐẾN MỨC NÀO), hộp đen (đặc tả), hộp trắng (cấu trúc).",
    "8 đặc tính phi chức năng ISO 25010: hiệu suất, tương thích, sử dụng, tin cậy, bảo mật, bảo trì, khả chuyển, an toàn. Nên test sớm.",
    "Kiểm thử phi chức năng nên bắt đầu sớm; nhiều test phi chức năng được suy ra từ test chức năng."
   ],
   "terms": [
    [
     "test type",
     "loại kiểm thử"
    ],
    [
     "functional testing",
     "kiểm thử chức năng"
    ],
    [
     "non-functional testing",
     "kiểm thử phi chức năng"
    ]
   ]
  },
  {
   "id": "2.2.3",
   "title": "Kiểm thử xác nhận và kiểm thử hồi quy",
   "en": "Confirmation Testing and Regression Testing",
   "los": [
    "FL-2.2.3"
   ],
   "minutes": 20,
   "example": "Bug: đăng nhập bằng email có chữ in hoa bị báo sai mật khẩu. Dev sửa. Tester chạy lại đúng ca kiểm thử đã fail, thêm một ca mới cho email có cả chữ hoa lẫn dấu chấm: đó là kiểm thử xác nhận. Phân tích tác động cho thấy hàm chuẩn hóa email còn được dùng ở đăng ký và quên mật khẩu, nên tester chạy bộ hồi quy của cả ba luồng, và bộ này đã chạy tự động trong CI mỗi đêm.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Kiểm thử xác nhận · confirmation",
      "q": "Lỗi gốc đã được sửa thành công chưa?",
      "v": [
       "Chạy lại các test từng fail vì lỗi đó",
       "Có thể thêm test mới cho phần code đã thay đổi khi sửa",
       "Thiếu thời gian/tiền: tối thiểu chạy lại các bước tái hiện sự cố và kiểm tra nó không còn"
      ]
     },
     "r": {
      "h": "Kiểm thử hồi quy · regression",
      "q": "Thay đổi có gây hậu quả xấu ở chỗ khác không?",
      "v": [
       "Kể cả một bản sửa đã qua kiểm thử xác nhận",
       "Ảnh hưởng có thể ở chính thành phần, thành phần khác, hệ thống kết nối, và cả môi trường",
       "Nên phân tích tác động trước để xác định phạm vi"
      ]
     }
    },
    {
     "t": "h",
     "v": "Vì sao hồi quy là ứng viên số 1 để tự động hóa"
    },
    {
     "t": "list",
     "v": [
      "Bộ hồi quy được chạy rất nhiều lần.",
      "Số ca hồi quy thường tăng sau mỗi vòng lặp hay bản phát hành.",
      "Nên bắt đầu tự động hóa sớm trong dự án.",
      "Khi dùng CI (như trong DevOps), nên đưa cả hồi quy tự động vào, có thể ở nhiều cấp độ."
     ]
    },
    {
     "t": "p",
     "v": "Kiểm thử xác nhận và/hoặc hồi quy cần ở **mọi cấp độ** có sửa lỗi hoặc thay đổi."
    },
    {
     "t": "trap",
     "v": [
      "Đề thường cho tình huống: “chạy lại test đã fail” → xác nhận; “chạy các tính năng khác để chắc không bị ảnh hưởng” → hồi quy.",
      "Phân tích tác động giúp xác định phạm vi hồi quy."
     ]
    }
   ],
   "summary": [
    "Xác nhận: lỗi gốc đã hết chưa (chạy lại test fail, thêm test cho phần sửa).",
    "Hồi quy: thay đổi có làm hỏng chỗ khác không, kể cả trong môi trường và hệ thống kết nối.",
    "Phân tích tác động trước để xác định phạm vi hồi quy.",
    "Hồi quy chạy nhiều lần và lớn dần → ứng viên số 1 để tự động hóa, đưa vào CI.",
    "Cần ở mọi cấp độ có sửa lỗi hoặc thay đổi."
   ],
   "terms": [
    [
     "confirmation testing",
     "kiểm thử xác nhận"
    ],
    [
     "regression testing",
     "kiểm thử hồi quy"
    ],
    [
     "impact analysis",
     "phân tích tác động"
    ]
   ]
  },
  {
   "id": "2.3.1",
   "title": "Kiểm thử bảo trì",
   "en": "Maintenance Testing",
   "los": [
    "FL-2.3.1"
   ],
   "minutes": 15,
   "example": "Hệ thống quản lý nhân sự 8 năm tuổi: tháng này có bản vá khẩn cho lỗi tính lương (hot fix), quý sau chuyển từ server riêng lên cloud (chuyển đổi môi trường, kèm chuyển dữ liệu), năm sau module chấm công cũ sẽ ngừng dùng và dữ liệu phải được lưu trữ 10 năm theo quy định (ngừng sử dụng). Cả ba đều kích hoạt kiểm thử bảo trì, với phạm vi khác nhau tùy rủi ro và quy mô thay đổi.",
   "blocks": [
    {
     "t": "p",
     "v": "Bảo trì gồm: **khắc phục** lỗi, **thích ứng** với thay đổi môi trường, **cải thiện** hiệu năng hay khả năng bảo trì (chi tiết trong ISO/IEC 14764). Bảo trì có thể là bản phát hành có kế hoạch hoặc không có kế hoạch (hot fix)."
    },
    {
     "t": "list",
     "v": [
      "Có thể **phân tích tác động trước khi thay đổi** để quyết định có nên thay đổi không.",
      "Kiểm thử thay đổi trên hệ thống đang vận hành gồm: kiểm tra thay đổi được triển khai thành công VÀ kiểm tra hồi quy ở phần không đổi (thường là phần lớn hệ thống)."
     ]
    },
    {
     "t": "h",
     "v": "Phạm vi kiểm thử bảo trì phụ thuộc vào"
    },
    {
     "t": "list",
     "v": [
      "Mức độ rủi ro của thay đổi",
      "Quy mô của hệ thống hiện có",
      "Quy mô của thay đổi"
     ]
    },
    {
     "t": "h",
     "v": "3 nhóm yếu tố kích hoạt"
    },
    {
     "t": "table",
     "head": [
      "Kích hoạt",
      "Ví dụ",
      "Cần kiểm thử gì"
     ],
     "rows": [
      [
       "Sửa đổi (modification)",
       "Cải tiến theo kế hoạch, sửa lỗi, hot fix",
       "Thay đổi + hồi quy"
      ],
      [
       "Nâng cấp / chuyển đổi môi trường (upgrade, migration)",
       "Chuyển nền tảng, lên cloud",
       "Môi trường mới, phần mềm đã đổi, chuyển đổi dữ liệu"
      ],
      [
       "Ngừng sử dụng (retirement)",
       "Ứng dụng hết vòng đời",
       "Lưu trữ dữ liệu nếu cần giữ lâu, quy trình khôi phục và truy xuất"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Tuyển thêm người hay đổi quy trình nội bộ KHÔNG phải yếu tố kích hoạt kiểm thử bảo trì.",
      "Ngừng sử dụng hệ thống cũng cần kiểm thử."
     ]
    }
   ],
   "summary": [
    "Bảo trì: khắc phục, thích ứng môi trường, cải thiện; có kế hoạch hoặc hot fix.",
    "Kiểm thử bảo trì = kiểm tra thay đổi thành công + hồi quy phần không đổi; có thể phân tích tác động trước khi thay đổi.",
    "Phạm vi phụ thuộc: rủi ro của thay đổi, quy mô hệ thống, quy mô thay đổi.",
    "3 kích hoạt: sửa đổi, nâng cấp/chuyển đổi môi trường (kể cả chuyển dữ liệu), ngừng sử dụng (lưu trữ, khôi phục dữ liệu)."
   ],
   "terms": [
    [
     "maintenance testing",
     "kiểm thử bảo trì"
    ],
    [
     "hot fix",
     "bản vá khẩn"
    ],
    [
     "migration",
     "chuyển đổi"
    ],
    [
     "retirement",
     "ngừng sử dụng"
    ]
   ]
  }
 ],
 "3": [
  {
   "id": "3.1.1",
   "title": "Sản phẩm kiểm thử tĩnh được",
   "en": "Work Products Examinable by Static Testing",
   "los": [
    "FL-3.1.1"
   ],
   "minutes": 10,
   "example": "Trong một sprint, tester rà soát user story, kế hoạch test và bộ ca kiểm thử của đồng nghiệp; dev chạy SonarQube trên mã nguồn. Riêng thư viện mã hóa mua của bên thứ ba thì không được phân tích, vì điều khoản bản quyền cấm dịch ngược.",
   "blocks": [
    {
     "t": "p",
     "v": "Kiểm thử tĩnh **không thực thi** phần mềm. Sản phẩm được đánh giá bằng **kiểm tra thủ công** (rà soát, review) hoặc **công cụ** (phân tích tĩnh). Mục tiêu: nâng chất lượng, tìm khiếm khuyết, đánh giá tính dễ đọc, đầy đủ, đúng đắn, khả năng kiểm thử, nhất quán. Dùng được cho cả **thẩm tra và thẩm định**."
    },
    {
     "t": "list",
     "v": [
      "Tester, đại diện nghiệp vụ (PO, BA) và dev cùng làm example mapping, cùng viết user story, tinh chỉnh backlog để story đạt Definition of Ready, đầy đủ, dễ hiểu và có tiêu chí chấp nhận test được.",
      "Phân tích tĩnh tìm vấn đề trước kiểm thử động, thường ít công sức vì không cần ca kiểm thử; thường tích hợp vào CI; dùng cho lỗi code, khả năng bảo trì, bảo mật. Công cụ kiểm tra chính tả, độ dễ đọc cũng là phân tích tĩnh."
     ]
    },
    {
     "t": "h",
     "v": "Cái gì kiểm thử tĩnh được"
    },
    {
     "t": "table",
     "head": [
      "",
      "Áp dụng cho"
     ],
     "rows": [
      [
       "Gần như mọi sản phẩm",
       "Đặc tả yêu cầu, mã nguồn, kế hoạch test, ca kiểm thử, product backlog item, test charter, tài liệu dự án, hợp đồng, mô hình"
      ],
      [
       "Rà soát (review)",
       "Bất kỳ thứ gì đọc và hiểu được"
      ],
      [
       "Phân tích tĩnh",
       "Chỉ sản phẩm có cấu trúc kiểm tra được: mô hình, code, văn bản có cú pháp hình thức"
      ],
      [
       "Không phù hợp",
       "Thứ khó diễn giải với con người và không nên phân tích bằng công cụ, ví dụ code thực thi của bên thứ ba vì lý do pháp lý"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Phân tích tĩnh cần sản phẩm có cấu trúc hình thức; review thì không."
     ]
    }
   ],
   "summary": [
    "Kiểm thử tĩnh không chạy phần mềm: rà soát (thủ công) và phân tích tĩnh (công cụ); dùng cho thẩm tra và thẩm định.",
    "Gần như mọi sản phẩm đều review được; phân tích tĩnh cần cấu trúc hình thức; không phù hợp với code bên thứ ba bị cấm phân tích."
   ],
   "terms": [
    [
     "static testing",
     "kiểm thử tĩnh"
    ],
    [
     "static analysis",
     "phân tích tĩnh"
    ],
    [
     "review",
     "rà soát"
    ],
    [
     "Definition of Ready",
     "Định nghĩa Sẵn sàng"
    ]
   ]
  },
  {
   "id": "3.1.2",
   "title": "Giá trị của kiểm thử tĩnh",
   "en": "Value of Static Testing",
   "los": [
    "FL-3.1.2"
   ],
   "minutes": 10,
   "example": "Trước khi code tính năng hoàn tiền, tester đọc user story và hỏi: “Hoàn tiền một phần thì sao? Quá 30 ngày thì sao?”. Hai câu hỏi phát hiện hai chỗ thiếu ngay trên giấy, sửa mất 10 phút thay vì vài ngày nếu lọt lên production. Song song, SonarQube trong CI báo một biến chưa khởi tạo và một đoạn code không bao giờ chạy tới: những lỗi mà chạy test bình thường khó thấy.",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Tìm khiếm khuyết ở **giai đoạn sớm nhất** của SDLC (kiểm thử sớm).",
      "Tìm được lỗi **kiểm thử động không thấy**: code không thể tiếp cận, mẫu thiết kế không đúng, lỗi trong sản phẩm không chạy được.",
      "Đánh giá chất lượng và tạo niềm tin vào sản phẩm; giúp bên liên quan chắc yêu cầu mô tả đúng nhu cầu thật.",
      "Tạo **hiểu biết chung** và cải thiện giao tiếp, nên mời nhiều bên liên quan tham gia.",
      "Review tốn kém khi làm, nhưng **tổng chi phí dự án thường thấp hơn** nhiều vì sửa lỗi muộn tốn hơn.",
      "Một số lỗi code được phân tích tĩnh tìm hiệu quả hơn kiểm thử động, giảm cả số lỗi lẫn tổng công sức."
     ]
    }
   ],
   "summary": [
    "Giá trị: tìm lỗi sớm nhất, tìm lỗi kiểm thử động không thấy, tạo hiểu biết chung, giảm tổng chi phí.",
    "Review tốn công khi làm, nhưng tổng chi phí dự án thường thấp hơn vì sửa lỗi muộn tốn hơn nhiều."
   ],
   "terms": [
    [
     "unreachable code",
     "code không thể tiếp cận"
    ]
   ]
  },
  {
   "id": "3.1.3",
   "title": "So sánh kiểm thử tĩnh và động",
   "en": "Differences between Static Testing and Dynamic Testing",
   "los": [
    "FL-3.1.3"
   ],
   "minutes": 10,
   "example": "Rà soát code phát hiện một đoạn xử lý ngày 29/2 không bao giờ được gọi tới (code không thể tiếp cận): kiểm thử động không thể chạy tới đó. Ngược lại, chỉ khi chạy thật với 500 người dùng mới thấy trang chậm 8 giây: kiểm thử tĩnh không đo được điều này.",
   "blocks": [
    {
     "t": "table",
     "head": [
      "",
      "Kiểm thử tĩnh",
      "Kiểm thử động"
     ],
     "rows": [
      [
       "Cách tìm lỗi",
       "Tìm thẳng khiếm khuyết",
       "Gây ra sự cố, rồi phân tích để tìm khiếm khuyết"
      ],
      [
       "Sản phẩm áp dụng",
       "Cả sản phẩm không chạy được",
       "Chỉ sản phẩm chạy được"
      ],
      [
       "Đường đi ít khi chạy",
       "Dễ tìm lỗi ở đó hơn",
       "Khó tiếp cận"
      ],
      [
       "Đặc tính đo được",
       "Không phụ thuộc thực thi, ví dụ khả năng bảo trì",
       "Phụ thuộc thực thi, ví dụ hiệu suất"
      ]
     ]
    },
    {
     "t": "h",
     "v": "Lỗi điển hình dễ và rẻ tìm hơn bằng kiểm thử tĩnh"
    },
    {
     "t": "table",
     "head": [
      "Nhóm",
      "Ví dụ"
     ],
     "rows": [
      [
       "Yêu cầu",
       "Không nhất quán, mơ hồ, mâu thuẫn, thiếu, không chính xác, trùng lặp"
      ],
      [
       "Thiết kế",
       "Cấu trúc CSDL kém hiệu quả, phân chia module kém"
      ],
      [
       "Một số lỗi lập trình",
       "Biến chưa có giá trị, biến chưa khai báo, code không tiếp cận được hoặc trùng lặp, code quá phức tạp"
      ],
      [
       "Sai chuẩn",
       "Không theo quy ước đặt tên"
      ],
      [
       "Đặc tả giao diện",
       "Số lượng, kiểu, thứ tự tham số không khớp"
      ],
      [
       "Một số lỗ hổng bảo mật",
       "Tràn bộ đệm (buffer overflow)"
      ],
      [
       "Bao phủ cơ sở kiểm thử",
       "Thiếu test cho một tiêu chí chấp nhận"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Kiểm thử tĩnh KHÔNG đo được hiệu suất hay thời gian phản hồi.",
      "Kiểm thử tĩnh và động bổ trợ nhau, không thay thế nhau."
     ]
    }
   ],
   "summary": [
    "Tĩnh tìm thẳng khiếm khuyết, áp dụng cả sản phẩm không chạy được, đo đặc tính không phụ thuộc thực thi. Động gây sự cố, đo được hiệu suất.",
    "Lỗi hợp với kiểm thử tĩnh: yêu cầu, thiết kế, một số lỗi code, sai chuẩn, đặc tả giao diện, buffer overflow, thiếu bao phủ."
   ],
   "terms": []
  },
  {
   "id": "3.2.1",
   "title": "Lợi ích của phản hồi sớm và thường xuyên",
   "en": "Benefits of Early and Frequent Stakeholder Feedback",
   "los": [
    "FL-3.2.1"
   ],
   "minutes": 8,
   "example": "Team làm dashboard báo cáo cho khách hàng 3 tháng mà không cho khách xem. Ngày demo, khách nói số liệu cần theo tuần chứ không theo tháng. Làm lại mất 3 tuần, trễ hạn, hai bên đổ lỗi cho nhau. Dự án sau, team demo mỗi 2 tuần và cho khách góp ý ngay trên bản nháp thiết kế.",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Truyền đạt sớm các vấn đề chất lượng tiềm ẩn.",
      "Nếu bên liên quan ít tham gia, sản phẩm có thể lệch khỏi tầm nhìn của họ → làm lại tốn kém, trễ hạn, đổ lỗi, thậm chí dự án thất bại.",
      "Phản hồi thường xuyên ngăn hiểu lầm về yêu cầu, và thay đổi yêu cầu được hiểu và làm sớm hơn.",
      "Đội hiểu rõ hơn mình đang làm gì, tập trung vào tính năng giá trị nhất và có tác động tích cực nhất tới rủi ro."
     ]
    }
   ],
   "summary": [
    "Phản hồi sớm và thường xuyên: phát hiện vấn đề sớm, tránh hiểu lầm yêu cầu, tránh làm lại, tập trung vào giá trị.",
    "Bên liên quan ít tham gia → sản phẩm lệch tầm nhìn, làm lại tốn kém, trễ hạn, đổ lỗi, có khi dự án thất bại."
   ],
   "terms": []
  },
  {
   "id": "3.2.2",
   "title": "Quy trình rà soát",
   "en": "Review Process Activities",
   "los": [
    "FL-3.2.2"
   ],
   "minutes": 17,
   "example": "Đặc tả thanh toán dài 60 trang. Trưởng nhóm lên kế hoạch rà soát 3 đợt, mỗi đợt 20 trang, tập trung vào tính đúng và khả năng kiểm thử (lập kế hoạch); gửi tài liệu và checklist cho 4 người (khởi động); mỗi người tự đọc và ghi bất thường (rà soát cá nhân); cả nhóm họp để phân loại bất thường (trao đổi và phân tích); BA sửa và nhóm báo cáo kết quả (sửa và báo cáo).",
   "blocks": [
    {
     "t": "p",
     "v": "ISO/IEC 20246 đưa ra một quy trình chung, có cấu trúc nhưng linh hoạt. Rà soát càng chính thức thì càng làm nhiều công việc trong mỗi bước. Sản phẩm lớn có thể cần rà soát **nhiều lần**."
    },
    {
     "t": "steps",
     "v": [
      [
       "Lập kế hoạch (planning)",
       "Xác định phạm vi: mục đích, sản phẩm cần rà soát, đặc tính chất lượng cần đánh giá, mảng tập trung, tiêu chí đầu ra, thông tin hỗ trợ như tiêu chuẩn, công sức và khung thời gian"
      ],
      [
       "Khởi động rà soát (review initiation)",
       "Đảm bảo mọi người và mọi thứ sẵn sàng: ai cũng tiếp cận được sản phẩm, hiểu vai trò và có đủ thứ cần thiết"
      ],
      [
       "Rà soát cá nhân (individual review)",
       "Mỗi người rà soát tự đánh giá, dùng kỹ thuật như dựa trên checklist hay kịch bản, ghi lại bất thường, khuyến nghị, câu hỏi"
      ],
      [
       "Trao đổi và phân tích (communication and analysis)",
       "Bất thường chưa chắc là khiếm khuyết nên cần phân tích, thảo luận; quyết định trạng thái, người phụ trách, hành động; thường trong cuộc họp rà soát, quyết định mức chất lượng và bước tiếp theo"
      ],
      [
       "Sửa và báo cáo (fixing and reporting)",
       "Tạo báo cáo khiếm khuyết để theo dõi việc sửa; đạt tiêu chí đầu ra thì chấp nhận sản phẩm; báo cáo kết quả rà soát"
      ]
     ]
    },
    {
     "t": "tip",
     "v": "Mẹo nhớ 5 bước: “Kế – Khởi – Cá – Bàn – Sửa” (Kế hoạch, Khởi động, Cá nhân, Bàn bạc, Sửa và báo cáo)."
    },
    {
     "t": "trap",
     "v": [
      "Các kỹ thuật rà soát (checklist, kịch bản) được dùng ở bước RÀ SOÁT CÁ NHÂN.",
      "Tiêu chí đầu ra được xác định ở bước LẬP KẾ HOẠCH.",
      "Bất thường ≠ khiếm khuyết: phải qua bước trao đổi và phân tích."
     ]
    }
   ],
   "summary": [
    "Quy trình rà soát ISO/IEC 20246: Lập kế hoạch → Khởi động → Rà soát cá nhân → Trao đổi và phân tích → Sửa và báo cáo.",
    "Lập kế hoạch đặt phạm vi và tiêu chí đầu ra; rà soát cá nhân dùng kỹ thuật như checklist, kịch bản.",
    "Bất thường chưa chắc là khiếm khuyết; quyết định trạng thái, người phụ trách, hành động ở bước trao đổi và phân tích.",
    "Sản phẩm lớn có thể cần rà soát nhiều lần."
   ],
   "terms": [
    [
     "review process",
     "quy trình rà soát"
    ],
    [
     "individual review",
     "rà soát cá nhân"
    ],
    [
     "anomaly",
     "bất thường"
    ],
    [
     "checklist-based reviewing",
     "rà soát dựa trên checklist"
    ]
   ]
  },
  {
   "id": "3.2.3",
   "title": "Vai trò và trách nhiệm trong rà soát",
   "en": "Roles and Responsibilities in Reviews",
   "los": [
    "FL-3.2.3"
   ],
   "minutes": 10,
   "example": "Buổi thanh tra module thanh toán: quản lý dự án quyết định rà soát module này và dành 2 ngày cho nó (manager); chị trưởng nhóm rà soát chọn người và đặt phòng (review leader); anh lead điều phối buổi họp (moderator); một bạn tester ghi chép (scribe); 3 senior dev rà soát (reviewer); dev viết code sẽ sửa sau buổi họp (author).",
   "blocks": [
    {
     "t": "table",
     "head": [
      "Vai trò",
      "Trách nhiệm"
     ],
     "rows": [
      [
       "Quản lý (manager)",
       "Quyết định rà soát cái gì; cấp nguồn lực như người và thời gian"
      ],
      [
       "Tác giả (author)",
       "Tạo ra và sửa sản phẩm được rà soát"
      ],
      [
       "Người điều phối (moderator, facilitator)",
       "Giúp cuộc họp hiệu quả: hòa giải, quản lý thời gian, tạo môi trường an toàn để ai cũng dám nói"
      ],
      [
       "Thư ký (scribe, recorder)",
       "Tổng hợp bất thường, ghi lại thông tin như quyết định, bất thường mới"
      ],
      [
       "Người rà soát (reviewer)",
       "Thực hiện rà soát; có thể là người trong dự án, chuyên gia lĩnh vực, hay bên liên quan khác"
      ],
      [
       "Trưởng nhóm rà soát (review leader)",
       "Chịu trách nhiệm chung: quyết định ai tham gia, tổ chức thời gian và địa điểm"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Quyết định rà soát cái gì và cấp nguồn lực là việc của MANAGER, không phải review leader."
     ]
    }
   ],
   "summary": [
    "6 vai trò: manager (rà soát gì, nguồn lực), author (tạo và sửa), moderator (điều phối họp), scribe (ghi chép), reviewer (rà soát), review leader (chịu trách nhiệm chung).",
    "Quyết định rà soát gì và cấp nguồn lực là việc của manager; chịu trách nhiệm chung là review leader."
   ],
   "terms": [
    [
     "moderator",
     "người điều phối"
    ],
    [
     "scribe",
     "thư ký"
    ],
    [
     "review leader",
     "trưởng nhóm rà soát"
    ]
   ]
  },
  {
   "id": "3.2.4",
   "title": "Các loại rà soát",
   "en": "Review Types",
   "los": [
    "FL-3.2.4"
   ],
   "minutes": 12,
   "example": "Ba buổi rà soát trong một tuần: thứ Hai, chị BA tự trình bày đặc tả mới cho hai bạn tester mới vào để họ nắm nghiệp vụ (walkthrough). Thứ Tư, kiến trúc sư điều phối, các senior dev bàn chọn cơ sở dữ liệu nào và chốt quyết định (rà soát kỹ thuật). Thứ Sáu, module thanh toán được thanh tra chính thức: có người điều phối, thư ký, checklist, tiêu chí đầu ra và số liệu lỗi được thu thập; tác giả không được làm thư ký (thanh tra).",
   "blocks": [
    {
     "t": "p",
     "v": "Mức chính thức phụ thuộc vào: SDLC, mức trưởng thành của quy trình, độ quan trọng và độ phức tạp của sản phẩm, yêu cầu pháp lý, nhu cầu lưu vết kiểm toán. Cùng một sản phẩm có thể qua nhiều loại rà soát. Chọn loại dựa trên mục tiêu, nhu cầu dự án, nguồn lực, loại sản phẩm và rủi ro, lĩnh vực, văn hóa công ty."
    },
    {
     "t": "table",
     "head": [
      "Loại",
      "Ai dẫn",
      "Mục tiêu chính",
      "Đặc điểm nhận diện"
     ],
     "rows": [
      [
       "Không chính thức (informal)",
       "Không quy định",
       "Phát hiện bất thường",
       "Không theo quy trình xác định, không cần tài liệu đầu ra chính thức"
      ],
      [
       "Duyệt qua (walkthrough)",
       "TÁC GIẢ",
       "Đánh giá chất lượng, đào tạo người rà soát, đồng thuận, ý tưởng mới, giúp tác giả, phát hiện bất thường",
       "Rà soát cá nhân trước buổi là không bắt buộc"
      ],
      [
       "Rà soát kỹ thuật (technical review)",
       "MODERATOR",
       "Đạt đồng thuận và ra quyết định về vấn đề kỹ thuật; cũng phát hiện bất thường, ý tưởng mới",
       "Người rà soát có chuyên môn kỹ thuật"
      ],
      [
       "Thanh tra (inspection)",
       "Review leader (không phải tác giả)",
       "Tìm TỐI ĐA bất thường; đánh giá chất lượng, tạo niềm tin, giúp tác giả",
       "Chính thức nhất, theo đủ quy trình chung, thu thập metrics để cải tiến; tác giả KHÔNG làm leader hay thư ký"
      ]
     ]
    },
    {
     "t": "trap",
     "v": [
      "Walkthrough do TÁC GIẢ dẫn; technical review do MODERATOR dẫn.",
      "Inspection: tác giả không được làm review leader hay thư ký."
     ]
    }
   ],
   "summary": [
    "Không chính thức: không quy trình, tìm bất thường.",
    "Walkthrough: tác giả dẫn; đào tạo, đồng thuận, ý tưởng.",
    "Technical review: moderator dẫn, chuyên gia kỹ thuật, ra quyết định kỹ thuật.",
    "Inspection: chính thức nhất, tìm tối đa bất thường, có metrics; tác giả không làm leader hay thư ký."
   ],
   "terms": [
    [
     "walkthrough",
     "duyệt qua"
    ],
    [
     "technical review",
     "rà soát kỹ thuật"
    ],
    [
     "inspection",
     "thanh tra"
    ],
    [
     "informal review",
     "rà soát không chính thức"
    ]
   ]
  },
  {
   "id": "3.2.5",
   "title": "Yếu tố thành công của rà soát",
   "en": "Success Factors for Reviews",
   "los": [
    "FL-3.2.5"
   ],
   "minutes": 8,
   "example": "Lần đầu, team rà soát cả đặc tả 80 trang trong một buổi 3 tiếng, không checklist, và sếp dùng số lỗi tìm được để đánh giá từng người: buổi họp căng thẳng, ít ai dám nêu vấn đề. Lần sau, team chia thành 4 buổi ngắn, có mục tiêu rõ, có người điều phối, và kết quả chỉ dùng để cải thiện tài liệu.",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Mục tiêu rõ ràng, tiêu chí đầu ra đo được. **Không bao giờ** lấy việc đánh giá người tham gia làm mục tiêu.",
      "Chọn đúng loại rà soát theo mục tiêu, loại sản phẩm, người tham gia, nhu cầu và bối cảnh dự án.",
      "Rà soát theo **từng phần nhỏ** để người rà soát không mất tập trung.",
      "Phản hồi kết quả cho bên liên quan và tác giả để họ cải thiện.",
      "Đủ thời gian chuẩn bị.",
      "Ban quản lý ủng hộ.",
      "Đưa rà soát vào văn hóa tổ chức để thúc đẩy học hỏi và cải tiến.",
      "Đào tạo đầy đủ cho người tham gia.",
      "Điều phối cuộc họp tốt."
     ]
    },
    {
     "t": "trap",
     "v": [
      "Dùng kết quả rà soát để đánh giá hiệu suất người tham gia làm rà soát thất bại."
     ]
    }
   ],
   "summary": [
    "Thành công: mục tiêu rõ, không đánh giá người, đúng loại, chia nhỏ, đủ thời gian, quản lý ủng hộ, văn hóa, đào tạo, điều phối tốt.",
    "Rà soát theo từng phần nhỏ để người rà soát không mất tập trung."
   ],
   "terms": []
  }
 ]
});
