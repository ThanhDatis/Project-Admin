export const DRAWER_WIDTH = 240;
export const DRAWER_WIDTH_PRODUCT_MOBILE = '90%';
export const HEIGHT_HEADER_SIDE_BAR = 70;
export const HEADER_HEIGHT = 70;
export const FOOTER_HEIGHT = 'auto';
export const CONTENT_MAX_WIDTH = 1440;
export const CONTAINER_PADDING = {
  desktop: '32px',
  tablet: '24px',
  mobile: '16px',
};

// Function to get default route based on user role
export type UserRole = 'SysAdmin' | 'HotelOwner' | 'Receptionist' | 'Housekeeping' | 'Customer';


// Constant Navigation Items Header
export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/explore' },
  { label: 'Community', path: '/community' },
  { label: 'Offers', path: '/offers' },
] as const;

// Constant Footer Links
export const FOOTER_LINKS = {
  about: {
    title: 'About Us',
    links: [
      { label: 'About Story', path: '/about' },
      { label: 'Careers', path: '/about/careers' },
      { label: 'Press & Media', path: '/press' },
      { label: 'Partner Program', path: '/partner-program' },
    ],
  },
  explore: {
    title: 'Explore',
    links: [
      { label: 'Trending Destinations', path: '/destinations/trending' },
      { label: 'Review Community', path: '/community/reviews' },
      { label: 'Member Offers', path: '/offers' },
      { label: 'Travel Guide', path: '/guide' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Help Center', path: '/support/help-center' },
      { label: 'Privacy Policy', path: '/support/privacy' },
      { label: 'Terms of Service', path: '/support/terms' },
      { label: 'Legal', path: '/support/legal' },
    ],
  },
} as const;

export const SOCIALS_LINKS = [
  { name: 'Facebook', icon: '/icons/facebook.svg', path: 'https://www.facebook.com' },
  { name: 'Twitter', icon: '/icons/twitter.svg', path: 'https://www.twitter.com' },
  { name: 'Instagram', icon: '/icons/instagram.svg', path: 'https://www.instagram.com' },
  { name: 'LinkedIn', icon: '/icons/linkedin.svg', path: 'https://www.linkedin.com' },
] as const;

export const CONTACT_INFO = {
  address: '123 Main Street, Anytown, USA',
  phone: '+1 (555) 123-4567',
  email: '',
} as const;

// Constant Routes
export const ROUTES = {
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: '/dashboard',
  // PRODUCTS: '/products',
  CUSTOMERS: '/customers',
  // ORDERS: '/orders',
  // EMPLOYEES: '/employees',
  SETTING: '/setting',
  PROFILE: '/profile',
} as const;

export const PAGE_SIZES = [10, 20, 30, 50] as const;

export const DEFAULT_PAGE_SIZE = 10;
