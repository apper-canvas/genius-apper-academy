export default function Card({ children, className = '', variant = 'default', padding = 'normal' }) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-lg border border-gray-100';
      case 'outlined':
        return 'bg-white border-2 border-gray-200';
      case 'glass':
        return 'glass-morphism border border-gray-200/50';
      case 'gradient':
        return 'bg-gradient-to-br from-white to-gray-50 border border-gray-200';
      default:
        return 'glass-morphism border border-gray-200/50';
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case 'small':
        return 'p-4';
      case 'large':
        return 'p-8';
      case 'none':
        return '';
      default:
        return 'p-6';
    }
  };

  return (
    <div className={`${getVariantClasses()} ${getPaddingClasses()} rounded-xl transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}