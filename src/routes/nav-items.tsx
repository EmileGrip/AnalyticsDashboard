import StatsPage from '../pages/stats-page';
// For each item, you include the following information:

// title: The display text for the link.
// href: The URL to navigate to.
// component: The React component to render when the link is clicked.
// requiredRoles: An array of roles or permissions required to access the link. If this property is not specified, the link is accessible to all users.

// IMPORTANT: Also update the routes in staticwebapp.config.json so that the users can or cannot acces the pages.

export type SidebarNavItem = {
  title: string;
  href: string;
  component?: any;
  requiredRoles?: string[];
};

export const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/',
    component: StatsPage,
  },
  {
    title: 'Skills',
    href: '/skills',
    component: StatsPage,
  },
  {
    title: 'Analytics dashboard',
    href: '/analytics',
    component: StatsPage,
  },
];
