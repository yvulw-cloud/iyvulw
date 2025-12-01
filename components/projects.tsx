"use client"

import Link from "next/link"
import { EditableText } from "@/components/editable/editable-text"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

export function Projects() {

  const { saveData } = useInlineEditor()

  const handleChange = (key: string, value: string) => {
    saveData(key, value)
  }

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
            <EditableText
              value="Projects"
              storageKey="projects-title"
              onChange={(v) => handleChange("projects-title", v)}
            />
          </h2>

          {/* 안내 문구 */}
          <p className="text-sm text-gray-500 max-w-[600px] mx-auto text-center mb-10">
            학부 과정에서 수행한 프로젝트들을 핵심 흐름이 잘 보이도록 재구성했습니다.
            <br />각 카드를 통해 분석 과정과 내용을 살펴볼 수 있습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

            {/* 1. DSR 정책 */}
            <div className="border border-black/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold mb-2">
                <EditableText
                  value="📈DSR 정책이 주택금융시장에 미치는 영향 분석"
                  storageKey="proj-dsr-title"
                  onChange={(v) => handleChange("proj-dsr-title", v)}
                />
              </h3>

              <p className="text-sm text-muted-foreground mb-6">
                <EditableText
                  value="DSR규제가 주택금융시장에 미친 영향을 시계열 데이터로 분석·시각화한 프로젝트입니다."
                  storageKey="proj-dsr-desc"
                  multiline
                  onChange={(v) => handleChange("proj-dsr-desc", v)}
                />
              </p>

              <Link
                href="/dsr-chart"
                className="px-5 py-2 rounded-full bg-[#11126A] text-white hover:bg-[#0e0f5a] transition-all"
              >
                <EditableText
                  value="분석 결과 보기"
                  storageKey="proj-dsr-btn"
                  onChange={(v) => handleChange("proj-dsr-btn", v)}
                />
              </Link>
            </div>

            {/* 2. VAR 분석 */}
            <div className="border border-black/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold mb-2">
                <EditableText
                  value="📊거시경제 변수가 주택시장에 미치는 시차적 영향 분석"
                  storageKey="proj-var-title"
                  onChange={(v) => handleChange("proj-var-title", v)}
                />
              </h3>

              <p className="text-sm text-muted-foreground mb-6">
                <EditableText
                  value="거시경제변수가 주택시장에 미치는 영향을 VAR 모형으로 분석한 프로젝트입니다."
                  storageKey="proj-var-desc"
                  multiline
                  onChange={(v) => handleChange("proj-var-desc", v)}
                />
              </p>

              <Link
                href="/var-analysis"
                className="px-5 py-2 rounded-full bg-[#11126A] text-white hover:bg-[#0e0f5a] transition-all"
              >
                <EditableText
                  value="분석 결과 보기"
                  storageKey="proj-var-btn"
                  onChange={(v) => handleChange("proj-var-btn", v)}
                />
              </Link>
            </div>

            {/* 3. 분당 재건축 */}
            <div className="border border-black/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold mb-2">
                <EditableText
                  value="🏙️오리역 역세권 제4테크노밸리 개발 제안"
                  storageKey="proj-ori-title"
                  onChange={(v) => handleChange("proj-ori-title", v)}
                />
              </h3>

              <p className="text-sm text-muted-foreground mb-6">
                <EditableText
                  value="오리역 역세권 제4테크노밸리의 개발 방향과 공간 조성 방안을 제안한 프로젝트입니다."
                  storageKey="proj-ori-desc"
                  multiline
                  onChange={(v) => handleChange("proj-ori-desc", v)}
                />
              </p>

              <Link
                href="/ori"
                className="px-5 py-2 rounded-full bg-[#11126A] text-white hover:bg-[#0e0f5a] transition-all"
              >
                <EditableText
                  value="분석 결과 보기"
                  storageKey="proj-ori-btn"
                  onChange={(v) => handleChange("proj-redev-btn", v)}
                />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </EditableBackground>
  )
}
