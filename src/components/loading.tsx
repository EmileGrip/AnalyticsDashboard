import { Skeleton } from '@/components/ui/skeleton';
import { Heading, Flex } from '@radix-ui/themes';
import { Alert } from '@/components/ui/alert';

export const LoadingTable = () => {
  return (
    <Flex direction='column' gap='3' className='text-muted-foreground'>
      <Heading size='2'>Data wordt geladen...</Heading>
      <Skeleton className='h-4 w-[250px]' />
      <Skeleton className='h-4 w-[200px]' />
      <Skeleton className='h-4 w-[220px]' />
    </Flex>
  );
};

export const LoadingAlert = () => {
  return (
    <Alert>
      <Skeleton className='h-4 w-[250px] mb-2' />
      <Skeleton className='h-4 w-[250px]' />
    </Alert>
  );
};
