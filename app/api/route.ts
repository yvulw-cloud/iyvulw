import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "guestbook.json")

// GET: 모든 글 가져오기 (너만 볼 admin 페이지에서 사용)
export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
  return NextResponse.json(data)
}

// POST: 새로운 방명록 메시지 저장
export async function POST(req: Request) {
  const { message } = await req.json()

  if (!message || message.trim() === "") {
    return NextResponse.json({ error: "메시지를 입력하세요." }, { status: 400 })
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"))

  const newEntry = {
    id: Date.now(),
    message,
    createdAt: new Date().toISOString(),
  }

  data.push(newEntry)

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  return NextResponse.json({ success: true })
}
