import { DecryptClue, TimeStation, DebateScenario, CorePrinciple, QuizQuestion } from '../types';

export const LESSON_META = {
  lessonNumber: 'BÀI 1',
  title: 'QUAN ĐIỂM, ĐƯỜNG LỐI Y TẾ',
  subtitle: 'Hành trình 80 năm & Góc nhìn Dược sĩ tương lai',
  subject: 'Tổ chức và Quản lý Dược',
  defaultTeacher: 'Thầy/Cô Giảng viên Bộ môn Tổ chức & Quản lý Dược',
  institution: 'Khoa Dược - Đại học Y Dược',
  totalDurationMinutes: 90,
  phases: [
    { id: 1, name: 'Khởi động: Mật mã Blouse Trắng', duration: '15 phút', badge: 'Minigame 4 Đội' },
    { id: 2, name: 'Cỗ máy thời gian 80 năm Y tế', duration: '30 phút', badge: '4 Trạm Lịch sử' },
    { id: 3, name: 'Góc nhìn Dược sĩ tương lai', duration: '35 phút', badge: 'Tranh biện 2 Chủ đề' },
    { id: 4, name: 'Tổng kết & Teaser Tiết 3-4', duration: '10 phút', badge: 'Sơ đồ & Hẹn gặp' }
  ]
};

export const DECRYPT_CLUES: DecryptClue[] = [
  {
    id: 1,
    title: 'MẬT MÃ 1',
    subtitle: 'Nền tảng kim chỉ nam văn hóa & y học',
    codePrompt: '"1943" & "3 trụ cột"',
    hint: 'Khẩu hiệu kinh điển trong Đề cương Cách mạng văn hóa 1943 do Tổng Bí thư Trường Chinh khởi thảo, đặt nền móng tư tưởng cho toàn bộ sự nghiệp phát triển y học cách mạng.',
    iconType: 'history',
    imagePlaceholderDesc: 'Năm 1943 và biểu tượng tam giác ba trụ cột vững chắc',
    answer: 'Dân tộc - Khoa học - Đại chúng',
    explanation: 'Xuất phát từ Đề cương Cách mạng văn hóa năm 1943. Ba nguyên tắc này được áp dụng triệt để vào ngành Y - Dược: Nền y tế phải gắn liền với bản sắc Dân tộc (kế thừa y dược học cổ truyền), dựa trên cơ sở Khoa học tiên tiến, và phục vụ đông đảo quần chúng Nhân dân (Đại chúng).',
    quote: 'Ba nguyên tắc vận động: Dân tộc hóa - Đại chúng hóa - Khoa học hóa (Đề cương Văn hóa 1943)',
    timeLimit: 30
  },
  {
    id: 2,
    title: 'MẬT MÃ 2',
    subtitle: 'Lời dặn tâm huyết của Chủ tịch Hồ Chí Minh',
    codePrompt: 'Hình ảnh "Hai bàn tay đang cùng làm việc"',
    hint: 'Biểu tượng của sự hòa quyện tuyệt vời giữa hai nền y học vĩ đại khi người thầy thuốc phụng sự người bệnh.',
    iconType: 'hands',
    imagePlaceholderDesc: 'Hai bàn tay đan kết, một tay nâng nhánh thảo dược, một tay cầm ống nghiệm / viên thuốc',
    answer: 'Kết hợp Đông y và Tây y',
    explanation: 'Trong thư gửi Hội nghị cán bộ y tế ngày 27/02/1955, Bác Hồ căn dặn: "Y học phương Tây và Y học phương Đông đều có ưu điểm. Thầy thuốc tây phải học đông y, thầy thuốc đông phải học tây y... như người có hai tay cùng làm việc, không thể bên trọng bên khinh."',
    quote: '"...Ông cha ta ngày trước có nhiều kinh nghiệm quý báu về cách chữa bệnh bằng thuốc ta, thuốc bắc. Để mở rộng phạm vi y học, các cô các chú cũng phải chú trọng nghiên cứu và phối hợp thuốc đông và thuốc tây." (Hồ Chí Minh, 1955)',
    timeLimit: 30
  },
  {
    id: 3,
    title: 'MẬT MÃ 3',
    subtitle: 'Chuẩn mực đạo đức tối thượng ngành Y Dược',
    codePrompt: '"Người mẹ chăm con" / "Từ mẫu"',
    hint: 'Bốn chữ vàng thiêng liêng luôn được khắc ghi tại mọi giảng đường Y Dược và phòng khám, nhà thuốc trên cả nước.',
    iconType: 'mother',
    imagePlaceholderDesc: 'Hình ảnh người mẹ ân cần chăm sóc đứa con thơ ốm đau',
    answer: 'Lương y phải như từ mẫu',
    explanation: 'Đạo đức nghề nghiệp là cốt lõi của người cán bộ y tế. Người thầy thuốc, người Dược sĩ khi tiếp xúc, tư vấn và cấp phát thuốc cho người bệnh phải thương yêu, săn sóc họ như người mẹ hiền chăm sóc đứa con ruột thịt của mình.',
    quote: '"Thương yêu người bệnh - Người bệnh phó thác tính mệnh của họ nơi các cô các chú. Chính phủ phó thác cho các cô các chú việc chữa bệnh tật và giữ gìn sức khoẻ cho đồng bào. Đó là một nhiệm vụ rất vẻ vang. Vì vậy, cán bộ cần phải thương yêu săn sóc người bệnh như anh em ruột thịt của mình, coi họ đau đớn cũng như mình đau đớn. Lương y phải như từ mẫu..." (Hồ Chí Minh)',
    timeLimit: 30
  },
  {
    id: 4,
    title: 'MẬT MÃ 4',
    subtitle: 'Tài sản vô giá của con người và xã hội',
    codePrompt: 'Hình ảnh "Viên kim cương" / "Vốn quý nhất"',
    hint: 'Quan điểm chỉ đạo xuyên suốt của Đảng và Nhà nước ta về giá trị cốt lõi của mỗi con người trong công cuộc xây dựng và bảo vệ Tổ quốc.',
    iconType: 'diamond',
    imagePlaceholderDesc: 'Viên kim cương lấp lánh tỏa sáng bên cạnh trái tim khỏe mạnh',
    answer: 'Sức khỏe là vốn quý nhất của con người và toàn xã hội',
    explanation: 'Sức khỏe không chỉ là không có bệnh tật, mà là trạng thái hoàn hảo về thể chất, tâm thần và xã hội. Bảo vệ, chăm sóc và nâng cao sức khỏe nhân dân là mục tiêu, là nghĩa vụ và là nguồn lực cốt lõi để đất nước phát triển bền vững.',
    quote: '"Sức khoẻ là vốn quý nhất của mỗi con người và của toàn xã hội. Bảo vệ, chăm sóc và nâng cao sức khoẻ nhân dân là hoạt động nhân đạo, trực tiếp bảo đảm nguồn nhân lực cho sự nghiệp xây dựng và bảo vệ Tổ quốc..." (Nghị quyết 46/NQ-TW)',
    timeLimit: 30
  }
];

export const TEACHER_TRANSITION_SPEECH = `
"Cả 4 từ khóa các em vừa giải mã chính là những 'viên gạch' đầu tiên xây dựng nên hệ thống Y tế Việt Nam:
1. Dân tộc - Khoa học - Đại chúng (Định hướng đường lối)
2. Kết hợp Đông y và Tây y (Phương pháp chuyên môn)
3. Lương y phải như từ mẫu (Đạo đức nghề nghiệp)
4. Sức khỏe là vốn quý nhất (Mục tiêu tối thượng)

Hôm nay, chúng ta sẽ bước lên CỖ MÁY THỜI GIAN để xem những viên gạch này đã thay đổi, vượt qua những thử thách cam go và phát triển ra sao qua 80 năm lịch sử!"
`;

export const TIME_STATIONS: TimeStation[] = [
  {
    id: 1,
    stageName: 'TRẠM 1',
    timeRange: 'Năm 1945 - Nền móng đầu tiên',
    title: 'TƯ TƯỞNG HỒ CHÍ MINH VỀ Y TẾ',
    theme: 'Đặt nền móng: Nhân dân - Đông Tây y kết hợp - Dự phòng - Y đức',
    keyPoints: [
      'Y tế xuất phát từ nhân dân, phục vụ vì nhân dân: Mọi chính sách y tế đều hướng đến đồng bào, người nghèo, chiến sĩ.',
      'Kết hợp chặt chẽ giữa Đông y và Tây y: Tận dụng nguồn dược liệu tại chỗ, bài thuốc dân gian song hành cùng tân dược cứu chữa thương binh.',
      'Đề cao Y học dự phòng: "Phòng bệnh hơn chữa bệnh", phát động phong trào vệ sinh yêu nước, ăn chín uống sôi, diệt muỗi.',
      'Đạo đức nghề nghiệp: "Lương y như từ mẫu" - Y đức là gốc rễ sống còn của người thầy thuốc và người làm công tác dược.'
    ],
    historicalContext: 'Sau Cách mạng Tháng Tám 1945, nước ta đối mặt với giặc đói, giặc dốt và giặc ngoại xâm. Ngành Dược khi đó thiếu thốn thuốc men cùng cực. Các Dược sĩ tiền bối như GS. Trương Công Quyền, GS. Đỗ Tất Lợi đã trèo đèo lội suối lên chiến khu Việt Bắc tự bào chế thuốc dã chiến, chiết xuất quinin trị sốt rét từ vỏ cây canhkina, làm bông băng từ cây cỏ.',
    pharmaImpact: 'Bài học cho Dược sĩ: Tinh thần tự lực cánh sinh, thấu hiểu giá trị của nguồn tài nguyên Dược liệu Việt Nam phong phú, không phụ thuộc hoàn toàn vào thuốc ngoại nhập.',
    quote: {
      text: 'Muốn giữ gìn sức khỏe thì phải ăn sạch, uống sạch, ở sạch. Phòng bệnh hơn chữa bệnh.',
      author: 'Chủ tịch Hồ Chí Minh',
      source: 'Thư gửi Hội nghị Cán bộ Y tế toàn quốc (1955)'
    }
  },
  {
    id: 2,
    stageName: 'TRẠM 2',
    timeRange: '1960 - 1976',
    title: 'THỜI KỲ BAO CẤP (ĐẠI HỘI III, IV)',
    theme: 'Y tế phục vụ sản xuất & quốc phòng - Nhà nước bao tiêu 100%',
    keyPoints: [
      'Mục tiêu chính trị: Y tế và Dược phẩm phục vụ tối đa cho tiền tuyến chống Mỹ và hậu phương thi đua sản xuất xã hội chủ nghĩa.',
      'Cơ chế phân phối: Nhà nước "bao cấp 100%" toàn bộ chi phí khám chữa bệnh và cấp phát thuốc men theo tem phiếu, định mức.',
      'Mạng lưới y tế cơ sở: Xây dựng trạm y tế xã, bệnh xá, hiệu thuốc quốc doanh rộng khắp từ miền xuôi đến vùng núi cao.',
      'Sản xuất Dược: Các Xí nghiệp Dược phẩm Trung ương (Xí nghiệp 1, 2, 3...) sản xuất theo chỉ tiêu pháp lệnh nhà nước giao.'
    ],
    historicalContext: 'Mọi công dân đều được khám chữa bệnh và nhận thuốc miễn phí. Tuy nhiên, do chiến tranh kéo dài và nền kinh tế đóng kín tự cung tự cấp, nguồn lực quốc gia kiệt quệ sau ngày thống nhất đất nước 1975.',
    pharmaImpact: 'Thuốc men trở thành mặt hàng phân phối khan hiếm. Hiệu thuốc quốc doanh bán theo đơn tem phiếu, xếp hàng rồng rắn. Chưa có khái niệm cạnh tranh, nghiên cứu thị trường hay tối ưu dịch vụ Dược.',
    discussionQuestion: {
      question: 'Khám bệnh và phát thuốc miễn phí hoàn toàn - Nghe rất lý tưởng và nhân văn, nhưng hậu quả thực tế để lại cho hệ thống Y tế là gì?',
      context: 'Hãy đặt mình vào vị trí một nhà quản lý Y tế & Dược phẩm giai đoạn trước năm 1986.',
      hints: [
        'Ngân sách nhà nước cạn kiệt, không đủ bù đắp chi phí thuốc men nhập khẩu.',
        'Tình trạng khan hiếm thuốc trầm trọng, thuốc tốt chỉ dành cho diện ưu tiên.',
        'Cơ sở vật chất, trang thiết bị y tế xuống cấp không có nguồn vốn tái đầu tư.',
        'Cán bộ y tế hưởng lương hành chính cào bằng, giảm động lực phấn đấu chuyên môn.',
        'Bệnh nhân phải xếp hàng chờ đợi kéo dài, nảy sinh tâm lý xin - cho và thị trường thuốc chợ đen.'
      ],
      teacherAnswerKey: 'Nguyên lý kinh tế: Khi giá cả bằng 0, cầu sẽ tiến tới vô cùng trong khi nguồn cung có hạn. Cơ chế bao cấp triệt tiêu động lực cạnh tranh, dẫn đến thiếu hụt thuốc triền miên và chất lượng dịch vụ suy giảm.'
    }
  },
  {
    id: 3,
    stageName: 'TRẠM 3',
    timeRange: '1986 - 2001',
    title: 'THỜI KỲ ĐỔI MỚI Y TẾ (ĐẠI HỘI VI ĐẾN IX)',
    theme: 'Khởi xướng Xã hội hóa - Chuyển sang "Nhà nước và nhân dân cùng làm"',
    keyPoints: [
      'Cơ chế Xã hội hóa Y tế: Bãi bỏ bao cấp cào bằng, chuyển từ quan niệm "Nhà nước lo hết" sang cơ chế "Nhà nước và nhân dân cùng làm".',
      'Chính sách Viện phí: Quyết định 45-HĐBT (1989) chính thức cho phép các bệnh viện thu một phần viện phí để bù đắp chi phí thuốc men và vận hành.',
      'Cho phép Y tế & Dược phẩm tư nhân: Nhà thuốc tư nhân, công ty TNHH Dược, phòng khám đa khoa tư nhân ra đời hợp pháp.',
      'Cởi trói thị trường Dược phẩm: Cho phép liên doanh, nhập khẩu thuốc, cổ phần hóa các xí nghiệp dược quốc doanh.'
    ],
    historicalContext: 'Đại hội VI (1986) mở ra kỷ nguyên Đổi mới toàn diện nền kinh tế. Ngành Y - Dược đứng trước áp lực tự chủ tài chính và giải quyết cuộc khủng hoảng thiếu thuốc kéo dài suốt thập niên 80.',
    pharmaImpact: 'Bước ngoặt lịch sử của ngành Dược: Tình trạng thiếu thuốc chấm dứt thần tốc chỉ sau 2-3 năm đổi mới. Người dân được tự do lựa chọn thuốc tại các hiệu thuốc tư nhân. Sinh viên Dược tốt nghiệp có cơ hội khởi nghiệp mở nhà thuốc, làm việc cho các tập đoàn Dược đa quốc gia.'
  },
  {
    id: 4,
    stageName: 'TRẠM 4',
    timeRange: 'Năm 2005 - Đến nay',
    title: 'BƯỚC NGOẶT NGHỊ QUYẾT 46/NQ-TW',
    theme: '5 Quan điểm chỉ đạo cốt lõi - Dược là ngành kinh tế - kỹ thuật mũi nhọn',
    keyPoints: [
      'Ra đời 5 Quan điểm chỉ đạo cốt lõi: Làm kim chỉ nam định hướng toàn bộ chiến lược phát triển y tế thế kỷ 21.',
      'Định vị lại ngành Y tế: Chuyển dịch tư duy từ một "ngành tiêu tiền thụ động" sang "đầu tư cho sức khỏe là đầu tư cho phát triển bền vững đất nước".',
      'Định vị ngành Dược: Chính thức xác định Công nghiệp Dược là ngành KINH TẾ - KỸ THUẬT MŨI NHỌN của quốc gia.',
      'Hội nhập quốc tế sâu rộng: Triển khai các chuẩn mực GPs (GMP, GLP, GSP, GDP, GPP), bảo hiểm y tế toàn dân, chuyển đổi số ngành y dược.'
    ],
    historicalContext: 'Ngày 23/02/2005, Bộ Chính trị ban hành Nghị quyết số 46-NQ/TW về công tác bảo vệ, chăm sóc và nâng cao sức khỏe nhân dân trong tình hình mới. Đây là bản "hiến pháp" tư tưởng hiện đại của toàn ngành Y - Dược Việt Nam.',
    pharmaImpact: 'Khẳng định vị thế người Dược sĩ: Không chỉ đơn thuần là người đếm viên phát thuốc, Dược sĩ là chuyên gia quản trị chuỗi cung ứng dược, dược lâm sàng, quản lý chất lượng và doanh nhân y tế đóng góp vào GDP quốc gia.'
  }
];

export const DEBATE_SCENARIOS: DebateScenario[] = [
  {
    id: 1,
    assignedGroups: 'Nhóm 1 & Nhóm 2',
    title: 'TƯ DUY "HAI BÀN TAY" TRONG THỜI ĐẠI MỚI',
    quote: 'Thầy thuốc tây phải học đông y, thầy thuốc đông phải học tây y... như người có hai tay cùng làm việc.',
    quoteAuthor: 'Chủ tịch Hồ Chí Minh (1955)',
    currentReality: 'Nhiều sinh viên Dược và Dược sĩ trẻ chỉ chuộng bán thuốc Tây (tân dược, hóa dược) vì tác dụng giảm triệu chứng nhanh, doanh số lớn, mẫu mã sang trọng; đồng thời xem nhẹ thuốc Nam, thuốc Bắc là "chậm chạp, cổ hủ, lỉnh kỉnh, khó bán".',
    taskPrompt: 'Hãy phản biện lại tư duy này! Việc chê bai Dược liệu truyền thống sẽ khiến Dược sĩ đánh mất những "cơ hội vàng" nghìn tỷ nào trên thị trường hiện nay?',
    guidingQuestions: [
      'Xu hướng tiêu dùng "Trở về với thiên nhiên" (Back to Nature, Green Healthcare) đang bùng nổ ra sao?',
      'Việt Nam có lợi thế địa chính trị & sinh học gì với hơn 5.000 loài thực vật làm thuốc?',
      'Thị trường Thực phẩm chức năng (TPCN), trà dược liệu, mỹ phẩm thiên nhiên (Cosmeceuticals) có biên lợi nhuận và tốc độ tăng trưởng so với thuốc generic ra sao?',
      'Công nghệ hiện đại (Chiết xuất siêu tới hạn, Nano hóa, cao định chuẩn) đã giải quyết điểm yếu "lỉnh kỉnh" của thuốc Đông y như thế nào?'
    ],
    teacherProvocations: [
      '🔥 "Nhưng Đông y sắc thuốc lỉnh kỉnh, khói um nhà, mùi nồng ai mà uống? Các em làm dạng bào chế nào để sinh viên văn phòng hay doanh nhân bận rộn cũng mê?"',
      '🔥 "Thuốc thảo dược hay bị phốt trộn tân dược (corticoid, paracetamol) hoặc nhiễm nấm mốc, kim loại nặng. Dược sĩ tương lai kiểm soát chất lượng thế nào để người bệnh tin?"',
      '🔥 "Tại sao các tập đoàn Dược phẩm hàng đầu thế giới (Pháp, Đức, Thụy Sĩ, Nhật Bản) lại đang đổ hàng tỷ USD để mua bản quyền các bài thuốc cổ truyền Á Đông?"'
    ],
    suggestedArguments: [
      {
        title: 'Thị trường TPCN & Mỹ phẩm thảo dược tăng trưởng 15-20%/năm',
        points: [
          'Biên lợi nhuận của TPCN thảo dược thường cao hơn thuốc kháng sinh/hạ sốt thông thường.',
          'Không bị khống chế giá trần ngặt nghèo như thuốc đấu thầu bệnh viện.',
          'Khách hàng sẵn sàng chi trả định kỳ hàng tháng cho sản phẩm bổ gan, dưỡng nhan, hạ mỡ máu.'
        ]
      },
      {
        title: 'Công nghệ bào chế hiện đại đã "Tây hóa" Đông dược',
        points: [
          'Dạng bào chế tân tiến: Viên nang mềm, viên sủi, siro đóng gói, trà túi lọc hòa tan, cao khô định chuẩn.',
          'Đạt tiêu chuẩn GMP-WHO Đông dược, kiểm nghiệm hoạt chất bằng HPLC, tiêu chuẩn hóa hàm lượng rõ ràng.'
        ]
      }
    ]
  },
  {
    id: 2,
    assignedGroups: 'Nhóm 3 & Nhóm 4',
    title: 'KIẾM TIỀN TỪ "CHỮA BỆNH" HAY "PHÒNG BỆNH"?',
    quote: 'Phòng bệnh cũng cần thiết như chữa bệnh... Phòng bệnh hơn chữa bệnh.',
    quoteAuthor: 'Lời Bác dạy ngành Y',
    currentReality: 'Quan niệm phổ biến trong cộng đồng: "Có bệnh mới ra hiệu thuốc". Nhiều người lo ngại: Nếu ai cũng khỏe mạnh, có ý thức phòng bệnh tốt thì nhà thuốc lấy doanh thu ở đâu để sống?',
    taskPrompt: 'Bằng kiến thức Quản lý Dược và Kinh tế Y tế, hãy chứng minh: Thị trường "Chăm sóc sức khỏe chủ động" (Phòng bệnh) mang lại doanh thu bền vững và vòng đời khách hàng lớn hơn cả thị trường "Chữa bệnh"!',
    guidingQuestions: [
      'Khách hàng ốm cấp tính (cảm cúm, đau đầu, viêm họng) đến nhà thuốc bao nhiêu lần một năm? Họ chi bao nhiêu tiền?',
      'Khách hàng có ý thức chăm sóc sức khỏe chủ động (dùng vitamin, men vi sinh, canxi, omega 3, máy đo huyết áp, bổ sung collagen) chi trả bao nhiêu trong một năm?',
      'Khái niệm "Giá trị trọn đời của khách hàng" (Customer Lifetime Value - CLV) trong mô hình bán lẻ Dược phẩm hiện đại ứng dụng thế nào?',
      'Làm thế nào để chuyển đổi từ mô hình "Cửa hàng bán lẻ thuốc thụ động" thành "Trung tâm tư vấn sức khỏe gia đình"?'
    ],
    teacherProvocations: [
      '🔥 "Bán thực phẩm chức năng và vitamin hay bị khách hàng kêu là đắt, tư vấn khó. Khách bảo \'Tao chưa bệnh uống làm gì tốn tiền\'. Dược sĩ thuyết phục thế nào mà không mang tiếng vụ lợi chèo kéo?"',
      '🔥 "Nếu chỉ lo bán TPCN để chạy KPI doanh số cho chuỗi, liệu có đánh mất đạo đức Dược sĩ và biến nhà thuốc thành tiệm tạp hóa sức khỏe?"',
      '🔥 "Trong thời đại AI và thương mại điện tử, nếu nhà thuốc chỉ đơn thuần là nơi bán lẻ viên thuốc chữa bệnh theo đơn, các em có bị các sàn thương mại điện tử nuốt chửng không?"'
    ],
    suggestedArguments: [
      {
        title: 'Tần suất và Vòng đời khách hàng phòng bệnh vượt trội',
        points: [
          'Bệnh cấp tính: Mua 1 liều 3-5 ngày (50.000đ - 100.000đ), khỏi bệnh là không quay lại.',
          'Chăm sóc chủ động: Uống liệu trình 3-6 tháng, mua định kỳ cho cả gia đình (ông bà, bố mẹ, con nhỏ), giá trị đơn hàng hàng triệu đồng/tháng.',
          'Chi phí phòng ngừa luôn rẻ hơn 1/10 so với chi phí nằm viện phẫu thuật, khách hàng có học thức nhận thức rất rõ điều này.'
        ]
      },
      {
        title: 'Hệ sinh thái sản phẩm dự phòng cực kỳ đa dạng',
        points: [
          'Dược mỹ phẩm bảo vệ da, kem chống nắng, dung dịch sát khuẩn.',
          'Thiết bị y tế gia đình: Máy đo huyết áp, máy thử đường huyết, que thử, máy xông khí dung.',
          'Các giải pháp dinh dưỡng y học, sữa hạt dinh dưỡng, men vi sinh tiêu hóa.'
        ]
      }
    ]
  }
];

export const FIVE_PRINCIPLES: CorePrinciple[] = [
  {
    number: 1,
    title: 'Sức khỏe là vốn quý nhất',
    detail: 'Bảo vệ, chăm sóc và nâng cao sức khỏe nhân dân là mục tiêu nhân đạo, bảo đảm nguồn nhân lực chất lượng cao cho phát triển đất nước.',
    pharmaRelevance: 'Dược sĩ là người gác cổng an toàn thuốc, bảo đảm mọi người dân tiếp cận thuốc chất lượng với chi phí hợp lý.'
  },
  {
    number: 2,
    title: 'Đổi mới và hoàn thiện hệ thống y tế công bằng - hiệu quả - phát triển',
    detail: 'Xây dựng mạng lưới y tế vững mạnh từ tuyến cơ sở đến chuyên sâu, hướng tới bao phủ chăm sóc sức khỏe toàn dân.',
    pharmaRelevance: 'Cung ứng đủ thuốc thiết yếu cho tuyến y tế cơ sở và vùng sâu vùng xa, không để ai bị bỏ lại phía sau.'
  },
  {
    number: 3,
    title: 'Kết hợp y học hiện đại với y học cổ truyền dân tộc',
    detail: 'Kế thừa, bảo tồn và phát triển nền y dược học cổ truyền, chuẩn hóa vùng trồng dược liệu và hiện đại hóa dạng bào chế.',
    pharmaRelevance: 'Chiến lược phát triển nguồn Dược liệu quốc gia, nghiên cứu sản phẩm thảo dược công nghệ cao xuất khẩu.'
  },
  {
    number: 4,
    title: 'Xã hội hóa và đa dạng hóa các nguồn lực cho y tế',
    detail: 'Nhà nước giữ vai trò chủ đạo, đồng thời huy động mạnh mẽ nguồn lực xã hội, phát triển y tế ngoài công lập và BHYT toàn dân.',
    pharmaRelevance: 'Môi trường kinh doanh thông thoáng cho hệ thống nhà thuốc tư nhân, công ty Dược, chuỗi bán lẻ hiện đại.'
  },
  {
    number: 5,
    title: 'Y tế là ngành phục vụ, cán bộ y tế phải có đạo đức trong sáng',
    detail: 'Nghề y là nghề đặc biệt, đòi hỏi tuyển chọn, đào tạo, đãi ngộ đặc biệt và tinh thần "Lương y như từ mẫu".',
    pharmaRelevance: 'Quy tắc đạo đức hành nghề Dược: Đặt tính mạng và sức khỏe người bệnh lên trên lợi nhuận thuần túy.'
  }
];

export const SUMMARY_EVOLUTION = [
  {
    period: 'Thời kỳ Bao cấp (1960 - 1985)',
    status: 'Thụ động - Bao tiêu 100%',
    desc: 'Nhà nước lo hết từ viện phí đến cấp thuốc theo tem phiếu. Thiếu thốn thuốc men, cơ sở vật chất lạc hậu, triệt tiêu động lực đổi mới.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    period: 'Thời kỳ Đổi mới (1986 - 2004)',
    status: 'Xã hội hóa - Cùng làm',
    desc: 'Thu một phần viện phí, cho phép y tế và nhà thuốc tư nhân hoạt động. Giải quyết dứt điểm nạn thiếu thuốc, kinh tế Dược bùng nổ.',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    period: 'Thời kỳ Toàn diện (2005 - Nay)',
    status: 'Đầu tư phát triển - Mũi nhọn',
    desc: 'NQ 46/NQ-TW xác lập Y tế là đầu tư cho tương lai. Ngành Dược thành ngành kinh tế - kỹ thuật mũi nhọn, hội nhập GPs quốc tế.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  }
];

export const TEASER_NEXT_LESSON = {
  title: 'HÉ LỘ TIẾT 3 - 4: TALKSHOW TRANH BIỆN',
  topic: 'Mở nhà thuốc tư nhân: Cống hiến cho cộng đồng hay chỉ để làm giàu?',
  description: 'Một cuộc tranh luận nảy lửa giữa hai trường phái tư duy: Lý tưởng phụng sự y đức vs Tư duy kinh doanh thực chiến của Dược sĩ thế hệ mới.',
  requirements: [
    'Đọc kỹ 5 Quan điểm chỉ đạo trong Giáo trình Tổ chức & Quản lý Dược (Chương 1).',
    'Tìm hiểu Thông tư 04/2018/TT-BYT về Tiêu chuẩn Thực hành tốt cơ sở bán lẻ thuốc (GPP).',
    'Chuẩn bị tối thiểu 3 dẫn chứng thực tế từ các chuỗi nhà thuốc lớn (Long Châu, An Khang, Pharmacity) hoặc nhà thuốc truyền thống địa phương.',
    'Mỗi nhóm chuẩn bị tâm thế bảo vệ quan điểm bốc thăm ngẫu nhiên tại đầu tiết!'
  ]
};

export const MINI_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Khẩu hiệu "Dân tộc - Khoa học - Đại chúng" đặt nền móng cho nền y học cách mạng xuất phát từ văn kiện nào?',
    options: [
      'A. Luận cương Chính trị năm 1930',
      'B. Đề cương Cách mạng văn hóa năm 1943',
      'C. Tuyên ngôn Độc lập năm 1945',
      'D. Nghị quyết 46/NQ-TW năm 2005'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Đề cương Cách mạng văn hóa 1943 do Tổng Bí thư Trường Chinh khởi thảo đã xác định 3 nguyên tắc lớn: Dân tộc, Khoa học, Đại chúng.'
  },
  {
    id: 2,
    question: 'Bác Hồ đã ví mối quan hệ giữa Đông y và Tây y giống như hình ảnh nào?',
    options: [
      'A. Hai bánh của một cỗ xe',
      'B. Hai cánh của một con chim y tế',
      'C. Hai bàn tay đang cùng làm việc',
      'D. Hai bờ của một dòng sông y học'
    ],
    correctIndex: 2,
    explanation: 'Bác Hồ căn dặn trong thư gửi ngành Y năm 1955: Thầy thuốc tây phải học đông y, thầy thuốc đông phải học tây y... như người có hai tay cùng làm việc.'
  },
  {
    id: 3,
    question: 'Trong thời kỳ Đổi mới (sau 1986), sự thay đổi mang tính cách mạng nhất với ngành Dược là gì?',
    options: [
      'A. Cấm hoàn toàn việc kinh doanh tân dược ngoại nhập',
      'B. Miễn phí hoàn toàn 100% thuốc cho toàn bộ người dân',
      'C. Cho phép tư nhân mở nhà thuốc, kinh doanh phân phối dược phẩm và xã hội hóa y tế',
      'D. Chỉ sản xuất và lưu hành thuốc Nam dạng sắc truyền thống'
    ],
    correctIndex: 2,
    explanation: 'Chính sách mở cửa, xã hội hóa và cho phép dược phẩm tư nhân hoạt động đã giải quyết triệt để nạn thiếu thuốc men kéo dài của thời bao cấp.'
  },
  {
    id: 4,
    question: 'Nghị quyết số 46/NQ-TW (năm 2005) đã xác định vị trí của ngành Dược như thế nào trong nền kinh tế?',
    options: [
      'A. Là ngành tiểu thủ công nghiệp phụ trợ',
      'B. Là ngành thuần túy phúc lợi xã hội không được tính chi phí',
      'C. Là ngành kinh tế - kỹ thuật mũi nhọn của đất nước',
      'D. Là ngành chỉ tập trung vào phân phối bán lẻ'
    ],
    correctIndex: 2,
    explanation: 'Nghị quyết 46/NQ-TW định vị ngành Dược là ngành kinh tế - kỹ thuật mũi nhọn của đất nước, thúc đẩy sản xuất thuốc trong nước và hội nhập.'
  },
  {
    id: 5,
    question: 'Tại sao thị trường "Chăm sóc sức khỏe chủ động" được coi là mang lại doanh thu bền vững cho nhà thuốc hơn là chỉ "Chữa bệnh cấp tính"?',
    options: [
      'A. Vì người bệnh chỉ mua thuốc cấp tính trong vài ngày, còn chăm sóc phòng ngừa có vòng đời và tần suất sử dụng lâu dài cho cả gia đình',
      'B. Vì thuốc chữa bệnh cấp tính bị cấm bán lẻ tại các nhà thuốc tư nhân',
      'C. Vì người dân không bao giờ bị ốm nữa trong tương lai',
      'D. Vì thực phẩm bảo vệ sức khỏe không cần đăng ký công bố chất lượng'
    ],
    correctIndex: 0,
    explanation: 'Chính xác! Bệnh cấp tính chỉ dùng thuốc ngắn ngày (3-5 ngày), trong khi chăm sóc chủ động duy trì lối sống khỏe mạnh lâu dài, tạo giá trị trọn đời khách hàng cao vượt trội.'
  }
];
