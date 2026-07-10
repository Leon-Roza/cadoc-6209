from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date
from app.core.database import Base
class Instituicao(Base):
    __tablename__ = "instituicoes"
    id = Column(Integer, primary_key=True, index=True)
    cnpj = Column(String(18), unique=True, index=True, nullable=False)
    nome = Column(String(255), nullable=False)
    codigo_bcb = Column(String(10))
    segmento = Column(String(100))
    endereco = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)

