import { motion } from 'framer-motion';

      export default function Button({ children, onClick, className = '', disabled = false, whileHover, whileTap, ...props }) {
        return (
          <motion.button
            onClick={onClick}
            className={`transition-colors ${className}`}
            disabled={disabled}
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
          >
            {children}
          </motion.button>
        );
      }