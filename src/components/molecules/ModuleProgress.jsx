import { motion } from 'framer-motion';
      import Text from '@/components/atoms/Text';
      import Title from '@/components/atoms/Title';

      export default function ModuleProgress({ moduleName, progressPercent, children, delay }) {
        return (
          <motion.div
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delay }}
          >
            <div className="flex items-center justify-between">
              <Title level="h3" className="text-sm">{moduleName}</Title>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <Text className="text-xs text-gray-500">{progressPercent}%</Text>
              </div>
            </div>
            
            <div className="space-y-1">
              {children}
            </div>
          </motion.div>
        );
      }