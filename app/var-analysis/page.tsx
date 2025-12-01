"use client"

import { useState, useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

const IRF_PRICE = {
  mort: [-0.67, -0.8, 0.7, 0, 0, 0, 0],
  infl: [-0.13, -0.26, 0.30, 0, 0, 0, 0],
  kospi: [0.00, 0.02, 0.00, 0, 0, 0, 0],
}

const IRF_VOLUME = {
  mort: [-0.47, -0.5, -1.1, 0, 0, 0, 0],
  infl: [-1.95, -1.9, -0.4, 0, 0, 0, 0],
  kospi: [0.00, 0.02, -0.01, 0, 0, 0, 0],
}

export default function VarAnalysisPage() {
  const [mortShock, setMortShock] = useState(0)
  const [inflShock, setInflShock] = useState(0)
  const [kospiShock, setKospiShock] = useState(0)

  const data = useMemo(() => {
    return IRF_PRICE.mort.map((_, lag) => ({
      lag,
      price:
        IRF_PRICE.mort[lag] * mortShock +
        IRF_PRICE.infl[lag] * inflShock +
        IRF_PRICE.kospi[lag] * kospiShock,

      volume:
        IRF_VOLUME.mort[lag] * mortShock +
        IRF_VOLUME.infl[lag] * inflShock +
        IRF_VOLUME.kospi[lag] * kospiShock,
    }))
  }, [mortShock, inflShock, kospiShock])

  const priceLag1 = data[1].price.toFixed(2)
  const priceLag2 = data[2].price.toFixed(2)
  const volLag1 = data[1].volume.toFixed(2)
  const volLag2 = data[2].volume.toFixed(2)

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* =============== 상단 제목 =============== */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          거시경제 변수가 주택시장에 미치는 시차적 영향 분석
        </h1>

        <p className="text-muted-foreground mb-10 text-sm sm:text-base leading-relaxed">
          주택담보대출금리, 물가상승률, 코스피지수가 주택매매가격과 거래량에 미치는 영향을 VAR 모형으로 분석한 페이지입니다.
          <br />
          좌측 슬라이더를 통해 변수별 충격(Shock)을 조절하여 각 변수에 대한 주택시장의 반응(IRF)을 확인할 수 있습니다.
        </p>
      </div>

      {/* ================== 본문 레이아웃 ================== */}
      <div className="max-w-5xl mx-auto px-4">
        <section className="grid grid-cols-1 md:grid-cols-[330px_1fr] gap-14">

          {/* ---------------- 좌측 컨트롤 ---------------- */}
          <div className="space-y-8">

            <div className="border border-muted-foreground/20 p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3">주택담보대출금리 충격</h3>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.1}
                value={mortShock}
                onChange={(e) => setMortShock(parseFloat(e.target.value))}
                className="w-full accent-[#11126A]"
              />
              <p className="text-sm text-muted-foreground mt-2">
                충격: <b>{mortShock.toFixed(1)}%p</b>
              </p>
            </div>

            <div className="border border-muted-foreground/20 p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3">물가상승률 충격</h3>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.1}
                value={inflShock}
                onChange={(e) => setInflShock(parseFloat(e.target.value))}
                className="w-full accent-[#11126A]"
              />
              <p className="text-sm text-muted-foreground mt-2">
                충격: <b>{inflShock.toFixed(1)}%p</b>
              </p>
            </div>

            <div className="border border-muted-foreground/20 p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3">코스피 수익률 충격</h3>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.1}
                value={kospiShock}
                onChange={(e) => setKospiShock(parseFloat(e.target.value))}
                className="w-full accent-[#11126A]"
              />
              <p className="text-sm text-muted-foreground mt-2">
                충격: <b>{kospiShock.toFixed(1)}%</b>
              </p>
            </div>

          </div>

          {/* ---------------- 우측 그래프 ---------------- */}
          <div className="space-y-12">

            <div className="border border-muted-foreground/20 rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold mb-2">매매가격지수 IRF</h2>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lag" label={{ value: "시차 (Lag)", position: "insideBottom", offset: -5 }} />
                    <YAxis tickFormatter={(v) => `${v}%`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#11126A" dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border border-muted-foreground/20 rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold mb-2">매매거래량 IRF</h2>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lag" label={{ value: "시차 (Lag)", position: "insideBottom", offset: -5 }} />
                    <YAxis tickFormatter={(v) => `${v}%`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="volume" stroke="#22c55e" dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </section>
      </div>

      {/* ======================= 분석 요약 ======================= */}
      <section className="mt-12 mb-12 bg-gray-50 p-8 rounded-xl shadow-sm leading-relaxed text-sm sm:text-base max-w-4xl mx-auto">        <h3 className="text-xl font-semibold mb-4">📌 분석 요약</h3>

        <p className="mb-4">
          본 연구는 벡터자기회귀(VAR) 모형을 활용하여 주담대금리, 물가상승률, 코스피지수가
          주택매매가격지수와 매매거래량에 미치는 시차적 영향을 분석하였다.
          충격반응함수(IRF)를 통해 거시 변수 변화가 시간이 흐르며 주택시장에 어떤 영향을 주는지 확인할 수 있다.
        </p>

        <p className="mb-4">
          충격(Shock)은 %(p) 단위의 외생적 변화이며, Lag는 충격 이후 경과한 기간을 의미한다.
        </p>
      </section>

      {/* ======================= 용어 정리 ======================= */}
      <section className="mb-24 bg-gray-50 pt-6 pb-8 px-8 rounded-xl shadow-sm text-sm sm:text-base max-w-4xl mx-auto leading-relaxed">
        <h3 className="text-lg font-semibold mb-4">📚 용어 정리</h3>

        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="font-semibold whitespace-nowrap">IRF(충격반응함수)</span>
            <span className="text-muted-foreground">어떤 변수에 1단위 충격이 발생했을 때 다른 변수가 시차별로 어떻게 반응하는지를 나타내는 함수</span>
          </li>

          <li className="flex gap-2">
            <span className="font-semibold whitespace-nowrap">충격(Shock)</span>
            <span className="text-muted-foreground">모형 내 특정 변수에 주어지는 외생적 변화</span>
          </li>

          <li className="flex gap-2">
            <span className="font-semibold whitespace-nowrap">거시경제 변수</span>
            <span className="text-muted-foreground">경제 전체의 흐름을 설명하는 광범위한 변수들</span>
          </li>

          <li className="flex gap-2">
            <span className="font-semibold whitespace-nowrap">시차(Lag)</span>
            <span className="text-muted-foreground">충격 이후 경과한 기간</span>
          </li>
        </ul>
      </section>

      <div className="flex flex-col items-center gap-3 mt-10 mb-20">
        {/* PDF 다운로드 버튼 */}
        <a
          href="/pdf/var.pdf"
          download="거시경제변수와 주택시장 간의 상관관계 분석.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-full transition-colors"
        >
          📄 PDF 다운로드
        </a>

        {/* 포트폴리오 돌아가기 버튼 */}
        <a
          href="/#projects"
          className="px-5 py-2 bg-[#11126A] text-white rounded-full"
        >
          ← 포트폴리오로 돌아가기
        </a>
      </div>
    </main>
  )
}
