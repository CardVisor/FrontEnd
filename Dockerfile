# 가져올 이미지를 정의
FROM node:14
# 경로 설정하기
WORKDIR /app
# 빌드된 파일들을 워킹 디렉토리에 복사
COPY frontend/build/ ./
# serve 패키지 설치
RUN install -g serve
# 3000번 포트 노출
EXPOSE 3000
# serve로 빌드된 파일 제공CMD ["serve", "-s", ".", "-l", "3000"]
