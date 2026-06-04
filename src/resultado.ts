import './style.css';

// ============================================================
// BIOPSICOSSOCIAL — Resultado Freemium
// Dimensão Biológica: VISÍVEL | Psico + Social: BLOQUEADAS
// ============================================================

interface Scores { bio: number; psico: number; social: number; }
interface ResultData { scores: Scores; overall: number; answers: Record<string, number>; date: string; }

function getLabel(score: number): string {
  if (score >= 80) return 'Muito Bom';
  if (score >= 65) return 'Bom';
  if (score >= 45) return 'Moderado';
  if (score >= 30) return 'Atenção';
  return 'Crítico';
}

function getColor(score: number): string {
  if (score >= 80) return '#168821';
  if (score >= 65) return '#2670E8';
  if (score >= 45) return '#D4A017';
  return '#C41E3A';
}

function getBioInterpretation(score: number): string {
  if (score >= 80) return 'Sua saúde física apresenta excelentes indicadores. Sono, energia e disposição estão em equilíbrio. Continue mantendo seus hábitos de cuidado com o corpo.';
  if (score >= 65) return 'Sua dimensão biológica está em bom estado, com pequenas oportunidades de melhora. Atenção especial ao sono e aos hábitos de atividade física pode elevar ainda mais sua vitalidade.';
  if (score >= 45) return 'Sua saúde física apresenta sinais de atenção. Alguns fatores como qualidade do sono, energia ou regularidade de hábitos podem estar impactando seu bem-estar geral.';
  return 'Sua dimensão biológica indica a necessidade de atenção prioritária. Sintomas físicos, baixa energia ou hábitos irregulares estão comprometendo sua saúde de forma significativa.';
}

function getBioActions(score: number): string[] {
  if (score >= 80) return [
    'Mantenha a rotina de atividade física atual',
    'Continue priorizando 7–9h de sono de qualidade',
    'Faça checkup médico anual como prevenção'
  ];
  if (score >= 65) return [
    'Implemente uma rotina de sono com horários fixos',
    'Adicione 30 min de caminhada 3× por semana',
    'Revise a qualidade da sua alimentação diária'
  ];
  if (score >= 45) return [
    'Consulte um médico para avaliação do seu estado físico',
    'Priorize o sono como intervenção imediata',
    'Reduza sedentarismo: comece com pequenas caminhadas',
    'Avalie e corrija déficits nutricionais com profissional'
  ];
  return [
    '⚠️ Procure atendimento médico em curto prazo',
    'Trate o sono como urgência de saúde',
    'Identifique e reduza fatores que drenam sua energia',
    'Considere acompanhamento profissional especializado'
  ];
}

// ── Render ──────────────────────────────────────────────────────
function render() {
  const raw = localStorage.getItem('bio_resultado');
  const root = document.getElementById('resultado-root')!;

  if (!raw) {
    root.innerHTML = `
      <div class="resultado-error">
        <div class="error-icon">⚠️</div>
        <h2>Nenhuma avaliação encontrada</h2>
        <p>Você precisa completar a avaliação antes de ver seus resultados.</p>
        <a href="/avaliacao.html" class="btn-cta-red">Fazer Avaliação Agora →</a>
      </div>`;
    return;
  }

  const data: ResultData = JSON.parse(raw);
  const { scores, overall } = data;
  const bioLabel   = getLabel(scores.bio);
  const bioColor   = getColor(scores.bio);
  const bioActions = getBioActions(scores.bio);
  const bioInterp  = getBioInterpretation(scores.bio);
  const date       = new Date(data.date).toLocaleDateString('pt-BR');

  root.innerHTML = `
    <!-- HEADER -->
    <div class="resultado-header">
      <div class="resultado-header-inner">
        <div class="resultado-logo">
          <a href="/" class="resultado-logo-link">
            <div class="logo-icon-sm"></div>
            <span>Biopsicossocial</span>
          </a>
        </div>
        <div class="resultado-badge">Avaliação de ${date}</div>
      </div>
    </div>

    <!-- HERO DO RESULTADO -->
    <div class="resultado-hero">
      <div class="resultado-container">
        <h1>Seu Mapa de Saúde Biopsicossocial</h1>
        <p class="resultado-hero-sub">Avaliação completa nas 3 dimensões da saúde humana</p>

        <!-- MINI SCORES TOP -->
        <div class="scores-overview">
          <div class="score-pill score-pill-bio">
            🔴 Biológica <strong>${scores.bio}/100</strong>
          </div>
          <div class="score-pill score-pill-locked">
            🔵 Psicológica <strong>🔒</strong>
          </div>
          <div class="score-pill score-pill-locked">
            🟢 Social <strong>🔒</strong>
          </div>
        </div>

        <!-- OVERALL LOCKED -->
        <div class="overall-locked">
          <div class="overall-locked-icon">🔒</div>
          <div>
            <div class="overall-locked-label">Índice de Saúde Integral</div>
            <div class="overall-locked-value">Desbloqueie para ver</div>
          </div>
          <a href="#upgrade" class="btn-unlock-sm">Desbloquear</a>
        </div>
      </div>
    </div>

    <div class="resultado-container resultado-body">

      <!-- ✅ DIMENSÃO BIOLÓGICA — VISÍVEL -->
      <div class="dim-card dim-card-visible">
        <div class="dim-card-header" style="--dim-color:#C41E3A">
          <div class="dim-card-icon" style="color:#C41E3A">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </div>
          <div>
            <div class="dim-card-tag">🔴 Dimensão Biológica</div>
            <div class="dim-card-name">Corpo e Saúde Física</div>
          </div>
          <div class="dim-score-badge" style="background:#FEF2F2;color:#C41E3A;border:2px solid #C41E3A">
            ${scores.bio}/100
          </div>
        </div>

        <!-- Barra de progresso -->
        <div class="dim-progress-track">
          <div class="dim-progress-fill" style="width:${scores.bio}%;background:#C41E3A" id="bio-bar"></div>
        </div>
        <div class="dim-progress-labels">
          <span>Crítico</span><span>Atenção</span><span>Moderado</span><span>Bom</span><span>Muito Bom</span>
        </div>

        <!-- Label classificação -->
        <div class="dim-classification" style="background:${getColor(scores.bio)}20;border:1px solid ${getColor(scores.bio)}40;color:${getColor(scores.bio)}">
          <span>●</span> Classificação: <strong>${bioLabel}</strong>
        </div>

        <!-- Interpretação -->
        <div class="dim-interpretation">
          <h4>O que isso significa para você</h4>
          <p>${bioInterp}</p>
        </div>

        <!-- Ações -->
        <div class="dim-actions">
          <h4>Recomendações para sua Dimensão Biológica</h4>
          <ul>
            ${bioActions.map(a => `<li><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M16.667 5L7.5 14.167 3.333 10" stroke="#C41E3A" stroke-width="2.5" stroke-linecap="round"/></svg>${a}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- 🔒 DIMENSÃO PSICOLÓGICA — BLOQUEADA -->
      <div class="dim-card dim-card-locked">
        <div class="dim-card-header" style="--dim-color:#1351B4">
          <div class="dim-card-icon" style="color:#1351B4;opacity:0.4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </div>
          <div>
            <div class="dim-card-tag" style="opacity:0.5">🔵 Dimensão Psicológica</div>
            <div class="dim-card-name" style="opacity:0.5">Mente e Saúde Emocional</div>
          </div>
          <div class="dim-score-badge locked-badge">
            🔒 Bloqueado
          </div>
        </div>

        <!-- Barra bloqueada -->
        <div class="dim-progress-track locked-track">
          <div class="locked-bar-fill"></div>
        </div>

        <!-- Lock overlay -->
        <div class="lock-overlay">
          <div class="lock-icon">🔒</div>
          <h3>Dimensão Psicológica Bloqueada</h3>
          <p>Sua pontuação, interpretação e recomendações personalizadas para saúde mental estão disponíveis no plano <strong>Essencial</strong>.</p>
          <a href="#upgrade" class="btn-unlock">Desbloquear por R$29/mês</a>
        </div>
      </div>

      <!-- 🔒 DIMENSÃO SOCIAL — BLOQUEADA -->
      <div class="dim-card dim-card-locked">
        <div class="dim-card-header" style="--dim-color:#168821">
          <div class="dim-card-icon" style="color:#168821;opacity:0.4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </div>
          <div>
            <div class="dim-card-tag" style="opacity:0.5">🟢 Dimensão Social</div>
            <div class="dim-card-name" style="opacity:0.5">Contexto e Relações Sociais</div>
          </div>
          <div class="dim-score-badge locked-badge">
            🔒 Bloqueado
          </div>
        </div>

        <div class="dim-progress-track locked-track">
          <div class="locked-bar-fill"></div>
        </div>

        <div class="lock-overlay">
          <div class="lock-icon">🔒</div>
          <h3>Dimensão Social Bloqueada</h3>
          <p>Veja como seus relacionamentos, trabalho, renda e ambiente social impactam sua saúde — disponível no plano <strong>Essencial</strong>.</p>
          <a href="#upgrade" class="btn-unlock">Desbloquear por R$29/mês</a>
        </div>
      </div>

      <!-- 🔒 ÍNDICE GERAL + PLANO DE AÇÃO — BLOQUEADOS -->
      <div class="overall-block dim-card dim-card-locked">
        <div class="lock-overlay lock-overlay-flat">
          <div class="lock-icon">🔒</div>
          <h3>Índice de Saúde Integral + Plano de Ação Personalizado</h3>
          <p>O índice que combina suas 3 dimensões e um plano de ação concreto com prioridades para os próximos 30, 60 e 90 dias — tudo gerado pela IA com base exatamente nas suas respostas.</p>
        </div>
      </div>

      <!-- ✅ SEÇÃO DE UPGRADE -->
      <div class="upgrade-section" id="upgrade">
        <div class="upgrade-header">
          <h2>Desbloqueie seu Mapa Completo</h2>
          <p>Veja o que você ainda não pode ver sobre sua saúde</p>
        </div>

        <div class="upgrade-what-you-get">
          <div class="upgrade-item locked-item">🔵 <span>Pontuação + interpretação da Dimensão Psicológica</span></div>
          <div class="upgrade-item locked-item">🟢 <span>Pontuação + interpretação da Dimensão Social</span></div>
          <div class="upgrade-item locked-item">📊 <span>Índice de Saúde Integral (combinação das 3 dimensões)</span></div>
          <div class="upgrade-item locked-item">🎯 <span>Plano de ação personalizado por IA (30/60/90 dias)</span></div>
          <div class="upgrade-item locked-item">📈 <span>Histórico de evolução mês a mês</span></div>
          <div class="upgrade-item locked-item">👨‍⚕️ <span>Indicação de especialistas adequados ao seu perfil</span></div>
          <div class="upgrade-item locked-item">📄 <span>Relatório PDF completo para compartilhar</span></div>
        </div>

        <div class="upgrade-plans">
          <div class="upgrade-plan plan-essential">
            <div class="plan-badge-top">Mais escolhido</div>
            <div class="plan-title">Essencial</div>
            <div class="plan-desc">Para você cuidar de verdade da sua saúde integral</div>
            <div class="plan-price">
              <span class="plan-currency">R$</span>
              <span class="plan-amount">29</span>
              <span class="plan-period">/mês</span>
            </div>
            <ul class="plan-features">
              <li>✅ Mapa completo nas 3 dimensões</li>
              <li>✅ Avaliações mensais ilimitadas</li>
              <li>✅ Plano de ação por IA</li>
              <li>✅ Histórico de evolução</li>
              <li>✅ Relatório PDF</li>
              <li>✅ Indicação de especialistas</li>
            </ul>
            <a href="/" class="btn-upgrade-primary" onclick="trackUpgrade('essencial')">
              Desbloquear Agora — R$29/mês
            </a>
            <p class="plan-note">Cancele quando quiser. Sem fidelidade.</p>
          </div>

          <div class="upgrade-plan plan-professional">
            <div class="plan-title">Profissional</div>
            <div class="plan-desc">Para psicólogos, assistentes sociais e profissionais de saúde</div>
            <div class="plan-price">
              <span class="plan-currency">R$</span>
              <span class="plan-amount">97</span>
              <span class="plan-period">/mês</span>
            </div>
            <ul class="plan-features">
              <li>✅ Tudo do plano Essencial</li>
              <li>✅ Laudos em formato CIF/OMS</li>
              <li>✅ Válido para INSS e Judiciário</li>
              <li>✅ Dashboard de até 30 pacientes</li>
              <li>✅ Perfil no marketplace</li>
            </ul>
            <a href="/" class="btn-upgrade-secondary" onclick="trackUpgrade('profissional')">
              Sou Profissional de Saúde →
            </a>
          </div>
        </div>

        <div class="upgrade-guarantee">
          🔒 Pagamento seguro · Cancele a qualquer momento · Dados protegidos pela LGPD
        </div>
      </div>

      <!-- Refazer avaliação -->
      <div class="resultado-footer-actions">
        <a href="/avaliacao.html" class="btn-redo">← Refazer Avaliação</a>
        <a href="/" class="btn-home">Página Inicial</a>
      </div>

    </div><!-- /container -->
  `;

  // Animate bio bar
  setTimeout(() => {
    const bar = document.getElementById('bio-bar');
    if (bar) {
      bar.style.width = '0%';
      bar.style.transition = 'none';
      setTimeout(() => {
        bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        bar.style.width = scores.bio + '%';
      }, 100);
    }
  }, 300);

  (window as any).trackUpgrade = function(plan: string) {
    console.log('Upgrade clicked:', plan);
  };
}

render();
