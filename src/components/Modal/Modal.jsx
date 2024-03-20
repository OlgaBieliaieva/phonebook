import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { forwardRef } from 'react';
import css from './Modal.module.css';

const Modal = forwardRef(({ children, onClose }, ref) => {
  return (
    <dialog ref={ref} className={css.modal}>
      <button type="button" onClick={onClose} className={css.closeBtn}>
        <CloseSharpIcon />
      </button>
      {children}
    </dialog>
  );
});

Modal.displayName = 'Modal';
export default Modal;
