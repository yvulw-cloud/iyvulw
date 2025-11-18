"use client"

import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

export default function CaseAnalysisPage() {
  const [involvement, setInvolvement] = useState(20)

  // 슬라이더 값에 따른 판정
  const verdict =
    involvement < 30
      ? {
          label: "유효 (원칙)",
          desc: "단순 악의만으로는 이중매매 계약은 유효합니다.",
          color: "text-blue-600",
        }
      : involvement < 70
      ? {
          label: "위험구간",
          desc: "가담 정도가 높아질수록 반사회질서 무효 가능성 증가.",
          color: "text-yellow-600",
        }
      : {
          label: "103조 반사회질서 → 절대적 무효",
          desc: "매도인의 배임행위에 적극 가담 → 계약 무효 + 전득자도 보호 X",
          color: "text-red-600",
        }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-20">

        {/* =================================== */}
        {/* 🔷 상단 헤더 */}
        {/* =================================== */}
        <section className="mb-16 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            Project · Case Law Analysis
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            부동산 이중매매 판례 분석 (대법원 96다29151)
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            제2매수인의 ‘적극가담’ 여부를 기준으로 이중매매가<br/>
            민법 제103조 반사회질서 법률행위로 무효인지 판단한 대표 판례입니다.<br/>
            해당 무효는 ‘절대적 무효’로, 선의의 제3자조차 보호되지 않습니다.
          </p>
        </section>

        {/* =================================== */}
        {/* 🔷 이중매매 도식화 */}
        {/* =================================== */}
        <section className="bg-gray-50 rounded-2xl shadow-sm p-8 mb-20">
          <h2 className="text-lg font-semibold text-center mb-6">
            🏠 부동산 이중매매 구조 도식화
          </h2>

          <div className="grid grid-cols-3 gap-6 text-center">

            <div className="p-4 bg-white shadow-sm rounded-xl">
              <p className="font-semibold">제1매수인</p>
              <p className="text-xs text-muted-foreground">최초 매매 계약 체결</p>
            </div>

            <div className="p-4 bg-white shadow-sm rounded-xl">
              <p className="font-semibold">매도인</p>
              <p className="text-xs text-muted-foreground">배임행위 (1차 매수인에게 등기 X)</p>
            </div>

            <div className="p-4 bg-white shadow-sm rounded-xl">
              <p className="font-semibold">제2매수인</p>
              <p className="text-xs text-muted-foreground">적극가담 여부 판단</p>
            </div>

          </div>

          <div className="flex justify-between mt-6 text-xs text-muted-foreground">
            <span>1차 매매 계약</span>
            <span>배임적 이중매도</span>
            <span>가담 여부 → 법적 효력 결정</span>
          </div>
        </section>


          {/* ➡ 설명 카드 */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm leading-relaxed">
            <h3 className="text-base font-semibold mb-3">📌 왜 가담 정도가 중요한가?</h3>
            <p className="text-sm text-muted-foreground">
              대법원은 이중매매 자체는 원칙적으로 유효라고 보지만,
              제2매수인이 매도인의 배임행위에 적극 가담하면  
              <strong>민법 제103조의 반사회질서 법률행위</strong>가 되어 절대적 무효가 됩니다.
            </p>
          </div>


        {/* =================================== */}
        {/* 🔷 분석 요약 */}
        {/* =================================== */}
        <section
          className="
            bg-gray-50 p-8 rounded-xl shadow-sm leading-relaxed
            text-sm sm:text-base text-justify max-w-4xl mx-auto mb-20
          "
        >
          <h3 className="text-xl font-semibold mb-4">📌 분석 요약</h3>

          <p>
            대법원 96다29151 판결은 이중매매의 효력 판단에서  
            제2매수인의 ‘적극가담’을 핵심 요건으로 제시하였다.
            단순한 악의만으로는 무효가 되지 않지만,
            매도인의 배임행위를 유도·공모한 경우  
            해당 계약은 사회질서에 명백히 반하여 <strong>절대적 무효</strong>가 된다.
          </p>

          <p className="mt-4">
            절대적 무효이므로, 이후 이를 취득한 제3자(전득자)가  
            선의였더라도 소유권을 취득할 수 없다.  
            이는 경제적 거래 안전보다 사회 정의·신의칙을 우선한 법리로 평가된다.
          </p>
        </section>

        {/* =================================== */}
        {/* 🔷 절대적 무효 vs 상대적 무효 */}
        {/* =================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          
          <div className="bg-white border rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">❗ 절대적 무효 (103조)</h3>
            <ul className="text-sm list-disc list-inside space-y-2">
              <li>반사회질서 법률행위</li>
              <li>누구에게도 효력 없음</li>
              <li>선의의 제3자도 보호 X</li>
              <li>전득자 소유권 취득 불가</li>
              <li>사회질서·정의 원칙 우선</li>
            </ul>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">⭕ 상대적 무효 (예: 허위표시)</h3>
            <ul className="text-sm list-disc list-inside space-y-2">
              <li>의사표시 하자 관련 무효</li>
              <li>선의의 제3자는 보호</li>
              <li>당사자 간에서만 무효</li>
              <li>공시 제도 안정성 고려</li>
            </ul>
          </div>

        </section>

        {/* =================================== */}
        {/* 🔷 용어 정리 */}
        {/* =================================== */}
        <section
          className="
            bg-gray-50 p-8 rounded-xl shadow-sm leading-relaxed
            text-sm sm:text-base text-justify max-w-4xl mx-auto mb-24
          "
        >
          <h3 className="text-lg font-semibold mb-4">📚 용어 정리</h3>

          <div className="space-y-4">
            <div>
              <p className="font-semibold">• 이중매매</p>
              <p>한 부동산을 두 명에게 연속적으로 매매하는 행위.</p>
            </div>

            <div>
              <p className="font-semibold">• 적극가담</p>
              <p>매도인의 배임행위를 유도·권유·공모하며 적극 참여한 경우.</p>
            </div>

            <div>
              <p className="font-semibold">• 반사회질서 법률행위 (103조)</p>
              <p>사회 정의·신의칙에 반하는 법률행위로 절대적 무효.</p>
            </div>

            <div>
              <p className="font-semibold">• 절대적 무효</p>
              <p>제3자 포함 누구에게도 효력 없음. 전득자 불인정.</p>
            </div>

            <div>
              <p className="font-semibold">• 상대적 무효</p>
              <p>당사자간에만 무효. 선의의 제3자는 권리 보호.</p>
            </div>
          </div>
        </section>

        {/* 돌아가기 버튼 */}
        <div className="flex justify-center mb-20">
          <a
            href="/#projects"
            className="
              px-5 py-2 bg-[#11126A] text-white rounded-full
              text-sm sm:text-base shadow-sm hover:bg-[#0d0f5a] transition-all
            "
          >
            ← 포트폴리오로 돌아가기
          </a>
        </div>

      </div>
    </main>
  )
}
