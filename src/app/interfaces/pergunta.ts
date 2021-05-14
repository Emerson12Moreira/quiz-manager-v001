import { Materia } from './materia';
export interface Pergunta {
  _id: string;
  currentState: boolean;
  user_asw: string;
  touched: boolean;
  viewed: boolean;
  totalTime: number;
  info: string;
  correct: boolean;
  quiz: string;
  descritor: string;
  status: number;
  texto: string;
  proposta: string;
  enunciado: string;
  materia: Materia;
  elapsedTime: number;
  alternativas: [
    { alt: string; resp: boolean, selected: boolean },
    { alt: string; resp: boolean, selected: boolean },
    { alt: string; resp: boolean, selected: boolean },
    { alt: string; resp: boolean, selected: boolean }
  ];
  peso: number;
}

/*
{
  _id: string; --
  touched: number; --
  viewed: boolean; --
  totalTime: number; --
  info: string; --
  correct: boolean; --
  quiz: string; --
  descritor: string; --
  text: string; --
  enun: string; --
  alt: string[]; --
  asw: string; ?
  user_asw: string; -
}
*/
