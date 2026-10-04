import React, { useState, useEffect } from 'react';
import { DECRYPT_CLUES, TEACHER_TRANSITION_SPEECH } from '../data/lessonData';
import { GroupScore } from '../types';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  Key, 
  HelpCircle, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Quote, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  HandHeart, 
  Gem,
  Award,
  BookOpenCheck
} from 'lucide-react';

interface GameBlouseTrangProps {
  groups: GroupScore[];
  onAwardGroup: (groupId: number, points: number) => void;
  onProceedToTimeline: () => void;
}

export const GameBlouseTrang: React.FC<GameBlouseTrangProps> = ({
  groups,
  onAwardGroup,
  onProceedToTimeline,
}) => {
  const [activeClueIndex, setActiveClueIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [clueTimer, setClueTimer] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const currentClue = DECRYPT_CLUES[activeClueIndex];
  const isRevealed = !!revealedAnswers[currentClue.id];
  const isHintShown = !!showHint[currentClue.id];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && clueTimer > 0) {
      interval = setInterval(() => {
        setClueTimer((prev) => {
          if (prev <= 1) {
            sound.playTimeUp();
            setTimerActive(false);
            return 0;
          }
          if (prev <= 6) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, clueTimer]);

  const handleStartTimer = () => {
    setClueTimer(30);
    setTimerActive(true);
    sound.playTick();
  };

  const handleRevealAnswer = () => {
    setRevealedAnswers((prev) => ({ ...prev, [currentClue.id]: true }));
    setTimerActive(false);
    sound.playFanfare();
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleAwardPoints = (groupId: number) => {
    onAwardGroup(groupId, 10);
    sound.playCorrect();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
    });
  };

  // Switch clue
  const handleSelectClue = (index: number) => {
    setActiveClueIndex(index);
    setTimerActive(false);
    setClueTimer(30);
  };

  // Render Clue visual badge / illustration
  const renderClueVisual = (type: string) => {
    switch (type) {
      case 'history':
        return (
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-red-600 via-rose-500 to-amber-600 text-white flex flex-col items-center justify-center shadow-lg shadow-red-500/20 border-2 border-amber-300">
            <span className="text-3xl font-black tracking-wider">1943</span>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold tracking-wide bg-black/30 px-2 py-0.5 rounded-full">
              <Layers className="w-3 h-3 text-amber-300" />
              <span>3 TRỤ CỘT</span>
            </div>
          </div>
        );
      case 'hands':
        return (
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20 border-2 border-emerald-300">
            <HandHeart className="w-12 h-12 text-emerald-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 mt-1">Đông - Tây Y</span>
          </div>
        );
      case 'mother':
        return (
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex flex-col items-center justify-center shadow-lg shadow-indigo-500/20 border-2 border-purple-300">
            <ShieldCheck className="w-12 h-12 text-pink-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-pink-100 mt-1">Từ Mẫu</span>
          </div>
        );
      case 'diamond':
        return (
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 text-slate-900 flex flex-col items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-white">
            <Gem className="w-12 h-12 text-amber-100 drop-shadow" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 mt-1">Vốn Quý Nhất</span>
          </div>
        );
      default:
        return null;
    }
  };

  const allCompleted = DECRYPT_CLUES.every((c) => revealedAnswers[c.id]);

  return (
    <div className="space-y-6">
      {/* Intro Rule Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phần 1: Khởi động tương tác (15 Phút)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 font-serif-display">
            TRÒ CHƠI: MẬT MÃ BLOUSE TRẮNG
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-4">
            Chia lớp thành <strong>4 nhóm</strong> thi phản xạ. Nhìn từ khóa / hình ảnh hiển thị trên màn hình ➔ Nhóm nào <strong>Bấm chuông / Giơ tay nhanh nhất</strong> sẽ giành quyền giải mã mật mã để tích lũy điểm cộng!
          </p>

          {/* Quick Rules Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-slate-800/80 backdrop-blur border border-emerald-500/30 p-2.5 rounded-xl flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">1</span>
              <span><strong>4 Mật mã cốt lõi:</strong> Tìm ra ý nghĩa then chốt của y tế</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur border border-emerald-500/30 p-2.5 rounded-xl flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">2</span>
              <span><strong>Đồng hồ 30 giây:</strong> Thử thách phản xạ nhanh của 4 đội</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur border border-emerald-500/30 p-2.5 rounded-xl flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">3</span>
              <span><strong>Phần thưởng:</strong> +10 điểm cộng trực tiếp vào bảng vàng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clue Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {DECRYPT_CLUES.map((clue, idx) => {
          const isCurrent = activeClueIndex === idx;
          const isDone = !!revealedAnswers[clue.id];
          return (
            <button
              key={clue.id}
              onClick={() => handleSelectClue(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isCurrent
                  ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : isDone
                  ? 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-50'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black tracking-wider uppercase text-slate-500">
                  {clue.title}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Key className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                {clue.codePrompt}
              </div>
              {isDone && (
                <div className="text-[11px] text-emerald-700 font-medium truncate mt-0.5">
                  ✓ {clue.answer}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Active Clue Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 transition-all">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {currentClue.title}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentClue.subtitle}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Mật Mã: <span className="text-emerald-700">{currentClue.codePrompt}</span>
            </h3>
          </div>

          {/* 30s Countdown timer box */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
            <Clock className={`w-5 h-5 ${clueTimer <= 5 && timerActive ? 'text-red-500 animate-spin' : 'text-slate-500'}`} />
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Thời gian trả lời</div>
              <div className={`text-2xl font-black font-mono leading-none ${clueTimer <= 5 ? 'text-red-600' : 'text-slate-800'}`}>
                {clueTimer}s
              </div>
            </div>
            <button
              onClick={timerActive ? () => setTimerActive(false) : handleStartTimer}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                timerActive
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
              }`}
            >
              {timerActive ? 'Tạm dừng' : 'Bắt đầu đếm 30s'}
            </button>
          </div>
        </div>

        {/* Central Display: Visual + Prompt */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
            {renderClueVisual(currentClue.iconType)}
            <p className="text-xs text-center text-slate-500 mt-3 italic max-w-xs">
              {currentClue.imagePlaceholderDesc}
            </p>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Thử thách dành cho 4 nhóm:</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                Từ khóa / hình ảnh gợi ý trên phản ánh <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-4">đáp án</span> nào trong tư tưởng, đường lối xây dựng nền y tế Việt Nam?
              </p>
            </div>

            {/* Hint Toggle */}
            <div>
              {isHintShown ? (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 flex items-start gap-2 animate-fadeIn">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Gợi ý từ Thầy/Cô:</strong> {currentClue.hint}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowHint((prev) => ({ ...prev, [currentClue.id]: true }))}
                  className="text-xs text-slate-500 hover:text-emerald-700 font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem gợi ý thêm nếu các nhóm chưa phản xạ kịp</span>
                </button>
              )}
            </div>

            {/* Action to Reveal Answer */}
            {!isRevealed ? (
              <div className="pt-2">
                <button
                  onClick={handleRevealAnswer}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/20 text-sm flex items-center gap-2 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Key className="w-4 h-4" />
                  <span>Giải Mã Mật Mã (Mở Đáp Án)</span>
                </button>
              </div>
            ) : (
              /* Revealed Answer Container */
              <div className="p-5 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-slate-50 border-2 border-emerald-500/50 rounded-2xl shadow-sm space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-black text-emerald-700 tracking-wider">
                        ĐÁP ÁN CHÍNH THỨC
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                        {currentClue.answer}
                      </h4>
                    </div>
                  </div>
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    +10 Điểm thưởng
                  </span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed border-t border-emerald-100 pt-2">
                  {currentClue.explanation}
                </p>

                {currentClue.quote && (
                  <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-xs text-slate-600 italic flex items-start gap-2">
                    <Quote className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{currentClue.quote}</span>
                  </div>
                )}

                {/* Direct Award Points to Winning Group */}
                <div className="pt-2 border-t border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Cộng điểm cho nhóm trả lời đúng:</span>
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {groups.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => handleAwardPoints(group.id)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200 shadow-2xs transition flex items-center gap-1"
                        title={`Cộng 10 điểm cho ${group.name}`}
                      >
                        <span>{group.avatar}</span>
                        <span>{group.name}</span>
                        <span className="text-emerald-600 group-hover:text-white">+10</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            onClick={() => handleSelectClue(Math.max(0, activeClueIndex - 1))}
            disabled={activeClueIndex === 0}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
              activeClueIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ← Mật mã trước
          </button>

          <span className="text-xs font-semibold text-slate-400">
            Mật mã {activeClueIndex + 1} / {DECRYPT_CLUES.length}
          </span>

          {activeClueIndex < DECRYPT_CLUES.length - 1 ? (
            <button
              onClick={() => handleSelectClue(activeClueIndex + 1)}
              className="text-xs font-bold px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              Mật mã tiếp theo →
            </button>
          ) : (
            <button
              onClick={onProceedToTimeline}
              className="text-xs font-bold px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow transition flex items-center gap-1 cursor-pointer"
            >
              <span>Vào Cỗ Máy Thời Gian</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Teacher Closing & Transition Speech Box (Chốt lại dẫn vào bài) */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-7 text-white shadow-lg border border-indigo-700/50">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-400 text-slate-950 rounded-2xl flex-shrink-0 mt-0.5">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-amber-300 text-xs font-extrabold uppercase tracking-wider bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                Lời bình chốt phần 1 của Giảng viên (Dẫn vào bài)
              </span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed whitespace-pre-line">
              {TEACHER_TRANSITION_SPEECH.trim()}
            </p>
            <div className="pt-2">
              <button
                onClick={onProceedToTimeline}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                <span>Bắt đầu Trạm 1: Năm 1945 - Tư tưởng Hồ Chí Minh</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
