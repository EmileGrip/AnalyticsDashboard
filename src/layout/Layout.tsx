import SidebarNav from './sidebar-nav';
import { Box, Flex, Grid } from '@radix-ui/themes';
import TopNavBar from './top-nav';
import { sidebarNavItems } from '../routes/nav-items';
import { Toaster } from '@/components/ui/toaster';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const gridColumns = { initial: '1', md: '250px 4fr', lg: '350px 4fr' };

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  // Filter the sidebar items based on user's roles

  // console.log('logged in? ', loggedIn.loaded, loggedIn.clientPrincipal?.userDetails);
  // console.log('user: ', azureUser);

  return (
    <>
      <Flex direction='column' className='min-h-screen bg-light'>
        <div className='md:sticky md:top-0 z-10 min-h-10'>
          <Grid
            columns={gridColumns}
            gapX='5'
            gapY='6'
            className='p-10 bg-background border-b'
            width='100%'
          >
            <Flex
              width='100%'
              justify={{ initial: 'center', md: 'start' }}
              className=' my-auto text-center'
            >
              <img src='/adepti.png' alt='logo' className='w-40 h-auto dark:hidden' />
              <img src='/adepti.png' alt='logo' className='w-40 h-auto hidden dark:block' />
            </Flex>

            <TopNavBar />
          </Grid>
        </div>

        <Grid
          columns={gridColumns}
          gapX='5'
          gapY='6' // Add this style to stretch to the bottom
          className='p-10 pb-16'
          width='100%'
        >
          <>
            <Box width={{ md: 'max-content' }}>
              <SidebarNav items={sidebarNavItems} />
            </Box>
            <Box className='flex-1 overflow-auto'>{children}</Box>
          </>
        </Grid>
      </Flex>
      <Toaster />
    </>
  );
}
