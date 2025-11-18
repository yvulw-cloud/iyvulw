"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type StagePremium = {
  stage: string
  premium: number
}

type Importance = {
  name: string
  beta: number
}

const STAGE_PREMIUM_DATA: StagePremium[] = [
  { stage: "정비구역", premium: 24.0 },
  { stage: "조합인가", premium: 27.3 },
  { stage: "사업승인", premium: 21.6 },
  { stage: "안전진단", premium: 29.1 },
]

const IMPORTANCE_DATA: Importance[] = [
  { name: "안전진단", beta: 0.2908 },
  { name: "조합인가", beta: 0.2732 },
  { name: "정비구역", beta: 0.2397 },
  { name: "사업승인", beta: 0.2156 },
  { name: "경과연수", beta: 0.1301 },
  { name: "역거리", beta: 0.0319 },
]

export default function BundangRegressionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* 상단 소개 */}
        <section className="mb-12 text-center">
  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
    Project · Applied Econometrics
  </p>

  <h1 className="text-3xl sm:text-4xl font-bold mb-4">
    재건축 단계가 분당 아파트 가격에 미치는 영향 분석
  </h1>

  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
    「노후계획도시특별법」 도입 이후, 분당신도시 아파트를 대상으로
    재건축 진행 단계(정비구역·조합인가·사업승인·안전진단)가
    가격에 얼마나 프리미엄을 형성하는지 분석한 프로젝트입니다.
    ln(거래금액)을 종속변수로 하고, 층수·전용면적·경과연수·세대수와
    학교·역·공원 거리 등 물리·입지 요인을 통제하여
    재건축 단계의 순수 효과만을 추정했습니다.
  </p>
</section>

        {/* 연구 질문 & 의의 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gray-50 rounded-2xl shadow-sm p-6 leading-relaxed">
            <h2 className="text-lg font-semibold mb-2">🎯 연구 질문</h2>
            <p className="text-sm sm:text-base">
              재건축 진행 단계가 분당신도시 아파트 가격에
              어느 정도의 <strong>가격 프리미엄</strong>을 만드는가?
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              같은 입지와 물리적 조건을 가진 단지들 사이에서,
              재건축 단계만 달라졌을 때 발생하는 가격 차이를
              계량적으로 추정하는 것이 이 연구의 핵심입니다.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-sm p-6 leading-relaxed">
            <h2 className="text-lg font-semibold mb-2">📌 연구 의의 (3줄 요약)</h2>
            <ul className="list-disc list-inside text-sm sm:text-base space-y-1">
              <li>재건축 단계별 프리미엄을<strong> % 단위</strong>로 정량화.</li>
              <li>
                층수·면적·거리 등을 통제한 상태에서
                <strong> 정책 변수(재건축 단계)의 순수 효과</strong>를 분리.
              </li>
              <li>
                분당신도시에서 재건축 기대감이 실제 매매가격에
                어떻게 선반영되는지 실증적으로 보여줌.
              </li>
            </ul>
          </div>
        </section>

        {/* 그래프 섹션 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* 1) 재건축 단계별 프리미엄 바 차트 */}
          <div className="bg-white border border-muted-foreground/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-1">
              재건축 단계별 아파트 가격 프리미엄
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              비재건축 단지를 0%로 보았을 때, 각 재건축 단계에 진입한 단지가
              평균적으로 얼마나 높은 가격 수준을 보이는지를 나타냅니다.
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={STAGE_PREMIUM_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="stage"
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v.toFixed(0)}%`}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    labelFormatter={(label) => `${label} 단계`}
                  />
                  <Bar dataKey="premium" fill="#11126A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
              예를 들어, <strong>안전진단</strong> 단계의 프리미엄 약 29%는
              같은 조건의 비재건축 단지보다
              매매가격이 평균 29% 이상 높다는 의미입니다.
            </p>
          </div>

          {/* 2) 변수 중요도(표준화 계수 느낌) */}
          <div className="bg-white border border-muted-foreground/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-1">
              주요 변수별 상대적 영향력
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              회귀계수(절대값)를 기준으로 상위 변수의 상대적 영향력을 비교한 그래프입니다.
              재건축 단계 변수들이 물리·입지 변수보다 훨씬 큰 영향을 미친다는 점을 확인할 수 있습니다.
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={IMPORTANCE_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => value.toFixed(3)}
                    labelFormatter={(label) => label}
                  />
                  <Bar dataKey="beta" fill="#11126a88" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
              상위 네 개 변수(안전진단·조합인가·정비구역·사업승인)가 모두
              <strong> 재건축 단계 변수</strong>로, 전용면적·거리·경과연수 등
              전통적인 입지·물리 요인보다 정책 변수의 영향력이 크다는 점을 보여줍니다.
            </p>
          </div>
        </section>

        {/* 회귀식 박스 */}
        <section className="bg-gray-50 p-6 rounded-xl shadow-sm leading-relaxed mb-20 text-sm sm:text-base">
          <h2 className="text-xl font-semibold mb-3">📐 회귀식</h2>
          <p className="mb-2 text-muted-foreground">
            ln(거래금액)을 종속변수로 한 OLS 회귀식은 다음과 같습니다.
          </p>
          <p className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            ln(거래금액) = 12.0320 + 0.0026·층수 + 0.0000·전용면적 − 0.0300·ln(초등학교거리) + 0.0319·ln(지하철역거리)  + 0.0316·ln(근린공원거리) − 0.1301·ln(경과연수)
            {"\n"}  + 0.0032·ln(세대수) + 0.0321·브랜드_Y + 0.2908·안전진단 + 0.2397·정비구역 + 0.2732·조합인가 + 0.2156·사업승인
          </p>
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
            계수는 로그-선형 모형의 특성상, 대략적으로 <strong>x100</strong> 하여
            퍼센트(%) 변화로 해석할 수 있습니다. 예를 들어, 안전진단 계수 0.2908은
            비재건축 단지 대비 약 29% 높은 가격 수준을 의미합니다.
          </p>
        </section>

        {/* 📌 분석 요약 */}
        <section
          className="
            bg-gray-50
            p-8
            rounded-xl
            shadow-sm
            leading-relaxed
            text-sm sm:text-base
            max-w-4xl mx-auto
            text-justify
            mb-20
          "
        >
          <h3 className="text-xl font-semibold mb-4">📌 분석 요약</h3>

          <p>
            회귀분석 결과, 분당신도시 아파트 가격에 가장 강한 영향을 미치는 요인은
            모두 재건축 진행 단계(정비구역·조합인가·사업승인·안전진단)인 것으로 나타났다.
            안전진단 단계의 회귀계수는 약 0.29로, 동일한 조건의 비재건축 단지 대비
            평균 <strong>약 29% 높은 가격</strong> 수준을 보인다. 조합인가는 약 27%,
            정비구역은 24%, 사업승인은 22% 수준의 프리미엄이 확인되며,
            재건축이 진전될수록 가격 프리미엄이 단계적으로 축적되는 구조를 보여준다.
          </p>

          <p className="mt-4">
            반면 전용면적, 층수, 세대수, 학교·역·공원까지의 거리 등 물리적·입지적 변수의
            상대적 영향력은 낮게 나타났다. 이는 분당신도시에서 아파트 가격 형성에 있어
            <strong> 정책 변수(재건축 단계)가 전통적인 입지·물리 요인보다 더 강하게 작용</strong>한다는
            점을 시사하며, 재건축 기대감이 가격에 선반영되는 시장 특징을 잘 보여준다.
          </p>

          <p className="mt-4">
            모형의 R²는 0.437, Adj.R²는 0.359로, 아파트 가격 변동의 약 36~44%를 설명한다.
            F-statistic과 p-value(5.62, p &lt; 0.001)를 통해 회귀모형 전체가 통계적으로 유의함을 확인하였다.
            다만 아파트 가격에는 본 연구에 포함되지 않은 추가 요인들(학군, 단지 내 시설, 시점별 거시 변수 등)이
            존재할 수 있다는 점에서, 후속 연구에서는 설명변수를 확장한 모형이 필요하다.
          </p>
        </section>

        {/* 📚 용어 정리 */}
        <section
          className="
            bg-gray-50
            p-8
            rounded-xl
            shadow-sm
            text-sm sm:text-base
            leading-relaxed
            max-w-4xl mx-auto
            text-justify
            mb-24
          "
        >
          <h3 className="text-lg font-semibold mb-4">📚 용어 정리 (Glossary)</h3>

          <div className="space-y-4">
            <div>
              <p className="font-semibold">• 재건축 단계 변수</p>
              <p>
                정비구역 지정, 조합인가, 사업승인, 안전진단 등 재건축 추진 절차를 더미변수(0/1)로 표현한 것.
                각 단계에 진입하면 1, 그렇지 않으면 0으로 처리하여 단계별 가격 프리미엄을 추정한다.
              </p>
            </div>

            <div>
              <p className="font-semibold">• ln(거래금액)</p>
              <p>
                거래금액에 자연로그를 취한 값으로, 회귀계수를 퍼센트(%) 변화로 직관적으로 해석할 수 있게 해준다.
              </p>
            </div>

            <div>
              <p className="font-semibold">• 통제 변수 (Control Variables)</p>
              <p>
                재건축 단계의 순수한 효과만 보기 위해, 가격에 영향을 줄 수 있는 층수·전용면적·경과연수·세대수,
                학교·역·공원까지의 거리 등을 함께 포함한 변수들이다.
              </p>
            </div>

            <div>
              <p className="font-semibold">• 회귀계수 &amp; 표준화 계수</p>
              <p>
                회귀계수는 특정 변수가 종속변수에 미치는 영향의 방향과 크기를 나타내며,
                표준화 계수는 변수의 단위를 제거해 상대적인 중요도를 비교할 때 사용된다.
              </p>
            </div>

            <div>
              <p className="font-semibold">• R² / Adj.R²</p>
              <p>
                모형이 종속변수의 변동을 얼마나 설명하는지를 나타내는 지표로,
                Adj.R²는 변수 개수를 고려해 보정된 설명력을 의미한다.
              </p>
            </div>
          </div>
        </section>

        {/* 포트폴리오로 돌아가기 버튼 */}
        <div className="flex justify-center mb-20">
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
    </main>
  )
}
