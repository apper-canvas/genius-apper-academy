import ApperIcon from '@/components/ApperIcon';

      export default function CodeBlock({ content, title, className = '' }) {
        return (
          <div className={`space-y-4 ${className}`}>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            <div className="relative">
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(content)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ApperIcon name="Copy" className="h-4 w-4" />
                  </button>
                </div>
                <pre className="syntax-highlight">
                  <code className="text-sm font-mono text-gray-100">
                    {content}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        );
      }