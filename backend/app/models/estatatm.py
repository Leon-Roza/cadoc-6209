from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, Numeric, ForeignKey
from app.core.database import Base
class Estatatm(Base):
    __tablename__ = "estatatm"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    tipo_registro = Column(String(1), default="1")
    codigo_instituicao = Column(String(10), nullable=False)
    tipo_local = Column(String(50))
    qtd_terminais = Column(Numeric(10))
    qtd_transacoes = Column(Numeric(15))
    valor_transacoes = Column(Numeric(18, 2))
    qtd_saques = Column(Numeric(15))
    valor_saques = Column(Numeric(18, 2))
    qtd_consultas = Column(Numeric(15))
    qtd_extratos = Column(Numeric(15))
    created_at = Column(DateTime, default=datetime.utcnow)

