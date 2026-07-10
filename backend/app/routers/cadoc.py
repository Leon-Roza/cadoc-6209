import os
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.usuario import Usuario
from app.models.envio import Envio
from app.schemas.cadoc_schemas import (
    ConglomeCreate, ConglomeResponse,
    UsuremotCreate, UsuremotResponse,
    EstatcrtCreate, EstatcrtResponse,
    EstatatmCreate, EstatatmResponse,
    TransopaCreate, TransopaResponse,
    OpeintraCreate, OpeintraResponse,
    ContatosCreate, ContatosResponse,
)
from app.models.conglome import Conglome
from app.models.usuremot import Usuremot
from app.models.estatcrt import Estatcrt
from app.models.estatatm import Estatatm
from app.models.transopa import Transopa
from app.models.opeintra import Opeintra
from app.models.contatos import Contatos
from app.services.gerador_arquivo import gerar_todos_arquivos
from app.services.validacao import VALIDATORS, obter_erros

router = APIRouter(prefix="/api/cadoc", tags=["cadoc"])

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "arquivos_gerados")


def get_model_map():
    return {
        "conglome": (Conglome, ConglomeCreate, ConglomeResponse),
        "usuremot": (Usuremot, UsuremotCreate, UsuremotResponse),
        "estatcrt": (Estatcrt, EstatcrtCreate, EstatcrtResponse),
        "estatatm": (Estatatm, EstatatmCreate, EstatatmResponse),
        "transopa": (Transopa, TransopaCreate, TransopaResponse),
        "opeintra": (Opeintra, OpeintraCreate, OpeintraResponse),
        "contatos": (Contatos, ContatosCreate, ContatosResponse),
    }


@router.post("/{tabela}")
def criar_registro(
    tabela: str,
    dados: dict,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    model_map = get_model_map()
    if tabela not in model_map:
        raise HTTPException(status_code=404, detail="Tabela not found")

    dados = dict(dados)
    if "data_base" in dados and isinstance(dados["data_base"], str):
        partes = dados["data_base"].split("-")
        if len(partes) == 3:
            dados["data_base"] = date(int(partes[0]), int(partes[1]), int(partes[2]))

    if tabela in VALIDATORS:
        erros = VALIDATORS[tabela](dados)
        if erros:
            raise HTTPException(status_code=422, detail={"erros": erros, "mensagem": "Dados inválidos conforme leiaute BACEN"})

    model_cls, _, _ = model_map[tabela]
    registro = model_cls(usuario_id=current_user.id, **dados)
    db.add(registro)
    db.commit()
    db.refresh(registro)
    return registro


@router.get("/{tabela}")
def listar_registros(
    tabela: str,
    data_base: str = Query(None),
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    model_map = get_model_map()
    if tabela not in model_map:
        raise HTTPException(status_code=404, detail="Tabela not found")

    model_cls, _, _ = model_map[tabela]
    query = db.query(model_cls).filter(model_cls.usuario_id == current_user.id)

    if data_base:
        query = query.filter(model_cls.data_base == date.fromisoformat(data_base))

    return query.order_by(model_cls.id.desc()).all()


@router.post("/gerar/{ano}/{mes}")
def gerar_arquivos(
    ano: int,
    mes: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    data_base = date(ano, mes, 1)
    output_dir = os.path.join(OUTPUT_DIR, str(current_user.id), f"{ano}{mes:02d}")
    resultado = gerar_todos_arquivos(db, current_user.id, data_base, output_dir)
    return {"message": "Files generated", "arquivos": resultado}


@router.get("/envios/listar")
def listar_envios(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    envios = db.query(Envio).filter(
        Envio.usuario_id == current_user.id
    ).order_by(Envio.created_at.desc()).limit(100).all()
    return envios


@router.post("/validar/{tabela}")
def validar_dados(
    tabela: str,
    dados: dict,
    current_user: Usuario = Depends(get_current_user),
):
    if tabela not in VALIDATORS:
        raise HTTPException(status_code=404, detail="Tabela not found")
    erros = VALIDATORS[tabela](dados)
    return {"valido": len(erros) == 0, "erros": erros}


@router.get("/dashboard/resumo")
def dashboard_resumo(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    from app.models.conglome import Conglome
    from app.models.usuremot import Usuremot
    from app.models.estatcrt import Estatcrt
    from app.models.estatatm import Estatatm
    from app.models.transopa import Transopa
    from app.models.opeintra import Opeintra
    from app.models.contatos import Contatos

    tabelas = {
        "conglome": Conglome,
        "usuremot": Usuremot,
        "estatcrt": Estatcrt,
        "estatatm": Estatatm,
        "transopa": Transopa,
        "opeintra": Opeintra,
        "contatos": Contatos,
    }

    resumo = {}
    for nome, model in tabelas.items():
        qtd = db.query(model).filter(model.usuario_id == current_user.id).count()
        ultimo = db.query(model).filter(model.usuario_id == current_user.id).order_by(model.id.desc()).first()
        resumo[nome] = {
            "qtd_registros": qtd,
            "ultima_data_base": str(ultimo.data_base) if ultimo else None,
            "ultimo_id": ultimo.id if ultimo else None,
        }

    envios_count = db.query(Envio).filter(
        Envio.usuario_id == current_user.id
    ).count()

    envios_por_status = {}
    for status in ["pendente", "gerado", "erro"]:
        envios_por_status[status] = db.query(Envio).filter(
            Envio.usuario_id == current_user.id,
            Envio.status == status,
        ).count()

    return {
        "tabelas": resumo,
        "total_envios": envios_count,
        "envios_por_status": envios_por_status,
    }
