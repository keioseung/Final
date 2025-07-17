from fastapi import APIRouter

router = APIRouter(prefix="/api/data", tags=["data"])

@router.get("")
def get_data_list():
    # TODO: 데이터 목록 반환
    return [] 