# 같이해조 (Teamble) 🎓

조별과제나 팀플 경험이 부족한 대학생들도 부담 없이 협업을 시작할 수 있도록 돕는, 효율적인 팀 프로젝트 관리를 위한 모바일 기반 협업 앱입니다

## 핵심 기능

- [ ] **팀 생성 / 참여 기능**  
       팀 코드 기반으로 참여하고, 역할 자동 분배 기능 제공 예정

- [ ] **팀별 채팅 기능**  
       앱 내 채팅 + 읽음 여부 표시

- [ ] **할 일 / 일정 관리**  
       역할 기반 할 일 등록, 일정/마감일 관리, 삭제 가능

- [ ] **알림 기능**  
       중요 일정, 메시지 미확인 여부에 대한 알림 제공

## 기술 스택

- React Native (Expo)
- TypeScript
- React Navigation
- Axios
- React Query

## 시작하기

### 필수 조건

- Node.js (v18 이상)
- npm 또는 yarn
- Expo CLI

### 설치

```bash
# 저장소 클론
git clone [repository-url]

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 환경 변수 설정

프로젝트 루트 디렉터리에 .env 파일을 생성한 후, 아래 변수들을 설정하시기 바랍니다.

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
EXPO_PUBLIC_ENV=development
```

## 프로젝트 구조

```
src/
├── api/              # API 관련 설정 및 서비스
├── components/       # 공통 컴포넌트
├── constants/        # 상수 정의
├── screens/         # 화면(페이지) 컴포넌트
├── types/           # TypeScript 타입 정의
└── utils/           # 유틸리티 함수
```

## 브랜치 전략

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `bug/*`: 버그 수정 브랜치

## 커밋 컨벤션

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드 프로세스 또는 보조 도구 변경

## 라이선스

MIT
