import { useState } from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import Input from '@/components/atoms/Input';
      import Text from '@/components/atoms/Text';
      import Title from '@/components/atoms/Title';

      export default function ExerciseInput({ exercise, userAnswer, onAnswerChange, onSubmit, onRunCode }) {
        const [showHint, setShowHint] = useState(false);
        const [codeValue, setCodeValue] = useState(exercise.initialCode || '');

        const handleCodeChange = (e) => {
          setCodeValue(e.target.value);
          if (onAnswerChange) {
            onAnswerChange(exercise.id, e.target.value);
          }
        };

        const handleTextChange = (e) => {
          if (onAnswerChange) {
            onAnswerChange(exercise.id, e.target.value);
          }
        };

        return (
          <div className="glass-morphism p-6 rounded-xl border border-primary/20">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <ApperIcon name="Target" className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <Title level="h3" className="mb-2">Practice Exercise</Title>
                <Text className="text-gray-700 mb-4">{exercise.question}</Text>
                
                {exercise.type === 'text' && (
                  <div className="space-y-3">
                    <Input
                      value={userAnswer || ''}
                      onChange={handleTextChange}
                      placeholder="Type your answer here..."
                      rows={3}
                    />
                  </div>
                )}

                {exercise.type === 'code' && (
                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <Input
                        value={codeValue}
                        onChange={handleCodeChange}
                        className="bg-transparent text-green-400 font-mono text-sm border-none outline-none"
                        rows={6}
                        placeholder="// Write your code here..."
                      />
                    </div>
                    <Button
                      onClick={onRunCode}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark"
                    >
                      <ApperIcon name="Play" className="h-4 w-4" />
                      <span>Run Code</span>
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setShowHint(!showHint)}
                      className="inline-flex items-center space-x-1 text-sm text-gray-600 hover:text-primary"
                    >
                      <ApperIcon name="HelpCircle" className="h-4 w-4" />
                      <span>Show Hint</span>
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => onSubmit(exercise)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    <ApperIcon name="Send" className="h-4 w-4" />
                    <span>Submit</span>
                  </Button>
                </div>

                {showHint && exercise.hint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                  >
                    <div className="flex items-start space-x-2">
                      <ApperIcon name="Lightbulb" className="h-4 w-4 text-amber-600 mt-0.5" />
                      <Text className="text-sm text-amber-800">{exercise.hint}</Text>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        );
      }