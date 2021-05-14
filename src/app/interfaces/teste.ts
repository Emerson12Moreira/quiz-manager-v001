import { Pergunta } from './pergunta';

export interface Teste {
  id: string;
  owner: string;
  name: string;
  touched: boolean;
  selected: boolean;
  criado_em: string;
  descricao: string;
  orientacoes: string;
  observacao: string;
  totalPerg: number;
  userInfo: {
    aluno: string;
    finalizada_em: number;
    iniciada_em: number;
    nota: number;
    tempo_gasto: number;
    turma: string;
  };
  perguntas: Array<Pergunta>;
}
