export default function Card({ children, className = '' }) {
        return (
          <div className={`glass-morphism p-6 rounded-xl border border-gray-200/50 ${className}`}>
            {children}
          </div>
        );
      }