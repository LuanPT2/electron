import Button from 'components/Button';
import { ModalProps } from 'models/ModalType';
import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import IMAGES from 'themes/images';

const ModalPrimary = ({
  title,
  children,
  animation = false,
  isShowCloseIcon = false,
  handleClose = () => null,
  isOpen,
  size,
  customClass = '',
  isShowTwoBtn = false,
  textBtnLeft,
  classNameBtnLeft = '',
  classNameBtnRight = '',
  textBtnRight = 'Kiểm Tra',
  handleSubmit,
  isShowFooter = true,
  isShowIconCircleClose = false,
  isClickOutside = false,
  isDisableButtonRight = false,
  isDisableOneButton = false,
}: ModalProps) => {
  return (
    <Modal
      animation={animation}
      show={isOpen}
      size={size}
      className={`custom-modal ${customClass}`}
      onHide={isClickOutside ? handleClose : () => null}
      scrollable
    >
      <Modal.Header closeButton={isShowCloseIcon} className={`${!isShowCloseIcon ? 'modal-header__without-icon' : ''}`}>
        <Modal.Title>{title}</Modal.Title>
        {isShowCloseIcon &&
          (isShowIconCircleClose ? (
            <img className="icon-close" onClick={handleClose} src={IMAGES.icon_circle_close} alt="đóng vòng tròn" />
          ) : (
            <img className="icon-close" onClick={handleClose} src={IMAGES.icon_close_modal} alt="Close" />
          ))}
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>
      {isShowFooter && (
        <Modal.Footer>
          {!isShowTwoBtn || isDisableOneButton ? (
            <Button onClick={handleSubmit} disabled={isDisableOneButton} customClass="btn-info">
              {textBtnRight}
            </Button>
          ) : (
            <div className="double-btn">
              <Button onClick={handleClose} customClass={`btn--left ${classNameBtnLeft}`}>
                {textBtnLeft}
              </Button>
              <Button
                onClick={handleSubmit}
                customClass={`btn--right ${classNameBtnRight}`}
                disabled={isDisableButtonRight}
              >
                {textBtnRight}
              </Button>
            </div>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default memo(ModalPrimary);
