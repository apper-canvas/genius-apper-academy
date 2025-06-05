import { AnimatePresence, motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import Title from '@/components/atoms/Title';

      export default function PlaygroundPanel({ showCodePlayground, onClose }) {
        return (
          <AnimatePresence>
            {showCodePlayground && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '40%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block border-l border-gray-200/50 glass-morphism"
              >
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200/50">
                    <div className="flex items-center justify-between">
                      <Title level="h3" className="font-semibold">Live Playground</Title>
                      <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <ApperIcon name="X" className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="h-full bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <div className="text-green-400 mb-2">// Welcome to the Apper Playground</div>
                      <div className="text-blue-400">const</div>
                      <div className="text-white ml-2">myApp = {`{`}</div>
                      <div className="text-white ml-4">name: <span className="text-yellow-400">"ApperAcademy"</span>,</div>
                      <div className="text-white ml-4">type: <span className="text-yellow-400">"learning-platform"</span>,</div>
                      <div className="text-white ml-4">interactive: <span className="text-purple-400">true</span></div>
                      <div className="text-white ml-2">{`}`}</div>
                      <div className="mt-4 text-gray-400">// Try modifying the code above!</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      }