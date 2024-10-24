const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Configura o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Para lidar com JSON no body
app.use(session({
    secret: 'segredo_super_secreto', // Palavra de segurança para assinar cookies
    resave: false,
    saveUninitialized: true,
}));

// Guardar todos os users cadastrados e dados dos questionários
const users = [];

// Rota principal (serve o index.html por padrão)
app.get('/', (req, res) => {
    if (req.session.username) {
        res.sendFile(path.join(__dirname, 'public', 'qst.html')); // Página do questionário se logado
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html')); // Página de login por padrão
    }
});

// Rota para registrar novos usuários
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.json({ success: false, message: 'Nome de usuário já está em uso. Tente outro.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, history: [] }); // Adiciona um histórico vazio
    res.json({ success: true, message: 'Registro concluído! Você já pode fazer login.' });
});

// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    
    if (!user) {
        return res.json({ success: false, message: 'Usuário não encontrado.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
        req.session.username = username; // Armazena o nome do usuário na sessão
        // Retorna um JSON com sucesso e a URL de redirecionamento
        res.json({ success: true, message: 'Login bem-sucedido!', redirectUrl: `/qst.html?username=${encodeURIComponent(username)}` });
    } else {
        res.json({ success: false, message: 'Senha incorreta.' });
    }
});

// Rota de logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Erro ao sair.');
        }
        res.redirect('/'); // Redireciona para a página principal após logout
    });
});

// Rota para salvar dados do questionário
app.post('/save', (req, res) => {
    if (!req.session.username) {
        return res.status(403).json({ message: 'Não autorizado. Faça login.' });
    }

    const { weight, height, waist, water } = req.body;
    const user = users.find(user => user.username === req.session.username);

    if (user) {
        const entry = { weight, height, waist, water, date: new Date() };

        // Mantém no máximo 7 entradas no histórico
        if (user.history.length >= 7) {
            user.history.shift(); // Remove o mais antigo
        }
        user.history.push(entry);
        res.json({ success: true, message: 'Dados salvos com sucesso!', history: user.history });
    } else {
        res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }
});

// Rota para obter o histórico
app.get('/history', (req, res) => {
    if (!req.session.username) {
        return res.status(403).json({ message: 'Não autorizado. Faça login.' });
    }

    const user = users.find(user => user.username === req.session.username);

    if (user) {
        res.json(user.history);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
