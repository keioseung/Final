from fastapi import APIRouter

router = APIRouter(prefix="/api/prompt", tags=["prompt"])

@router.get("")
def get_prompt_list():
    # TODO: 프롬프트 목록 반환
    return [] 