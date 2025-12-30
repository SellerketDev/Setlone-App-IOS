# Setlone Mobile App - iOS

React Native 기반 iOS 앱

## 주요 기능

- ✅ 웹뷰를 통한 기존 웹사이트 표시
- ✅ 네이티브 하단 네비게이션 바 (홈, 프로필, 설정)
- ✅ 네이티브 설정 화면
- ✅ Firebase 푸시 알림 (Firebase 21.x)
- ✅ 스플래시 스크린
- ✅ 다크 테마 UI (웹과 일관성 유지)
- ✅ React Native Reanimated (성능 최적화)

## 버전 정보

- **React Native**: 0.83.1
- **React**: 19.2.0
- **Firebase**: 21.5.0
- **React Navigation**: 7.x

## 설치 및 실행

### 필수 요구사항

- Node.js 24 이상
- macOS (iOS 개발 필수)
- Xcode
- CocoaPods: `sudo gem install cocoapods`

### 설치

```bash
npm install
cd ios
pod install
cd ..
```

### 실행

```bash
# Metro Bundler 시작
npm start

# iOS 앱 실행 (새 터미널)
npm run ios
```

## 프로젝트 구조

```
SetloneApp-iOS/
├── ios/                     # iOS 네이티브 코드
├── src/                     # React Native 소스 코드
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── screens/             # 화면 컴포넌트
│   ├── navigation/          # 네비게이션 설정
│   ├── services/            # API, Firebase 등 서비스
│   └── utils/               # 유틸리티 함수
├── assets/                  # 이미지, 폰트 등 리소스
└── scripts/                 # 빌드 스크립트
```

## 빌드

### Xcode에서 빌드

1. `ios/SetloneApp.xcworkspace` (또는 `.xcodeproj`) 열기
2. Product > Archive 선택
3. 배포용 IPA 생성

## Firebase 설정

1. Firebase Console에서 iOS 앱 추가
2. `GoogleService-Info.plist` 다운로드
3. Xcode에서 프로젝트에 추가

## 문제 해결

### Metro bundler 오류
```bash
npm start -- --reset-cache
```

### iOS Pod 오류
```bash
cd ios
pod deintegrate
rm Podfile.lock
pod install
cd ..
```

### 버전 충돌 오류
```bash
rm -rf node_modules package-lock.json
rm -rf ios/Pods ios/Podfile.lock
npm install
cd ios && pod install && cd ..
```

