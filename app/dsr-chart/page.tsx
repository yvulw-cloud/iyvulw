"use client"

import { useState, useRef } from "react"
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
  // ✔ 이제 props 필요 없음
  const [isEditMode, setIsEditMode] = useState(true)
    const [region, setRegion] = useState<"nation" | "seoul" | "metro6" | "others">("nation")
  const [tab, setTab] = useState<"household" | "bank">("household")

  /* ---------- PDF 업로드 상태 ---------- */
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // 이전 URL 있으면 정리
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
    }

    setPdfFile(file)
    setPdfUrl(URL.createObjectURL(file)) // 브라우저 메모리에 blob URL 생성
  }

  // 보고서 버튼 클릭 시 동작
  function handleReportButtonClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // 에디터 모드일 때는 업로드 버튼처럼 동작
    if (isEditMode) {
      e.preventDefault()
      fileInputRef.current?.click()
      return
    }

    // 방문자 모드인데 아직 pdf가 없다면 클릭 무시
    if (!pdfUrl) {
      e.preventDefault()
    }
  }

  /* ------------------------- 라벨 ------------------------- */
  const labels = [
    "2020-01","2020-07","2021-01","2021-07",
    "2022-01","2022-07","2023-01","2023-07",
    "2024-01","2024-07"
  ]

  /* ------------------------- 가계대출 증가율 그래프 ------------------------- */
  const householdGrowth: Record<typeof region, number[]> = {
    nation: [0.9,0.8,1.4,1.1,0.0,0.3,-0.4,0.7,1.4],
    seoul:  [1.0,0.7,1.3,1.0,-0.1,0.2,-0.5,0.6,1.2],
    metro6: [0.8,0.6,1.2,1.0,0.1,0.4,-0.3,0.5,1.0],
    others: [0.7,0.5,1.0,0.8,0.1,0.5,-0.2,0.6,1.1],
  }

  const data_household = {
    labels,
    datasets: [
      {
        label: "가계대출 증가율(%)",
        data: householdGrowth[region],
        borderColor: "#000",
        borderWidth: 3,
        tension: 0.15,
        pointRadius: 3,
      }
    ]
  }

  const options_household = {
    responsive: true,
    plugins: {
      legend: { labels: { font: { size: 14 } } },
      tooltip: { mode: "index" as const, intersect: false },
      annotation: {
        annotations: {
          dsr1: {
            type: "line",
            xMin: 3, xMax: 3,
            borderColor: "#ef4444", borderWidth: 2, borderDash: [4,2],
            label: {
              enabled: true,
              content: "DSR 1단계",
              position: "top",
              backgroundColor: "#ef4444",
              color: "#fff",
              padding: 6,
            },
          },
          dsr2: {
            type: "line",
            xMin: 4, xMax: 4,
            borderColor: "#3b82f6", borderWidth: 2, borderDash: [4,2],
            label: {
              enabled: true,
              content: "DSR 2단계",
              position: "top",
              backgroundColor: "#3b82f6",
              color: "#fff",
              padding: 6,
            },
          },
          dsr3: {
            type: "line",
            xMin: 5, xMax: 5,
            borderColor: "#10b981", borderWidth: 2, borderDash: [4,2],
            label: {
              enabled: true,
              content: "DSR 3단계",
              position: "top",
              backgroundColor: "#10b981",
              color: "#fff",
              padding: 6,
            },
          },
        },
      },
    },
    scales: {
      y: { min: -1, max: 2, title:{display:true, text:"증가율(%)"} }
    }
  }

  /* ------------------------- 비은행권 비중 7개 지역 ------------------------- */

  const cityData = {
    seoul:  [0.080,0.075,0.073,0.070,0.069,0.070,0.071,0.065,0.060,0.058],
    incheon:[0.115,0.110,0.108,0.112,0.116,0.118,0.110,0.103,0.098,0.110],
    busan:  [0.125,0.118,0.115,0.112,0.115,0.118,0.120,0.117,0.102,0.108],
    daegu:  [0.205,0.195,0.175,0.165,0.168,0.170,0.173,0.165,0.148,0.145],
    gwangju:[0.270,0.255,0.245,0.240,0.243,0.258,0.268,0.260,0.230,0.225],
    daejeon:[0.245,0.235,0.225,0.220,0.225,0.253,0.254,0.240,0.205,0.190],
    ulsan:  [0.280,0.265,0.258,0.255,0.258,0.263,0.272,0.265,0.228,0.222],
  }

  const data_bank = {
    labels,
    datasets: [
      { label:"서울",   data:cityData.seoul,   borderColor:"#38bdf8", borderWidth:2, tension:0.2, pointRadius:0 },
      { label:"인천",   data:cityData.incheon, borderColor:"#fb923c", borderWidth:2, tension:0.2, pointRadius:0 },
      { label:"부산",   data:cityData.busan,   borderColor:"#4ade80", borderWidth:2, tension:0.2, pointRadius:0 },
      { label:"대구",   data:cityData.daegu,   borderColor:"#f87171", borderWidth:2, tension:0.2, pointRadius:0 },
      { label:"광주",   data:cityData.gwangju, borderColor:"#a855f7", borderWidth:2, tension:0.2, pointRadius:0 },
      { label:"대전",   data:cityData.daejeon, borderColor:"#8b5cf6", borderWidth:2, tension:0.2, pointRadius:0 },
      { label:"울산",   data:cityData.ulsan,   borderColor:"#ec4899", borderWidth:2, tension:0.2, pointRadius:0 },
    ]
  }

  const options_bank = {
    responsive: true,
    plugins: {
      legend: { labels:{ font:{ size:12 }}},
      annotation: {
        annotations: {
          dsr1:{type:"line", xMin:3,xMax:3, borderColor:"#ef4444", borderWidth:2, borderDash:[4,4]},
          dsr2:{type:"line", xMin:4,xMax:4, borderColor:"#3b82f6", borderWidth:2, borderDash:[4,4]},
          dsr3:{type:"line", xMin:5,xMax:5, borderColor:"#10b981", borderWidth:2, borderDash:[4,4]},
        }
      }
    },
    scales: {
      y:{ min:0.05, max:0.30, title:{display:true, text:"비은행권 대출 비중(%)"} }
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">

      <h1 className="text-3xl font-bold text-center mb-6">
        DSR 정책이 주택금융시장에 미치는 영향 분석
      </h1>

      <p className="text-center text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
        2020년 이후 단계적으로 강화된 DSR 규제가 주택금융시장에 어떤 변화를 만들었는지 시각적으로 보여주는 페이지입니다.
        <br />
        가계대출 증가율과 지역별 비은행권 대출 비중의 흐름을 통해, 정책 변화가 주택시장에 미친 영향을 살펴볼 수 있습니다.
      </p>

      {/* 탭 */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setTab("household")}
          className={`px-5 py-2 rounded-full border ${
            tab === "household" ? "bg-black text-white" : "bg-white"
          }`}
        >
          가계대출 증가율
        </button>

        <button
          onClick={() => setTab("bank")}
          className={`px-5 py-2 rounded-full border ${
            tab === "bank" ? "bg-black text-white" : "bg-white"
          }`}
        >
          비은행권 대출 비중
        </button>
      </div>

      {/* 그래프 */}
      <Line
        data={tab === "household" ? data_household : data_bank}
        options={tab === "household" ? options_household : options_bank}
      />

      {/* 분석 요약 */}
      {tab === "household" && (
        <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">📌 분석 요약</h2>
          <p className="leading-relaxed">
            DSR 규제 도입 이후 가계대출 증가율은 뚜렷한 구조적 변화를 보인다.
            2021년 1단계 시행 직전까지 상승하던 증가율은 규제 발효와 함께 급격한 둔화 국면으로 전환되고,
            2022년 2·3단계가 적용되는 시점에서는 0% 이하로 떨어지며 규제의 강한 단기 억제력이 확인된다.
            다만 이후에는 증가율이 다시 반등하는 흐름을 보이며,
            DSR 규제가 초기에는 대출 수요를 명확히 제어하지만 시간이 지나며 억제 효과가 약화되는 경향이 나타난다.
          </p>
        </div>
      )}

      {tab === "bank" && (
        <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">📌 분석 요약</h2>
          <p className="leading-relaxed">
            비은행권 대출 비중은 DSR 강화 이후 점진적으로 상승하는 흐름을 보인다.
            이는 은행권이 규제로 직접적인 제약을 받는 동안 일부 수요가 상대적으로 규제 강도가 낮은
            비은행권으로 이동하는 ‘풍선효과’가 나타난 구조로 볼 수 있다.
            특히 서울은 대출 접근성이 다른 지역보다 높아 비은행권 의존도가 낮은 편이며,
            이러한 구조적 특성이 지역 간 비중 격차로 이어진 것으로 해석된다.
          </p>
        </div>
      )}

      {/* 용어 정리 */}
      <section className="mt-12 bg-gray-50 p-8 rounded-xl shadow-sm leading-relaxed">
        <h3 className="text-lg font-semibold mb-4">📚 용어 정리</h3>
        <ul className="space-y-3 text-sm sm:text-base">
          <li>
            <b>DSR(Debt Service Ratio)</b> 연소득 대비 모든 대출의 연간 원리금 상환액이 차지하는 비율
          </li>
          <li>
            <b>비은행권</b> 일반 은행을 제외한 제2금융권(저축은행·보험·캐피탈·증권 등)을 통칭하는 금융업권
          </li>
          <li>
            <b>풍선효과</b> 특정 업권이나 상품에 대한 규제를 강화하면,
            수요가 규제가 약한 다른 영역으로 이동하는 현상
          </li>
        </ul>
      </section>

      {/* PDF 업로드 + 다운로드 (단일 버튼) */}
      <div className="flex justify-center gap-4 mt-12 items-center">

        {/* 숨겨진 파일 인풋 (에디터용) */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handlePdfUpload}
        />

       <a
  href={pdfUrl ?? "#"}
  onClick={handleReportButtonClick}
  target="_blank"            // ← 새 탭 열기
  rel="noopener noreferrer"  // ← 보안 옵션
  className="px-5 py-2 bg-gray-700 text-white rounded-full"
>
  📄 보고서 열기
</a>



        {/* 에디터 모드에서만 파일명 표시 */}
        {isEditMode && pdfFile && (
          <p className="text-xs text-gray-500">
            업로드됨: {pdfFile.name}
          </p>
        )}
      </div>

      {/* 포트폴리오로 돌아가기 */}
      <div className="flex justify-center mt-8">
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
