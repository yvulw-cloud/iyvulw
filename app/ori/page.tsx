"use client"

import Image from "next/image"
import { useState } from "react"

export default function OriPage() {
  const [active, setActive] = useState<number | null>(null)

  const items = [
    { id: 1, label: "신분당선 동천역 연계 통한 광역교통환승 시스템 구축", top: "85%", left: "30%" },
    { id: 2, label: "국내외 첨단 산업 기업, 첨단기술연구소", top: "45%", left: "26%" },
    { id: 3, label: "기존 오리역 상권 활성화", top: "40%", left: "40%" },
    { id: 4, label: "미술관·음악홀 등 복합문화시설", top: "18%", left: "50%" },
    { id: 5, label: "주거형 오피스텔, 주상복합 단지", top: "40%", left: "65%" },
    { id: 6, label: "스타트업 센터, 창업교육센터", top: "63%", left: "73%" },
    { id: 7, label: "기존 농수산물센터 포함 쇼핑몰·영화관 등", top: "70%", left: "50%" },
  ]

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">


      {/* 제목 */}
      <h1 className="text-3xl font-bold text-center mb-6">
        오리역 역세권 제4테크노벨리 개발 제안
      </h1>

      <p className="text-center text-muted-foreground mb-10 leading-relaxed text-sm sm:text-base">
        성남시 제4테크노밸리 개발 목표(고밀주거·복합문화·첨단산업)를 기반으로
        주요 기능을 재배치해 직접 구성한 조감도입니다.  <br />각 번호를 클릭하여 위치별 세부사항을 확인하실 수 있습니다.

      </p>

      <section className="max-w-4xl mx-auto mt-16 mb-12 px-4">
        <h2 className="text-xl font-bold text-center mb-6">
          비전 및 목표
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* 카드 1 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
            <div className="text-2xl mb-2">🏙️</div>
            <h3 className="font-semibold text-sm mb-1">고밀복합주거</h3>
            <p className="text-xs text-muted-foreground">
              역세권 기반 주거복합 개발,다양한 주거환경 제공
            </p>
          </div>

          {/* 카드 2 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
            <div className="text-2xl mb-2">🎭</div>
            <h3 className="font-semibold text-sm mb-1">복합문화공간</h3>
            <p className="text-xs text-muted-foreground">
              문화복합시설 및 다양한 문화콘텐츠
            </p>
          </div>

          {/* 카드 3 */}
          <div className="rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
            <div className="text-2xl mb-2">🧬</div>
            <h3 className="font-semibold text-sm mb-1">첨단산업단지</h3>
            <p className="text-xs text-muted-foreground">
              4차 첨단산업 기능 도입, 자족도시 기능 확보
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"></div>
        <h2 className="text-xl font-bold text-center mb-2">
          조감도
        </h2>

        {/* 이미지 + 핫스팟 */}
        <div className="relative w-full max-w-5xl mx-auto">

          <Image
            src="/uploads/oride.jpeg"
            alt="오리역 개발 개념도"
            width={1600}
            height={1000}
            className="rounded-xl shadow-md"
          />

          {/* 핫스팟 + 툴팁 */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute"
              style={{
                top: item.top,
                left: item.left,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActive(item.id)}
              onMouseLeave={() => setActive(null)}
            >
              {/* 🔵 숫자 원형 마커 */}
              <div className="
  w-6 h-6
  flex items-center justify-center
  bg-[#11126A]
  text-white text-xs font-bold
  rounded-full
  shadow-md
  cursor-pointer
  border-2 border-white z-10">
                {item.id}
              </div>


              {/* 🟣 점 아래 툴팁 (직사각형 + 회색) */}
              {active === item.id && (
                <div
                  className="
      absolute left-1/2 -translate-x-1/2 mt-[3px] 
      bg-white text-black text-sm font-semibold
      px-4 py-3 whitespace-nowrap
      border border-gray-400 
      shadow-sm z-[999]">
                  {item.label}
                </div>
              )}
            </div>
          ))}

        </div>

        <div className="w-full text-center mt-2">
          <span className="text-xs text-gray-400">
            ※ 본 조감도는 성남시 공식 발표 자료를 바탕으로 재해석한 자료입니다.
          </span>
        </div>

      </section>

      <div className="flex flex-col items-center gap-3">

        {/* PDF 다운로드 버튼 */}
        <a
          href="/pdf/oridev.pdf"
          download="oridev.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-full transition-colors"
        >
          📄 PDF 다운로드
        </a>

        {/* 돌아가기 버튼 */}
        <a
          href="/#projects"
          className="px-5 py-2 bg-[#11126A] text-white rounded-full"
        >
          ← 포트폴리오로 돌아가기
        </a>
      </div>
    </div>
  )
}
