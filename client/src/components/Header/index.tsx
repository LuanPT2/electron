import Modal from 'components/Modal';
import { LIST_HEADER_MENU, LIST_MENU_USER } from 'constants/listMenu';
import ROUTERS from 'constants/routers';
import { ModalTwoButton } from 'models/ModalType';
import { logoutRequest } from 'pages/Authorization/redux/actionCreators';
import { memo, useState } from 'react';
import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { AppState } from 'store/rootReducers';
import IMAGES from 'themes/images';
import { useAppDispatch, useAppSelector } from 'utils/hook';

type HeaderProps = {
  setToggleMenu: (toggle: boolean) => void;
  toggleMenu: boolean;
};

const Header = ({ setToggleMenu, toggleMenu }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: AppState) => state.authReducer);
  const navigate = useNavigate();

  const [modalTwoButton, setModalTwoButton] = useState<ModalTwoButton>({
    type: '',
    title: '',
    content: '',
    isShow: false,
    textButtonLeft: '취소',
    textButtonRight: '확인',
  });

  return (
    <div className="header flex-center justify-content-between shadow-sm pe-5">
      <div className="header flex-center">
        <img
          src={IMAGES.menuBurger}
          alt=""
          className="header__menu-burger"
          onClick={() => {
            setToggleMenu(!toggleMenu);
            localStorage.setItem('toggleMenu', String(!toggleMenu));
          }}
        />

        <div className="header__middle w-100">
          <ul className={`main-menu__list ms-4`}>
            {LIST_HEADER_MENU.map((menuItem, index, arr) => {
              const resolved = useResolvedPath(menuItem.to);
              const match = useMatch({ path: resolved.pathname, end: false });
              return (
                <li
                  className={`main-menu__item${index === arr.length - 1 ? ' ms-auto' : ''}${
                    match ? ' active pe-none' : ''
                  }`}
                  key={menuItem.id}
                >
                    <a className="side-menu__nav__header__link text-decoration-none">{menuItem.label}</a>
                </li>
              );
            })}
          </ul>
          <img src={IMAGES.icon_mess} alt="" className="side-menu__nav__header__link header__middle__support my-3" />
        </div>
        <div className="header__last flex-center">
          <div className="vertical-line mx-3"></div>
          <img
            className="logout-icon cursor-pointer"
            src={IMAGES.power}
            alt=""
            onClick={() => dispatch(logoutRequest())}
          />
        </div>
      </div>
      <div className="header_mobile_list-menu">
        <ul className={`header_mobile_list-menu__list  gap-0}`}>
          {LIST_HEADER_MENU.slice(0, 2).map((menuItem) => {
            const resolved = useResolvedPath(menuItem.to);
            const match = useMatch({ path: resolved.pathname, end: false });
            return (
              <li className={`header_mobile_list-menu__list__item ${match ? ' active' : ''}`} key={menuItem.id}>
                  <a className="side-menu__nav__header__link text-decoration-none">{menuItem.label}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <Modal
        isOpen={modalTwoButton.isShow}
        title={modalTwoButton.title}
        handleSubmit={() => {
          setModalTwoButton({ ...modalTwoButton, isShow: false });
          dispatch(logoutRequest());
        }}
        handleClose={() => setModalTwoButton({ ...modalTwoButton, isShow: false })}
        textBtnRight={modalTwoButton.textButtonRight}
        textBtnLeft={modalTwoButton.textButtonLeft}
        isShowTwoBtn
      >
        {modalTwoButton.content}
      </Modal>
    </div>
  );
};

export default memo(Header);
