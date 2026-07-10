from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, Numeric, ForeignKey
from app.core.database import Base
class Conglome(Base):
    __tablename__ = "conglome"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    tipo_registro = Column(String(1), default="1")
    codigo_instituicao = Column(String(10), nullable=False)
    nome_instituicao = Column(String(255))
    cnpj = Column(String(18))
    possui_conglomerado = Column(String(1))
    tipo_conglomerado = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)

