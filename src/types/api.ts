// Spring 서버 응답 기본 타입
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp: string;
}

// Spring 서버 에러 응답 타입
export interface ApiError {
  status: number;
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
  timestamp: string;
}

// Spring 서버 페이지네이션 응답 타입
export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

// 사용자 관련 타입
export interface User {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// 방 관련 타입
export interface Room {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  members: User[];
}

// 일정 관련 타입
export interface Event {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  roomId: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}
