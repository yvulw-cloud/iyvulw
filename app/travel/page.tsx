"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { EditableMedia } from "@/components/editable/editable-media"

const TITLE_KEY = "travel-title"
const SUBTITLE_KEY = "travel-subtitle"
const BLOG_URL_KEY = "travel-blog-url"
const BUTTON_COLOR_KEY = "travel-button-color"
const TRAVEL_IMAGE_KEY = "travel-image"

export default function TravelSection() {
  const inline =
    typeof useInlineEditor === "function" ? useInlineEditor() : null
  const isEditMode = inline?.isEditMode ?? false

  const [title, setTitle] = useState("Travel ✈️")
  const [subtitle, setSubtitle] = useState("-")
  const [blogUrl, setBlogUrl] = useState("https://blog.naver.com/yvulw")
  const [buttonColor, setButtonColor] = useState("#11126A")
  const [travelImage, setTravelImage] = useState<string | null>(null)

  // 초기 로드
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lsTitle = window.localStorage.getItem(TITLE_KEY)
      const lsSubtitle = window.localStorage.getItem(SUBTITLE_KEY)
      const lsUrl = window.localStorage.getItem(BLOG_URL_KEY)
      const lsColor = window.localStorage.getItem(BUTTON_COLOR_KEY)
      const lsImage = window.localStorage.getItem(TRAVEL_IMAGE_KEY)

      if (lsTitle) setTitle(lsTitle)
      if (lsSubtitle) setSubtitle(lsSubtitle)
      if (lsUrl) setBlogUrl(lsUrl)
      if (lsColor) setButtonColor(lsColor)
      if (lsImage) setTravelImage(lsImage)
    }
  }, [])

  // 공통 저장 함수
  const persist = (key: string, value: string, setter: any) => {
    setter(value)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value)
    }
  }

  return (
    <section className="py-16 text-center">
      {/* 제목 */}
      {isEditMode ? (
        <input
          value={title}
          onChange={(e) => persist(TITLE_KEY, e.target.value, setTitle)}
          className="text-3xl font-bold mb-4 bg-transparent focus:outline-none w-full text-center"
        />
      ) : (
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
      )}

      {/* 소제목 */}
      {isEditMode ? (
        <textarea
          value={subtitle}
          onChange={(e) =>
            persist(SUBTITLE_KEY, e.target.value, setSubtitle)
          }
          className="text-muted-foreground mb-8 bg-transparent focus:outline-none w-full text-center"
          rows={2}
        />
      ) : (
        <p className="text-muted-foreground mb-8">{subtitle}</p>
      )}

      {/* 에디터 모드 옵션 */}
      {isEditMode && (
        <div className="flex flex-col gap-3 items-center mb-6">
          {/* 블로그 URL */}
          <input
            value={blogUrl}
            onChange={(e) =>
              persist(BLOG_URL_KEY, e.target.value, setBlogUrl)
            }
            className="bg-white/70 border rounded px-3 py-2 w-full max-w-md"
            placeholder="https://..."
          />

          {/* 버튼 색상 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">버튼 색상</span>
            <input
              type="text"
              value={buttonColor}
              onChange={(e) =>
                persist(BUTTON_COLOR_KEY, e.target.value, setButtonColor)
              }
              className="bg-white/70 border rounded px-3 py-1 w-28 text-sm"
              placeholder="#11126A"
            />
            <div
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: buttonColor }}
            />
          </div>
        </div>
      )}

      {/* 여행 기록 버튼 */}
      <a
        href={blogUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 rounded-full font-medium text-white transition"
        style={{ backgroundColor: buttonColor }}
      >
        🌏 여행 기록 보러가기
      </a>

      {/* 🔳 이미지 박스 (정방형) */}
      <div className="mt-10 mx-auto w-[500px] h-[500px] rounded-xl border border-gray-300 shadow-sm bg-gray-50 flex items-center justify-center overflow-hidden">
        {isEditMode ? (
          <EditableMedia
            value={travelImage}
            onChange={(url) => persist(TRAVEL_IMAGE_KEY, url, setTravelImage)}
            className="w-full h-full object-cover rounded-lg"
            square
          />
        ) : travelImage ? (
          <div className="relative w-full h-full">
            <Image
              src={travelImage}
              alt="travel"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <p className="text-muted-foreground">여행 사진을 추가해주세요.</p>
        )}
      </div>
    </section>
  )
}
