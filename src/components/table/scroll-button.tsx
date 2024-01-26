import { Button } from '../ui/button';
import { Tooltip } from '@radix-ui/themes';
import { Icon } from '@iconify/react';

const ScrollButton = ({
  direction,
  onClick,
  distanceToTopClass = 'top-40',
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  distanceToTopClass: string;
}) => (
  <Tooltip content={direction === 'left' ? 'Scroll naar links' : 'Scroll naar rechts'}>
    <Button
      variant='outline'
      className={
        `shadow-xl hover:shadow-2xl dark:shadow-black shadow-gray-400/50 absolute ${distanceToTopClass} bg-card dark:bg-muted z-[3] hover:opacity-90` +
        (direction === 'left' ? ' left-1' : ' right-1')
      }
      size='icon'
      onClick={onClick}
    >
      <Icon icon={`mdi:chevron-${direction}`} className='h-4 w-4' />
    </Button>
  </Tooltip>
);

export default ScrollButton;
