from datetime import date, datetime
from pydantic import BaseModel


class CadocBase(BaseModel):
    data_base: date
    codigo_instituicao: str


class ConglomeCreate(CadocBase):
    nome_instituicao: str | None = None
    cnpj: str | None = None
    possui_conglomerado: str | None = None
    tipo_conglomerado: str | None = None


class ConglomeResponse(ConglomeCreate):
    id: int
    usuario_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UsuremotCreate(CadocBase):
    qtd_usuarios_internet: float | None = None
    qtd_usuarios_mobile: float | None = None
    qtd_usuarios_telefone: float | None = None
    qtd_usuarios_correspondente: float | None = None
    qtd_transacoes_internet: float | None = None
    qtd_transacoes_mobile: float | None = None
    qtd_transacoes_telefone: float | None = None
    qtd_transacoes_correspondente: float | None = None


class UsuremotResponse(UsuremotCreate):
    id: int
    usuario_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class EstatcrtCreate(CadocBase):
    tipo_cartao: str | None = None
    bandeira: str | None = None
    qtd_emitidos: float | None = None
    qtd_ativas: float | None = None
    qtd_transacoes_credito: float | None = None
    valor_transacoes_credito: float | None = None
    qtd_transacoes_debito: float | None = None
    valor_transacoes_debito: float | None = None
    qtd_saque: float | None = None
    valor_saque: float | None = None


class EstatcrtResponse(EstatcrtCreate):
    id: int
    usuario_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class EstatatmCreate(CadocBase):
    tipo_local: str | None = None
    qtd_terminais: float | None = None
    qtd_transacoes: float | None = None
    valor_transacoes: float | None = None
    qtd_saques: float | None = None
    valor_saques: float | None = None
    qtd_consultas: float | None = None
    qtd_extratos: float | None = None


class EstatatmResponse(EstatatmCreate):
    id: int
    usuario_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class TransopaCreate(CadocBase):
    tipo_pagamento: str | None = None
    canal_acesso: str | None = None
    qtd_transacoes: float | None = None
    valor_transacoes: float | None = None
    qtd_transacoes_remoto: float | None = None
    valor_transacoes_remoto: float | None = None


class TransopaResponse(TransopaCreate):
    id: int
    usuario_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class OpeintraCreate(CadocBase):
    tipo_operacao: str | None = None
    qtd_transferencias: float | None = None
    valor_transferencias: float | None = None
    qtd_pagamentos: float | None = None
    valor_pagamentos: float | None = None
    qtd_agendamentos: float | None = None


class OpeintraResponse(OpeintraCreate):
    id: int
    usuario_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ContatosCreate(CadocBase):
    tipo_canal: str | None = None
    qtd_total: int | None = None
    qtd_presencial: int | None = None
    qtd_remoto: int | None = None
    qtd_cidades_atendidas: int | None = None


class ContatosResponse(ContatosCreate):
    id: int
    usuario_id: int
    created_at: datetime

    class Config:
        from_attributes = True
