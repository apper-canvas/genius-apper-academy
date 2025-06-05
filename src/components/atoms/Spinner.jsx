export default function Spinner({ className = '' }) {
        return (
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4 ${className}`}></div>
        );
      }