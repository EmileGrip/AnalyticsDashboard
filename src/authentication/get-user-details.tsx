import axios, { AxiosResponse } from 'axios';

interface Claim {
  typ: string;
  val: string;
}

interface ClientPrincipal {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims: Claim[];
}

export type AzureUser = {
  email: string;
  first_name: string;
  last_name: string;
  organisation: string;
  roles: string[];
  initials: string;
};

const getName = (claims: Claim[]): [string, string] => {
  const firstnameClaim = claims.find(
    (claim) => claim.typ === 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
  );

  const surnameClaim = claims.find(
    (claim) => claim.typ === 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
  );

  const nameClaim = claims.find((claim) => claim.typ === 'name');

  const splitNameClaim = (name: string): [string, string] => {
    const nameParts = name.split(' ');
    return [nameParts[0]?.trim() || '', nameParts.slice(1).join(' ').trim() || ''];
  };

  const [firstnameClaimVal, surnameClaimVal] = nameClaim
    ? nameClaim.val.includes(',')
      ? nameClaim.val.split(',').map((part) => part.trim())
      : splitNameClaim(nameClaim.val)
    : ['', ''];

  return [
    firstnameClaim?.val || firstnameClaimVal || '',
    surnameClaim?.val || surnameClaimVal || '',
  ];
};

const getOrganisation = (filteredUserRoles: string[]): string => {
  if (filteredUserRoles.includes('admin')) {
    return 'Noodfonds';
  } else if (filteredUserRoles.includes('energieleverancier')) {
    return filteredUserRoles.filter((role) => role !== 'energieleverancier')[0] || '';
  } else if (filteredUserRoles.includes('flanderijn')) {
    return 'flanderijn';
  } else {
    return '';
  }
};

export const getUserDetails = async (): Promise<AzureUser> => {
  const response: AxiosResponse<{ clientPrincipal: ClientPrincipal }> =
    await axios.get('/.auth/me');

  const claims = response.data.clientPrincipal?.claims || [];
  const userDetails = response.data.clientPrincipal?.userDetails || '';
  const userRoles = response.data.clientPrincipal?.userRoles || [];
  const filteredUserRoles = userRoles?.filter(
    (role) => role !== 'anonymous' && role !== 'authenticated',
  );

  const [first_name, last_name] = getName(claims);
  const initials =
    (first_name[0] + last_name[0]).toUpperCase() || (userDetails[0] + userDetails[1]).toUpperCase();

  const organisation = getOrganisation(filteredUserRoles);

  return {
    first_name,
    last_name,
    email: userDetails,
    organisation,
    roles: filteredUserRoles,
    initials,
  };
};
