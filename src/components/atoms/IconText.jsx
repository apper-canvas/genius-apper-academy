import ApperIcon from '@/components/ApperIcon';

      export default function IconText({ icon, text, className = '', iconClassName = '', textClassName = '' }) {
        return (
          <div className={`flex items-center space-x-2 ${className}`}>
            {icon && <ApperIcon name={icon} className={`h-4 w-4 ${iconClassName}`} />}
            {text && <span className={textClassName}>{text}</span>}
          </div>
        );
      }