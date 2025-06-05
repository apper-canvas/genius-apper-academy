export default function Input({ value, onChange, placeholder, rows = 3, className = '', ...props }) {
        return (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none ${className}`}
            rows={rows}
            {...props}
          />
        );
      }