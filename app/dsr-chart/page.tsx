"use client"

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"
import annotationPlugin from "chartjs-plugin-annotation"
import { Line } from "react-chartjs-2"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  annotationPlugin
)

export default function DsrChart() {
  const labels = [
    "2020-01","2020-07",
    "2021-01","2021-07",
    "2022-01","2022-07",
    "2023-01","2024-01","2024-07"
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "가계대출 증가율(%)",
        data: [0.9,0.8,1.4,1.1,0.0,0.3,-0.4,0.7,1.4,1.0,0.3],
        borderColor: "#000000ff",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 3,
        pointRadius: 2,
        pointBackgroundColor: "#000000ff",
        tension: 0.15,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { font: { size: 14 } } },
      tooltip: { mode: "index", intersect: false },
      annotation: {
        annotations: {
          dsr1: {
            type: "line",
            xMin: 3,
            xMax: 3,
            borderColor: "#ef4444",
            borderWidth: 2,
            borderDash: [4, 2],
            label: {
              content: "DSR 1단계 시행",
              enabled: true,
              position: "top",
              backgroundColor: "rgba(239,68,68,0.85)",
              color: "white",
              padding: 6,
              cornerRadius: 999,
              font: { size: 11, weight: "500" },
            },
          },

          dsr2: {
            type: "line",
            xMin: 4,
            xMax: 4,
            borderColor: "#3b82f6",
            borderWidth: 2,
            borderDash: [4, 2],
            label: {
              content: "DSR 2단계 시행",
              enabled: true,
              position: "top",
              backgroundColor: "rgba(59,130,246,0.85)",
              color: "white",
              padding: 6,
              cornerRadius: 999,
              font: { size: 11, weight: "500" },
            },
          },

          dsr3: {
            type: "line",
            xMin: 5,
            xMax: 5,
            borderColor: "#10b981",
            borderWidth: 2,
            borderDash: [4, 2],
            label: {
              content: "DSR 3단계 시행",
              enabled: true,
              position: "top",
              backgroundColor: "rgba(16,185,129,0.85)",
              color: "white",
              padding: 6,
              cornerRadius: 999,
              font: { size: 11, weight: "500" },
            },
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "날짜", font: { size: 14 } },
      },
      y: {
        title: { display: true, text: "증가율(%)", font: { size: 14 } },
        beginAtZero: false,
        suggestedMin: -1,
        suggestedMax: 2,
      },
    },
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-2 text-center">가계대출 증가율 추이</h1>
      <p className="text-muted-foreground text-center mb-10">
        DSR 1·2·3단계 시행 시점을 기준으로 한 증가율 변화
      </p>

      {/* 그래프 */}
      <Line data={data} options={options} />

      {/* 범례 라벨 */}
      <div className="flex justify-center gap-8 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-3">
          <div className="h-5 w-0.5 border-l-2 border-red-500 border-dashed"></div>
          <span>DSR 1단계 (2021.07)</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-5 w-0.5 border-l-2 border-blue-500 border-dashed"></div>
          <span>DSR 2단계 (2022.01)</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-5 w-0.5 border-l-2 border-green-500 border-dashed"></div>
          <span>DSR 3단계 (2022.07)</span>
        </div>
      </div>

      {/* 📌 분석 요약 */}
      <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-sm leading-relaxed text-justify">
        <h2 className="text-xl font-semibold mb-3">📌 분석 요약</h2>
        <p>
          DSR 1단계 시행 이후 가계대출 증가율은 단기적으로 뚜렷한 둔화세를 보였으며,
          DSR 2·3단계 시행 이후 증가율이 일시적으로 음(-)의 구간까지 하락하는 등 단기 억제 효과가 강화되었다.
          그러나 2023년 이후 증가율이 다시 반등함에 따라 규제의 장기적 실효성은 제한적임을 보여준다.
          이는 은행권 대출이 억제되면서 비은행권으로 이동하는 풍선효과 가능성을 시사하며,
          가계부채의 구조적 안정을 위해 추가적인 제도 보완이 필요함을 의미한다.
        </p>
      </div>

      {/* 📚 용어 정리 */}
      <section
  className="
    mt-20
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
            <p className="font-semibold">• DSR (총부채원리금상환비율)</p>
            <p>
              소득 대비 갚아야 하는 모든 부채의 원리금을 의미하며,
              규제가 강화될수록 대출 한도는 줄어든다.
            </p>
          </div>

          <div>
            <p className="font-semibold">• DSR 단계별 규제</p>
            <p>
              1단계는 기본 규제, 2·3단계는 상환능력 평가 강화로 이어지며,
              그래프의 2021.07 / 2022.01 / 2022.07 지점과 대응한다.
            </p>
          </div>

          <div>
            <p className="font-semibold">• 가계대출 증가율</p>
            <p>
              일정 기간 동안 가계대출이 얼마나 증가했는지를 나타내며,
              규제 강화 시 단기적으로 하락하는 경향이 있다.
            </p>
          </div>

          <div>
            <p className="font-semibold">• 풍선효과</p>
            <p>
              특정 규제가 강화되면 규제를 받지 않는 영역으로 수요가 이동하는 현상이다.
            </p>
          </div>

          <div>
            <p className="font-semibold">• 구조적 안정성</p>
            <p>
              금융 시스템이 충격에도 버틸 수 있는 능력을 의미하며,
              DSR 강화의 핵심 목표 중 하나이다.
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

    </div>
  )
}
