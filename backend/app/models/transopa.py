from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, Numeric, ForeignKey
from app.core.database import Base
class Transopa(Base):
    __tablename__ = "transopa"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    tipo_registro = Column(String(1), default="1")
    codigo_instituicao = Column(String(10), nullable=False)
    tipo_pagamento = Column(String(3))
    canal_acesso = Column(String(3))
    qtd_transacoes = Column(Numeric(15))
    valor_transacoes = Column(Numeric(18, 2))
    qtd_transacoes_remoto = Column(Numeric(15))
    valor_transacoes_remoto = Column(Numeric(18, 2))
    created_at = Column(DateTime, default=datetime.utcnow)

