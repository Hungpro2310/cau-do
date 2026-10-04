import React, { useState } from 'react';
import { GroupScore } from '../types';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Trophy, Bell, Plus, Minus, RotateCcw, Award, Users, Edit2, Check } from 'lucide-react';

interface ScoreBoardProps {
  groups: GroupScore[];
  onUpdateScore: (groupId: number, delta: number) => void;
  onRenameGroup: (groupId: number, newName: string) => void;
  onResetScores: () => void;
  onTriggerBuzzer: (groupId: number) => void;
  onResetBuzzer: () => void;
  firstBuzzerGroupId: number | null;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  groups,
  onUpdateScore,
  onRenameGroup,
  onResetScores,
  onTriggerBuzzer,
  onResetBuzzer,
  firstBuzzerGroupId,
}) => {
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [tempName, setTempName] = useState('');

  // Find leading group
  const highestScore = Math.max(...groups.map((g) => g.score));
  const hasLeader = highestScore > 0;

  const handleAddScore = (id: number, delta: number) => {
    onUpdateScore(id, delta);
    if (delta > 0) {
      sound.playCorrect();
      if (delta >= 10) {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.65 },
        });
      }
    }
  };

  const handleBuzzerClick = (id: number) => {
    onTriggerBuzzer(id);
    sound.playBuzzer();
  };

  const startRename = (group: GroupScore) => {
    setEditingGroupId(group.id);
    setTempName(group.name);
  };

  const saveRename = (groupId: number) => {
    if (tempName.trim()) {
      onRenameGroup(groupId, tempName.trim());
    }
    setEditingGroupId(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 transition-all no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
              Bảng Điểm Tương Tác 4 Nhóm
              <span className="text-xs font-normal text-slate-500">
                (Thi đua phản xạ &amp; tranh biện)
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Nhấn <strong>Bấm chuông</strong> để ghi nhận nhóm giơ tay/phản xạ nhanh nhất
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {firstBuzzerGroupId !== null && (
            <button
              onClick={() => {
                onResetBuzzer();
                sound.playTick();
              }}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1 transition"
              title="Đặt lại trạng thái chuông"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Xóa chuông</span>
            </button>
          )}

          <button
            onClick={() => {
              if (window.confirm('Thầy/Cô có muốn đặt lại toàn bộ điểm số về 0 điểm không?')) {
                onResetScores();
                onResetBuzzer();
              }
            }}
            className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 transition flex items-center gap-1"
            title="Đặt lại toàn bộ điểm số"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Khởi tạo lại điểm</span>
          </button>
        </div>
      </div>

      {/* 4 Group Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
        {groups.map((group) => {
          const isBuzzerWinner = firstBuzzerGroupId === group.id;
          const isLeader = hasLeader && group.score === highestScore;

          return (
            <div
              key={group.id}
              className={`relative rounded-xl border p-3.5 transition-all ${
                isBuzzerWinner
                  ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                  : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Leader Ribbon */}
              {isLeader && (
                <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>DẪN ĐẦU</span>
                </div>
              )}

              {/* Header: Name + Edit */}
              <div className="flex items-center justify-between gap-1 mb-2">
                {editingGroupId === group.id ? (
                  <div className="flex items-center gap-1 w-full">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="text-xs px-1.5 py-0.5 border rounded w-full bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                      autoFocus
                    />
                    <button
                      onClick={() => saveRename(group.id)}
                      className="text-emerald-600 hover:text-emerald-700 p-0.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 group/edit">
                    <span className="text-base">{group.avatar}</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {group.name}
                    </span>
                    <button
                      onClick={() => startRename(group)}
                      className="opacity-0 group-hover/edit:opacity-100 text-slate-400 hover:text-slate-600 transition p-0.5"
                      title="Đổi tên nhóm"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Score Display */}
              <div className="flex items-baseline justify-between mb-3 bg-white p-2 rounded-lg border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Điểm tích lũy:</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {group.score} <span className="text-xs font-semibold text-emerald-600">điểm</span>
                </span>
              </div>

              {/* Buzzer Button */}
              <button
                onClick={() => handleBuzzerClick(group.id)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer mb-2.5 ${
                  isBuzzerWinner
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md animate-bounce'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 hover:border-slate-400 shadow-xs'
                }`}
              >
                <Bell className={`w-3.5 h-3.5 ${isBuzzerWinner ? 'text-white' : 'text-amber-500'}`} />
                <span>{isBuzzerWinner ? '🔔 GIƠ TAY NHANH NHẤT!' : 'Bấm Chuông Giành Quyền'}</span>
              </button>

              {/* Quick Score Adjustment Buttons */}
              <div className="grid grid-cols-4 gap-1 text-xs">
                <button
                  onClick={() => handleAddScore(group.id, 5)}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-1 rounded border border-emerald-200 transition"
                  title="Cộng 5 điểm"
                >
                  +5
                </button>
                <button
                  onClick={() => handleAddScore(group.id, 10)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 rounded transition shadow-xs"
                  title="Cộng 10 điểm (Đáp án chuẩn)"
                >
                  +10
                </button>
                <button
                  onClick={() => handleAddScore(group.id, 20)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 rounded transition shadow-xs"
                  title="Cộng 20 điểm (Xuất sắc / Tranh biện)"
                >
                  +20
                </button>
                <button
                  onClick={() => onUpdateScore(group.id, -5)}
                  className="bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 py-1 rounded border border-slate-200 transition"
                  title="Trừ 5 điểm (Bấm nhầm / Phạm quy)"
                >
                  -5
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
