from fastapi import APIRouter

router = APIRouter(prefix="/api/combine", tags=["combine"])

@router.post("")
def combine_prompt_and_base(prompt: str, base: str):
    # TODO: 프롬프트와 기반내용을 합쳐 반환
    return {"combined": f"{prompt}\n{base}"} 