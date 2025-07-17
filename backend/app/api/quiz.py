from fastapi import APIRouter

router = APIRouter(prefix="/api/quiz", tags=["quiz"])

@router.get("")
def get_quiz_list():
    # TODO: 퀴즈 목록 반환
    return [] 