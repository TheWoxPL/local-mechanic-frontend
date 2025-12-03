import styles from './NavigatorBar.module.scss';
import HeartSVG from 'src/assets/svgs/heart.svg';
import CartSVG from 'src/assets/svgs/cart.svg';
import HomeSVG from 'src/assets/svgs/home.svg';
import ProfileSVG from 'src/assets/svgs/profile.svg';
// Import building SVG with relative path to avoid resolution issues
import GarageSVG from 'src/assets/svgs/garage.svg';
import { Link } from 'react-router';
import { UserAuth } from 'src/context';
import { RoleType } from 'src/shared/enums/role-type.enum';
import { useState } from 'react';

interface NavigatorBarProps {
  indicatorIndex: number;
}

export const NavigatorBar: React.FC<NavigatorBarProps> = ({
  indicatorIndex,
}) => {
  const { roles } = UserAuth();
  const isEntrepreneur = roles?.includes(RoleType.ENTREPRENEUR);
  const [isDesktopRailCollapsed, setIsDesktopRailCollapsed] = useState(false);

  const navItems = [
    {
      to: '/home',
      label: 'Home',
      subtitle: 'Main dashboard',
      icon: HomeSVG,
      alt: 'Home Page',
    },
    {
      to: isEntrepreneur ? '/your-companies' : '/favorite',
      label: isEntrepreneur ? 'Companies' : 'Favorite',
      subtitle: isEntrepreneur ? 'Manage company' : 'Saved offers',
      icon: isEntrepreneur ? GarageSVG : HeartSVG,
      alt: isEntrepreneur ? 'My Companies' : 'Favorite offers',
    },
    {
      to: isEntrepreneur ? '/company-orders' : '/orders',
      label: 'Orders',
      subtitle: isEntrepreneur ? 'Customer requests' : 'Your jobs',
      icon: CartSVG,
      alt: isEntrepreneur ? 'Incoming Orders' : 'Orders',
    },
    {
      to: '/profile',
      label: 'Profile',
      subtitle: 'Account settings',
      icon: ProfileSVG,
      alt: 'Profile',
    },
  ];

  const toggleDesktopRail = () =>
    setIsDesktopRailCollapsed((previous) => !previous);

  return (
    <>
      <nav className={styles.container}>
        {navItems.map((item, idx) => (
          <Link key={`mobile-${item.label}`} to={item.to}>
            <div
              className={`${styles.item} ${
                indicatorIndex === idx ? styles.itemActive : ''
              }`}
            >
              <img src={item.icon} alt={item.alt} />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      <nav
        className={`${styles.desktopRail} ${
          isDesktopRailCollapsed ? styles.desktopRailHidden : ''
        }`}
      >
        <div className={styles.desktopRailInner}>
          <p className={styles.desktopLabel}>Navigation</p>
          {navItems.map((item, idx) => (
            <Link key={item.label} to={item.to} className={styles.desktopLink}>
              <div
                className={`${styles.desktopItem} ${
                  indicatorIndex === idx ? styles.desktopItemActive : ''
                }`}
              >
                <span className={styles.desktopIconWrapper}>
                  <img src={item.icon} alt={item.alt} />
                </span>
                <div>
                  <span>{item.label}</span>
                  <small>{item.subtitle}</small>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      <button
        type="button"
        className={`${styles.desktopRailToggle} ${
          isDesktopRailCollapsed ? styles.desktopRailToggleCollapsed : ''
        }`}
        onClick={toggleDesktopRail}
        aria-label={
          isDesktopRailCollapsed ? 'Expand navigation' : 'Collapse navigation'
        }
      >
        <span />
      </button>
    </>
  );
};
