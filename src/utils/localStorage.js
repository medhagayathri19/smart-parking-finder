import { INITIAL_PARKING_DATA } from "../data/parkingData";

const KEYS = {
  PARKING_DATA: "parkease_parking_locations",
  BOOKINGS: "parkease_bookings",
  FAVORITES: "parkease_favorites",
  USER: "parkease_user",
  THEME: "parkease_theme"
};

// Initialize default data if absent
export const initLocalStorage = () => {
  if (!localStorage.getItem(KEYS.PARKING_DATA)) {
    localStorage.setItem(KEYS.PARKING_DATA, JSON.stringify(INITIAL_PARKING_DATA));
  }
  if (!localStorage.getItem(KEYS.BOOKINGS)) {
    // Initial sample bookings for demonstration
    const sampleBookings = [
      {
        id: "BK-890214",
        parkingId: "park-1",
        parkingName: "City Center Smart Garage",
        address: "102 Central Boulevard, Downtown Sector 4",
        slot: "A1",
        date: "2026-09-26",
        startTime: "10:00 AM",
        endTime: "01:00 PM",
        duration: 3,
        pricePerHour: 40,
        totalAmount: 120,
        status: "Confirmed", // Confirmed, Active, Completed, Cancelled
        createdAt: new Date().toISOString()
      },
      {
        id: "BK-761290",
        parkingId: "park-4",
        parkingName: "Cyber Tech Park Eco Parking",
        address: "Building 3 Tech Drive, IT Zone Phase 2",
        slot: "B1",
        date: "2026-09-20",
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        duration: 8,
        pricePerHour: 45,
        totalAmount: 360,
        status: "Completed",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(sampleBookings));
  }
  if (!localStorage.getItem(KEYS.FAVORITES)) {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(["park-1", "park-4"]));
  }
  if (!localStorage.getItem(KEYS.USER)) {
    // Default demo user logged in
    const defaultUser = {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 019-2834",
      vehicleType: "Car (Sedan)",
      vehicleNumber: "KA-01-EQ-9876",
      isLoggedIn: true
    };
    localStorage.setItem(KEYS.USER, JSON.stringify(defaultUser));
  }
  if (!localStorage.getItem(KEYS.THEME)) {
    localStorage.setItem(KEYS.THEME, "dark");
  }
};

// --- PARKING LOCATIONS ---
export const getParkingLocations = () => {
  initLocalStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.PARKING_DATA)) || INITIAL_PARKING_DATA;
  } catch {
    return INITIAL_PARKING_DATA;
  }
};

export const getParkingById = (id) => {
  const locations = getParkingLocations();
  return locations.find(loc => loc.id === id) || null;
};

export const updateParkingSlots = (parkingId, slotId, isBooking = true) => {
  const locations = getParkingLocations();
  const updated = locations.map(loc => {
    if (loc.id === parkingId) {
      const updatedSlots = loc.slots.map(s => {
        if (s.id === slotId) {
          return { ...s, status: isBooking ? "occupied" : "available" };
        }
        return s;
      });
      const availCount = updatedSlots.filter(s => s.status === "available").length;
      return {
        ...loc,
        slots: updatedSlots,
        availableSlots: availCount
      };
    }
    return loc;
  });
  localStorage.setItem(KEYS.PARKING_DATA, JSON.stringify(updated));
  return updated;
};

// --- BOOKINGS ---
export const getBookings = () => {
  initLocalStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.BOOKINGS)) || [];
  } catch {
    return [];
  }
};

export const saveBooking = (bookingData) => {
  const bookings = getBookings();
  const newBooking = {
    id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
    ...bookingData,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };
  const updatedBookings = [newBooking, ...bookings];
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updatedBookings));

  // Mark slot as occupied in parking location data
  updateParkingSlots(bookingData.parkingId, bookingData.slot, true);

  return newBooking;
};

export const cancelBooking = (bookingId) => {
  const bookings = getBookings();
  let cancelledBooking = null;

  const updatedBookings = bookings.map(b => {
    if (b.id === bookingId) {
      cancelledBooking = b;
      return { ...b, status: "Cancelled" };
    }
    return b;
  });

  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updatedBookings));

  if (cancelledBooking) {
    // Free up slot in parking data
    updateParkingSlots(cancelledBooking.parkingId, cancelledBooking.slot, false);
  }

  return updatedBookings;
};

// --- FAVORITES ---
export const getFavorites = () => {
  initLocalStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.FAVORITES)) || [];
  } catch {
    return [];
  }
};

export const toggleFavorite = (parkingId) => {
  const favorites = getFavorites();
  let updated;
  if (favorites.includes(parkingId)) {
    updated = favorites.filter(id => id !== parkingId);
  } else {
    updated = [...favorites, parkingId];
  }
  localStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
  return updated;
};

// --- USER PROFILE & AUTH ---
export const getUser = () => {
  initLocalStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.USER)) || null;
  } catch {
    return null;
  }
};

export const saveUser = (userData) => {
  localStorage.setItem(KEYS.USER, JSON.stringify(userData));
  return userData;
};

export const logoutUser = () => {
  const user = getUser();
  if (user) {
    user.isLoggedIn = false;
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  }
};

export const loginDemoUser = (email, password) => {
  const existing = getUser() || {};
  const updatedUser = {
    ...existing,
    email: email || existing.email || "demo@parkease.com",
    name: existing.name || "Demo User",
    isLoggedIn: true
  };
  localStorage.setItem(KEYS.USER, JSON.stringify(updatedUser));
  return updatedUser;
};

// --- THEME ---
export const getStoredTheme = () => {
  return localStorage.getItem(KEYS.THEME) || "dark";
};

export const setStoredTheme = (theme) => {
  localStorage.setItem(KEYS.THEME, theme);
};

export const clearBookingHistory = () => {
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([]));
};
