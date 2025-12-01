"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type GuestbookEntry = {
  id: number
  message: string
  created_at: string
  is_private: boolean
}

export default function GuestbookPage() {
  const [message, setMessage] = useState("")
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false) // 나만 보기 여부

  // 초기 방명록 불러오기 (공개글만)
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .eq("is_private", false) // 공개글만
        .order("created_at", { ascending: false })

      if (!error && data) {
        setEntries(data as GuestbookEntry[])
      }
      setLoading(false)
    }

    fetchEntries()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setSubmitting(true)

    const { data, error } = await supabase
      .from("guestbook")
      .insert([
        {
          message: message.trim(),
          is_private: isPrivate,
        },
      ])
      .select()
      .single()

    setSubmitting(false)

    if (error) {
      alert("저장 중 오류가 발생했습니다. 다시 시도해 주세요 ㅠㅠ")
      console.error(error)
      return
    }

    if (data && !data.is_private) {
      // 공개글이면 리스트에 바로 추가
      setEntries((prev) => [data as GuestbookEntry, ...prev])
    }

    setMessage("")
    setIsPrivate(false)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Guestbook
        </h1>
        <p className="text-muted-foreground mb-8">
          포트폴리오 사이트 방문 소감이나 하고 싶은 말을 편하게 남겨 주세요.
          <br />
          <span className="text-[12px] opacity-75">
            지우는 방법 모르니까 이상한 댓글 달지맛쎄요잇!!😡
          </span>
        </p>

        {/* 입력 폼 */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 space-y-4 border rounded-2xl p-4 sm:p-6 bg-card shadow-sm"
        >
          <textarea
            className="w-full min-h-[100px] rounded-xl border px-3 py-2 text-sm sm:text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="칭찬 위주로 적어주세요!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex items-center justify-between gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <span>비밀로 하기 (공개 리스트에 보이지 않아요)</span>
            </label>

            <button
              type="submit"
              disabled={submitting || !message.trim()}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all active:scale-95"
            >
              {submitting ? "남기는 중..." : "방명록 남기기"}
            </button>
          </div>
        </form>

        {/* 목록 */}
        <section>
          <h2 className="font-semibold mb-3">공개 방명록</h2>

          {loading ? (
            <p className="text-sm text-muted-foreground">불러오는 중...</p>
          ) : entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              아직 공개 방명록이 없어요. 첫 번째로 남겨주세요! ✨
            </p>
          ) : (
            <ul className="space-y-4">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="border rounded-2xl px-4 py-3 bg-card shadow-sm text-sm sm:text-base"
                >
                  <p className="whitespace-pre-wrap break-words mb-2">
                    {entry.message}
                  </p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground text-right">
                    {new Date(entry.created_at).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
