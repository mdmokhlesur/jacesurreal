"use client";

import { useState, useEffect, useCallback } from "react";

export interface Toast {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'info';
}

export default function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((title: string, message: string, type: 'success' | 'info' = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, title, message, type }]);
        
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3400); // 3s show + 0.4s fade
    }, []);

    const ToastContainer = () => (
        <div className="toast-container" id="toastContainer">
            {toasts.map(t => (
                <div key={t.id} className="toast show">
                    <div className={`toast-icon ${t.type}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            {t.type === 'success' ? (
                                <polyline points="20 6 9 17 4 12" />
                            ) : (
                                <>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </>
                            )}
                        </svg>
                    </div>
                    <div className="toast-content">
                        <div className="toast-title">{t.title}</div>
                        <div className="toast-message">{t.message}</div>
                    </div>
                </div>
            ))}
        </div>
    );

    return { showToast, ToastContainer };
}
