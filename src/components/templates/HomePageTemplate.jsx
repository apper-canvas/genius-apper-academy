import { useState } from 'react';
      import { AnimatePresence } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import Title from '@/components/atoms/Title';
      import OverviewProgress from '@/components/molecules/OverviewProgress';
      import PlaygroundPanel from '@/components/molecules/PlaygroundPanel';
      import LessonSidebar from '@/components/organisms/LessonSidebar';
      import MainFeatureSection from '@/components/organisms/MainFeatureSection';
      import TourOverlay from '@/components/organisms/TourOverlay';

      export default function HomePageTemplate({
        lessons,
        progress,
        selectedLesson,
        setSelectedLesson,
        handleLessonComplete,
        getLessonProgress,
        getOverallProgress,
        startTour,
        tourActive,
        setTourActive,
        error
      }) {
        const [showCodePlayground, setShowCodePlayground] = useState(false);

        const modules = lessons?.reduce((acc, lesson) => {
          if (!acc[lesson.module]) {
            acc[lesson.module] = [];
          }
          acc[lesson.module].push(lesson);
          return acc;
        }, {}) || {};

        if (error) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="AlertTriangle" className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Try Again
                </Button>
              </div>
            </div>
          );
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
                      <Title level="h1" className="text-xl hidden sm:block">ApperAcademy</Title>
                    </div>
                    <OverviewProgress progress={getOverallProgress()} />
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={startTour}
                      className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary"
                    >
                      <ApperIcon name="HelpCircle" className="h-4 w-4" />
                      <span>Take Tour</span>
                    </Button>
                    
                    <Button
                      onClick={() => setShowCodePlayground(!showCodePlayground)}
                      className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm font-medium"
                    >
                      <ApperIcon name="Code" className="h-4 w-4" />
                      <span className="hidden sm:inline">Playground</span>
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            <div className="flex flex-col lg:flex-row min-h-screen">
              <LessonSidebar 
                modules={modules}
                selectedLesson={selectedLesson}
                getLessonProgress={getLessonProgress}
                onLessonClick={setSelectedLesson}
              />

              <div className={`flex-1 flex flex-col lg:flex-row ${showCodePlayground ? 'lg:w-3/5' : 'w-full'}`}>
                <MainFeatureSection
                  lesson={selectedLesson}
                  onComplete={() => handleLessonComplete(selectedLesson.id)}
                  progress={getLessonProgress(selectedLesson?.id)}
                />

                <AnimatePresence>
                  {showCodePlayground && (
                    <PlaygroundPanel showCodePlayground={showCodePlayground} onClose={() => setShowCodePlayground(false)} />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <TourOverlay tourActive={tourActive} onClose={() => setTourActive(false)} />
          </div>
        );
      }