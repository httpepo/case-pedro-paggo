# Regras obrigatórias do projeto

Este arquivo é o system prompt local e a fonte de verdade das instruções de
desenvolvimento para qualquer agente, incluindo Codex, Claude, Cursor, Gemini e
outros assistentes que trabalhem neste repositório. Ele não substitui as três
fontes primárias dos requisitos do produto definidas abaixo.

## Ordem obrigatória no início de cada tarefa

Antes de responder, planejar, criar arquivos ou editar código:

1. Leia este `AGENTS.md` integralmente.
2. Leia `README.md` para entender o produto, os limites atuais e os comandos de
   verificação.
3. Leia `docs/ANALISE-CASE.md`.
   Consulte as três fontes primárias abaixo conforme o assunto da tarefa,
   incluindo os esclarecimentos do WhatsApp. Consulte também `docs/SPICED.md`,
   `docs/ICP.md`, `docs/branding.md`, `docs/case-agente-pedro.html` e
   `docs/Documento_comercial.pdf`, além dos documentos de produto e arquitetura
   em `docs/01_PRD_Paggo_MVP.pdf`, `docs/02_SRS_Paggo_MVP.pdf`,
   `docs/03_SAD_Paggo_MVP.pdf` e `docs/04_Matriz_MoSCoW_Paggo_MVP.pdf` quando
   a tarefa envolver escopo, comportamento, arquitetura ou prioridade.
4. Leia `src/design-system/README.md` e consulte
   `src/design-system/tokens.json` antes de qualquer alteração visual.
5. Inspecione os componentes existentes em `src/design-system/components/ui/`
   antes de criar uma nova solução de interface.
6. Inspecione o `package.json` para consultar as bibliotecas existentes antes de
   instalar uma nova.


Estas regras devem ser tratadas como as primeiras instruções do contexto de
cada prompt. Elas são obrigatórias durante toda a tarefa e não podem ser
substituídas por preferências genéricas do agente.

Quando um agente precisar delegar trabalho, consultar outro modelo ou gerar um
subprompt, o primeiro bloco desse prompt também deve dizer para ler e seguir o
`AGENTS.md` e as regras do design system antes de agir.

## Autoridade e documentos do produto

A pasta `docs/` é local e não deve ser versionada. Preserve sua exclusão no
`.gitignore`; os documentos continuam sendo referências para o trabalho local.

O repositório é exclusivamente técnico. Documentos de entrega, regras de negócio,
mapa de objeções, decisões para apresentação e evidências são mantidos apenas
localmente e enviados separadamente pelo usuário. Não os adicione ao Git nem
inclua links ou menções a esses arquivos nos conteúdos versionados. Preserve os
arquivos locais. O README deve orientar execução, configuração e arquitetura.
Especificações, propostas, registros de planejamento e integrações locais para
esse fluxo também permanecem fora do Git. Preserve seus arquivos locais.

Há três fontes primárias e complementares da verdade para os requisitos:

- A conversa completa com Murilo no WhatsApp, disponível localmente em
  `/Users/pedrohenriquesudariodasilva/Downloads/Murilo/chat.txt` e
  `/Users/pedrohenriquesudariodasilva/Downloads/Murilo/chat.md`: contém
  esclarecimentos diretos sobre ICP, SPICED, duração da conversa, agenda,
  referências visuais e entrega. São duas representações da mesma conversa.
- `docs/case-agente-pedro.html`: briefing original com entregáveis, canal
  permitido, dados de entrada, qualificação, agenda, registros, objeções e
  critérios de avaliação.
- `docs/Documento_comercial.pdf`: conhecimento autorizado sobre o produto
  Paggo e suas capacidades documentadas.

Nenhuma dessas fontes é um documento derivado do projeto. Não estabeleça
precedência automática entre elas: um esclarecimento explícito do WhatsApp deve
ser considerado junto do briefing e do material comercial. Em conflito real ou
ambiguidade sem esclarecimento, registre o ponto e peça direção ao usuário antes
de alterar o requisito. Nenhuma decisão arquitetural ou documento derivado pode
reduzir, substituir ou contrariar essas fontes.

O histórico bruto do WhatsApp contém credenciais e dados pessoais: não o copie para arquivos
versionados, prompts do agente de voz, logs ou documentação pública. As fontes
locais e os documentos de entrega continuam fora do Git.

Os demais documentos apoiam a interpretação das fontes primárias:

- `docs/01_PRD_Paggo_MVP.pdf`: produto, jornada, regras comerciais e prioridades.
- `docs/02_SRS_Paggo_MVP.pdf`: comportamento verificável, estados, contratos e aceite.
- `docs/03_SAD_Paggo_MVP.pdf`: arquitetura e decisões técnicas propostas; não declara implementação.
- `docs/04_Matriz_MoSCoW_Paggo_MVP.pdf`: foco de execução e evidência dos sete Must Have.
- `docs/ANALISE-CASE.md`: interpretação operacional do briefing.
- `docs/SPICED.md`: reprodução local da orientação de Murilo no WhatsApp em
  16/10/2026; não é uma regra inventada pelo projeto.
- `docs/ICP.md`: reprodução local do ICP informado por Murilo no WhatsApp em
  16/10/2026, sem criar cortes de desqualificação não fornecidos.
- `docs/branding.md`: orientação visual e de marca.

Consulte o documento relevante antes de alterar um fluxo, uma regra comercial,
o posicionamento ou o conteúdo. Não atribua decisões do projeto a Murilo nem
trate suas confirmações explícitas como decisões nossas. Lacunas não autorizam
inventar requisitos; identifique a interpretação adotada e peça esclarecimento
quando houver conflito. PRD, SRS, SAD e MoSCoW estão em estado proposto e não
comprovam que uma integração ou recurso já foi implementado.

### MVP obrigatório do case

Os sete itens abaixo precisam funcionar no mesmo fluxo integrado e são a
prioridade absoluta da implementação:

- `MU-01`: formulário real com nome, e-mail, telefone e empresa, validado no
  servidor e com o original preservado.
- `MU-02`: pesquisa real da pessoa e da empresa, briefing persistido antes da
  voz, fontes, fatos, hipóteses e lacunas rastreáveis.
- `MU-03`: conversa de voz bidirecional pelo microfone, usando o briefing
  correto e exibindo falhas de forma compreensível.
- `MU-04`: SPICED e objeções, com respostas e lacunas estruturadas, sem
  inventar preço, integração, certificação ou condição comercial.
- `MU-05`: consulta à agenda do case e tentativa de reserva somente após
  escolha explícita; registrar confirmado, conflito, incerto ou falha.
- `MU-06`: painel com formulário, briefing, transcrição, resumo, SPICED,
  fontes, ferramentas e resultado da agenda por execução.
- `MU-07`: regras de negócio, objeções, decisões técnicas, limites e pendências
  documentados de forma coerente com o app entregue.

“Real” significa integração e persistência efetivas. Mocks identificados servem
ao desenvolvimento, mas não comprovam um Must Have. Se o prazo apertar, corte
Should e Could; não substitua um Must por simulação.

Ficam fora deste MVP, salvo decisão explícita posterior: WhatsApp ou telefonia
ativa, prospecção em lote, campanhas, CRM, múltiplas agendas, reagendamento,
cancelamento remoto, a plataforma financeira da Paggo, cobrança, multiempresa,
SLA/alta disponibilidade e redesign institucional ou de um novo design system.

## Arquitetura obrigatória

O projeto usa um **monólito modular em Next.js + Node.js**, com separação
hexagonal entre interface, casos de uso, domínio e infraestrutura. Não crie
microserviços, um servidor Express paralelo ou chamadas diretas de provedores a
partir das páginas.

```text
src/
  app/                         Rotas, páginas e Route Handlers HTTP
  modules/
    leads/                     Cadastro e identidade do visitante
    research/                  Pesquisa, fontes, evidências e briefing
    conversation/              Sessão de voz, transcrição e resumo
    qualification/             Qualificação SPICED
    scheduling/                Disponibilidade e reserva
    audit/                     Execuções, webhooks e rastreabilidade
  infrastructure/
    bootstrap.ts               Composição de casos de uso e adaptadores
    config/                    Configuração de ambiente restrita ao servidor
    db/                        Conexão, schema e repositórios Neon
    jobs/                      Worker, filas e execução idempotente
    providers/                 Tavily/Gemini, ElevenLabs e agenda
    security/                  Sessões, assinaturas e proteção de dados
  components/                  Composições visuais específicas do produto
  design-system/               Tokens, assets e primitivas reutilizáveis
```

### Dependências entre camadas

- `src/app` pode chamar somente casos de uso e view models. Route Handlers
  validam entrada, autenticação e resposta; não contêm regras comerciais nem
  chamadas diretas a provedores. Para acessar casos de uso compostos, importe
  `src/infrastructure/bootstrap.ts`. `src/infrastructure/config/demo.ts`
  fornece apenas o limite e os textos da demo; nenhum outro adaptador concreto
  pode ser importado por rotas ou páginas.
- `src/modules/*/domain` contém entidades, value objects, estados e regras
  puras. Não importa React, Next.js, banco, SDK de provedor ou código de UI.
- `src/modules/*/application` contém casos de uso e orquestrações. Depende de
  portas/interfaces, nunca de implementações concretas.
- `src/modules/*/ports` define contratos de repositório, pesquisa, voz,
  agenda, jobs e relógio. Os contratos devem receber e retornar tipos do
  domínio, sem vazar formatos de SDK.
- `src/infrastructure` implementa as portas. Todo acesso ao Neon, filesystem,
  fila, SDK externo e segredo fica nessa camada.
- `src/components` não acessa banco, provedores ou regras comerciais. Ele recebe
  dados e ações já preparados pelos casos de uso ou pelas páginas.
- `src/design-system` não importa `src/app`, `src/modules`, `src/lib` ou
  `src/infrastructure`. Suas primitivas não conhecem domínio.

### Módulos e casos de uso

Mantenha estas responsabilidades separadas:

- `leads`: `CreateLead`, validação, preservação do formulário original e
  versões confirmadas/corrigidas.
- `research`: `StartResearch`, `RunResearch`, `BuildBriefing`, fontes,
  evidências, hipóteses e lacunas.
- `conversation`: `PrepareVoiceSession`, `ProcessCallWebhook`, transcrição,
  resumo e estado da sessão.
- `qualification`: normalização das respostas e estado de cada dimensão do
  SPICED.
- `scheduling`: `GetAvailability`, `OfferSlots` e `BookMeeting`, incluindo
  conflito, timeout e confirmação somente após sucesso real.
- `audit`: registro append-only de chamadas de ferramenta, webhooks, erros,
  duração e correlação com o visitante.

As rotas devem seguir os casos de uso, por exemplo:

```text
POST /api/leads
POST /api/leads/:id/research
GET  /api/leads/:id/status
POST /api/leads/:id/voice/session
POST /api/leads/:id/calendar/availability
POST /api/leads/:id/calendar/book
POST /api/webhooks/elevenlabs
```

Os nomes podem mudar somente quando o contrato externo exigir, mas a divisão
entre rota, caso de uso e adaptador deve permanecer.

### Persistência e estados

Use Neon PostgreSQL como persistência de produção. O adaptador em arquivo serve
apenas para demonstração local e deve implementar a mesma porta do repositório.
Não acople o domínio ao formato JSON do adaptador local.

O modelo persistido deve manter, no mínimo, registros separados para:

```text
leads
lead_submissions
lead_profile_versions
research_runs
research_sources
briefings
voice_sessions
conversation_artifacts
spiced_qualifications
meeting_attempts
tool_executions
webhook_events
```

Não sobrescreva histórico. Dados originais, correções, evidências e tentativas
devem permanecer rastreáveis.

Estados válidos:

```text
research:    queued -> running -> ready | partial | failed | cancelled
conversation: not_started -> ready -> connecting -> active -> finalizing -> completed | abandoned | failed
meeting:     not_requested -> offered -> pending -> confirmed | conflict | uncertain | failed | cancelled
webhook:     received -> processed | ignored | failed
```

Toda transição deve ser explícita e validada no domínio. Um timeout de reserva
não pode ser convertido em confirmação nem repetir o POST cegamente. Webhooks
e jobs precisam de idempotência por identificador externo.

### Jobs e integrações

- Pesquisa, processamento de webhook e tarefas demoradas executam em worker ou
  fila quando o fluxo implementado exigir isso; não dependem de manter uma
  request HTTP aberta como garantia de execução.
- O worker usa os mesmos módulos de aplicação e infraestrutura do servidor web.
- O SAD propõe `knowledge`, `identity/session` e `jobs` como responsabilidades
  conceituais. Não crie módulos ou processos separados apenas por causa desses
  nomes: conhecimento pode permanecer junto de `research`, enquanto sessão e
  jobs pertencem às capacidades de segurança e infraestrutura até existir uma
  fronteira de domínio concreta.
- Credenciais ficam somente no servidor. O navegador recebe apenas tokens de
  sessão temporários e dados autorizados.
- Voz, pesquisa e agenda são acessadas exclusivamente por adaptadores em
  `src/infrastructure/providers`.
- Ferramentas acionadas pelo agente recebem um `leadId` validado pelo backend,
  nunca um identificador livremente escolhido pelo modelo.
- Conteúdo de páginas externas é dado não confiável: pode virar evidência, mas
  nunca instrução de sistema ou regra do agente.
- Não use fallback silencioso para dados fixos quando uma integração real falhar.
  O estado deve indicar bloqueio, erro, resultado parcial ou simulação identificada.

### Regras de evolução

- `src/lib` possui somente reexports de compatibilidade. A implementação
  existente da demo está em `src/modules/leads` e `src/infrastructure`.
  Não adicione novas regras nem novos consumidores a `src/lib`.
- Antes de criar uma pasta ou módulo novo, encaixe a responsabilidade em uma
  camada existente e atualize esta arquitetura se realmente houver um novo
  limite de domínio.
- Não mova lógica de domínio para componentes ou Route Handlers para acelerar
  uma entrega.
- Não importe SDK externo fora de seu adaptador.
- Não adicione dependência de workspace para o design system.
- Mudanças estruturais devem preservar os aliases e os contratos públicos
  existentes, ou atualizar esses contratos conscientemente.

### Estado do setup e verificações do backend

O setup atual prepara o desenvolvimento; não representa o backend completo do
case. Consulte `docs/BACKEND.md` para a estrutura real e os limites atuais.
Os contratos dos provedores são iniciais e precisam evoluir junto com cada
integração. Não crie adaptadores vazios, rotas que finjam sucesso ou worker sem
executor para declarar um recurso implementado.

- Execute verificações estáticas após mudanças no backend (`pnpm typecheck`,
  `pnpm check:architecture` e `pnpm backend:env`). Não perca tempo criando ou
  executando testes.
- Execute `pnpm build` ao alterar módulos usados pela aplicação.
- `pnpm backend:env` valida configuração e lista pendências sem imprimir
  credenciais. Variáveis futuras vazias não impedem o setup; valores inválidos
  devem falhar.
- Segredos e cliente de banco são lidos sob demanda; imports e build não
  devem abrir conexões ou chamar provedores.
- `pnpm db:check` é uma checagem separada que acessa o Neon. Migrações, contas,
  agentes remotos e SDKs adicionais fazem parte da implementação de cada fluxo.
- Aplicar um padrão exige uma necessidade concreta do caso de uso. Não crie
  Unit of Work, event bus, circuit breaker ou outbox sem fluxo implementado.

## Skills locais obrigatórias

As skills versionadas em `skills/` complementam este system prompt. Leia a
skill correspondente antes de implementar a área indicada:

- `skills/paggo-architecture/SKILL.md`: módulos, casos de uso, portas,
  adaptadores, repositories, strategies, DTOs e transações.
- `skills/paggo-reliability/SKILL.md`: state machines, jobs, webhooks,
  idempotência, inbox/outbox, retries e resiliência.
- `skills/paggo-domain-modeling/SKILL.md`: entidades, value objects, eventos,
  policies, specifications, evidências e SPICED.

Quando uma tarefa atravessar mais de uma área, carregue todas as skills
relevantes. Elas não substituem `AGENTS.md`, não autorizam novos serviços e não
permitem ignorar as regras do projeto.

## Clean Code básico e diretriz sobre testes

Todo código desenvolvido ou refatorado no projeto deve aplicar com rigor os fundamentos de Clean Code:

- **Nomes Significativos**: Variáveis, funções e classes devem revelar sua intenção imediatamente. Em vez de usar `var d` para tempo decorrido, use `var tempoDecorridoEmDias`. Não economize caracteres se isso custar a clareza.
- **Funções Pequenas e Focadas**: Uma função deve fazer apenas uma coisa e fazê-la bem. Se a sua função está cheia de `if`/`else` aninhados ou passa de 20 linhas, ela provavelmente está acumulando responsabilidades (violando o Single Responsibility Principle).
- **O Código Deve Explicar a Si Mesmo (Cuidado com Comentários)**: Comentários não devem ser usados para compensar um código mal escrito. Se você precisa comentar o que uma linha faz, é melhor reescrever a linha para ficar mais clara. Use comentários apenas para explicar o porquê de uma decisão técnica complexa, não o que o código está fazendo.
- **Regra do Escoteiro (Boy Scout Rule)**: Sempre deixe o código mais limpo do que você o encontrou. Se você precisar mexer em um arquivo para adicionar uma funcionalidade, aproveite para melhorar o nome de uma variável ou extrair uma função menor.
- **Evite a Duplicação (DRY - Don't Repeat Yourself)**: Se você copiou e colou o mesmo bloco de código em três lugares diferentes, extraia isso para uma função ou classe reutilizável. A duplicação multiplica o trabalho e as chances de bugs quando uma regra de negócio muda.
- **Tratamento de Erros Limpo**: Lidar com exceções não deve ocultar a lógica principal do seu programa. Isole os blocos de `try/catch` em funções próprias e crie mensagens de erro que ajudem os outros desenvolvedores a rastrear o problema.

### Diretriz obrigatória sobre testes (Não perder tempo com testes)

- **Não perca tempo criando testes**: Não crie novos arquivos de teste, suítes de teste, testes unitários, testes de integração ou fixtures de teste.
- **Não perca tempo executando testes**: Não execute `pnpm test` nem comandos de teste.
- **Foco na implementação direta**: Concentre o esforço na funcionalidade real, clareza do código, integridade da arquitetura, validação de tipos (`pnpm typecheck`) e compilação (`pnpm build`).

## Design system: fonte única e uso obrigatório

- O design system local em `src/design-system` é a única fonte visual do
  projeto. Não reintroduza a pasta, o pacote ou a dependência
  `paggo-design-system`.
- Reutilize primeiro os componentes de `@/design-system/components/ui/*`.
  Não copie componentes para páginas ou para `src/components`.
- `src/components` contém composições específicas do produto; componentes
  reutilizáveis e sem lógica de domínio pertencem a
  `src/design-system/components/ui/`.
- Não use uma biblioteca visual paralela, componentes de terceiros para
  substituir os componentes locais, HTML estilizado manualmente ou valores
  arbitrários quando o design system já oferecer a solução.
- Não crie cores, fontes, raios, espaçamentos, sombras ou estados visuais fora
  dos papéis definidos pelo tema sem justificar a necessidade e atualizar a
  fonte de verdade.
- Preserve os estados de foco, erro, desabilitado, carregamento, hover e
  responsividade definidos pelos componentes existentes. Toda interação nova
  deve continuar acessível por teclado e por leitor de tela.

## Tokens, fontes e geração

- `src/design-system/tokens.json` é a fonte de verdade dos tokens.
- `src/design-system/index.css` e
  `src/design-system/generated/tokens.tsx` são arquivos gerados. Não os edite
  diretamente.
- Para alterar tokens, edite `tokens.json` e execute:

  ```sh
  pnpm design:tokens
  ```

- Não baixe fontes ou assets de marca em tempo de execução. Use os arquivos
  incorporados em `src/design-system`.
- O tema deve continuar sendo importado uma única vez por
  `src/app/globals.css`.

## Arquitetura e limites

- `src/app`: rotas e páginas do Next.js.
- `src/components`: composições de produto.
- `src/design-system`: tokens, assets e primitivas visuais reutilizáveis.
- `src/lib`: camada de compatibilidade legada; não adicione nela novas regras,
  persistência ou integrações.
- Componentes do design system não acessam dados, rotas, integrações ou regras
  de negócio.
- Mantenha os aliases locais (`@/design-system/...`) e a arquitetura existente.
  Não introduza workspace, pacote local ou `transpilePackages` para o design
  system.
- Preserve as regras de segurança: nunca coloque segredos em código ou em
  variáveis `NEXT_PUBLIC_*`.

## Processo para qualquer alteração visual

1. Pesquise e reutilize os componentes e tokens existentes.
2. Se faltar uma primitiva reutilizável, adicione-a em
   `src/design-system/components/ui/`, sem lógica de domínio, e documente o
   uso em `src/design-system/README.md` quando necessário.
3. Use a primitiva na composição da página ou do fluxo em `src/app` ou
   `src/components`.
4. Verifique contraste, foco, teclado, semântica, responsividade e estados de
   erro antes de considerar a tarefa concluída.
5. Execute as validações apropriadas. Para mudanças no design system, execute:

   ```sh
   pnpm design:tokens
   pnpm typecheck
   pnpm build
   ```

## Regra de conclusão

Nenhuma tarefa de interface está concluída se criar uma segunda fonte visual,
editar arquivos gerados diretamente, ignorar um componente existente,
reintroduzir `paggo-design-system` ou deixar uma validação relevante falhar.

Ao relatar o trabalho, informe quais componentes/tokens locais foram usados,
quais arquivos foram alterados e quais validações foram executadas.

## Versionamento e publicação obrigatórios

- Ao concluir qualquer alteração solicitada no projeto, faça um commit com uma
  mensagem que descreva a mudança e envie-o ao repositório remoto configurado
  (`git push`) antes de encerrar a tarefa.
- Nunca faça deploy de uma alteração que ainda não esteja commitada e enviada
  ao remoto.
- Quando houver deploy, confirme primeiro que o commit foi enviado com sucesso,
  que a árvore de trabalho está limpa e que a publicação corresponde ao commit
  enviado.
- Se o commit ou o push falhar, não declare a tarefa concluída nem faça deploy;
  informe o bloqueio e preserve as alterações locais para correção.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
