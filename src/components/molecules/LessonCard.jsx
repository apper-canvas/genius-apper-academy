import { motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import Text from '@/components/atoms/Text';

      export default function LessonCard({ lesson, isCompleted, isActive, onClick }) {
        return (
          <Button
            onClick={() => onClick(lesson)}
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
                <Text className="text-sm font-medium truncate">{lesson.title}</Text>
                <Text className="text-xs opacity-75 truncate">{lesson.estimatedTime} min</Text>
              </div>
            </div>
          </Button>
        );
      }