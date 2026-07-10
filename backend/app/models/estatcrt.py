from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, Numeric, ForeignKey
from app.core.database import Base
class Estatcrt(Base):
    __tablename__ = "estatcrt"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    tipo_registro = Column(String(1), default="1")
    codigo_instituicao = Column(String(10), nullable=False)
    tipo_cartao = Column(String(3))
    bandeira = Column(String(50))
    qtd_emitidos = Column(Numeric(15))
    qtd_ativas = Column(Numeric(15))
    qtd_transacoes_credito = Column(Numeric(15))
    valor_transacoes_credito = Column(Numeric(18, 2))
    qtd_transacoes_debito = Column(Numeric(15))
    valor_transacoes_debito = Column(Numeric(18, 2))
    qtd_saque = Column(Numeric(15))
    valor_saque = Column(Numeric(18, 2))
    created_at = Column(DateTime, default=datetime.utcnow)

