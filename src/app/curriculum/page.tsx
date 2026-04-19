import Link from 'next/link'
import { CURRICULUM } from '@/lib/curriculum-data'
import { BookOpen, ChevronRight, Brain, BarChart2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const domainIcons: Record<string, React.ReactNode> = {
  Statistics: <BarChart2 className="w-5 h-5" />,
  'Machine Learning': <Brain className="w-5 h-5" />,
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
            DataQuest eLab
          </Link>
          <ChevronRight className="w-4 h-4 text-white/40" />
          <span className="text-white text-sm font-medium">Curriculum</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Curriculum</h1>
          <p className="text-white/60">Choose a domain and start learning with theory, quizzes, and coding challenges.</p>
        </div>

        <div className="space-y-10">
          {CURRICULUM.map((domain) => (
            <div key={domain.domain}>
              {/* Domain Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  {domainIcons[domain.domain] ?? <BookOpen className="w-5 h-5" />}
                </div>
                <h2 className="text-2xl font-bold text-white">{domain.domain}</h2>
              </div>

              {/* Topics */}
              <div className="space-y-6">
                {domain.topics.map((topicGroup) => (
                  <div key={topicGroup.topic}>
                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3 pl-1">
                      {topicGroup.topic}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {topicGroup.lessons.map((lesson) => (
                        <Link key={lesson.id} href={`/curriculum/${lesson.id}`}>
                          <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/40 transition-all cursor-pointer group">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-white text-base group-hover:text-purple-300 transition-colors">
                                  {lesson.title}
                                </CardTitle>
                                <Badge
                                  variant="outline"
                                  className={`text-xs shrink-0 capitalize ${difficultyColors[lesson.difficulty]}`}
                                >
                                  {lesson.difficulty}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <CardDescription className="text-white/50 text-sm">
                                {domain.domain} → {topicGroup.topic}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
