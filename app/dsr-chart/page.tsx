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
      <h1 className="text-3xl font-bold mb-2 text-center">가계대출 증가율 추이</h1>
      <p className="text-muted-foreground text-center mb-10">
        DSR 1·2·3단계 시행 시점을 기준으로 한 증가율 변화
      </p>

    <Line data={data} options={options} />

<div className="flex justify-center gap-8 mb-6 text-sm text-gray-600">

  {/* DSR 1단계 */}
  <div className="flex items-center gap-3">
    <div
      className="h-5 w-0.5 border-l-2 border-red-500 border-dashed"
    ></div>
    <span>DSR 1단계 (2021.07)</span>
  </div>

  {/* DSR 2단계 */}
  <div className="flex items-center gap-3">
    <div
      className="h-5 w-0.5 border-l-2 border-blue-500 border-dashed"
    ></div>
    <span>DSR 2단계 (2022.01)</span>
  </div>

  {/* DSR 3단계 */}
  <div className="flex items-center gap-3">
    <div
      className="h-5 w-0.5 border-l-2 border-green-500 border-dashed"
    ></div>
    <span>DSR 3단계 (2022.07)</span>
  </div>

</div>


      <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-sm leading-relaxed">
        <h2 className="text-xl font-semibold mb-3">📌 분석 요약</h2>
        <p>
           DSR 1단계 시행 이후 가계대출 증가율은 단기적으로 뚜렷한 둔화세를 보였으며, DSR 2·3단계 시행 이후 증가율이 일시적으로 음(-)의 구간까지 하락하는 등 단기 억제 효과가 더욱 강화되었다. 그러나 2023년 이후 증가율이 다시 반등함에 따라 규제의 장기적 실효성은 제한적인 것으로 나타난다. 이는 은행권 대출이 억제되면서 비은행권으로 유입되는 풍선효과 가능성을 시사하며, 가계부채의 구조적 안정성을 확보하기 위해서는 DSR 제도의 추가적인 보완이 필요함을 의미한다.
        </p>
      </div>
    </div>
  )
}
