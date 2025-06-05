export default function Text({ children, className = '', variant = 'default', size = 'base' }) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'muted':
        return 'text-gray-600';
      case 'secondary':
        return 'text-gray-700';
      case 'success':
        return 'text-green-700';
      case 'warning':
        return 'text-amber-700';
      case 'error':
        return 'text-red-700';
      case 'primary':
        return 'text-primary';
      default:
        return 'text-gray-900';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'text-xs';
      case 'sm':
        return 'text-sm';
      case 'base':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  return (
    <p className={`${getSizeClasses()} ${getVariantClasses()} ${className}`}>
      {children}
    </p>
  );
}