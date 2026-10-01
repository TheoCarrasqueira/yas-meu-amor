# Yasmim, com amor

Um site feito por Théo para Yasmim, com as nove fotos, cartas, bilhetes e uma surpresa interativa.

## Abrir

Abra `dist/index.html` no navegador. O site é estático e não exige instalação. Para hospedar em outro serviço, envie todo o conteúdo da pasta `dist`, mantendo as subpastas.

## Editar

- Mensagens, legendas e lista de fotos: `dist/config.js`.
- Títulos e estrutura: `dist/index.html`.
- Cores: variáveis no início de `dist/styles.css`.
- Fotografias otimizadas: `dist/assets/photos`.
- Fotografias originais, exibidas ao ampliar: `dist/assets/originals`.

Para trocar uma foto, mantenha o nome do arquivo ou ajuste `id` na lista. Também é possível definir `src` e `original` com caminhos relativos personalizados. `position` controla o enquadramento da miniatura, sem alterar o original.

## Adicionar o vídeo

Nenhum vídeo foi fornecido. A seção está preparada e fica oculta enquanto não houver um vídeo que carregue corretamente.

1. Coloque o vídeo em `dist/assets/nosso-video.mp4`.
2. Em `dist/config.js`, altere `video.src` de `''` para `'assets/nosso-video.mp4'`.
3. Opcionalmente, indique uma capa em `video.poster` e legendas WebVTT em `video.captions`.
4. Abra o site e teste. Para atualizar a versão hospedada, publique novamente o projeto.

O vídeo tem controles e não reproduz automaticamente.

## Recursos

- Nove fotos com visualização completa, navegação por teclado e gestos.
- Fechamento com Escape, foco controlado e retorno à foto.
- Envelope com mensagem e animação curta de corações.
- Layout adaptável e respeito à preferência de movimento reduzido.
- Fontes locais, com alternativas de sistema.
- Nenhum formulário, rastreador, cadastro ou coleta de informações.

O acesso ao link publicado é gerenciado pelo Sites. O site começa privado; escolha o compartilhamento quando quiser apresentá-lo à Yasmim.
