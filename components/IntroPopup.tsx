"use client"

import { useEffect, useState } from "react"

// 🔹 여기 문장만 수정하면 됨!
const introLines: string[] = [
  "안녕하세요, 김민아의 포트폴리오입니다.",
  "도시계획·부동산 프로젝트들을 요약해두었어요.",
  "DSR 규제, 거시경제-주택금융 분석, 오리역 개발 제안 등이 포함됩니다.",
  "사진 동아리 활동과 답사 기록도 있습니다.",
  "방문해 주셔서 감사합니다 :)",
]

export function IntroPopup() {
  const [isOpen, setIsOpen] = useState(true) 
  // 🔥 기본값 true → 새로 들어오면 항상 뜸

  const handleClose = () => {
    setIsOpen(false) 
    // 🔥 localStorage 저장 ❌
    // 새로 들어오면 다시 뜨게 만들기 위해서!
  }

  if (!isOpen) return null

  return (
    <div
      className="
        fixed top-4 left-4 z-[99999]
        w-full max-w-sm
        px-4 py-4
        bg-white/95 backdrop-blur
        border border-gray-200
        rounded-2xl shadow-xl
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

      <h3 className="font-semibold mb-2 text-gray-900">간단한 안내 👋</h3>

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

export default IntroPopup
