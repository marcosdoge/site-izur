# Arquitetura do Sistema - Site Izur

## Visão Geral
Landing page institucional da Izur — Engenharia e Desenvolvimento de Software sob Medida.

## Arquitetura de Software
- **Padrão**: 100% Vanilla HTML5, CSS3 e JavaScript Moderno (ES2022+).
- **Componentização**: Web Components Nativos padrão W3C (`customElements.define`) encapsulados com **Shadow DOM** (`attachShadow({ mode: 'open' })`).
- **Arquivos Core**:
  1. `index.html`: Entry point semântico, SEO/OpenGraph, orquestração de tags de componentes.
  2. `style.css`: Design tokens globais, paleta Black & Gold, tipografia (*Bahnschrift*, *Plus Jakarta Sans*, *Syne*) e resets.
  3. `script.js`: Implementação de cada Custom Element com estilos encapsulados e regras de negócio.
- **Identidade Visual**: Fundo preto profundo (*obsidian* `#070709`), acentos em ouro metálico (`#D4AF37`, `#F5D77F`, `#996515`), glassmorphism e iluminação radial sutil.

## Infraestrutura & Servidor
- **Host**: Oracle Cloud Infrastructure (OCI) Compute x86 Micro.
- **IP Público**: `137.131.237.135`
- **Acesso Seguro (ZeroTier VPN)**: `192.168.194.100` (interface `ztfp6miizq`)
- **Domínio de Produção**: `https://izur.com.br` com SSL/TLS ativo (Let's Encrypt / Certbot).
- **Servidor Web**: Nginx 1.24+ com compressão Gzip, cache de ativos e cabeçalhos de segurança (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- **Deploy**: Script automatizado via SSH/SCP em `tools_antigravity/deploy/deploy.ps1`.
