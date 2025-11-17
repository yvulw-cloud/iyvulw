"use client"

import { useEffect, useState } from "react"

type GuestbookEntry = {
  id: number
  message: string
  createdAt: string
}

const ADMIN_PASSWORD = "0103" // 👉 여기 원하는 비번으로 바꿔 쓰기

export default function GuestbookAdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true)
      setError("")
    } else {
      setError("비밀번호가 올바르지 않습니다.")
    }
  }

  useEffect(() => {
    if (!isAuthed) return

    const fetchEntries = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/guestbook")
        const data = await res.json()
        setEntries(data.reverse()) // 최근 것이 위로 오도록
      } catch (e) {
        console.error(e)
        setError("방명록을 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [isAuthed])

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-sm border rounded-2xl p-6 shadow-sm">
          <h1 className="text-xl font-semibold mb-4 text-center">
            방명록 관리자 페이지
          </h1>
          <p className="text-sm text-gray-500 mb-4 text-center">
            관리자 비밀번호를 입력하세요.
          </p>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-xs text-red-500 mb-2 text-center">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 rounded-lg bg-[#11126A] text-white text-sm font-medium hover:bg-[#0d0f5a] transition"
          >
            로그인
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          방명록 관리자 페이지
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          방문자들이 남긴 한 줄 메시지를 확인할 수 있습니다. (본인 전용)
        </p>

        {loading && <p className="text-gray-500 text-sm">불러오는 중...</p>}

        {!loading && entries.length === 0 && (
          <p className="text-gray-400 text-sm">아직 등록된 방명록이 없습니다.</p>
        )}

        <div className="mt-4 space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50"
            >
              <p className="mb-2 text-gray-800 whitespace-pre-line">
                {entry.message}
              </p>
              <p className="text-[11px] text-gray-400 text-right">
                {new Date(entry.createdAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
