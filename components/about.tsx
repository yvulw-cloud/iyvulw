"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, Award, Heart, Coffee, Book, Plus, X, Settings, Calendar, Building, User, Trophy, Star, Lightbulb, Target, Rocket, Shield, Sparkles, Code, Database, Palette, Megaphone, BarChart3, LineChart, PieChart, Activity, Brain, Cpu, Layers, Package, Server, Smartphone, Monitor, Wifi, Cloud, Lock, Key, Eye, Search, Filter, Edit, FileText, FolderOpen, GitBranch, Hash, Inbox, Send, MessageSquare, Music, Camera, Video, Mic, Volume2, Headphones, Radio, Zap, Globe, Users, TrendingUp, BookOpen, MapPin, Clock, CheckCircle, AlertCircle, Home, School } from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"


// 사용 가능한 아이콘들 - 경험 카드용
const AVAILABLE_ICONS = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  award: Award,
  trophy: Trophy,
  star: Star,
  lightbulb: Lightbulb,
  target: Target,
  rocket: Rocket,
  shield: Shield,
  building: Building,
  calendar: Calendar,
  book: Book,
  heart: Heart,
  coffee: Coffee,
  user: User,
  zap: Zap,
  globe: Globe,
  users: Users,
  trending: TrendingUp,
  bookOpen: BookOpen,
  mapPin: MapPin,
  clock: Clock,
  check: CheckCircle,
  alert: AlertCircle,
  home: Home,
  school: School,
}

// 사용 가능한 아이콘들 - 스킬용
const SKILL_ICONS = {
  trophy: Trophy,
  sparkles: Sparkles,
  target: Target,
  rocket: Rocket,
  star: Star,
  zap: Zap,
  lightbulb: Lightbulb,
  brain: Brain,
  code: Code,
  database: Database,
  palette: Palette,
  megaphone: Megaphone,
  barChart: BarChart3,
  lineChart: LineChart,
  pieChart: PieChart,
  activity: Activity,
  cpu: Cpu,
  layers: Layers,
  package: Package,
  server: Server,
  smartphone: Smartphone,
  monitor: Monitor,
  wifi: Wifi,
  cloud: Cloud,
  lock: Lock,
  key: Key,
  eye: Eye,
  search: Search,
  filter: Filter,
  edit: Edit,
  fileText: FileText,
  folderOpen: FolderOpen,
  gitBranch: GitBranch,
  hash: Hash,
  inbox: Inbox,
  send: Send,
  messageSquare: MessageSquare,
  music: Music,
  camera: Camera,
  video: Video,
  mic: Mic,
  volume: Volume2,
  headphones: Headphones,
  radio: Radio,
  heart: Heart,
  shield: Shield,
  globe: Globe,
  users: Users,
}

export function About() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()
  const [openedStoryIndex, setOpenedStoryIndex] = useState<number | null>(null)
  const [hobbyImages, setHobbyImages] = useState<Record<number, string>>({})
  const [openHobbyIndex, setOpenHobbyIndex] = useState<number | null>(null)
  const [travelImages, setTravelImages] = useState<string[]>(Array(9).fill(""))
  const [readingQuotes, setReadingQuotes] = useState<string[]>([""])
  const [volunteerImage, setVolunteerImage] = useState<string>("")
  const [volunteerTexts, setVolunteerTexts] = useState<string[]>([""])

  useEffect(() => {
    if (openHobbyIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [openHobbyIndex])


  // 기본 데이터
  const defaultExperienceCards = [
    {
      period: "2025.03. - 2025.12.",
      title: "단국대학교 도시계획부동산학부 답사동아리 시공인",
      description:
        "용산(국제업무지구 개발), 화성행궁(도시재생 성공 사례) 등 도시 내 다양한 공간을 정기적으로 답사하며 도시공간의 구조, 이용 패턴, 전략 등을 분석·토론하고, 그 결과를 공식 블로그에 게시함.",
    },
    {
      period: "2025.01. - 2025.12.",
      title: "단국대학교 사진동아리 DANSA 홍보부장",
      description:
        "단국대학교 사진동아리 DANSA 홍보부장으로 활동하며 공식 로고 제작 등 동아리 운영을 지원하고, 정기사진전 기획에 참여함. 사진전 홍보물 제작 과정에서 포토샵·일러스트·인디자인을 활용하여 포스터, 토록 등의 굿즈를 제작함.",
    },
    {
      period: "2024.09. - 2024.12.",
      title: "단국대학교 사진동아리 DANSA 홍보부원",
      description:
        "단국대학교 사진동아리 DANSA 홍보부원으로 활동하며 출사지 선정 및 동아리 행사 운영을 지원하고, 정기사진전 기획에 참여함. 사진전 홍보물 제작 과정에서 포토샵·일러스트·인디자인을 활용하여 포스터, 토록 등의 굿즈를 제작함.",
    },
    {
      period: "2022.03. - 2022.06.",
      title: "KT&G 상상프렌즈 14기",
      description:
        "상상프렌즈 행사 영상 제작을 비롯하여, 두 개의 메인 프로그램(‘청춘바다바다’, ‘제로웨이스트 Zero정했다!’)의 기획·무대 진행 등의 활동에 적극적으로 참여함.",
    },
    {
      period: "2022.01. - 2022.12.",
      title: "제주대학교 관광개발학과 기획부장",
      description:
        "2022학년도 관광개발학과 기획부장으로서 신입생 오리엔테이션, 학과 MT 등 다양한 행사를 주도적으로 기획·진행함. 특히, 학과 구성원의 개별적 특성을 파악하고 존중하는 리더십을 발휘하여 모든 학생이 대학 생활에 원활히 적응하도록 지원함.",
    },
    {
      period: "2021.03. - 2021.11.",
      title: "제5회 대한민국 청년의 날 기획홍보단 이벤트기획팀장",
      description:
        "제5회 대한민국 청년의 날 기획홍보단 이벤트 기획팀장으로 활동하며 전반적인 이벤트 기획 및 운영을 주도적으로 총괄함. 우수활동자로 선정되어 문화체육관광부 원장상을 수상함.",
    },
    {
      period: "2021.11. - 2022.02.",
      title: "제주대학교 35대 경상대학 학생회 ‘시작’ 선거운동본부 홍보국장",
      description:
        "제주대학교 35대 경상대학 학생회 ‘시작’ 선거운동본부 홍보국장으로서 공약 사업 정리, 홍보물 디자인, 콘텐츠 제작, 사진·영상 촬영, SNS 홍보 관리 등 선거본부의 실무 전반에 참여함. (당선)",
    },
    {
      period: "2021.03. - 2021.12.",
      title: "제주대학교 관광개발학과 2학년 부과대표",
      description:
        "2021학년도 관광개발학과 2학년 부과대표로서 다양한 학과 프로그램과 행사를 기획·진행하여 학과 운영에 적극적으로 참여함.",
    },
  ];

  const defaultInfo = {
    title: "Education",
    subtitle: "",
    background: { "image": "", "video": "", "color": "", "opacity": 0.1 },
    experienceCards: [{ "icon": "graduation", "title": "단국대학교 사진동아리 DANSA 홍보부장", "period": "2025.01. -", "description": "단국대학교 사진동아리 DANSA 홍보부장으로 활동하며 출사지 선정 및 동아리 행사 운영을 지원하고, 정기사진전 기획에 참여함. 사진전 홍보물 제작 과정에서 포토샵·일러스트·인디자인을 활용하여 포스터, 도록 등의 굿즈를 제작함." }, { "icon": "graduation", "title": "단국대학교 사진동아리 DANSA 홍보부원", "period": "2024.09. - 2024.12.", "description": "단국대학교 사진동아리 DANSA 홍보부원으로 활동하며 출사지 선정 및 동아리 행사 운영을 지원하고, 정기사진전 기획에 참여함. 사진전 홍보물 제작 과정에서 포토샵·일러스트·인디자인을 활용하여 포스터, 도록 등의 굿즈를 제작함." }, { "icon": "graduation", "title": "KT&G 상상프렌즈 14기", "period": "2022.03. - 20202.06.", "description": "상상프렌즈 행사 영상 제작을 비롯하여, 두 개의 메인 프로그램( ‘청춘바다다바다’, ‘제로웨이스트 Zero정했다!’)의 기획·무대 진행 등의 활동에 적극적으로 참여함." }, { "period": "2022.01. - 2022.12.", "title": "제주대학교 관광개발학과 기획부장", "role": "", "description": "2022학년도 관광개발학과 기획부장으로서 신입생 오리엔테이션, 학과 MT 등 다양한 행사를 주도적으로 기획·진행함. 특히, 학과 구성원의 개별적 특성을 파악하고 존중하는 리더십을 발휘하여 모든 학생이 대학 생활에 원활히 적응하도록 지원함." }, { "period": "2021.03. - 2021.11.", "title": "제5회 대한민국 청년의 날 기획홍보단 이벤트기획팀장", "role": "", "description": "제5회 대한민국 청년의 날 기획홍보단 이벤트 기획팀 팀장으로 활동하며 전반적인 이벤트 기획 및 운영을 주도적으로 총괄함. 우수활동자로 선정되어 문화체육관광부 의원상을 수상함." }, { "period": "2021.11. - 2022.02.", "title": "제주대학교 35대 경상대학 학생회 ‘시작’ 선거운동본부 홍보국장", "role": "", "description": "제주대학교 35대 경상대학 학생회 ‘시작’ 선거본부 홍보국장으로서 공약 시안 정리, 홍보물 디자인, 콘텐츠 제작, 사진·영상 촬영, SNS 홍보 관리 등 선거본부의 실무 전반에 참여함. (당선)" }, { "period": "2021.03. - 2021.12.", "title": "제주대학교 관광개발학과 2학년 과대표", "role": "", "description": "2021학년도 관광개발학과 2학년 부과대로서 다양한 학과 프로그램과 행사를 기획·진행하여 학과 운영에 적극적으로 참여함." }],
    skills: [{ "icon": "barChart", "title": "Excel", "description": "데이터 분석 및 문서 관리 역량 / 컴퓨터활용능력 2급", "barHeight": 15, "barWidth": 90, "barColor": "#11126A" }, { "icon": "palette", "title": "Adobe Illustrator, InDesign", "description": "시각 디자인 및 콘텐츠 제작 경험", "barHeight": 15, "barWidth": 95, "barColor": "#11126A" }, { "icon": "gitBranch", "title": "Git / GitHub", "description": "GitHub, Vercel을 활용한 포트폴리오 제작 · 배포 경험", "barHeight": 15, "barWidth": 100, "barColor": "#11126A" }],
    storyTitle: "Experience",
    story: [{ "text": "2025 단국대학교 사진동아리 DANSA 홍보부장", "buttonColor": "#11126A", "desc": "", "role": "", "date": "2025.01. -" }, { "text": "2024 단국대학교 사진동아리 DANSA 홍보부원", "buttonColor": "#11126A", "date": "2024.01. - 2024.12." }, { "text": "2022 KT&G 상상프렌즈 14기 B팀 팀장", "buttonColor": "#11126A", "date": "2022.03. - 2022.6." }, { "text": "2022 제주대학교 관광개발학과 기획부장", "buttonColor": "#11126A", "date": "2022.01. - 2022.12." }, { "text": "2021 제5회 대한민국 청년의 날 기획홍보단 이벤트기획팀 팀장", "buttonColor": "#11126A", "date": "2021.03 - 2021.11." }, { "text": "제주대학교 35대 경상대학학생회 ‘시작’ 선거운동본부 홍보국장", "buttonColor": "#11126A", "date": "2021.10. - 2021.11." }, { "text": "제주대학교 관광개발학과  2학년 과대표", "buttonColor": "#11126A", "date": "2021.01. - 2021.12." }, { "text": "2020 제주대학교 학습공동체 기획부장", "buttonColor": "#11126A", "date": "2020.03. - 2020.08." }],
    storyImage: "",
    hobbies: ["✈️ 여행", "📚 독서", "🌱 봉사"],
    awardTitle: "Awards",
    careerTitle: "수상",
    honorTitle: "Honors",
    honorSubtitle: "장학·공로 내역을 입력하세요",
    honorCards: [{ "title": "2020-2 성적우수장학금", "period": "제주대학교 관광개발학과", "description": "(전액)", "icon": "medal" }, { "title": "2021-1 성적우수장학금", "period": "제주대학교 관광개발학과", "description": "(전액)", "icon": "medal" }, { "title": "2021 -2 성적우수장학금", "period": "제주대학교 관광개발학과", "description": "(전액)", "icon": "medal" }, { "title": "2022-1 성적우수장학금", "period": "제주대학교 관광개발학과", "description": "(전액)", "icon": "medal" }, { "title": "2024-1 단우장학금", "period": "단국대학교 도시계획부동산학부", "description": "​", "icon": "medal" }, { "title": "2024-2 단우장학금", "period": "단국대학교 도시계획부동산학부", "description": "​", "icon": "medal" }, { "title": "2025-1 성적우수장학금", "period": "단국대학교 도시계획부동산학부", "description": "​", "icon": "medal" }],
    awardSubtitle: "텍스트를 입력하세요",
    awardCards: [{ "title": "제주대학교 총장상", "period": "2021.2.19.", "description": "일러스트 등 디자인툴을 익혀 제작한 대학 생활 안내 자료를 배포하여 학우들의 정보 접근성 향상에 기여하였으며, 이 활동으로 『2020학년도 제주대학교 학습공동체』 대상을 수상함.", "icon": "trophy" }, { "title": "국회 문화체육관광 위원장 표창", "period": "2021.12.06.", "description": "제5회 대한민국 청년의 날 우수활동자", "icon": "trophy" }, { "title": "용인시장 표창", "period": "2022.12.9.", "description": "용인시 우수봉사자 유공 표창 수상", "icon": "trophy" }, { "title": "2024-1 단러닝 공모전 장려상", "period": "2021.02.19.", "description": "‘부동산빅데이터분석’ 과제 기반 신혼부부 주택 마련 프로젝트로 학생 중심 자율적 학습공동체 공모전 장려상을 수상함.", "icon": "trophy" }],
    coreTitle: "Skills",
    educationCards: [{ "school": "용인 서원고등학교", "period": "2020 졸업", "description": " " }, { "school": "제주대학교 관광개발학과", "period": "2020 - 2023", "description": "GPA: 4.23/4.3" }, { "school": "단국대학교 도시계획부동산학부", "period": "2024 - 2026(졸업예정)", "description": "GPA: /4.5" }],
    hobbyTitle: "Interests",
    languageTitle: "Languages",
    languages: [{ "icon": "globe", "title": "TOEIC", "description": "830점" }, { "icon": "globe", "title": "IELTS", "description": "Overall 7.5" }, { "icon": "globe", "title": "HSK", "description": "5급 (253/300)" }],
    aboutIntroFirst: "시행착오가 많은 사람입니다.",
    aboutIntroBody: "16살 겨울, 미용실 인턴으로 일을 시작해 약 3년간 현장을 경험하고 인턴 과정을 수료했습니다. \n이후 디자이너 승급을 준비하는 과정에서, ‘잘하는 일’과 ‘평생 이어갈 일’은 다를 수 있다는 사실을 깨달았습니다.\n\n일을 하면서도 학업을 꾸준히 이어왔고, 좋아하던 여행을 계기로 관광학을 선택해 대학교에 진학했습니다. \n매 학기를 스스로 증명하는 시간이라 생각하며 성실히 공부했습니다. 그 태도는 전 학기 성적우수 장학금으로 이어졌습니다.\n\n전공을 공부하며 사람과 공간이 어떻게 연결되고 변화하는지에 대한 관심이 점점 깊어졌습니다. 이러한 관심은 자연스럽게 부동산 분야로 확장되었고, 단순히 공간을 향유하는 것이 아니라 도시 구조와 변화의 원리를 읽어내는 일에 더 큰 몰입을 느꼈습니다.\n\n여러 시행착오 끝에 알게 된 것은, 하고 있는 일에서 의미와 배움을 찾아가려는 태도가 제가 가진 가장 큰 힘이라는 것입니다. \n이 태도를 오래 잊지 않고 꾸준히 성장해 나가겠습니다."
  }

  const DEFAULT_ABOUT_INFO = {
    title: "",
    subtitle: "",
    experienceCards: [],
    awardTitle: "",
    awardSubtitle: "",
    awardCards: [],
    honorTitle: "",
    honorSubtitle: "",
    honorCards: [],
  };


  const [aboutInfo, setAboutInfo] = useState(defaultInfo)
  const [backgroundData, setBackgroundData] = useState(
    defaultInfo.background
  )
  const [showCareerModal, setShowCareerModal] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showHobbyModal, setShowHobbyModal] = useState(false)

  // localStorage에서 데이터 로드 - 편집 모드가 변경될 때마다 실행
  useEffect(() => {
    const savedData = getData('about-info') as typeof defaultInfo | null

    if (savedData) {
      setAboutInfo((prev) => ({ ...prev, ...savedData }))

      // background 데이터가 있으면 설정
      if (savedData.background) {
        setBackgroundData(savedData.background)
      }
    }

    const savedBg = getData('about-background') as {
      image: string
      video: string
      color: string
      opacity: number
    } | null

    if (savedBg) {
      setBackgroundData(savedBg)
    }
  }, [isEditMode]) // isEditMode가 변경될 때마다 데이터 다시 로드


  const updateAboutInfo = (key: string, value: string | boolean | typeof aboutInfo.skills | typeof aboutInfo.experienceCards | typeof aboutInfo.story | typeof aboutInfo.hobbies | number) => {
    const newInfo = { ...aboutInfo, [key]: value }
    setAboutInfo(newInfo)
    saveData('about-info', newInfo)
  }

  const updateExperienceCard = (index: number, field: string, value: string) => {
    const newCards = [...aboutInfo.experienceCards]
    newCards[index] = { ...newCards[index], [field]: value }
    updateAboutInfo('experienceCards', newCards)
  }

  const addExperienceCard = () => {
    updateAboutInfo('experienceCards', [...aboutInfo.experienceCards, {
      icon: "briefcase",
      title: "새 경험",
      period: "2024",
      description: "설명을 입력하세요"
    }])
  }

  const removeExperienceCard = (index: number) => {
    updateAboutInfo('experienceCards', aboutInfo.experienceCards.filter((_, i) => i !== index))
  }

  const updateSkill = (index: number, field: string, value: string) => {
    const newSkills = [...aboutInfo.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    updateAboutInfo('skills', newSkills)
  }

  const addSkill = () => {
    updateAboutInfo('skills', [...aboutInfo.skills, { icon: "star", title: "새 스킬", description: "스킬 설명" }])
  }

  const removeSkill = (index: number) => {
    updateAboutInfo('skills', aboutInfo.skills.filter((_, i) => i !== index))
  }

  const updateStory = (index: number, value: string) => {
    const newStory = [...aboutInfo.story]
    newStory[index] = value
    updateAboutInfo('story', newStory)
  }

  const addStory = () => {
    updateAboutInfo('story', [...aboutInfo.story, "새로운 문단"])
  }

  const removeStory = (index: number) => {
    updateAboutInfo('story', aboutInfo.story.filter((_, i) => i !== index))
  }

  const updateHobby = (index: number, value: string) => {
    const newHobbies = [...aboutInfo.hobbies]
    newHobbies[index] = value
    updateAboutInfo('hobbies', newHobbies)
  }

  const addHobby = () => {
    updateAboutInfo('hobbies', [...aboutInfo.hobbies, "🎯 새 취미"])
  }

  const removeHobby = (index: number) => {
    updateAboutInfo('hobbies', aboutInfo.hobbies.filter((_, i) => i !== index))
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
        saveData("about-background", newData)
      }}
      storageKey="about-background"
      className="py-20 bg-muted/30 relative"
    >
      <section id="about" className="w-full">
        <div className="max-w-7xl mx-auto px-[14px] sm:px-[28px] lg:px-[36px]">


          {/* ===== About Intro ===== */}
          <section id="about-intro" className="mb-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                <EditableText
                  value={aboutInfo.aboutIntroTitle || "About Me"}
                  onChange={(value) => updateAboutInfo("aboutIntroTitle", value)}
                  storageKey="about-intro-title"
                />
              </h2>

              {/* 본문 */}
              <div className="text-lm sm:text-base leading-relaxed text-muted-foreground space-y-2">

                {/* 첫 줄 Bold */}
                <p className="font-semibold">
                  <EditableText
                    value={aboutInfo.aboutIntroFirst || "여기에 첫 문장을 입력하세요."}
                    onChange={(value) => updateAboutInfo("aboutIntroFirst", value)}
                    storageKey="about-intro-first"
                  />
                </p>

                {/* 나머지 본문 (일반 텍스트) */}
                <p className="whitespace-pre-line">
                  <EditableText
                    value={aboutInfo.aboutIntroBody || ""}
                    onChange={(value) => updateAboutInfo("aboutIntroBody", value)}
                    storageKey="about-intro-body"
                  />
                </p>

              </div>

            </div>
          </section>


          {/*  Education  */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">

              <EditableText
                value={aboutInfo.educationTitle || "Education"}
                onChange={(value) => updateAboutInfo("educationTitle", value)}
                storageKey="about-education-title"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {(aboutInfo.educationCards || []).map((edu, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative"
              >
                <CardContent className="p-6">
                  {isEditMode && (
                    <button
                      onClick={() => {
                        const next = [...(aboutInfo.educationCards || [])]
                        next.splice(index, 1)
                        updateAboutInfo("educationCards", next)
                      }}
                      className={COMMON_STYLES.deleteButton}
                    >
                      <X className={COMMON_STYLES.deleteIcon} />
                    </button>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      {/* 학교/기관 이름 */}
                      <h3 className="font-semibold text-foreground mb-1">
                        <EditableText
                          value={edu.school || "학교 / 기관 이름"}
                          onChange={(value) => {
                            const next = [...(aboutInfo.educationCards || [])]
                            next[index] = { ...(next[index] || {}), school: value }
                            updateAboutInfo("educationCards", next)
                          }}
                          storageKey={`about-education-${index}-school`}
                        />
                      </h3>

                      {/* 기간 */}
                      <p className="text-sm text-primary mb-2">
                        <EditableText
                          value={edu.period || "2021 - 2025"}
                          onChange={(value) => {
                            const next = [...(aboutInfo.educationCards || [])]
                            next[index] = { ...(next[index] || {}), period: value }
                            updateAboutInfo("educationCards", next)
                          }}
                          storageKey={`about-education-${index}-period`}
                        />
                      </p>

                      {/* 전공 / 설명 */}
                      <p className="text-sm text-muted-foreground">
                        <EditableText
                          value={edu.description || "전공 / 수료 과정 / 주요 과목을 입력하세요"}
                          onChange={(value) => {
                            const next = [...(aboutInfo.educationCards || [])]
                            next[index] = { ...(next[index] || {}), description: value }
                            updateAboutInfo("educationCards", next)
                          }}
                          storageKey={`about-education-${index}-description`}
                          multiline
                        />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* 추가 버튼 */}
            {isEditMode && (
              <Card
                className="border-2 border-dashed border-muted-foreground/30 shadow-none hover:border-primary transition-all cursor-pointer"
                onClick={() => {
                  const next = [
                    ...(aboutInfo.educationCards || []),
                    {
                      school: "새 교육 이력",
                      period: "",
                      description: "",
                    },
                  ]
                  updateAboutInfo("educationCards", next)
                }}
              >
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">교육 이력 추가</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ===== Experience ===== */}
          <section className="mt-24 mb-24">
            <div className="max-w-4xl mx-auto px-4">

              {/* 제목 */}
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Experience</h2>
              </div>

              <div className="relative">
                {/* 세로 라인 */}
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 border-l border-muted-foreground/20" />

                <div className="space-y-8">
                  {defaultExperienceCards.map((card, index) => (
                    <div key={index} className="relative flex gap-4 sm:gap-6">

                      {/* 타임라인 점 */}
                      <div className="flex flex-col items-center pt-2">
                        <div className="w-3 h-3 rounded-full bg-foreground z-10" />
                      </div>

                      {/* 카드 */}
                      <div className="flex-1 max-w-3xl group">
                        <div
                          className="
                  relative overflow-hidden
                  rounded-2xl
                  border border-muted-foreground/10
                  bg-gradient-to-br from-white to-muted/40
                  shadow-sm
                  group-hover:shadow-md group-hover:-translate-y-[2px]
                  transition-all duration-200
                "
                        >
                          {/* 카드 헤더: 기간 */}
                          <div className="flex items-center justify-between px-5 py-2.5 border-b border-muted-foreground/10 bg-white/70 backdrop-blur-sm">
                            <span className="inline-flex items-center text-[11px] sm:text-xs text-muted-foreground">
                              {card.period}
                            </span>
                          </div>

                          {/* 카드 본문 */}
                          <div className="px-5 py-4 sm:px-6 sm:py-5">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                              {card.title}
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                              {card.description}
                            </p>
                          </div>

                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ===== Awards ===== */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              <EditableText
                value={aboutInfo.awardTitle || "수상"}
                onChange={(value) => updateAboutInfo("awardTitle", value)}
                storageKey="about-award-title"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {(aboutInfo.awardCards || []).map((card, index) => {
              const Icon =
                AVAILABLE_ICONS[card.icon as keyof typeof AVAILABLE_ICONS] || Briefcase
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative"
                >
                  <CardContent className="p-6">
                    {isEditMode && (
                      <button
                        onClick={() => {
                          const next = [...(aboutInfo.awardCards || [])]
                          next.splice(index, 1)
                          updateAboutInfo("awardCards", next)
                        }}
                        className={COMMON_STYLES.deleteButton}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          <EditableText
                            value={card.title}
                            onChange={(value) => {
                              const next = [...(aboutInfo.awardCards || [])]
                              next[index] = { ...(next[index] || {}), title: value }
                              updateAboutInfo("awardCards", next)
                            }}
                            storageKey={`about-award-${index}-title`}
                          />
                        </h3>
                        <p className="text-sm text-primary mb-2">
                          <EditableText
                            value={card.period}
                            onChange={(value) => {
                              const next = [...(aboutInfo.awardCards || [])]
                              next[index] = { ...(next[index] || {}), period: value }
                              updateAboutInfo("awardCards", next)
                            }}
                            storageKey={`about-award-${index}-period`}
                          />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <EditableText
                            value={card.description}
                            onChange={(value) => {
                              const next = [...(aboutInfo.awardCards || [])]
                              next[index] = { ...(next[index] || {}), description: value }
                              updateAboutInfo("awardCards", next)
                            }}
                            storageKey={`about-award-${index}-description`}
                          />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {isEditMode && (
              <Card
                className="border-2 border-dashed border-muted-foreground/30 shadow-none hover:border-primary transition-all cursor-pointer"
                onClick={() => {
                  const next = [
                    ...(aboutInfo.awardCards || []),
                    {
                      title: "새 수상 내역",
                      period: "",
                      description: "",
                      icon: "trophy",
                    },
                  ]
                  updateAboutInfo("awardCards", next)
                }}
              >
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">수상 카드 추가</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <section className="mt-32 mb-24"></section>



          {/* ===== Honors ===== */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              <EditableText
                value={aboutInfo.honorTitle || "Honors"}
                onChange={(value) => updateAboutInfo("honorTitle", value)}
                storageKey="about-honor-title"
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {(aboutInfo.honorCards || []).map((card, index) => {
              const Icon =
                AVAILABLE_ICONS[card.icon as keyof typeof AVAILABLE_ICONS] || Award
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative"
                >
                  <CardContent className="p-6">
                    {isEditMode && (
                      <button
                        onClick={() => {
                          const next = [...(aboutInfo.honorCards || [])]
                          next.splice(index, 1)
                          updateAboutInfo("honorCards", next)
                        }}
                        className={COMMON_STYLES.deleteButton}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          <EditableText
                            value={card.title}
                            onChange={(value) => {
                              const next = [...(aboutInfo.honorCards || [])]
                              next[index] = { ...(next[index] || {}), title: value }
                              updateAboutInfo("honorCards", next)
                            }}
                            storageKey={`about-honor-${index}-title`}
                          />
                        </h3>
                        <p className="text-sm text-primary mb-2">
                          <EditableText
                            value={card.period}
                            onChange={(value) => {
                              const next = [...(aboutInfo.honorCards || [])]
                              next[index] = { ...(next[index] || {}), period: value }
                              updateAboutInfo("honorCards", next)
                            }}
                            storageKey={`about-honor-${index}-period`}
                          />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <EditableText
                            value={card.description}
                            onChange={(value) => {
                              const next = [...(aboutInfo.honorCards || [])]
                              next[index] = { ...(next[index] || {}), description: value }
                              updateAboutInfo("honorCards", next)
                            }}
                            storageKey={`about-honor-${index}-description`}
                          />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {isEditMode && (
              <Card
                className="border-2 border-dashed border-muted-foreground/30 shadow-none hover:border-primary transition-all cursor-pointer"
                onClick={() => {
                  const next = [
                    ...(aboutInfo.honorCards || []),
                    {
                      title: "새 Honors 내역",
                      period: "",
                      description: "",
                      icon: "medal",
                    },
                  ]
                  updateAboutInfo("honorCards", next)
                }}
              >
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Honors 카드 추가</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <section className="mt-32 mb-24"></section>



          {/* ===== Skills ===== */}
          {(aboutInfo.skills.length > 0 || isEditMode) && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  <EditableText
                    value={aboutInfo.coreTitle || "핵심 역량"}
                    onChange={(value) => updateAboutInfo("coreTitle", value)}
                    storageKey="about-core-title"
                  />
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aboutInfo.skills.map((skill, index) => {
                  const Icon =
                    SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] || Trophy

                  const barWidth = skill.barWidth || 75
                  const barColor = skill.barColor || "#4F46E5"
                  const barHeight = skill.barHeight || 8

                  return (
                    <div key={index} className="text-center relative">
                      {isEditMode && (
                        <button
                          onClick={() => removeSkill(index)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}

                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>

                      <h4 className="font-semibold text-foreground mb-2">
                        <EditableText
                          value={skill.title}
                          onChange={(value) => updateSkill(index, "title", value)}
                          storageKey={`about-skill-${index}-title`}
                        />
                      </h4>

                      <p className="text-sm text-muted-foreground mb-4">
                        <EditableText
                          value={skill.description}
                          onChange={(value) => updateSkill(index, "description", value)}
                          storageKey={`about-skill-${index}-description`}
                          multiline
                        />
                      </p>

                      <div className="w-[65%] mx-auto">
                        <div
                          className="rounded-full overflow-hidden transition-all"
                          style={{
                            height: `${barHeight}px`,
                            backgroundColor: "hsl(240, 5%, 82%)",
                          }}
                        >
                          <div
                            className="rounded-full transition-all"
                            style={{
                              width: `${barWidth}%`,
                              height: `${barHeight}px`,
                              backgroundColor: barColor,
                            }}
                          />
                        </div>

                        {isEditMode && (
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <EditableText
                              value={String(barWidth)}
                              onChange={(value) =>
                                updateSkill(index, "barWidth", Number(value) || 0)
                              }
                              storageKey={`about-skill-${index}-barWidth`}
                            />
                            <EditableText
                              value={barColor}
                              onChange={(value) =>
                                updateSkill(index, "barColor", value)
                              }
                              storageKey={`about-skill-${index}-barColor`}
                            />
                            <EditableText
                              value={String(barHeight)}
                              onChange={(value) =>
                                updateSkill(index, "barHeight", Number(value) || 8)
                              }
                              storageKey={`about-skill-${index}-barHeight`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {isEditMode && (
                  <div
                    className="text-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-primary transition-all"
                    onClick={() => setShowSkillModal(true)}
                  >
                    <div>
                      <Settings className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">스킬 편집</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <section className="mt-32 mb-24"></section>


          {/* ===== Languages (Recommended) ===== */}
          {aboutInfo.languages?.length > 0 && (
            <div className="mb-16 mt-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  <EditableText
                    value={aboutInfo.languageTitle || "Languages"}
                    onChange={(value) => updateAboutInfo("languageTitle", value)}
                    storageKey="about-language-title"
                  />
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aboutInfo.languages.map((lang, index) => {
                  const Icon =
                    SKILL_ICONS[lang.icon as keyof typeof SKILL_ICONS] || Globe

                  return (
                    <div
                      key={index}
                      className="
              text-center
              rounded-2xl
              bg-white
              shadow-sm
              border border-black/5
              px-4 py-8
              hover:shadow-md
              transition-all
            "
                    >
                      {/* 시험별 아이콘 */}
                      <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>

                      {/* 시험명 */}
                      <h4 className="font-semibold text-foreground mb-1">
                        <EditableText
                          value={lang.title}
                          onChange={(value) => updateLanguage(index, "title", value)}
                          storageKey={`about-language-${index}-title`}
                        />
                      </h4>

                      {/* 점수/급수 — 더 강조 */}
                      <p className="text-sm text-muted-foreground font-normal">
                        <EditableText
                          value={lang.description}
                          onChange={(value) =>
                            updateLanguage(index, "description", value)
                          }
                          storageKey={`about-language-${index}-description`}
                        />
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}


          {/* ===== INTERESTS ===== */}
          {(aboutInfo.hobbies.length > 0 || isEditMode) && (
            <div className="mt-16 text-center">
              {/* 제목 */}
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                <EditableText
                  value={aboutInfo.hobbyTitle || "Interests"}
                  onChange={(value) =>
                    setAboutInfo((prev) => ({ ...prev, hobbyTitle: value }))
                  }
                  storageKey="about-hobby-title"
                />
              </h2>

              {/* 취미 버튼들 */}
              <div className="flex flex-wrap justify-center gap-3">
                {aboutInfo.hobbies.map((hobby, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      // 편집모드일 때는 클릭하면 이름 바꾸게만 하고
                      if (isEditMode) return

                      const hobbyName = hobby.toLowerCase()

                      if (hobbyName.includes("여행")) {
                        window.open("/travel", "_blank")
                      } else if (hobbyName.includes("독서") || hobbyName.includes("책")) {
                        window.open("/reading", "_blank")
                      } else if (hobbyName.includes("봉사")) {
                        window.open("/volunteer", "_blank")
                      } else {
                        alert("이 취미는 아직 별도 페이지가 준비되지 않았어요!")
                      }
                    }}
                    className="px-6 py-3 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2 hover:bg-primary/20 transition-all relative group"
                  >
                    {isEditMode ? (
                      <EditableText
                        value={hobby}
                        onChange={(value) => updateHobby(index, value)}
                        storageKey={`about-hobby-${index}`}
                      />
                    ) : (
                      <span>{hobby}</span>
                    )}

                    {isEditMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeHobby(index)
                        }}
                        className={`${COMMON_STYLES?.deleteButton || ""} opacity-0 group-hover:opacity-100 transition-opacity`}
                      >
                        <X className={COMMON_STYLES?.deleteIcon || "w-4 h-4"} />
                      </button>
                    )}
                  </button>
                ))}

                {isEditMode && (
                  <button
                    onClick={addHobby}
                    className="px-4 py-2 border border-dashed border-muted-foreground/30 rounded-full text-sm hover:border-primary transition-all"
                  >
                    <Settings className="h-4 w-4 inline mr-1" />
                    추가
                  </button>
                )}
              </div>
            </div>
          )}


          {/* 경험 카드 편집 모달 */}
          {showCareerModal && isEditMode && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
              <div className="bg-background border rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">경험 카드 편집</h3>
                  <button
                    onClick={() => setShowCareerModal(false)}
                    className="p-1 hover:bg-muted rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {aboutInfo.experienceCards?.map((card, index) => {
                    const Icon = AVAILABLE_ICONS[card.icon as keyof typeof AVAILABLE_ICONS] || Briefcase
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30">
                        {/* 아이콘 선택 */}
                        <select
                          value={card.icon}
                          onChange={(e) => updateExperienceCard(index, 'icon', e.target.value)}
                          className="w-40 px-2 py-2 border rounded-lg bg-background"
                        >
                          <option value="briefcase">💼 직장</option>
                          <option value="graduation">🎓 학교</option>
                          <option value="award">🏆 수상</option>
                          <option value="trophy">🏅 성과</option>
                          <option value="star">⭐ 우수</option>
                          <option value="lightbulb">💡 아이디어</option>
                          <option value="target">🎯 목표</option>
                          <option value="rocket">🚀 시작</option>
                          <option value="shield">🛡️ 보안</option>
                          <option value="building">🏢 회사</option>
                          <option value="calendar">📅 기간</option>
                          <option value="book">📚 교육</option>
                          <option value="heart">❤️ 열정</option>
                          <option value="coffee">☕ 일상</option>
                          <option value="user">👤 개인</option>
                        </select>

                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateExperienceCard(index, 'title', e.target.value)}
                            placeholder="예: ABC 회사, 서울대학교, 구글 자격증"
                            className="w-full px-3 py-2 border rounded-lg bg-background font-semibold"
                          />

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={card.period}
                              onChange={(e) => updateExperienceCard(index, 'period', e.target.value)}
                              placeholder="예: 2020 - 현재"
                              className="flex-1 px-3 py-2 border rounded-lg bg-background"
                            />

                            <input
                              type="text"
                              value={card.description}
                              onChange={(e) => updateExperienceCard(index, 'description', e.target.value)}
                              placeholder="예: 마케팅 매니저, 경영학 학사, GAIQ 인증"
                              className="flex-1 px-3 py-2 border rounded-lg bg-background"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => removeExperienceCard(index)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )
                  })}

                  <button
                    onClick={addExperienceCard}
                    className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    카드 추가
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCareerModal(false)}
                      className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                    >
                      닫기
                    </button>
                    <button
                      onClick={async () => {
                        const success = await saveToFile('about', 'Info', aboutInfo)
                        if (success) {
                          alert('✅ 소개 설정이 파일에 저장되었습니다!')
                          setShowCareerModal(false)
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

          {/* 스킬 편집 모달 */}
          {showSkillModal && isEditMode && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]">
              <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">핵심 역량 편집</h3>
                  <button
                    onClick={() => setShowSkillModal(false)}
                    className="p-1 hover:bg-muted rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {aboutInfo.skills.map((skill, index) => {
                    const Icon = SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] || Trophy
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30">
                        {/* 아이콘 선택 */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <select
                            value={skill.icon}
                            onChange={(e) => updateSkill(index, 'icon', e.target.value)}
                            className="w-32 px-2 py-1 text-xs border rounded-lg bg-background"
                          >
                            <optgroup label="기술 스킬">
                              <option value="code">💻 코드/개발</option>
                              <option value="database">🗜️ 데이터베이스</option>
                              <option value="server">🌐 서버/클라우드</option>
                              <option value="smartphone">📱 모바일</option>
                              <option value="monitor">🖥️ 프론트엔드</option>
                              <option value="cpu">🤖 AI/ML</option>
                              <option value="gitBranch">🌿 Git/버전관리</option>
                              <option value="lock">🔒 보안</option>
                            </optgroup>
                            <optgroup label="비즈니스">
                              <option value="barChart">📊 데이터 분석</option>
                              <option value="lineChart">📈 성과 분석</option>
                              <option value="pieChart">🥧 통계/시각화</option>
                              <option value="megaphone">📢 마케팅</option>
                              <option value="target">🎯 전략/기획</option>
                              <option value="users">👥 팀워크</option>
                            </optgroup>
                            <optgroup label="창의적 스킬">
                              <option value="palette">🎨 디자인</option>
                              <option value="camera">📷 사진/영상</option>
                              <option value="music">🎵 음악/오디오</option>
                              <option value="edit">✏️ 글쓰기/편집</option>
                              <option value="video">🎬 영상 제작</option>
                            </optgroup>
                            <optgroup label="일반 역량">
                              <option value="trophy">🏆 리더십</option>
                              <option value="sparkles">✨ 혁신</option>
                              <option value="rocket">🚀 실행력</option>
                              <option value="brain">🧠 분석력</option>
                              <option value="lightbulb">💡 창의력</option>
                              <option value="zap">⚡ 속도/효율</option>
                              <option value="star">⭐ 전문성</option>
                              <option value="heart">❤️ 열정</option>
                              <option value="shield">🛡️ 신뢰성</option>
                              <option value="globe">🌍 글로벌</option>
                            </optgroup>
                          </select>
                        </div>


                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={skill.title}
                            onChange={(e) => updateSkill(index, 'title', e.target.value)}
                            placeholder="예: 프론트엔드 개발, 데이터 분석, 프로젝트 관리"
                            className="w-full px-3 py-2 border rounded-lg bg-background font-semibold"
                          />

                          <textarea
                            value={skill.description}
                            onChange={(e) => updateSkill(index, 'description', e.target.value)}
                            placeholder="예: React와 TypeScript를 활용한 모던 웹 애플리케이션 개발"
                            className="w-full px-3 py-2 border rounded-lg bg-background resize-none"
                            rows={2}
                          />
                        </div>

                        <button
                          onClick={() => removeSkill(index)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )
                  })}

                  <button
                    onClick={addSkill}
                    className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    스킬 추가
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    💡 팁: 아이콘을 선택하고 제목과 설명을 입력하세요. 필요한 만큼 자유롭게 추가할 수 있습니다.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowSkillModal(false)}
                      className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                    >
                      닫기
                    </button>
                    <button
                      onClick={async () => {
                        const success = await saveToFile('about', 'Info', aboutInfo)
                        if (success) {
                          alert('✅ 소개 설정이 파일에 저장되었습니다!')
                          setShowSkillModal(false)
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

          {/* 취미 편집 모달 */}
          {showHobbyModal && isEditMode && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]">
              <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">취미 & 관심사 편집</h3>
                  <button
                    onClick={() => setShowHobbyModal(false)}
                    className="p-1 hover:bg-muted rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {aboutInfo.hobbies.map((hobby, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <input
                        type="text"
                        value={hobby}
                        onChange={(e) => updateHobby(index, e.target.value)}
                        placeholder="예: 📚 독서"
                        className="flex-1 px-3 py-2 border rounded-lg bg-background"
                      />

                      <button
                        onClick={() => removeHobby(index)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addHobby}
                    className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <Plus className="h-4 w-4 inline mr-2" />
                    취미 추가
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">🎯 취미 예시:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        '📚 독서',
                        '☕ 카페 투어',
                        '🎨 전시회 관람',
                        '✈️ 여행',
                        '🏃 러닝',
                        '📸 사진',
                        '🎮 게임',
                        '🎬 영화 감상',
                        '🎵 음악 감상',
                        '🍳 요리',
                        '🌱 가드닝',
                        '🏊 수영',
                        '🧘 요가',
                        '🎸 기타 연주',
                        '✍️ 글쓰기',
                        '🏕️ 캠핑',
                        '🎭 연극 관람',
                        '🎪 공연 관람',
                        '🚴 자전거',
                        '⛷️ 스키',
                      ].map((example) => (
                        <button
                          key={example}
                          className="px-3 py-1 text-sm bg-muted hover:bg-primary/10 rounded-full transition-all"
                          onClick={() => {
                            if (!aboutInfo.hobbies.includes(example)) {
                              updateAboutInfo('hobbies', [...aboutInfo.hobbies, example])
                            }
                          }}
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    💡 팁: 이모지와 함께 취미를 입력하세요. 예시를 클릭하면 새 취미가 추가됩니다.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowHobbyModal(false)}
                      className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                    >
                      닫기
                    </button>
                    <button
                      onClick={async () => {
                        const success = await saveToFile('about', 'Info', aboutInfo)
                        if (success) {
                          alert('✅ 소개 설정이 파일에 저장되었습니다!')
                          setShowHobbyModal(false)
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
        </div>
      </section>
    </EditableBackground>
  )
}
