export enum PERFIL {
    GESTOR = 'Gestor',
    RESIDENTE_LOCAL = 'Residente Local',
    VISITANTE = 'Visitante'
}
export enum FAIXA_ETARIA {
    faixa1 = '18...24',
    faixa2 = '25...34',
    faixa3 = '35...44',
    faixa4 = '45...54',
    faixa5 = '55...64',
    faixa7 = '65+'
}
export enum ESCOLARIDADE {
    EFI = 'Ensino Fundamental incompleto',
    EFC = 'Ensino Fundamental completo',
    EMI = 'Ensino Médio incompleto',
    EMC = 'Ensino Médio completo',
    ESI = 'Ensino Superior incompleto',
    ESC = 'Ensino Superior completo',
    PGI = 'Pós-graduação incompleto',
    PGC = 'Pós-graduação completo',
    SF = 'Sem formação'
}
export enum CARGO {
    NENHUM = 'Nenhum',
    OPERACIONAL = 'Operacional (Analistas, Assistentes, Auxiliares, Estagiários e Trainees)',
    GERENCIAL = 'Tático (Coordenadores, Gerentes e Supervisores) ',
    ADMINISTRATIVO = 'Estratégico (CEOs, Presidentes e Diretores)'
}
export enum DADOS_RESPONDENTE{
    ESCOLARIDADE = 'Escolaridade',
    FAIXA_ETARIA = 'Faixa Etária',
    CARGO = 'Cargo',
    PERFIL = 'Perfil'
}