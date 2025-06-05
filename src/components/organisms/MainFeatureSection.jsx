import { useState, useEffect } from 'react';
      import { motion } from 'framer-motion';
      import { toast } from 'react-toastify';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import Text from '@/components/atoms/Text';
      import Title from '@/components/atoms/Title';
      import LessonContentDisplay from '@/components/organisms/LessonContentDisplay';
      import LessonHeader from '@/components/organisms/LessonHeader';

      export default function MainFeatureSection({ lesson, onComplete, progress }) {
        const [timeSpent, setTimeSpent] = useState(0);

        useEffect(() => {
          const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
          }, 1000);
          return () => clearInterval(timer);
        }, []);

        if (!lesson) {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center p-8"
            >
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="BookOpen" className="h-12 w-12 text-white" />
                </div>
                <Title level="h2" className="text-2xl mb-4">Welcome to ApperAcademy</Title>
                <Text className="text-gray-600 mb-6">
                  Learn Apper by experiencing it firsthand. Select a lesson from the sidebar to begin your journey.
                </Text>
                <Button
                  onClick={() => toast.info('Welcome to ApperAcademy! Let\'s take a tour of the platform.')}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark font-medium"
                >
                  <ApperIcon name="Play" className="h-5 w-5" />
                  <span>Start Learning</span>
                </Button>
              </div>
            </motion.div>
          );
        }

        return (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col"
          >
            <LessonHeader lesson={lesson} progress={progress} timeSpent={timeSpent} />
            <LessonContentDisplay 
              lesson={lesson}
              onComplete={onComplete}
              progress={progress}
            />
          </motion.div>
        );
      }