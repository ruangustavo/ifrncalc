# Frequência e faltas no IFRN

Pesquisa para a página pública `/faltas` e para conferir `src/utils/attendance.ts`.

- **Data da consulta:** 20/11/2026.
- **Método:** PDFs do IFRN baixados e convertidos com `pdftotext -layout`. Trechos do IFRN copiados do texto extraído. As leis federais foram lidas no planalto.gov.br via fetch (o `curl` direto foi recusado pelo servidor). As páginas do Planalto têm encoding quebrado, então a acentuação dos trechos federais foi normalizada. Em leis antigas, a grafia original ("êsses", "fôrça") foi mantida.

## Documentos usados

| Documento | Versão / data | Link |
| --- | --- | --- |
| Organização Didática do IFRN 2025 ("OD 2025") | Deliberação nº 61/2025-CONSEPEX e Resolução nº 85/2025-CONSUP, de 21/08/2025, atualizada pela Resolução nº 110/2025-CONSUP, de 29/10/2025. Capa "Ago./2025". Cópia gerada em 10/11/2025 | https://portal.ifrn.edu.br/documents/24469/Oganiza%C3%A7%C3%A3o_Did%C3%A1tica_2025_-_Resolu%C3%A7%C3%A3o_110-2025.pdf |
| Organização Didática do IFRN 2024 ("OD 2024") | Deliberação 9/2024-CONSEPEX, de 20/03/2024, e Resolução 26/2024-CONSUP, de 12/04/2024. "Versão aprovada pelo CONSUP, em 22/03/2024". No índice, publicada em 19/11/2024 | https://portal.ifrn.edu.br/documents/17567/Organiza%C3%A7%C3%A3o_Did%C3%A1tica_do_IFRN_0xctych.pdf |
| Índice de normativos do IFRN | consultado em 20/11/2026 | https://portal.ifrn.edu.br/institucional/ensino/documentos-e-normativos/ |
| LDB, Lei nº 9.394, de 20/12/1996 (texto compilado) | consultado em 20/11/2026 | https://www.planalto.gov.br/ccivil_03/leis/l9394.htm |
| Decreto-Lei nº 1.044, de 21/10/1969 | idem | https://www.planalto.gov.br/ccivil_03/decreto-lei/del1044.htm |
| Lei nº 6.202, de 17/04/1975 | idem | https://www.planalto.gov.br/ccivil_03/leis/1970-1979/l6202.htm |
| Lei nº 4.375, de 17/08/1964 (Lei do Serviço Militar) | idem | https://www.planalto.gov.br/ccivil_03/leis/l4375.htm |
| Decreto nº 57.654, de 20/01/1966 | idem | https://www.planalto.gov.br/ccivil_03/decreto/d57654.htm |
| SUAP API, OpenAPI spec (`info.version` "1.0.0") | baixada em 20/11/2026 | https://suap.ifrn.edu.br/api/openapi.json |

### Qual OD vale para cada estudante

OD 2025, Art. 430:

> "§ 1º. Estarão submetidos às normas desta Organização Didática todos os estudantes que ingressarem no IFRN a partir do período letivo 2025.2 e aqueles cujo curso teve novas Diretrizes Orientadoras implementadas a partir de 2025.1.
> § 2º. Os estudantes ingressantes no IFRN entre o período letivo 2012.1 e 2024.2 e cujos cursos seguem Diretrizes Orientadoras aprovadas até 2024.1 são regidos pela Organização Didática aprovada pela Resolução nº 26/2024-CONSUP/IFRN, de 12/04/2024."

Hoje, a maioria dos alunos ainda está sob a OD 2024. **As regras de frequência são iguais nas duas versões**, com a numeração deslocada: OD 2025 Art. 333 = OD 2024 Art. 258, Art. 339–341 = Art. 263–265 e Art. 323 = Art. 249. As únicas diferenças são no atendimento domiciliar (ver pergunta 3). Este documento cita a OD 2025 e põe o artigo correspondente da OD 2024 entre colchetes.

---

## Respostas curtas

1. **Frequência mínima:** 75% da **carga horária total das disciplinas cursadas** no período, "independentemente da média final", "em todos os cursos ofertados no IFRN". O texto define a regra sobre o conjunto das disciplinas, não sobre cada uma, e vale igual para integrado, subsequente, graduação, PROEJA e FIC. Fonte: OD 2025, Art. 333, caput [OD 2024, Art. 258] ([PDF, p. 70](https://portal.ifrn.edu.br/documents/24469/Oganiza%C3%A7%C3%A3o_Did%C3%A1tica_2025_-_Resolu%C3%A7%C3%A3o_110-2025.pdf#page=70)). Na educação básica, a LDB (Lei 9.394/96, Art. 24, VI) exige a mesma coisa: 75% "do total de horas letivas".
2. **Reprovação por falta:** no regime seriado ou modular (integrado, subsequente, PROEJA Técnico), quem reprova por falta é **reprovado na série/módulo inteiro** (OD 2025, Art. 340, I [OD 2024, Art. 264, I]). No regime de crédito (tecnologia, engenharias, licenciaturas), é **reprovado no período** e precisa cursar de novo "todas as disciplinas objeto de reprovação" (Art. 341 [265]). Também perde a avaliação final, que só cabe a quem "não for reprovado por falta" (Art. 334 §1º, 335 §1º, 336 §1º [259–261]). ([PDF, p. 70–72](https://portal.ifrn.edu.br/documents/24469/Oganiza%C3%A7%C3%A3o_Did%C3%A1tica_2025_-_Resolu%C3%A7%C3%A3o_110-2025.pdf#page=72))
3. **Justificar x abonar:** a OD usa "abonadas" só para o **atendimento domiciliar**, que vale para afastamento de mais de 15 dias por doença infectocontagiosa, tratamento de saúde, acompanhamento de familiar de 1º grau ou licença à gestante (Art. 323, caput, I–IV e §4º [249]). A **justificativa** é outro mecanismo. Ela cabe quando a frequência fica abaixo de 75%, é feita "em cada disciplina" e exige documento entregue à Diretoria Acadêmica em até 2 dias úteis após o retorno. Os motivos são atestado médico, falta de transporte (inter)municipal ou plantão militar/de trabalho (Art. 333, parágrafo único [258]). A lei federal ainda abona faltas de convocados em exercícios ou manobras e de reservistas no Dia do Reservista (Lei 4.375/64, Art. 60 §4º) e garante prestação alternativa por motivo religioso (LDB, Art. 7º-A).
4. **SUAP:** **não confirmado.** O código do SUAP não é público, e a OpenAPI spec não documenta o denominador nem a escala de `percentual_carga_horaria_frequentada` (tipo `number`). A spec mostra, porém, um endpoint separado de frequência do período (`/api/ensino/frequencia-periodo-letivo/{ano}/{periodo}/`) com `total_aulas`, `total_faltas`, `total_abonos` e `percentual_frequencia` (tipo `integer`, o que sugere escala 0–100).
5. **Dependência:** existe para quem reprova em até 3 disciplinas no regime seriado ou modular, **desde que não tenha reprovado por falta** (Art. 339, I e III [263]). Quem reprova por falta é reprovado na série e não tem dependência (Art. 340 [264]). "Progressão parcial" não aparece na OD.

---

## 1. Frequência mínima e base de cálculo

### Regra geral

OD 2025, Art. 333, caput ([p. 70](https://portal.ifrn.edu.br/documents/24469/Oganiza%C3%A7%C3%A3o_Did%C3%A1tica_2025_-_Resolu%C3%A7%C3%A3o_110-2025.pdf#page=70)). A OD 2024, Art. 258, tem texto idêntico:

> "Art. 333. Em todos os cursos ofertados no IFRN, será considerado reprovado por falta o(a) estudante que não obtiver frequência mínima de 75% (setenta e cinco por cento) da carga horária total das disciplinas cursadas, independentemente da média final."

Leitura do texto:

- **"Em todos os cursos ofertados no IFRN"**: a OD não tem regra de frequência diferente por tipo de curso. Busquei "frequência mínima", "reprovado por falta" e "75%" no texto inteiro, e o único limiar é este.
- **"da carga horária total das disciplinas cursadas"**: o limiar é aplicado à soma da carga horária de todas as disciplinas, não a cada disciplina.
- O resto da OD é coerente com essa leitura. "Reprovado por falta" é tratado como situação do **estudante na série/período**, separada da reprovação em disciplinas:
  - Art. 340: "será considerado reprovado na série ou módulo o(a) estudante que: I. for reprovado por falta (ausência); ou II. for reprovado em quatro (4) ou mais disciplinas."
  - Art. 341: "Nos cursos com regime de créditos, será considerado reprovado no período o(a) estudante que for reprovado por falta […]".
  - Os artigos de aprovação em disciplina (Art. 334–336, 338) põem "não for reprovado por falta" como pré-condição, ao lado da média da disciplina.
- O parágrafo único fala em justificar "as ausências em cada disciplina". Isso descreve onde a justificativa é registrada (o diário de cada disciplina), não cria um mínimo por disciplina.

A OD não traz um exemplo numérico nem diz literalmente "não se aplica por disciplina". A conclusão "global" vem da redação do caput e dos Art. 340–341, não de uma frase explícita. Ver "Não confirmado".

### Por tipo de curso

| Tipo | Regime (OD 2025) | Mínimo | Consequência da reprovação por falta |
| --- | --- | --- | --- |
| Técnico integrado regular | "regime seriado anual" (Art. 42, caput) | 75% da CH total (Art. 333) | Reprovado na série (Art. 340, I) |
| Técnico integrado EJA (PROEJA Técnico) | "regime seriado semestral, com organização em bimestres ou com organização em blocos" (Art. 58) | 75% da CH total (Art. 333) | Reprovado na série (Art. 340, I) |
| Técnico subsequente | "regime seriado semestral, com organização em bimestres ou com organização em blocos" (Art. 72) | 75% da CH total (Art. 333) | Reprovado na série (Art. 340, I) |
| Superior de tecnologia | "regime de crédito por disciplina" (Art. 86) | 75% da CH total (Art. 333) | Reprovado no período (Art. 341) |
| Engenharias | "regime de crédito com período semestral" (Art. 104) | idem | idem (Art. 341) |
| Licenciaturas em educação básica | "regime de crédito, com período semestral" (Art. 115) | idem | idem (Art. 341) |
| 2ª licenciatura / licenciatura em Educação Profissional | "regime seriado semestral" (Art. 121, Art. 130) | idem | Reprovado na série (Art. 340, I) |
| FIC / PROEJA FIC | "regime modular ou regime seriado semestral" (Art. 162; Art. 176) | idem | Reprovado no módulo/série (Art. 340, I) |

EJA/PROEJA não têm regra de frequência própria na OD. A única particularidade é que até 50% da carga horária de uma disciplina e 40% da carga horária total podem ser "EJA Mediada" (atividades não presenciais retomadas em momento presencial) (Art. 59, §§ 1º–2º). A OD não diz como essa carga horária entra na frequência.

### Legislação federal

LDB, Art. 24, caput e inciso VI (educação básica, ou seja, cursos técnicos de nível médio):

> "A educação básica, nos níveis fundamental e médio, será organizada de acordo com as seguintes regras comuns: […] VI - o controle de frequência fica a cargo da escola, conforme o disposto no seu regimento e nas normas do respectivo sistema de ensino, exigida a frequência mínima de setenta e cinco por cento do total de horas letivas para aprovação;"

LDB, Art. 47, § 3º (educação superior):

> "É obrigatória a frequência de alunos e professores, salvo nos programas de educação a distância."

A LDB não fixa percentual para a graduação. Os 75% da graduação no IFRN vêm da própria OD (Art. 333, "em todos os cursos"). Os Art. 36-A a 36-D (educação profissional técnica) e 37–38 (EJA) da LDB não falam de frequência.

---

## 2. Consequências da reprovação por falta

### Perde a avaliação final

O direito à avaliação final está sempre condicionado a não ter reprovado por falta. OD 2025, Art. 334, § 1º (regime de crédito ou seriado, bimestral, semestral):

> "§ 1º. O(a) estudante que não for reprovado por falta e obtiver MD igual ou superior a 20 (vinte) e inferior a 60 (sessenta) terá direito a submeter-se a uma avaliação final em cada disciplina […]"

O texto se repete no Art. 335, § 1º (seriado anual, que é o integrado) e no Art. 336, § 1º (blocos). Na OD 2024, correspondem aos Art. 259–261.

### Regime seriado ou modular: reprova a série inteira

OD 2025, Art. 340 [OD 2024, Art. 264] ([p. 72](https://portal.ifrn.edu.br/documents/24469/Oganiza%C3%A7%C3%A3o_Did%C3%A1tica_2025_-_Resolu%C3%A7%C3%A3o_110-2025.pdf#page=72)):

> "Art. 340. Nos cursos com regime seriado ou modular, será considerado reprovado na série ou módulo o(a) estudante que:
> I. for reprovado por falta (ausência); ou
> II. for reprovado em quatro (4) ou mais disciplinas.
> Parágrafo único. Em qualquer dos casos de reprovação, o(a) estudante deverá cursar, no período letivo subsequente, todas as disciplinas objeto de reprovação, de acordo com as condições operacionais de oferta."

No integrado, então, a reprovação por falta reprova a **série**, não só uma disciplina.

### Regime de crédito: reprova no período

OD 2025, Art. 341 [OD 2024, Art. 265]:

> "Art. 341. Nos cursos com regime de créditos, será considerado reprovado no período o(a) estudante que for reprovado por falta, o qual deverá cursar todas as disciplinas objeto de reprovação."

A OD não diz se, no regime de crédito, "disciplinas objeto de reprovação" significa todas as disciplinas do período ou só algumas.

### Suspensão conta como falta

OD 2025, Art. 418:

> "Em caso de suspensão, será considerada ausência às atividades da instituição, para todos os efeitos, o período em que o(a) estudante permanecer afastado."

---

## 3. Justificar x abonar, atendimento domiciliar e casos especiais

### Justificativa de ausências (OD)

OD 2025, Art. 333, parágrafo único [OD 2024, Art. 258, parágrafo único, idêntico]:

> "Parágrafo único. Caso o(a) estudante obtenha frequência inferior a 75%, poderá ser realizada a justificativa das ausências em cada disciplina, desde que haja sido apresentada documentação comprobatória à Diretoria Acadêmica, no prazo de até dois (2) dias úteis após o retorno do(a) estudante às atividades acadêmicas, pelos seguintes motivos:
> I. tratamento de saúde, comprovado por meio de atestado médico;
> II. ausência de transporte (inter)municipal, comprovada por meio de declaração do órgão competente da prefeitura; ou
> III. plantão militar ou de trabalho, comprovado por meio de declaração do chefe imediato."

- **Prazo:** até 2 dias úteis depois de voltar às aulas.
- **Onde:** Diretoria Acadêmica.
- **Quando se aplica:** o texto diz "caso o(a) estudante obtenha frequência inferior a 75%". O documento, porém, precisa ter sido apresentado no prazo de 2 dias úteis após cada retorno. Na prática, é preciso entregar o comprovante a cada ausência, sem esperar a frequência cair.
- **Efeito:** a OD não diz se a falta justificada sai da contagem, se passa a contar como presença ou se apenas permite aprovação abaixo de 75%. Ver "Não confirmado".

Direito correlato, no rol de direitos do estudante (OD 2025, Art. 407, incisos XVIII e XIX):

> "XVIII. justificar a ausência a atividades escolares, obedecendo às normas estabelecidas pela Organização Didática;
> XIX. realizar atividades escolares no caso de haver faltado às aulas e ter requerimento deferido pela Diretoria Acadêmica;"

Reposição de **avaliação** perdida, que não é a mesma coisa que justificar a falta (OD 2025, Art. 330, § 1º): requerimento à Diretoria Acadêmica "no prazo de até dois (2) dias úteis após retornar às atividades acadêmicas", pelos mesmos três motivos. O § 2º diz que outros motivos são "analisados pela Coordenação de Curso em conjunto com o(a) professor(a) da disciplina".

### Abono: atendimento domiciliar (OD)

OD 2025, Art. 323 [OD 2024, Art. 249] ([p. 68](https://portal.ifrn.edu.br/documents/24469/Oganiza%C3%A7%C3%A3o_Did%C3%A1tica_2025_-_Resolu%C3%A7%C3%A3o_110-2025.pdf#page=68)):

> "Art. 323. Terá direito ao atendimento domiciliar, o(a) estudante que necessitar ausentar-se das aulas ou dos momentos presenciais (no caso da educação a distância) por um período superior a 15 (quinze) dias, nos seguintes casos:
> I. ser portador de doença infectocontagiosa;
> II. necessitar de tratamento de saúde com o afastamento comprovado;
> III. necessitar acompanhar familiares em primeiro grau com problemas de saúde e ficar comprovada a necessidade de assistência intensiva, com o parecer do serviço social do campus;
> IV. licença à gestante, a contar da data requerida.
> § 1º. O atendimento domiciliar será efetivado nos termos da legislação vigente mediante laudo médico, visado pelo setor médico do campus do IFRN.
> § 2º. Nos casos das alíneas I a III, o tempo de atendimento domiciliar poderá ser de 60 (sessenta) dias, em requerimento inicial, e ampliado até 120 (cento e vinte) dias, mediante novo requerimento e após avaliação por equipe médica do IFRN.
> § 3º. No caso da alínea IV, o tempo de atendimento domiciliar deverá ser de até 120 (cento e vinte) dias, conforme legislação própria.
> § 4º. O(a) estudante terá suas ausências registradas e abonadas durante o período em que estiver em atendimento domiciliar.
> § 5º. O(a) estudante poderá ter um prazo diferenciado para cumprimento das atividades durante o período em que estiver em atendimento domiciliar.
> § 6º. Em qualquer dos casos previstos, é assegurado o direito à realização dos exames finais."

Diferenças na OD 2024 (Art. 249): o § 1º diz "mediante atestado médico, visado pelo setor médico do campus do IFRN", sem "nos termos da legislação vigente" e com "atestado" no lugar de "laudo". A OD 2024 não tem o § 6º. A Lei 6.202/75 (abaixo) já garante os exames finais à gestante.

Como pedir (OD 2025, Art. 324):

> "I. preencher requerimento e anexar o atestado médico e/ou parecer do serviço social;
> II. encaminhar o processo à Diretoria Acadêmica à qual o(a) estudante está vinculado; e
> III. responsabilizar-se por recolher e devolver as atividades elaboradas pelos professores, com periodicidade máxima de uma semana."

O Art. 325, parágrafo único, diz que "o fluxo processual para atendimento ao discente deverá ser estabelecido internamente em cada campus". A OD não fixa prazo para o pedido de atendimento domiciliar.

**Resumo da diferença.** Abono (atendimento domiciliar): a ausência é "registrada e abonada" (§ 4º) e o aluno faz atividades em casa. Justificativa (Art. 333, parágrafo único): vale para faltas avulsas pelos três motivos listados, com comprovante em 2 dias úteis, e a OD não define o efeito na contagem.

### Legislação federal

**Decreto-Lei 1.044/69** (exercícios domiciliares por condição de saúde):

> "Art. 1º São considerados merecedores de tratamento excepcional os alunos de qualquer nível de ensino portadores de afecções congênitas ou adquiridas, infecções, traumatismo ou outras condições mórbidas determinando distúrbios agudos ou agudizados, caracterizados por: a) incapacidade física relativa, incompatível com a frequência aos trabalhos escolares; desde que se verifique a conservação das condições intelectuais e emocionais necessárias para o prosseguimento da atividade escolar em novos moldes; b) ocorrência isolada ou esporádica; c) duração que não ultrapasse o máximo ainda admissível, em cada caso, para a continuidade do processo pedagógico de aprendizado […]"
>
> "Art. 2º Atribuir a êsses estudantes, como compensação da ausência às aulas, exercício domiciliares com acompanhamento da escola, sempre que compatíveis com o seu estado de saúde e as possibilidades do estabelecimento."
>
> "Art. 3º Dependerá o regime de exceção neste Decreto-lei estabelecido, de laudo médico elaborado por autoridade oficial do sistema educacional."

**Lei 6.202/75** (estudante gestante). Art. 1º: "A partir do oitavo mês de gestação e durante três meses a estudante em estado de gravidez" fica assistida pelo regime de exercícios domiciliares do Decreto-Lei 1.044/69. Pelo parágrafo único, o início e o fim do período são definidos por atestado médico apresentado à direção da escola. O Art. 2º permite estender o período "em casos excepcionais devidamente comprovados mediante atestado médico". O parágrafo único do Art. 2º diz: "Em qualquer caso, é assegurado às estudantes em estado de gravidez o direito à prestação dos exames finais." (Leitura via fetch, que devolveu os Art. 1º e 2º em trechos; os trechos entre aspas são literais.)

**Lei 4.375/64, Art. 60, § 4º** (serviço militar):

> "§ 4º Todo convocado matriculado em órgão de Formação de Reserva que seja obrigado a faltar a suas atividades civis, por fôrça de exercício ou manobras, ou reservista que seja chamado, para fins de exercício de apresentação das reservas ou cerimônia cívica, do Dia do Reservista, terá suas faltas abonadas para todos os efeitos. (Redação dada pelo Decreto-lei nº 715, de 1969)"

**Decreto 57.654/66, Art. 195, § 4º** (regulamento da Lei do Serviço Militar):

> "Todo convocado matriculado em órgão de Formação de Reserva que seja obrigado a faltar às suas atividades civis, por fôrça de exercícios ou manobras, terá as suas faltas abonadas para todos os efeitos."

O mesmo parágrafo, aqui parafraseado, manda o comandante do órgão de formação avisar a entidade civil antes dos exercícios e depois confirmar a presença, para que as faltas sejam abonadas.

**LDB, Art. 7º-A** (guarda religiosa, incluído pela Lei 13.796/2019):

> "Ao aluno regularmente matriculado em instituição de ensino pública ou privada, de qualquer nível, é assegurado, no exercício da liberdade de consciência e de crença, o direito de, mediante prévio e motivado requerimento, ausentar-se de prova ou de aula marcada para dia em que, segundo os preceitos de sua religião, seja vedado o exercício de tais atividades, devendo-se-lhe atribuir, a critério da instituição e sem custos para o aluno, uma das seguintes prestações alternativas […]: I - prova ou aula de reposição, conforme o caso, a ser realizada em data alternativa, no turno de estudo do aluno ou em outro horário agendado com sua anuência expressa; II - trabalho escrito ou outra modalidade de atividade de pesquisa, com tema, objetivo e data de entrega definidos pela instituição de ensino."
>
> "§ 2º O cumprimento das formas de prestação alternativa de que trata este artigo substituirá a obrigação original para todos os efeitos, inclusive regularização do registro de frequência."

### O que a OD não cobre

- A OD **não cita** nominalmente o Decreto-Lei 1.044/69, a Lei 6.202/75, a Lei 4.375/64 nem o Decreto 57.654/66. Só remete a "legislação vigente" (Art. 323 § 1º) e "legislação própria" (Art. 323 § 3º). Elas entram aqui por serem a base federal desses casos, não por citação expressa.
- **Serviço militar na OD** aparece como plantão militar (justificativa, Art. 333 parágrafo único, III) e como convocação para o serviço militar obrigatório, que é motivo de trancamento compulsório (Art. 299 § 1º, I) e justifica não frequentar os 10 primeiros dias úteis (Art. 289 § 1º, I).
- **Atividades representando o IFRN** (jogos, eventos, olimpíadas): a OD não traz regra de abono ou justificativa para elas. O Art. 15, IX, só diz que eventos intercampus podem ser "contabilizados como atividades acadêmicas e considerados como dias letivos". Isso trata do calendário, não da frequência individual.

---

## 4. Como o SUAP calcula o percentual

### O que é primário

- **Registro:** a frequência é lançada pelo professor no diário de classe do SUAP. OD 2025, Art. 266, § 1º (incluído pela Res. 110/2025): "O registro de frequência […] deverão ser feitos pelo(s) docente(s) da disciplina no diário de classe, por meio do SUAP." § 2º: "O preenchimento da frequência diária dos(as) estudantes deverá ser realizado e confirmado pelo(a) docente em prazo não superior a dois dias úteis após o término de cada mês." Ou seja, os números do SUAP podem ficar até cerca de um mês atrasados em relação às aulas.
- **Código-fonte:** o repositório principal do SUAP **não é público**. No GitLab do IFRN, a API (`/api/v4/projects`) lista como públicos só `cosinf/suap-auth`, `cosinf/suap-code-reviewer`, `cosinf/terminais`, `cosinf/publico`, `cosinf-devops/educ` e `suap_api/exemplos` (este só tem um README vazio). `https://gitlab.ifrn.edu.br/cosinf/suap` redireciona para o login (HTTP 302).
- **OpenAPI spec** (https://suap.ifrn.edu.br/api/openapi.json):
  - `BoletimSchema` (em `GET /api/ensino/meu-boletim/{ano_letivo}/{periodo_letivo}/`, "Recupera o boletim do aluno de um ano e período letivo."): `carga_horaria: integer`, `carga_horaria_cumprida: integer`, `numero_faltas: integer`, `percentual_carga_horaria_frequentada: number`. `NotaBoletimSchema` também tem `faltas` por etapa. **Nenhum campo tem descrição.**
  - `FrequenciaSchema` (em `GET /api/ensino/frequencia-periodo-letivo/{ano}/{periodo}/`, "Recupera total de aulas e faltas em um determinado periodo letivo"): `total_aulas: integer`, `total_faltas: integer`, `total_abonos: integer`, `percentual_frequencia: integer`, todos obrigatórios.
  - `DisciplinaSchema` (em `GET /api/ensino/disciplinas/{semestre}/`): `ch_total_aula`, `ch_cumprida_aula`, `qtd_faltas`, `frequencia: number`.

### O que dá para dizer

- **Denominador:** não confirmado. A existência de `carga_horaria_cumprida` ao lado de `carga_horaria` sugere que o percentual do boletim usa as aulas já dadas, mas nenhuma fonte primária diz isso.
- **Escala:** não confirmado para `percentual_carga_horaria_frequentada` (tipo `number`, pode ser 0–100 ou 0–1). Para `percentual_frequencia` do período, o tipo `integer` torna 0–1 implausível (só existiriam 0 e 1), então é quase certamente 0–100. Isso também é inferência a partir do tipo, não está documentado.
- **Frequência do período:** o SUAP tem um endpoint próprio de frequência agregada por período letivo, com abonos separados. Isso bate com a regra global do Art. 333.

---

## 5. Dependência e progressão parcial

OD 2025, Art. 339 [OD 2024, Art. 263] ([p. 72](https://portal.ifrn.edu.br/documents/24469/Oganiza%C3%A7%C3%A3o_Did%C3%A1tica_2025_-_Resolu%C3%A7%C3%A3o_110-2025.pdf#page=72)):

> "Art. 339. Nos cursos com regime seriado ou modular, será considerado aprovado na série ou módulo o(a) estudante que:
> I. não for reprovado por falta; e
> II. for aprovado em todas as disciplinas, sendo promovido para a série seguinte; ou
> III. for reprovado em até três (3) disciplinas, devendo cursar, no período subsequente, em regime de dependência, as disciplinas objeto de reprovação.
> […]
> § 3º. Caso o estudante obtenha média final na disciplina igual ou superior a 40 (quarenta), poderá realizar a dependência por meio de estudo individualizado, utilizando metodologias não presenciais.
> § 4º. Será considerado aprovado com dependência o(a) estudante que tenha reprovação em até três disciplinas das séries anteriores por ele cursadas no IFRN.
> § 5º. Em caso de reprovação em disciplina semestral ministrada no primeiro semestre do ano letivo, o campus poderá oferecer novamente a disciplina no segundo semestre do mesmo ano letivo, em forma de dependência […]"

- A dependência exige o inciso I: **não ter reprovado por falta**. Quem reprova por falta cai no Art. 340, I (reprovado na série) e não tem dependência.
- Não existe dependência por falta numa disciplina específica, porque a frequência não é apurada por disciplina para fins de reprovação (pergunta 1).
- "Progressão parcial" não aparece na OD 2025. A busca por "progress" só acha "progressão no mundo do trabalho" (Art. 187, certificação profissional), sem relação com o tema.
- No regime de crédito não há dependência. O aluno refaz as disciplinas (Art. 341).

---

## Impacto no app

`src/utils/attendance.ts` hoje:

- `MINIMUM_RATE = 75`, aplicado a `percentual_carga_horaria_frequentada` **de cada disciplina** (`toAttendance` recebe um item do boletim).
- `isCloseToMinimum(rate)` destaca a disciplina quando `rate < 80` (`CLOSE_MARGIN = 5`).
- `attendance-meter.tsx` mostra, por disciplina, "O mínimo é 75%."

### Está certo?

**Não, para nenhum tipo de curso.** Pela OD 2025, Art. 333 (e OD 2024, Art. 258), o mínimo de 75% vale sobre a **carga horária total das disciplinas cursadas** no período. A regra é igual para integrado, subsequente, PROEJA, graduação e FIC. Consequências práticas:

- Um aluno pode ter 60% numa disciplina e não reprovar por falta, se o total do período passar de 75%.
- Um aluno pode ter mais de 75% em todas as disciplinas menos uma e ainda assim reprovar, se a soma ficar abaixo de 75%. Isso acontece se as disciplinas com mais faltas tiverem carga horária grande.
- O destaque abaixo de 80% é heurística do app e não tem base na OD. Não há problema em manter, desde que a cópia não o apresente como regra.

### O que precisaria mudar

1. **Calcular a frequência do período**, não só por disciplina. Há duas opções:
   - (a) Usar `GET /api/ensino/frequencia-periodo-letivo/{ano}/{periodo}/` (`percentual_frequencia`, `total_aulas`, `total_faltas`, `total_abonos`). É o valor do próprio SUAP e já trata abonos, mas é mais uma chamada e precisa entrar em `KEPT_OP_IDS` no `orval.config`.
   - (b) Agregar o boletim: `1 - Σ numero_faltas / Σ carga_horaria_cumprida`. É mais simples, mas depende de confirmar que `numero_faltas` e `carga_horaria_cumprida` estão na mesma unidade (aulas) e de como abonos e justificativas aparecem em `numero_faltas` (não confirmado).
2. **Aplicar `MINIMUM_RATE` ao número do período.** Por disciplina, mostrar só a informação (faltas, percentual), sem a frase "O mínimo é 75%" e sem tratar a disciplina como "em risco" sozinha.
3. **"Quantas faltas ainda posso ter"**, se a página `/faltas` tiver calculadora: o limite é 25% da **carga horária total prevista** de todas as disciplinas (`Σ carga_horaria`), não das aulas já dadas. A regra fala em "carga horária total das disciplinas cursadas". Faltas restantes ≈ `0,25 × Σ carga_horaria − Σ faltas`. A unidade (aulas ou horas) precisa ser confirmada.
4. **Cópia:** dizer que quem reprova por falta reprova a série (seriado/modular, Art. 340) ou o período (crédito, Art. 341) e perde a avaliação final (Art. 334–336 § 1º). Não é só "reprova na disciplina".
5. **Escala de `percentual_carga_horaria_frequentada`:** o código assume 0–100 (`Math.floor(rate)` e comparação com 75). Isso não foi confirmado em fonte primária (ver abaixo). Vale conferir com uma resposta real antes de depender disso.

---

## Não confirmado

- **Interpretação "global":** a OD não diz literalmente "a frequência não é apurada por disciplina". A conclusão vem de "carga horária total das disciplinas cursadas" (Art. 333) e da estrutura dos Art. 339–341. Não achei instrução normativa, FAQ oficial ou código do SUAP que confirme o cálculo. O Art. 261, parágrafo único, prevê uma Instrução Normativa da PROEN sobre registro e acompanhamento de frequência, mas não a localizei no índice consultado.
- **Efeito da justificativa (Art. 333, parágrafo único):** a OD não diz se a falta justificada deixa de contar, vira presença ou só autoriza aprovação abaixo de 75%. Também não diz como ela aparece no SUAP (como abono em `total_abonos` ou de outro jeito).
- **"Disciplinas objeto de reprovação" no regime de crédito (Art. 341):** não está definido se são todas as disciplinas do período.
- **SUAP: denominador de `percentual_carga_horaria_frequentada`** (aulas dadas ou carga horária total): não documentado na OpenAPI spec, e o código não é público.
- **SUAP: escala** de `percentual_carga_horaria_frequentada` (0–100 ou 0–1) e de `DisciplinaSchema.frequencia`: não documentada. `FrequenciaSchema.percentual_frequencia` é `integer`, o que só é compatível na prática com 0–100, mas isso também é inferência.
- **SUAP: unidade** de `numero_faltas` e `carga_horaria_cumprida` (aulas/horas-aula ou horas-relógio): não documentada. O `DisciplinaSchema` separa `ch_total_aula` e `ch_total_relogio`, o que indica que o SUAP trabalha em hora-aula, mas o `BoletimSchema` não diz.
- **SUAP: se `numero_faltas` já desconta abonos e justificativas:** não documentado.
- **Atividades representando o IFRN:** não achei regra de abono ou justificativa na OD 2025 nem na OD 2024.
- **EJA Mediada e EaD:** como a carga horária não presencial (Art. 59) entra no cálculo de frequência não está descrito.
- **Decreto 57.654/66:** li o texto via fetch em duas partes. Achei o Art. 195 § 4º, mas o fetch avisou que os últimos ~4.700 caracteres não foram lidos. Pode haver outro dispositivo sobre estudantes no fim do decreto.
- **Lei 6.202/75:** os Art. 1º e 2º foram lidos em trechos (o fetch limitou a citação). O conteúdo resumido do Art. 1º, parágrafo único, não foi conferido palavra por palavra.
