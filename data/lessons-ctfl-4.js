/* The QA Lab – bài học chi tiết CTFL v4.0.1 (chương 4). Mỗi mục ứng với một mục tiêu học tập (LO) trong syllabus. */
window.QALAB.certs.ctfl.lessons = window.QALAB.certs.ctfl.lessons || {};
Object.assign(window.QALAB.certs.ctfl.lessons, {
 "4": [
  {
   "id": "4.1.1",
   "title": "Tổng quan các kỹ thuật kiểm thử",
   "en": "Test Techniques Overview",
   "los": [
    "FL-4.1.1"
   ],
   "minutes": 15,
   "example": "Form đăng ký nhận ưu đãi có ô “tuổi”. Tester A đọc đặc tả “18–60 tuổi” rồi chọn giá trị 17, 18, 60, 61 (hộp đen). Dev B mở code, thấy có nhánh riêng cho người trên 50 tuổi mà đặc tả không nhắc, nên viết thêm test để chạy qua nhánh đó (hộp trắng). Tester C đã từng thấy nhiều form gãy khi nhập dấu cách ở đầu, nhập “١٨” bằng số Ả Rập, hay dán chữ vào ô số, nên thử ngay mấy trường hợp ấy (dựa trên kinh nghiệm). Ba người tìm ra ba loại lỗi khác nhau.",
   "blocks": [
    {
     "t": "p",
     "v": "Kỹ thuật kiểm thử giúp tester **phân tích** (kiểm thử cái gì) và **thiết kế** (kiểm thử thế nào): tạo ra một tập ca kiểm thử nhỏ nhưng đủ, một cách có hệ thống. Chúng cũng giúp xác định điều kiện kiểm thử, mục bao phủ và dữ liệu kiểm thử."
    },
    {
     "t": "table",
     "head": [
      "Nhóm",
      "Dựa trên",
      "Đặc điểm"
     ],
     "rows": [
      [
       "Hộp đen (black-box), còn gọi dựa trên đặc tả",
       "Hành vi được đặc tả của đối tượng kiểm thử",
       "Không phụ thuộc cách cài đặt: code đổi mà hành vi không đổi thì ca kiểm thử vẫn dùng được"
      ],
      [
       "Hộp trắng (white-box), còn gọi dựa trên cấu trúc",
       "Cấu trúc bên trong và cách xử lý",
       "Chỉ tạo được ca kiểm thử sau khi có thiết kế hoặc code"
      ],
      [
       "Dựa trên kinh nghiệm (experience-based)",
       "Kiến thức và kinh nghiệm của tester",
       "Hiệu quả phụ thuộc kỹ năng tester; tìm được lỗi hai nhóm kia bỏ sót"
      ]
     ]
    },
    {
     "t": "list",
     "v": [
      "Hộp đen ở chương này: phân vùng tương đương, phân tích giá trị biên, bảng quyết định, chuyển trạng thái.",
      "Hộp trắng: kiểm thử câu lệnh, kiểm thử nhánh.",
      "Kinh nghiệm: đoán lỗi, kiểm thử khám phá, kiểm thử dựa trên checklist.",
      "Thêm một nhóm cách tiếp cận dựa trên cộng tác (mục 4.5): viết user story cùng nhau, tiêu chí chấp nhận, ATDD."
     ]
    },
    {
     "t": "tip",
     "v": "Câu hỏi nhận diện: dùng TÀI LIỆU (yêu cầu, user story) → hộp đen; dùng CODE → hộp trắng; dùng TRẢI NGHIỆM, lỗi từng gặp → kinh nghiệm."
    },
    {
     "t": "trap",
     "v": [
      "Hộp đen không chỉ dùng cho kiểm thử hệ thống; hộp trắng không chỉ dùng cho kiểm thử thành phần. Mọi kỹ thuật đều dùng được ở nhiều cấp độ.",
      "Kỹ thuật dựa trên kinh nghiệm bổ sung cho kỹ thuật hệ thống, không thay thế."
     ]
    }
   ],
   "summary": [
    "Kỹ thuật kiểm thử hỗ trợ phân tích (test cái gì) và thiết kế (test thế nào).",
    "Hộp đen: dựa trên đặc tả, không phụ thuộc cài đặt.",
    "Hộp trắng: dựa trên cấu trúc bên trong, chỉ làm được sau khi có thiết kế/code.",
    "Kinh nghiệm: dựa trên kiến thức tester, tìm lỗi mà kỹ thuật khác bỏ sót, hiệu quả phụ thuộc người làm."
   ],
   "terms": [
    [
     "black-box test technique",
     "kỹ thuật hộp đen"
    ],
    [
     "white-box test technique",
     "kỹ thuật hộp trắng"
    ],
    [
     "experience-based test technique",
     "kỹ thuật dựa trên kinh nghiệm"
    ],
    [
     "coverage item",
     "mục bao phủ"
    ]
   ]
  },
  {
   "id": "4.2.1",
   "title": "Phân vùng tương đương (EP)",
   "en": "Equivalence Partitioning",
   "los": [
    "FL-4.2.1"
   ],
   "minutes": 35,
   "example": "Phí ship của một sàn: đơn dưới 150.000đ phí 30.000đ, từ 150.000đ trở lên miễn phí. Không cần thử 150.001, 150.002, 150.003… vì hệ thống xử lý chúng giống hệt nhau. Chỉ cần một giá trị đại diện cho mỗi vùng: một đơn có phí, một đơn miễn phí, và một giá trị không hợp lệ như số âm.",
   "blocks": [
    {
     "t": "h",
     "v": "Ý tưởng"
    },
    {
     "t": "p",
     "v": "Chia dữ liệu thành các **phân vùng (partition)**, với kỳ vọng mọi phần tử trong cùng một vùng được đối tượng kiểm thử **xử lý như nhau**. Nếu một giá trị trong vùng phát hiện lỗi, các giá trị khác trong vùng cũng sẽ phát hiện lỗi đó. Vì vậy chỉ cần **một** giá trị cho mỗi vùng."
    },
    {
     "t": "list",
     "v": [
      "Phân vùng được xác định cho mọi thứ liên quan: đầu vào, đầu ra, cấu hình, giá trị nội bộ, thời gian, tham số giao diện.",
      "Vùng có thể liên tục hoặc rời rạc, có thứ tự hoặc không, hữu hạn hoặc vô hạn.",
      "Các vùng **không được chồng lấn** và **không được rỗng**.",
      "**Vùng hợp lệ**: giá trị đối tượng nên chấp nhận và xử lý. **Vùng không hợp lệ**: giá trị nên bị bỏ qua hoặc từ chối.",
      "Ý nghĩa “hợp lệ” có thể được hiểu theo đặc tả hoặc do quyết định của tổ chức, nên cần thống nhất."
     ]
    },
    {
     "t": "h",
     "v": "Đo bao phủ"
    },
    {
     "t": "p",
     "v": "Mục bao phủ là các phân vùng. **Bao phủ EP = số vùng được ít nhất một ca kiểm thử chạy qua / tổng số vùng đã xác định**, tính theo phần trăm. Đạt 100% nghĩa là mọi vùng, cả hợp lệ và không hợp lệ, đều được thử ít nhất một lần."
    },
    {
     "t": "p",
     "v": "Khi có **nhiều tập phân vùng** (ví dụ nhiều trường đầu vào), dùng tiêu chí đơn giản nhất là **Each Choice coverage**: mỗi vùng của mỗi tập được thử ít nhất một lần; tiêu chí này **không** xét tổ hợp giữa các vùng."
    },
    {
     "t": "worked",
     "title": "Tự làm: số ca kiểm thử tối thiểu",
     "given": "Ô “số lượng sản phẩm” chấp nhận số nguyên 1–10. Trường “hạng thành viên” có 3 giá trị: Bạc, Vàng, Kim cương. Cần tối thiểu bao nhiêu ca kiểm thử để đạt 100% Each Choice coverage?",
     "steps": [
      "Số lượng: vùng không hợp lệ ≤ 0, vùng hợp lệ 1–10, vùng không hợp lệ ≥ 11 → 3 vùng.",
      "Hạng thành viên: Bạc, Vàng, Kim cương → 3 vùng (giả sử đều hợp lệ).",
      "Each Choice: mỗi ca kiểm thử có thể phủ một vùng của mỗi tập cùng lúc.",
      "Tập lớn nhất có 3 vùng → cần tối thiểu 3 ca, ví dụ (0, Bạc), (5, Vàng), (11, Kim cương)."
     ],
     "answer": "3 ca kiểm thử. Lưu ý thực tế: nhiều đội chỉ kết hợp một giá trị không hợp lệ trong mỗi ca để tránh lỗi bị che lấp."
    },
    {
     "t": "lab",
     "kind": "bva"
    },
    {
     "t": "trap",
     "v": [
      "Đừng quên vùng không hợp lệ khi đếm.",
      "Đề thường hỏi số ca TỐI THIỂU: với một biến, bằng số vùng; với nhiều biến theo Each Choice, bằng số vùng của tập lớn nhất.",
      "Hai giá trị thuộc cùng một vùng chỉ tính một lần bao phủ."
     ]
    }
   ],
   "summary": [
    "EP chia dữ liệu thành các vùng được xử lý như nhau; mỗi vùng chỉ cần một giá trị đại diện.",
    "Vùng hợp lệ và không hợp lệ; các vùng không chồng lấn, không rỗng.",
    "Bao phủ EP = vùng đã thử / tổng vùng.",
    "Nhiều tập phân vùng: Each Choice coverage = mỗi vùng của mỗi tập được thử ít nhất một lần, không xét tổ hợp; số ca tối thiểu = số vùng của tập lớn nhất."
   ],
   "terms": [
    [
     "equivalence partitioning",
     "phân vùng tương đương"
    ],
    [
     "partition",
     "phân vùng"
    ],
    [
     "valid partition",
     "vùng hợp lệ"
    ],
    [
     "invalid partition",
     "vùng không hợp lệ"
    ],
    [
     "Each Choice coverage",
     "bao phủ mỗi lựa chọn"
    ]
   ]
  },
  {
   "id": "4.2.2",
   "title": "Phân tích giá trị biên (BVA)",
   "en": "Boundary Value Analysis",
   "los": [
    "FL-4.2.2"
   ],
   "minutes": 35,
   "example": "Đặc tả: “Miễn phí ship cho đơn từ 150.000đ”. Dev viết `if (total > 150000)` thay vì `>=`. Khách đặt đúng 150.000đ vẫn bị tính phí. Lỗi kiểu “lệch một” (off-by-one) này nằm đúng ở biên, nơi giá trị đại diện giữa vùng như 300.000đ không bao giờ chạm tới.",
   "blocks": [
    {
     "t": "p",
     "v": "BVA dựa trên việc thử **biên của các phân vùng tương đương**, nên chỉ dùng được cho **vùng có thứ tự**. Giá trị nhỏ nhất và lớn nhất của một vùng là **giá trị biên**. Dev hay mắc lỗi ở biên hơn ở giữa vùng."
    },
    {
     "t": "compare",
     "l": {
      "h": "BVA 2 giá trị",
      "q": "Biên + hàng xóm gần nhất ở vùng bên cạnh",
      "v": [
       "Mỗi biên cho 2 mục bao phủ",
       "Vùng hợp lệ 18–60 → 17, 18, 60, 61",
       "Ít ca hơn"
      ]
     },
     "r": {
      "h": "BVA 3 giá trị",
      "q": "Biên + CẢ HAI hàng xóm",
      "v": [
       "Mỗi biên cho 3 mục bao phủ",
       "Vùng hợp lệ 18–60 → 17, 18, 19, 59, 60, 61",
       "Chặt chẽ hơn, bắt được lỗi mà 2 giá trị bỏ sót"
      ]
     }
    },
    {
     "t": "p",
     "v": "**Bao phủ BVA = số giá trị biên (và hàng xóm) đã thử / tổng số đã xác định.**"
    },
    {
     "t": "h",
     "v": "Vì sao 3 giá trị chặt chẽ hơn"
    },
    {
     "t": "p",
     "v": "Ví dụ trong syllabus: yêu cầu là `if (x ≤ 10)` nhưng code bị viết nhầm thành `if (x = 10)`. BVA 2 giá trị chọn 10 và 11: cả hai cho kết quả đúng (10 → đúng, 11 → sai) nên không phát hiện lỗi. BVA 3 giá trị thêm **9**: theo yêu cầu phải đúng, nhưng code nhầm cho sai → lỗi lộ ra."
    },
    {
     "t": "worked",
     "title": "Tự làm: liệt kê giá trị BVA",
     "given": "Mật khẩu hợp lệ dài từ 8 đến 20 ký tự. Liệt kê giá trị độ dài cần thử theo BVA 2 giá trị và 3 giá trị.",
     "steps": [
      "Phân vùng độ dài: ≤ 7 (không hợp lệ), 8–20 (hợp lệ), ≥ 21 (không hợp lệ).",
      "Có 2 biên giữa các vùng: 7|8 và 20|21.",
      "2 giá trị: lấy biên và hàng xóm ở vùng bên cạnh → 7, 8, 20, 21.",
      "3 giá trị: thêm hàng xóm phía trong mỗi biên → 7, 8, 9, 19, 20, 21."
     ],
     "answer": "2 giá trị: 4 độ dài (7, 8, 20, 21). 3 giá trị: 6 độ dài (7, 8, 9, 19, 20, 21)."
    },
    {
     "t": "tip",
     "v": "Dùng công cụ phía dưới mục EP (hoặc ngay đây) để kiểm tra đáp án với khoảng min–max bất kỳ."
    },
    {
     "t": "lab",
     "kind": "bva"
    },
    {
     "t": "trap",
     "v": [
      "Với số thập phân (ví dụ giá 0,01đ), hàng xóm là giá trị cách biên một đơn vị nhỏ nhất có nghĩa.",
      "BVA không áp dụng cho vùng không có thứ tự như danh sách màu sắc.",
      "Đề hay hỏi “bao nhiêu giá trị”: đếm cẩn thận, loại giá trị trùng nhau khi vùng hợp lệ chỉ có 1–2 phần tử."
     ]
    }
   ],
   "summary": [
    "BVA kiểm thử biên của các vùng có thứ tự; biên = giá trị nhỏ nhất và lớn nhất của vùng.",
    "2 giá trị: biên + hàng xóm ở vùng bên cạnh (18–60 → 17, 18, 60, 61).",
    "3 giá trị: biên + cả hai hàng xóm (→ 17, 18, 19, 59, 60, 61); chặt chẽ hơn.",
    "Ví dụ kinh điển: `x ≤ 10` bị viết thành `x = 10` chỉ lộ ra với giá trị 9 của BVA 3 giá trị.",
    "Bao phủ BVA = giá trị biên đã thử / tổng số đã xác định."
   ],
   "terms": [
    [
     "boundary value analysis",
     "phân tích giá trị biên"
    ],
    [
     "boundary value",
     "giá trị biên"
    ],
    [
     "2-value BVA",
     "BVA 2 giá trị"
    ],
    [
     "3-value BVA",
     "BVA 3 giá trị"
    ]
   ]
  },
  {
   "id": "4.2.3",
   "title": "Kiểm thử bảng quyết định",
   "en": "Decision Table Testing",
   "los": [
    "FL-4.2.3"
   ],
   "minutes": 35,
   "example": "Chính sách bảo hiểm du lịch: giảm 10% nếu là thành viên, giảm thêm 5% nếu mua trước 30 ngày, nhưng không áp dụng giảm giá nào cho gói “giá sốc”. Có ba điều kiện đan xen nên dễ quên tổ hợp: thành viên mua gói giá sốc trước 30 ngày thì sao? Bảng quyết định buộc ta liệt kê đủ mọi tổ hợp và phát hiện chỗ đặc tả bỏ ngỏ.",
   "blocks": [
    {
     "t": "p",
     "v": "Dùng để kiểm thử cách hệ thống thực hiện yêu cầu chứa **các tổ hợp điều kiện** dẫn đến các kết quả khác nhau. Rất hợp với logic nghiệp vụ, quy tắc kinh doanh."
    },
    {
     "t": "h",
     "v": "Cấu trúc bảng"
    },
    {
     "t": "list",
     "v": [
      "**Hàng** trên: các điều kiện. **Hàng** dưới: các hành động (kết quả).",
      "**Mỗi cột là một quy tắc (rule)**: một tổ hợp điều kiện duy nhất cùng các hành động tương ứng.",
      "Bảng giới hạn (limited-entry): điều kiện là T/F (đúng/sai); hành động: X là xảy ra, để trống là không.",
      "Ký hiệu `–` nghĩa điều kiện không liên quan; `N/A` nghĩa tổ hợp không khả thi.",
      "n điều kiện nhị phân → bảng đầy đủ có **2ⁿ cột**."
     ]
    },
    {
     "t": "p",
     "v": "Có thể **rút gọn** bảng: bỏ cột tổ hợp không khả thi, gộp các cột mà một số điều kiện không ảnh hưởng tới kết quả thành một cột."
    },
    {
     "t": "p",
     "v": "**Bao phủ = số cột (khả thi) đã thử / tổng số cột khả thi.** Đạt 100% nghĩa là mỗi cột được ít nhất một ca kiểm thử."
    },
    {
     "t": "table",
     "head": [
      "",
      "R1",
      "R2",
      "R3",
      "R4"
     ],
     "rows": [
      [
       "Điều kiện: Là thành viên?",
       "T",
       "T",
       "F",
       "F"
      ],
      [
       "Điều kiện: Đơn ≥ 500k?",
       "T",
       "F",
       "T",
       "F"
      ],
      [
       "Hành động: Giảm 15%",
       "X",
       "",
       "",
       ""
      ],
      [
       "Hành động: Giảm 5%",
       "",
       "X",
       "X",
       ""
      ],
      [
       "Hành động: Không giảm",
       "",
       "",
       "",
       "X"
      ]
     ]
    },
    {
     "t": "list",
     "v": [
      "**Điểm mạnh**: tiếp cận có hệ thống để tìm mọi tổ hợp, giúp phát hiện **lỗ hổng và mâu thuẫn trong yêu cầu**.",
      "**Điểm yếu**: số quy tắc tăng theo hàm mũ khi thêm điều kiện; khi đó dùng bảng rút gọn hoặc cách tiếp cận dựa trên rủi ro."
     ]
    },
    {
     "t": "worked",
     "title": "Tự làm: đếm cột",
     "given": "Một quy tắc có 3 điều kiện nhị phân. Sau khi phân tích, có 2 tổ hợp không khả thi. Có bao nhiêu cột khả thi? Đã thử 4 cột thì bao phủ là bao nhiêu?",
     "steps": [
      "Bảng đầy đủ: 2³ = 8 cột.",
      "Bỏ 2 cột không khả thi: còn 6 cột khả thi.",
      "Bao phủ = 4 / 6 ≈ 67%."
     ],
     "answer": "6 cột khả thi; bao phủ khoảng 67%."
    },
    {
     "t": "lab",
     "kind": "dt"
    },
    {
     "t": "worked",
     "title": "Tự làm: đọc bảng quyết định",
     "given": "Dùng bảng ở trên (Là thành viên? / Đơn ≥ 500k?). Khách A không phải thành viên, đơn 600k. Khách B là thành viên, đơn 300k. Mỗi người được giảm bao nhiêu?",
     "steps": [
      "Khách A: thành viên = F, đơn ≥ 500k = T → tìm cột có F, T → R3.",
      "R3 đánh X ở “Giảm 5%” → khách A được giảm 5%.",
      "Khách B: thành viên = T, đơn ≥ 500k = F → cột R2 → “Giảm 5%”.",
      "Kiểm tra lại: mỗi tổ hợp chỉ khớp đúng một cột; nếu không khớp cột nào, đó là lỗ hổng trong yêu cầu."
     ],
     "answer": "A giảm 5% (R3), B giảm 5% (R2). Hai ca kiểm thử này phủ 2/4 cột, tức 50% bao phủ bảng quyết định."
    },
    {
     "t": "trap",
     "v": [
      "Mỗi CỘT là một quy tắc và là một mục bao phủ, không phải mỗi hàng.",
      "Tổ hợp không khả thi không tính vào mẫu số bao phủ.",
      "Đề hay cho bảng rồi hỏi “kết quả của ca kiểm thử X là gì”: đọc từng điều kiện, tìm đúng cột khớp, kể cả cột có dấu `–`."
     ]
    }
   ],
   "summary": [
    "Bảng quyết định dùng cho yêu cầu có tổ hợp điều kiện → hành động (logic nghiệp vụ).",
    "Hàng = điều kiện và hành động; mỗi CỘT = một quy tắc = một mục bao phủ.",
    "n điều kiện nhị phân → 2ⁿ cột; rút gọn bằng cách bỏ cột không khả thi và gộp cột có điều kiện không liên quan (–).",
    "Bao phủ = cột khả thi đã thử / tổng cột khả thi.",
    "Mạnh: tìm lỗ hổng và mâu thuẫn yêu cầu. Yếu: số cột tăng theo hàm mũ."
   ],
   "terms": [
    [
     "decision table testing",
     "kiểm thử bảng quyết định"
    ],
    [
     "condition",
     "điều kiện"
    ],
    [
     "action",
     "hành động"
    ],
    [
     "rule",
     "quy tắc (cột)"
    ],
    [
     "infeasible combination",
     "tổ hợp không khả thi"
    ]
   ]
  },
  {
   "id": "4.2.4",
   "title": "Kiểm thử chuyển trạng thái",
   "en": "State Transition Testing",
   "los": [
    "FL-4.2.4"
   ],
   "minutes": 40,
   "example": "Đăng nhập ngân hàng: nhập sai mật khẩu lần 1 vẫn ở trạng thái “Chờ nhập”, lần 3 thì chuyển sang “Bị khóa”. Từ “Bị khóa” mà nhập mật khẩu đúng thì vẫn phải khóa. Lỗi thường gặp: hệ thống cho phép đăng nhập từ trạng thái “Bị khóa”, tức một chuyển trạng thái KHÔNG HỢP LỆ lại xảy ra.",
   "blocks": [
    {
     "t": "p",
     "v": "Sơ đồ trạng thái mô hình hóa hành vi của hệ thống qua các **trạng thái** có thể có và các **chuyển trạng thái** hợp lệ. Chuyển trạng thái được kích hoạt bởi một **sự kiện**, có thể kèm **điều kiện bảo vệ (guard)**, và có thể gây ra **hành động**. Chuyển trạng thái được coi là tức thời."
    },
    {
     "t": "p",
     "v": "Ký hiệu nhãn chuyển trạng thái: `sự kiện [điều kiện bảo vệ] / hành động`. Điều kiện bảo vệ và hành động có thể bỏ qua nếu không có hoặc không liên quan."
    },
    {
     "t": "h",
     "v": "Bảng trạng thái"
    },
    {
     "t": "list",
     "v": [
      "**Hàng** = trạng thái, **cột** = sự kiện (kèm điều kiện bảo vệ nếu có).",
      "Ô chứa trạng thái đích và hành động nếu chuyển là hợp lệ.",
      "**Ô trống = chuyển trạng thái không hợp lệ.** Bảng trạng thái cho thấy rõ cả chuyển hợp lệ và không hợp lệ, điều sơ đồ không làm được."
     ]
    },
    {
     "t": "table",
     "head": [
      "Trạng thái \\ Sự kiện",
      "Đúng mật khẩu",
      "Sai mật khẩu [lần < 3]",
      "Sai mật khẩu [lần = 3]"
     ],
     "rows": [
      [
       "Chờ nhập",
       "Đã đăng nhập",
       "Chờ nhập",
       "Bị khóa"
      ],
      [
       "Đã đăng nhập",
       "",
       "",
       ""
      ],
      [
       "Bị khóa",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "t": "h",
     "v": "3 tiêu chí bao phủ"
    },
    {
     "t": "table",
     "head": [
      "Tiêu chí",
      "Mục bao phủ",
      "Ghi nhớ"
     ],
     "rows": [
      [
       "Bao phủ mọi trạng thái (all states)",
       "Trạng thái",
       "Yếu nhất; có thể đạt mà không chạy hết các chuyển"
      ],
      [
       "Bao phủ chuyển hợp lệ (valid transitions), còn gọi 0-switch coverage",
       "Chuyển trạng thái hợp lệ",
       "Dùng rộng rãi nhất; 100% chuyển hợp lệ ⇒ 100% trạng thái"
      ],
      [
       "Bao phủ mọi chuyển (all transitions)",
       "Mọi chuyển trong bảng trạng thái, hợp lệ và không hợp lệ",
       "Mạnh nhất; tối thiểu cho phần mềm quan trọng về nhiệm vụ hay an toàn; 100% ⇒ 100% chuyển hợp lệ và trạng thái"
      ]
     ]
    },
    {
     "t": "p",
     "v": "Ca kiểm thử thường là một **chuỗi sự kiện** tạo ra chuỗi thay đổi trạng thái (và hành động nếu có). Một ca có thể phủ nhiều chuyển hợp lệ. Nhưng với chuyển **không hợp lệ**, mỗi ca chỉ nên thử **một** chuyển không hợp lệ để tránh **che lấp lỗi (defect masking)**."
    },
    {
     "t": "worked",
     "title": "Tự làm: ca tối thiểu cho chuyển hợp lệ",
     "given": "Sơ đồ: Nháp →(gửi)→ Chờ duyệt →(duyệt)→ Đã đăng; Chờ duyệt →(từ chối)→ Nháp. Cần tối thiểu bao nhiêu ca để đạt 100% bao phủ chuyển hợp lệ, nếu mỗi ca bắt đầu từ Nháp?",
     "steps": [
      "Có 3 chuyển hợp lệ: gửi, duyệt, từ chối.",
      "Một ca có thể đi: Nháp →gửi→ Chờ duyệt →từ chối→ Nháp →gửi→ Chờ duyệt →duyệt→ Đã đăng.",
      "Chuỗi này phủ cả 3 chuyển."
     ],
     "answer": "1 ca kiểm thử là đủ, vì một ca có thể chứa chuỗi nhiều chuyển hợp lệ."
    },
    {
     "t": "lab",
     "kind": "st"
    },
    {
     "t": "trap",
     "v": [
      "Bao phủ trạng thái 100% KHÔNG đảm bảo bao phủ chuyển 100%.",
      "Ô trống trong bảng trạng thái là chuyển không hợp lệ, vẫn cần thử nếu mục tiêu là all transitions.",
      "Mỗi ca chỉ thử một chuyển không hợp lệ."
     ]
    }
   ],
   "summary": [
    "Sơ đồ trạng thái gồm trạng thái và chuyển; chuyển = sự kiện [điều kiện bảo vệ] / hành động.",
    "Bảng trạng thái: hàng = trạng thái, cột = sự kiện; ô trống = chuyển không hợp lệ.",
    "3 tiêu chí: mọi trạng thái (yếu nhất) < chuyển hợp lệ, 0-switch (phổ biến) < mọi chuyển (mạnh nhất, cho hệ thống an toàn).",
    "Một ca có thể phủ nhiều chuyển hợp lệ; mỗi ca chỉ nên thử một chuyển không hợp lệ để tránh che lấp lỗi."
   ],
   "terms": [
    [
     "state transition testing",
     "kiểm thử chuyển trạng thái"
    ],
    [
     "state diagram",
     "sơ đồ trạng thái"
    ],
    [
     "state table",
     "bảng trạng thái"
    ],
    [
     "guard condition",
     "điều kiện bảo vệ"
    ],
    [
     "0-switch coverage",
     "bao phủ 0-switch"
    ],
    [
     "defect masking",
     "che lấp lỗi"
    ]
   ]
  },
  {
   "id": "4.3.1",
   "title": "Kiểm thử câu lệnh và bao phủ câu lệnh",
   "en": "Statement Testing and Statement Coverage",
   "los": [
    "FL-4.3.1"
   ],
   "minutes": 12,
   "example": "Hàm tính phí: `fee = 30000; if (total >= 150000) fee = 0; return fee;`. Một ca với total = 200.000 chạy qua MỌI câu lệnh: 100% bao phủ câu lệnh. Nhưng nhánh “không vào if” chưa bao giờ chạy. Nếu ai đó lỡ xóa dòng `fee = 30000`, ca kiểm thử duy nhất kia vẫn đạt.",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Mục bao phủ: các **câu lệnh thực thi được**.",
      "**Bao phủ câu lệnh = câu lệnh đã chạy / tổng câu lệnh thực thi được.**",
      "100% đảm bảo mỗi câu lệnh chạy ít nhất một lần, nên mọi khiếm khuyết nằm trong câu lệnh đó **có cơ hội** gây sự cố.",
      "Không phát hiện được lỗi **phụ thuộc dữ liệu**, ví dụ chia cho 0 chỉ lỗi khi mẫu số bằng 0.",
      "Không đảm bảo mọi logic quyết định đã được thử: có thể không chạy hết các nhánh."
     ]
    },
    {
     "t": "trap",
     "v": [
      "100% bao phủ code KHÔNG có nghĩa là không còn lỗi."
     ]
    }
   ],
   "summary": [
    "Bao phủ câu lệnh = câu lệnh đã chạy / tổng câu lệnh thực thi được; không bắt lỗi phụ thuộc dữ liệu, không đảm bảo chạy hết nhánh.",
    "100% bao phủ câu lệnh đảm bảo mỗi câu lệnh chạy ít nhất một lần, nên khiếm khuyết trong đó có cơ hội gây sự cố."
   ],
   "terms": [
    [
     "statement coverage",
     "bao phủ câu lệnh"
    ],
    [
     "code coverage",
     "bao phủ code"
    ]
   ]
  },
  {
   "id": "4.3.2",
   "title": "Kiểm thử nhánh và bao phủ nhánh",
   "en": "Branch Testing and Branch Coverage",
   "los": [
    "FL-4.3.2"
   ],
   "minutes": 13,
   "example": "Hàm xét duyệt khoản vay có `if (diem >= 700)` chia hai đường: duyệt và từ chối. Một ca với điểm 750 đi qua nhánh duyệt; phải thêm ca điểm 600 để nhánh từ chối được chạy. Chỉ khi cả hai nhánh đều đã chạy mới đạt 100% bao phủ nhánh.",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Nhánh là sự chuyển điều khiển giữa hai nút trong đồ thị luồng điều khiển; có **nhánh vô điều kiện** (đoạn code thẳng) và **nhánh có điều kiện** (kết quả của if, case, vòng lặp).",
      "**Bao phủ nhánh = nhánh đã chạy / tổng số nhánh.**",
      "100% đảm bảo mọi nhánh, cả có điều kiện và vô điều kiện, đều chạy.",
      "**100% bao phủ nhánh ⇒ 100% bao phủ câu lệnh**, nhưng chiều ngược lại không đúng.",
      "Vẫn có thể bỏ sót lỗi cần chạy một đường đi cụ thể trong code."
     ]
    },
    {
     "t": "worked",
     "title": "Tự làm: câu lệnh vs nhánh",
     "given": "Code: `fee = 30000; if (total >= 150000) { fee = 0 } return fee`. Ca 1: total = 200.000. Thêm ca nào để đạt 100% bao phủ nhánh?",
     "steps": [
      "Ca 1 (200.000): chạy fee = 30000, điều kiện ĐÚNG, fee = 0, return → mọi câu lệnh đã chạy → 100% câu lệnh.",
      "Nhánh ĐÚNG đã chạy; nhánh SAI (bỏ qua khối if) chưa chạy → chưa đạt 100% nhánh.",
      "Thêm ca 2: total < 150.000, ví dụ 100.000 → đi nhánh SAI, trả về 30.000."
     ],
     "answer": "Cần 2 ca: một ca có total ≥ 150.000 và một ca có total < 150.000. Ca 1 một mình chỉ đạt 100% câu lệnh."
    },
    {
     "t": "lab",
     "kind": "cov"
    },
    {
     "t": "trap",
     "v": [
      "Bao phủ nhánh mạnh hơn bao phủ câu lệnh, không phải ngược lại."
     ]
    }
   ],
   "summary": [
    "Bao phủ nhánh = nhánh đã chạy / tổng nhánh (có điều kiện và vô điều kiện).",
    "100% nhánh ⇒ 100% câu lệnh; ngược lại không đúng."
   ],
   "terms": [
    [
     "branch coverage",
     "bao phủ nhánh"
    ],
    [
     "control flow graph",
     "đồ thị luồng điều khiển"
    ]
   ]
  },
  {
   "id": "4.3.3",
   "title": "Giá trị của kiểm thử hộp trắng",
   "en": "The Value of White-box Testing",
   "los": [
    "FL-4.3.3"
   ],
   "minutes": 10,
   "example": "Đặc tả chỉ ghi “tính phí ship theo khu vực”, khá mơ hồ. Xem code, tester thấy một nhánh riêng cho đảo xa mà không tài liệu nào nhắc, và viết test cho nó: hộp trắng tìm được lỗi ở đó. Nhưng nếu đặc tả yêu cầu miễn phí ship cho thành viên VIP mà dev quên làm, nhìn code sẽ không thấy gì để test: hộp trắng không phát hiện được sự thiếu sót.",
   "blocks": [
    {
     "t": "compare",
     "l": {
      "h": "Điểm mạnh",
      "q": "Nhìn toàn bộ cài đặt",
      "v": [
       "Xét đến toàn bộ code khi thử, nên phát hiện lỗi kể cả khi đặc tả mơ hồ, lỗi thời hoặc thiếu",
       "Dùng được trong kiểm thử tĩnh: chạy thử khô (dry run) code, mã giả, logic chưa sẵn sàng chạy",
       "Cung cấp số đo bao phủ code khách quan, điều hộp đen không làm được"
      ]
     },
     "r": {
      "h": "Điểm yếu",
      "q": "Không thấy cái bị thiếu",
      "v": [
       "Nếu phần mềm không cài đặt một yêu cầu, hộp trắng không phát hiện được sự thiếu sót đó",
       "Chỉ dùng hộp đen thì không đo được mức bao phủ code thực tế"
      ]
     }
    },
    {
     "t": "trap",
     "v": [
      "Hộp trắng không tìm được yêu cầu bị thiếu trong code."
     ]
    }
   ],
   "summary": [
    "Giá trị hộp trắng: xét toàn bộ code, dùng được trong kiểm thử tĩnh, đo bao phủ khách quan.",
    "Hạn chế: không phát hiện yêu cầu bị thiếu trong cài đặt."
   ],
   "terms": []
  },
  {
   "id": "4.4.1",
   "title": "Đoán lỗi",
   "en": "Error Guessing",
   "los": [
    "FL-4.4.1"
   ],
   "minutes": 10,
   "example": "App này từng lỗi khi đổi múi giờ, nên khi có màn hình lịch hẹn mới, tester thử ngay: đặt lịch lúc 23:30 rồi đổi múi giờ điện thoại, đặt lịch ngày 29/2, để trống trường giờ. Cô còn lập sẵn danh sách “lỗi hay gặp ở form ngày giờ” để lần sau tấn công lỗi có hệ thống hơn.",
   "blocks": [
    {
     "t": "p",
     "v": "Dự đoán lỗi (error), khiếm khuyết (defect) và sự cố (failure) dựa trên kiến thức của tester: ứng dụng từng chạy thế nào, dev hay mắc lỗi gì, các ứng dụng tương tự từng gặp sự cố gì."
    },
    {
     "t": "table",
     "head": [
      "Nhóm lỗi",
      "Ví dụ"
     ],
     "rows": [
      [
       "Đầu vào",
       "Đầu vào đúng không được chấp nhận; tham số sai hoặc thiếu"
      ],
      [
       "Đầu ra",
       "Sai định dạng, sai kết quả"
      ],
      [
       "Logic",
       "Thiếu trường hợp, dùng sai toán tử"
      ],
      [
       "Tính toán",
       "Sai toán hạng, tính toán sai"
      ],
      [
       "Giao diện (interface)",
       "Tham số không khớp, kiểu không tương thích"
      ],
      [
       "Dữ liệu",
       "Khởi tạo sai, sai kiểu dữ liệu"
      ]
     ]
    },
    {
     "t": "p",
     "v": "**Tấn công lỗi (fault attack)** là cách đoán lỗi có phương pháp: lập danh sách các lỗi, khiếm khuyết, sự cố có thể xảy ra, rồi thiết kế test để làm lộ chúng. Danh sách có thể dựa trên kinh nghiệm, dữ liệu lỗi và sự cố, hay kiến thức chung về vì sao phần mềm hỏng."
    }
   ],
   "summary": [
    "Đoán lỗi: dự đoán lỗi từ kinh nghiệm (đầu vào, đầu ra, logic, tính toán, giao diện, dữ liệu); tấn công lỗi = lập danh sách lỗi rồi thiết kế test làm lộ chúng.",
    "Hiệu quả phụ thuộc kinh nghiệm của tester và dữ liệu lỗi, sự cố đã gặp."
   ],
   "terms": [
    [
     "error guessing",
     "đoán lỗi"
    ],
    [
     "fault attack",
     "tấn công lỗi"
    ]
   ]
  },
  {
   "id": "4.4.2",
   "title": "Kiểm thử khám phá",
   "en": "Exploratory Testing",
   "los": [
    "FL-4.4.2"
   ],
   "minutes": 10,
   "example": "Tester nhận charter: “Khám phá luồng đổi trả với đơn nhiều sản phẩm để tìm vấn đề về số tiền hoàn”. Trong 60 phút, cô vừa thử, vừa ghi chú, vừa nghĩ ca tiếp theo dựa trên điều vừa thấy. Hết phiên, cô trao đổi nhanh với PO về 3 lỗi và 2 câu hỏi mở (debriefing).",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Test được **thiết kế, thực thi và đánh giá đồng thời** trong lúc tester tìm hiểu đối tượng kiểm thử.",
      "Dùng để hiểu sâu hơn đối tượng, khám phá nó kỹ hơn bằng các test tập trung, và tạo test cho những vùng chưa được kiểm thử.",
      "**Session-based**: làm trong khung thời gian cố định; tester dùng **test charter** chứa mục tiêu kiểm thử để định hướng; sau phiên có **buổi trao đổi (debriefing)** giữa tester và bên liên quan.",
      "Hữu ích khi: **đặc tả ít hoặc không đủ**, **áp lực thời gian lớn**, hoặc để bổ trợ cho kỹ thuật chính thức hơn.",
      "Hiệu quả hơn khi tester có kinh nghiệm, hiểu nghiệp vụ, có kỹ năng phân tích, tò mò, sáng tạo.",
      "Có thể kết hợp các kỹ thuật khác, ví dụ phân vùng tương đương."
     ]
    },
    {
     "t": "trap",
     "v": [
      "Charter và debriefing là dấu hiệu của kiểm thử khám phá session-based.",
      "Khám phá KHÔNG có nghĩa là không có cấu trúc."
     ]
    }
   ],
   "summary": [
    "Khám phá: thiết kế, chạy, đánh giá đồng thời; session-based có khung thời gian, charter, debriefing.",
    "Khám phá hợp khi đặc tả kém, áp lực thời gian, hoặc bổ trợ kỹ thuật chính thức; phụ thuộc kỹ năng tester."
   ],
   "terms": [
    [
     "exploratory testing",
     "kiểm thử khám phá"
    ],
    [
     "test charter",
     "điều lệ kiểm thử"
    ],
    [
     "session-based testing",
     "kiểm thử theo phiên"
    ]
   ]
  },
  {
   "id": "4.4.3",
   "title": "Kiểm thử dựa trên checklist",
   "en": "Checklist-Based Testing",
   "los": [
    "FL-4.4.3"
   ],
   "minutes": 10,
   "example": "Team có checklist “form nhập liệu” 15 mục: thông báo lỗi có nói rõ cách sửa không, có giữ dữ liệu khi lỗi không, phím Tab có đi đúng thứ tự không… Mỗi quý, team bỏ những mục không còn tìm ra lỗi và thêm mục từ các lỗi nghiêm trọng mới gặp.",
   "blocks": [
    {
     "t": "list",
     "v": [
      "Tester thiết kế, cài đặt, thực thi test để phủ các **điều kiện kiểm thử** trong checklist.",
      "Checklist được xây dựng từ kinh nghiệm, hiểu biết về điều quan trọng với người dùng, và hiểu vì sao, như thế nào phần mềm hỏng.",
      "**Không** nên đưa vào: mục kiểm tra tự động được, mục hợp làm tiêu chí đầu vào/đầu ra hơn, mục quá chung chung.",
      "Mục thường là câu hỏi; mỗi mục nên kiểm tra được riêng và trực tiếp.",
      "Cần **cập nhật thường xuyên** dựa trên phân tích lỗi, vì dev học cách tránh lỗi cũ nên checklist kém hiệu quả dần; thêm mục cho lỗi mức nghiêm trọng mới phát hiện.",
      "Không có ca kiểm thử chi tiết, checklist đem lại hướng dẫn và sự **nhất quán**. Checklist mức cao gây chút **biến thiên** khi chạy → bao phủ rộng hơn nhưng **khó lặp lại** hơn.",
      "Dùng được cho cả kiểm thử chức năng và phi chức năng."
     ]
    },
    {
     "t": "trap",
     "v": [
      "Checklist không chứa mục kiểm tra được bằng công cụ tự động."
     ]
    }
   ],
   "summary": [
    "Checklist: điều kiện kiểm thử từ kinh nghiệm; không chứa mục tự động được, mục chung chung; cập nhật thường xuyên.",
    "Checklist mức cao: nhất quán, bao phủ rộng hơn nhưng khó lặp lại."
   ],
   "terms": [
    [
     "checklist-based testing",
     "kiểm thử dựa trên checklist"
    ]
   ]
  },
  {
   "id": "4.5.1",
   "title": "Cùng nhau viết user story",
   "en": "Collaborative User Story Writing",
   "los": [
    "FL-4.5.1"
   ],
   "minutes": 12,
   "example": "PO, dev và tester cùng viết story “Là khách hàng, tôi muốn lưu thẻ thanh toán để lần sau mua nhanh hơn”. Họ brainstorm các tình huống, rồi soát theo INVEST: story có đủ nhỏ để xong trong một sprint không, có test được không. Tester hỏi “Lưu tối đa mấy thẻ?” và câu trả lời được ghi thành tiêu chí chấp nhận.",
   "blocks": [
    {
     "t": "p",
     "v": "Các cách tiếp cận này tập trung vào **phòng ngừa lỗi** thông qua cộng tác và giao tiếp, thay vì chỉ phát hiện lỗi."
    },
    {
     "t": "h",
     "v": "Cùng nhau viết user story"
    },
    {
     "t": "p",
     "v": "User story là tính năng có giá trị với người dùng hoặc người mua. Story có **3 yếu tố quan trọng (3C)**:"
    },
    {
     "t": "list",
     "v": [
      "**Card** (thẻ): phương tiện mô tả story, như thẻ giấy hay mục trong backlog điện tử.",
      "**Conversation** (trao đổi): giải thích phần mềm sẽ được dùng thế nào, có thể bằng tài liệu hoặc lời nói.",
      "**Confirmation** (xác nhận): tiêu chí chấp nhận."
     ]
    },
    {
     "t": "p",
     "v": "Định dạng phổ biến: “**Là** [vai trò], **tôi muốn** [mục tiêu], **để** [giá trị nghiệp vụ]”, kèm tiêu chí chấp nhận. Tác giả cùng nhau dùng các kỹ thuật như **brainstorming** và **sơ đồ tư duy**."
    },
    {
     "t": "p",
     "v": "Story tốt đáp ứng **INVEST**: Independent (độc lập), Negotiable (thương lượng được), Valuable (có giá trị), Estimable (ước lượng được), Small (nhỏ), Testable (kiểm thử được). Nếu bên liên quan không biết test story thế nào, có thể story chưa đủ rõ, không phản ánh điều có giá trị, hoặc họ cần hỗ trợ về kiểm thử."
    },
    {
     "t": "trap",
     "v": [
      "3C là Card, Conversation, Confirmation; Confirmation = tiêu chí chấp nhận."
     ]
    }
   ],
   "summary": [
    "Cộng tác hướng tới phòng ngừa lỗi qua giao tiếp.",
    "User story 3C: Card, Conversation, Confirmation; mẫu “Là… tôi muốn… để…”; story tốt theo INVEST."
   ],
   "terms": [
    [
     "user story",
     "câu chuyện người dùng"
    ],
    [
     "INVEST",
     "INVEST"
    ]
   ]
  },
  {
   "id": "4.5.2",
   "title": "Tiêu chí chấp nhận",
   "en": "Acceptance Criteria",
   "los": [
    "FL-4.5.2"
   ],
   "minutes": 10,
   "example": "Story lưu thẻ có hai kiểu tiêu chí chấp nhận. Kiểu kịch bản: “Given đã đăng nhập, When lưu một thẻ hết hạn, Then hiện lỗi và không lưu”. Kiểu quy tắc: “Lưu tối đa 5 thẻ; chỉ hiển thị 4 số cuối; không lưu thẻ hết hạn”.",
   "blocks": [
    {
     "t": "p",
     "v": "Tiêu chí chấp nhận là các điều kiện mà phần cài đặt phải đáp ứng để được bên liên quan chấp nhận. Chúng dùng để:"
    },
    {
     "t": "list",
     "v": [
      "Xác định phạm vi của story",
      "Đạt đồng thuận giữa các bên liên quan",
      "Mô tả cả kịch bản dương và âm",
      "Làm cơ sở cho kiểm thử chấp nhận",
      "Giúp lập kế hoạch và ước lượng chính xác"
     ]
    },
    {
     "t": "compare",
     "l": {
      "h": "Hướng kịch bản (scenario-oriented)",
      "q": "Given / When / Then",
      "v": [
       "Dùng trong BDD",
       "Given giỏ có 1 thẻ đã lưu, When thêm thẻ hết hạn, Then hiển thị lỗi và không lưu"
      ]
     },
     "r": {
      "h": "Hướng quy tắc (rule-oriented)",
      "q": "Danh sách hoặc bảng",
      "v": [
       "Danh sách gạch đầu dòng cần kiểm tra",
       "Hoặc bảng ánh xạ đầu vào → đầu ra"
      ]
     }
    }
   ],
   "summary": [
    "Tiêu chí chấp nhận: phạm vi, đồng thuận, kịch bản dương và âm, cơ sở kiểm thử chấp nhận, lập kế hoạch và ước lượng.",
    "Hai dạng tiêu chí: hướng kịch bản (Given/When/Then) và hướng quy tắc (danh sách, bảng)."
   ],
   "terms": [
    [
     "acceptance criteria",
     "tiêu chí chấp nhận"
    ]
   ]
  },
  {
   "id": "4.5.3",
   "title": "Phát triển hướng kiểm thử chấp nhận (ATDD)",
   "en": "Acceptance Test-driven Development (ATDD)",
   "los": [
    "FL-4.5.3"
   ],
   "minutes": 13,
   "example": "PO viết story “Là khách hàng, tôi muốn lưu thẻ thanh toán để lần sau mua nhanh hơn”. Trong buổi workshop, tester hỏi “Thẻ hết hạn thì sao? Lưu tối đa mấy thẻ?”. Cả nhóm chốt tiêu chí chấp nhận theo Given/When/Then, rồi viết ca kiểm thử chấp nhận trước khi dev bắt tay vào làm. Ca dương (lưu thẻ thành công) viết trước, rồi đến ca âm (thẻ hết hạn), rồi phi chức năng (số thẻ được mã hóa).",
   "blocks": [
    {
     "t": "steps",
     "v": [
      [
       "Workshop đặc tả (specification workshop)",
       "Phân tích, thảo luận, viết user story và tiêu chí chấp nhận; xử lý chỗ mơ hồ, thiếu, sai"
      ],
      [
       "Viết ca kiểm thử từ tiêu chí chấp nhận",
       "Có thể coi là ví dụ về cách phần mềm phải hoạt động; do cả nhóm hoặc tester viết"
      ],
      [
       "Thứ tự viết",
       "Ca DƯƠNG trước (luồng chạy đúng, không ngoại lệ), rồi ca ÂM, rồi phi chức năng"
      ],
      [
       "Viết dễ hiểu",
       "Ngôn ngữ tự nhiên, có tiền điều kiện, đầu vào, hậu điều kiện"
      ],
      [
       "Tự động hóa",
       "Nếu viết theo định dạng framework hỗ trợ, dev viết code hỗ trợ → test chấp nhận thành yêu cầu thực thi được"
      ]
     ]
    },
    {
     "t": "list",
     "v": [
      "Ca kiểm thử phải phủ **mọi đặc tính** của story và **không vượt ra ngoài** story.",
      "**Không** có hai ca kiểm thử mô tả cùng một đặc tính.",
      "Có thể dùng kỹ thuật hộp đen như EP, BVA để viết ca từ tiêu chí chấp nhận."
     ]
    },
    {
     "t": "worked",
     "title": "Tự làm: viết ca kiểm thử chấp nhận theo ATDD",
     "given": "Story: “Là khách hàng, tôi muốn áp mã giảm giá để được giảm tiền.” Tiêu chí chấp nhận: (1) mã hợp lệ giảm 10% tổng đơn; (2) mã hết hạn hiện “Mã đã hết hạn” và không giảm; (3) mỗi đơn chỉ áp được 1 mã. Viết các ca kiểm thử chấp nhận theo đúng thứ tự ATDD.",
     "steps": [
      "Ca dương trước, luồng chạy đúng: TC1 · Given giỏ 200.000đ, When áp mã hợp lệ SALE10, Then tổng còn 180.000đ.",
      "Rồi ca âm: TC2 · Given giỏ 200.000đ, When áp mã hết hạn OLD5, Then hiện “Mã đã hết hạn” và tổng vẫn 200.000đ.",
      "TC3 · Given đơn đã áp SALE10, When áp thêm mã FREESHIP, Then bị từ chối và tổng vẫn 180.000đ.",
      "Phi chức năng: tiêu chí không nêu yêu cầu nào (ví dụ thời gian phản hồi) nên không thêm.",
      "Soát lại: mỗi tiêu chí có ít nhất một ca; không ca nào vượt phạm vi story (không viết ca cho tích điểm hay đổi quà); không hai ca nào kiểm tra cùng một đặc tính."
     ],
     "answer": "3 ca: TC1 (dương) viết trước, sau đó TC2 và TC3 (âm). Mỗi ca có tiền điều kiện, đầu vào và kết quả mong đợi, viết bằng ngôn ngữ mà PO đọc hiểu được."
    },
    {
     "t": "trap",
     "v": [
      "Trong ATDD, ca dương được viết TRƯỚC ca âm.",
      "Ca kiểm thử chấp nhận không được vượt quá phạm vi của story."
     ]
    }
   ],
   "summary": [
    "ATDD: workshop đặc tả → viết test trước khi cài đặt; ca dương → âm → phi chức năng; phủ đủ story, không vượt ra ngoài, không trùng lặp; có thể tự động hóa thành yêu cầu thực thi được.",
    "Có thể dùng EP, BVA để viết ca kiểm thử từ tiêu chí chấp nhận."
   ],
   "terms": [
    [
     "specification workshop",
     "workshop đặc tả"
    ],
    [
     "executable requirements",
     "yêu cầu thực thi được"
    ]
   ]
  }
 ]
});
