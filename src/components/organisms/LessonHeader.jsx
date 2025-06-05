import { motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import LessonDifficultyBadge from '@/components/molecules/LessonDifficultyBadge';
      import Text from '@/components/atoms/Text';
      import Title from '@/components/atoms/Title';

      export default function LessonHeader({ lesson, progress, timeSpent }) {
        const formatTime = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        return (
          <div className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <LessonDifficultyBadge difficulty={lesson.difficulty} />
                    <Text className="text-sm text-gray-500">{lesson.estimatedTime} min</Text>
                    <Text className="text-sm text-gray-500">•</Text>
                    <Text className="text-sm text-gray-500">Time: {formatTime(timeSpent)}</Text>
                  </div>
                  <Title level="h1" className="text-2xl mb-2">{lesson.title}</Title>
                  <Text className="text-gray-600">{lesson.description}</Text>
                </div>
                
                <div className="flex items-center space-x-3">
                  {progress?.completed && (
                    <div className="flex items-center space-x-1 text-secondary">
                      <ApperIcon name="CheckCircle" className="h-5 w-5" />
                      <Text className="text-sm font-medium">Completed</Text>
                    </div>
                  )}
                  
{/* Progress indicator */}
                  <div className="flex items-center space-x-2">
                    <Text className="text-sm text-gray-500">
                      {lesson.content ? `${progress?.exercisesCompleted?.length || 0} of ${lesson.exercises?.length || 0}` : 'N/A'}
                    </Text>
<div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((progress?.exercisesCompleted?.length || 0) / (lesson.exercises?.length || 1)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }