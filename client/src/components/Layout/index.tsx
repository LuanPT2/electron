import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import {
  LIST_HEADER_MENU,
  LIST_MENU_USER,
} from 'constants/listMenu';
import ROUTERS from 'constants/routers';
import React, { memo, useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { AppState } from 'store/rootReducers';
import { useAppSelector } from 'utils/hook';

const MainLayout = () => {
  const [toggleMenu, setToggleMenu] = useState(localStorage.getItem('toggleMenu') === 'false' ? false : true);
  const [accordionSubMenu, setAccordionSubMenu] = useState<string[]>([] as string[]);

  const { user } = useAppSelector((state: AppState) => state.authReducer);
  const { pathname } = useLocation();

  const menus = LIST_MENU_USER;

  useEffect(() => {
    if (LIST_HEADER_MENU.findIndex((header) => header.to === pathname) !== -1) {
      return setAccordionSubMenu([]);
    }

    let subMenuActive = '';
    menus.forEach((menu) => {
      menu.listSub?.forEach((subMenu) => {
        if (pathname.includes(subMenu.subTo)) {
          return (subMenuActive = menu.name);
        }
      });
    });
    if (window.innerWidth <= 1000) {
      setToggleMenu(false);
      localStorage.setItem('toggleMenu', String(false));
    }
    setAccordionSubMenu([...[], subMenuActive]);
  }, [pathname]);

  useEffect(() => {
    const getWidthWindowDimensions = () => {
      if (window.innerWidth <= 1000) {
        setToggleMenu(false);
        localStorage.setItem('toggleMenu', String(false));
      } else {
        setToggleMenu(true);
        localStorage.setItem('toggleMenu', String(true));
      }
    };
    window.addEventListener('resize', getWidthWindowDimensions);
    return () => window.removeEventListener('resize', getWidthWindowDimensions);
  }, []);

  return (
    <div className={`main-layout ${toggleMenu ? 'main-layout--active-menu' : ''}`}>
      <Header {...{ setToggleMenu, toggleMenu }} />
      <div className="main-content">
        <SideMenu {...{ user, menus, pathname, accordionSubMenu, setAccordionSubMenu }} />
        <div className="right-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(MainLayout);
