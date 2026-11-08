/* The QA Lab – bài học chi tiết CTFL v4.0.1 (chương 1). Mỗi mục ứng với một mục tiêu học tập (LO) trong syllabus. */
window.QALAB.certs.ctfl.lessons = window.QALAB.certs.ctfl.lessons || {};
window.QALAB.certs.ctfl.lessonGroups = {
 "1.1": "Kiểm thử là gì?",
 "1.2": "Vì sao kiểm thử là cần thiết?",
 "1.3": "Bảy nguyên tắc kiểm thử",
 "1.4": "Hoạt động, testware và vai trò",
 "1.5": "Kỹ năng thiết yếu và thực hành tốt",
 "2.1": "Kiểm thử trong SDLC",
 "2.2": "Cấp độ và loại kiểm thử",
 "2.3": "Kiểm thử bảo trì",
 "3.1": "Cơ bản về kiểm thử tĩnh",
 "3.2": "Phản hồi và quy trình rà soát",
 "4.1": "Tổng quan kỹ thuật kiểm thử",
 "4.2": "Kỹ thuật hộp đen",
 "4.3": "Kỹ thuật hộp trắng",
 "4.4": "Kỹ thuật dựa trên kinh nghiệm",
 "4.5": "Cách tiếp cận dựa trên cộng tác",
 "5.1": "Lập kế hoạch kiểm thử",
 "5.2": "Quản lý rủi ro",
 "5.3": "Giám sát, kiểm soát, hoàn tất",
 "5.4": "Quản lý cấu hình",
 "5.5": "Quản lý khiếm khuyết",
 "6.1": "Công cụ hỗ trợ kiểm thử",
 "6.2": "Lợi ích và rủi ro của tự động hóa"
};
window.QALAB.certs.ctfl.lessonMigrate = {"6":"6.1.1","1.1":"1.1.1","1.2":"1.2.1","1.3":"1.3.1","1.4":"1.4.1","1.5":"1.5.1","2.1.1":"2.1.1","2.1.3":"2.1.3","2.1.5":"2.1.5","2.2.1":"2.2.1","2.2.3":"2.2.3","2.3":"2.3.1","3.1":"3.1.1","3.2.1":"3.2.1","3.2.3":"3.2.3","4.1":"4.1.1","4.2.1":"4.2.1","4.2.2":"4.2.2","4.2.3":"4.2.3","4.2.4":"4.2.4","4.3":"4.3.1","4.4":"4.4.1","4.5":"4.5.1","5.1.1":"5.1.1","5.1.3":"5.1.3","5.1.5":"5.1.5","5.2":"5.2.1","5.3":"5.3.1","5.4":"5.4.1"};
Object.assign(window.QALAB.certs.ctfl.lessons, {
 "1": [
  {
   "id": "1.1.1",
   "title": "Kiểm thử là gì và mục tiêu kiểm thử",
   "en": "What is Testing? · Test Objectives",
   "los": [
    "FL-1.1.1"
   ],
   "minutes": 15,
   "example": "Một app đặt vé xem phim vừa ra bản mới. Tester không chỉ bấm thử nút “Đặt vé”. Trước đó họ đã đọc user story và phát hiện yêu cầu không nói rõ chuyện hoàn tiền khi suất chiếu bị hủy (kiểm thử tĩnh). Khi có bản build, họ chạy thử và thấy ghế đã bán vẫn hiện trống (kiểm thử động). Dev mở log, tìm ra đoạn code cập nhật trạng thái ghế bị sai và sửa (gỡ lỗi). Tester chạy lại đúng kịch bản đó để xác nhận đã hết lỗi, rồi chạy thêm các luồng thanh toán để chắc không có gì khác bị hỏng.",
   "blocks": [
    {
     "t": "h",
     "v": "Định nghĩa"
    },
    {
     "t": "p",
     "v": "Kiểm thử phần mềm là **tập hợp các hoạt động** nhằm phát hiện khiếm khuyết và đánh giá chất lượng của các sản phẩm công việc phần mềm. Thứ đang được kiểm thử gọi là **đối tượng kiểm thử (test object)**: có thể là code, nhưng cũng có thể là tài liệu yêu cầu, thiết kế hay một kế hoạch kiểm thử."
    },
    {
     "t": "h",
     "v": "Hai hiểu lầm đề thi hay gài"
    },
    {
     "t": "list",
     "v": [
      "**Hiểu lầm 1: kiểm thử chỉ là chạy test.** Thực tế, thực thi kiểm thử chỉ là một hoạt động. Kiểm thử còn gồm lập kế hoạch, phân tích, thiết kế, triển khai, giám sát, điều khiển và hoàn tất, và phải gắn với vòng đời phát triển (SDLC).",
      "**Hiểu lầm 2: kiểm thử chỉ là kiểm tra đúng đặc tả.** Kiểm thử gồm cả thẩm tra (verification) lẫn thẩm định (validation)."
     ]
    },
    {
     "t": "compare",
     "l": {
      "h": "Verification · Thẩm tra",
      "q": "Làm đúng theo đặc tả chưa?",
      "v": [
       "So với yêu cầu đã viết ra",
       "Ví dụ: form có đủ 5 trường như tài liệu mô tả"
      ]
     },
     "r": {
      "h": "Validation · Thẩm định",
      "q": "Làm ra đúng thứ người dùng cần chưa?",
      "v": [
       "So với nhu cầu thật trong môi trường vận hành",
       "Ví dụ: người dùng có đặt được vé trong 3 bước như họ mong muốn"
      ]
     }
    },
    {
     "t": "h",
     "v": "Kiểm thử tĩnh và kiểm thử động"
    },
    {
     "t": "table",
     "head": [
      "",
      "Kiểm thử tĩnh",
      "Kiểm thử động"
     ],
     "rows": [
      [
       "Có chạy phần mềm không?",
       "Không",
       "Có"
      ],
      [
       "Gồm những gì?",
       "Rà soát (review) và phân tích tĩnh",
       "Các kỹ thuật kiểm thử để tạo ca kiểm thử rồi chạy"
      ],
      [
       "Học ở đâu?",
       "Chương 3",
       "Chương 4"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Kiểm thử không chỉ là việc kỹ thuật: nó cần được lập kế hoạch, quản lý, ước lượng, giám sát và điều khiển (chương 5). Công cụ hỗ trợ được nhiều (chương 6), nhưng kiểm thử về bản chất là **hoạt động trí tuệ**, cần kiến thức chuyên môn, tư duy phân tích, tư duy phản biện và tư duy hệ thống."
    },
    {
     "t": "h",
     "v": "9 mục tiêu kiểm thử điển hình"
    },
    {
     "t": "table",
     "head": [
      "Mục tiêu",
      "Hiểu nhanh"
     ],
     "rows": [
      [
       "Đánh giá sản phẩm công việc",
       "Yêu cầu, user story, thiết kế, code đều được đánh giá"
      ],
      [
       "Gây ra sự cố và tìm khiếm khuyết",
       "Mục tiêu quen thuộc nhất"
      ],
      [
       "Đảm bảo độ bao phủ cần thiết",
       "Đủ phần cần kiểm thử của đối tượng"
      ],
      [
       "Giảm mức rủi ro do chất lượng kém",
       "Tìm lỗi trước khi người dùng gặp"
      ],
      [
       "Thẩm tra yêu cầu đã đặc tả được đáp ứng",
       "Verification"
      ],
      [
       "Thẩm tra tuân thủ hợp đồng, pháp luật, quy định",
       "Ví dụ chuẩn bảo mật thẻ, luật bảo vệ dữ liệu"
      ],
      [
       "Cung cấp thông tin để bên liên quan ra quyết định",
       "Ví dụ có nên phát hành không"
      ],
      [
       "Tạo niềm tin vào chất lượng",
       "Bằng chứng từ kết quả kiểm thử"
      ],
      [
       "Thẩm định đối tượng hoàn chỉnh và chạy như bên liên quan mong đợi",
       "Validation"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Mục tiêu thay đổi theo **bối cảnh**: sản phẩm công việc đang kiểm thử, cấp độ kiểm thử, rủi ro, SDLC đang dùng, và các yếu tố kinh doanh như cơ cấu công ty, đối thủ, thời gian ra thị trường."
    },
    {
     "t": "trap",
     "v": [
      "Phương án “kiểm thử chứng minh phần mềm không còn lỗi” luôn sai."
     ]
    }
   ],
   "summary": [
    "Kiểm thử = tập hợp hoạt động để tìm khiếm khuyết và đánh giá chất lượng sản phẩm công việc, không chỉ là chạy test.",
    "Gồm cả thẩm tra (đúng đặc tả) và thẩm định (đúng nhu cầu người dùng).",
    "Kiểm thử tĩnh không chạy phần mềm (review, phân tích tĩnh); kiểm thử động có chạy.",
    "9 mục tiêu điển hình, thay đổi theo bối cảnh: sản phẩm, cấp độ, rủi ro, SDLC, yếu tố kinh doanh."
   ],
   "terms": [
    [
     "test object",
     "đối tượng kiểm thử"
    ],
    [
     "verification",
     "thẩm tra"
    ],
    [
     "validation",
     "thẩm định"
    ],
    [
     "static testing",
     "kiểm thử tĩnh"
    ],
    [
     "dynamic testing",
     "kiểm thử động"
    ],
    [
     "test objective",
     "mục tiêu kiểm thử"
    ]
   ]
  },
  {
   "id": "1.1.2",
   "title": "Kiểm thử và gỡ lỗi",
   "en": "Testing and Debugging",
   "los": [
    "FL-1.1.2"
   ],
   "minutes": 15,
   "example": "Tester báo: bấm “Thanh toán” với giỏ hàng có mã giảm giá thì app báo lỗi 500. Dev dựng lại đúng tình huống (tái hiện), đọc log thấy mã giảm giá hết hạn trả về null (chẩn đoán), thêm bước kiểm tra null (sửa). Tester chạy lại đúng ca đó (kiểm thử xác nhận) rồi chạy bộ hồi quy của luồng thanh toán (kiểm thử hồi quy). Chỉ các bước của tester là kiểm thử; ba bước ở giữa là gỡ lỗi.",
   "blocks": [
    {
     "t": "steps",
     "v": [
      [
       "Kiểm thử động",
       "Gây ra sự cố (failure) do khiếm khuyết trong phần mềm"
      ],
      [
       "Gỡ lỗi: tái hiện",
       "Làm cho sự cố xảy ra lại"
      ],
      [
       "Gỡ lỗi: chẩn đoán",
       "Tìm ra khiếm khuyết gây sự cố"
      ],
      [
       "Gỡ lỗi: sửa",
       "Loại bỏ khiếm khuyết"
      ],
      [
       "Kiểm thử xác nhận",
       "Kiểm tra bản sửa đã giải quyết vấn đề, tốt nhất do người test ban đầu làm"
      ],
      [
       "Kiểm thử hồi quy",
       "Kiểm tra bản sửa không làm hỏng phần khác"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Với **kiểm thử tĩnh**, khiếm khuyết được tìm thấy trực tiếp và không có sự cố nào xảy ra, nên gỡ lỗi chỉ đơn giản là **loại bỏ khiếm khuyết**, không cần tái hiện hay chẩn đoán."
    },
    {
     "t": "trap",
     "v": [
      "Gỡ lỗi KHÔNG phải là hoạt động kiểm thử.",
      "Kiểm thử tĩnh không gây ra sự cố, chỉ tìm khiếm khuyết."
     ]
    }
   ],
   "summary": [
    "Kiểm thử kích hoạt sự cố hoặc tìm khiếm khuyết; gỡ lỗi (tái hiện → chẩn đoán → sửa) là hoạt động khác, không phải kiểm thử.",
    "Sau khi sửa: kiểm thử xác nhận rồi kiểm thử hồi quy.",
    "Với kiểm thử tĩnh, khiếm khuyết được tìm thấy trực tiếp nên gỡ lỗi chỉ là loại bỏ khiếm khuyết."
   ],
   "terms": [
    [
     "debugging",
     "gỡ lỗi"
    ],
    [
     "confirmation testing",
     "kiểm thử xác nhận"
    ],
    [
     "regression testing",
     "kiểm thử hồi quy"
    ]
   ]
  },
  {
   "id": "1.2.1",
   "title": "Kiểm thử đóng góp vào thành công",
   "en": "Testing's Contributions to Success",
   "los": [
    "FL-1.2.1"
   ],
   "minutes": 10,
   "example": "Bệnh viện sắp triển khai phần mềm đặt lịch khám. Tester tìm ra lỗi trùng lịch trước ngày ra mắt (phát hiện lỗi hiệu quả về chi phí), báo tỷ lệ ca đạt để ban giám đốc quyết định có ra mắt không (đánh giá chất lượng trực tiếp), và thử thao tác như một bệnh nhân lớn tuổi lần đầu dùng app (đại diện cho người dùng). Phần mềm còn phải qua kiểm thử bắt buộc về bảo vệ dữ liệu bệnh nhân (đáp ứng quy định).",
   "blocks": [
    {
     "t": "p",
     "v": "Kiểm thử là một hình thức **kiểm soát chất lượng (quality control)**, giúp đạt mục tiêu trong phạm vi, thời gian, chất lượng và ngân sách đã thống nhất. Không chỉ đội test: bất kỳ bên liên quan nào cũng có thể dùng kỹ năng kiểm thử để đưa dự án tới thành công."
    },
    {
     "t": "table",
     "head": [
      "Đóng góp",
      "Giải thích"
     ],
     "rows": [
      [
       "Phát hiện khiếm khuyết hiệu quả về chi phí",
       "Lỗi được loại bỏ sau đó bằng gỡ lỗi, nên kiểm thử góp phần GIÁN TIẾP nâng chất lượng"
      ],
      [
       "Đánh giá TRỰC TIẾP chất lượng",
       "Ở nhiều giai đoạn của SDLC; kết quả dùng cho quyết định như có phát hành không"
      ],
      [
       "Đại diện GIÁN TIẾP cho người dùng",
       "Tester mang hiểu biết về nhu cầu người dùng vào dự án, vì đưa người dùng thật vào thường quá tốn kém"
      ],
      [
       "Đáp ứng hợp đồng, pháp luật, quy định",
       "Có những ngành bắt buộc phải kiểm thử"
      ]
     ]
    }
   ],
   "summary": [
    "Kiểm thử là hình thức kiểm soát chất lượng; mọi bên liên quan đều có thể đóng góp kỹ năng kiểm thử.",
    "Đóng góp: tìm lỗi hiệu quả về chi phí (nâng chất lượng gián tiếp), đánh giá chất lượng trực tiếp, đại diện gián tiếp cho người dùng, đáp ứng hợp đồng và luật."
   ],
   "terms": [
    [
     "quality control",
     "kiểm soát chất lượng"
    ]
   ]
  },
  {
   "id": "1.2.2",
   "title": "Kiểm thử và đảm bảo chất lượng (QA)",
   "en": "Testing and Quality Assurance (QA)",
   "los": [
    "FL-1.2.2"
   ],
   "minutes": 10,
   "example": "Sau ba lần phát hành liền bị lỗi thanh toán, đội test viết thêm ca kiểm thử cho luồng thanh toán: đó là kiểm thử, hướng sản phẩm, mang tính khắc phục. Trưởng nhóm QA thì đổi quy trình: bắt buộc code review và checklist trước khi merge, rồi đo xem số lỗi lọt ra có giảm không: đó là QA, hướng quy trình, mang tính phòng ngừa.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Testing · Kiểm thử",
      "q": "Hướng sản phẩm, mang tính khắc phục",
      "v": [
       "Là hình thức chính của kiểm soát chất lượng (QC)",
       "Tìm và giúp sửa khiếm khuyết trong sản phẩm",
       "Dùng kết quả kiểm thử để sửa lỗi"
      ]
     },
     "r": {
      "h": "Quality Assurance · QA",
      "q": "Hướng quy trình, mang tính phòng ngừa",
      "v": [
       "Tiền đề: quy trình tốt, làm đúng → sản phẩm tốt",
       "Áp dụng cho cả quy trình phát triển và kiểm thử",
       "Là trách nhiệm của MỌI NGƯỜI trong dự án",
       "Dùng kết quả kiểm thử làm phản hồi về hiệu quả quy trình"
      ]
     }
    },
    {
     "t": "p",
     "v": "Ngoài kiểm thử, kiểm soát chất lượng còn gồm phương pháp hình thức (kiểm tra mô hình, chứng minh tính đúng đắn), mô phỏng và làm mẫu thử."
    },
    {
     "t": "trap",
     "v": [
      "QA là trách nhiệm của mọi người, không riêng đội test.",
      "Kiểm thử ≠ QA, dù ngoài đời hay dùng lẫn."
     ]
    }
   ],
   "summary": [
    "Kiểm thử: hướng sản phẩm, khắc phục. QA: hướng quy trình, phòng ngừa, trách nhiệm của mọi người.",
    "Ngoài kiểm thử, kiểm soát chất lượng còn gồm phương pháp hình thức, mô phỏng và làm mẫu thử.",
    "Kiểm thử dùng kết quả để sửa lỗi; QA dùng kết quả kiểm thử làm phản hồi về hiệu quả của quy trình."
   ],
   "terms": [
    [
     "quality assurance",
     "đảm bảo chất lượng"
    ]
   ]
  },
  {
   "id": "1.2.3",
   "title": "Sai sót, khiếm khuyết, sự cố và nguyên nhân gốc rễ",
   "en": "Errors, Defects, Failures, and Root Causes",
   "los": [
    "FL-1.2.3"
   ],
   "minutes": 15,
   "example": "Một ví điện tử cho rút tiền vượt số dư. Truy ngược lại: dev bị ép deadline nên không có code review (nguyên nhân gốc rễ), gõ nhầm “>=” thay vì “>” (sai sót), dòng điều kiện sai nằm trong code (khiếm khuyết), và khách rút được nhiều hơn số tiền đang có (sự cố). Nếu tester bắt được trước khi phát hành, công ty tránh mất tiền và mất uy tín. Sau sự cố, nhóm thêm bước review bắt buộc: đó là cải tiến quy trình, phần việc của QA.",
   "blocks": [
    {
     "t": "steps",
     "v": [
      [
       "Root cause · Nguyên nhân gốc rễ",
       "Lý do cơ bản dẫn tới vấn đề, ví dụ áp lực thời gian, thiếu đào tạo"
      ],
      [
       "Error · Sai sót (mistake)",
       "Con người làm sai"
      ],
      [
       "Defect · Khiếm khuyết (fault, bug)",
       "Cái sai nằm lại trong sản phẩm: tài liệu, code, file build"
      ],
      [
       "Failure · Sự cố",
       "Khi chạy, hệ thống không làm điều cần làm hoặc làm điều không nên làm"
      ]
     ]
    },
    {
     "t": "list",
     "v": [
      "Con người mắc sai sót vì áp lực thời gian, độ phức tạp của sản phẩm, quy trình, hạ tầng hay tương tác, hoặc đơn giản là mệt và thiếu đào tạo.",
      "Khiếm khuyết ở giai đoạn sớm (ví dụ trong yêu cầu) nếu không được phát hiện sẽ sinh ra sản phẩm lỗi ở các giai đoạn sau.",
      "Có khiếm khuyết luôn gây sự cố, có cái chỉ gây sự cố trong điều kiện đặc biệt, có cái không bao giờ gây sự cố.",
      "Sự cố còn có thể do **điều kiện môi trường**, ví dụ bức xạ hay từ trường gây khiếm khuyết trong firmware.",
      "Tìm ra nguyên nhân gốc rễ (phân tích nguyên nhân gốc rễ) giúp ngăn các lỗi tương tự về sau."
     ]
    },
    {
     "t": "trap",
     "v": [
      "Tài liệu đặc tả viết sai cũng là khiếm khuyết (defect), không chỉ code."
     ]
    }
   ],
   "summary": [
    "Nguyên nhân gốc rễ → sai sót (con người) → khiếm khuyết (trong sản phẩm) → sự cố (khi chạy).",
    "Không phải khiếm khuyết nào cũng gây sự cố; sự cố cũng có thể do môi trường.",
    "Phân tích nguyên nhân gốc rễ giúp giảm các khiếm khuyết tương tự về sau."
   ],
   "terms": [
    [
     "error",
     "sai sót"
    ],
    [
     "defect",
     "khiếm khuyết"
    ],
    [
     "failure",
     "sự cố"
    ],
    [
     "root cause",
     "nguyên nhân gốc rễ"
    ]
   ]
  },
  {
   "id": "1.3.1",
   "title": "Bảy nguyên tắc kiểm thử",
   "en": "Testing Principles",
   "los": [
    "FL-1.3.1"
   ],
   "minutes": 30,
   "example": "Một team e-commerce chạy cùng bộ 300 test hồi quy suốt một năm và gần như không ra lỗi mới, trong khi khách vẫn phàn nàn về trang thanh toán. Thống kê lỗi production cho thấy phần lớn nằm ở module thanh toán và tìm kiếm. Team viết thêm test mới cho hai module đó, rà soát lại user story của luồng thanh toán ngay từ khi còn là bản nháp, và hỏi khách xem họ thật sự gặp khó ở đâu. Cách xử lý đó chạm tới ít nhất 4 trong 7 nguyên tắc dưới đây.",
   "blocks": [
    {
     "t": "principles",
     "v": [
      [
       "1",
       "Kiểm thử cho thấy có khiếm khuyết, không chứng minh được là không có",
       "Kiểm thử làm giảm xác suất còn lỗi chưa phát hiện, nhưng dù không tìm thấy lỗi nào cũng không chứng minh được phần mềm đúng.",
       "Sếp hỏi: “Test pass hết rồi, đảm bảo không còn bug nhé?” → không thể đảm bảo."
      ],
      [
       "2",
       "Kiểm thử toàn bộ là bất khả thi",
       "Trừ trường hợp rất đơn giản, không thể test mọi tổ hợp. Hãy dùng kỹ thuật kiểm thử, ưu tiên hóa ca kiểm thử và kiểm thử dựa trên rủi ro để tập trung công sức.",
       "Ô nhập số nguyên 32-bit có hơn 4 tỷ giá trị: dùng phân vùng và giá trị biên thay vì thử hết."
      ],
      [
       "3",
       "Kiểm thử sớm tiết kiệm thời gian và tiền bạc",
       "Lỗi loại bỏ sớm không sinh thêm lỗi ở sản phẩm phái sinh, nên ít sự cố về sau và chi phí chất lượng giảm. Cả kiểm thử tĩnh và động nên bắt đầu càng sớm càng tốt.",
       "Sửa một câu yêu cầu mơ hồ mất 10 phút; sửa sau khi đã code và phát hành có thể mất vài ngày."
      ],
      [
       "4",
       "Khiếm khuyết tập trung thành cụm",
       "Một số ít thành phần thường chứa phần lớn lỗi hoặc gây phần lớn sự cố khi vận hành (minh họa nguyên lý Pareto). Các cụm này là đầu vào quan trọng của kiểm thử dựa trên rủi ro.",
       "80% lỗi production nằm ở module thanh toán và tìm kiếm."
      ],
      [
       "5",
       "Kiểm thử bị “mòn” (tests wear out)",
       "Lặp lại mãi cùng bộ test sẽ ngày càng ít tìm được lỗi mới. Cần sửa test, đổi dữ liệu và viết test mới. Ngoại lệ: lặp lại có lợi trong kiểm thử hồi quy tự động.",
       "Bộ hồi quy chạy 1 năm không ra lỗi mới dù người dùng vẫn gặp lỗi."
      ],
      [
       "6",
       "Kiểm thử phụ thuộc vào bối cảnh",
       "Không có một cách kiểm thử duy nhất cho mọi trường hợp.",
       "App game di động và phần mềm thiết bị y tế cần cách kiểm thử rất khác nhau."
      ],
      [
       "7",
       "Ngụy biện “không có khiếm khuyết”",
       "Cho rằng thẩm tra đầy đủ sẽ đảm bảo hệ thống thành công là sai. Hệ thống không lỗi vẫn có thể không đáp ứng nhu cầu người dùng, không giúp đạt mục tiêu kinh doanh, và thua đối thủ. Cần thẩm định bên cạnh thẩm tra.",
       "Pass 100% test theo đặc tả, sửa hết lỗi, nhưng người dùng vẫn bỏ app."
      ]
     ]
    },
    {
     "t": "tip",
     "v": "Mẹo nhớ 7 nguyên tắc: “Có – Không – Sớm – Cụm – Mòn – Cảnh – Ảo”: Có lỗi (không chứng minh hết lỗi) · Không test hết · Sớm · Cụm · Mòn · Bối cảnh · Ảo tưởng không lỗi."
    },
    {
     "t": "trap",
     "v": [
      "Đề thường cho một tình huống và hỏi nguyên tắc nào: tìm từ khóa “lặp lại” (mòn), “phần lớn lỗi ở vài module” (cụm), “pass hết mà người dùng vẫn không hài lòng” (ngụy biện).",
      "“Test bị mòn” không có nghĩa là hồi quy tự động vô ích: lặp lại hồi quy tự động vẫn có lợi."
     ]
    }
   ],
   "summary": [
    "1 Kiểm thử cho thấy có lỗi, không chứng minh hết lỗi.",
    "2 Không thể kiểm thử toàn bộ → dùng kỹ thuật, ưu tiên hóa, rủi ro.",
    "3 Kiểm thử sớm tiết kiệm thời gian và tiền.",
    "4 Lỗi tập trung thành cụm (Pareto) → đầu vào cho kiểm thử dựa trên rủi ro.",
    "5 Test bị mòn → sửa test, đổi dữ liệu, viết test mới.",
    "6 Phụ thuộc bối cảnh.",
    "7 Ngụy biện “không có lỗi” → cần thẩm định, không chỉ thẩm tra."
   ],
   "terms": [
    [
     "exhaustive testing",
     "kiểm thử toàn bộ"
    ],
    [
     "defect clustering",
     "khiếm khuyết tập trung thành cụm"
    ],
    [
     "absence-of-defects fallacy",
     "ngụy biện không có khiếm khuyết"
    ],
    [
     "risk-based testing",
     "kiểm thử dựa trên rủi ro"
    ]
   ]
  },
  {
   "id": "1.4.1",
   "title": "Các hoạt động kiểm thử",
   "en": "Test Activities and Tasks",
   "los": [
    "FL-1.4.1"
   ],
   "minutes": 15,
   "example": "Dự án tự động hóa quy trình NOC bằng n8n: test lead lập kế hoạch và sổ rủi ro (lập kế hoạch), mỗi tuần so tiến độ với kế hoạch và đổi ưu tiên khi môi trường staging chậm (giám sát và điều khiển). Tester đọc tài liệu workflow để liệt kê những gì cần test (phân tích), viết ca kiểm thử cho từng nhánh của workflow (thiết kế), chuẩn bị dữ liệu giả và webhook giả lập (triển khai), chạy test và ghi log (thực thi), cuối đợt lập báo cáo và lưu lại bộ test cho lần sau (hoàn tất). Mỗi ca kiểm thử đều gắn với mã yêu cầu nên khi yêu cầu đổi, cả nhóm biết ngay test nào bị ảnh hưởng (truy vết).",
   "blocks": [
    {
     "t": "p",
     "v": "Các hoạt động nhìn có vẻ tuần tự, nhưng thực tế thường được làm **lặp lại hoặc song song** và cần điều chỉnh theo hệ thống, dự án."
    },
    {
     "t": "table",
     "head": [
      "Hoạt động",
      "Làm gì",
      "Câu hỏi trả lời"
     ],
     "rows": [
      [
       "Lập kế hoạch (planning)",
       "Xác định mục tiêu kiểm thử, chọn cách tiếp cận phù hợp ràng buộc",
       "Mục tiêu là gì, làm theo cách nào?"
      ],
      [
       "Giám sát & điều khiển (monitoring & control)",
       "Giám sát: liên tục so tiến độ thực tế với kế hoạch. Điều khiển: hành động để đạt mục tiêu",
       "Đang đi đúng hướng không?"
      ],
      [
       "Phân tích (analysis)",
       "Phân tích cơ sở kiểm thử, xác định tính năng test được, xác định và ưu tiên điều kiện kiểm thử, đánh giá khả năng kiểm thử",
       "Test CÁI GÌ?"
      ],
      [
       "Thiết kế (design)",
       "Biến điều kiện kiểm thử thành ca kiểm thử, xác định hạng mục bao phủ, yêu cầu dữ liệu, thiết kế môi trường",
       "Test NHƯ THẾ NÀO?"
      ],
      [
       "Triển khai (implementation)",
       "Tạo testware để chạy: quy trình thực hiện, bộ test, kịch bản thủ công và tự động, lịch thực thi, dựng và kiểm tra môi trường",
       "Đã sẵn sàng chạy chưa?"
      ],
      [
       "Thực thi (execution)",
       "Chạy test theo lịch, so kết quả thực tế với mong đợi, ghi log, phân tích bất thường, báo cáo lỗi",
       "Kết quả ra sao?"
      ],
      [
       "Hoàn tất (completion)",
       "Tại các mốc dự án: tạo change request cho lỗi chưa xử lý, lưu trữ testware, đóng môi trường, rút bài học, lập báo cáo hoàn tất",
       "Học được gì, giữ lại gì?"
      ]
     ]
    },
    {
     "t": "tip",
     "v": "Câu hỏi K2 hay gặp nhất của mục này: cho mô tả một công việc và hỏi thuộc hoạt động nào. Nhớ cặp: Phân tích = CÁI GÌ, Thiết kế = NHƯ THẾ NÀO, Triển khai = CHUẨN BỊ để chạy."
    },
    {
     "t": "trap",
     "v": [
      "Thiết kế môi trường kiểm thử thuộc THIẾT KẾ; dựng và kiểm tra môi trường thuộc TRIỂN KHAI.",
      "Ưu tiên điều kiện kiểm thử thuộc PHÂN TÍCH; ưu tiên ca kiểm thử thuộc THIẾT KẾ; sắp lịch thực thi thuộc TRIỂN KHAI."
     ]
    }
   ],
   "summary": [
    "7 nhóm hoạt động: lập kế hoạch, giám sát & điều khiển, phân tích (CÁI GÌ), thiết kế (NHƯ THẾ NÀO), triển khai (chuẩn bị chạy), thực thi, hoàn tất. Thường lặp lại hoặc song song.",
    "Phân tích = test CÁI GÌ, thiết kế = test NHƯ THẾ NÀO, triển khai = CHUẨN BỊ để chạy."
   ],
   "terms": [
    [
     "test basis",
     "cơ sở kiểm thử"
    ],
    [
     "test condition",
     "điều kiện kiểm thử"
    ],
    [
     "test case",
     "ca kiểm thử"
    ],
    [
     "test procedure",
     "quy trình thực hiện kiểm thử"
    ],
    [
     "test suite",
     "bộ kiểm thử"
    ]
   ]
  },
  {
   "id": "1.4.2",
   "title": "Kiểm thử trong bối cảnh",
   "en": "Test Process in Context",
   "los": [
    "FL-1.4.2"
   ],
   "minutes": 10,
   "example": "Cùng là app thanh toán, nhưng ở ngân hàng thì có luật, có kiểm toán, có đội test chuyên nghiệp và đủ thời gian; ở startup 5 người thì không có tester riêng, hạn ra mắt 3 tuần, ngân sách nhỏ. Hai nơi sẽ chọn chiến lược, mức tự động hóa và mức chi tiết tài liệu kiểm thử rất khác nhau.",
   "blocks": [
    {
     "t": "p",
     "v": "Kiểm thử không làm riêng lẻ: nó là một phần của quy trình phát triển, do bên liên quan cấp kinh phí và nhằm đáp ứng nhu cầu kinh doanh của họ. Cách kiểm thử phụ thuộc vào:"
    },
    {
     "t": "table",
     "head": [
      "Yếu tố",
      "Ví dụ"
     ],
     "rows": [
      [
       "Bên liên quan",
       "Nhu cầu, kỳ vọng, mức sẵn lòng hợp tác"
      ],
      [
       "Thành viên đội",
       "Kỹ năng, kinh nghiệm, thời gian, nhu cầu đào tạo"
      ],
      [
       "Lĩnh vực kinh doanh",
       "Mức độ quan trọng của sản phẩm, rủi ro, thị trường, luật"
      ],
      [
       "Yếu tố kỹ thuật",
       "Loại phần mềm, kiến trúc, công nghệ"
      ],
      [
       "Ràng buộc dự án",
       "Phạm vi, thời gian, ngân sách, nguồn lực"
      ],
      [
       "Yếu tố tổ chức",
       "Cơ cấu, chính sách, thực hành đang dùng"
      ],
      [
       "SDLC",
       "Thực hành kỹ thuật, phương pháp phát triển"
      ],
      [
       "Công cụ",
       "Có sẵn không, dễ dùng không, có tuân thủ không"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Các yếu tố này ảnh hưởng tới chiến lược kiểm thử, kỹ thuật, mức tự động hóa, mức bao phủ, mức chi tiết của testware và cách báo cáo."
    }
   ],
   "summary": [
    "Cách kiểm thử phụ thuộc 8 yếu tố bối cảnh: bên liên quan, đội, lĩnh vực, kỹ thuật, ràng buộc dự án, tổ chức, SDLC, công cụ.",
    "Các yếu tố này ảnh hưởng tới chiến lược, kỹ thuật, mức tự động hóa, mức bao phủ, mức chi tiết testware và cách báo cáo."
   ],
   "terms": []
  },
  {
   "id": "1.4.3",
   "title": "Sản phẩm kiểm thử (testware)",
   "en": "Testware",
   "los": [
    "FL-1.4.3"
   ],
   "minutes": 10,
   "example": "Sau một đợt test, thư mục dự án có: kế hoạch và sổ rủi ro (lập kế hoạch), danh sách điều kiện kiểm thử (phân tích), ca kiểm thử (thiết kế), script tự động và dữ liệu giả (triển khai), log chạy và báo cáo lỗi (thực thi), báo cáo hoàn tất (hoàn tất). Mỗi thứ là testware của một hoạt động.",
   "blocks": [
    {
     "t": "table",
     "head": [
      "Hoạt động",
      "Testware tạo ra"
     ],
     "rows": [
      [
       "Lập kế hoạch",
       "Kế hoạch kiểm thử, lịch kiểm thử, sổ đăng ký rủi ro, tiêu chí đầu vào và đầu ra"
      ],
      [
       "Giám sát & điều khiển",
       "Báo cáo tiến độ, chỉ thị điều khiển, thông tin rủi ro"
      ],
      [
       "Phân tích",
       "Điều kiện kiểm thử đã ưu tiên (ví dụ tiêu chí chấp nhận), báo cáo lỗi trong cơ sở kiểm thử"
      ],
      [
       "Thiết kế",
       "Ca kiểm thử đã ưu tiên, test charter, hạng mục bao phủ, yêu cầu dữ liệu và môi trường"
      ],
      [
       "Triển khai",
       "Quy trình thực hiện, kịch bản thủ công và tự động, bộ test, dữ liệu, lịch thực thi, thành phần môi trường (stub, driver, simulator, service virtualization)"
      ],
      [
       "Thực thi",
       "Nhật ký kiểm thử (test log), báo cáo khiếm khuyết"
      ],
      [
       "Hoàn tất",
       "Báo cáo hoàn tất, hạng mục hành động cải tiến, bài học kinh nghiệm, change request"
      ]
     ]
    },
    {
     "t": "p",
     "v": "**Sổ đăng ký rủi ro (risk register)** là danh sách rủi ro kèm khả năng xảy ra, tác động và biện pháp giảm thiểu. Quản lý cấu hình đảm bảo testware nhất quán và toàn vẹn."
    },
    {
     "t": "trap",
     "v": [
      "Test log là sản phẩm của THỰC THI, không phải hoàn tất."
     ]
    }
   ],
   "summary": [
    "Mỗi hoạt động tạo testware riêng; test log và báo cáo lỗi thuộc thực thi, báo cáo hoàn tất thuộc hoàn tất.",
    "Sổ đăng ký rủi ro: danh sách rủi ro kèm khả năng, tác động, biện pháp giảm thiểu; quản lý cấu hình giữ testware nhất quán và toàn vẹn."
   ],
   "terms": [
    [
     "testware",
     "sản phẩm kiểm thử"
    ],
    [
     "test charter",
     "định hướng cho một phiên kiểm thử thăm dò"
    ]
   ]
  },
  {
   "id": "1.4.4",
   "title": "Truy vết giữa cơ sở kiểm thử và testware",
   "en": "Traceability between the Test Basis and Testware",
   "los": [
    "FL-1.4.4"
   ],
   "minutes": 8,
   "example": "PO đổi yêu cầu REQ-12 từ “mật khẩu tối thiểu 8 ký tự” thành 10 ký tự. Nhờ bảng truy vết, tester thấy ngay 4 ca kiểm thử gắn với REQ-12 cần sửa, và báo được cho PO: yêu cầu này đã được bao phủ 100%, còn 1 lỗi đang mở.",
   "blocks": [
    {
     "t": "p",
     "v": "Truy vết là liên kết hai chiều giữa phần tử của cơ sở kiểm thử (ví dụ một yêu cầu) với testware (điều kiện, rủi ro, ca kiểm thử), kết quả kiểm thử và khiếm khuyết."
    },
    {
     "t": "list",
     "v": [
      "Truy vết **ca kiểm thử → yêu cầu**: thẩm tra yêu cầu đã được bao phủ.",
      "Truy vết **kết quả → rủi ro**: đánh giá mức rủi ro còn lại.",
      "Xác định **tác động của thay đổi**: yêu cầu đổi thì biết test nào cần sửa.",
      "Hỗ trợ **kiểm toán** và đáp ứng tiêu chí quản trị CNTT.",
      "Làm báo cáo tiến độ và báo cáo hoàn tất **dễ hiểu** hơn với bên liên quan.",
      "Tiêu chí bao phủ đo được có thể làm **KPI** cho thấy mục tiêu kiểm thử đạt tới đâu."
     ]
    }
   ],
   "summary": [
    "Truy vết giúp đánh giá bao phủ, rủi ro còn lại, tác động thay đổi, kiểm toán và báo cáo dễ hiểu.",
    "Tiêu chí bao phủ đo được có thể làm KPI cho thấy mục tiêu kiểm thử đạt tới đâu."
   ],
   "terms": [
    [
     "traceability",
     "khả năng truy vết"
    ]
   ]
  },
  {
   "id": "1.4.5",
   "title": "Vai trò trong kiểm thử",
   "en": "Roles in Testing",
   "los": [
    "FL-1.4.5"
   ],
   "minutes": 7,
   "example": "Test lead lo kế hoạch, theo dõi tiến độ, viết báo cáo (vai trò quản lý kiểm thử); các tester lo phân tích, viết ca, chạy test (vai trò kiểm thử). Ở một team Scrum nhỏ, một người có thể làm cả hai, còn một phần việc quản lý do cả đội cùng gánh.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Vai trò quản lý kiểm thử",
      "q": "Chịu trách nhiệm chung về quy trình, đội và việc dẫn dắt",
      "v": [
       "Tập trung: lập kế hoạch, giám sát, điều khiển, hoàn tất",
       "Có thể do trưởng nhóm, test manager, development manager đảm nhận",
       "Trong Agile, một phần việc có thể do cả đội làm"
      ]
     },
     "r": {
      "h": "Vai trò kiểm thử",
      "q": "Chịu trách nhiệm về khía cạnh kỹ thuật",
      "v": [
       "Tập trung: phân tích, thiết kế, triển khai, thực thi",
       "Cùng một người có thể kiêm cả hai vai trò",
       "Phân công tùy bối cảnh dự án, kỹ năng và tổ chức"
      ]
     }
    }
   ],
   "summary": [
    "Hai vai trò: quản lý kiểm thử (kế hoạch, giám sát, điều khiển, hoàn tất) và kiểm thử (phân tích, thiết kế, triển khai, thực thi); một người có thể kiêm cả hai.",
    "Trong Agile, một phần việc quản lý kiểm thử có thể do cả đội đảm nhận."
   ],
   "terms": [
    [
     "test management role",
     "vai trò quản lý kiểm thử"
    ],
    [
     "testing role",
     "vai trò kiểm thử"
    ]
   ]
  },
  {
   "id": "1.5.1",
   "title": "Kỹ năng chung cần cho kiểm thử",
   "en": "Generic Skills Required for Testing",
   "los": [
    "FL-1.5.1"
   ],
   "minutes": 12,
   "example": "Tester báo cho dev: “Code của anh bị lỗi khi giỏ hàng trống.” Dev khó chịu. Lần sau tester viết: “Khi giỏ hàng trống, bấm Thanh toán thì app crash. Mình đính kèm video và log, anh xem giúp nhé.” Cùng một thông tin, nhưng nói về sản phẩm thay vì con người nên dev tiếp nhận dễ hơn nhiều.",
   "blocks": [
    {
     "t": "table",
     "head": [
      "Kỹ năng",
      "Để làm gì"
     ],
     "rows": [
      [
       "Kiến thức kiểm thử",
       "Tăng HIỆU LỰC (effectiveness), ví dụ dùng đúng kỹ thuật"
      ],
      [
       "Kỹ lưỡng, cẩn thận, tò mò, chú ý chi tiết, có phương pháp",
       "Tìm lỗi, nhất là lỗi khó thấy"
      ],
      [
       "Giao tiếp tốt, lắng nghe chủ động, tinh thần đồng đội",
       "Làm việc với mọi bên liên quan, báo cáo và thảo luận lỗi"
      ],
      [
       "Tư duy phân tích, phản biện, sáng tạo",
       "Tăng HIỆU LỰC của kiểm thử"
      ],
      [
       "Kiến thức kỹ thuật",
       "Tăng HIỆU QUẢ (efficiency), ví dụ dùng công cụ phù hợp"
      ],
      [
       "Kiến thức nghiệp vụ",
       "Hiểu và nói chuyện được với người dùng, đại diện nghiệp vụ"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Tester thường là người **mang tin xấu**, và người ta có xu hướng trách người mang tin. **Thiên kiến xác nhận** khiến người khác khó chấp nhận thông tin trái với điều họ tin. Vì thế lỗi và sự cố cần được truyền đạt **một cách xây dựng**: nói về sản phẩm, không nói về con người."
    },
    {
     "t": "trap",
     "v": [
      "Kiến thức kỹ thuật gắn với HIỆU QUẢ (efficiency); kiến thức kiểm thử và tư duy gắn với HIỆU LỰC (effectiveness)."
     ]
    }
   ],
   "summary": [
    "Kỹ năng chung: kiến thức kiểm thử, kỹ lưỡng và tò mò, giao tiếp, tư duy phân tích và phản biện, kiến thức kỹ thuật, kiến thức nghiệp vụ.",
    "Tester thường mang tin xấu → truyền đạt lỗi một cách xây dựng.",
    "Kiến thức kỹ thuật tăng hiệu quả (efficiency); kiến thức kiểm thử và tư duy tăng hiệu lực (effectiveness)."
   ],
   "terms": [
    [
     "confirmation bias",
     "thiên kiến xác nhận"
    ],
    [
     "effectiveness",
     "hiệu lực"
    ],
    [
     "efficiency",
     "hiệu quả"
    ]
   ]
  },
  {
   "id": "1.5.2",
   "title": "Cách tiếp cận toàn đội",
   "en": "Whole Team Approach",
   "los": [
    "FL-1.5.2"
   ],
   "minutes": 10,
   "example": "Trong buổi refinement, tester, dev và PO cùng viết tiêu chí chấp nhận cho story “đổi mật khẩu”. Dev đề xuất test API tự động, tester đề xuất thêm ca “mật khẩu mới trùng mật khẩu cũ”. Không ai nói “chất lượng là việc của tester”.",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Bắt nguồn từ Extreme Programming (XP).",
      "Ai có kiến thức và kỹ năng phù hợp cũng có thể làm bất kỳ việc gì; **mọi người cùng chịu trách nhiệm về chất lượng**.",
      "Làm chung không gian (thật hoặc ảo) để giao tiếp dễ hơn.",
      "Lợi ích: cải thiện sự gắn kết của đội, tăng giao tiếp và cộng tác, tạo sức mạnh tổng hợp từ nhiều bộ kỹ năng.",
      "Tester làm cùng đại diện nghiệp vụ để viết test chấp nhận, làm cùng dev để thống nhất chiến lược kiểm thử và cách tự động hóa.",
      "Không phải lúc nào cũng phù hợp: hệ thống an toàn trọng yếu (safety-critical) có thể cần độc lập kiểm thử cao."
     ]
    }
   ],
   "summary": [
    "Cách tiếp cận toàn đội (từ XP): mọi người chịu trách nhiệm chất lượng; cải thiện gắn kết, giao tiếp, cộng tác.",
    "Không phải lúc nào cũng phù hợp: ví dụ hệ thống quan trọng về an toàn có thể cần mức độc lập kiểm thử cao."
   ],
   "terms": [
    [
     "whole team approach",
     "cách tiếp cận toàn đội"
    ]
   ]
  },
  {
   "id": "1.5.3",
   "title": "Tính độc lập của kiểm thử",
   "en": "Independence of Testing",
   "los": [
    "FL-1.5.3"
   ],
   "minutes": 13,
   "example": "Dev tự viết unit test, đồng nghiệp review code, đội test của công ty chạy kiểm thử hệ thống, và một công ty kiểm định bên ngoài được thuê để test bảo mật trước khi ra mắt: bốn mức độc lập khác nhau, mỗi mức bắt được những lỗi mà mức kia dễ bỏ qua.",
   "blocks": [
    {
     "t": "table",
     "head": [
      "Ai kiểm thử",
      "Mức độc lập"
     ],
     "rows": [
      [
       "Chính tác giả",
       "Không độc lập"
      ],
      [
       "Đồng nghiệp cùng đội",
       "Độc lập một phần"
      ],
      [
       "Tester ngoài đội, cùng tổ chức",
       "Độc lập cao"
      ],
      [
       "Tester bên ngoài tổ chức",
       "Độc lập rất cao"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Với đa số dự án, tốt nhất là **kết hợp nhiều mức độc lập**: dev làm kiểm thử thành phần và tích hợp thành phần, đội test làm kiểm thử hệ thống và tích hợp hệ thống, đại diện nghiệp vụ làm kiểm thử chấp nhận."
    },
    {
     "t": "compare",
     "l": {
      "h": "Lợi ích",
      "q": "Nhìn thấy điều tác giả không thấy",
      "v": [
       "Nhận ra loại sự cố và khiếm khuyết khác nhờ khác biệt nền tảng, góc nhìn, thiên kiến",
       "Có thể thẩm tra, chất vấn, bác bỏ giả định của bên liên quan"
      ]
     },
     "r": {
      "h": "Hạn chế",
      "q": "Khoảng cách với đội phát triển",
      "v": [
       "Bị tách biệt, thiếu cộng tác, vấn đề giao tiếp, quan hệ đối đầu",
       "Dev có thể mất ý thức trách nhiệm về chất lượng",
       "Bị xem là nút thắt cổ chai hoặc bị đổ lỗi khi trễ phát hành"
      ]
     }
    },
    {
     "t": "trap",
     "v": [
      "Độc lập KHÔNG thay thế sự am hiểu: dev vẫn tìm được hiệu quả nhiều lỗi trong code của mình."
     ]
    }
   ],
   "summary": [
    "4 mức độc lập: tác giả → đồng nghiệp → tester trong tổ chức → tester bên ngoài. Tốt nhất là kết hợp nhiều mức.",
    "Lợi ích: thấy lỗi khác, chất vấn giả định. Hạn chế: tách biệt, dev mất trách nhiệm, bị xem là nút thắt."
   ],
   "terms": [
    [
     "independence of testing",
     "tính độc lập của kiểm thử"
    ]
   ]
  }
 ]
});
