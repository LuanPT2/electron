import Modal from 'components/Modal';
import { LIST_HEADER_MENU, LIST_MENU_USER } from 'constants/listMenu';
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

  const [modalTwoButton, setModalTwoButton] = useState<ModalTwoButton>({
    type: '',
    title: 'Xác nhận đăng xuất',
    content: 'Bạn muốn đăng xuất tài khoảng này?',
    isShow: false,
    textButtonLeft: 'Không',
    textButtonRight: 'Có',
  });

  return (
    <div className="header flex-center">
      <div className="header__last flex-center">
        <a
          className={`side-menu__nav__header__link flex-center text-decoration-none ${
            location?.pathname !== LIST_MENU_USER[0].to ? 'cursor-pointer' : 'pe-none'
          }`}
        >
          <img src={IMAGES.user} width={24} alt="" />
          <p
            className={`header__last-username text-nowrap ms-2${
              location.pathname === LIST_MENU_USER[0].to ? ' active' : ''
            }`}
          >{`${user?.username}`}</p>
        </a>
        <div className="vertical-line mx-3"></div>
        <img
          className="logout-icon cursor-pointer"
          src={IMAGES.power}
          alt=""
          onClick={() => setModalTwoButton({... modalTwoButton, isShow : true})}
        />
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
