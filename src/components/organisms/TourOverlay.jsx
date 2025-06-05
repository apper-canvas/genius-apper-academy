import { AnimatePresence, motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import Text from '@/components/atoms/Text';
      import Title from '@/components/atoms/Title';

      export default function TourOverlay({ tourActive, onClose }) {
        return (
          <AnimatePresence>
            {tourActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                onClick={onClose}
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
                    <Title level="h3" className="text-xl mb-4">Tour Coming Soon!</Title>
                    <Text className="text-gray-600 mb-6">
                      The interactive tour feature is being developed. For now, explore the lessons in the sidebar to start learning!
                    </Text>
                    <Button
                      onClick={onClose}
                      className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark font-medium"
                    >
                      Got it!
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      }