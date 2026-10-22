# 🛒 Meu Ecommerce

Uma loja virtual moderna construída com **Next.js**, com catálogo de produtos vindo do **Stripe**, carrinho de compras, pagamento seguro e login de usuários com **Clerk**.

O projeto foi pensado para ser simples de entender e de evoluir: você cadastra os produtos no painel do Stripe e eles aparecem automaticamente na loja.

Pode ser acessado por esse link também na web: eccomerce-web-page.vercel.app

---

## ✨ O que o projeto faz

- **Página inicial** com destaque de boas-vindas e um carrossel que rotaciona os produtos a cada 3 segundos.
- **Catálogo de produtos** com busca em tempo real por nome ou descrição.
- **Página de detalhe** de cada produto, com botões para adicionar e remover do carrinho.
- **Carrinho de compras** que mantém os itens enquanto você navega, com contador no menu.
- **Pagamento** processado pelo Stripe Checkout.
- **Página de pagamento aprovado**, que limpa o carrinho após a compra.
- **Login e cadastro** com e-mail ou Google, usando o Clerk.
- **Menu responsivo**, com versão de celular (hambúrguer) e de computador.

---

## 🧰 Tecnologias

| Tecnologia | Para que serve |
|---|---|
| [Next.js](https://nextjs.org) (App Router, Turbopack) | Framework principal, rotas e renderização |
| [React](https://react.dev) | Interface |
| [TypeScript](https://www.typescriptlang.org) | Tipagem e segurança no código |
| [Tailwind CSS v4](https://tailwindcss.com) | Estilização |
| [shadcn/ui](https://ui.shadcn.com) | Componentes base (botão, card) |
| [Stripe](https://stripe.com) | Produtos, preços e pagamento |
| [Clerk](https://clerk.com) | Autenticação (login e cadastro) |
| [Zustand](https://zustand-demo.pmnd.rs) | Estado global do carrinho |
| [Heroicons](https://heroicons.com) | Ícones |

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter:

- **Node.js** 20 ou superior
- **npm** (já vem com o Node)
- Uma conta no **[Stripe](https://dashboard.stripe.com/register)** (o modo de teste é gratuito)
- Uma conta no **[Clerk](https://clerk.com)** (plano gratuito é suficiente)

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo chamado `.env.local` na **raiz** do projeto (ao lado do `package.json`):

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

> ⚠️ **Nunca envie o `.env.local` para o GitHub.** Ele contém chaves secretas. Confirme que ele está listado no `.gitignore`.
>
> O nome exato da variável do Stripe pode variar conforme o seu arquivo `lib/stripe.ts`. Confira ali qual nome o projeto usa.

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🔑 Onde conseguir as chaves

### Stripe

1. Entre no [painel do Stripe](https://dashboard.stripe.com) e ative o **Modo de teste**.
2. Vá em **Desenvolvedores → Chaves de API**.
3. Copie a **Chave secreta** (`sk_test_...`).

### Clerk

1. Crie um aplicativo em [clerk.com](https://clerk.com).
2. Ative os métodos de login desejados (e-mail e Google).
3. Na página de início rápido, copie a **Publishable key** e a **Secret key**.

---

## 📦 Como cadastrar produtos

Os produtos **não ficam no código**. Eles vêm direto do Stripe:

1. No painel do Stripe, abra **Catálogo de produtos** e clique em **Adicionar produto**.
2. Preencha nome, descrição e imagem.
3. Crie o **preço** e escolha a moeda **BRL** (reais).
4. Salve. O produto aparece na loja assim que você recarregar a página.

> 💡 O preço de um produto já criado não aceita troca de moeda. Se errou, crie um novo preço e arquive o antigo.

---

## 🗂️ Estrutura de pastas

```
.
├── app/
│   ├── layout.tsx              # Layout geral (ClerkProvider, Navbar)
│   ├── page.tsx                # Página inicial
│   ├── globals.css             # Tema e cores (variáveis do shadcn/Tailwind)
│   ├── produtos/
│   │   ├── page.tsx            # Lista de todos os produtos
│   │   └── [id]/page.tsx       # Detalhe de um produto
│   ├── carrinho/page.tsx       # Carrinho de compras
│   └── checkout/               # Pagamento e retorno do Stripe
├── componentes/
│   ├── navbar.tsx              # Menu superior com login e carrinho
│   ├── carousel.tsx            # Carrossel da home
│   ├── product-card.tsx        # Cartão de produto
│   ├── product-detail.tsx      # Detalhe do produto
│   ├── product-list.tsx        # Lista com busca
│   └── ui/                     # Componentes base (button, card)
├── lib/
│   └── stripe.ts               # Cliente do Stripe
├── store/
│   └── cart-store.ts           # Estado global do carrinho (Zustand)
└── proxy.ts                    # Proteção de rotas com Clerk
```

---

## 🔄 Como o projeto funciona

### Fluxo de compra

1. O visitante navega pelos produtos, que são buscados no Stripe pelo servidor.
2. Ao clicar em **+** na página do produto, o item vai para o carrinho (guardado no estado do Zustand).
3. No carrinho, ele revisa quantidades e valores.
4. Ao ir para o pagamento, é redirecionado ao **Stripe Checkout**.
5. Pagamento aprovado: volta para a página de sucesso, que **limpa o carrinho**.

### Login

- O botão **Entrar** no menu abre uma janela de login do Clerk.
- Depois de logado, o botão vira o **avatar** do usuário, com opção de sair.
- O arquivo `proxy.ts` define quais rotas exigem login. Hoje, a proteção está na rota de **checkout**.

### Preços

Os valores do Stripe vêm em **centavos**. Por isso o código divide por 100 antes de exibir. Para mostrar em reais (`R$ 10,00`), use a função `formatPrice` em `lib/format.ts`:

```ts
export function formatPrice(cents: number, currency = "brl") {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(cents / 100);
}
```

---

## 🎨 Como personalizar

- **Cores e tema:** edite as variáveis no `app/globals.css` (`--primary`, `--background`, etc.).
- **Nome da loja:** altere "Meu Ecommerce" no `componentes/navbar.tsx` e o `title` no `app/layout.tsx`.
- **Rotas protegidas:** edite a lista no `proxy.ts`:

```ts
const isProtected = createRouteMatcher(["/checkout(.*)"]);
```

- **Moeda:** defina no preço do produto no Stripe e, se usar `price_data` no código do checkout, em `currency: "brl"`.

---

## 🧩 Observações importantes

Este projeto usa recursos recentes do Next.js, e alguns pontos merecem atenção:

- **Cache Components:** páginas que buscam dados do Stripe precisam rodar dentro de `<Suspense>` e chamar `await connection()` antes da busca. Sem isso aparece o erro *"unstable value `Date.now()` while prerendering"*.
- **`params` assíncrono:** na página `[id]`, o `params` é uma Promise e precisa de `await`.
- **Objetos do Stripe em Client Components:** converta com `JSON.parse(JSON.stringify(obj))` antes de passar para componentes `"use client"`.
- **Clerk (Core 3):** use `<Show when="signed-in">` e `<Show when="signed-out">` no lugar de `SignedIn` e `SignedOut`.
- **Rotas:** os links devem usar `/produtos` (e não `/products`).

---

## 🛠️ Problemas comuns

| Problema | Provável causa e solução |
|---|---|
| Erro de `Date.now()` ao abrir `/produtos` | Falta `Suspense` e `await connection()` ao redor da busca no Stripe |
| Erro "Only plain objects can be passed to Client Components" | Converta o objeto do Stripe com `JSON.parse(JSON.stringify(...))` |
| 404 ao clicar em um produto | Link do `product-card.tsx` deve ser `/produtos/${product.id}` |
| 404 ao ir para o pagamento | Confira a URL do 404 e se a rota existe; pode ser a página de login do Clerk |
| Tela preta depois de um 404 | O CSS da página 404 padrão fica ativo; recarregue com F5 e crie um `app/not-found.tsx` |
| Menu ou ícones gigantes | Ícones do Heroicons precisam de `className="h-6 w-6"` |
| Login não aparece | Reinicie o servidor após criar o `.env.local` e confira o `proxy.ts` na raiz |

---

## 🗺️ Próximos passos

- [ ] Pedir login apenas no clique de **ir para o pagamento**
- [ ] Ligar o pedido ao usuário no Stripe (`customer_email` e `metadata`)
- [ ] Criar a página **Meus pedidos**
- [ ] Criar um `not-found.tsx` com o visual da loja
- [ ] Formatar todos os preços em reais com `formatPrice`
- [ ] Publicar na [Vercel](https://vercel.com)

---

## 📜 Scripts disponíveis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run start` | Executa a versão de produção |
| `npm run lint` | Verifica o código com o linter |

---

## 🤝 Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch: `git checkout -b feat/minha-melhoria`.
3. Faça o commit: `git commit -m "feat: descreve a melhoria"`.
4. Envie: `git push origin feat/minha-melhoria`.
5. Abra um Pull Request.

---

Feito com ☕ e Next.js.