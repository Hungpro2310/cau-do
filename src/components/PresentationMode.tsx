import React, { useState, useEffect, useCallback } from 'react';
import { LESSON_META, DECRYPT_CLUES, TIME_STATIONS, DEBATE_SCENARIOS, SUMMARY_EVOLUTION, FIVE_PRINCIPLES, TEASER_NEXT_LESSON } from '../data/lessonData';
import { sound } from '../utils/sound';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  HelpCircle, 
  Clock, 
  Sparkles, 
  Quote, 
  Layers, 
  HandHeart, 
  ShieldCheck, 
  Gem, 
  Flame,
  Award,
  Bell
} from 'lucide-react';

interface PresentationModeProps {
  onClose: () => void;
  teacherName: string;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  onClose,
  teacherName,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 16 curated presentation slides
  const slides = [
    // Slide 0: Cover
    {
      type: 'cover',
      badge: 'BÀI 1: TỔ CHỨC VÀ QUẢN LÝ DƯỢC',
      title: 'QUAN ĐIỂM, ĐƯỜNG LỐI Y TẾ',
      subtitle: 'Hành trình 80 năm & Góc nhìn Dược sĩ tương lai',
      teacher: teacherName,
      footer: 'Trình chiếu bài giảng tương tác cho Giảng đường',
    },
    // Slide 1: Roadmap & Rules
    {
      type: 'roadmap',
      title: 'HÀNH TRÌNH 4 CHẶNG TRỌNG TÂM',
      subtitle: 'Tiết 1 - 2 (90 Phút Tương Tác)',
      steps: [
        { num: '1', title: 'Khởi động: Mật mã Blouse Trắng', desc: 'Thi phản xạ nhanh 4 nhóm giành điểm' },
        { num: '2', title: 'Cỗ máy thời gian 80 năm', desc: '4 Trạm dừng chân lịch sử then chốt' },
        { num: '3', title: 'Góc nhìn Dược sĩ tương lai', desc: 'Tranh biện 2 tình huống nghề nghiệp nảy lửa' },
        { num: '4', title: 'Tổng kết & Teaser Tiết 3-4', desc: '5 Quan điểm chỉ đạo & Hẹn gặp Talkshow' },
      ],
    },
    // Slide 2: Clue 1
    {
      type: 'clue',
      clueIndex: 0,
      clue: DECRYPT_CLUES[0],
    },
    // Slide 3: Clue 2
    {
      type: 'clue',
      clueIndex: 1,
      clue: DECRYPT_CLUES[1],
    },
    // Slide 4: Clue 3
    {
      type: 'clue',
      clueIndex: 2,
      clue: DECRYPT_CLUES[2],
    },
    // Slide 5: Clue 4
    {
      type: 'clue',
      clueIndex: 3,
      clue: DECRYPT_CLUES[3],
    },
    // Slide 6: Transition Speech
    {
      type: 'transition',
      title: '4 "VIÊN GẠCH" NỀN MÓNG ĐẦU TIÊN',
      points: [
        { text: 'Dân tộc - Khoa học - Đại chúng', sub: 'Định hướng tư tưởng và bản sắc y tế' },
        { text: 'Kết hợp Đông y và Tây y', sub: 'Phương pháp luận chuyên môn vững chắc' },
        { text: 'Lương y như từ mẫu', sub: 'Đạo đức nghề nghiệp thiêng liêng' },
        { text: 'Sức khỏe là vốn quý nhất', sub: 'Mục tiêu tối thượng của con người và xã hội' },
      ],
      leadIn: 'Cùng bước lên Cỗ Máy Thời Gian để khám phá 80 năm biến chuyển vĩ đại!',
    },
    // Slide 7: Station 1
    {
      type: 'station',
      station: TIME_STATIONS[0],
    },
    // Slide 8: Station 2
    {
      type: 'station',
      station: TIME_STATIONS[1],
    },
    // Slide 9: Station 3
    {
      type: 'station',
      station: TIME_STATIONS[2],
    },
    // Slide 10: Station 4
    {
      type: 'station',
      station: TIME_STATIONS[3],
    },
    // Slide 11: Debate 1
    {
      type: 'debate',
      scenario: DEBATE_SCENARIOS[0],
    },
    // Slide 12: Debate 2
    {
      type: 'debate',
      scenario: DEBATE_SCENARIOS[1],
    },
    // Slide 13: Summary Flow
    {
      type: 'summary_flow',
      title: 'TIẾN TRÌNH 80 NĂM PHÁT TRIỂN Y TẾ VIỆT NAM',
    },
    // Slide 14: 5 Principles
    {
      type: 'principles',
      title: '5 QUAN ĐIỂM CHỈ ĐẠO CỐT LÕI (NGHỊ QUYẾT 46/NQ-TW)',
    },
    // Slide 15: Teaser
    {
      type: 'teaser',
      title: 'HẸN GẶP Ở TIẾT 3 - 4',
      topic: TEASER_NEXT_LESSON.topic,
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
      setShowAnswer(false);
      sound.playTick();
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      setShowAnswer(false);
      sound.playTick();
    }
  }, [currentSlide]);

  // Keyboard navigation: Left/Right arrow, Space, Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const current = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Floating Control Bar */}
      <div className="px-6 py-3 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
            CHẾ ĐỘ CHIẾU SLIDE BÀI GIẢNG
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline">
            Slide {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Buzzer Bell */}
          <button
            onClick={() => sound.playBuzzer()}
            className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-bold flex items-center gap-1 transition"
            title="Bấm chuông tập trung lớp"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Chuông lớp</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Exit Presenter Mode */}
          <button
            onClick={onClose}
            className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition flex items-center gap-1 text-xs font-bold"
            title="Đóng chế độ trình chiếu (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Thoát</span>
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl w-full mx-auto animate-fadeIn">
          {/* SLIDE: Cover */}
          {current.type === 'cover' && (
            <div className="text-center space-y-6">
              <div className="inline-block bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest">
                {current.badge}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif-display tracking-tight text-white leading-tight">
                {current.title}
              </h1>
              <p className="text-xl sm:text-2xl text-emerald-200 font-light max-w-3xl mx-auto">
                {current.subtitle}
              </p>

              <div className="pt-8">
                <div className="inline-block p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-sm text-slate-300">
                  <div className="text-slate-400 text-xs uppercase font-bold tracking-wider">Giảng viên phụ trách</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">{current.teacher}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Khoa Dược • Đại Học Y Dược</div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE: Roadmap */}
          {current.type === 'roadmap' && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-emerald-400 text-xs font-black uppercase tracking-wider">Tiến trình giảng dạy</span>
                <h2 className="text-3xl sm:text-5xl font-black font-serif-display text-white mt-1">
                  {current.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {current.steps?.map((st) => (
                  <div key={st.num} className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center flex-shrink-0">
                      {st.num}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{st.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE: Clue */}
          {current.type === 'clue' && current.clue && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase">
                  {current.clue.title}
                </span>
                <span className="text-slate-400 text-sm">Trò chơi Mật mã Blouse Trắng</span>
              </div>

              <div className="p-8 sm:p-12 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-6 shadow-2xl">
                <div className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                  Từ khóa / Hình ảnh hiển thị
                </div>
                <div className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tight">
                  {current.clue.codePrompt}
                </div>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto italic">
                  "{current.clue.imagePlaceholderDesc}"
                </p>

                {/* Show Answer Toggle */}
                <div className="pt-4">
                  {!showAnswer ? (
                    <button
                      onClick={() => {
                        setShowAnswer(true);
                        sound.playFanfare();
                      }}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-base shadow-lg transition cursor-pointer"
                    >
                      Mở Đáp Án Mật Mã
                    </button>
                  ) : (
                    <div className="p-6 bg-gradient-to-r from-emerald-950 to-teal-950 border-2 border-emerald-500 rounded-2xl space-y-3 animate-fadeIn text-left">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Đáp án chính xác:
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white font-serif-display">
                        {current.clue.answer}
                      </div>
                      <p className="text-emerald-100 text-sm leading-relaxed border-t border-emerald-800/80 pt-2">
                        {current.clue.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE: Transition Speech */}
          {current.type === 'transition' && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-amber-400 text-xs font-black uppercase tracking-wider">Dẫn dắt của Giảng viên</span>
                <h2 className="text-3xl sm:text-5xl font-black font-serif-display text-white mt-1">
                  {current.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {current.points?.map((pt, idx) => (
                  <div key={idx} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-base font-bold text-white">{pt.text}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{pt.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <p className="text-emerald-300 text-lg font-serif italic">
                  "{current.leadIn}"
                </p>
              </div>
            </div>
          )}

          {/* SLIDE: Station */}
          {current.type === 'station' && current.station && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {current.station.stageName} • {current.station.timeRange}
                </span>
                <span className="text-slate-400 text-sm">Cỗ máy thời gian Y tế</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-black font-serif-display text-white">
                  {current.station.title}
                </h2>
                <p className="text-emerald-300 text-sm mt-1">{current.station.theme}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {current.station.keyPoints.map((pt, pIdx) => {
                  const [head, ...rest] = pt.split(':');
                  return (
                    <div key={pIdx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {pIdx + 1}
                      </span>
                      <div className="text-sm">
                        <strong className="text-white block mb-0.5">{head}</strong>
                        <span className="text-slate-300 text-xs sm:text-sm">{rest.join(':')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {current.station.quote && (
                <div className="p-4 bg-slate-900/60 rounded-2xl border border-amber-500/30 text-amber-200 italic text-sm font-serif">
                  "{current.station.quote.text}" — {current.station.quote.author}
                </div>
              )}
            </div>
          )}

          {/* SLIDE: Debate */}
          {current.type === 'debate' && current.scenario && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {current.scenario.assignedGroups}
                </span>
                <span className="text-slate-400 text-sm">Góc nhìn Dược sĩ tương lai</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-black font-serif-display text-white">
                  {current.scenario.title}
                </h2>
                <p className="text-slate-300 text-sm mt-2 italic">
                  "{current.scenario.quote}" — {current.scenario.quoteAuthor}
                </p>
              </div>

              <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
                <div>
                  <div className="text-xs uppercase font-bold text-amber-400">Nhiệm vụ tranh biện</div>
                  <p className="text-base sm:text-lg font-bold text-white mt-1">
                    {current.scenario.taskPrompt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-rose-400 uppercase">Câu hỏi xoáy châm ngòi từ Thầy/Cô:</div>
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    {current.scenario.teacherProvocations.map((pr, idx) => (
                      <div key={idx} className="p-2 bg-slate-800/80 rounded-xl">
                        {pr}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE: Summary Flow */}
          {current.type === 'summary_flow' && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-emerald-400 text-xs font-black uppercase tracking-wider">Đúc kết tiến trình</span>
                <h2 className="text-3xl sm:text-5xl font-black font-serif-display text-white mt-1">
                  {current.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {SUMMARY_EVOLUTION.map((item, idx) => (
                  <div key={idx} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold uppercase text-emerald-400">{item.status}</span>
                    <h3 className="text-lg font-bold text-white">{item.period}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE: 5 Principles */}
          {current.type === 'principles' && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-emerald-400 text-xs font-black uppercase tracking-wider">Kim chỉ nam phát triển</span>
                <h2 className="text-2xl sm:text-4xl font-black font-serif-display text-white mt-1">
                  {current.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {FIVE_PRINCIPLES.map((pr) => (
                  <div key={pr.number} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                          {pr.number}
                        </span>
                        <h4 className="font-bold text-white text-xs">{pr.title}</h4>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{pr.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE: Teaser */}
          {current.type === 'teaser' && (
            <div className="text-center space-y-6">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                {current.title}
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif-display text-white leading-tight">
                TALKSHOW TRANH BIỆN
              </h2>
              <div className="p-6 bg-gradient-to-r from-amber-950 to-orange-950 border border-amber-500/50 rounded-3xl max-w-2xl mx-auto">
                <p className="text-xl sm:text-2xl font-bold text-amber-200">
                  "{current.topic}"
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  Đọc trước 5 Quan điểm chỉ đạo trong Giáo trình để chuẩn bị lý lẽ bảo vệ quan điểm!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Navigation Toolbar */}
      <div className="px-6 py-3.5 bg-slate-900/90 backdrop-blur border-t border-slate-800 flex items-center justify-between z-20">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            currentSlide === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Slide Trước</span>
        </button>

        {/* Slide Progress Dots / Counter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            {currentSlide + 1} / {totalSlides}
          </span>
          <div className="hidden md:flex items-center gap-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setShowAnswer(false);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-6 bg-emerald-500' : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Nhảy tới Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            currentSlide === totalSlides - 1 ? 'text-slate-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          <span>Slide Sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
