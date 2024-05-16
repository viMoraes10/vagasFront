export interface Job {
    id: number; // Chave primária
    title: string; // Título da vaga
    description: string; // Descrição detalhada da vaga
    requirements: string; // Requisitos necessários para a vaga
    isActive: boolean; // Status da vaga (ativa ou inativa)
}

export default Job;