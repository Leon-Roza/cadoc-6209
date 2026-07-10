import hashlib
import os
from datetime import date
from typing import Any

from sqlalchemy.orm import Session

from app.models.conglome import Conglome
from app.models.usuremot import Usuremot
from app.models.estatcrt import Estatcrt
from app.models.estatatm import Estatatm
from app.models.transopa import Transopa
from app.models.opeintra import Opeintra
from app.models.contatos import Contatos
from app.models.envio import Envio


def format_line(fields: list[Any], delimiter: str = "|") -> str:
    return delimiter.join(str(f) if f is not None else "" for f in fields) + "\n"


def gerar_conglome(db: Session, usuario_id: int, data_base: date, output_dir: str) -> str:
    registros = db.query(Conglome).filter(
        Conglome.usuario_id == usuario_id,
        Conglome.data_base == data_base,
    ).all()

    filename = f"CONGLOME_{data_base.strftime('%Y%m')}.txt"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        for reg in registros:
            line = format_line([
                "1",
                reg.codigo_instituicao,
                reg.nome_instituicao,
                reg.cnpj,
                reg.possui_conglomerado,
                reg.tipo_conglomerado,
            ])
            f.write(line)

    return filepath


def gerar_usuremot(db: Session, usuario_id: int, data_base: date, output_dir: str) -> str:
    registros = db.query(Usuremot).filter(
        Usuremot.usuario_id == usuario_id,
        Usuremot.data_base == data_base,
    ).all()

    filename = f"USUREMOT_{data_base.strftime('%Y%m')}.txt"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        for reg in registros:
            line = format_line([
                "1",
                reg.codigo_instituicao,
                reg.qtd_usuarios_internet,
                reg.qtd_usuarios_mobile,
                reg.qtd_usuarios_telefone,
                reg.qtd_usuarios_correspondente,
                reg.qtd_transacoes_internet,
                reg.qtd_transacoes_mobile,
                reg.qtd_transacoes_telefone,
                reg.qtd_transacoes_correspondente,
            ])
            f.write(line)

    return filepath


def gerar_estatcrt(db: Session, usuario_id: int, data_base: date, output_dir: str) -> str:
    registros = db.query(Estatcrt).filter(
        Estatcrt.usuario_id == usuario_id,
        Estatcrt.data_base == data_base,
    ).all()

    filename = f"ESTATCRT_{data_base.strftime('%Y%m')}.txt"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        for reg in registros:
            line = format_line([
                "1",
                reg.codigo_instituicao,
                reg.tipo_cartao,
                reg.bandeira,
                reg.qtd_emitidos,
                reg.qtd_ativas,
                reg.qtd_transacoes_credito,
                reg.valor_transacoes_credito,
                reg.qtd_transacoes_debito,
                reg.valor_transacoes_debito,
                reg.qtd_saque,
                reg.valor_saque,
            ])
            f.write(line)

    return filepath


def gerar_estatatm(db: Session, usuario_id: int, data_base: date, output_dir: str) -> str:
    registros = db.query(Estatatm).filter(
        Estatatm.usuario_id == usuario_id,
        Estatatm.data_base == data_base,
    ).all()

    filename = f"ESTATATM_{data_base.strftime('%Y%m')}.txt"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        for reg in registros:
            line = format_line([
                "1",
                reg.codigo_instituicao,
                reg.tipo_local,
                reg.qtd_terminais,
                reg.qtd_transacoes,
                reg.valor_transacoes,
                reg.qtd_saques,
                reg.valor_saques,
                reg.qtd_consultas,
                reg.qtd_extratos,
            ])
            f.write(line)

    return filepath


def gerar_transopa(db: Session, usuario_id: int, data_base: date, output_dir: str) -> str:
    registros = db.query(Transopa).filter(
        Transopa.usuario_id == usuario_id,
        Transopa.data_base == data_base,
    ).all()

    filename = f"TRANSOPA_{data_base.strftime('%Y%m')}.txt"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        for reg in registros:
            line = format_line([
                "1",
                reg.codigo_instituicao,
                reg.tipo_pagamento,
                reg.canal_acesso,
                reg.qtd_transacoes,
                reg.valor_transacoes,
                reg.qtd_transacoes_remoto,
                reg.valor_transacoes_remoto,
            ])
            f.write(line)

    return filepath


def gerar_opeintra(db: Session, usuario_id: int, data_base: date, output_dir: str) -> str:
    registros = db.query(Opeintra).filter(
        Opeintra.usuario_id == usuario_id,
        Opeintra.data_base == data_base,
    ).all()

    filename = f"OPEINTRA_{data_base.strftime('%Y%m')}.txt"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        for reg in registros:
            line = format_line([
                "1",
                reg.codigo_instituicao,
                reg.tipo_operacao,
                reg.qtd_transferencias,
                reg.valor_transferencias,
                reg.qtd_pagamentos,
                reg.valor_pagamentos,
                reg.qtd_agendamentos,
            ])
            f.write(line)

    return filepath


def gerar_contatos(db: Session, usuario_id: int, data_base: date, output_dir: str) -> str:
    registros = db.query(Contatos).filter(
        Contatos.usuario_id == usuario_id,
        Contatos.data_base == data_base,
    ).all()

    filename = f"CONTATOS_{data_base.strftime('%Y%m')}.txt"
    filepath = os.path.join(output_dir, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        for reg in registros:
            line = format_line([
                "1",
                reg.codigo_instituicao,
                reg.tipo_canal,
                reg.qtd_total,
                reg.qtd_presencial,
                reg.qtd_remoto,
                reg.qtd_cidades_atendidas,
            ])
            f.write(line)

    return filepath


def compute_file_hash(filepath: str) -> str:
    sha256_hash = hashlib.sha256()
    with open(filepath, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()


def gerar_todos_arquivos(db: Session, usuario_id: int, data_base: date, output_dir: str) -> list[dict]:
    os.makedirs(output_dir, exist_ok=True)
    arquivos_gerados = []

    geradores = [
        ("CONGLOME", gerar_conglome),
        ("USUREMOT", gerar_usuremot),
        ("ESTATCRT", gerar_estatcrt),
        ("ESTATATM", gerar_estatatm),
        ("TRANSOPA", gerar_transopa),
        ("OPEINTRA", gerar_opeintra),
        ("CONTATOS", gerar_contatos),
    ]

    for nome, gerador in geradores:
        try:
            filepath = gerador(db, usuario_id, data_base, output_dir)
            file_hash = compute_file_hash(filepath)
            filename = os.path.basename(filepath)

            envio = Envio(
                usuario_id=usuario_id,
                data_base=data_base,
                arquivo=filename,
                status="gerado",
                caminho_arquivo=filepath,
                hash_arquivo=file_hash,
            )
            db.add(envio)
            db.commit()

            arquivos_gerados.append({
                "arquivo": filename,
                "status": "gerado",
                "hash": file_hash,
                "caminho": filepath,
            })
        except Exception as e:
            arquivos_gerados.append({
                "arquivo": f"{nome}.txt",
                "status": "erro",
                "erro": str(e),
            })

    return arquivos_gerados
