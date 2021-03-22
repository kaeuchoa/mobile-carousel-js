[PT-br - Português do Brasil 🇧🇷]

# Carrossel mobile

Projeto de estudo implementando um carrossel versão mobile usando vanilla Javascript.

Esse app carrega os dados através da [AmiiboAPI (Copyright © 2021;Coded by Nevin Vu)](https://amiiboapi.com/) e os apresenta na forma de um componente carrossel.

Conceitos abordados:
 - ECMAScript 6: Sintaxe de Classes, _arrow functions_, Herança de classe, operador _spread_, etc;
 - _Promises_ -> Chamadas assíncronas para API e classe customizada `HttpService`;
 - Padrão _Singleton_ -> Implementado na classe `State` para ser utilizada em todas as classes responsáveis;
 - Padrão _Observable_ -> Implementado na classe `State` para notificar todos os seus inscritos sobre as mudanças no estado (classe `State`);
 - Arquitetura MVC -> Faz uso de _Template Strings_ para criar a camada _View_;
 - Serviços para consumir os dados da API e manter a responsabilidade da lógica de processamento;
 - Injeção de dependência para desacoplar as classes;
 - Arquitetura BEM para CSS;
 - Variáveis CSS;
 - CSS _partials_ e _imports_;
 - Animações _Placeholder_ para entregar uma resposta mais rápida antes do conteúdo ser carregado;

### Para rodar

Para esse projeto, eu usei a extensão do VSCode chamada `Live Server` para testar e rodar o app.
[Veja as instruções no site da extensão (em inglês)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Demo

Protótipo usado como referência do site Dribble:

<img src="https://user-images.githubusercontent.com/8843527/111987984-a630d600-8aee-11eb-95d5-bb9c7e8f6d58.png" alt="protótipo mostrando o componente carrossel" width="350">

Vídeo Demo:

<img src="https://user-images.githubusercontent.com/8843527/111988915-e17fd480-8aef-11eb-9d5e-76d2c9194705.gif" alt="video gif mostrando o componente carrossel funcionando" width="550">

[US - English :us:]
# Mobile Carousel 

Study project implementing a "mobile" carousel app using vanilla Javascript. 

This app loads its data based on the [AmiiboAPI (Copyright © 2021;Coded by Nevin Vu)](https://amiiboapi.com/) and presents it in the form
of a carousel component. 

Concepts approached here:
 - ECMAScript 6: Class syntax, arrow functions, Class inherintance, spread operator, etc;
 - Promises -> Asnyc calls to API and custom `HttpService` class;
 - Singleton pattern -> Implemented on the `State` class to be used for all responsible classes;
 - Observable pattern -> Implemented on the `State` class to notify subscribers about changes on state;
 - MVC-like architecture -> Using Template Strings to create the View Layer;
 - Services to consume data from API and keep the parsing logic responsibility;
 - Dependency injection to decouple classes;
 - BEM architecture for CSS;
 - CSS variables;
 - CSS partials and imports;
 - Placeholder animations to deliver a faster response before the content is loaded;

### To run
For this project I used VSCode Live server extension to test and run the app.
[See instructions on the extension site](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Demo

Mockup used as reference from Dribble site:

<img src="https://user-images.githubusercontent.com/8843527/111987984-a630d600-8aee-11eb-95d5-bb9c7e8f6d58.png" alt="mockup showing carousel component" width="350">

Demo video:

<img src="https://user-images.githubusercontent.com/8843527/111988915-e17fd480-8aef-11eb-9d5e-76d2c9194705.gif" alt="gif video showing the carousel component working" width="550">


