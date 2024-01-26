// import { SunIcon as Sun, MoonIcon as Moon } from '@radix-ui/react-icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '@/components/ui/button';

import { useTheme } from '@/layout/theme-provider';
import { Tooltip } from '@radix-ui/themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const newTheme = theme === 'light' ? 'dark' : 'light';
  return (
    <Tooltip
      content={
        theme === 'light' ? 'Schakel over naar donkere modus' : 'Schakel over naar lichte modus'
      }
    >
      <Button
        onClick={() => setTheme(newTheme)}
        variant='secondary'
        size='icon'
        className='rounded-full bg-muted'
      >
        <Icon
          icon={
            theme === 'light'
              ? 'material-symbols:dark-mode-outline'
              : 'material-symbols:light-mode-outline'
          }
          width='20'
          height='20'
        />
      </Button>
    </Tooltip>
  );
}
