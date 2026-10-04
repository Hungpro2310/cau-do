import React, { useState, useEffect } from 'react';
import { LESSON_META } from '../data/lessonData';
import { sound } from '../utils/sound';
import { 
  GraduationCap, 
  Clock, 
  Volume2, 
  VolumeX, 
  Maximize, 
  BookOpen, 
  Printer, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  Edit3,
  Check
} from 'lucide-react';

interface HeaderProps {
  currentTab: number;
  onTabChange: (tabId: number) => void;
  onOpenTeacherNotes: () => void;
  onTogglePresentation: () => void;
  teacherName: string;
  onUpdateTeacherName: (name: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenTeacherNotes,
  onTogglePresentation,
  teacherName,
  onUpdateTeacherName,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [tempTeacherName, setTempTeacherName] = useState(teacherName);

  // Lesson 90-minute timer
  const [secondsLeft, setSecondsLeft] = useState(LESSON_META.totalDurationMinutes * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            sound.playTimeUp();
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, secondsLeft]);

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sound.playCorrect();
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveTeacherName = () => {
    if (tempTeacherName.trim()) {
      onUpdateTeacherName(tempTeacherName.trim());
    }
    setIsEditingTeacher(false);
  };

  return (
    <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-slate-800 no-print">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Title and Subject */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl shadow-md shadow-emerald-500/20 text-white flex-shrink-0 mt-0.5">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {LESSON_META.lessonNumber}
                </span>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Môn học: <strong className="text-slate-200">{LESSON_META.subject}</strong>
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
                {LESSON_META.title}
                <span className="hidden sm:inline-block text-slate-400 font-normal text-sm">
                  — {LESSON_META.subtitle}
                </span>
              </h1>
              
              {/* Teacher Display / Edit */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>Giảng viên:</span>
                {isEditingTeacher ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={tempTeacherName}
                      onChange={(e) => setTempTeacherName(e.target.value)}
                      placeholder="Nhập tên Thầy/Cô..."
                      className="bg-slate-800 text-slate-100 text-xs px-2 py-0.5 rounded border border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveTeacherName}
                      className="text-emerald-400 hover:text-emerald-300 p-0.5"
                      title="Lưu tên giảng viên"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setTempTeacherName(teacherName);
                      setIsEditingTeacher(true);
                    }}
                    className="group inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 hover:underline cursor-pointer font-medium"
                    title="Bấm để đổi tên Thầy/Cô"
                  >
                    <span>{teacherName}</span>
                    <Edit3 className="w-3 h-3 text-slate-500 group-hover:text-emerald-300" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Controls: Lecture Timer, Sound, Presentation Mode, Teacher Notes */}
          <div className="flex items-center flex-wrap gap-2 justify-end">
            {/* 90-minute lecture timer */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className={`font-mono font-bold ${secondsLeft < 300 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
                {formatTimer(secondsLeft)}
              </span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1 text-slate-300 hover:text-white rounded hover:bg-slate-700 transition"
                title={timerRunning ? 'Tạm dừng đồng hồ tiết học' : 'Bắt đầu đếm thời gian tiết học'}
              >
                {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setSecondsLeft(LESSON_META.totalDurationMinutes * 60);
                }}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition"
                title="Khôi phục 90 phút"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition text-xs flex items-center gap-1 ${
                soundEnabled 
                  ? 'bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700' 
                  : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
              }`}
              title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Teacher Notes Modal Button */}
            <button
              onClick={onOpenTeacherNotes}
              className="px-2.5 py-1.5 bg-indigo-950/70 border border-indigo-700/60 hover:bg-indigo-900/80 text-indigo-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
              title="Xem Sổ tay Sư phạm & Lời bình gợi ý cho Thầy/Cô"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Sổ tay Giảng viên</span>
            </button>

            {/* Presentation Mode (Slide Projector) */}
            <button
              onClick={onTogglePresentation}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition cursor-pointer"
              title="Bật chế độ Trình chiếu Slide toàn màn hình cho Máy chiếu lớp học"
            >
              <Maximize className="w-3.5 h-3.5" />
              <span>Chiếu Slide</span>
            </button>

            {/* Print Handout */}
            <button
              onClick={() => window.print()}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-xs transition"
              title="In / Xuất đề cương tóm tắt bài giảng"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Interactive Phases Navigation Tabs */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          <nav className="flex space-x-1 sm:space-x-2">
            {LESSON_META.phases.map((phase) => {
              const isActive = currentTab === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => onTabChange(phase.id)}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-white text-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {phase.id}
                  </span>
                  <span>{phase.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border hidden md:inline-block ${
                    isActive ? 'bg-emerald-700/60 text-emerald-100 border-emerald-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {phase.duration}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Tổ chức giảng dạy tương tác 4 nhóm sinh viên</span>
          </div>
        </div>
      </div>
    </header>
  );
};
