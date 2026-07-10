import re
from datetime import date
from typing import Any


erros_validacao: list[str] = []


def limpar_erros():
    erros_validacao.clear()


def adicionar_erro(campo: str, msg: str):
    erros_validacao.append(f"{campo}: {msg}")


def obter_erros() -> list[str]:
    return erros_validacao


def validar_obrigatorio(valor: Any, campo: str, obrigatorio: bool = True):
    if obrigatorio and (valor is None or str(valor).strip() == ""):
        adicionar_erro(campo, "Campo obrigatório")


def validar_numerico(valor: Any, campo: str, permitir_negativo: bool = False):
    if valor is None or str(valor).strip() == "":
        return
    try:
        v = float(valor)
        if not permitir_negativo and v < 0:
            adicionar_erro(campo, "Não pode ser negativo")
    except (ValueError, TypeError):
        adicionar_erro(campo, "Deve ser um valor numérico")


def validar_cnpj(cnpj: str, campo: str = "cnpj"):
    if not cnpj:
        return
    nums = re.sub(r"\D", "", cnpj)
    if len(nums) != 14:
        adicionar_erro(campo, "CNPJ deve ter 14 dígitos")
        return
    if nums in [str(i) * 14 for i in range(10)]:
        adicionar_erro(campo, "CNPJ inválido (dígitos repetidos)")
        return
    for j in [5, 6]:
        resto = sum(int(nums[i]) * ((j - i) % 8 + 2) for i in range(j - 1)) % 11
        dig = 0 if resto < 2 else 11 - resto
        if int(nums[j - 1]) != dig:
            adicionar_erro(campo, "CNPJ inválido (dígito verificador)")
            return


def validar_data(valor: Any, campo: str):
    if valor is None or str(valor).strip() == "":
        return
    if isinstance(valor, date):
        return
    try:
        if isinstance(valor, str):
            partes = valor.split("-")
            if len(partes) == 3:
                date(int(partes[0]), int(partes[1]), int(partes[2]))
            else:
                adicionar_erro(campo, "Data deve estar no formato AAAA-MM-DD")
    except (ValueError, IndexError):
        adicionar_erro(campo, "Data inválida")


def validar_tamanho(valor: Any, campo: str, max_len: int):
    if valor is None:
        return
    if len(str(valor)) > max_len:
        adicionar_erro(campo, f"Deve ter no máximo {max_len} caracteres")


TABELAS_CANAL_ACESSO = [
    "001", "002", "003", "004", "005", "006", "007", "008", "009", "010",
]
TABELAS_TIPO_CARTAO = ["001", "002", "003"]
TABELAS_TIPO_PAGAMENTO = ["001", "002", "003", "004", "005", "006"]


def validar_tabela(valor: Any, campo: str, valores_validos: list[str]):
    if valor is None or str(valor).strip() == "":
        return
    if str(valor).strip() not in valores_validos:
        adicionar_erro(campo, f"Valor inválido. Valores aceitos: {', '.join(valores_validos)}")


def validar_conglome(dados: dict) -> list[str]:
    limpar_erros()
    validar_obrigatorio(dados.get("codigo_instituicao"), "codigo_instituicao")
    validar_obrigatorio(dados.get("data_base"), "data_base")
    validar_data(dados.get("data_base"), "data_base")
    if dados.get("cnpj"):
        validar_cnpj(dados["cnpj"])
    validar_tamanho(dados.get("nome_instituicao"), "nome_instituicao", 255)
    return obter_erros()


def validar_usuremot(dados: dict) -> list[str]:
    limpar_erros()
    validar_obrigatorio(dados.get("codigo_instituicao"), "codigo_instituicao")
    validar_obrigatorio(dados.get("data_base"), "data_base")
    validar_data(dados.get("data_base"), "data_base")
    for campo in ["qtd_usuarios_internet", "qtd_usuarios_mobile", "qtd_usuarios_telefone",
                   "qtd_usuarios_correspondente", "qtd_transacoes_internet",
                   "qtd_transacoes_mobile", "qtd_transacoes_telefone", "qtd_transacoes_correspondente"]:
        validar_numerico(dados.get(campo), campo)
    return obter_erros()


def validar_estatcrt(dados: dict) -> list[str]:
    limpar_erros()
    validar_obrigatorio(dados.get("codigo_instituicao"), "codigo_instituicao")
    validar_obrigatorio(dados.get("data_base"), "data_base")
    validar_data(dados.get("data_base"), "data_base")
    validar_tabela(dados.get("tipo_cartao"), "tipo_cartao", TABELAS_TIPO_CARTAO)
    for campo in ["qtd_emitidos", "qtd_ativas", "qtd_transacoes_credito", "valor_transacoes_credito",
                   "qtd_transacoes_debito", "valor_transacoes_debito", "qtd_saque", "valor_saque"]:
        validar_numerico(dados.get(campo), campo)
    return obter_erros()


def validar_estatatm(dados: dict) -> list[str]:
    limpar_erros()
    validar_obrigatorio(dados.get("codigo_instituicao"), "codigo_instituicao")
    validar_obrigatorio(dados.get("data_base"), "data_base")
    validar_data(dados.get("data_base"), "data_base")
    for campo in ["qtd_terminais", "qtd_transacoes", "valor_transacoes",
                   "qtd_saques", "valor_saques", "qtd_consultas", "qtd_extratos"]:
        validar_numerico(dados.get(campo), campo)
    return obter_erros()


def validar_transopa(dados: dict) -> list[str]:
    limpar_erros()
    validar_obrigatorio(dados.get("codigo_instituicao"), "codigo_instituicao")
    validar_obrigatorio(dados.get("data_base"), "data_base")
    validar_data(dados.get("data_base"), "data_base")
    validar_tabela(dados.get("tipo_pagamento"), "tipo_pagamento", TABELAS_TIPO_PAGAMENTO)
    for campo in ["qtd_transacoes", "valor_transacoes", "qtd_transacoes_remoto", "valor_transacoes_remoto"]:
        validar_numerico(dados.get(campo), campo)
    return obter_erros()


def validar_opeintra(dados: dict) -> list[str]:
    limpar_erros()
    validar_obrigatorio(dados.get("codigo_instituicao"), "codigo_instituicao")
    validar_obrigatorio(dados.get("data_base"), "data_base")
    validar_data(dados.get("data_base"), "data_base")
    for campo in ["qtd_transferencias", "valor_transferencias", "qtd_pagamentos",
                   "valor_pagamentos", "qtd_agendamentos"]:
        validar_numerico(dados.get(campo), campo)
    return obter_erros()


def validar_contatos(dados: dict) -> list[str]:
    limpar_erros()
    validar_obrigatorio(dados.get("codigo_instituicao"), "codigo_instituicao")
    validar_obrigatorio(dados.get("data_base"), "data_base")
    validar_data(dados.get("data_base"), "data_base")
    for campo in ["qtd_total", "qtd_presencial", "qtd_remoto", "qtd_cidades_atendidas"]:
        validar_numerico(dados.get(campo), campo)
    return obter_erros()


VALIDATORS = {
    "conglome": validar_conglome,
    "usuremot": validar_usuremot,
    "estatcrt": validar_estatcrt,
    "estatatm": validar_estatatm,
    "transopa": validar_transopa,
    "opeintra": validar_opeintra,
    "contatos": validar_contatos,
}
