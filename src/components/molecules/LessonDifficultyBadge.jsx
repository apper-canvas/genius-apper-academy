import Text from '@/components/atoms/Text';

      export default function LessonDifficultyBadge({ difficulty }) {
        const badgeClasses = {
          beginner: 'bg-green-100 text-green-700',
          intermediate: 'bg-yellow-100 text-yellow-700',
          advanced: 'bg-red-100 text-red-700',
        };

        return (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[difficulty] || 'bg-gray-100 text-gray-700'}`}>
            <Text>{difficulty}</Text>
          </div>
        );
      }