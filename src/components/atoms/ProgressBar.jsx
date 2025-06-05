import { motion } from 'framer-motion';

      export default function ProgressBar({ progress, className = '', barClassName = '', ...props }) {
        return (
          <div className={`w-32 h-2 bg-gray-200 rounded-full overflow-hidden ${className}`} {...props}>
            <motion.div 
              className={`h-full bg-gradient-to-r from-primary to-secondary ${barClassName}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        );
      }