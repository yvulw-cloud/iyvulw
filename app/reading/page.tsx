"use client"

import { useEffect, useState } from "react"
import { useInlineEditor } from "@/contexts/inline-editor-context"

const STORAGE_KEY_QUOTES = "readingpage-quotes"
const STORAGE_KEY_TITLE = "readingpage-title"
const STORAGE_KEY_SUBTITLE = "readingpage-subtitle"

type QuoteItem = {
  sentence: string
  book?: string
  author?: string
}

export default function ReadingPage() {
  const inline = typeof useInlineEditor === "function" ? useInlineEditor() : null
  const canEdit = inline ? inline.isEditMode : true

  const [quotes, setQuotes] = useState<QuoteItem[]>([
    { sentence: "", book: "", author: "" },
  ])
  const [title, setTitle] = useState("📚독서")
  const [subtitle, setSubtitle] = useState("인상 깊었던 문장을 기록하세요.")

  useEffect(() => {
    if (typeof window === "undefined") return

    const q = window.localStorage.getItem(STORAGE_KEY_QUOTES)
    const t = window.localStorage.getItem(STORAGE_KEY_TITLE)
    const s = window.localStorage.getItem(STORAGE_KEY_SUBTITLE)

    if (q) {
      try {
        const parsed = JSON.parse(q)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuotes(parsed)
        }
      } catch {}
    }
    if (t) setTitle(t)
    if (s) setSubtitle(s)
  }, [])

  const persistQuotes = (next: QuoteItem[]) => {
    setQuotes(next)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify(next))
    }
  }

  const saveTitle = (v: string) => {
    setTitle(v)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY_TITLE, v)
    }
  }

  const saveSubtitle = (v: string) => {
    setSubtitle(v)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY_SUBTITLE, v)
    }
  }

  const addQuote = () => {
    const next = [...quotes, { sentence: "", book: "", author: "" }]
    persistQuotes(next)
  }

  const updateField = (i: number, key: keyof QuoteItem, value: string) => {
    const next = [...quotes]
    next[i][key] = value
    persistQuotes(next)
  }

  const removeQuote = (i: number) => {
    const next = quotes.filter((_, idx) => idx !== i)
    if (next.length === 0) {
      persistQuotes([{ sentence: "", book: "", author: "" }])
    } else {
      persistQuotes(next)
    }
  }

  return (
    <section className="py-16 text-center">

      {/* 제목 */}
      <div className="text-center mb-4">
        {canEdit ? (
          <input
            value={title}
            onChange={(e) => saveTitle(e.target.value)}
            className="text-3xl font-bold bg-transparent w-full text-center focus:outline-none"
          />
        ) : (
          <h2 className="text-3xl font-bold">{title}</h2>
        )}
      </div>

      {/* 소제목 */}
      <div className="text-center mb-8">
        {canEdit ? (
          <input
            value={subtitle}
            onChange={(e) => saveSubtitle(e.target.value)}
            className="text-muted-foreground bg-transparent w-full text-center focus:outline-none"
          />
        ) : (
          <p className="text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* 블로그 버튼 */}
      <a
        href="https://blog.naver.com/yvulw"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 rounded-full font-medium text-white transition mb-10"
        style={{ backgroundColor: "#11126A" }}
      >
        📖 독서 기록 보러가기
      </a>

        {/* 문장 카드들 */}
        <div className="flex flex-col gap-3">
          {quotes.map((q, i) => (
            <div
  key={i}
  className="relative bg-white border border-muted-foreground/20 rounded-xl shadow-sm px-5 py-4 flex flex-col justify-center items-center text-center transition-all hover:shadow-md hover:bg-muted/10 mx-auto w-full max-w-[700px]"
            >
   
   {/* 문장 */}
<textarea
  value={q.sentence}
  onChange={(e) => {
    if (!canEdit) return

    const el = e.target as HTMLTextAreaElement

    // 1️⃣ 기본은 항상 한 줄 높이로 리셋
    el.style.height = "24px"

    const sh = el.scrollHeight

    // 2️⃣ 내용이 한 줄이고 높이도 작으면 계속 한 줄 유지
    if (!el.value.includes("\n") && sh <= 40) {
      el.style.height = "24px"
    } else {
      // 3️⃣ 줄이 늘어나면 그때부터 내용 높이만큼 키우기
      el.style.height = sh + "px"
    }

    updateField(i, "sentence", el.value)
  }}
  placeholder="책 속 인상 깊은 문장을 입력하세요."
  className="w-full text-[17px] sm:text-lg font-semibold text-center leading-relaxed border-none bg-transparent resize-none focus:outline-none overflow-hidden"
  readOnly={!canEdit}
  style={{
    height: "24px",      // ✅ 초기 한 줄
    marginBottom: "4px",
  }}
/>



              {/* 책 제목 */}
              <input
                value={q.book}
                onChange={(e) =>
                  canEdit && updateField(i, "book", e.target.value)
                }
                placeholder="책 제목"
                className="italic text-[14x] text-muted-foreground text-center border-none bg-transparent focus:outline-none"
                readOnly={!canEdit}
              />

              {/* 저자 */}
              <input
                value={q.author}
                onChange={(e) =>
                  canEdit && updateField(i, "author", e.target.value)
                }
                placeholder="저자"
                className=" text-[13px] text-muted-foreground/80 text-center border-none bg-transparent focus:outline-none mt-[-2px]"
                readOnly={!canEdit}
              />

              {/* 삭제 버튼 → 에디터일 때만 */}
              {canEdit && (
                <button
                  onClick={() => removeQuote(i)}
                  className="absolute bottom-2 right-4 text-[12px] text-muted-foreground hover:text-destructive"
                >
                  삭제
                </button>
              )}
            </div>
          ))}

          {/* 추가 버튼 → 에디터일 때만 */}
          {canEdit && (
            <button
              onClick={addQuote}
              className="self-start mt-3 px-4 py-1.5 rounded-md border border-dashed hover:border-primary text-sm transition-all bg-white"
            >
              + 문장 추가
            </button>
          )}
        </div>
    </section>)
}
