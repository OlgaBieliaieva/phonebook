import { useEffect } from "react";
import { createPortal } from "react-dom";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useTheme } from "@mui/material";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children }) {
  const theme = useTheme();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div
        className={css.content}
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <button type="button" onClick={onClose} className={css.closeBtn}>
          <CloseSharpIcon />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
