import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  return (
    <div className="text-center">
      <div className="text-sm font-medium text-muted-foreground mb-3">
        Question {current} of {total}
      </div>
      <div className="flex justify-center gap-1.5 flex-wrap">
        {Array.from({ length: total }, (_, i) => {
          const questionNumber = i + 1;
          let status: 'completed' | 'current' | 'upcoming';
          
          if (questionNumber < current) {
            status = 'completed';
          } else if (questionNumber === current) {
            status = 'current';
          } else {
            status = 'upcoming';
          }
          
          return (
            <div
              key={i}
              className={cn('progress-dot', status)}
            />
          );
        })}
      </div>
    </div>
  );
};
