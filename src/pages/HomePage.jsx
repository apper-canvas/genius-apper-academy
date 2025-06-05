import { useState, useEffect } from 'react';
    import { toast } from 'react-toastify';
    import * as lessonService from '@/services/api/lessonService';
    import * as progressService from '@/services/api/progressService';
    import Spinner from '@/components/atoms/Spinner';
    import Text from '@/components/atoms/Text';
    import HomePageTemplate from '@/components/templates/HomePageTemplate';

    export default function HomePage() {
      const [lessons, setLessons] = useState([]);
      const [progress, setProgress] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [selectedLesson, setSelectedLesson] = useState(null);
      const [tourActive, setTourActive] = useState(false);

      useEffect(() => {
        const loadData = async () => {
          setLoading(true);
          try {
            const [lessonsResult, progressResult] = await Promise.all([
              lessonService.getAll(),
              progressService.getAll()
            ]);
            setLessons(lessonsResult || []);
            setProgress(progressResult || []);
          } catch (err) {
            setError(err?.message || 'Failed to load data');
            toast.error('Failed to load course data');
          } finally {
            setLoading(false);
          }
        };
        loadData();
      }, []);

      const getLessonProgress = (lessonId) => {
        return progress?.find(p => p.lessonId === lessonId) || null;
      };

      const getOverallProgress = () => {
        if (!lessons?.length || !progress?.length) return 0;
        const completedLessons = progress.filter(p => p.completed).length;
        return Math.round((completedLessons / lessons.length) * 100);
      };

      const handleLessonComplete = async (lessonId) => {
        try {
          const existingProgress = getLessonProgress(lessonId);
          if (existingProgress) {
            const updated = await progressService.update(existingProgress.id, {
              ...existingProgress,
              completed: true,
              completedAt: new Date().toISOString()
            });
            setProgress(prev => prev.map(p => p.id === updated.id ? updated : p));
          } else {
            const newProgress = await progressService.create({
              lessonId,
              completed: true,
              completedAt: new Date().toISOString(),
              exercisesCompleted: [],
              timeSpent: 0,
              score: 100
            });
            setProgress(prev => [...prev, newProgress]);
          }
          toast.success('Lesson completed! 🎉');
        } catch (err) {
          toast.error('Failed to save progress');
        }
      };

      const startTour = () => {
        setTourActive(true);
        toast.info('Welcome to ApperAcademy! Let\'s take a tour of the platform.');
      };

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Spinner />
              <Text className="text-gray-600">Loading your learning experience...</Text>
            </div>
          </div>
        );
      }
return (
      <HomePageTemplate
        lessons={lessons}
        progress={progress}
        selectedLesson={selectedLesson}
        setSelectedLesson={setSelectedLesson}
        handleLessonComplete={handleLessonComplete}
        getLessonProgress={getLessonProgress}
        getOverallProgress={getOverallProgress}
        startTour={startTour}
        tourActive={tourActive}
        setTourActive={setTourActive}
        error={error}
      />
    );