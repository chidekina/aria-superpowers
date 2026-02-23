---
name: react-antd-setup
description: "Gera a estrutura completa de um projeto ReactJS configurado e pronto para usar Ant Design. Triggers on: /react-antd-setup, 'criar projeto react ant design', 'setup react antd'."
user-invocable: true
tags: [react, antdesign, frontend, scaffold, javascript, typescript]
requires: []
---

# React + Ant Design Setup

Cria um projeto ReactJS totalmente configurado e pronto para usar com Ant Design.

---

## Uso

```
/react-antd-setup                        # Projeto React + AntD padrão com JavaScript
/react-antd-setup --typescript           # Projeto com TypeScript
/react-antd-setup --router               # Inclui React Router DOM configurado
/react-antd-setup --layout               # Inclui layout base com Sider, Header e Content
/react-antd-setup --completo             # Tudo: TypeScript + Router + Layout + tema customizado
```

## O que ela faz

- **Passo 1:** Exibe o comando para criar o projeto via Vite (padrão recomendado para projetos React modernos), com o template correto (JS ou TS conforme a opção).
- **Passo 2:** Lista os pacotes a instalar: `antd`, `@ant-design/icons` e, se solicitado, `react-router-dom`.
- **Passo 3:** Gera o arquivo de entrada `main.jsx` (ou `main.tsx`) configurado com o `ConfigProvider` do Ant Design para suporte ao tema e locale em português.
- **Passo 4:** Gera um `App.jsx` inicial limpo, já importando componentes do Ant Design como demonstração.
- **Passo 5:** Gera o arquivo de tema customizado `theme/token.js` com os principais design tokens do AntD prontos para personalizar (cores, bordas, tipografia).
- **Passo 6:** Se `--router` for usado, gera a estrutura de rotas com `BrowserRouter`, incluindo páginas de exemplo e uma rota 404.
- **Passo 7:** Se `--layout` for usado, gera o componente `MainLayout` com `Layout`, `Sider`, `Header`, `Content` e `Menu` do Ant Design, já responsivo com colapso do menu lateral.
- **Passo 8:** Apresenta a estrutura final de pastas do projeto gerado.

---

## Exemplo

**Prompt:**
> /react-antd-setup --completo

**O Claude vai:**

1. Exibir o comando de criação do projeto:

```bash
npm create vite@latest meu-projeto -- --template react-ts
cd meu-projeto
npm install
npm install antd @ant-design/icons react-router-dom
```

2. Gerar o `main.tsx` com ConfigProvider:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import theme from './theme/token'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ptBR} theme={theme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```

3. Gerar o arquivo de tema `src/theme/token.ts`:

```ts
import { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    borderRadius: 6,
    fontFamily: 'Inter, sans-serif',
  },
}

export default theme
```

4. Gerar o `MainLayout.tsx` com Sider, Header e Content:

```tsx
import { useState } from 'react'
import { Layout, Menu, Button, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = theme.useToken()
  const navigate = useNavigate()

  const items = [
    { key: '/', icon: <HomeOutlined />, label: 'Início' },
    { key: '/config', icon: <SettingOutlined />, label: 'Configurações' },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.1)' }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: token.colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content style={{ margin: 24, padding: 24, background: token.colorBgContainer, borderRadius: token.borderRadius }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
```

5. Gerar o `App.tsx` com as rotas configuradas:

```tsx
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
```

6. Entregar a estrutura final de pastas:

```
meu-projeto/
├── public/
├── src/
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── theme/
│   │   └── token.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
└── package.json
```

---

## Regras e convenções seguidas

- O projeto é criado com **Vite** como bundler (mais rápido que Create React App)
- O `ConfigProvider` envolve toda a aplicação para garantir tema e locale globais
- O locale padrão é **pt-BR** (Português do Brasil)
- Os design tokens do tema ficam isolados em `src/theme/token.ts` para fácil manutenção
- O layout usa `theme.useToken()` para herdar as cores do tema configurado, sem valores hardcoded
- O `index.css` remove margens padrão do browser e importa a fonte configurada no tema
- Compatível com **Ant Design v5+**
