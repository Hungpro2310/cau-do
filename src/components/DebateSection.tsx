import React, { useState, useEffect } from 'react';
import { DEBATE_SCENARIOS } from '../data/lessonData';
import { GroupScore } from '../types';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  Users, 
  Flame, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Quote, 
  HelpCircle, 
  Lightbulb, 
  Award, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle,
  FileText,
  Sparkles,
  Plus
} from 'lucide-react';

interface DebateSectionProps {
  groups: GroupScore[];
  onAwardGroup: (groupId: number, points: number) => void;
  onProceedToSummary: () => void;
}

export const DebateSection: React.FC<DebateSectionProps> = ({
  groups,
  onAwardGroup,
  onProceedToSummary,
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<number>(1);
  const [debateSeconds, setDebateSeconds] = useState<number>(180); // 3 minutes per turn
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [revealedProvocations, setRevealedProvocations] = useState<Record<string, boolean>>({});
  const [groupNotes, setGroupNotes] = useState<Record<number, string>>({});
  const [activeNoteGroup, setActiveNoteGroup] = useState<number>(1);

  const scenario = DEBATE_SCENARIOS.find((s) => s.id === activeScenarioId) || DEBATE_SCENARIOS[0];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && debateSeconds > 0) {
      interval = setInterval(() => {
        setDebateSeconds((prev) => {
          if (prev <= 1) {
            sound.playTimeUp();
            setTimerRunning(false);
            return 0;
          }
          if (prev <= 5) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, debateSeconds]);

  const handleResetDebateTimer = (seconds: number = 180) => {
    setTimerRunning(false);
    setDebateSeconds(seconds);
  };

  const toggleProvocation = (key: string) => {
    setRevealedProvocations((prev) => ({ ...prev, [key]: !prev[key] }));
    sound.playTick();
  };

  const handleAwardDebate = (groupId: number, points: number) => {
    onAwardGroup(groupId, points);
    sound.playFanfare();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
    });
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-teal-700/40 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/30 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Phần 3: Thảo luận tình huống (35 Phút)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 font-serif-display">
            GÓC NHÌN DƯỢC SĨ TƯƠNG LAI
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Kéo sinh viên về với thực tiễn ngành nghề Dược. Hai tình huống tranh biện gay cấn: <strong>Tư duy "Hai bàn tay" Đông - Tây Y</strong> (Nhóm 1 &amp; 2) và <strong>Mô hình Doanh thu: "Chữa bệnh" hay "Phòng bệnh"?</strong> (Nhóm 3 &amp; 4). Thầy/Cô đóng vai trò "châm ngòi" với các câu hỏi xoáy sắc bén!
          </p>
        </div>
      </div>

      {/* Scenario Selector & Debate Timer Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Scenario Switchers */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEBATE_SCENARIOS.map((sc) => {
            const isSelected = activeScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenarioId(sc.id);
                  handleResetDebateTimer(180);
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Tình huống {sc.id}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {sc.assignedGroups}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                    {sc.title}
                  </h3>
                </div>
                <div className="mt-3 text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <span>{isSelected ? '● Đang tranh biện' : '○ Bấm để chuyển sang'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Global Debate Turn Timer */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Đồng hồ tranh biện lượt nói</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800">
              3 Phút / Lượt
            </span>
          </div>

          <div className="my-2 flex items-baseline justify-center">
            <span className={`text-4xl sm:text-5xl font-mono font-black tracking-tight ${debateSeconds <= 20 ? 'text-red-400 animate-pulse' : 'text-slate-100'}`}>
              {formatTimer(debateSeconds)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1 transition ${
                timerRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{timerRunning ? 'Dừng' : 'Chạy'}</span>
            </button>
            <button
              onClick={() => handleResetDebateTimer(180)}
              className="py-2 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium flex items-center justify-center gap-1 transition"
              title="Đặt lại 3 phút"
            >
              <RotateCcw className="w-3 h-3" />
              <span>3 phút</span>
            </button>
            <button
              onClick={() => handleResetDebateTimer(120)}
              className="py-2 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium flex items-center justify-center gap-1 transition"
              title="Đặt lại 2 phút"
            >
              <span>2 phút</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Debate Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
        {/* Header Title & Quote */}
        <div className="pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              {scenario.assignedGroups} phụ trách
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-display mt-1">
            {scenario.title}
          </h3>

          {/* Quote */}
          <div className="mt-3 p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-3">
            <Quote className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-800 italic text-sm sm:text-base font-serif">
                "{scenario.quote}"
              </p>
              <div className="text-xs text-emerald-900 font-bold mt-1">
                — {scenario.quoteAuthor}
              </div>
            </div>
          </div>
        </div>

        {/* Reality & Task Prompt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Thực trạng đặt ra trong ngành</span>
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {scenario.currentReality}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Nhiệm vụ tranh biện</span>
            </h4>
            <p className="text-slate-900 text-sm font-semibold leading-relaxed">
              {scenario.taskPrompt}
            </p>
          </div>
        </div>

        {/* Guiding Questions */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>4 Trục Lập luận Gợi ý Cho Sinh Viên:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scenario.guidingQuestions.map((q, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                  {idx + 1}
                </span>
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Provocation Questions ("Châm ngòi" của Thầy/Cô) */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-rose-50 via-amber-50/40 to-orange-50 border-2 border-rose-300 rounded-3xl space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-500 text-white rounded-xl">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-rose-800 tracking-wider">
                  Vũ khí sư phạm: Câu hỏi xoáy châm ngòi của Thầy/Cô
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Làm nóng không khí tranh luận - Hỏi xoáy đáp xoay
                </h4>
              </div>
            </div>
            <span className="text-xs text-slate-500 italic">
              Bấm vào từng câu hỏi để kích hoạt
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {scenario.teacherProvocations.map((prov, pIdx) => {
              const pKey = `${scenario.id}-${pIdx}`;
              const isRevealed = !!revealedProvocations[pKey];

              return (
                <div
                  key={pIdx}
                  onClick={() => toggleProvocation(pKey)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isRevealed
                      ? 'bg-white border-rose-400 shadow-sm'
                      : 'bg-white/60 hover:bg-white border-rose-200/70 text-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${isRevealed ? 'text-rose-950 font-bold' : 'text-slate-800'}`}>
                      {prov}
                    </p>
                    <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md flex-shrink-0">
                      {isRevealed ? 'Đang hỏi' : 'Hỏi câu này'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Argument Highlights */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Luận cứ Dược học chuẩn mực:</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenario.suggestedArguments.map((arg, aIdx) => (
              <div key={aIdx} className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-200">
                <h5 className="font-bold text-slate-900 text-sm mb-2 text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{arg.title}</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {arg.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Live Note-taking pad for groups */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Sổ ghi chép luận điểm nóng của 4 nhóm:</span>
            </span>

            {/* Select Group Tab */}
            <div className="flex items-center gap-1">
              {groups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveNoteGroup(g.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    activeNoteGroup === g.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {g.avatar} {g.name}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={groupNotes[activeNoteGroup] || ''}
            onChange={(e) => setGroupNotes({ ...groupNotes, [activeNoteGroup]: e.target.value })}
            placeholder={`Ghi lại ý kiến sắc sảo, phản biện hay của ${groups.find((g) => g.id === activeNoteGroup)?.name}...`}
            rows={2}
            className="w-full text-xs p-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
          />
        </div>

        {/* Scoring Matrix for Debate (+10 / +20) */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Chấm điểm tranh biện cho các nhóm:</span>
          </span>

          <div className="flex items-center gap-2 flex-wrap">
            {groups.map((group) => (
              <div key={group.id} className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <span className="text-xs font-bold text-slate-700 px-1.5">{group.name}</span>
                <button
                  onClick={() => handleAwardDebate(group.id, 10)}
                  className="px-2 py-0.5 text-xs font-bold bg-white hover:bg-emerald-600 hover:text-white text-emerald-700 rounded-lg shadow-2xs border border-slate-200 transition"
                  title="Cộng 10 điểm (Phản biện tốt)"
                >
                  +10
                </button>
                <button
                  onClick={() => handleAwardDebate(group.id, 20)}
                  className="px-2 py-0.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-2xs transition"
                  title="Cộng 20 điểm (Xuất sắc tuyệt đối)"
                >
                  +20
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveScenarioId(activeScenarioId === 1 ? 2 : 1)}
            className="text-xs font-bold px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            Chuyển sang Tình huống {activeScenarioId === 1 ? '2' : '1'}
          </button>

          <button
            onClick={onProceedToSummary}
            className="text-xs font-bold px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Sang Phần 4: Tổng kết &amp; Teaser</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
