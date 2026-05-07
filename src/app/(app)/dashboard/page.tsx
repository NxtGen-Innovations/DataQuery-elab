'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Brain, CheckCircle2, Code2, Flame, LineChart, PlayCircle, Trophy, Sparkles, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CURRICULUM, getAllLessons, getChallengeByLessonId, getDailyQuestion, getQuizByLessonId } from '@/lib/curriculum-data'
import { useAuth } from '@/lib/auth-context'
import { useProgress } from '@/lib/progress-context'

export default function Dashboard() {
  const { user } = useAuth()
  const { 
    totalXP, 
    currentRank, 
    overallCompletion, 
    getUnitProgress, 
    completedQuizzes, 
    completedChallenges,
    streak,
    activeDates
  } = useProgress()
  
  const lessons = getAllLessons()
  const userName = user?.name || 'Explorer'
  
  // Calculate weekly momentum based on activeDates
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 is Sunday
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)) // Set to Monday

  const weeklyMomentum = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]
    const isActive = activeDates.includes(dateStr)
    return {
      day: dayName[0],
      val: isActive ? 40 : 0,
      active: isActive
    }
  })

  const currentLesson = lessons[0]
  const recommendedPracticeLesson = lessons.find((lesson) => getChallengeByLessonId(lesson.id)) ?? lessons[0]
  const practiceChallenge = recommendedPracticeLesson ? getChallengeByLessonId(recommendedPracticeLesson.id) : undefined
  const dailyQuestion = getDailyQuestion()

  const totalCompleted = completedQuizzes.length + completedChallenges.length
  const accuracy = completedQuizzes.length > 0 ? '92%' : '0%' 

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen hero-gradient px-5 py-8 md:px-8 xl:px-12">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-[1400px] space-y-10"
      >
        {/* Hero Section */}
        <motion.section variants={item} className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="ds-panel glass-panel relative overflow-hidden p-8 md:p-10">
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#58a6ff]/10 text-[#58a6ff] glow-blue">
                  <Sparkles className="size-4" />
                </div>
                <span className="ds-label">Learning Path Active</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-[#e6edf3] md:text-5xl">
                Elevate your craft, {userName.split(' ')[0]}.
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8b949e]">
                You've completed {overallCompletion}% of your Data Science foundations. 
                {overallCompletion === 0 ? ' Start your first lesson to build momentum.' : ' Keep the momentum going to unlock your next badge.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={recommendedPracticeLesson ? `/curriculum/${recommendedPracticeLesson.id}` : '/curriculum'}>
                  <Button className="h-11 rounded-xl bg-[#58a6ff] px-6 text-[13px] font-bold text-white hover:bg-[#79c0ff] glow-blue">
                    {overallCompletion === 0 ? 'Start Learning' : 'Continue Learning'}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">XP Gained</span>
                    <span className="text-sm font-bold text-[#e6edf3]">{totalXP.toLocaleString()} pts</span>
                  </div>
                  <div className="h-8 w-px bg-[#30363d]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">Rank</span>
                    <span className="text-sm font-bold text-[#58a6ff]">{currentRank}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute -bottom-12 -right-12 size-64 rounded-full bg-[#58a6ff]/5 blur-3xl" />
          </div>

          <div className="ds-panel border-[#58a6ff]/20 bg-gradient-to-br from-[#161b22] to-[#0d1117] p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="ds-label">Daily Momentum</span>
              <Flame className="size-5 text-[#ff7b72] animate-pulse" />
            </div>
            <div className="flex items-end justify-between gap-2">
              {weeklyMomentum.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-3">
                  <div className="relative w-full group">
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-500 ${d.active ? 'bg-[#3fb950]/60 group-hover:bg-[#3fb950] glow-green' : 'bg-[#30363d]'}`} 
                      style={{ height: `${Math.max(d.val, 4)}px` }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold ${d.active ? 'text-[#e6edf3]' : 'text-[#484f58]'}`}>{d.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-[#30363d]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#8b949e]">Current Streak</span>
                <span className="text-xl font-bold text-[#e6edf3]">{streak} {streak === 1 ? 'Day' : 'Days'}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Modules', value: totalCompleted.toString(), hint: 'Items completed', icon: BookOpen, color: 'text-[#58a6ff]' },
            { label: 'Accuracy', value: accuracy, hint: 'Quiz performance', icon: Target, color: 'text-[#3fb950]' },
            { label: 'Time Spent', value: '0.0h', hint: 'Active sessions', icon: LineChart, color: 'text-[#d29922]' },
            { label: 'Certificates', value: '0', hint: 'Verified skills', icon: Trophy, color: 'text-[#bc8cff]' },
          ].map((stat) => (
            <div key={stat.label} className="ds-panel group p-5 hover:border-[#58a6ff]/30 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <span className="ds-label">{stat.label}</span>
                  <div className="mt-3 text-3xl font-bold text-[#e6edf3]">{stat.value}</div>
                  <div className="mt-1 text-[12px] text-[#8b949e]">{stat.hint}</div>
                </div>
                <div className={`rounded-lg bg-[#0d1117] p-2.5 border border-[#30363d] group-hover:border-[#58a6ff]/20 transition-colors`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </motion.section>

        {/* Main Content Areas */}
        <motion.section variants={item} className="grid gap-6 xl:grid-cols-[1fr_400px]">
          <div className="ds-panel p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="ds-label">Curriculum Track</span>
                <h2 className="mt-2 text-2xl font-bold text-[#e6edf3]">Skill Progression</h2>
              </div>
              <Link href="/curriculum">
                <Button variant="ghost" className="text-[13px] text-[#58a6ff] hover:bg-[#58a6ff]/10">
                  Manage Path
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {CURRICULUM[0].topics.slice(0, 4).map((topic, idx) => {
                const progress = getUnitProgress(topic.topic)
                return (
                  <Link key={topic.topic} href="/curriculum">
                    <div className="ds-panel border-transparent bg-[#161b22]/50 p-5 hover:bg-[#161b22] transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Unit {idx + 1}</span>
                        <Badge className="bg-[#58a6ff]/10 text-[#58a6ff] border-none text-[10px]">
                          {progress === 100 ? 'Mastered' : progress > 0 ? 'In Progress' : 'Locked'}
                        </Badge>
                      </div>
                      <h3 className="mt-3 text-[15px] font-bold text-[#e6edf3] leading-snug group-hover:text-[#58a6ff] transition-colors">{topic.topic}</h3>
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] text-[#8b949e]">Completion</span>
                          <span className="text-[11px] font-bold text-[#e6edf3]">{progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-[#30363d] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-[#58a6ff] glow-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="space-y-6">
            <Link href={recommendedPracticeLesson ? `/curriculum/${recommendedPracticeLesson.id}` : '/curriculum'}>
              <div className="ds-panel glass-panel border-[#d29922]/20 p-6 hover:border-[#d29922]/40 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="size-5 text-[#d29922]" />
                  <span className="ds-label text-[#d29922]">Active Goal</span>
                </div>
                <h3 className="text-lg font-bold text-[#e6edf3] group-hover:text-[#d29922] transition-colors">
                  {overallCompletion === 100 ? 'Course Mastered' : recommendedPracticeLesson.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8b949e]">
                  {overallCompletion === 100 
                    ? "Congratulations! You've completed the entire curriculum. Keep practicing to maintain your rank."
                    : "Complete this module to earn your next professional badge and level up your rank."}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-[#30363d] rounded-full overflow-hidden">
                      <div className="h-full bg-[#d29922]" style={{ width: `${overallCompletion}%` }} />
                    </div>
                    <span className="text-[11px] text-[#8b949e]">{overallCompletion}%</span>
                  </div>
                  <span className="text-[11px] text-[#d29922] font-bold flex items-center gap-1">
                    Resume <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </Link>

            <div className="ds-panel p-6 bg-[#0d1117]">
              <div className="flex items-center justify-between mb-4">
                <span className="ds-label">Daily Brainstorm</span>
                <Brain className="size-4 text-[#58a6ff]" />
              </div>
              <div className="min-h-[80px]">
                <p className="text-[14px] font-medium leading-relaxed text-[#c9d1d9] mb-2">
                  Question of the day:
                </p>
                <p className="text-[14px] leading-relaxed text-[#8b949e]">
                  {dailyQuestion.question}
                </p>
              </div>
              <Link href="/curriculum">
                <Button className="mt-6 w-full h-10 border-[#30363d] bg-transparent text-[12px] font-bold text-[#e6edf3] hover:bg-[#161b22] hover:border-[#58a6ff]/50">
                  Go to Curriculum
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
