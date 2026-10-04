import React, { useState } from 'react';
import { TIME_STATIONS } from '../data/lessonData';
import { GroupScore } from '../types';
import { sound } from '../utils/sound';
import { 
  History, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  MessageSquare, 
  Lightbulb, 
  HelpCircle, 
  Pill, 
  Award, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface TimeMachineTimelineProps {
  groups: GroupScore[];
  onAwardGroup: (groupId: number, points: number) => void;
  onProceedToDebate: () => void;
}

export const TimeMachineTimeline: React.FC<TimeMachineTimelineProps> = ({
  groups,
  onAwardGroup,
  onProceedToDebate,
}) => {
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [showDiscussionHints, setShowDiscussionHints] = useState(false);
  const [showDiscussionKey, setShowDiscussionKey] = useState(false);

  const currentStation = TIME_STATIONS[activeStationIndex];

  const handleSelectStation = (idx: number) => {
    setActiveStationIndex(idx);
    setShowDiscussionHints(false);
    setShowDiscussionKey(false);
    sound.playTick();
  };

  const getStationBadgeColor = (id: number) => {
    switch (id) {
      case 1:
        return 'from-red-600 to-rose-700 text-white';
      case 2:
        return 'from-amber-600 to-orange-700 text-white';
      case 3:
        return 'from-blue-600 to-indigo-700 text-white';
      case 4:
        return 'from-emerald-600 to-teal-700 text-white';
      default:
        return 'from-slate-700 to-slate-900 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-indigo-700/40 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/30 mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Phần 2: Thuyết trình tương tác (30 Phút)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 font-serif-display">
            CỖ MÁY THỜI GIAN Y TẾ VIỆT NAM (80 NĂM)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hành trình lịch sử qua <strong>4 Trạm dừng chân cốt lõi</strong>: Từ tư tưởng nền móng của Chủ tịch Hồ Chí Minh (1945), qua cơ chế Bao cấp (1960-1976), bước nhảy vọt Đổi mới Xã hội hóa (1986-2001), đến bước ngoặt Nghị quyết 46/NQ-TW (2005) định vị ngành Dược thành ngành kinh tế mũi nhọn.
          </p>
        </div>
      </div>

      {/* Interactive 4-Station Timeline Track */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
          {TIME_STATIONS.map((station, idx) => {
            const isActive = activeStationIndex === idx;
            const isPassed = activeStationIndex > idx;

            return (
              <button
                key={station.id}
                onClick={() => handleSelectStation(idx)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white border-slate-900 shadow-lg ring-2 ring-emerald-500/30 scale-[1.01]'
                    : isPassed
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800 hover:bg-emerald-50'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                      isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {station.stageName}
                    </span>
                    <span className={`text-xs font-bold ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {station.timeRange}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {station.title}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs">
                  <span className={`text-[11px] truncate max-w-[170px] ${isActive ? 'text-emerald-300' : 'text-slate-500'}`}>
                    {station.theme}
                  </span>
                  <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Station Presentation Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
        {/* Station Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase bg-gradient-to-r ${getStationBadgeColor(currentStation.id)}`}>
                {currentStation.stageName} • {currentStation.timeRange}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif-display">
              {currentStation.title}
            </h3>
            <p className="text-slate-600 font-medium text-sm mt-0.5">
              {currentStation.theme}
            </p>
          </div>

          {/* Station Stepper Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectStation(Math.max(0, activeStationIndex - 1))}
              disabled={activeStationIndex === 0}
              className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition cursor-pointer ${
                activeStationIndex === 0 ? 'text-slate-300 border-slate-200 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-100 border-slate-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Trạm trước</span>
            </button>
            <button
              onClick={() => handleSelectStation(Math.min(TIME_STATIONS.length - 1, activeStationIndex + 1))}
              disabled={activeStationIndex === TIME_STATIONS.length - 1}
              className={`p-2.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition cursor-pointer ${
                activeStationIndex === TIME_STATIONS.length - 1 ? 'text-slate-300 border-slate-200 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 border-slate-900'
              }`}
            >
              <span className="hidden sm:inline">Trạm sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Core Keywords / Takeaways */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Nội dung Keyword Cốt Lõi (Đặc biệt không dài dòng)</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {currentStation.keyPoints.map((point, pIdx) => {
              const [head, ...rest] = point.split(':');
              return (
                <div
                  key={pIdx}
                  className="p-4 bg-slate-50 hover:bg-emerald-50/40 rounded-2xl border border-slate-200 transition flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {pIdx + 1}
                  </span>
                  <div>
                    {rest.length > 0 ? (
                      <>
                        <strong className="text-slate-900 text-sm font-bold block mb-0.5">{head}</strong>
                        <span className="text-slate-600 text-xs sm:text-sm leading-relaxed">{rest.join(':')}</span>
                      </>
                    ) : (
                      <span className="text-slate-800 text-sm font-medium leading-relaxed">{point}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historical Quote (if any) */}
        {currentStation.quote && (
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <span className="text-3xl text-amber-500 font-serif leading-none mt-1">“</span>
            <div>
              <p className="text-slate-800 italic text-sm sm:text-base font-serif leading-relaxed">
                {currentStation.quote.text}
              </p>
              <div className="text-xs text-amber-900 font-bold mt-1.5">
                — {currentStation.quote.author} ({currentStation.quote.source})
              </div>
            </div>
          </div>
        )}

        {/* Context & Impact on Pharmacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <History className="w-4 h-4 text-slate-500" />
              <span>Bối cảnh Lịch sử</span>
            </h5>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {currentStation.historicalContext}
            </p>
          </div>

          <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200">
            <h5 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-teal-600" />
              <span>Góc nhìn &amp; Tác động đến Ngành Dược</span>
            </h5>
            <p className="text-teal-900 text-xs sm:text-sm leading-relaxed">
              {currentStation.pharmaImpact}
            </p>
          </div>
        </div>

        {/* Special Interactive Discussion Box (Specifically for Tram 2: Bao cap) */}
        {currentStation.discussionQuestion && (
          <div className="mt-4 p-5 sm:p-6 bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-slate-50 border-2 border-amber-300 rounded-3xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500 text-white rounded-xl">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                    Câu hỏi tương tác ngắn cho cả lớp (Trọng tâm)
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    {currentStation.discussionQuestion.question}
                  </h4>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 italic">
              {currentStation.discussionQuestion.context}
            </p>

            {/* Toggle Gợi ý & Đáp án */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowDiscussionHints(!showDiscussionHints)}
                className="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>{showDiscussionHints ? 'Ẩn gợi ý' : 'Mở 5 gợi ý thảo luận'}</span>
              </button>

              <button
                onClick={() => setShowDiscussionKey(!showDiscussionKey)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{showDiscussionKey ? 'Ẩn giải mã kinh tế' : 'Xem chốt hạ kinh tế y tế'}</span>
              </button>
            </div>

            {/* Hints list */}
            {showDiscussionHints && (
              <div className="p-4 bg-white rounded-2xl border border-amber-200 text-xs sm:text-sm space-y-2 animate-fadeIn">
                <div className="font-bold text-slate-800">5 Gợi ý then chốt để Giảng viên gợi mở cho sinh viên:</div>
                <ul className="space-y-1.5 text-slate-700">
                  {currentStation.discussionQuestion.hints.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Teacher Answer Key */}
            {showDiscussionKey && (
              <div className="p-4 bg-gradient-to-r from-emerald-950 to-teal-950 text-white rounded-2xl border border-emerald-500/40 text-xs sm:text-sm animate-fadeIn">
                <div className="text-emerald-400 font-bold uppercase text-[11px] mb-1">
                  Đúc kết từ góc nhìn Kinh tế Dược:
                </div>
                <p className="text-emerald-100 leading-relaxed font-medium">
                  {currentStation.discussionQuestion.teacherAnswerKey}
                </p>
              </div>
            )}

            {/* Award Points to active answering groups */}
            <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Cộng điểm đóng góp câu trả lời:</span>
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => {
                      onAwardGroup(group.id, 10);
                      sound.playCorrect();
                    }}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white hover:bg-amber-500 hover:text-white text-slate-700 border border-amber-200 shadow-2xs transition"
                  >
                    <span>{group.avatar} {group.name}</span>
                    <span className="text-amber-600 hover:text-white ml-1">+10</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Special Tram 4: Chốt hạ ý tưởng cốt lõi */}
        {currentStation.id === 4 && (
          <div className="p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl border border-emerald-600/50 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Chốt hạ ý nghĩa lịch sử (Lời Giảng viên)
              </span>
            </div>
            <p className="text-emerald-100 text-base sm:text-lg font-serif italic leading-relaxed">
              "Nghị quyết 46/NQ-TW năm 2005 chính là bước ngoặt vĩ đại: Biến Y tế từ một <strong>'ngành tiêu tiền'</strong> thành <strong>'đầu tư cho sự phát triển bền vững'</strong>. Đây cũng là lúc ngành Dược của các em bắt đầu bùng nổ thành một <strong>ngành kinh tế - kỹ thuật mũi nhọn</strong> của đất nước!"
            </p>
          </div>
        )}

        {/* Station Navigation Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => handleSelectStation(Math.max(0, activeStationIndex - 1))}
            disabled={activeStationIndex === 0}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
              activeStationIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ← Trạm trước
          </button>

          <span className="text-xs font-semibold text-slate-400">
            Trạm {activeStationIndex + 1} / {TIME_STATIONS.length}
          </span>

          {activeStationIndex < TIME_STATIONS.length - 1 ? (
            <button
              onClick={() => handleSelectStation(activeStationIndex + 1)}
              className="text-xs font-bold px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              Tiếp tục Trạm {activeStationIndex + 2} →
            </button>
          ) : (
            <button
              onClick={onProceedToDebate}
              className="text-xs font-bold px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Vào Phần 3: Thảo luận Góc nhìn Dược sĩ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
