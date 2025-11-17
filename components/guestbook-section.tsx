"use client"

import Link from "next/link"

export default function GuestbookSection() {
  return (
    <section className="py-16 border-t mt-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Guestbook
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">
          아래 버튼을 누르면 좋을 일이 일어날거에요
        </p>

         <Link
          href="/guestbook"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full
                     text-white text-sm sm:text-base font-medium
                     transition-all
                     bg-[#11126A]
                     hover:bg-[#0f105d]
                     active:scale-95"
        >
          나를 눌러욤🎁
        </Link>
      </div>
    </section>
  )
}
