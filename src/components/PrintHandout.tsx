import React from 'react';
import { LESSON_META, DECRYPT_CLUES, TIME_STATIONS, DEBATE_SCENARIOS, FIVE_PRINCIPLES, SUMMARY_EVOLUTION, TEASER_NEXT_LESSON } from '../data/lessonData';

interface PrintHandoutProps {
  teacherName: string;
}

export const PrintHandout: React.FC<PrintHandoutProps> = ({ teacherName }) => {
  return (
    <div className="hidden print:block p-8 bg-white text-black font-serif leading-relaxed text-sm">
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6 text-center">
        <div className="text-xs uppercase font-sans font-bold tracking-wider">
          {LESSON_META.institution} • MÔN HỌC: {LESSON_META.subject.toUpperCase()}
        </div>
        <h1 className="text-2xl font-black uppercase mt-1">
          {LESSON_META.lessonNumber}: {LESSON_META.title}
        </h1>
        <h2 className="text-base italic text-gray-700">
          {LESSON_META.subtitle}
        </h2>
        <div className="text-xs mt-2 font-sans">
          Giảng viên phụ trách: <strong>{teacherName}</strong> | Thời lượng: 90 phút (Tiết 1 - 2)
        </div>
      </div>

      {/* Phần 1 */}
      <div className="mb-6">
        <h3 className="text-base font-bold uppercase border-b border-black pb-1 mb-2 font-sans">
          Phần 1: Khởi Động - Trò Chơi "Mật Mã Blouse Trắng" (15 phút)
        </h3>
        <p className="italic text-xs mb-2">
          4 Mật mã cốt lõi đặt nền móng cho hệ thống Y tế Việt Nam:
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {DECRYPT_CLUES.map((c) => (
            <div key={c.id} className="border border-gray-400 p-2 rounded">
              <strong className="font-sans block text-gray-900">{c.title}: {c.codePrompt}</strong>
              <div className="text-gray-800 mt-0.5">➔ <strong>Đáp án:</strong> {c.answer}</div>
              <div className="text-gray-600 text-[11px] mt-0.5">{c.explanation}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Phần 2 */}
      <div className="mb-6">
        <h3 className="text-base font-bold uppercase border-b border-black pb-1 mb-2 font-sans">
          Phần 2: Cỗ Máy Thời Gian Y Tế Việt Nam (80 Năm) - 4 Trạm Cốt Lõi (30 phút)
        </h3>
        <div className="space-y-2 text-xs">
          {TIME_STATIONS.map((s) => (
            <div key={s.id} className="border-l-2 border-black pl-3 py-1">
              <strong className="font-sans text-sm">{s.stageName}: {s.title} ({s.timeRange})</strong>
              <div className="italic text-gray-700">{s.theme}</div>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-gray-800">
                {s.keyPoints.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
              {s.discussionQuestion && (
                <div className="mt-1 font-sans text-[11px] bg-gray-100 p-1.5 rounded">
                  <strong>Câu hỏi thảo luận Bao cấp:</strong> {s.discussionQuestion.question}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phần 3 */}
      <div className="mb-6">
        <h3 className="text-base font-bold uppercase border-b border-black pb-1 mb-2 font-sans">
          Phần 3: Thảo Luận Tình Huống - Góc Nhìn Dược Sĩ Tương Lai (35 phút)
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {DEBATE_SCENARIOS.map((sc) => (
            <div key={sc.id} className="border border-gray-400 p-2.5 rounded">
              <strong className="font-sans block text-sm text-gray-900">
                Tình huống {sc.id} ({sc.assignedGroups}): {sc.title}
              </strong>
              <div className="italic text-gray-700 my-1">"{sc.quote}" — {sc.quoteAuthor}</div>
              <div className="mb-1"><strong>Nhiệm vụ:</strong> {sc.taskPrompt}</div>
              <div className="text-[11px] text-gray-600">
                <strong>Câu hỏi xoáy Thầy/Cô:</strong>
                <ul className="list-disc pl-3 mt-0.5">
                  {sc.teacherProvocations.map((pr, pIdx) => (
                    <li key={pIdx}>{pr}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phần 4 */}
      <div className="mb-4">
        <h3 className="text-base font-bold uppercase border-b border-black pb-1 mb-2 font-sans">
          Phần 4: Tổng Kết &amp; 5 Quan Điểm Chỉ Đạo Cốt Lõi (10 phút)
        </h3>
        <div className="text-xs mb-2">
          <strong>Tiến trình:</strong> Y tế Bao cấp (Thụ động, bao tiêu) ➔ Y tế Đổi mới (Xã hội hóa, tư nhân) ➔ Y tế Toàn diện (Đầu tư cho phát triển, ngành kinh tế mũi nhọn).
        </div>
        <div className="text-xs space-y-1">
          {FIVE_PRINCIPLES.map((pr) => (
            <div key={pr.number}>
              <strong>{pr.number}. {pr.title}:</strong> {pr.detail}
            </div>
          ))}
        </div>
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
          <strong>HẸN GẶP TIẾT 3-4 (TALKSHOW TRANH BIỆN):</strong> "{TEASER_NEXT_LESSON.topic}"
        </div>
      </div>
    </div>
  );
};
