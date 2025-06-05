import { motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import Card from '@/components/atoms/Card';
      import Text from '@/components/atoms/Text';
      import IconText from '@/components/atoms/IconText';
      import ModuleProgress from '@/components/molecules/ModuleProgress';
      import LessonCard from '@/components/molecules/LessonCard';

      export default function LessonSidebar({ modules, selectedLesson, getLessonProgress, onLessonClick }) {
        return (
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
                    <ModuleProgress 
                      key={module} 
                      moduleName={module} 
                      progressPercent={progressPercent} 
                      delay={moduleIndex * 0.1}
                    >
                      {moduleLessons.map((lesson) => {
                        const lessonProgress = getLessonProgress(lesson.id);
                        const isCompleted = lessonProgress?.completed;
                        const isActive = selectedLesson?.id === lesson.id;
                        return (
                          <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            isCompleted={isCompleted}
                            isActive={isActive}
                            onClick={onLessonClick}
                          />
                        );
                      })}
                    </ModuleProgress>
                  )
                })}
              </div>

              {/* Placeholder Features */}
              <div className="space-y-2 pt-4 border-t border-gray-200/50">
                <Card className="p-3 border-gray-200/30">
                  <IconText 
                    icon="Video" 
                    text="Video Library" 
                    iconClassName="text-gray-400" 
                    textClassName="text-sm font-medium text-gray-500" 
                    className="mb-2"
                  />
                  <Text className="text-xs text-gray-400">Coming next month!</Text>
                </Card>
                
                <Card className="p-3 border-gray-200/30">
                  <IconText 
                    icon="Users" 
                    text="Community" 
                    iconClassName="text-gray-400" 
                    textClassName="text-sm font-medium text-gray-500" 
                    className="mb-2"
                  />
                  <Text className="text-xs text-gray-400">Launching in 2 weeks!</Text>
                </Card>
              </div>
            </div>
          </motion.aside>
        );
      }