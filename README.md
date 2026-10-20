# Case Paggo

Aplicação para receber um visitante, pesquisar pessoa e empresa, preparar um
briefing, conversar por voz, qualificar com SPICED e tentar reservar uma reunião.
O painel interno reúne os registros e as ferramentas de cada execução.

- [Aplicação publicada](https://teste-tecnico-paggo.vercel.app)
- [Painel interno](https://teste-tecnico-paggo.vercel.app/painel) — exige a credencial de avaliação.
- [Repositório](https://github.com/httpepo/case-pedro-paggo)

Stack: Next.js, React e TypeScript, com persistência Neon PostgreSQL,
pesquisa Tavily, síntese e extração Gemini, voz ElevenLabs e Vercel Queues.

## Fluxo disponível

1. O visitante informa nome, e-mail, telefone e empresa; site e número de
   funcionários são opcionais. O servidor preserva o original e a versão normalizada.
2. A pesquisa roda em segundo plano, registra fontes e gera o briefing com
   fatos, hipóteses e lacunas. Sem briefing válido, a voz permanece bloqueada.
3. A preparação mostra spinner, “Tudo pronto!” e o botão “Iniciar conversa por voz”.
   Falhas de preparação oferecem nova tentativa.
4. O botão abre a tela de voz com círculo animado, mensagens e controles de microfone
   e encerramento. A sessão recebe fatos e lacunas do briefing correto.
5. O Anderson conduz a qualificação e pode consultar a agenda e reservar um horário
   escolhido pelo visitante. Falha de reserva não vira confirmação.
6. Ao encerrar, a tela mostra “Aguarde enquanto encerramos a conversa”.
   Após o backend informar `completed`, aparece o checkmark com
   “Obrigado, nosso time entrará em contato com você!”.
7. O encerramento cria um job persistente que recupera a conversa na ElevenLabs,
   sem depender da chegada do webhook. O webhook assinado também salva artefatos
   e aciona esse mesmo job. O painel mostra
   pesquisa, transcrição, resumo, qualificação, ferramentas e tentativas de agenda.

O pós-processamento tem meta de 60 segundos, com tentativas retomáveis e indicação
de atraso após esse prazo. Uma indisponibilidade externa pode ultrapassar a meta;
o painel distingue falha da voz de falha da extração. Transcrição e resumo recebidos
são preservados antes do Gemini.
A mensagem final da interface não comprova reserva nem dispara um contato automático.

## Execução local

Use o Node de `.nvmrc` e o pnpm definido em `package.json`.

```sh
nvm use
pnpm install --frozen-lockfile
cp -n .env.example .env
pnpm dev
```

Acesse http://127.0.0.1:3000. Para processar pesquisa fora da Vercel,
mantenha o worker em outro terminal:

```sh
nvm use
pnpm jobs:worker
```

Para o pós-processamento local, execute também `pnpm jobs:conversation`.
Na Vercel, o consumer `/api/queues/conversation` recebe jobs em `gru1`; os jobs
e seus bloqueios são persistidos no Neon. Uma tentativa imediata após a resposta
acelera o fluxo, enquanto a fila e os jobs persistentes permitem retomá-lo.

O carregamento de ambiente segue a precedência do Next.js, incluindo `.env.local`.
Imports e build não devem abrir conexões nem chamar os provedores.

### Persistência e acesso

- Em desenvolvimento, `APP_MODE=demo` libera o fluxo local.
- Com `DATABASE_URL`, a composição seleciona Neon para os módulos. Sem ela,
  os adaptadores em arquivo usam `.data/` para demonstração local.
- Falha do Neon não ativa fallback em arquivo. Persistência local não simula
  respostas de pesquisa, voz ou agenda.
- Em produção, `APP_MODE=live`, banco e segredo de sessão habilitam o fluxo público.
  Consultas individuais exigem a sessão assinada do visitante.
- O painel usa HTTP Basic em HTTPS, com `PANEL_USERNAME` e `PANEL_PASSWORD`.
  Essa é uma proteção de avaliação; OIDC permanece evolução.
- Ferramentas de agenda usam credencial temporária de 15 minutos vinculada a lead,
  execução e sessão de voz. A oferta de horário tem seu próprio token, com 10 minutos.

### Configuração

| Capacidade | Variáveis |
| --- | --- |
| Neon | `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `NEON_BRANCH` |
| Pesquisa e extração | `TAVILY_API_KEY`, `GEMINI_API_KEY`, `GEMINI_MODEL` |
| Voz | `ELEVENLABS_API_KEY`, `ELEVENLABS_AGENT_ID`, `ELEVENLABS_WEBHOOK_SECRET`, `LEAD_SESSION_SECRET` |
| Agenda | `AGENDA_BASE_URL`, `AGENDA_TOKEN`, `AGENDA_AUTH_HEADER`, `AGENDA_AUTH_PREFIX` |
| Painel | `PANEL_USERNAME`, `PANEL_PASSWORD` |

Use `.env.example` como referência. Credenciais permanentes ficam no servidor;
não use prefixo `NEXT_PUBLIC_` para segredos. Arquivos de ambiente e
`.secrets/` não são entregáveis.

### Banco

As oito migrações foram aplicadas ao destino `production`; a oitava adiciona
`conversation_processing_jobs` com tentativas, bloqueio temporário e diagnóstico.
Para consultar conexão, plano e checksums, use:

```sh
pnpm db:check
pnpm db:status
```

Esses comandos acessam o banco. Mudanças de schema exigem conferir o destino,
revisar o plano e só então aplicar a migração autorizada:

```sh
pnpm db:migrate -- --apply --expect-endpoint SEU_ENDPOINT
```

## Configuração atual da voz

A consulta de configuração na ElevenLabs confirmou:

- Identidade Anderson e idioma `pt-br`.
- Referência a `{{spiced_prompt}}`, que recebe fatos, lacunas e o mapa completo de objeções da sessão (resposta prevista, próximo passo, limites e fatos autorizados).
- `initial_wait_time=2`, turno `patient` e `speculative_turn=false`.
- Modo expressivo desativado e estabilidade `0.72`.
- Ferramentas `consultar_disponibilidade`, `reservar_reuniao` e `end_call`;
  detecção automática de idioma removida e chamadas paralelas desativadas.
- Restrições a assuntos externos ao atendimento, exposição de instruções e
  invenção de condições comerciais.

Essas configurações não garantem dois segundos exatos entre todas as respostas,
nem resistência absoluta a desvios. A base remota `knowledge_base` está vazia:
o conteúdo comercial chega por instruções resumidas, sem o PDF completo como base
consultável. O mapa de objeções é gerado pelo catálogo local e enviado em cada
nova sessão, sem depender dessa base remota.

Webhook configurado para
`https://teste-tecnico-paggo.vercel.app/api/webhooks/elevenlabs`.
A verificação de assinatura e a deduplicação estão implementadas; a revisão atual
não enviou evento de teste nem iniciou conversa.

## Publicação e versionamento

A Vercel executa `pnpm build --webpack`. O consumidor privado Vercel Queues
entrega identificadores do tópico `paggo-research`; o Neon guarda o job.
No deploy, não é necessário manter um worker no computador.

Toda alteração deve passar pelas verificações pertinentes, commit e push antes
de qualquer deploy. A integração GitHub pode publicar automaticamente após o push.
Se a publicação for manual:

```sh
git diff --check
git add -- ARQUIVOS_DA_TAREFA
git commit -m "descricao da alteracao"
git push origin main
git status --short --branch
pnpm dlx vercel@64.5.0 deploy --prod --yes
```

Substitua `ARQUIVOS_DA_TAREFA` pelos caminhos revisados. Só execute o deploy após
confirmar push bem-sucedido e árvore limpa. Nunca inclua alterações alheias na tarefa.

Para administrar variáveis do projeto já vinculado, existe
`node scripts/configure-vercel-env.mjs`. Sua execução altera o ambiente remoto e
deve fazer parte de uma tarefa de configuração autorizada.
A configuração do agente ElevenLabs é externa ao Git; um push não a atualiza.

## Verificações e roteiro de avaliação

Para código de backend ou módulos usados pelo app:

```sh
pnpm check:architecture
pnpm backend:env
pnpm typecheck
pnpm build
```

`backend:env` verifica configuração local sem chamar provedores; não comprova
saldo ou funcionamento. `backend:check` não deve ser usado neste fluxo porque
também executa testes. A política atual não cria nem executa suítes de testes.

Na avaliação integrada, acompanhe uma mesma execução:

1. Confira o original do formulário e o briefing com fontes no painel.
2. Inicie a voz pelo botão e verifique uso do contexto, naturalidade e SPICED.
3. Apresente objeções e compare “Resposta do Anderson · transcrição” com
   “Orientação prevista no mapa” no painel. Use os links com horário para conferir
   os trechos. Ausência de resposta identificada não deve virar resposta do catálogo.
4. Aceite uma reunião e escolha um horário; só considere sucesso após
   `confirmed` e resposta real da agenda.
5. Aguarde o webhook e confira transcrição, resumo, SPICED e histórico de ferramentas.
6. Compare os estados no painel, inclusive falhas e incertezas.

A jornada de avaliação consome provedores e pode criar reserva.

## Arquitetura e escopo

Monólito modular Next.js + Node.js, com interface, aplicação, domínio, portas e
infraestrutura separados. O design system é local. Consulte [AGENTS.md](AGENTS.md).

Permanecem fora do MVP: telefonia ativa/WhatsApp, prospecção em lote, campanhas,
CRM, múltiplas agendas, reagendamento, cancelamento remoto, plataforma financeira
da Paggo, cobrança, multiempresa e SLA/alta disponibilidade.
