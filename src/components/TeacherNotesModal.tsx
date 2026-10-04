import React from 'react';
import { LESSON_META } from '../data/lessonData';
import { X, BookOpen, Lightbulb, Flame, Award, Printer, CheckCircle2, Sparkles } from 'lucide-react';

interface TeacherNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
}

export const TeacherNotesModal: React.FC<TeacherNotesModalProps> = ({
  isOpen,
  onClose,
  teacherName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                Sổ Tay Sư Phạm &amp; Hướng Dẫn Giảng Dạy
              </h3>
              <p className="text-xs text-slate-400">
                Môn: {LESSON_META.subject} • Giảng viên: {teacherName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 transition"
              title="In giáo án"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
          {/* Mẹo nhỏ sư phạm */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Mẹo nhỏ cho Thầy/Cô khi bước vào lớp:</span>
            </div>
            <p className="text-amber-950">
              Thay vì vào bài bằng câu quen thuộc: <em>"Hôm nay chúng ta học bài Quan điểm..."</em>, Thầy/Cô hãy bật máy chiếu / applet này lên và <strong>bắt đầu ngay bằng Trò chơi thi phản xạ nhanh lấy điểm cộng</strong>. Điều này lập tức xóa tan sự uể oải và kích thích tinh thần tương tác của 4 nhóm sinh viên ngay từ phút đầu tiên!
            </p>
          </div>

          {/* Phân bổ 4 phần theo giáo án */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Kịch Bản Chi Tiết 4 Giai Đoạn (90 Phút):</span>
            </h4>

            {/* Phần 1 */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-bold">
                  Phần 1: Khởi động - "Mật mã Blouse Trắng" (15 phút)
                </strong>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  +10đ mỗi mật mã
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Chia lớp thành 4 nhóm. Trên màn hình lần lượt xuất hiện 4 từ khóa/hình ảnh gợi ý.</li>
                <li>Nhóm nào giơ tay / bấm chuông nhanh nhất và giải thích đúng sẽ được cộng điểm trực tiếp vào bảng điểm.</li>
                <li>
                  <strong>Lời bình chốt hạ dẫn vào bài:</strong> <em>"Cả 4 từ khóa các em vừa giải mã chính là những 'viên gạch' đầu tiên xây dựng nên hệ thống Y tế Việt Nam. Hôm nay, chúng ta sẽ lên cỗ máy thời gian để xem những viên gạch này đã thay đổi thế nào qua 80 năm."</em>
                </li>
              </ul>
            </div>

            {/* Phần 2 */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-bold">
                  Phần 2: Thuyết trình tương tác - "Cỗ máy thời gian Y tế Việt Nam" (30 phút)
                </strong>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                  4 Trạm Lịch sử
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Tuyệt đối không giảng dài dòng sách vở, chỉ tập trung vào <strong>Keywords cốt lõi</strong> trên slide timeline.</li>
                <li>
                  <strong>Điểm nhấn Trạm 2 (Bao cấp):</strong> Hãy hỏi xoáy câu tương tác: <em>"Thời bao cấp khám bệnh không mất tiền, nghe thì thích đấy, nhưng theo các em hậu quả kéo theo là gì?"</em> (Gợi ý sinh viên: Ngân sách kiệt quệ, thiếu thuốc men, cơ sở vật chất xuống cấp, thiếu động lực đổi mới).
                </li>
                <li>
                  <strong>Chốt hạ Trạm 4 (NQ 46/NQ-TW):</strong> <em>"Đây là bước ngoặt biến Y tế từ một 'ngành tiêu tiền' thành 'đầu tư cho sự phát triển'. Đây cũng là lúc ngành Dược của các em bắt đầu bùng nổ thành một ngành kinh tế mũi nhọn."</em>
                </li>
              </ul>
            </div>

            {/* Phần 3 */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-bold">
                  Phần 3: Thảo luận tình huống - "Góc nhìn Dược sĩ tương lai" (35 phút)
                </strong>
                <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                  Tranh biện 2 Đội
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>
                  <strong>Tình huống 1 (Nhóm 1 &amp; 2):</strong> Phản biện tư duy chuộng thuốc Tây chê Đông dược. Đặt sinh viên vào bài toán thị trường TPCN, mỹ phẩm thiên nhiên, chiết xuất chuẩn hóa.
                </li>
                <li>
                  <strong>Tình huống 2 (Nhóm 3 &amp; 4):</strong> Chứng minh thị trường "Phòng bệnh &amp; Chăm sóc chủ động" đem lại doanh thu bền vững hơn "Chữa bệnh". (Vaccine, vitamin, thiết bị y tế gia đình, CLV).
                </li>
                <li>
                  <strong>Vai trò của Giảng viên:</strong> Đóng vai trò là người <strong>"châm ngòi"</strong>. Khi sinh viên trình bày, liên tục hỏi xoáy: <em>"Nhưng bán TPCN bị khách kêu đắt, các em tư vấn sao?", "Đông y sắc thuốc lỉnh kỉnh ai mà uống, các em làm dạng bào chế nào cho tiện?"</em> để không khí tranh luận luôn sôi sục!
                </li>
              </ul>
            </div>

            {/* Phần 4 */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-bold">
                  Phần 4: Tổng kết &amp; Teaser (10 phút)
                </strong>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  Đúc kết &amp; Hẹn gặp
                </span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Vẽ nhanh sơ đồ tiến trình: <strong>Y tế Bao cấp (Thụ động) ➔ Y tế Đổi mới (Xã hội hóa) ➔ Y tế Toàn diện (Đầu tư mũi nhọn)</strong>.</li>
                <li>
                  <strong>Hé lộ tập sau (Teaser):</strong> <em>"Bắt đầu từ tiết sau, chúng ta sẽ mổ xẻ 5 Quan điểm chỉ đạo hiện hành. Sẽ có những cuộc tranh luận rất gắt gao: Rốt cuộc thì Mở nhà thuốc tư nhân là để cống hiến cho xã hội hay chỉ để làm giàu? Hẹn các em ở Tiết 3-4 với Talkshow tranh biện!"</em>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thầy/Cô có thể nhấp nút Chiếu Slide ở góc trên bất cứ lúc nào để trình chiếu.</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
            >
              Đã hiểu, sẵn sàng giảng dạy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
