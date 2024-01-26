import { Logout } from '@aaronpowell/react-static-web-apps-auth';
import { useAzureUser } from './user-context';

import { useToast } from '@/components/ui/use-toast';

import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { Flex, Heading, Text, Separator } from '@radix-ui/themes';

export function ProfileForm(authUrl: string) {
  const { toast } = useToast();

  // 2. Define a submit handler.
  function onSubmit() {
    toast({
      title: 'Inloggen',
      description: 'Je wordt doorgeleid naar Microsoft.',
    }),
      // Redirect using window.location.href
      (window.location.href = authUrl);
  }

  return (
    <Card className='max-w-sm lg:mt-40 lg:justify-self-auto justify-self-center'>
      <Flex
        direction='column'
        align='center'
        gap={'3'}
        p={'6'}
        className='pt-10 space-y-5 m-auto text-center'
      >
        {/* <Icon icon='logos:microsoft' width='100' className='mb-6' /> */}
        <Heading size={'4'}>Niet ingelogd</Heading>
        <Text color='gray'>Log in via Azure voor een veilige authenticatie en authorisatie.</Text>

        <Button onClick={onSubmit} type='submit' variant={'default'}>
          <Icon icon='mdi:microsoft' className='mr-3' />
          Log in met je Microsoft account
        </Button>
        <Flex direction='row' justify={'center'} align={'center'}>
          <Icon icon='logos:microsoft-azure' className='mr-3' width='30' />
          <Text size={'1'} color='gray'>
            Authenticatie verloopt via Microsoft Azure. U wordt doorverwezen naar Microsoft.
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

export function Login() {
  let redirect = useLocation().pathname;
  if (redirect.includes('/login')) {
    redirect = '/';
  }

  const authUrl = `/.auth/login/aad${redirect ? `?post_login_redirect_uri=${redirect}` : ''}`;
  const authenticateForm = ProfileForm(authUrl);

  return authenticateForm;
}

export function User() {
  const AzureUser = useAzureUser();
  const logoutButton = (
    <Button variant='ghost'>
      <Icon icon='mdi:logout' className='mr-3' />
      <Logout />
    </Button>
  );

  const renderRoles = () => {
    if (AzureUser && AzureUser.roles?.length > 0) {
      return (
        <Flex wrap={'wrap'}>
          <p>{AzureUser.roles.length > 1 ? 'Rollen: ' : 'Rol: '}</p>
          {AzureUser.roles.map((role, index) => (
            <Badge
              key={index}
              variant='secondary'
              style={{ textTransform: 'capitalize' }}
              className='ml-2 font-bold'
            >
              {role}
            </Badge>
          ))}
        </Flex>
      );
    } else {
      return null;
    }
  };

  if (!AzureUser) {
    return logoutButton;
  } else
    return (
      <Flex direction={'column'} className='gap-3'>
        <div>
          <Heading as='h3' size='3'>
            {AzureUser.first_name + ' ' + AzureUser.last_name}
          </Heading>
          <Heading as='h4' size='4' className='text-muted-foreground'>
            {AzureUser.email}
          </Heading>
        </div>
        <Separator />
        <Text className='text-muted-foreground text-sm'>
          Organisatie:
          <Badge
            variant='default'
            style={{ textTransform: 'capitalize' }}
            className='ml-2 font-bold'
          >
            {AzureUser.organisation}
          </Badge>
        </Text>
        <Text className='text-muted-foreground text-sm'>{renderRoles()}</Text>
        <Separator className='mt-2' />
        <Button variant='ghost'>
          <Icon icon='mdi:logout' className='mr-3' />
          <Logout />
        </Button>
      </Flex>
    );
}
