from datetime import datetime
from pydantic import BaseModel, EmailStr


class UsuarioCreate(BaseModel):
    nome: str
    email: str
    senha: str
    instituicao: str
    cnpj: str
    telefone: str | None = None


class UsuarioResponse(BaseModel):
    id: int
    nome: str
    email: str
    instituicao: str
    cnpj: str
    telefone: str | None
    ativo: bool
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: str
    senha: str
