import { useEffect, useState } from 'react';
      import { AnimatePresence, motion } from 'framer-motion';
      import { toast } from 'react-toastify';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import CodeBlock from '@/components/atoms/CodeBlock';
      import Card from '@/components/atoms/Card';
      import Text from '@/components/atoms/Text';
      import Title from '@/components/atoms/Title';
      import ExerciseInput from '@/components/molecules/ExerciseInput';
      import TabNavigation from '@/components/molecules/TabNavigation';

      export default function LessonContentDisplay({ lesson, onComplete, progress }) {
        const [currentStep, setCurrentStep] = useState(0);
        const [exerciseAnswers, setExerciseAnswers] = useState({});
        const [timeSpent, setTimeSpent] = useState(0);
        const [showPreview, setShowPreview] = useState(false);

        useEffect(() => {
          const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
          }, 1000);
          return () => clearInterval(timer);
        }, []);

        useEffect(() => {
          if (lesson?.exercises?.[0]?.initialCode) {
            setExerciseAnswers(prev => ({
              ...prev,
              [lesson.exercises[0].id]: lesson.exercises[0].initialCode
            }));
          }
        }, [lesson]);

        if (!lesson) {
          return (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="BookOpen" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Text className="text-gray-600">Select a lesson to begin learning</Text>
              </div>
            </div>
          );
        }

        const handleAnswerChange = (exerciseId, answer) => {
          setExerciseAnswers(prev => ({
            ...prev,
            [exerciseId]: answer
          }));
        };

        const handleStepComplete = () => {
          if (currentStep < (lesson.content?.length || 0) - 1) {
            setCurrentStep(prev => prev + 1);
            toast.success('Step completed!');
          } else {
            onComplete();
          }
        };

        const handleExerciseSubmit = (exercise) => {
          const userAnswer = exerciseAnswers[exercise.id];
          if (!userAnswer?.trim()) {
            toast.warning('Please provide an answer before submitting');
            return;
          }

          const isCorrect = userAnswer.toLowerCase().includes(exercise.expectedAnswer?.toLowerCase() || 'correct');
          
          if (isCorrect) {
            toast.success('Excellent! Exercise completed correctly! 🎉');
            setTimeout(() => {
              handleStepComplete();
            }, 1500);
          } else {
            toast.error('Not quite right. Try again or use the hint!');
          }
        };

        const runCode = () => {
          try {
            setShowPreview(true);
            toast.success('Code executed successfully!');
          } catch (error) {
            toast.error('Error in code execution');
          }
        };

        const currentContent = lesson.content?.[currentStep] || {};
        const currentExercise = lesson.exercises?.find(ex => ex.step === currentStep);

        const formatTime = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        return (
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
                        <Text className="text-gray-800 leading-relaxed text-lg">
                          {currentContent.content}
                        </Text>
                      </div>
                    )}

                    {currentContent.type === 'code' && (
                      <CodeBlock content={currentContent.content} title="Code Example" />
                    )}

                    {currentContent.type === 'interactive' && (
                      <div className="space-y-4">
                        <Title level="h3" className="font-semibold">Interactive Demo</Title>
                        <Card className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <ApperIcon name="Zap" className="h-6 w-6 text-primary" />
                              <span className="font-medium">Try this Apper feature:</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                              <Text className="text-gray-600 text-center py-8">
                                {currentContent.content}
                              </Text>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}

                    {/* Exercise Section */}
                    {currentExercise && (
                      <ExerciseInput
                        exercise={currentExercise}
                        userAnswer={exerciseAnswers[currentExercise.id]}
                        onAnswerChange={handleAnswerChange}
                        onSubmit={handleExerciseSubmit}
                        onRunCode={runCode}
                      />
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <Button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ApperIcon name="ChevronLeft" className="h-4 w-4" />
                        <span>Previous</span>
                      </Button>

                      <TabNavigation 
                        currentStep={currentStep} 
                        totalSteps={lesson.content?.length || 1} 
                        onStepChange={setCurrentStep} 
                      />

                      {currentStep < (lesson.content?.length || 1) - 1 ? (
                        <Button
                          onClick={() => setCurrentStep(currentStep + 1)}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                          <span>Next</span>
                          <ApperIcon name="ChevronRight" className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleStepComplete}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark"
                        >
                          <span>Complete Lesson</span>
                          <ApperIcon name="CheckCircle" className="h-4 w-4" />
                        </Button>
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
                        <Title level="h3" className="font-semibold">Live Preview</Title>
                        <Button
                          onClick={() => setShowPreview(false)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <ApperIcon name="X" className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 p-4 bg-gray-50">
                      <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ApperIcon name="Eye" className="h-8 w-8 mx-auto mb-2" />
                          <Text className="text-sm">Preview will appear here</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }