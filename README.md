# ProjetoIntegrador
Descrição <br>
Este é um projeto da disciplina de Desenvolvimento Web realizado como parte do trabalho integrador do curso. O objetivo é criar uma aplicação completa que permita aos usuários gerenciar metas relacionadas ao seu peso, altura, consumo de água e outros dados através de um sistema de login e questionários dinâmicos.

Tecnologias Utilizadas: <br>
Backend: <br>
Node.js: Ambiente de execução para JavaScript no servidor. <br>
Express: Framework minimalista para criação de servidores HTTP. <br>
bcrypt: Biblioteca para hashing de senhas, garantindo maior segurança. <br>
body-parser: Middleware para manipulação de dados no formato JSON ou application/x-www-form-urlencoded. <br>
express-session: Gerenciamento de sessões para autenticação de usuários. <br>
Frontend: <br>
HTML5, CSS3 e JavaScript: Base para construção de interfaces dinâmicas e responsivas. <br>
<br>
Hospedagem: <br>
O projeto foi hospedado na Google Cloud Platform (GCP) utilizando uma Máquina Virtual (VM) configurada para suportar o ambiente de execução Node.js. <br>
<br>

Como Funciona a Hospedagem: <br>
A Google Cloud oferece o Compute Engine, um serviço que permite criar e gerenciar máquinas virtuais escaláveis para hospedar aplicações. No nosso caso, configuramos uma máquina virtual que atua como o servidor principal da aplicação. <br>
<br>
Integrantes do Grupo: <br>
João Guadagnucci Rozestraten <br>
Arthur França de Vasconcellos <br>
Vinicius Batista de Moraes <br>
Ricardo Augusto Patrício de Azambuja <br>
<br>
Professor:<br>
José Matias Lemes Filho <br>
<br>
Link para o GitHub: https://github.com/JoaoRozestraten/ProjetoIntegrador <br>

### TELA INICIAL <br>
Nela é possível notar 2 botões, um de login, caso já tenha criado um usuário, e o de resistrar, para criar um novo ususário:
![Captura de tela 2024-11-28 182811](https://github.com/user-attachments/assets/29e9026a-d310-47fb-9120-a13f10500659)


<br>

### PÁGINA DE REGISTRO <br>
Nesse local é possível criar um novo usuário, caso o nome escolido já esteja em uso aparecerá uma mensagem de erro logo abaixo do botão 'Registrar'.
![Captura de tela 2024-11-28 182908](https://github.com/user-attachments/assets/146b08ab-754a-49dc-8f46-0358f6190606)

<br>

### PÁGINA DE LOGIN <br>
Depois de preencher as informações do usuário já cadastrado é possível entrar no site. É importante ressaltar que caso alguma das duas informações esteja incorreta é devolvida uma mensagem embaixo do botão "entrar".
![Captura de tela 2024-11-28 182942](https://github.com/user-attachments/assets/5291fde5-31a9-41fe-832c-e296deb60674)

<br>

### MONITORAMENTO DIÁRIO <br>
Após logar, o usuário é redirecionado para essa página, onde é possível preencher um formulário. É importante ressaltar que existe um valor máximo e mínimo diferente para cada input. Além disso, é possível preencher novos formulários clicando no botão + abaixo da tela, as informações preenchidas em formulários anteriores estarão próximas ao botão '+' caso o ususário  já tenha preenchido algum. Entretanto, não é possível alterá-las.
![Captura de tela 2024-11-28 182957](https://github.com/user-attachments/assets/de062244-131f-4d5a-8ded-0ac48c435e42)
![Captura de tela 2024-11-28 183033](https://github.com/user-attachments/assets/cb6c52e7-5298-466f-8692-40679fca2a44)

<br>

### ESTATÍSTICAS E METAS <br>
Clicando no botão 'Estatísticas e metas' na parte superior da tela o usuário é redirecionado para a página na imagem abaixo. As informações de peso e consumo de água, definida pelo usuário por meio dos formulários, estão dispostas em gráficos. 
![Captura de tela 2024-11-28 183125](https://github.com/user-attachments/assets/735d04bf-6db0-4a4b-8e04-ac774a8b1a16)

<br>

### DEFININDO A META <br>
Clicando em 'Definir meta' é possível colocar um valor de 60 até 100. Esse limite ocorre pois dependendo do que for colocado será mostrado um plano diferente, e foram ciados 8 planos no total. <br>
![Captura de tela 2024-11-28 183137](https://github.com/user-attachments/assets/89be81d6-d72c-4109-9a62-4e2b006c4b29)


<br>

### MOSTRANDO OS PLANOS
Como já foi dito anteriormente, 1 dos 8 planos será mostrado para o usuário. Os planos dependem do intervalo que a pessoa deseja chegar, sendo definido de 10 em 10 kg, e se ela precisa ganhar ou perder peso para atingir seu objetivo.
![Captura de tela 2024-11-28 183149](https://github.com/user-attachments/assets/a0517230-eb3e-47ab-bde0-046a2ae796fe)

<br>

### PÁGINA SOBRE
Logo abaixo do texto explicativo do site da página sobre, é possível preencher um formulário que será recebido pelos responsáveis por meio do fromspree. <br>

![Captura de tela 2024-11-28 183239](https://github.com/user-attachments/assets/eadbc10d-2267-4a20-9593-5d66a3dd19d8)

<br>

### OBSERVAÇÕES: <br>
Como não está sendo utilizado nenhum banco de dados as informações são armazenadas apenas localmente. Ao clicar no botão login no centro superior das pagina "Sobre","Estatísticas e Metas" ou "Monitoramento Diário" é possível trocar o usuário, apesar das infomações não estarem em um banco de dados os formulários preenchidos estão vinculádos com cada usuário, ou seja, a precistência de dados local permite com que o usuário saia e entre na sua conta sem perder suas informações se a guia de navegação não fechada. <br>
Para rodar o programa localmente só é preciso dar o comando node server.js dentro do diretório correspondente, depois é só copiar e colar o link devolvido no terminal na barra de busca. Esse processo foi utilizado para pegar as telas presentes nesse README.md







