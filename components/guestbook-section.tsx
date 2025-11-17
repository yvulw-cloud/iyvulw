"use client"

import { useState, useEffect } from "react"

export default function GuestbookSection() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  // 로컬스토리지에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("guestbook-messages")
    if (saved) setMessages(JSON.parse(saved))
  }, [])

  // 저장
  const save = (newMessages: string[]) => {
    setMessages(newMessages)
    localStorage.setItem("guestbook-messages", JSON.stringify(newMessages))
  }

  const addMessage = () => {
    if (!input.trim()) return
    const newMessages = [...messages, input.trim()]
    save(newMessages)
    setInput("")
  }

  return (
    <section id="guestbook" className="py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">📘 Guestbook</h2>

        {/* 입력창 */}
        <div className="flex gap-3 justify-center mb-8">
          <input
            className="flex-1 max-w-md px-4 py-2 border rounded-lg bg-background"
            placeholder="방명록에 한 줄 남겨주세요 :)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={addMessage}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            등록
          </button>
        </div>

        {/* 메시지 리스트 */}
        <div className="space-y-3 max-w-md mx-auto text-left">
          {messages.length === 0 && (
            <p className="text-muted-foreground">아직 방명록이 비어있어요!</p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg bg-muted/30 backdrop-blur"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
