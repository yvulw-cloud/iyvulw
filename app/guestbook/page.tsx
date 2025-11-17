"use client"

import { useState } from "react"

export default function GuestbookPage() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  const submitMessage = async () => {
    if (!message.trim()) return

    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })

    if (res.ok) {
      setStatus("📨 방명록이 등록되었습니다! 좋은 하루 되세요!")
      setMessage("")
    } else {
      setStatus("❌ 오류가 발생했습니다.")
    }
  }

  return (
    <div className="max-w-xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">방명록</h1>
      <p className="text-gray-500 mb-8">
        한 줄로 간단히 메시지를 남겨주세요 ☺️
      </p>

      <textarea
        className="w-full border rounded-lg p-3 h-28 mb-4"
        placeholder="응원의 한마디를 남겨주세요!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={submitMessage}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        등록하기
      </button>

      {status && <p className="mt-6 text-gray-700">{status}</p>}
    </div>
  )
}
