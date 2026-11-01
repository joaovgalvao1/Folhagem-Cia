# Relatório: Folhagem & Cia

## 1. O que foi feito
- 1.0: Configurei o ambiente, li e estudei o CRUD de usuários
- 1.1: Model Planta e enum Luminosidade no schema, com a migration
- 1.2: Criei as cinco funções do PlantaRepository.ts
- 1.3: Criei o PlantaController.ts com o mesmo roteiro do usuário e fazendo validação dos dados
- 1.4: Registrei as cinco rotas de CRUD das plantas em routes.ts, no mesmo arquivo das rotas de usuário
- 1.5: Criei os filtros de busca em GET /plantas
- 1.6: Criei a venda de plantas em POST /plantas/:id/venda
- 1.7: Criei GET /plantas/estoque/valor-total, que devolve valorTotalEmCentavos e totalDeVasos

## 2. Como foi feito
- 2.0: Utilizei IA para me explicar o que foi feito no modelo e configurar o ambiente
- 2.1: Criei todas variáveis que foram solicitadas no desafio e defini o preço como inteiro (em centavos)
- 2.2: Dividi a tela do vs code com o código do modelo de usuário ao lado e construi as cinco funções em cima dele
- 2.3: Segui o roteiro do controller do User e deixei os comentários como base para me guiar, utilizei a IA para me auxiliar na sintaxe, encontrar e me explicar os erros do meu código
- 2.4: Mantive as rotas do usuário no mesmo arquivo e criei as rotas das plantas me baseando no modelo.
- 2.5: Converti os textos "true" e "false" para booleano e deixei undefined quando o filtro não é enviado. Filtro inválido retorna 400, e filtro válido sem resultado retorna 200 com lista vazia.
- 2.6: Criei o vendaPlanta respeitando as condições de quantidade e estoque e usei o decrement como estava no pdf
- 2.7: Peguei os dois campos (preco e estoque) com select e somei no código com um for. 

## 3. Principais dificuldades
- 3.0: Não tive dificuldade nessa fase
- 3.1: Removi o model User do schema quando escrevi o model Planta, o yarn typecheck acusou o erro e eu corrigi em uma migration nova
- 3.2: O vs code estava sublinhando um erro em prisma.planta, reiniciei o servidor do typescript e o erro parou
- 3.3: No createPlanta eu encontrei alguns erros na validação dos dados, mas com a IA consegui entender e consegui fazer a correção
- 3.4: Não tive dificuldade nessa fase
- 3.5: Tive dificuldade para converter o texto do petFriendly em booleano, pois a IA sugeriu usar um operador ternário. Preferi resolver com dois if simples e criando uma variável nova.
- 3.6: Tive dificuldade na sintaxe de colocar a variável dentro da mensagem de return, tirei essa dúvida na IA
- 3.7: Não tive dificuldade nessa fase

## 4. Uso de IA
- Ferramenta: Usei o Claude Sonnet 5.5, em um chat, enviando os arquivos e dando contexto. Optei pelo Sonnet em vez de um modelo maior porque a tarefa não exigia mais, assim consegui economizar tokens.
- Para introduzir: pedi explicação do zero sobre API, banco de dados, HTTP, Docker, Prisma, etc. Pedi para gerar um html interativo com explicação dessas partes.
- Para revisar/aprender: Pedi para a IA explicar todo o código base de usuário e me acompanhar no passo a passo de construção de cada etapa, sempre que tive dúvidas pedi para gerar trechos de códigos de exemplo e ir me explicando para eu poder fazer a versão final. Precisei de ajuda no acompanhamento da sintaxe, pois eu não estava acostumado com a linguagem.
- Para correção: Usei como correção no final de todas as fases e, assim como na parte de revisão, usei para entender o erro e me guiar com passo a passo para fazer a versão corrigida do código
- Para comandos de terminal: Já sabia como usar o básico de git, mas precisei de ajuda para entender yarn e docker. 
- Nos testes: A IA reuniu os testes do PDF e montou as mensagens para eu rodar no Thunder Client; eu executei e conferi os resultados.
- Como conferi: rodei yarn typecheck a cada etapa, comparei com o código de usuário, li as migrations e testei no Thunder Client o CRUD, os filtros, a venda e o valor total (conferindo a conta na mão)
- O que aprendi: como uma API de back-end funciona, como construir um CRUD completo com validações e regras de negócio, a sintaxe e a lógica de uma nova linguagem (TypeScript) e a usar ferramentas novas como yarn, docker, Prisma e Thunder Client
