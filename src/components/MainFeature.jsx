import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function MainFeature({ lesson, onComplete, progress }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [exerciseAnswers, setExerciseAnswers] = useState({})
  const [showHint, setShowHint] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [codeValue, setCodeValue] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (lesson?.exercises?.[0]?.initialCode) {
      setCodeValue(lesson.exercises[0].initialCode)
    }
  }, [lesson])

  if (!lesson) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="BookOpen" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Select a lesson to begin learning</p>
        </div>
      </div>
    )
  }

  const handleAnswerChange = (exerciseId, answer) => {
    setExerciseAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }))
  }

  const handleStepComplete = () => {
    if (currentStep < (lesson.content?.length || 0) - 1) {
      setCurrentStep(prev => prev + 1)
      toast.success('Step completed!')
    } else {
      onComplete()
    }
  }

  const handleExerciseSubmit = (exercise) => {
    const userAnswer = exerciseAnswers[exercise.id]
    if (!userAnswer?.trim()) {
      toast.warning('Please provide an answer before submitting')
      return
    }

    const isCorrect = userAnswer.toLowerCase().includes(exercise.expectedAnswer?.toLowerCase() || 'correct')
    
    if (isCorrect) {
      toast.success('Excellent! Exercise completed correctly! 🎉')
      setTimeout(() => {
        handleStepComplete()
      }, 1500)
    } else {
      toast.error('Not quite right. Try again or use the hint!')
      setShowHint(true)
    }
  }

  const runCode = () => {
    try {
      setShowPreview(true)
      toast.success('Code executed successfully!')
    } catch (error) {
      toast.error('Error in code execution')
    }
  }

  const currentContent = lesson.content?.[currentStep] || {}
  const currentExercise = lesson.exercises?.find(ex => ex.step === currentStep)

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full flex flex-col">
      {/* Lesson Header */}
      <div className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                  lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lesson.difficulty}
                </div>
                <span className="text-sm text-gray-500">{lesson.estimatedTime} min</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Time: {formatTime(timeSpent)}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
              <p className="text-gray-600">{lesson.description}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              {progress?.completed && (
                <div className="flex items-center space-x-1 text-secondary">
                  <ApperIcon name="CheckCircle" className="h-5 w-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
              
              {/* Progress indicator */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {currentStep + 1} of {lesson.content?.length || 1}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / (lesson.content?.length || 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col lg:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Content Block */}
                  {currentContent.type === 'text' && (
                    <div className="prose prose-gray max-w-none">
                      <div className="text-gray-800 leading-relaxed text-lg">
                        {currentContent.content}
                      </div>
                    </div>
                  )}

                  {currentContent.type === 'code' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Code Example</h3>
                      <div className="relative">
                        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <button
                              onClick={() => navigator.clipboard.writeText(currentContent.content)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <ApperIcon name="Copy" className="h-4 w-4" />
                            </button>
                          </div>
                          <pre className="syntax-highlight">
                            <code className="text-sm font-mono text-gray-100">
                              {currentContent.content}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentContent.type === 'interactive' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Interactive Demo</h3>
                      <div className="glass-morphism p-6 rounded-xl border border-gray-200/50">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <ApperIcon name="Zap" className="h-6 w-6 text-primary" />
                            <span className="font-medium">Try this Apper feature:</span>
                          </div>
                          <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-600 text-center py-8">
                              {currentContent.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Exercise Section */}
                  {currentExercise && (
                    <div className="space-y-4">
                      <div className="glass-morphism p-6 rounded-xl border border-primary/20">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <ApperIcon name="Target" className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">Practice Exercise</h3>
                            <p className="text-gray-700 mb-4">{currentExercise.question}</p>
                            
                            {currentExercise.type === 'text' && (
                              <div className="space-y-3">
                                <textarea
                                  value={exerciseAnswers[currentExercise.id] || ''}
                                  onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
                                  placeholder="Type your answer here..."
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                                  rows={3}
                                />
                              </div>
                            )}

                            {currentExercise.type === 'code' && (
                              <div className="space-y-3">
                                <div className="bg-gray-900 rounded-lg p-4">
                                  <textarea
                                    value={codeValue}
                                    onChange={(e) => setCodeValue(e.target.value)}
                                    className="w-full bg-transparent text-green-400 font-mono text-sm resize-none border-none outline-none"
                                    rows={6}
                                    placeholder="// Write your code here..."
                                  />
                                </div>
                                <button
                                  onClick={runCode}
                                  className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
                                >
                                  <ApperIcon name="Play" className="h-4 w-4" />
                                  <span>Run Code</span>
                                </button>
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setShowHint(!showHint)}
                                  className="inline-flex items-center space-x-1 text-sm text-gray-600 hover:text-primary transition-colors"
                                >
                                  <ApperIcon name="HelpCircle" className="h-4 w-4" />
                                  <span>Show Hint</span>
                                </button>
                              </div>
                              
                              <button
                                onClick={() => handleExerciseSubmit(currentExercise)}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                              >
                                <ApperIcon name="Send" className="h-4 w-4" />
                                <span>Submit</span>
                              </button>
                            </div>

                            {showHint && currentExercise.hint && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                              >
                                <div className="flex items-start space-x-2">
                                  <ApperIcon name="Lightbulb" className="h-4 w-4 text-amber-600 mt-0.5" />
                                  <p className="text-sm text-amber-800">{currentExercise.hint}</p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ApperIcon name="ChevronLeft" className="h-4 w-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex space-x-2">
                      {(lesson.content || []).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStep(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentStep ? 'bg-primary' : 
                            index < currentStep ? 'bg-secondary' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {currentStep < (lesson.content?.length || 1) - 1 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <span>Next</span>
                        <ApperIcon name="ChevronRight" className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleStepComplete}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
                      >
                        <span>Complete Lesson</span>
                        <ApperIcon name="CheckCircle" className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Live Preview Panel */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '40%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block border-l border-gray-200/50 bg-white"
              >
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200/50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Live Preview</h3>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <ApperIcon name="X" className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-4 bg-gray-50">
                    <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <ApperIcon name="Eye" className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Preview will appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}