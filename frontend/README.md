# 🏥 Bem Estar Farma Drogarias — Projeto Web

> Guia completo do projeto. Leia antes de iniciar o desenvolvimento.

---

## 📁 Estrutura do Projeto

```
bemestarf/
├── public/
│   └── logo.jpg                  ← Logo oficial da farmácia
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx        ← Topbar + logo + busca + carrinho
│   │   │   ├── Navbar.jsx        ← Menu de navegação + dropdown departamentos
│   │   │   └── Footer.jsx        ← Rodapé completo com app placeholder
│   │   ├── sections/
│   │   │   ├── BannerCarousel.jsx   ← Carrossel de banners (5 slides, 5s auto)
│   │   │   ├── FiliaisSection.jsx   ← Filiais em abas (9 filiais reais)
│   │   │   └── ContatoSection.jsx   ← Formulário + canais + FAQ
│   │   └── ui/
│   │       ├── ProductCard.jsx   ← Card de produto reutilizável
│   │       └── WhatsAppFloat.jsx ← Botão flutuante WhatsApp
│   ├── data/
│   │   └── index.js             ← TODAS as filiais reais, banners, produtos, deps
│   ├── hooks/
│   │   └── useStore.js          ← Zustand: carrinho + formulário de contato
│   ├── pages/
│   │   └── Home.jsx             ← Página inicial completa
│   ├── styles/
│   │   └── globals.css          ← Variáveis CSS, reset, animações
│   ├── App.jsx                  ← Router + layout global
│   └── main.jsx                 ← Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
# → http://localhost:3000

# 3. Build para produção
npm run build
```

---

## 🏪 Filiais Reais (dados em src/data/index.js)

| # | Nome             | WhatsApp         | Instagram       |
|---|------------------|------------------|-----------------|
| 1 | Nova Cidade      | (84) 98602-4913  | @befnatal       |
| 2 | Nazaré           | (84) 98604-8535  | @befnatal       |
| 4 | Pajuçara         | (84) 98895-0005  | @befnatal       |
| 5 | Emaús/Parnamirim | (84) 98863-0897  | @befnatal       |
| 6 | Taipu            | (84) 99158-5727  | @beftaipu       |
| 7 | Rio do Fogo      | (84) 99134-1662  | @befriodofogo   |
| 8 | Umari            | (84) 99879-0050  | @bef.umari      |
| 9 | Primeira Lagoa   | (84) 99816-0185  | @bef.umari      |
| 10| Ponta do Mato    | (84) 99894-0242  | @bef.umari      |

> ⚠️ Filial 3 não existe — numeração vai 1,2,4,5,6,7,8,9,10

---

## 🎨 Design System (variáveis CSS)

```css
--blue:       #003087   /* Azul principal — identidade */
--blue-mid:   #0055cc   /* Azul hover */
--blue-light: #1a7aff   /* Azul claro */
--red:        #e8001c   /* Vermelho — acentos e promoções */
--green:      #17a858   /* Verde — status aberto */
--wpp:        #25d366   /* Verde WhatsApp */

--font-display: 'Raleway'  /* Títulos e destaques */
--font-body:    'Nunito'   /* Textos gerais */
```

---

## 📦 Stack Tecnológica

| Camada         | Tecnologia              | Função                            |
|----------------|-------------------------|-----------------------------------|
| Frontend       | React 18 + Vite         | Interface principal               |
| Roteamento     | React Router DOM v6     | Navegação entre páginas           |
| Estado         | Zustand                 | Carrinho + formulários            |
| Formulários    | React Hook Form         | Validação de formulários          |
| Notificações   | React Hot Toast         | Feedback ao usuário               |
| Ícones         | React Icons (Feather)   | Ícones modernos                   |
| Estilo         | CSS Modules             | Estilos escopados por componente  |
| Build          | Vite 5                  | Bundler rápido                    |

### Para adicionar posteriormente:
| Função              | Recomendação              |
|---------------------|---------------------------|
| Backend / API       | Node.js + Express         |
| Banco de dados      | PostgreSQL + Prisma        |
| Autenticação        | Firebase Auth ou JWT       |
| Pagamentos (Pix)    | Mercado Pago SDK           |
| Cartão de crédito   | Mercado Pago ou Pagar.me   |
| E-mail transacional | Resend ou SendGrid         |
| Mapa filiais        | Google Maps API            |
| Hospedagem frontend | Vercel (gratuito)          |
| Hospedagem backend  | Railway ou Render          |

---

## 🔧 Próximos Passos de Desenvolvimento

### Fase 1 — Frontend completo
- [ ] Página de categoria de produto
- [ ] Página de busca com filtros
- [ ] Página do carrinho com checkout
- [ ] Página de conta do usuário
- [ ] Página de cada filial com mapa real
- [ ] Página do blog
- [ ] Responsividade mobile completa

### Fase 2 — Backend + Banco de Dados
- [ ] API Node.js + Express
- [ ] PostgreSQL com Prisma ORM
- [ ] Autenticação com JWT
- [ ] CRUD de produtos, categorias, pedidos
- [ ] Sistema de cupons

### Fase 3 — Pagamentos
- [ ] Integração Mercado Pago (Pix + Cartão)
- [ ] Webhook de confirmação de pagamento
- [ ] E-mails transacionais

### Fase 4 — App Mobile
- [ ] React Native ou PWA
- [ ] Publicação App Store / Google Play

---

## 🗂️ Como atualizar dados

**Filiais** → editar `src/data/index.js`, array `FILIAIS`  
**Banners** → editar `src/data/index.js`, array `BANNERS`  
**Produtos** → editar `src/data/index.js`, array `PRODUTOS_DESTAQUE`  
**Contato** → editar `src/data/index.js`, objeto `CONTATO`

---

## 🖼️ Assets

- **Logo**: `/public/logo.jpg` — usar sempre via `<img src="/logo.jpg" />`
- **Fontes**: Raleway (títulos) + Nunito (corpo) — carregadas do Google Fonts via `index.html`

---

## 📞 Contato Principal do Projeto

- WhatsApp: (84) 98602-4913
- Instagram: @befnatal
- E-mail: contato@bemestarf.com.br

---

*Gerado por Claude — Anthropic | Bem Estar Farma Drogarias © 2025*
