import { FC } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Icon } from '@iconify/react';

// Define an interface for component props
interface StatusTrackerCardProps {
  style: 'success' | 'warning' | 'destructive' | 'unknown';
  title: string;
  statusMessage: string;
  subtitle?: string;
  icon?: string;
}

// Function to get corresponding styling classes for each color option
const getColorClasses = (style: string) => {
  switch (style) {
    case 'success':
      return 'text-success-foreground bg-success hover:bg-success-50';
    case 'warning':
      return 'text-primary bg-accent hover:bg-accent';
    case 'destructive':
      return 'text-destructive-foreground bg-destructive hover:bg-destructive-50';
    case 'unknown':
    default:
      return 'text-muted-foreground bg-muted hover:bg-muted';
  }
};

// Apply the interface to the component
export const StatusTrackerCard: FC<StatusTrackerCardProps> = ({
  style = 'unknown',
  title,
  subtitle,
  statusMessage,
  icon,
}) => {
  // Determine badge classes based on color
  const badgeClasses = getColorClasses(style);

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon icon={icon || 'mdi:file-document'} className='h-4 w-4 text-muted-foreground' />
      </CardHeader>{' '}
      <CardContent>
        {subtitle && <CardDescription className='mb-2'> {subtitle} </CardDescription>}
        <Badge className={badgeClasses}>{statusMessage}</Badge>
      </CardContent>
    </Card>
  );
};
