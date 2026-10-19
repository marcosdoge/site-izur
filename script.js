/**
 * Izur - Engenharia de Software de Alta Performance
 * Web Components nativos encapsulados via Shadow DOM
 */

// Utilitário para rolagem suave entre Shadow DOM e Light DOM
function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// 1. NAVBAR COMPONENT
class IzurNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(7, 7, 9, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--gold-border, rgba(212, 175, 55, 0.2));
          transition: background var(--transition-fast, 0.2s);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.85rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          cursor: pointer;
        }
        .brand img {
          height: 38px;
          width: auto;
          filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.35));
        }
        .brand-text {
          font-family: var(--font-heading, 'Bahnschrift', sans-serif);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          background: var(--gold-gradient, linear-gradient(135deg, #FFF3C4, #D4AF37, #996515));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }
        .nav-link {
          color: var(--text-secondary, #94A3B8);
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover {
          color: var(--gold-light, #F5D77F);
        }
        .btn-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.35rem;
          border-radius: var(--radius-md, 14px);
          background: var(--gold-gradient, linear-gradient(135deg, #F5D77F, #D4AF37));
          color: #000000;
          font-family: var(--font-body, sans-serif);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.25);
        }
        .btn-cta:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.4);
        }
        .mobile-toggle {
          display: none;
          background: transparent;
          border: 1px solid var(--gold-border, rgba(212, 175, 55, 0.3));
          color: var(--gold-light, #F5D77F);
          border-radius: 8px;
          padding: 0.45rem 0.65rem;
          cursor: pointer;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: #0b0b12;
          border-bottom: 1px solid var(--gold-border, rgba(212, 175, 55, 0.3));
        }
        .mobile-menu.active {
          display: flex;
        }
        @media (max-width: 868px) {
          .nav-links, .btn-cta-desktop {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      </style>
      <div class="container">
        <a class="brand" id="brand-link">
          <img src="assets/images/logo-dourada.png" alt="Izur Logo">
          <span class="brand-text">IZUR</span>
        </a>
        <ul class="nav-links">
          <li><a class="nav-link" data-target="#solucoes">Soluções</a></li>
          <li><a class="nav-link" data-target="#tecnologias">Tecnologias</a></li>
          <li><a class="nav-link" data-target="#metodologia">Metodologia</a></li>
          <li><a class="nav-link" data-target="#contato">Diagnóstico</a></li>
        </ul>
        <a class="btn-cta btn-cta-desktop" data-target="#contato">Iniciar Projeto</a>
        <button class="mobile-toggle" aria-label="Abrir Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <a class="nav-link" data-target="#solucoes">Soluções</a>
        <a class="nav-link" data-target="#tecnologias">Tecnologias</a>
        <a class="nav-link" data-target="#metodologia">Metodologia</a>
        <a class="nav-link" data-target="#contato">Diagnóstico</a>
        <a class="btn-cta" data-target="#contato" style="justify-content: center;">Iniciar Projeto</a>
      </div>
    `;

    // Eventos de navegação
    this.shadowRoot.querySelectorAll('[data-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = el.getAttribute('data-target');
        scrollToSection(target);
        this.shadowRoot.getElementById('mobile-menu').classList.remove('active');
      });
    });

    this.shadowRoot.getElementById('brand-link').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toggle = this.shadowRoot.querySelector('.mobile-toggle');
    const menu = this.shadowRoot.getElementById('mobile-menu');
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
}
customElements.define('izur-navbar', IzurNavbar);

// 2. HERO COMPONENT
class IzurHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          overflow: hidden;
          padding: 6rem 1.5rem 5rem;
          background: 
            radial-gradient(circle at 50% 15%, rgba(212, 175, 55, 0.12) 0%, rgba(7, 7, 9, 0) 70%),
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px) 0 0 / 40px 40px,
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px) 0 0 / 40px 40px;
        }
        .container {
          max-width: 1040px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1.15rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid var(--gold-border, rgba(212, 175, 55, 0.3));
          color: var(--gold-light, #F5D77F);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }
        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--gold-primary, #D4AF37);
          box-shadow: 0 0 10px var(--gold-primary, #D4AF37);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .headline {
          font-family: var(--font-heading, 'Bahnschrift', sans-serif);
          font-size: clamp(2.25rem, 5vw, 3.85rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin-bottom: 1.5rem;
          max-width: 920px;
        }
        .gold-text {
          background: var(--gold-gradient, linear-gradient(135deg, #FFF3C4, #D4AF37, #996515));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .subheadline {
          color: var(--text-secondary, #94A3B8);
          font-size: clamp(1rem, 1.8vw, 1.18rem);
          line-height: 1.7;
          max-width: 720px;
          margin-bottom: 2.75rem;
          font-weight: 400;
        }
        .actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 4.5rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.95rem 2.2rem;
          border-radius: var(--radius-md, 14px);
          background: var(--gold-gradient, linear-gradient(135deg, #F5D77F, #D4AF37));
          color: #000000;
          font-family: var(--font-body, sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-decoration: none;
          cursor: pointer;
          border: none;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.28);
          transition: transform 0.25s, box-shadow 0.25s, filter 0.25s;
        }
        .btn-primary:hover {
          filter: brightness(1.12);
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(212, 175, 55, 0.42);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.95rem 2.2rem;
          border-radius: var(--radius-md, 14px);
          background: rgba(18, 18, 26, 0.7);
          color: var(--gold-light, #F5D77F);
          border: 1px solid var(--gold-border, rgba(212, 175, 55, 0.35));
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .btn-secondary:hover {
          background: rgba(28, 28, 40, 0.9);
          border-color: var(--gold-light, #F5D77F);
          transform: translateY(-2px);
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          width: 100%;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .metric-card {
          padding: 1.25rem;
          background: rgba(14, 14, 21, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md, 14px);
          text-align: left;
          transition: border-color 0.2s, transform 0.2s;
        }
        .metric-card:hover {
          border-color: var(--gold-border, rgba(212, 175, 55, 0.3));
          transform: translateY(-2px);
        }
        .metric-val {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.65rem;
          font-weight: 700;
          color: var(--gold-light, #F5D77F);
          margin-bottom: 0.25rem;
        }
        .metric-label {
          color: var(--text-secondary, #94A3B8);
          font-size: 0.8rem;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
      <div class="container">
        <div class="badge">
          <span class="pulse-dot"></span>
          Software House & Arquitetura Cloud Enterprise
        </div>
        <h1 class="headline">
          Engenharia de Software de <span class="gold-text">Alta Performance</span> para Negócios Visionários
        </h1>
        <p class="subheadline">
          Desenvolvemos plataformas web, aplicativos mobile, sistemas de missão crítica e inteligência artificial sob medida. Foco absoluto em código limpo, escalabilidade real e segurança por design.
        </p>
        <div class="actions">
          <button class="btn-primary" id="btn-hero-contact">
            <span>Solicitar Diagnóstico Técnico</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button class="btn-secondary" id="btn-hero-solutions">
            Explorar Soluções
          </button>
        </div>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-val">99.99%</div>
            <div class="metric-label">SLA & Disponibilidade</div>
          </div>
          <div class="metric-card">
            <div class="metric-val">Zero</div>
            <div class="metric-label">Dívida Técnica Conhecida</div>
          </div>
          <div class="metric-card">
            <div class="metric-val">OWASP Top 10</div>
            <div class="metric-label">Blindagem de Segurança</div>
          </div>
          <div class="metric-card">
            <div class="metric-val">Cloud Native</div>
            <div class="metric-label">Docker & Microsserviços</div>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('btn-hero-contact').addEventListener('click', () => {
      scrollToSection('#contato');
    });
    this.shadowRoot.getElementById('btn-hero-solutions').addEventListener('click', () => {
      scrollToSection('#solucoes');
    });
  }
}
customElements.define('izur-hero', IzurHero);

// 3. SOLUTIONS COMPONENT
class IzurSolutions extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 6rem 1.5rem;
          background: #09090e;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .container {
          max-width: 1140px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-primary, #D4AF37);
          margin-bottom: 0.5rem;
        }
        .title {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }
        .subtitle {
          color: var(--text-secondary, #94A3B8);
          font-size: 0.95rem;
          max-width: 580px;
          margin: 0 auto;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .card {
          padding: 2rem;
          background: #0e0e16;
          border: 1px solid var(--gold-border, rgba(212, 175, 55, 0.2));
          border-radius: var(--radius-lg, 20px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          position: relative;
        }
        .card:hover {
          transform: translateY(-5px);
          border-color: var(--gold-border-active, rgba(212, 175, 55, 0.65));
          box-shadow: 0 14px 35px -10px rgba(212, 175, 55, 0.2);
        }
        .icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md, 14px);
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-light, #F5D77F);
          margin-bottom: 1.5rem;
        }
        .card-title {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }
        .card:hover .card-title {
          color: var(--gold-light, #F5D77F);
        }
        .card-desc {
          color: var(--text-secondary, #94A3B8);
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tag-chip {
          font-size: 0.72rem;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          color: #CBD5E1;
        }
        @media (max-width: 960px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="container">
        <div class="header">
          <div class="tag">Nossas Capacidades</div>
          <h2 class="title">Soluções Sob Medida de Ponta a Ponta</h2>
          <p class="subtitle">Da concepção arquitetural ao deploy contínuo em ambientes de alta demanda operacional.</p>
        </div>
        <div class="grid">
          
          <div class="card">
            <div>
              <div class="icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </div>
              <h3 class="card-title">Sistemas Web & SaaS</h3>
              <p class="card-desc">Plataformas corporativas multi-tenant, painéis de gestão, portais de autoatendimento e aplicações ricas com Next.js, React e TypeScript.</p>
            </div>
            <div class="tags">
              <span class="tag-chip">Next.js</span>
              <span class="tag-chip">TypeScript</span>
              <span class="tag-chip">Tailwind</span>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
              </div>
              <h3 class="card-title">Arquitetura Cloud & Microsserviços</h3>
              <p class="card-desc">Infraestrutura em nuvem elástica, orquestração com Docker/Kubernetes, balanceamento inteligente e alta disponibilidade em Oracle Cloud e AWS.</p>
            </div>
            <div class="tags">
              <span class="tag-chip">Docker</span>
              <span class="tag-chip">OCI / AWS</span>
              <span class="tag-chip">CI/CD</span>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 class="card-title">Inteligência Artificial & Automação</h3>
              <p class="card-desc">Agentes autônomos, pipelines de RAG com bancos vetoriais, assistentes cognitivos sob medida e esteiras de automação de processos repetitivos.</p>
            </div>
            <div class="tags">
              <span class="tag-chip">LLMs</span>
              <span class="tag-chip">RAG / Vectors</span>
              <span class="tag-chip">Python</span>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </div>
              <h3 class="card-title">Aplicativos Mobile iOS & Android</h3>
              <p class="card-desc">Apps nativos e híbridos fluidos com foco em UX, consumo eficiente de bateria, operação offline-first e publicação assistida na App Store e Play Store.</p>
            </div>
            <div class="tags">
              <span class="tag-chip">React Native</span>
              <span class="tag-chip">Flutter</span>
              <span class="tag-chip">iOS / Android</span>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <h3 class="card-title">APIs de Alta Performance</h3>
              <p class="card-desc">Gateways de mensageria (Kafka/RabbitMQ), barramentos de microsserviços, cache distribuído com Redis e endpoints com latência sub-milisegundo.</p>
            </div>
            <div class="tags">
              <span class="tag-chip">Node.js</span>
              <span class="tag-chip">Go</span>
              <span class="tag-chip">Redis</span>
            </div>
          </div>

          <div class="card">
            <div>
              <div class="icon-box">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <h3 class="card-title">Modernização de Legados & DevSecOps</h3>
              <p class="card-desc">Refatoração estratégica de monólitos antigos para microsserviços modernos, automação de testes unitários e auditoria com checklist OWASP.</p>
            </div>
            <div class="tags">
              <span class="tag-chip">DevSecOps</span>
              <span class="tag-chip">Refactoring</span>
              <span class="tag-chip">Security</span>
            </div>
          </div>

        </div>
      </div>
    `;
  }
}
customElements.define('izur-solutions', IzurSolutions);

// 4. STACK COMPONENT
class IzurStack extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 6rem 1.5rem;
          background: #070709;
        }
        .container {
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
        }
        .tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-primary, #D4AF37);
          margin-bottom: 0.5rem;
        }
        .title {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(2rem, 3.5vw, 2.5rem);
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 2.5rem;
        }
        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .filter-btn {
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-sm, 8px);
          background: #12121b;
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-secondary, #94A3B8);
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover {
          color: #FFFFFF;
          border-color: var(--gold-border, rgba(212, 175, 55, 0.3));
        }
        .filter-btn.active {
          background: var(--gold-primary, #D4AF37);
          color: #000000;
          border-color: var(--gold-primary, #D4AF37);
        }
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .stack-item {
          padding: 1.25rem;
          background: #0c0c14;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md, 14px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          transition: transform 0.2s, border-color 0.2s;
        }
        .stack-item:hover {
          transform: translateY(-3px);
          border-color: var(--gold-border, rgba(212, 175, 55, 0.35));
        }
        .tech-name {
          font-weight: 700;
          color: #FFFFFF;
          font-size: 0.95rem;
        }
        .tech-desc {
          color: var(--text-muted, #64748B);
          font-size: 0.75rem;
        }
        @media (max-width: 800px) {
          .stack-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
      <div class="container">
        <div class="tag">Tecnologias Validadas</div>
        <h2 class="title">Construído com as Melhores Ferramentas do Mercado</h2>
        <div class="filter-bar">
          <button class="filter-btn active" data-cat="all">Todas</button>
          <button class="filter-btn" data-cat="frontend">Frontend</button>
          <button class="filter-btn" data-cat="backend">Backend</button>
          <button class="filter-btn" data-cat="cloud">Cloud & DevOps</button>
          <button class="filter-btn" data-cat="data">Dados & IA</button>
        </div>
        <div class="stack-grid" id="stack-grid">
          <div class="stack-item" data-cat="frontend">
            <span class="tech-name">React / Next.js</span>
            <span class="tech-desc">SSR & Alta Performance</span>
          </div>
          <div class="stack-item" data-cat="frontend">
            <span class="tech-name">TypeScript</span>
            <span class="tech-desc">Tipagem Estrita</span>
          </div>
          <div class="stack-item" data-cat="frontend">
            <span class="tech-name">Tailwind CSS</span>
            <span class="tech-desc">Design System Ágil</span>
          </div>
          <div class="stack-item" data-cat="backend">
            <span class="tech-name">Node.js / Express</span>
            <span class="tech-desc">Microsserviços Event-Driven</span>
          </div>
          <div class="stack-item" data-cat="backend">
            <span class="tech-name">Golang</span>
            <span class="tech-desc">Concorrência de Baixa Latência</span>
          </div>
          <div class="stack-item" data-cat="backend">
            <span class="tech-name">Python</span>
            <span class="tech-desc">IA, Scripts & APIs</span>
          </div>
          <div class="stack-item" data-cat="cloud">
            <span class="tech-name">Docker & K8s</span>
            <span class="tech-desc">Conteinerização Total</span>
          </div>
          <div class="stack-item" data-cat="cloud">
            <span class="tech-name">Oracle Cloud / AWS</span>
            <span class="tech-desc">Infraestrutura Confiável</span>
          </div>
          <div class="stack-item" data-cat="cloud">
            <span class="tech-name">CI/CD Pipelines</span>
            <span class="tech-desc">Deploy Automatizado</span>
          </div>
          <div class="stack-item" data-cat="data">
            <span class="tech-name">PostgreSQL</span>
            <span class="tech-desc">ACID & Alta Integridade</span>
          </div>
          <div class="stack-item" data-cat="data">
            <span class="tech-name">Redis</span>
            <span class="tech-desc">Cache & Filas Rápidas</span>
          </div>
          <div class="stack-item" data-cat="data">
            <span class="tech-name">Vector DBs (Qdrant/Pinecone)</span>
            <span class="tech-desc">Embeddings para IA</span>
          </div>
        </div>
      </div>
    `;

    const buttons = this.shadowRoot.querySelectorAll('.filter-btn');
    const items = this.shadowRoot.querySelectorAll('.stack-item');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        items.forEach(item => {
          if (cat === 'all' || item.getAttribute('data-cat') === cat) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}
customElements.define('izur-stack', IzurStack);

// 5. METHODOLOGY COMPONENT
class IzurMethodology extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 6rem 1.5rem;
          background: #09090f;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .container {
          max-width: 1040px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-primary, #D4AF37);
          margin-bottom: 0.5rem;
        }
        .title {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .pillar {
          padding: 2.25rem;
          background: #0d0d16;
          border: 1px solid var(--gold-border, rgba(212, 175, 55, 0.2));
          border-radius: var(--radius-lg, 20px);
          position: relative;
        }
        .pillar-num {
          font-family: var(--font-heading, sans-serif);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--gold-primary, #D4AF37);
          opacity: 0.35;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .pillar-title {
          font-family: var(--font-heading, sans-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }
        .pillar-desc {
          color: var(--text-secondary, #94A3B8);
          font-size: 0.875rem;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="container">
        <div class="header">
          <div class="tag">Padrão de Engenharia</div>
          <h2 class="title">Como a Izur Garante Software Resiliente</h2>
        </div>
        <div class="grid">
          <div class="pillar">
            <div class="pillar-num">01</div>
            <h3 class="pillar-title">Clean Architecture & DDD</h3>
            <p class="pillar-desc">Isolamento de regras de negócio, baixo acoplamento e alta coesão. Seu software nasce preparado para evoluir sem criar dívida técnica sufocante.</p>
          </div>
          <div class="pillar">
            <div class="pillar-num">02</div>
            <h3 class="pillar-title">DevSecOps por Padrão</h3>
            <p class="pillar-desc">Auditorias automatizadas em pipelines de integração, análise estática de código (SAST) e validação estrita contra o Top 10 OWASP em todas as camadas.</p>
          </div>
          <div class="pillar">
            <div class="pillar-num">03</div>
            <h3 class="pillar-title">Sprints Transparentes & Entregas Contínuas</h3>
            <p class="pillar-desc">Sem surpresas no final. Você acompanha protótipos funcionais, commits atômicos e relatórios técnicos a cada ciclo de desenvolvimento.</p>
          </div>
          <div class="pillar">
            <div class="pillar-num">04</div>
            <h3 class="pillar-title">Observabilidade & Alta Disponibilidade</h3>
            <p class="pillar-desc">Métricas de telemetria, logs estruturados e monitoramento em tempo real para garantir que sua aplicação opere dentro do SLA contratado.</p>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('izur-methodology', IzurMethodology);

// 6. CONTACT / LEAD COMPONENT
class IzurContact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 6rem 1.5rem;
          background: #070709;
          position: relative;
        }
        .container {
          max-width: 780px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .tag {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-primary, #D4AF37);
          margin-bottom: 0.5rem;
        }
        .title {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }
        .subtitle {
          color: var(--text-secondary, #94A3B8);
          font-size: 0.95rem;
        }
        .form-card {
          padding: 2.5rem;
          background: #0d0d16;
          border: 1px solid var(--gold-border, rgba(212, 175, 55, 0.25));
          border-radius: var(--radius-lg, 20px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.25rem;
        }
        .label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #CBD5E1;
        }
        .input, .select, .textarea {
          width: 100%;
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius-sm, 8px);
          background: #141420;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus, .select:focus, .textarea:focus {
          border-color: var(--gold-primary, #D4AF37);
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.2);
        }
        .textarea {
          resize: vertical;
          min-height: 95px;
        }
        .btn-submit {
          width: 100%;
          padding: 1rem;
          border-radius: var(--radius-md, 14px);
          background: var(--gold-gradient, linear-gradient(135deg, #F5D77F, #D4AF37));
          color: #000000;
          font-family: var(--font-body, sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.25);
          transition: transform 0.2s, filter 0.2s;
        }
        .btn-submit:hover {
          filter: brightness(1.12);
          transform: translateY(-2px);
        }
        .feedback {
          display: none;
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: var(--gold-light, #F5D77F);
          font-size: 0.8125rem;
          text-align: center;
        }
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .form-card {
            padding: 1.5rem;
          }
        }
      </style>
      <div class="container">
        <div class="header">
          <div class="tag">Dê o Primeiro Passo</div>
          <h2 class="title">Inicie Seu Projeto com a Izur</h2>
          <p class="subtitle">Receba uma análise arquitetural preliminar e proposta sob medida sem custos iniciais.</p>
        </div>
        <form class="form-card" id="contact-form">
          <div class="form-row">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="label">Seu Nome *</label>
              <input type="text" class="input" id="name" required placeholder="Ex: Marcos Souza">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="label">Empresa / Projeto</label>
              <input type="text" class="input" id="company" placeholder="Ex: Izur Tech">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="label">E-mail Corporativo *</label>
              <input type="email" class="input" id="email" required placeholder="voce@empresa.com">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="label">WhatsApp / Telefone *</label>
              <input type="tel" class="input" id="phone" required placeholder="(00) 00000-0000">
            </div>
          </div>
          <div class="form-group">
            <label class="label">Tipo de Solução Pretendida</label>
            <select class="select" id="solution-type">
              <option value="Sistema Web / SaaS Sob Medida">Sistema Web / Plataforma SaaS Sob Medida</option>
              <option value="Aplicativo Mobile iOS & Android">Aplicativo Mobile iOS & Android</option>
              <option value="Arquitetura Cloud & Microsserviços">Arquitetura Cloud & Microsserviços</option>
              <option value="Inteligência Artificial & Automação">Inteligência Artificial & Automação</option>
              <option value="Consultoria Técnica & Refatoração">Consultoria Técnica & Refatoração de Legado</option>
            </select>
          </div>
          <div class="form-group">
            <label class="label">Resumo do Desafio / Escopo</label>
            <textarea class="textarea" id="message" placeholder="Conte brevemente sobre o prazo estimado, tecnologias preferidas ou objetivos da solução..."></textarea>
          </div>
          <button type="submit" class="btn-submit">
            <span>Enviar Mensagem para WhatsApp Oficial</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1 .587 1.761.883 2.806.883 3.182 0 5.768-2.586 5.768-5.766.001-3.182-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.495 10-10 10-1.745 0-3.376-.452-4.801-1.242l-5.2 1.36 1.385-5.056c-.899-1.492-1.384-3.208-1.384-5.062 0-5.505 4.495-10 10-10 5.505 0 10 4.495 10 10z"/></svg>
          </button>
          <div class="feedback" id="feedback-msg"></div>
        </form>
      </div>
    `;

    const form = this.shadowRoot.getElementById('contact-form');
    const feedback = this.shadowRoot.getElementById('feedback-msg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = this.shadowRoot.getElementById('name').value.trim();
      const company = this.shadowRoot.getElementById('company').value.trim() || 'Não informado';
      const email = this.shadowRoot.getElementById('email').value.trim();
      const phone = this.shadowRoot.getElementById('phone').value.trim();
      const type = this.shadowRoot.getElementById('solution-type').value;
      const msg = this.shadowRoot.getElementById('message').value.trim() || 'Gostaria de agendar um diagnóstico.';

      const text = `Olá Izur! Meu nome é ${name} (${company}).%0A%0A*Tipo de Solução:* ${type}%0A*E-mail:* ${email}%0A*Telefone:* ${phone}%0A*Desafio:* ${msg}`;
      const waUrl = `https://api.whatsapp.com/send?text=${text}`;

      feedback.textContent = '✓ Dados validados com sucesso! Abrindo WhatsApp oficial...';
      feedback.style.display = 'block';

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 500);
    });
  }
}
customElements.define('izur-contact', IzurContact);

// 7. FOOTER COMPONENT
class IzurFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 3rem 1.5rem;
          background: #050507;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .brand-col {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .brand-col img {
          height: 28px;
          width: auto;
        }
        .copy {
          color: var(--text-muted, #64748B);
          font-size: 0.8125rem;
        }
        .server-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary, #94A3B8);
          font-size: 0.8125rem;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }
      </style>
      <div class="container">
        <div class="brand-col">
          <img src="assets/images/logo-dourada.png" alt="Izur">
          <span class="copy">IZUR &copy; 2026. Todos os direitos reservados.</span>
        </div>
        <div class="server-status">
          <span class="status-dot"></span>
          <span>Oracle Cloud VM (137.131.237.135) • Status: Operacional</span>
        </div>
      </div>
    `;
  }
}
customElements.define('izur-footer', IzurFooter);
