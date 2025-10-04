import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { BREAKPOINTS } from './breakpoints';
import Toast from 'renderer/components/Toast';
import Flexbox from 'renderer/components/Flexbox';

const Ctx = React.createContext();

const ToastContainer = styled(Flexbox)`
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: var(--z-index-above);

  @media (max-width: ${BREAKPOINTS.small}) {
    top: 16px;
    right: 16px;
  }
`;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const hideToast = (id) => {
    setToasts((oldToasts) => oldToasts.filter((el) => el.id !== id));
  };

  // variant: "success" | "error" | "info"
  const showToast = (label, variant, icon, autoHide = true) => {
    const id = Date.now() + Math.random();
    setToasts((oldToasts) => [
      { id, variant, label, icon, autoHide },
      ...oldToasts,
    ]);

    if (autoHide) {
      timeoutRef.current = setTimeout(() => {
        hideToast(id);
      }, 5000);
    }
  };

  return (
    <Ctx.Provider value={{ showToast }}>
      {children}
      <ToastContainer flexDirection="column" alignItems="flex-end" gap={8}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              layout
              key={toast.id}
              initial={{ opacity: 0, x: 0, y: -80 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 0 }}
              transition={{
                duration: 0.2,
                layout: {
                  duration: 0.2,
                },
              }}
            >
              <Toast
                key={toast.id}
                id={toast.id}
                variant={toast.variant}
                label={toast.label}
                icon={toast.icon}
                hideToast={hideToast}
                autoHide={toast.autoHide}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </ToastContainer>
    </Ctx.Provider>
  );
}

export const useToast = () => React.useContext(Ctx);
