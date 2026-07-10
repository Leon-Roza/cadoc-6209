from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, Numeric, ForeignKey
from app.core.database import Base
class Usuremot(Base):
    __tablename__ = "usuremot"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    tipo_registro = Column(String(1), default="1")
    codigo_instituicao = Column(String(10), nullable=False)
    qtd_usuarios_internet = Column(Numeric(10))
    qtd_usuarios_mobile = Column(Numeric(10))
    qtd_usuarios_telefone = Column(Numeric(10))
    qtd_usuarios_correspondente = Column(Numeric(10))
    qtd_transacoes_internet = Column(Numeric(15))
    qtd_transacoes_mobile = Column(Numeric(15))
    qtd_transacoes_telefone = Column(Numeric(15))
    qtd_transacoes_correspondente = Column(Numeric(15))
    created_at = Column(DateTime, default=datetime.utcnow)

