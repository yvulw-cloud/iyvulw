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
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* 상단 제목 */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            거시경제 변수의 주택시장 영향에 대한 시차적 반응 분석
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            세 가지 거시 변수(주담대금리 ‧ 물가 ‧ 코스피)에 충격을 주고 IRF 반응을 확인할 수 있습니다.
          </p>
        </div>

        {/* 본문: 컨트롤 + 그래프 */}
        <section className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-14">

          {/* 좌측 컨트롤 */}
          <div className="space-y-10">

            {/* 주담대 */}
            <div className="border border-muted-foreground/20 p-6 rounded-2xl">
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

            {/* 물가 */}
            <div className="border border-muted-foreground/20 p-6 rounded-2xl">
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

            {/* 코스피 */}
            <div className="border border-muted-foreground/20 p-6 rounded-2xl">
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

          {/* 우측 그래프 */}
          <div className="space-y-12">

            {/* 매매가격 IRF */}
<div className="
  border border-muted-foreground/20
  rounded-2xl p-5 shadow-sm
  max-w-6xl mx-auto
">
              <h2 className="font-semibold mb-2">매매가격지수 IRF</h2>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="lag"
                      label={{ value: "시차 (Lag)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis tickFormatter={(v) => `${v}%`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#11126A" dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 매매거래량 IRF */}
<div className="
  border border-muted-foreground/20
  rounded-2xl p-5 shadow-sm
  max-w-6xl mx-auto
">
              <h2 className="font-semibold mb-2">매매거래량 IRF</h2>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="lag"
                      label={{ value: "시차 (Lag)", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis tickFormatter={(v) => `${v}%`} />
                    <Tooltip />
                    <Line type="monotone" dataKey="volume" stroke="#22c55e" dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </section>

        {/* ---- 분석 요약 (페이지 맨 아래 전체폭) ---- */}
<section
  className="
    mt-20
    bg-gray-50
    p-8
    rounded-xl
    shadow-sm
    leading-relaxed
    text-sm sm:text-base
    max-w-4xl mx-auto
    text-justify
  "
>
  <h3 className="text-xl font-semibold mb-4">📌 분석 요약</h3>

          <p className="mb-4">
            본 연구는 벡터자기회귀모형(VAR)을 활용하여
주택담보대출금리, 물가상승률, 코스피지수가
주택매매가격지수와 매매거래량에 미치는 시차적 영향을 분석하였다.
VAR 모형을 통해 각 변수의 과거 값이 서로에게 동태적으로 어떤 영향을 주는지 확인하고,
충격반응함수(IRF)를 활용하여 거시 변수에 충격이 가해졌을 때
주택시장이 시간 차를 두고 어떻게 반응하는지 시각적으로 검토하였다.
          </p>

          <p className="mb-4">
            충격(Shock)은 %p 단위 변화로 가정되며, Lag는 충격 시점 이후의 월(또는 분기)별 반응을 의미합니다.
          </p>

          <p>
            <b>그래프 해석 예시:</b><br />
            예를 들어, 주담대금리를 +0.1%p 올리면  

• 매매가격지수는 충격 후 1개월(Lag 1)에 약 {priceLag1}% 변하고,  
  2개월(Lag 2)에는 약 {priceLag2}% 변한 것으로 나타납니다.

• 매매거래량은 1개월 뒤 약 {volLag1}%,  
  2개월 뒤에는 약 {volLag2}% 변동이 발생합니다.

즉, 금리가 +0.1%p 오르면  
단기적으로는 가격과 거래량 모두 하락하는 경향이 나타나며,  
시간이 지나면서 영향이 점차 약해지는 모습을 확인할 수 있습니다.
          </p>
        </section>

      </div>

      {/* 📚 용어 정리 (Glossary) */}
<section
  className="
  mb-24
    bg-gray-50
    p-8
    rounded-xl
    shadow-sm
    text-sm sm:text-base
    leading-relaxed
    max-w-4xl mx-auto
    text-justify
  "
>
  <h3 className="text-lg font-semibold mb-4">📚 용어 정리</h3>

  <div className="space-y-4">

    <div>
      <p className="font-semibold">• VAR (Vector AutoRegression, 벡터자기회귀모형)</p>
      <p>
        여러 개의 시계열 변수가 서로에게 영향을 주고받는 구조를 분석하는 모형으로,
        각 변수의 현재 값이 자기 자신의 과거 값(Lag)과 다른 변수들의 과거 값에 의해
        설명된다는 가정을 기반으로 한다. 거시경제 변수들이 주택시장에
        어떤 시차적 영향을 미치는지 파악할 때 널리 사용된다.
      </p>
    </div>

    <div>
      <p className="font-semibold">• IRF (Impulse Response Function, 충격반응함수)</p>
      <p>
        특정 변수에 1단위 충격(Shock)이 발생했을 때 다른 변수들이 향후 시차별로
        어떻게 반응하는지를 나타내는 함수. 예를 들어 주택담보대출금리가 1%p 상승하면,
        매매가격지수와 거래량이 1개월 뒤, 2개월 뒤에 어떻게 움직이는지를 시각적으로 보여준다.
      </p>
    </div>

    <div>
      <p className="font-semibold">• 충격(Shock)</p>
      <p>
        특정 경제 변수에 발생한 갑작스러운 변화. 예를 들어 기준금리가 0.5%p 상승하는 경우처럼
        예기치 않은 외부 변화가 시스템 전체에 미치는 영향을 분석한다.
      </p>
    </div>

    <div>
      <p className="font-semibold">• 거시경제 변수</p>
      <p>
        전체 경제 흐름을 설명하는 광범위한 변수들로, 본 분석에서는 주택담보대출금리,
        물가상승률, 코스피지수 등을 포함한다. 이러한 변수들은 주택 수요·공급·투자 심리에
        직접적인 영향을 미쳐 가격과 거래량의 단기·중기 변동성을 설명한다.
      </p>
    </div>

    <div>
      <p className="font-semibold">• 주택담보대출금리</p>
      <p>
        은행이 주택을 담보로 제공하는 고객에게 적용하는 대출금리.
        금리 상승은 주택 구매 비용을 증가시키며 수요를 감소시키는 방식으로
        주택가격지수 및 매매거래량에 부정적 영향을 주는 경우가 많다.
      </p>
    </div>

    <div>
      <p className="font-semibold">• 시차(Lag)</p>
      <p>
        어떤 변수의 변화가 다른 변수에 영향을 미치기까지 걸리는 시간적 간격.
        예를 들어 금리가 1월(0개월차)에 오르면 매매가격이 1~3개월 뒤에
        영향을 받는 현상이 시차 효과이다.
      </p>
    </div>

  </div>
</section>

{/* 돌아가기 버튼 */}
<div className="flex justify-center mt-10 mb-20">
  <a
    href="/#projects"
    className="
      px-5 py-2
      bg-[#11126A]
      text-white
      rounded-full
      text-sm sm:text-base
      shadow-sm
      hover:bg-[#0d0f5a]
      transition-all
    "
  >
    ← 포트폴리오로 돌아가기
  </a>
</div>


    </main>
  )
}
