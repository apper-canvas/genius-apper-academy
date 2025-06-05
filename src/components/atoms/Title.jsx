export default function Title({ children, className = '', level = 'h1' }) {
        const Tag = level;
        return (
          <Tag className={`font-bold text-gray-900 ${className}`}>
            {children}
          </Tag>
        );
      }