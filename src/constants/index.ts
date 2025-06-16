// 앱 전체에서 사용되는 상수들
export const APP_CONSTANTS = {
  // API 관련
  API: {
    TIMEOUT: 10000,
    MAX_RETRIES: 3,
  },

  // 페이지네이션
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
  },

  // 캐시
  CACHE: {
    DEFAULT_TTL: 5 * 60 * 1000, // 5분
  },

  // 유효성 검사
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_NAME_LENGTH: 50,
  },

  // 날짜/시간 포맷
  DATE_FORMAT: {
    DEFAULT: "YYYY-MM-DD",
    TIME: "HH:mm",
    DATETIME: "YYYY-MM-DD HH:mm",
  },
} as const;
