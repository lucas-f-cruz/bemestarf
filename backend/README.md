# 🏥 Bem Estar Farma — API Backend

> Node.js + Express + MongoDB

---

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env
# → Edite o .env com suas configurações (MongoDB URI, JWT Secret, etc.)

# 3. Popular o banco com dados iniciais (filiais, produtos, admin)
npm run seed

# 4. Rodar em desenvolvimento
npm run dev
# → http://localhost:5000

# 5. Produção
npm start
```

---

## 📁 Estrutura

```
src/
├── config/
│   └── database.js        ← Conexão MongoDB
├── controllers/
│   ├── authController.js  ← Login, registro, JWT
│   ├── produtoController.js
│   ├── pedidoController.js
│   ├── filialController.js
│   └── contatoController.js
├── middleware/
│   ├── auth.js            ← Verificação JWT + roles
│   └── errorHandler.js    ← Erros globais + asyncHandler
├── models/
│   ├── User.js            ← Usuários + endereços + fidelidade
│   ├── Produto.js         ← Catálogo com busca por texto
│   ├── Pedido.js          ← Pedidos + histórico de status
│   ├── Filial.js          ← 9 filiais reais
│   ├── Contato.js         ← Formulário de contato
│   └── Cupom.js           ← Cupons de desconto
├── routes/
│   ├── auth.js
│   ├── produtos.js
│   ├── pedidos.js
│   ├── filiais.js
│   └── contato.js
├── utils/
│   └── seed.js            ← Dados iniciais (filiais reais + produtos)
└── server.js              ← Entry point
```

---

## 🔗 Endpoints

### Auth — `/api/auth`
| Método | Rota           | Auth | Descrição                  |
|--------|----------------|------|----------------------------|
| POST   | /registrar     | ❌   | Criar conta                |
| POST   | /login         | ❌   | Login → retorna JWT        |
| POST   | /refresh       | ❌   | Renovar access token       |
| POST   | /logout        | ✅   | Logout                     |
| GET    | /me            | ✅   | Perfil do usuário logado   |
| PATCH  | /me            | ✅   | Atualizar perfil           |
| PATCH  | /me/senha      | ✅   | Trocar senha               |

### Produtos — `/api/produtos`
| Método | Rota                    | Auth  | Descrição                   |
|--------|-------------------------|-------|-----------------------------|
| GET    | /                       | ❌    | Listar (filtros + paginação)|
| GET    | /destaques              | ❌    | Produtos em destaque        |
| GET    | /categoria/:cat         | ❌    | Por categoria               |
| GET    | /:id                    | ❌    | Buscar por ID ou slug       |
| POST   | /                       | Admin | Criar produto               |
| PATCH  | /:id                    | Admin | Atualizar produto           |
| DELETE | /:id                    | Admin | Remover produto (soft)      |

### Pedidos — `/api/pedidos`
| Método | Rota               | Auth  | Descrição               |
|--------|--------------------|-------|-------------------------|
| POST   | /                  | ✅    | Criar pedido            |
| GET    | /meus              | ✅    | Meus pedidos            |
| GET    | /meus/:id          | ✅    | Detalhe do pedido       |
| PATCH  | /meus/:id/cancelar | ✅    | Cancelar pedido         |
| GET    | /                  | Admin | Todos os pedidos        |
| PATCH  | /:id/status        | Admin | Atualizar status        |

### Filiais — `/api/filiais`
| Método | Rota       | Auth  | Descrição         |
|--------|------------|-------|-------------------|
| GET    | /          | ❌    | Listar filiais    |
| GET    | /:numero   | ❌    | Buscar por número |
| POST   | /          | Admin | Criar filial      |
| PATCH  | /:id       | Admin | Atualizar filial  |

### Contato — `/api/contato`
| Método | Rota   | Auth  | Descrição           |
|--------|--------|-------|---------------------|
| POST   | /      | ❌    | Enviar mensagem     |
| GET    | /      | Admin | Listar mensagens    |
| PATCH  | /:id   | Admin | Responder mensagem  |

---

## 🔐 Autenticação

O sistema usa JWT com dois tokens:
- **Access Token**: expira em 7 dias (configurável no .env)
- **Refresh Token**: expira em 30 dias

Inclua no header das requisições protegidas:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

### Roles
- `cliente` — usuário padrão
- `admin` — acesso total
- `farmaceutico` — acesso intermediário (para futuras funcionalidades)

---

## 📦 Filtros de produtos

```
GET /api/produtos?busca=dipirona&categoria=medicamentos&destaque=true&minPreco=5&maxPreco=50&emEstoque=true&pagina=1&limite=20&ordenar=-preco
```

---

## 🌱 Dados iniciais (seed)

O comando `npm run seed` popula:
- **9 filiais reais** com WhatsApp e Instagram corretos
- **10 produtos** de exemplo por categoria
- **3 cupons**: `BEMVINDO10` (10% OFF), `FRETEGRATIS`, `BEBE20` (20% OFF infantil)
- **1 usuário admin**: `admin@bemestarf.com.br` / `Admin@2025!`

---

## 💳 Pagamentos (Mercado Pago — a implementar)

Após obter as credenciais em https://www.mercadopago.com.br/developers:

1. Adicione `MP_ACCESS_TOKEN` e `MP_PUBLIC_KEY` no `.env`
2. Instale o SDK: `npm install mercadopago`
3. No `pedidoController.js`, integre a criação de preferência de pagamento

---

## 🚀 Deploy

### Frontend (Vercel)
```bash
cd bemestarf
vercel deploy
```

### Backend (Railway)
```bash
# Conecte o repositório no railway.app
# Configure as variáveis de ambiente no painel
# A plataforma detecta o package.json e roda automaticamente
```

### MongoDB Atlas (produção)
1. Crie cluster em mongodb.com/atlas (gratuito até 512MB)
2. Copie a connection string para `MONGODB_URI` no .env de produção

---

*Bem Estar Farma Drogarias © 2025*
