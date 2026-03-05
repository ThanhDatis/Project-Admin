// Navigation Types
export interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

// User Types (for Header)
export interface UserMenuInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Customer' | 'HotelOwner' | 'Staff' | 'Admin';
}

// Footer Types
export interface FooterLink {
  label: string;
  path: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

// Layout Props
export interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerMaxWidth?: number | string;
}

export interface HeaderProps {
  transparent?: boolean;
  sticky?: boolean;
  user?: UserMenuInfo | null;
  onPostClick?: () => void;
  onLogoClick?: () => void;
}

export interface FooterProps {
  variant?: 'default' | 'minimal';
  showSocial?: boolean;
  showContact?: boolean;
}

// Component State Types
export interface MobileMenuState {
  isOpen: boolean;
  activeItem: string | null;
}

export interface UserMenuState {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
}