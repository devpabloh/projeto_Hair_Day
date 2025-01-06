# projeto_Hair_Day
 Projeto realizado utilizando, html, css, javascript, webpack e algumas outras ferramentas para desenvolvimento.

 1 - Json-server utilizado para simular um servidor local, após a instalação temos um arquivo package.json que possibilita adicionar algumas configurações.

 npm i json-server@1.0.0-alpha.21

 2- .gitignore, que é usado para colocar aqueles arquivos da aplicação que você quer que seja ignorado na hora do deploy.

 3 - Webpack para empacotar os arquivos que serão utilizados no projeto, como html, css e javascript. Ao instalar adicionei o --save-dev para ele permanecer apenas no ambiente de desenvolvimento.

 npm i webpack@5.89.0 webpack-cli@5.1.4 --save-dev

 4 - devServer, instalamos o dev server do webpack, para criar um servidor de desenvolvimento.

 npm i webpack-dev-server@4.15.1 --save-dev

 5 - Adicionando o HTML ao webpack, para que possa ser lido e renderizado.

 npm install --save-dev html-webpack-plugin

 6 - adicionando o CSS ao Webpack, para que o mesmo seja lido e renderizado.

 npm i style-loader@3.3.3 css-loader@6.8.1 --save-dev
