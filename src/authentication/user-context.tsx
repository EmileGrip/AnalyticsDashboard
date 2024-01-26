// import { useClientPrincipal } from '@aaronpowell/react-static-web-apps-auth';
import { createContext, useContext } from 'react';
// import axiosClient from '@/api/axios-client';
import { getUserDetails, AzureUser } from './get-user-details';
// import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const AzureIdentityContext = createContext<AzureUser | null>({
  first_name: '',
  last_name: '',
  email: '',
  organisation: '',
  roles: [],
  initials: '',
});

export const AzureIdentityContextProvider = ({ children }: any) => {
  const { data, isError } = useQuery(['userClaims'], getUserDetails);

  if (isError) {
    console.error('Error loading data: ', isError);
  }

  console.log('AzureIdentityContextProvider', data);

  return (
    <AzureIdentityContext.Provider value={data || null}>{children}</AzureIdentityContext.Provider>
  );
};

export const useAzureUser = () => useContext(AzureIdentityContext);

// export { AzureIdentityContextProvider, useAzureUser };
