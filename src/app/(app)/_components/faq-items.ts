export const FAQ_ITEMS = [
  {
    question: "Como o IFRN Calc sabe minhas notas?",
    answer:
      "Você entra com sua conta do SUAP e ele lê o boletim do período atual. Não precisa digitar nada.",
  },
  {
    question: "Minha senha do SUAP fica com vocês?",
    answer:
      "Não. Você digita a senha na página do próprio SUAP. O IFRN Calc só recebe permissão pra ler seu boletim.",
  },
  {
    question: "Como a conta é feita?",
    answer:
      "Os bimestres têm pesos diferentes: 2, 2, 3 e 3 nas disciplinas anuais, e 2 e 3 nas semestrais. O IFRN Calc calcula quanto você precisa tirar nos que faltam pra média chegar a 60.",
  },
  {
    question: "E se eu não fechar 60?",
    answer:
      "Você faz a prova final, e a nota dela entra numa nova média, que também precisa chegar a 60. Na página da prova final você descobre quanto precisa tirar.",
    link: { href: "/prova-final", label: "Calcular a prova final" },
  },
  {
    question: "Saiu nota e ela não apareceu aqui. Por quê?",
    answer:
      "O IFRN Calc mostra o que está no SUAP. Se a nota não aparece, o professor ainda não lançou ou o IFRN Calc ainda não atualizou, o que pode levar um tempinho.",
  },
  {
    question: "Dá pra simular uma nota?",
    answer:
      "Sim. Edite a nota de um bimestre em aberto e o IFRN Calc recalcula quanto falta nos outros.",
  },
  {
    question: "Funciona pro meu curso?",
    answer: "Sim. Integrado, subsequente ou superior, em qualquer campus.",
  },
] as const
