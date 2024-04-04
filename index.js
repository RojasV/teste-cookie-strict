const express = require('express');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('strictCookie', 'someValue', {
        httpOnly: true,
        sameSite: 'Strict',
        path: '/',
        secure: true // Secure should be true if using https
    });
    res.send('Cookie has been set with SameSite=Strict');
});

app.get('/protected', (req, res) => {
    if (req.cookies.strictCookie === 'someValue') {
        res.send('Dados protegidos exibidos');
    } else {
        res.status(401).send('Acesso Negado, você precisa do cookie');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
