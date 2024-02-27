# 가져올 이미지를 정의
FROM node:16-apline
# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY frontend/build/ ./
# 3000번 포트 노출
EXPOSE 3000
# npm start 스크립트 실행
CMD ["npm","start"]
