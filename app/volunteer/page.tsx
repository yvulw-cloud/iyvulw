"use client"

import { useState, useEffect } from "react"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { EditableMedia } from "@/components/editable/editable-media"

const VOL_TITLE_KEY = "volunteer-title"
const VOL_SUBTITLE_KEY = "volunteer-subtitle"
const VOL_IMAGE_KEY = "volunteer-image"
const VOL_ITEMS_KEY = "volunteer-items"

type VolunteerItem = {
  label: string
  hours: string
}

export default function VolunteerSection() {
  const inline =
    typeof useInlineEditor === "function" ? useInlineEditor() : null
  const isEditMode = inline?.isEditMode ?? false
  const getData = inline?.getData
  const saveData = inline?.saveData

  const [title, setTitle] = useState("🌱봉사")
  const [subtitle, setSubtitle] = useState("2020.05 ~ 2025. / 총 623시간")
const [image, setImage] = useState<string | null>("/uploads/volunteer-certificate.jpg")
  const [items, setItems] = useState<VolunteerItem[]>([
    { label: "한국중앙자원봉사센터", hours: "80시간" },
    { label: "한국중앙자원봉사센터", hours: "80시간" },
    { label: "한국중앙자원봉사센터", hours: "80시간" },
    { label: "한국중앙자원봉사센터", hours: "80시간" },
  ])

  useEffect(() => {
    const storedTitle = getData?.(VOL_TITLE_KEY)
    const storedSubtitle = getData?.(VOL_SUBTITLE_KEY)
    if (storedTitle) setTitle(storedTitle as string)
    if (storedSubtitle) setSubtitle(storedSubtitle as string)

    const storedImage = getData?.(VOL_IMAGE_KEY)
    if (typeof storedImage === "string") setImage(storedImage)

    const storedItems = getData?.(VOL_ITEMS_KEY)
    if (Array.isArray(storedItems)) setItems(storedItems as VolunteerItem[])
  }, [getData])

  const persist = (key: string, value: any) => saveData?.(key, value)

  const handleImageChange = (val: any) => {
    if (typeof val === "string") {
      setImage(val)
      persist(VOL_IMAGE_KEY, val)
    } else if (val && typeof val === "object") {
      const possible = val.url || val.src || val.value
      if (typeof possible === "string") {
        setImage(possible)
        persist(VOL_IMAGE_KEY, possible)
      }
    }
  }

  const updateItem = (index: number, field: keyof VolunteerItem, value: string) => {
    const next = [...items]
    next[index] = { ...next[index], [field]: value }
    setItems(next)
    persist(VOL_ITEMS_KEY, next)
  }

  const addItem = () => {
    const next = [...items, { label: "활동명을 입력하세요", hours: "00시간" }]
    setItems(next)
    persist(VOL_ITEMS_KEY, next)
  }

  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index)
    setItems(next)
    persist(VOL_ITEMS_KEY, next)
  }

  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto bg-white/70 border rounded-2xl p-6 shadow-sm">
        {/* 제목 / 소제목 */}
        <div className="mb-6">
          {isEditMode ? (
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                persist(VOL_TITLE_KEY, e.target.value)
              }}
              className="text-2xl font-bold bg-transparent focus:outline-none w-full"
            />
          ) : (
            <h2 className="text-2xl font-bold">{title}</h2>
          )}

          {isEditMode ? (
            <input
              value={subtitle}
              onChange={(e) => {
                setSubtitle(e.target.value)
                persist(VOL_SUBTITLE_KEY, e.target.value)
              }}
              className="text-muted-foreground bg-transparent focus:outline-none w-full mt-2"
            />
          ) : (
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          )}
        </div>

        {/* 본문 레이아웃 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 왼쪽 - 봉사 인증 사진 */}
          <div className="flex-shrink-0">
            <div className="w-[340px] h-[440px] border rounded-xl overflow-hidden bg-muted/40 flex items-center justify-center">
              <img
  src="/uploads/volunteer-certificate.jpg"
  alt="봉사 인증서"
  className="w-full h-full object-contain bg-white"
/>
            </div>
          </div>

          {/* 오른쪽 - 봉사 활동 리스트 */}
          <div className="flex-1 space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 bg-white/60 relative"
              >
                {isEditMode && (
                  <button
                    onClick={() => removeItem(idx)}
                    className="absolute top-2 right-2 text-xs px-2 py-1 bg-red-100 rounded hover:bg-red-200"
                  >
                    삭제
                  </button>
                )}

                {/* 활동명 */}
                {isEditMode ? (
                  <input
                    value={item.label}
                    onChange={(e) => updateItem(idx, "label", e.target.value)}
                    className="font-semibold bg-transparent focus:outline-none w-full"
                  />
                ) : (
                  <p className="font-semibold">{item.label}</p>
                )}

                {/* 활동시간 */}
                {isEditMode ? (
                  <input
                    value={item.hours}
                    onChange={(e) => updateItem(idx, "hours", e.target.value)}
                    className="text-sm text-muted-foreground bg-transparent focus:outline-none w-full mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.hours}
                  </p>
                )}
              </div>
            ))}

            {isEditMode && (
              <button
                onClick={addItem}
                className="px-3 py-2 border rounded-lg text-sm hover:bg-muted/40"
              >
                + 봉사 내역 추가
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
