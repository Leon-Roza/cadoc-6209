from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, Numeric, ForeignKey
from app.core.database import Base
class Opeintra(Base):
    __tablename__ = "opeintra"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    tipo_registro = Column(String(1), default="1")
    codigo_instituicao = Column(String(10), nullable=False)
    tipo_operacao = Column(String(3))
    qtd_transferencias = Column(Numeric(15))
    valor_transferencias = Column(Numeric(18, 2))
    qtd_pagamentos = Column(Numeric(15))
    valor_pagamentos = Column(Numeric(18, 2))
    qtd_agendamentos = Column(Numeric(15))
    created_at = Column(DateTime, default=datetime.utcnow)

