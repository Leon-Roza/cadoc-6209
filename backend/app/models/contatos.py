from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, Date, ForeignKey
from app.core.database import Base
class Contatos(Base):
    __tablename__ = "contatos"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    data_base = Column(Date, nullable=False)
    tipo_registro = Column(String(1), default="1")
    codigo_instituicao = Column(String(10), nullable=False)
    tipo_canal = Column(String(50))
    qtd_total = Column(Integer)
    qtd_presencial = Column(Integer)
    qtd_remoto = Column(Integer)
    qtd_cidades_atendidas = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

