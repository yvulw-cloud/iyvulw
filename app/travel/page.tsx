"use client"

import Image from "next/image"

export default function TravelSection() {
  return (
    <section className="py-16 text-center">
      {/* 제목 */}
      <h2 className="text-3xl font-bold mb-4">✈️ 여행</h2>

      {/* 소제목 */}
      <p className="text-muted-foreground mb-8">
        블로그를 방문하시면 더 많은 여행 기록을 확인하실 수 있습니다
      </p>

      {/* 여행 기록 버튼 */}
      <a
        href="https://blog.naver.com/yvulw"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 rounded-full font-medium text-white transition"
        style={{ backgroundColor: "#11126A" }}
      >
        🌏 여행 기록 보러가기
      </a>

      {/* 여행 이미지 박스 */}
      <div className="mt-10 mx-auto w-[500px] h-[500px] rounded-xl border border-gray-300 shadow-sm bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/uploads/travel.JPG"
            alt="travel"
            fill
            className="object-cover object-center"
          />

        </div>
      </div>
    </section>
  )
}
