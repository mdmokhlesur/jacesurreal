"use client";

import { useState } from "react";

export default function SuperPhone() {
    const [phone, setPhone] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribed(true);
        // Simulate success state like in index.html
    };

    return (
        <section className="superphone-section">
            <div className="superphone-card">
                <div className="superphone-icon">
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                </div>
                <h2 className="superphone-title">Join The Inner Circle</h2>
                <p className="superphone-subtitle">
                    Get exclusive drops, VIP access to shows, and behind‑the‑scenes content 
                    delivered straight to your phone.
                </p>
                <form className="superphone-form" onSubmit={handleSubscribe}>
                    <div className="phone-input-container">
                        <input 
                            type="tel" 
                            className="superphone-input" 
                            placeholder={subscribed ? "Subscribed! 🎉" : "Enter your number"} 
                            required 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={subscribed}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="superphone-btn"
                        style={subscribed ? { background: 'linear-gradient(135deg, #10b981, #059669)' } : {}}
                    >
                        {subscribed ? 'Subscribed! 🎉' : 'Subscribe'}
                    </button>
                </form>
                <div className="superphone-features">
                    <div className="feature-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Exclusive Drops
                    </div>
                    <div className="feature-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Show Alerts
                    </div>
                    <div className="feature-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        VIP Access
                    </div>
                </div>
            </div>
        </section>
    );
}
