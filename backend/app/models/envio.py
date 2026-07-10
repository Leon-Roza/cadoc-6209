from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, Text, ForeignKey
from app.core.database import Base
class Envio(Base):
    __tablename__ = "envios"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    arquivo = Column(String(255), nullable=False)
    status = Column(String(50), default="pendente")
    caminho_arquivo = Column(String(500))
    hash_arquivo = Column(String(128))
    protocolo_bcb = Column(String(100))
    observacao = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

