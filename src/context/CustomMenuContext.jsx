import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CustomMenuContext = createContext(null);

const STORAGE_KEY_ITEMS = 'rabat_custom_menu_items';
const STORAGE_KEY_DRAFT = 'rabat_reservation_draft';

export function CustomMenuProvider({ children }) {
  // 1. Selected Custom Dishes State (Persisted in localStorage)
  const [selectedCustomItems, setSelectedCustomItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Reservation Form Draft State (Persisted in sessionStorage so user doesn't lose form data when hopping to /menu)
  const [reservationDraft, setReservationDraft] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_DRAFT);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync selected items with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(selectedCustomItems));
    } catch (e) {
      console.error('Failed to save custom menu to storage:', e);
    }
  }, [selectedCustomItems]);

  // Sync reservation draft with sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(reservationDraft));
    } catch (e) {
      console.error('Failed to save reservation draft to storage:', e);
    }
  }, [reservationDraft]);

  const toggleCustomItem = useCallback((item, category) => {
    setSelectedCustomItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, { ...item, category }];
      }
    });
  }, []);

  const removeCustomItem = useCallback((itemId) => {
    setSelectedCustomItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const clearAllCustomItems = useCallback(() => {
    setSelectedCustomItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY_ITEMS);
    } catch {}
  }, []);

  const isItemSelected = useCallback(
    (itemId) => selectedCustomItems.some((i) => i.id === itemId),
    [selectedCustomItems]
  );

  const updateReservationDraft = useCallback((fields) => {
    setReservationDraft((prev) => ({ ...prev, ...fields }));
  }, []);

  const clearReservationDraft = useCallback(() => {
    setReservationDraft({});
    try {
      sessionStorage.removeItem(STORAGE_KEY_DRAFT);
    } catch {}
  }, []);

  return (
    <CustomMenuContext.Provider
      value={{
        selectedCustomItems,
        setSelectedCustomItems,
        toggleCustomItem,
        removeCustomItem,
        clearAllCustomItems,
        isItemSelected,
        reservationDraft,
        updateReservationDraft,
        clearReservationDraft,
      }}
    >
      {children}
    </CustomMenuContext.Provider>
  );
}

export function useCustomMenu() {
  const ctx = useContext(CustomMenuContext);
  if (!ctx) {
    throw new Error('useCustomMenu must be used within a CustomMenuProvider');
  }
  return ctx;
}
