import { useState, useEffect } from 'react';

class ToastManager {
  constructor() {
    this.listeners = new Set();
    this.toasts = [];
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

  addToast({ title, message, type = 'info', duration = 4500 }) {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substr(2, 4);
    const toast = { id, title, message, type, duration };

    // Max 3 stacked
    this.toasts = [toast, ...this.toasts.slice(0, 2)];
    this.notify();

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    }
    return id;
  }

  removeToast(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }
}

export const toastManager = new ToastManager();

export function showToast(title, message, type = 'info', duration = 4500) {
  return toastManager.addToast({ title, message, type, duration });
}

export function useToast() {
  const [toasts, setToasts] = useState(toastManager.toasts);

  useEffect(() => {
    return toastManager.subscribe(() => {
      setToasts([...toastManager.toasts]);
    });
  }, []);

  return {
    toasts,
    showToast: (title, message, type, duration) =>
      toastManager.addToast({ title, message, type, duration }),
    removeToast: (id) => toastManager.removeToast(id),
  };
}
