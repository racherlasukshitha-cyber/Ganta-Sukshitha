import { Bell, Check, Trash2, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationBell: React.FC = () => {
  const { notifications, markNotificationRead, clearNotifications } = useApp();
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative inline-block" ref={menuRef} id="notification-bell-container">
      <button
        id="notification-bell-btn"
        onClick={() => setOpen(!open)}
        className="relative p-2 text-amber-100 hover:text-amber-300 hover:bg-amber-950/40 rounded-full transition-colors cursor-pointer"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          id="notification-dropdown-menu"
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-amber-500/30 rounded-xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-amber-500/20">
            <div className="flex items-center gap-2">
              <span className="font-cinzel font-semibold text-amber-200 text-sm">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {unreadCount} New
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  title="Clear all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                No notifications right now.
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  className={`p-3.5 text-left transition-colors flex items-start justify-between gap-3 ${
                    n.read ? 'bg-slate-900/50 hover:bg-slate-800/40' : 'bg-amber-950/20 hover:bg-amber-950/30'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-amber-300">{n.title}</span>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => markNotificationRead(n.id)}
                      className="text-slate-400 hover:text-amber-400 p-1"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toast } = useApp();
  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-900/90 border-emerald-500 text-emerald-100 shadow-emerald-950/50',
    info: 'bg-indigo-900/90 border-indigo-500 text-indigo-100 shadow-indigo-950/50',
    error: 'bg-rose-900/90 border-rose-500 text-rose-100 shadow-rose-950/50',
  }[toast.type];

  return (
    <div
      id="global-toast-message"
      className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in"
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-sm ${bgStyles}`}>
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
