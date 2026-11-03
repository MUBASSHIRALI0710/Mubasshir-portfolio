'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Video, CheckCircle2, Send, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 3:00 PM IST');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const availableSlots = [
    'Tomorrow, 3:00 PM IST',
    'Tomorrow, 6:30 PM IST',
    'Wednesday, 4:00 PM IST',
    'Wednesday, 7:00 PM IST',
    'Thursday, 5:30 PM IST',
  ];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestEmail) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName || 'Prospective Client',
          email: guestEmail,
          projectType: '15-Min Technical Discovery Call',
          budget: 'Discovery Call',
          message: `Requested Call Window: ${selectedSlot}\nGuest Name: ${guestName}\nGuest Email: ${guestEmail}`,
        }),
      });
    } catch (err) {
      console.error('Call booking notification error:', err);
    } finally {
      setIsSubmitting(false);
      setBooked(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-surface border border-border rounded-card shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
        >
          <div className="flex items-start justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-text-primary">
                  15-Min Technical Discovery Call
                </h3>
                <p className="text-xs font-mono text-text-secondary flex items-center gap-2 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>15 Mins • Google Meet / Zoom</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-input text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {booked ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold font-heading text-text-primary">
                Call Reserved!
              </h4>
              <p className="text-sm text-text-secondary max-w-xs mx-auto">
                Mubasshir has been notified. You will receive a Google Meet invite for <span className="font-semibold text-text-primary">{selectedSlot}</span> at <span className="font-mono text-accent">{guestEmail}</span>.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <a
                  href={`https://wa.me/917003151313?text=${encodeURIComponent(`Hi Mubasshir, I just reserved a 15-minute discovery call for ${selectedSlot}. My email is ${guestEmail}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-pill bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Quick WhatsApp Ping →</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2 rounded-pill bg-surface-elevated border border-border text-text-primary text-xs font-medium hover:bg-surface transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-1.5 font-semibold">
                  Select Preferred Intro Window
                </label>
                <div className="space-y-1.5">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full p-2.5 rounded-input text-xs font-mono flex items-center justify-between border transition-all ${
                        selectedSlot === slot
                          ? 'border-accent bg-accent/10 text-accent font-semibold'
                          : 'border-border bg-surface-elevated text-text-secondary hover:border-text-secondary'
                      }`}
                    >
                      <span>{slot}</span>
                      {selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-accent" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-1 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 rounded-input bg-surface-elevated border border-border text-xs text-text-primary focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-1 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-input bg-surface-elevated border border-border text-xs text-text-primary focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 rounded-pill bg-accent text-white font-medium text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Video className="w-4 h-4" />
                <span>{isSubmitting ? 'Reserving Call...' : 'Confirm Call with Mubasshir'}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
