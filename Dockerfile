# 가져올 이미지를 정의
FROM node:14
# 경로 설정하기
WORKDIR /app
# package.json 과 package-lock.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY frontend/package*.json ./
# 명령어 실행 (의존성 설치)
RUN npm install
# 빌드된 파일들을 워킹 디렉토리에 복사
COPY frontend/build/ ./
# 3000번 포트 노출
EXPOSE 3000
# npm start 스크립트 실행
CMD ["npm", "start"]
