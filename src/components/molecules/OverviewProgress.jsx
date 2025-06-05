import ProgressBar from '@/components/atoms/ProgressBar';
      import Text from '@/components/atoms/Text';

      export default function OverviewProgress({ progress }) {
        return (
          <div className="hidden md:flex items-center space-x-3">
            <Text className="text-sm text-gray-600">Overall Progress</Text>
            <ProgressBar progress={progress} className="w-32 h-2" />
            <Text className="text-sm font-medium text-primary">{progress}%</Text>
          </div>
        );
      }