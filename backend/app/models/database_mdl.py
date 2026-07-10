from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, Numeric, ForeignKey
from app.core.database import Base
class DatabaseMdl(Base):
    __tablename__ = "database_mdl"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    tipo_registro = Column(String(1), default="1")
    codigo_instituicao = Column(String(10), nullable=False)
    nome_arquivo = Column(String(255))
    versao_leiaute = Column(String(20))
    data_geracao = Column(Date)
    qtd_registros = Column(Integer)
    hash_arquivo = Column(String(128))
    created_at = Column(DateTime, default=datetime.utcnow)

