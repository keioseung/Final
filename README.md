# AI 학습 플랫폼 (FastAPI + React)

이 프로젝트는 FastAPI(백엔드)와 React(프론트엔드)로 구성된 AI 학습 플랫폼입니다. 삼성닷컴 스타일의 세련된 UI/UX를 지향합니다.

## 폴더 구조

```
/backend   # FastAPI 백엔드
/frontend  # React 프론트엔드
```

## 실행 방법 (Codespaces 기준)

### 1. 백엔드(FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 프론트엔드(React)
```bash
cd frontend
npm install
npm start
```

### 3. 주요 기능
- 관리자/학습자 분리
- 데이터/퀴즈/프롬프트/기반내용 관리
- 프롬프트+기반내용 합치기 및 자동입력
- JWT 인증, 반응형 UI, 고급 디자인

---

## 개발 환경
- Python 3.9+
- Node.js 18+
- Codespaces 권장

---

## 문의/기여
이슈 또는 PR로 자유롭게 의견 주세요. 