"use client"

import Link from "next/link"
import { EditableText } from "@/components/editable/editable-text"
import { EditableBackground } from "@/components/editable/editable-background"

export function Projects() {
  return (
    <EditableBackground
      image=""
      video=""
      color=""
      opacity={0.1}
      storageKey="projects-background"
    >
      <section id="projects" className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* 섹션 제목 */}
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <EditableText value="Projects" storageKey="projects-title" />
          </h2>

          {/* 4개의 프로젝트 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

            {/* DSR 정책 효과 분석 시각화 */}
<div className="border border-black/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all">
  <h3 className="text-lg font-bold mb-2">
    <EditableText
      value="📈 DSR 정책 효과 분석"
      storageKey="proj-dsr-title"
    />
  </h3>

  <p className="text-sm text-muted-foreground mb-6">
    <EditableText
      value="가계대출 증가율 변화와 풍선효과를 시각적으로 확인할 수 있는 인터랙티브 그래프입니다."
      storageKey="proj-dsr-desc"
      multiline
    />
  </p>

  <Link
    href="/dsr-chart"
    className="px-5 py-2 rounded-full bg-[#11126A] text-white hover:bg-[#0e0f5a] transition-all"
  >
    <EditableText
      value="분석 결과 보기"
      storageKey="proj-dsr-btn"
    />
  </Link>
</div>

{/* VAR 거시경제–주택시장 상관관계 분석 */}
<div className="border border-black/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all">
  <h3 className="text-lg font-bold mb-2">
    <EditableText
      value="📊 VAR 기반 주택시장 반응 분석"
      storageKey="proj-var-title"
    />
  </h3>

  <p className="text-sm text-muted-foreground mb-6">
    <EditableText
      value="금리·물가·주가 변화가 주택매매가격과 거래량에 미치는 영향을 VAR 모형으로 분석한 페이지입니다."
      storageKey="proj-var-desc"
      multiline
    />
  </p>

  <Link
    href="/var-analysis"
    className="px-5 py-2 rounded-full bg-[#11126A] text-white hover:bg-[#0e0f5a] transition-all"
  >
    <EditableText
      value="분석 결과 보기"
      storageKey="proj-var-btn"
    />
  </Link>
</div>

{/* 3. 분당 재건축 회귀분석 */}
  <div className="border border-black/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all">
    <h3 className="text-lg font-bold mb-2">
      <EditableText
        value="🏙️ 분당 재건축 가격 회귀분석"
        storageKey="proj-redev-title"
      />
    </h3>
    <p className="text-sm text-muted-foreground mb-6">
      <EditableText
        value="노후계획도시특별법 이후, 재건축 단계별(안전진단·정비구역·조합인가·사업승인) 진입이 분당 아파트 가격에 미치는 영향을 회귀분석으로 정량 평가한 프로젝트입니다."
        storageKey="proj-redev-desc"
        multiline
      />
    </p>
    <Link
      href="/bundang-regression"
      className="px-5 py-2 rounded-full bg-[#11126A] text-white hover:bg-[#0e0f5a] transition-all"
    >
      <EditableText
        value="분석 결과 보기"
        storageKey="proj-redev-btn"
      />
    </Link>
  </div>

{/* 판례분석 */}
  <div className="border border-black/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all">
    <h3 className="text-lg font-bold mb-2">
      <EditableText
        value="⚖️ 판례분석"
        storageKey="proj-redev-title"
      />
    </h3>
    <p className="text-sm text-muted-foreground mb-6">
      <EditableText
        value="노후계획도시특별법 이후, 재건축 단계별(안전진단·정비구역·조합인가·사업승인) 진입이 분당 아파트 가격에 미치는 영향을 회귀분석으로 정량 평가한 프로젝트입니다."
        storageKey="proj-redev-desc"
        multiline
      />
    </p>
    <Link
      href="/case-analysis"
      className="px-5 py-2 rounded-full bg-[#11126A] text-white hover:bg-[#0e0f5a] transition-all"
    >
      <EditableText
        value="분석 결과 보기"
        storageKey="proj-redev-btn"
      />
    </Link>
  </div>
        </div>
        </div>
      </section> 

    </EditableBackground>  
  )
}

