"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowDown, Instagram, MessageCircle, Mail, Youtube,
  Facebook, Twitter, Globe, Linkedin, Settings, X,
  Plus, Github, Twitch, Send, MessageSquare
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

// 아이콘 리스트
const AVAILABLE_ICONS = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  discord: MessageSquare,
  twitch: Twitch,
  telegram: Send,
  globe: Globe,
  message: MessageCircle,
  mail: Mail,
  plus: Plus,
  settings: Settings,
  x: X,
  arrowDown: ArrowDown,
}

export function Hero() {
  const { getData, saveData, isEditMode, saveToFile, saveFieldToFile } =
    useInlineEditor()

  const defaultSocialLinks = [
    { name: "Mail", icon: "mail", url: "yvulw@naver.com" },
    { name: "Instagram", icon: "instagram", url: "https://instagram.com/iyvulw" },
    { name: "YouTube", icon: "youtube", url: "https://youtube.com/@yvulw" },
    { name: "Blog", icon: "discord", url: "https://blog.naver.com/yvulw" },
  ]

  const defaultInfo = {
    greeting: "안녕하세요",
    name: "김민아입니다",
    title: "MINAH KIM",
    description: "",
    profileImage: "/uploads/profile.jpg",
    backgroundOpacity: 0.1,
  }

  const [backgroundData, setBackgroundData] = useState({
    image: "",
    video: "",
    color: "",
    opacity: 0.1,
  })

  const [heroInfo, setHeroInfo] = useState(defaultInfo)
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks)
  const [showSocialEditor, setShowSocialEditor] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState<number | null>(null)

  // 데이터 로드
  useEffect(() => {
    const savedData = getData("hero-info")
    if (savedData) setHeroInfo({ ...defaultInfo, ...savedData })

    const savedSocial = getData("hero-social-links")
    if (savedSocial) setSocialLinks(savedSocial)

    const savedBg = getData("hero-background")
    if (savedBg) setBackgroundData(savedBg)
  }, [isEditMode])

  // heroInfo 업데이트
  const updateHeroInfo = (key: string, value: string) => {
    const newInfo = { ...heroInfo, [key]: value }
    setHeroInfo(newInfo)
    saveData("hero-info", newInfo)
  }

  const scrollToAbout = () => {
    const el = document.querySelector("#about")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToProjects = () => {
    const el = document.querySelector("#projects")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  // 소셜 아이콘 렌더링
  const renderSocialIcon = (link, index) => {
    const Icon = AVAILABLE_ICONS[link.icon] || Globe
    const isEmail = link.icon === "mail" || link.url.startsWith("mailto:")
    const href = isEmail && !link.url.startsWith("mailto:")
      ? `mailto:${link.url}`
      : link.url

    if (!link.url && !isEditMode) return null

    return (
      <a
        key={index}
        href={href || "#"}
        target={isEmail ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all hover:scale-110"
      >
        <Icon className="h-5 w-5" />
      </a>
    )
  }

  return (
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const newData = { ...backgroundData, ...data }
        setBackgroundData(newData)
        saveData("hero-background", newData)
      }}
      storageKey="hero-background"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <section id="hero" className="w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* 왼쪽 텍스트 */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-2">
                <EditableText
                  value={heroInfo.greeting}
                  onChange={(v) => updateHeroInfo("greeting", v)}
                  storageKey="hero-greeting"
                />
              </h2>

              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <EditableText
                  value={heroInfo.name}
                  onChange={(v) => updateHeroInfo("name", v)}
                  storageKey="hero-name"
                />
              </h1>

              <p className="text-2xl mb-4 text-muted-foreground">
                <EditableText
                  value={heroInfo.title}
                  onChange={(v) => updateHeroInfo("title", v)}
                  storageKey="hero-title"
                />
              </p>

              <p className="text-lg mb-8 text-muted-foreground">
                <EditableText
                  value={heroInfo.description}
                  onChange={(v) => updateHeroInfo("description", v)}
                  storageKey="hero-description"
                  multiline
                />
              </p>

              {/* 프로젝트 버튼 */}
              <Button onClick={scrollToProjects} size="lg">
                {heroInfo.projectButton || "프로젝트 보기"}
              </Button>

              {/* 소셜 */}
              <div className="flex gap-4 flex-wrap items-center mt-8">
                {socialLinks.map(renderSocialIcon)}
                {isEditMode && (
                  <button
                    onClick={() => setShowSocialEditor(true)}
                    className="w-10 h-10 rounded-full border-2 border-dashed border-foreground/20 flex items-center justify-center"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

           {/* 오른쪽: 프로필 이미지 */}
<div className="order-1 md:order-2 flex justify-center">
  <div className="relative">
    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
  <EditableMedia
  value={heroInfo.profileImage || "/uploads/profile.jpg"}
  onChange={(url) => updateHeroInfo("profileImage", url)}
  type="image"
  storageKey="hero-profileImage"
  className="w-full h-full object-cover"
  alt="프로필"
/>

    </div>
  </div>
</div>


          </div>
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </button>
      </section>

      {/* 소셜 링크 편집 모달 */}
      {showSocialEditor && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">소셜 링크 편집</h3>
              <button
                onClick={() => setShowSocialEditor(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {socialLinks.map((link, index) => {
                const Icon = AVAILABLE_ICONS[link.icon as keyof typeof AVAILABLE_ICONS] || Globe
                
                return (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    {/* 아이콘 미리보기 */}
                    <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    {/* 플랫폼 이름 입력 */}
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => updateSocialLink(index, 'name', e.target.value)}
                      placeholder="플랫폼 이름"
                      className="w-32 px-3 py-2 border rounded-lg bg-background"
                    />
                    
                    {/* 아이콘 선택 버튼 */}
                    <div className="relative">
                      <button
                        onClick={() => setShowIconPicker(showIconPicker === index ? null : index)}
                        className="px-3 py-2 border rounded-lg bg-background hover:bg-muted flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">아이콘 변경</span>
                      </button>
                      
                      {/* 아이콘 선택 드롭다운 */}
                      {showIconPicker === index && (
                        <div className="absolute top-full mt-2 left-0 bg-background border rounded-lg shadow-lg p-2 z-50 w-64 max-h-64 overflow-y-auto">
                          <div className="text-xs font-medium text-muted-foreground mb-2 px-2">소셜 미디어</div>
                          <div className="grid grid-cols-4 gap-1">
                            {[
                              { value: 'instagram', label: 'Instagram' },
                              { value: 'youtube', label: 'YouTube' },
                              { value: 'facebook', label: 'Facebook' },
                              { value: 'twitter', label: 'Twitter' },
                              { value: 'linkedin', label: 'LinkedIn' },
                              { value: 'github', label: 'GitHub' },
                              { value: 'discord', label: 'Discord' },
                              { value: 'twitch', label: 'Twitch' },
                              { value: 'telegram', label: 'Telegram' },
                              { value: 'message', label: '메시지' },
                              { value: 'mail', label: '이메일' },
                              { value: 'globe', label: '웹사이트' }
                            ].map(({ value, label }) => {
                              const IconOption = AVAILABLE_ICONS[value as keyof typeof AVAILABLE_ICONS]
                              return (
                                <button
                                  key={value}
                                  onClick={() => {
                                    updateSocialLink(index, 'icon', value)
                                    setShowIconPicker(null)
                                  }}
                                  className="p-2 hover:bg-muted rounded-lg flex flex-col items-center gap-1 transition-colors"
                                  title={label}
                                >
                                  <IconOption className="h-5 w-5" />
                                  <span className="text-xs">{label}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* URL 입력 */}
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                      placeholder="URL 또는 이메일"
                      className="flex-1 px-3 py-2 border rounded-lg bg-background"
                    />
                    
                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => removeSocialLink(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
              
              <button
                onClick={addSocialLink}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                소셜 링크 추가
              </button>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 플랫폼 이름을 입력하고, 아이콘을 선택한 후 URL을 입력하세요. 빈 URL은 표시되지 않습니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSocialEditor(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    // Hero 컴포넌트의 모든 데이터를 수집
                    const allData = {
                      greeting: heroInfo.greeting,
                      name: heroInfo.name,
                      title: heroInfo.title,
                      description: heroInfo.description,
                      profileImage: heroInfo.profileImage,
                      backgroundImage: backgroundData?.image || "",
                      backgroundVideo: backgroundData?.video || "",
                      backgroundOpacity: backgroundData?.opacity || 0.1,
                      projectButton: heroInfo.projectButton,
                    }
                    
                    // heroInfo 파일에 저장
                    const success1 = await saveToFile('hero', 'Info', allData)
                    
                    // 소셜 링크도 파일에 저장 (defaultSocialLinks 필드 업데이트)
                    const success2 = await saveFieldToFile('hero', 'defaultSocialLinks', socialLinks)
                    
                    if (success1 && success2) {
                      // localStorage도 업데이트
                      saveData('hero-info', heroInfo)
                      saveData('hero-social-links', socialLinks)
                      saveData('hero-background', backgroundData)
                      alert('✅ 파일이 성공적으로 저장되었습니다!\n\n이제 F5를 눌러도 변경사항이 유지됩니다.')
                      setShowSocialEditor(false)
                    } else {
                      alert('❌ 파일 저장에 실패했습니다.')
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </EditableBackground>
  )
}

