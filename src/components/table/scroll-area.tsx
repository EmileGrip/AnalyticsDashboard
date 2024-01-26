import * as React from 'react';

import ScrollButton from './scroll-button';

import { ScrollArea } from '@radix-ui/themes';
// import * as ScrollArea from '@radix-ui/react-scroll-area';

interface ScrollAreaWithButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  direction: 'horizontal' | 'vertical' | 'both';
  distanceToTopClass: string;
  type: 'auto' | 'always' | 'hover' | 'scroll';
}

// export function ScrollAreaWithButton({ children }: { children: React.ReactNode }) {
export function ScrollAreaWithButton({
  children,
  direction = 'horizontal',
  distanceToTopClass = 'top-40',
  type = 'auto',
}: ScrollAreaWithButtonProps) {
  const viewPort = React.useRef<HTMLDivElement>(null);
  const [leftScrollable, setLeftScrollable] = React.useState(false);
  const [rightScrollable, setRightScrollable] = React.useState(false);

  const handleScroll = () => {
    if (viewPort.current) {
      const isTableScrollable = viewPort.current.scrollWidth > viewPort.current.clientWidth;
      const isLeftScrollable = viewPort.current.scrollLeft > 0;
      const isRightScrollable =
        viewPort.current.scrollLeft < viewPort.current.scrollWidth - viewPort.current.clientWidth;
      setLeftScrollable(isTableScrollable && isLeftScrollable);
      setRightScrollable(isTableScrollable && isRightScrollable);
    }
  };
  React.useEffect(() => {
    // Call handleScroll once when the component mounts to initialize the values
    handleScroll();

    const refCurrent = viewPort.current;

    if (refCurrent) {
      refCurrent.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    }

    // Remove the event listeners when the component unmounts
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      }
      // Remove window resize event listener
    };
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  const scroll = (direction: 'left' | 'right') => {
    if (viewPort.current) {
      const scrollAmount =
        direction === 'left'
          ? -viewPort.current.clientWidth * 0.8
          : viewPort.current.clientWidth * 0.8;
      viewPort.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      handleScroll(); // Update isScrollable based on the new scroll position
    }
  };

  return (
    <ScrollArea ref={viewPort} type={type} scrollbars={direction}>
      {rightScrollable &&
        ScrollButton({
          direction: 'right',
          onClick: () => scroll('right'),
          distanceToTopClass: distanceToTopClass,
        })}
      {leftScrollable &&
        ScrollButton({
          direction: 'left',
          onClick: () => scroll('left'),
          distanceToTopClass: distanceToTopClass,
        })}
      {children}
    </ScrollArea>
  );
}
