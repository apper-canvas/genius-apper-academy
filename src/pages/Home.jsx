import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import * as lessonService from '../services/api/lessonService'
import * as progressService from '../services/api/progressService'

export default function Home() {
  const [lessons, setLessons] = useState([])
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [tourActive, setTourActive] = useState(false)
  const [showCodePlayground, setShowCodePlayground] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [lessonsResult, progressResult] = await Promise.all([
          lessonService.getAll(),
          progressService.getAll()
        ])
        setLessons(lessonsResult || [])
        setProgress(progressResult || [])
      } catch (err) {
        setError(err?.message || 'Failed to load data')
        toast.error('Failed to load course data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const getLessonProgress = (lessonId) => {
    return progress?.find(p => p.lessonId === lessonId) || null
  }

  const getOverallProgress = () => {
    if (!lessons?.length || !progress?.length) return 0
    const completedLessons = progress.filter(p => p.completed).length
    return Math.round((completedLessons / lessons.length) * 100)
  }

  const modules = lessons?.reduce((acc, lesson) => {
    if (!acc[lesson.module]) {
      acc[lesson.module] = []
    }
    acc[lesson.module].push(lesson)
    return acc
  }, {}) || {}

  const handleLessonComplete = async (lessonId) => {
    try {
      const existingProgress = getLessonProgress(lessonId)
      if (existingProgress) {
        const updated = await progressService.update(existingProgress.id, {
          ...existingProgress,
          completed: true,
          completedAt: new Date().toISOString()
        })
        setProgress(prev => prev.map(p => p.id === updated.id ? updated : p))
      } else {
        const newProgress = await progressService.create({
          lessonId,
          completed: true,
          completedAt: new Date().toISOString(),
          exercisesCompleted: [],
          timeSpent: 0,
          score: 100
        })
        setProgress(prev => [...prev, newProgress])
      }
      toast.success('Lesson completed! 🎉')
    } catch (err) {
      toast.error('Failed to save progress')
    }
  }

  const startTour = () => {
    setTourActive(true)
    toast.info('Welcome to ApperAcademy! Let\'s take a tour of the platform.')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning experience...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200/50 glass-morphism">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Zap" className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 hidden sm:block">ApperAcademy</h1>
              </div>
              
              {/* Progress Bar */}
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-600">Overall Progress</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${getOverallProgress()}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-sm font-medium text-primary">{getOverallProgress()}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={startTour}
                className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                <ApperIcon name="HelpCircle" className="h-4 w-4" />
                <span>Take Tour</span>
              </button>
              
              <button
                onClick={() => setShowCodePlayground(!showCodePlayground)}
                className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
              >
                <ApperIcon name="Code" className="h-4 w-4" />
                <span className="hidden sm:inline">Playground</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <motion.aside 
          className={`w-full lg:w-64 border-r border-gray-200/50 glass-morphism ${
            selectedLesson ? 'hidden lg:block' : 'block'
          }`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-4 space-y-4 h-full overflow-y-auto">
            <div className="space-y-3">
              {Object.entries(modules).map(([module, moduleLessons], moduleIndex) => {
                const completedInModule = moduleLessons.filter(lesson => 
                  getLessonProgress(lesson.id)?.completed
                ).length
                const progressPercent = Math.round((completedInModule / moduleLessons.length) * 100)

                return (
                  <motion.div
                    key={module}
                    className="space-y-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: moduleIndex * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">{module}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-secondary transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{progressPercent}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {moduleLessons.map((lesson, index) => {
                        const lessonProgress = getLessonProgress(lesson.id)
                        const isCompleted = lessonProgress?.completed
                        const isActive = selectedLesson?.id === lesson.id

                        return (
                          <motion.button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                              isActive 
                                ? 'bg-primary text-white shadow-md' 
                                : isCompleted
                                ? 'bg-secondary/10 text-secondary-dark hover:bg-secondary/20'
                                : 'bg-white/50 text-gray-700 hover:bg-white/80'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                isCompleted 
                                  ? 'bg-secondary border-secondary' 
                                  : isActive
                                  ? 'border-white'
                                  : 'border-gray-300'
                              }`}>
                                {isCompleted && (
                                  <ApperIcon name="Check" className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{lesson.title}</p>
                                <p className="text-xs opacity-75 truncate">{lesson.estimatedTime} min</p>
                              </div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Placeholder Features */}
            <div className="space-y-2 pt-4 border-t border-gray-200/50">
              <div className="glass-morphism p-3 rounded-lg border border-gray-200/30">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Video" className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Video Library</span>
                </div>
                <p className="text-xs text-gray-400">Coming next month!</p>
              </div>
              
              <div className="glass-morphism p-3 rounded-lg border border-gray-200/30">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Users" className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Community</span>
                </div>
                <p className="text-xs text-gray-400">Launching in 2 weeks!</p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Lesson Content */}
          <div className={`flex-1 ${showCodePlayground ? 'lg:w-3/5' : 'w-full'}`}>
            {selectedLesson ? (
              <motion.div
                key={selectedLesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <MainFeature 
                  lesson={selectedLesson}
                  onComplete={() => handleLessonComplete(selectedLesson.id)}
                  progress={getLessonProgress(selectedLesson.id)}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center p-8"
              >
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name="BookOpen" className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ApperAcademy</h2>
                  <p className="text-gray-600 mb-6">
                    Learn Apper by experiencing it firsthand. Select a lesson from the sidebar to begin your journey.
                  </p>
                  <button
                    onClick={startTour}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
                  >
                    <ApperIcon name="Play" className="h-5 w-5" />
                    <span>Start Learning</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Code Playground */}
          <AnimatePresence>
            {showCodePlayground && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '40%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block border-l border-gray-200/50 glass-morphism"
              >
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200/50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Live Playground</h3>
                      <button
                        onClick={() => setShowCodePlayground(false)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <ApperIcon name="X" className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="h-full bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <div className="text-green-400 mb-2">// Welcome to the Apper Playground</div>
                      <div className="text-blue-400">const</div>
                      <div className="text-white ml-2">myApp = {</div>
                      <div className="text-white ml-4">name: <span className="text-yellow-400">"ApperAcademy"</span>,</div>
                      <div className="text-white ml-4">type: <span className="text-yellow-400">"learning-platform"</span>,</div>
                      <div className="text-white ml-4">interactive: <span className="text-purple-400">true</span></div>
                      <div className="text-white ml-2">}</div>
                      <div className="mt-4 text-gray-400">// Try modifying the code above!</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tour Overlay */}
      <AnimatePresence>
        {tourActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setTourActive(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Compass" className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Coming Soon!</h3>
                <p className="text-gray-600 mb-6">
                  The interactive tour feature is being developed. For now, explore the lessons in the sidebar to start learning!
                </p>
                <button
                  onClick={() => setTourActive(false)}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}