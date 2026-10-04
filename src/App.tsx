import React, { useState, useEffect } from 'react';
import { GroupScore } from './types';
import { LESSON_META } from './data/lessonData';
import { Header } from './components/Header';
import { ScoreBoard } from './components/ScoreBoard';
import { GameBlouseTrang } from './components/GameBlouseTrang';
import { TimeMachineTimeline } from './components/TimeMachineTimeline';
import { DebateSection } from './components/DebateSection';
import { SummaryTeaser } from './components/SummaryTeaser';
import { PresentationMode } from './components/PresentationMode';
import { TeacherNotesModal } from './components/TeacherNotesModal';
import { PrintHandout } from './components/PrintHandout';

const INITIAL_GROUPS: GroupScore[] = [
  {
    id: 1,
    name: 'Nhóm 1 (Tiên Phong)',
    avatar: '🩺',
    color: '#059669',
    score: 0,
    buzzTime: null,
    notes: [],
  },
  {
    id: 2,
    name: 'Nhóm 2 (Đông Tây Y)',
    avatar: '🌿',
    color: '#0284c7',
    score: 0,
    buzzTime: null,
    notes: [],
  },
  {
    id: 3,
    name: 'Nhóm 3 (Quản Lý Dược)',
    avatar: '💊',
    color: '#7c3aed',
    score: 0,
    buzzTime: null,
    notes: [],
  },
  {
    id: 4,
    name: 'Nhóm 4 (Dược Lâm Sàng)',
    avatar: '🔬',
    color: '#ea580c',
    score: 0,
    buzzTime: null,
    notes: [],
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [groups, setGroups] = useState<GroupScore[]>(() => {
    try {
      const saved = localStorage.getItem('blouse_trang_groups');
      return saved ? JSON.parse(saved) : INITIAL_GROUPS;
    } catch {
      return INITIAL_GROUPS;
    }
  });

  const [teacherName, setTeacherName] = useState<string>(() => {
    try {
      return localStorage.getItem('blouse_trang_teacher') || LESSON_META.defaultTeacher;
    } catch {
      return LESSON_META.defaultTeacher;
    }
  });

  const [firstBuzzerGroupId, setFirstBuzzerGroupId] = useState<number | null>(null);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [isTeacherNotesOpen, setIsTeacherNotesOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('blouse_trang_groups', JSON.stringify(groups));
    } catch {
      // ignore
    }
  }, [groups]);

  useEffect(() => {
    try {
      localStorage.setItem('blouse_trang_teacher', teacherName);
    } catch {
      // ignore
    }
  }, [teacherName]);

  const handleUpdateScore = (groupId: number, delta: number) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, score: Math.max(0, g.score + delta) } : g))
    );
  };

  const handleRenameGroup = (groupId: number, newName: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, name: newName } : g))
    );
  };

  const handleResetScores = () => {
    setGroups((prev) => prev.map((g) => ({ ...g, score: 0, buzzTime: null })));
  };

  const handleTriggerBuzzer = (groupId: number) => {
    if (firstBuzzerGroupId === null) {
      setFirstBuzzerGroupId(groupId);
    }
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, buzzTime: Date.now() } : g))
    );
  };

  const handleResetBuzzer = () => {
    setFirstBuzzerGroupId(null);
    setGroups((prev) => prev.map((g) => ({ ...g, buzzTime: null })));
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation & Lecture Master Controls */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenTeacherNotes={() => setIsTeacherNotesOpen(true)}
        onTogglePresentation={() => setIsPresentationOpen(true)}
        teacherName={teacherName}
        onUpdateTeacherName={setTeacherName}
      />

      {/* Main Classroom Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 no-print">
        {/* Interactive Scoreboard for 4 Groups */}
        <ScoreBoard
          groups={groups}
          onUpdateScore={handleUpdateScore}
          onRenameGroup={handleRenameGroup}
          onResetScores={handleResetScores}
          onTriggerBuzzer={handleTriggerBuzzer}
          onResetBuzzer={handleResetBuzzer}
          firstBuzzerGroupId={firstBuzzerGroupId}
        />

        {/* Phase 1: Khởi động - Trò chơi "Mật mã Blouse Trắng" (15 phút) */}
        {currentTab === 1 && (
          <GameBlouseTrang
            groups={groups}
            onAwardGroup={(id, pts) => handleUpdateScore(id, pts)}
            onProceedToTimeline={() => {
              setCurrentTab(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Phase 2: Cỗ máy thời gian Y tế Việt Nam 80 năm (30 phút) */}
        {currentTab === 2 && (
          <TimeMachineTimeline
            groups={groups}
            onAwardGroup={(id, pts) => handleUpdateScore(id, pts)}
            onProceedToDebate={() => {
              setCurrentTab(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Phase 3: Thảo luận tình huống - Góc nhìn Dược sĩ tương lai (35 phút) */}
        {currentTab === 3 && (
          <DebateSection
            groups={groups}
            onAwardGroup={(id, pts) => handleUpdateScore(id, pts)}
            onProceedToSummary={() => {
              setCurrentTab(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Phase 4: Tổng kết & Teaser Tiết 3-4 (10 phút) */}
        {currentTab === 4 && (
          <SummaryTeaser
            groups={groups}
            onAwardGroup={(id, pts) => handleUpdateScore(id, pts)}
            onOpenTeacherNotes={() => setIsTeacherNotesOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>Môn học:</strong> {LESSON_META.subject} • <strong>Bài giảng:</strong> {LESSON_META.title}
          </div>
          <div>
            Hệ thống hỗ trợ giảng dạy &amp; tranh biện tương tác cho sinh viên Dược khoa
          </div>
        </div>
      </footer>

      {/* Fullscreen Slide Presentation Mode Modal */}
      {isPresentationOpen && (
        <PresentationMode
          teacherName={teacherName}
          onClose={() => setIsPresentationOpen(false)}
        />
      )}

      {/* Teacher Pedagogical Notes Modal */}
      <TeacherNotesModal
        isOpen={isTeacherNotesOpen}
        onClose={() => setIsTeacherNotesOpen(false)}
        teacherName={teacherName}
      />

      {/* Clean printable handout for paper printouts */}
      <PrintHandout teacherName={teacherName} />
    </div>
  );
}
