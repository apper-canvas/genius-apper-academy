export default function Text({ children, className = '' }) {
        return (
          <p className={className}>
            {children}
          </p>
        );
      }