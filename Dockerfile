# 가져올 이미지를 정의
FROM node:14
# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY frontend/build/ ./
# 명령어 실행 (serve 설치)
RUN npm install -g serve
# 80번 포트 노출
EXPOSE 80
# serve로 앱 서빙
CMD ["serve", "-s", ".", "-l", "80"]
