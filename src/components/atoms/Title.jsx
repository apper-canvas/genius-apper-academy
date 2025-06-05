export default function Title({ children, className = '', level = 'h1', variant = 'default' }) {
  const Tag = level;
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent';
      case 'section':
        return 'text-gray-800 border-b border-gray-200 pb-2';
      case 'card':
        return 'text-gray-900';
      default:
        return 'text-gray-900';
    }
  };

  const getSizeClasses = () => {
    switch (level) {
      case 'h1':
        return 'text-3xl lg:text-4xl';
      case 'h2':
        return 'text-2xl lg:text-3xl';
      case 'h3':
        return 'text-xl lg:text-2xl';
      case 'h4':
        return 'text-lg lg:text-xl';
      case 'h5':
        return 'text-base lg:text-lg';
      case 'h6':
        return 'text-sm lg:text-base';
      default:
        return 'text-3xl lg:text-4xl';
    }
  };

  return (
    <Tag className={`font-bold ${getSizeClasses()} ${getVariantClasses()} ${className}`}>
      {children}
    </Tag>
  );
}