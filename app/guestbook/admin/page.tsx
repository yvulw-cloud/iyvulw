"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type GuestbookEntry = {
  id: number
  message: string
  created_at: string
  is_private: boolean
}

const ADMIN_PASSWORD = "0103" // 👉 민아가 원하는 비번으로 바꿔도 됨

export default function GuestbookAdminPage() {
  const [inputPassword, setInputPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputPassword === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert("비밀번호가 틀렸어요 ㅠㅠ")
    }
  }

  useEffect(() => {
    if (!authenticated) return

    const fetchAllEntries = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setEntries(data as GuestbookEntry[])
      }
      setLoading(false)
    }

    fetchAllEntries()
  }, [authenticated])

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <form
          onSubmit={handleLogin}
          className="border rounded-2xl p-6 bg-card shadow-lg w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-semibold">Guestbook Admin</h1>
          <p className="text-sm text-muted-foreground">
            관리자 비밀번호를 입력해 주세요.
          </p>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="비밀번호"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:shadow-md active:scale-95 transition-all"
          >
            입장하기
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Guestbook Admin
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          공개/비공개 상관없이 모든 방명록을 볼 수 있는 페이지입니다. (민아 전용)
        </p>

        {loading ? (
          <p className="text-sm text-muted-foreground">불러오는 중...</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            아직 아무 글도 없어요.
          </p>
        ) : (
          <ul className="space-y-4">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="border rounded-2xl px-4 py-3 bg-card shadow-sm text-sm sm:text-base"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="whitespace-pre-wrap break-words">
                    {entry.message}
                  </p>
                  <span className="text-[10px] px-2 py-1 rounded-full border text-muted-foreground shrink-0">
                    {entry.is_private ? "나만 보기" : "공개"}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground text-right mt-1">
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
      </div>
    </main>
  )
}
