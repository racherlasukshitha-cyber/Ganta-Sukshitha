import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_APPOINTMENTS,
  INITIAL_BLOG_POSTS,
  INITIAL_REVIEWS,
  INITIAL_SERVICES,
  INITIAL_USERS,
} from '../data/initialData';
import {
  Appointment,
  AppointmentStatus,
  BlogPost,
  KundliData,
  NotificationItem,
  PaymentTransaction,
  Review,
  Service,
  UserClient,
} from '../types';
import { calculateKundli } from '../utils/astrologyEngine';
import { safeStorage } from '../utils/safeStorage';

export type CustomerTab =
  | 'home'
  | 'about'
  | 'services'
  | 'kundli'
  | 'matchmaking'
  | 'horoscope'
  | 'numerology'
  | 'blog'
  | 'testimonials'
  | 'gallery'
  | 'reviews'
  | 'faq'
  | 'contact';

export type AdminTab =
  | 'dashboard'
  | 'appointments'
  | 'services'
  | 'users'
  | 'analytics'
  | 'revenue'
  | 'kundlis'
  | 'backup'
  | 'seo'
  | 'deployment';

interface AppContextType {
  mode: 'customer' | 'admin';
  setMode: (mode: 'customer' | 'admin') => void;
  customerTab: CustomerTab;
  setCustomerTab: (tab: CustomerTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminUser: { name: string; email: string } | null;
  adminLoginModalOpen: boolean;
  isAdminLoginModalOpen: boolean;
  setAdminLoginModalOpen: (open: boolean) => void;
  loginAdmin: (email: string, pass: string) => boolean;
  adminLogin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  adminLogout: () => void;

  // Astrologer Photo
  astrologerPhoto: string;
  setAstrologerPhoto: (url: string) => void;

  // Services
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (idOrSrv: string | Service, updates?: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;

  // Appointments
  appointments: Appointment[];
  addAppointment: (app: Omit<Appointment, 'id' | 'bookingNumber' | 'createdAt'>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, notes?: string, meetingLink?: string) => void;
  updateAppointmentPaymentStatus: (id: string, paymentStatus: Appointment['paymentStatus']) => void;
  deleteAppointment: (id: string) => void;

  // Users
  users: UserClient[];
  toggleUserStatus: (id: string) => void;

  // Kundli
  savedKundlis: KundliData[];
  saveKundli: (data: KundliData) => void;
  deleteSavedKundli: (id: string) => void;
  activeKundli: KundliData | null;
  setActiveKundli: (k: KundliData | null) => void;

  // Reviews
  reviews: Review[];
  addReview: (rev: Partial<Review>) => void;
  toggleReviewApproval: (id: string) => void;

  // Blog
  blogPosts: BlogPost[];
  selectedBlogPost: BlogPost | null;
  setSelectedBlogPost: (b: BlogPost | null) => void;

  // Payments Ledger
  transactions: PaymentTransaction[];
  addTransaction: (tx: PaymentTransaction) => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Modals & Flow
  bookingModalService: Service | null;
  setBookingModalService: (s: Service | null) => void;
  paymentModalAppointment: Appointment | null;
  setPaymentModalAppointment: (a: Appointment | null) => void;
  receiptModalAppointment: Appointment | null;
  setReceiptModalAppointment: (a: Appointment | null) => void;
  emailModalAppointment: Appointment | null;
  setEmailModalAppointment: (a: Appointment | null) => void;

  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Backup & Restore
  exportAllDataJSON: () => string;
  restoreFromJSON: (jsonStr: string) => boolean;
  restoreBackup: (dataOrJson: unknown) => boolean;
  resetToDefaultData: () => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'customer' | 'admin'>(() => {
    try {
      if (typeof window !== 'undefined' && window.location) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('mode') === 'admin' || window.location.pathname.startsWith('/admin')) {
          return 'admin';
        }
      }
    } catch {
      // ignore
    }
    return 'customer';
  });

  const [customerTab, setCustomerTab] = useState<CustomerTab>(() => {
    try {
      if (typeof window !== 'undefined' && window.location) {
        const validTabs: CustomerTab[] = [
          'home', 'about', 'services', 'kundli', 'matchmaking',
          'horoscope', 'numerology', 'blog', 'testimonials', 'gallery',
          'reviews', 'faq', 'contact',
        ];
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab') as CustomerTab;
        if (tabParam && validTabs.includes(tabParam)) {
          return tabParam;
        }
        const hash = window.location.hash.replace('#', '').toLowerCase() as CustomerTab;
        if (hash && validTabs.includes(hash)) {
          return hash;
        }
      }
    } catch {
      // ignore
    }
    return 'home';
  });

  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return safeStorage.getItem('astroveda_admin_auth') === 'true';
  });
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(() => {
    return safeStorage.getItem('astroveda_admin_auth') === 'true'
      ? { name: 'Mata Sri Poornima (Admin)', email: 'gantapoornima555@gmail.com' }
      : null;
  });
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Astrologer Photo
  const [astrologerPhoto, setAstrologerPhotoState] = useState<string>(() => {
    return safeStorage.getItem('astropoornima_photo') || '/poornima_astrologer.jpg';
  });

  const setAstrologerPhoto = (url: string) => {
    setAstrologerPhotoState(url);
    safeStorage.setItem('astropoornima_photo', url);
  };

  // Services - ensure core services always exist with valid array structure
  const [services, setServices] = useState<Service[]>(() => {
    return safeStorage.getParsedJSON<Service[]>(
      'astropoornima_services_v3',
      INITIAL_SERVICES,
      (val) => {
        if (!Array.isArray(val) || val.length === 0) return false;
        const hasOnline = val.some((s) => s.id === 'srv-kundli-online');
        const hasOffline = val.some((s) => s.id === 'srv-kundli-offline');
        const hasMatch = val.some((s) => s.id === 'srv-matchmaking');
        return hasOnline && hasOffline && hasMatch;
      }
    );
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    return safeStorage.getParsedJSON<Appointment[]>(
      'astroveda_appointments',
      INITIAL_APPOINTMENTS,
      (val) => Array.isArray(val)
    );
  });

  // Users
  const [users, setUsers] = useState<UserClient[]>(() => {
    return safeStorage.getParsedJSON<UserClient[]>(
      'astroveda_users',
      INITIAL_USERS,
      (val) => Array.isArray(val)
    );
  });

  // Saved Kundlis
  const [savedKundlis, setSavedKundlis] = useState<KundliData[]>(() => {
    return safeStorage.getParsedJSON<KundliData[]>(
      'astroveda_kundlis',
      [
        calculateKundli({
          name: 'Aditya Roy Kapoor',
          gender: 'Male',
          dob: '1991-11-16',
          tob: '08:30',
          pob: 'Varanasi, UP',
        }),
      ],
      (val) => Array.isArray(val) && val.length > 0
    );
  });
  const [activeKundli, setActiveKundli] = useState<KundliData | null>(null);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    return safeStorage.getParsedJSON<Review[]>(
      'astroveda_reviews',
      INITIAL_REVIEWS,
      (val) => Array.isArray(val)
    );
  });

  // Blog
  const [blogPosts] = useState<BlogPost[]>(() => {
    return safeStorage.getParsedJSON<BlogPost[]>(
      'astroveda_blogs',
      INITIAL_BLOG_POSTS,
      (val) => Array.isArray(val)
    );
  });
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Transactions
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const defaultTxns: PaymentTransaction[] = [
      {
        id: 'TXN-101',
        appointmentId: 'app-101',
        customerName: 'Vikramaditya Sharma',
        customerEmail: 'vikram.sharma@gmail.com',
        amount: 1000,
        method: 'UPI',
        status: 'Success',
        razorpayPaymentId: 'pay_OMsK3kK9Xw4jL8',
        razorpayOrderId: 'order_OMsK3kK9Xw4jL8',
        date: '2026-09-08T10:15:00Z',
      },
      {
        id: 'TXN-102',
        appointmentId: 'app-102',
        customerName: 'Ananya Mukherjee',
        customerEmail: 'ananya.m@outlook.com',
        amount: 2000,
        method: 'Credit Card',
        status: 'Success',
        razorpayPaymentId: 'pay_PNd9L0P3k1bC8Q',
        razorpayOrderId: 'order_PNd9L0P3k1bC8Q',
        date: '2026-09-09T09:30:00Z',
      },
      {
        id: 'TXN-103',
        appointmentId: 'app-103',
        customerName: 'Rajesh Singhania',
        customerEmail: 'rajesh@singhaniagroup.in',
        amount: 3000,
        method: 'Netbanking',
        status: 'Success',
        razorpayPaymentId: 'pay_QR4xM8B0j4pE6Z',
        razorpayOrderId: 'order_QR4xM8B0j4pE6Z',
        date: '2026-09-09T14:45:00Z',
      },
    ];
    return safeStorage.getParsedJSON<PaymentTransaction[]>(
      'astroveda_transactions',
      defaultTxns,
      (val) => Array.isArray(val)
    );
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const defaultNotifs: NotificationItem[] = [
      {
        id: 'notif-1',
        title: 'New Consultation Booked',
        message: 'Vikramaditya Sharma scheduled Janam Kundli Analysis for Sept 12.',
        type: 'appointment',
        timestamp: '2026-09-09T14:00:00Z',
        read: false,
      },
      {
        id: 'notif-2',
        title: 'Payment Received (₹ 1,000)',
        message: 'Razorpay payment pay_PNd9L0P3k1bC8Q successfully confirmed for Kundli Reading.',
        type: 'payment',
        timestamp: '2026-09-09T09:35:00Z',
        read: false,
      },
      {
        id: 'notif-3',
        title: 'Upcoming Appointment Reminder',
        message: 'Session with Pooja Hegde starts in 2 hours via Google Meet.',
        type: 'appointment',
        timestamp: '2026-09-10T04:00:00Z',
        read: true,
      },
    ];
    return safeStorage.getParsedJSON<NotificationItem[]>(
      'astroveda_notifications',
      defaultNotifs,
      (val) => Array.isArray(val)
    );
  });

  // Modals & UI flows
  const [bookingModalService, setBookingModalService] = useState<Service | null>(null);
  const [paymentModalAppointment, setPaymentModalAppointment] = useState<Appointment | null>(null);
  const [receiptModalAppointment, setReceiptModalAppointment] = useState<Appointment | null>(null);
  const [emailModalAppointment, setEmailModalAppointment] = useState<Appointment | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to safeStorage
  useEffect(() => {
    safeStorage.setItem('astropoornima_services_v3', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    safeStorage.setItem('astroveda_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    safeStorage.setItem('astroveda_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    safeStorage.setItem('astroveda_kundlis', JSON.stringify(savedKundlis));
  }, [savedKundlis]);

  useEffect(() => {
    safeStorage.setItem('astroveda_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    safeStorage.setItem('astroveda_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    safeStorage.setItem('astroveda_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Admin Auth handlers
  const loginAdmin = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (
      cleanEmail === 'gantapoornima555@gmail.com' ||
      cleanEmail === 'admin@astroveda.com' ||
      cleanEmail === 'admin@astropoornima.com' ||
      pass === 'vedic108' ||
      pass === 'poornima108' ||
      pass === 'admin123'
    ) {
      setIsAdminLoggedIn(true);
      setAdminUser({ name: 'Mata Sri Poornima (Admin)', email: 'gantapoornima555@gmail.com' });
      safeStorage.setItem('astroveda_admin_auth', 'true');
      setAdminLoginModalOpen(false);
      setMode('admin');
      showToast('Welcome back, Mata Sri Poornima! Admin panel access granted.', 'success');
      return true;
    }
    showToast('Invalid credentials. Use demo: gantapoornima555@gmail.com / vedic108', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    safeStorage.removeItem('astroveda_admin_auth');
    setMode('customer');
    showToast('Admin session logged out safely.', 'info');
  };

  // Services CRUD
  const addService = (newSrv: Omit<Service, 'id'>) => {
    const id = `srv-${Date.now()}`;
    setServices(prev => [
      { id, ...newSrv },
      ...prev
    ]);
    showToast(`Service "${newSrv.title}" created successfully!`, 'success');
  };

  const updateService = (idOrSrv: string | Service, updates?: Partial<Service>) => {
    if (typeof idOrSrv === 'string') {
      setServices(prev => prev.map(s => s.id === idOrSrv ? { ...s, ...(updates || {}) } : s));
    } else {
      setServices(prev => prev.map(s => s.id === idOrSrv.id ? { ...s, ...idOrSrv } : s));
    }
    showToast('Service updated successfully!', 'success');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('Service deleted.', 'info');
  };

  const toggleServiceActive = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  // Appointments CRUD
  const addAppointment = (appData: Omit<Appointment, 'id' | 'bookingNumber' | 'createdAt'>): Appointment => {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newApp: Appointment = {
      ...appData,
      id: `app-${Date.now()}`,
      bookingNumber: `AV-${randNum}`,
      createdAt: new Date().toISOString(),
    };

    setAppointments(prev => [newApp, ...prev]);

    // Update or add user to client directory
    setUsers(prev => {
      const existing = prev.find(u => u.email.toLowerCase() === newApp.customerEmail.toLowerCase());
      if (existing) {
        return prev.map(u => u.id === existing.id ? {
          ...u,
          totalBookings: u.totalBookings + 1,
          totalSpent: u.totalSpent + newApp.amount,
          lastBookingDate: newApp.date,
        } : u);
      } else {
        const newUser: UserClient = {
          id: `usr-${Date.now()}`,
          name: newApp.customerName,
          email: newApp.customerEmail,
          phone: newApp.customerPhone,
          totalBookings: 1,
          totalSpent: newApp.amount,
          lastBookingDate: newApp.date,
          status: 'Active',
        };
        return [newUser, ...prev];
      }
    });

    // Send admin notification
    addNotification({
      title: `New Booking: ${newApp.serviceTitle}`,
      message: `${newApp.customerName} booked consultation for ${newApp.date} (${newApp.timeSlot}).`,
      type: 'appointment',
      linkAction: newApp.id,
    });

    return newApp;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus, notes?: string, meetingLink?: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          notes: notes !== undefined ? notes : a.notes,
          meetingLink: meetingLink !== undefined ? meetingLink : a.meetingLink,
        };
      }
      return a;
    }));
    showToast(`Appointment status updated to "${status}".`, 'success');
  };

  const updateAppointmentPaymentStatus = (id: string, paymentStatus: Appointment['paymentStatus']) => {
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, paymentStatus } : a)));
    showToast(`Payment status updated to "${paymentStatus}".`, 'success');
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    showToast('Appointment removed.', 'info');
  };

  // User client toggle
  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
    showToast('Client account status toggled.', 'info');
  };

  // Kundlis
  const saveKundli = (k: KundliData) => {
    setSavedKundlis(prev => {
      const filtered = prev.filter(item => item.id !== k.id);
      return [k, ...filtered];
    });
    showToast(`Kundli for ${k.name} saved to archive!`, 'success');
  };

  const deleteSavedKundli = (id: string) => {
    setSavedKundlis(prev => prev.filter(k => k.id !== id));
    showToast('Saved Kundli deleted.', 'info');
  };

  // Reviews
  const addReview = (revData: Partial<Review>) => {
    const author = revData.author || revData.userName || 'Devotee';
    const city = revData.city || revData.userLocation || 'India';
    const serviceTitle = revData.serviceTitle || revData.serviceUsed || 'Vedic Consultation';
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author,
      city,
      rating: revData.rating || 5,
      serviceTitle,
      comment: revData.comment || '',
      date: revData.date || new Date().toISOString().split('T')[0],
      verified: revData.verified ?? revData.verifiedBooking ?? true,
      approved: revData.approved ?? true,
      userName: author,
      userLocation: city,
      serviceUsed: serviceTitle,
      verifiedBooking: true,
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const toggleReviewApproval = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
  };

  // Transactions
  const addTransaction = (tx: PaymentTransaction) => {
    setTransactions(prev => [tx, ...prev]);
    addNotification({
      title: `Payment Received: ₹${tx.amount}`,
      message: `Razorpay ID ${tx.razorpayPaymentId} for ${tx.customerName} verified successfully.`,
      type: 'payment',
    });
  };

  // Notifications
  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      ...item,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  };

  // Backup & Restore
  const exportAllDataJSON = (): string => {
    const data = {
      services,
      appointments,
      users,
      savedKundlis,
      reviews,
      transactions,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    return JSON.stringify(data, null, 2);
  };

  const restoreFromJSON = (jsonStr: string): boolean => {
    try {
      const parsed = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
      if (parsed && typeof parsed === 'object') {
        const payload = parsed.data || parsed;
        if (payload.services && Array.isArray(payload.services)) setServices(payload.services);
        if (payload.appointments && Array.isArray(payload.appointments)) setAppointments(payload.appointments);
        if (payload.users && Array.isArray(payload.users)) setUsers(payload.users);
        if (payload.savedKundlis && Array.isArray(payload.savedKundlis)) setSavedKundlis(payload.savedKundlis);
        if (payload.reviews && Array.isArray(payload.reviews)) setReviews(payload.reviews);
        if (payload.transactions && Array.isArray(payload.transactions)) setTransactions(payload.transactions);
        showToast('Database restored successfully from backup!', 'success');
        return true;
      }
      return false;
    } catch {
      showToast('Invalid JSON backup file provided.', 'error');
      return false;
    }
  };

  const restoreBackup = (dataOrJson: unknown): boolean => {
    if (typeof dataOrJson === 'string') {
      return restoreFromJSON(dataOrJson);
    }
    if (dataOrJson && typeof dataOrJson === 'object') {
      const payload = (dataOrJson as any).data || dataOrJson;
      if (payload.services && Array.isArray(payload.services)) setServices(payload.services);
      if (payload.appointments && Array.isArray(payload.appointments)) setAppointments(payload.appointments);
      if (payload.users && Array.isArray(payload.users)) setUsers(payload.users);
      if (payload.savedKundlis && Array.isArray(payload.savedKundlis)) setSavedKundlis(payload.savedKundlis);
      if (payload.reviews && Array.isArray(payload.reviews)) setReviews(payload.reviews);
      if (payload.transactions && Array.isArray(payload.transactions)) setTransactions(payload.transactions);
      showToast('Database restored successfully from backup!', 'success');
      return true;
    }
    return false;
  };

  const resetToDefaultData = () => {
    setServices(INITIAL_SERVICES);
    setAppointments(INITIAL_APPOINTMENTS);
    setUsers(INITIAL_USERS);
    setReviews(INITIAL_REVIEWS);
    showToast('Platform reset to default Vedic dataset.', 'info');
  };

  const resetToDefaults = () => {
    resetToDefaultData();
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        customerTab,
        setCustomerTab,
        adminTab,
        setAdminTab,
        isAdminLoggedIn,
        adminUser,
        adminLoginModalOpen,
        isAdminLoginModalOpen: adminLoginModalOpen,
        setAdminLoginModalOpen,
        loginAdmin,
        adminLogin: loginAdmin,
        logoutAdmin,
        adminLogout: logoutAdmin,
        services,
        addService,
        updateService,
        deleteService,
        toggleServiceActive,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        updateAppointmentPaymentStatus,
        deleteAppointment,
        users,
        toggleUserStatus,
        savedKundlis,
        saveKundli,
        deleteSavedKundli,
        activeKundli,
        setActiveKundli,
        reviews,
        addReview,
        toggleReviewApproval,
        blogPosts,
        selectedBlogPost,
        setSelectedBlogPost,
        transactions,
        addTransaction,
        notifications,
        addNotification,
        markNotificationRead,
        clearNotifications,
        bookingModalService,
        setBookingModalService,
        paymentModalAppointment,
        setPaymentModalAppointment,
        receiptModalAppointment,
        setReceiptModalAppointment,
        emailModalAppointment,
        setEmailModalAppointment,
        toast,
        showToast,
        astrologerPhoto,
        setAstrologerPhoto,
        exportAllDataJSON,
        restoreFromJSON,
        restoreBackup,
        resetToDefaultData,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
