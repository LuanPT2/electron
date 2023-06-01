import { BACK_TEXT, CANCEL_TEXT, GOTO_LIST_TEXT } from 'constants/constant';
import { LIST_HEADER_MENU, LIST_MENU_USER, MenuType, SubMenuType } from 'constants/listMenu';
import { MESSAGE_CONFIRM_CANCEL_SAVE_FORM, MESSAGE_CONFIRM_LEAVE_PAGE } from 'constants/message';
import ROUTERS from 'constants/routers';
import { UserInfo } from 'models/User';
import { logoutRequest } from 'pages/Authorization/redux/actionCreators';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from 'themes/images';
import { useAppDispatch } from 'utils/hook';

type SideMenuProps = {
  user: UserInfo;
  menus: MenuType[];
  pathname: string;
  accordionSubMenu: string[];
  setAccordionSubMenu: (value: string[]) => void;
};

const SideMenu = ({ user, menus, pathname, accordionSubMenu, setAccordionSubMenu }: SideMenuProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [menu, setMenu] = useState(pathname);
  const [clickState, setClickState] = useState(0);

  // Trigger gotoList or cancle button when click menu
  useEffect(() => {
    const buttonClass = document.getElementsByClassName('btn');

    const handle = (evt) => {
      const target = evt?.target;
      if (!target || !target?.className || !target?.className?.includes) return;
      const isMenuItem =
        (target?.className === 'p-3 link text-nowrap' &&
          !target?.parentElement?.className?.includes(`side-menu__nav__link sub-menu`)) ||
        false;
      const isSubMenuItem = target?.className?.includes(`side-menu__nav__sub__link`) || false;
      const isHeaderMenuItem =
        target?.className?.includes(`side-menu__nav__header__link`) ||
        target?.parentElement?.className?.includes(`side-menu__nav__header__link`) ||
        false;

      let menuHeaderClickPath;
      const userPath = LIST_MENU_USER[0].to;
      const userLabel = LIST_MENU_USER[0].label;
      if (isHeaderMenuItem) {
        menuHeaderClickPath =
          LIST_HEADER_MENU?.find((x) => {
            if (
              (target?.className?.includes('header__middle__support') && x?.to?.includes('support')) ||
              x.label === target?.innerText
            )
              return x;
          })?.to || userPath;

        setMenu(menuHeaderClickPath);
      }

      if (isMenuItem || isSubMenuItem || isHeaderMenuItem) {
        let buttonTrigger: Element | any;
        let isMenu = false;
        for (let i = 0; i < buttonClass.length; i++) {
          if (
            buttonClass[i].textContent?.includes(GOTO_LIST_TEXT) ||
            buttonClass[i].textContent?.includes(BACK_TEXT) ||
            buttonClass[i].textContent === CANCEL_TEXT
          ) {
            buttonTrigger = buttonClass[i];
            isMenu = true;
            break;
          }
        }
        if (isMenu) {
          if (target?.innerText === userLabel) return;
          buttonTrigger?.click();
          setClickState(Math.random());
        } else {
          if (isHeaderMenuItem) {
            navigate(target && target?.text ? menuHeaderClickPath : userPath);
            return;
          }
          navigate(menu);
        }
      } else {
        return;
      }
    };
    document.addEventListener(`click`, handle);
    return () => {
      document.removeEventListener(`click`, handle);
    };
  });

  useEffect(() => {
    if (clickState === 0) return;
    const buttonConfirm = document.getElementsByClassName('btn--right  btn btn-sm')[0];
    const buttonClone = buttonConfirm?.cloneNode(true);
    buttonConfirm?.parentNode?.appendChild(buttonClone);
    buttonConfirm?.parentNode?.removeChild(buttonConfirm as Element);

    if (buttonClone) {
      buttonClone?.addEventListener('click', () => {
        navigate(menu);
        setAccordionSubMenu([]);
      });
      return () => {
        buttonClone?.removeEventListener('click', () => {
          navigate(menu);
          setAccordionSubMenu([]);
        });
      };
    } else {
      if (menu) {
        const timer = setTimeout(() => {
          navigate(menu);
        }, 100);
        return () => clearTimeout(timer);
      }
      return;
    }
  }, [clickState]);

  const handleMenuItemClick = (menuItem: MenuType) => {
    if (!menuItem.sub) {
      setMenu(menuItem.to);
    } else {
      if (accordionSubMenu.every((val) => val !== menuItem.name)) {
        setAccordionSubMenu([...accordionSubMenu, menuItem.name]);
      } else if (!pathname.includes(accordionSubMenu.find((val) => val === menuItem.name) || '')) {
        setAccordionSubMenu(accordionSubMenu.filter((val) => val !== menuItem.name));
      }
    }
  };

  const handleSubMenuItemClick = (menuSubItem: SubMenuType) => {
    setMenu(menuSubItem.subTo);
    setAccordionSubMenu(accordionSubMenu.filter((val) => menuSubItem.subTo.includes(val)));
  };

  return (
    <div className="side-menu h-100">
      <div className="side-menu__body">
        <ul className="side-menu__nav fw-500 text-white cursor-pointer">
          {menus.map((menuItem) => (
            <li
              key={menuItem.id}
              className={`side-menu__nav__link${pathname.includes(menuItem.to) ? ' active' : ''}${
                menuItem.sub ? ' sub-menu' + (accordionSubMenu.includes(menuItem.name) ? ' active' : '') : ''
              }`}
              onClick={() => handleMenuItemClick(menuItem)}
            >
              <div className="p-3 link text-nowrap">
                <img src={menuItem?.icon} />
                {menuItem.label}

                {menuItem.sub && <span className="arrow-right mt-1"></span>}
              </div>
              {menuItem.sub &&
                menuItem.listSub &&
                menuItem.listSub.length > 0 &&
                menuItem.listSub.map((menuSubItem) => (
                  <ul className="side-menu__nav__sub" key={menuSubItem.id}>
                    <li
                      className={`side-menu__nav__sub__link ${
                        pathname === menuSubItem.subTo || pathname.includes(menuSubItem.subTo + '/') ? ' active' : ''
                      }`}
                      onClick={() => handleSubMenuItemClick(menuSubItem)}
                    >
                      - {menuSubItem.subLabel}
                    </li>
                  </ul>
                ))}
            </li>
          ))}
        </ul>
      </div>
      <div className="side-menu__header text-white">
        <div
          className={`side-menu__nav__header__link side-menu__author ${
            pathname !== LIST_MENU_USER[0].to ? 'cursor-pointer' : 'pe-none'
          }`}
        >
          <img src={IMAGES.user} alt="" className="side-menu__author__avatar" />
          <div className="side-menu__nav__header__link">
            <p className="side-menu__author__name text-center"></p>
          </div>
        </div>
        <img
          className="logout-icon cursor-pointer"
          src={IMAGES.power}
          alt=""
          onClick={() => dispatch(logoutRequest())}
        />
      </div>
      {/* <div className="side-menu__footer">
        <div className="side-menu__footer__btn">
          <img src={IMAGES.iconLogoutWhite} alt="" onClick={() => dispatch(logoutRequest())} />
          <span>로그아웃</span>
        </div>
      </div> */}
    </div>
  );
};

export default SideMenu;
