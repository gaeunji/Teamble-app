export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },

  // User
  USER: {
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
  },

  // Room
  ROOM: {
    LIST: "/rooms",
    DETAIL: (id: string) => `/rooms/${id}`,
    CREATE: "/rooms",
    UPDATE: (id: string) => `/rooms/${id}`,
    DELETE: (id: string) => `/rooms/${id}`,
  },

  // Calendar
  CALENDAR: {
    EVENTS: "/calendar/events",
    EVENT: (id: string) => `/calendar/events/${id}`,
  },
} as const;
