"use client"

import { useEffect, useState } from "react"

// 🔹 안내 문구 리스트
const introLines: string[] = [
  "이 포트폴리오는 GitHub 템플릿을 기반으로, 필요한 기능과 UI를 직접 수정·구현하여 완성한 프로젝트입니다.",

  "✔️ Experience",
  "　활동 흐름을 한눈에 볼 수 있도록 타임라인 UI로 　재구성했습니다.",

  "✔️ Skills",
  "　숙련도를 직관적으로 확인할 수 있는 알약 　형태의 UI를 구현했습니다.",

  "✔️ Interests",
  "　관심사 버튼을 누르면 각 항목의 상세 설명이 　펼쳐지도록 제작했습니다.",

  "✔️ Projects",
  "　분석 과정과 결과를 시각화하고, 일부는 값을 　조정해 변화를 확인할 수 있도록 구현했습니다.",

  "✔️ Guestbook",
  "　Supabase 기반으로 메시지가 실제 서버에 　저장되는 방명록 기능을 구축했습니다.",

  "✔️ Visitor Guide",
  "　처음 방문하는 분들이 사이트 구조를 빠르게 　이해할 수 있도록 안내 팝업을 추가했습니다.",

  "궁금한 점은 포트폴리오에 기재된 연락처로 편하게 연락 주세요.",
]

// ----------------------------------------------------
// ✅ 팝업 컴포넌트 (default export)
// ----------------------------------------------------
export default function IntroPopup() {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => setIsOpen(false)

  if (!isOpen) return null

  return (
    <div
      className="
        fixed top-4 left-4 z-[99999]
        w-full max-w-xs px-4 py-8
        bg-white/98 border border-gray-200
        rounded-2xl shadow-2xl
        text-sm
      "
    >
      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-3 text-xs text-gray-400 hover:text-gray-700"
      >
        닫기 ✕
      </button>

      <h3 className="font-semibold mb-2 text-gray-900">
        방문해 주셔서 감사합니다👋🏻
      </h3>

      <div className="max-h-64 overflow-y-auto pr-1 text-gray-700 leading-relaxed">
        <ul className="space-y-1.5">
          {introLines.map((line, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-[3px] text-[10px] text-gray-400">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
