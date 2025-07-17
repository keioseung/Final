from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, data, quiz, prompt, combine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(data.router)
app.include_router(quiz.router)
app.include_router(prompt.router)
app.include_router(combine.router)

@app.get("/api/ping")
def ping():
    return {"msg": "pong"} 