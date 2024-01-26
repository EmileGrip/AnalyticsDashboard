import { Flex, Box, Heading, Text } from '@radix-ui/themes';

import { ModeToggle } from '@/layout/mode-toggle';

export default function TopNavBar() {
  const header: string[] = [
    'Analytics dashboard',
    'Explore skills gaps, learning paths, and more.',
  ];
  return (
    <Flex direction='row' justify={{ initial: 'center', md: 'between' }}>
      <Flex direction='row' gap='9' justify='start' className='hidden lg:flex'>
        <Box>
          <Heading>{header[0]}</Heading>
          <Text className='text-muted-foreground'>{header[1]}</Text>
        </Box>
      </Flex>
      <Flex gap='2' align='center' justify={'center'}>
        <ModeToggle />
      </Flex>
    </Flex>
  );
}
