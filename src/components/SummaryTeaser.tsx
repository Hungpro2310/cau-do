import React, { useState } from 'react';
import { SUMMARY_EVOLUTION, FIVE_PRINCIPLES, TEASER_NEXT_LESSON, MINI_QUIZ } from '../data/lessonData';
import { GroupScore } from '../types';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Sparkles, 
  Flame, 
  Trophy, 
  HelpCircle, 
  RotateCcw,
  Star,
  Check,
  X,
  Compass
} from 'lucide-react';

interface SummaryTeaserProps {
  groups: GroupScore[];
  onAwardGroup: (groupId: number, points: number) => void;
  onOpenTeacherNotes: () => void;
}

export const SummaryTeaser: React.FC<SummaryTeaserProps> = ({
  groups,
  onAwardGroup,
  onOpenTeacherNotes,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [awardedToGroup, setAwardedToGroup] = useState<number | null>(null);

  // Sort groups by score to show the winner
  const sortedGroups = [...groups].sort((a, b) => b.score - a.score);
  const winner = sortedGroups[0];

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    sound.playTick();
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    MINI_QUIZ.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    setQuizScore(correctCount);
    setSubmittedQuiz(true);

    if (correctCount >= 3) {
      sound.playFanfare();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else {
      sound.playCorrect();
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(0);
    setAwardedToGroup(null);
  };

  const handleAwardQuizPoints = (groupId: number) => {
    const points = quizScore * 5;
    onAwardGroup(groupId, points);
    setAwardedToGroup(groupId);
    sound.playCorrect();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 rounded-3xl p-6 text-white shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phần 4: Tổng kết &amp; Hé lộ Tiết 3-4 (10 Phút)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 font-serif-display">
            TỔNG KẾT TIẾN TRÌNH &amp; HẸN GẶP TIẾT 3-4
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Đúc kết sơ đồ tiến trình 80 năm Y tế Việt Nam, điểm danh 5 Quan điểm chỉ đạo cốt lõi và khởi động cuộc thi đua trắc nghiệm củng cố bài học!
          </p>
        </div>
      </div>

      {/* 1. Sơ đồ Tiến trình Phát triển: 3 Chặng Đường */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
              Sơ đồ mũi tên tư duy (Bảng tóm tắt cốt lõi)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif-display">
              Tiến Trình 80 Năm: Bao Cấp ➔ Đổi Mới ➔ Toàn Diện
            </h3>
          </div>
          <span className="text-xs text-slate-500 italic">
            Quy luật chuyển dịch từ bị động sang chủ động
          </span>
        </div>

        {/* 3 Step Arrow Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {SUMMARY_EVOLUTION.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.status}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1.5">
                  {item.period}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {idx < SUMMARY_EVOLUTION.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-emerald-600 text-white items-center justify-center shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. 5 Quan điểm chỉ đạo cốt lõi (Nghị quyết 46/NQ-TW) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Compass className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-display">
              5 Quan Điểm Chỉ Đạo Cốt Lõi (Kim Chỉ Nam Ngành Y Dược)
            </h3>
            <p className="text-xs text-slate-500">
              Căn cứ Nghị quyết 46-NQ/TW của Bộ Chính trị về công tác bảo vệ, chăm sóc và nâng cao sức khỏe nhân dân
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {FIVE_PRINCIPLES.map((item) => (
            <div
              key={item.number}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                    {item.number}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {item.detail}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-teal-800 bg-teal-50/70 p-2 rounded-xl font-medium">
                <strong>Ý nghĩa với Dược sĩ:</strong> {item.pharmaRelevance}
              </div>
            </div>
          ))}

          {/* Quick highlight card */}
          <div className="p-4 rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                <h4 className="text-sm font-black">Thông Điệp Sống Còn</h4>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                "Đầu tư cho Y tế là đầu tư cho phát triển bền vững. Ngành Dược không chỉ cứu người mà còn là động lực kinh tế kỹ thuật vươn tầm thế giới."
              </p>
            </div>
            <div className="mt-4 text-[10px] text-emerald-200 uppercase font-black tracking-wider">
              Khoa Dược • Đại Học Y Dược
            </div>
          </div>
        </div>
      </div>

      {/* 3. Teaser Tiết 3 - 4: Talkshow Tranh Biện */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-black/20 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur">
            <Flame className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>{TEASER_NEXT_LESSON.title}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white font-serif-display leading-tight">
            Chủ đề: "{TEASER_NEXT_LESSON.topic}"
          </h3>

          <p className="text-amber-100 text-sm sm:text-base max-w-3xl leading-relaxed">
            {TEASER_NEXT_LESSON.description}
          </p>

          <div className="bg-black/20 backdrop-blur rounded-2xl p-4 sm:p-5 border border-white/20 mt-4 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-yellow-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Yêu cầu Chuẩn Bị Cho Sinh Viên:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-white/95">
              {TEASER_NEXT_LESSON.requirements.map((req, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2 bg-white/10 p-2.5 rounded-xl">
                  <span className="text-yellow-300 font-bold">✔</span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mini Quiz Củng cố 5 Câu có Chấm điểm */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Kiểm tra nhanh
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif-display">
                Mini Quiz Củng Cố Bài 1 (5 Câu)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Thử tài trí nhớ và nhận thức của các nhóm ngay tại lớp
            </p>
          </div>

          <div className="flex items-center gap-2">
            {submittedQuiz && (
              <button
                onClick={handleResetQuiz}
                className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-5">
          {MINI_QUIZ.map((q, idx) => {
            const selectedOpt = selectedAnswers[q.id];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h4>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-8">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let optStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

                    if (submittedQuiz) {
                      if (optIdx === q.correctIndex) {
                        optStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-slate-900 border-slate-900 text-white font-semibold shadow-xs';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submittedQuiz}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {submittedQuiz && optIdx === q.correctIndex && (
                          <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        )}
                        {submittedQuiz && isSelected && !isCorrect && (
                          <X className="w-4 h-4 text-rose-700 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submission */}
                {submittedQuiz && (
                  <div className={`mt-2 p-3 rounded-xl text-xs flex items-start gap-2 ${
                    isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong>{isCorrect ? 'Tuyệt vời!' : 'Lưu ý:'}</strong> {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Button / Results */}
        {!submittedQuiz ? (
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < MINI_QUIZ.length}
              className={`px-8 py-3 rounded-2xl font-bold text-sm shadow-md transition ${
                Object.keys(selectedAnswers).length === MINI_QUIZ.length
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:scale-105'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {Object.keys(selectedAnswers).length === MINI_QUIZ.length
                ? 'Nộp bài & Kiểm tra kết quả'
                : `Vui lòng trả lời đủ 5 câu (${Object.keys(selectedAnswers).length}/5)`}
            </button>
          </div>
        ) : (
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase font-black text-emerald-700">Kết quả củng cố:</div>
              <div className="text-2xl font-black text-slate-900">
                Đúng {quizScore} / {MINI_QUIZ.length} câu ({quizScore * 20}%)
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {quizScore === 5 ? '🎉 Hoàn hảo! Nắm vững toàn bộ kiến thức Bài 1.' : '👍 Rất tốt, các nhóm hãy đọc lại các câu chưa đúng nhé!'}
              </p>
            </div>

            {/* Award points to winning student team */}
            <div className="flex flex-col sm:items-end gap-1.5">
              <span className="text-xs font-bold text-slate-700">
                Cộng điểm cho nhóm xuất sắc:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {groups.map((g) => (
                  <button
                    key={g.id}
                    disabled={awardedToGroup !== null}
                    onClick={() => handleAwardQuizPoints(g.id)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition border ${
                      awardedToGroup === g.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{g.name}</span>
                    <span className="text-emerald-600 ml-1">+{quizScore * 5}đ</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final Class Leaderboard & Winner Podium */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Vinh Danh Kết Quả Tiết Học</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black font-serif-display text-white">
          Nhóm Dẫn Đầu Buổi Học: <span className="text-amber-400">{winner?.name} ({winner?.score} điểm)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
          {sortedGroups.map((g, idx) => (
            <div
              key={g.id}
              className={`p-3 rounded-2xl border text-center ${
                idx === 0
                  ? 'bg-amber-500/20 border-amber-400/60 ring-2 ring-amber-400/30'
                  : 'bg-slate-800/60 border-slate-700'
              }`}
            >
              <div className="text-2xl mb-1">{g.avatar}</div>
              <div className="text-xs font-bold text-slate-300 truncate">{g.name}</div>
              <div className="text-xl font-black text-amber-400 mt-1">{g.score}đ</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Hạng {idx + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playFanfare();
              confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.5 },
              });
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            🎉 Bắn Pháo Hoa Chúc Mừng Lớp
          </button>
          <button
            onClick={onOpenTeacherNotes}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
          >
            Sổ Tay Dạy Học Thầy/Cô
          </button>
        </div>
      </div>
    </div>
  );
};
