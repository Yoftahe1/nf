import ActivityCalendar from 'react-activity-calendar';
import { useTheme } from '../theme-provider';
import { useGetActivitiesQuery } from '@/state/services/user';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Activity() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const { data: activities, isLoading, isError } = useGetActivitiesQuery(null);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Fetch courses failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }, [isError, toast]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-medium">Activity</h3>
      {!isError && (
        <ActivityCalendar
          loading={isLoading}
          data={activities ? activities : []}
          colorScheme={theme === 'system' ? undefined : theme}
          theme={{
            light: ['#FFF9D6', '#FDECA3', '#FCD97A', '#FABA42', '#F59E0B'],
            dark: ['#332D1C', '#4A3B17', '#5E4A1B', '#7A611F', '#9E7C20'],
          }}
          labels={{
            legend: {
              less: 'Less',
              more: 'More',
            },
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            totalCount: '{{count}} contributions in {{year}}',
          }}
          weekStart={1}
          showWeekdayLabels
        />
      )}
      {isError && <p className="text-center">Something went wrong</p>}
    </div>
  );
}
