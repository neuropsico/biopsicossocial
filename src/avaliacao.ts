import './style.css';

// ============================================================
// BIOPSICOSSOCIAL — Avaliação Freemium (24 perguntas / 3 dimensões)
// ============================================================

// ── Perguntas ─────────────────────────────────────────────────
const QUESTIONS = {
  bio: [
    { id: 'b1', text: 'Como você avaliaria a qualidade do seu sono nos últimos 30 dias?', labels: ['Muito ruim','Ruim','Regular','Bom','Excelente'] },
    { id: 'b2', text: 'Com que frequência você pratica atividade física?', labels: ['Nunca','Raramente','Às vezes','Frequentemente','Sempre'] },
    { id: 'b3', text: 'Como você descreveria sua alimentação habitualmente?', labels: ['Muito irregular','Irregular','Regular','Equilibrada','Muito equilibrada'] },
    { id: 'b4', text: 'Com que frequência sente dores físicas que limitam suas atividades?', labels: ['Sempre','Frequentemente','Às vezes','Raramente','Nunca'] },
    { id: 'b5', text: 'Como você avaliaria seu nível de energia e disposição diária?', labels: ['Muito baixo','Baixo','Moderado','Bom','Excelente'] },
    { id: 'b6', text: 'Com que frequência você realiza consultas médicas preventivas?', labels: ['Nunca','Raramente','Às vezes','Regularmente','Sempre'] },
    { id: 'b7', text: 'Nos últimos 30 dias, como tem sido sua disposição para atividades cotidianas?', labels: ['Nenhuma','Muito baixa','Moderada','Boa','Excelente'] },
    { id: 'b8', text: 'Como você avaliaria seu estado de saúde física geral?', labels: ['Muito ruim','Ruim','Regular','Bom','Excelente'] },
  ],
  psico: [
    { id: 'p1', text: 'Com que frequência você se sente ansioso ou preocupado sem motivo claro?', labels: ['Sempre','Frequentemente','Às vezes','Raramente','Nunca'] },
    { id: 'p2', text: 'Como você avaliaria seu humor geral nos últimos 30 dias?', labels: ['Muito ruim','Ruim','Regular','Bom','Excelente'] },
    { id: 'p3', text: 'Você tem conseguido se concentrar nas suas atividades?', labels: ['Nunca','Raramente','Às vezes','Frequentemente','Sempre'] },
    { id: 'p4', text: 'Com que frequência você se sente sobrecarregado ou esgotado emocionalmente?', labels: ['Sempre','Frequentemente','Às vezes','Raramente','Nunca'] },
    { id: 'p5', text: 'Como você avaliaria sua autoestima atualmente?', labels: ['Muito baixa','Baixa','Moderada','Boa','Muito boa'] },
    { id: 'p6', text: 'Você consegue ter momentos de prazer e lazer na sua vida?', labels: ['Nunca','Raramente','Às vezes','Frequentemente','Sempre'] },
    { id: 'p7', text: 'Com que frequência tem pensamentos negativos sobre si mesmo ou sobre o futuro?', labels: ['Sempre','Frequentemente','Às vezes','Raramente','Nunca'] },
    { id: 'p8', text: 'Como avaliaria sua capacidade de lidar com situações difíceis e adversidades?', labels: ['Muito baixa','Baixa','Moderada','Boa','Muito boa'] },
  ],
  social: [
    { id: 's1', text: 'Como você avaliaria a qualidade dos seus relacionamentos pessoais?', labels: ['Muito ruim','Ruim','Regular','Bom','Excelente'] },
    { id: 's2', text: 'Você tem pessoas com quem contar em momentos difíceis?', labels: ['Nenhuma','Quase nenhuma','Algumas','Várias','Muitas'] },
    { id: 's3', text: 'Como está sua situação profissional ou ocupacional atualmente?', labels: ['Muito ruim','Ruim','Regular','Boa','Excelente'] },
    { id: 's4', text: 'Como você avaliaria sua situação financeira?', labels: ['Muito ruim','Ruim','Regular','Boa','Excelente'] },
    { id: 's5', text: 'Você se sente integrado em seu grupo social, comunidade ou família?', labels: ['Nunca','Raramente','Às vezes','Frequentemente','Sempre'] },
    { id: 's6', text: 'Como está sua relação com sua família próxima?', labels: ['Muito ruim','Ruim','Regular','Boa','Excelente'] },
    { id: 's7', text: 'Você tem acesso fácil a serviços de saúde quando precisa?', labels: ['Nunca','Raramente','Às vezes','Frequentemente','Sempre'] },
    { id: 's8', text: 'Como você avaliaria sua qualidade de vida considerando seu ambiente social?', labels: ['Muito ruim','Ruim','Regular','Boa','Excelente'] },
  ]
};

const DIM_LABELS = { bio: 'Biológica', psico: 'Psicológica', social: 'Social' };
const DIM_COLORS = { bio: '#C41E3A', psico: '#1351B4', social: '#168821' };
const DIM_EMOJIS = { bio: '🔴', psico: '🔵', social: '🟢' };
const DIM_ICONS  = {
  bio:   '<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  psico: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  social:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
};

// ── State ──────────────────────────────────────────────────────
type DimKey = 'bio' | 'psico' | 'social';
const DIMS: DimKey[] = ['bio', 'psico', 'social'];
let currentDim = 0;
let currentQ   = 0;
let answers: Record<string, number> = {};

// ── DOM refs ───────────────────────────────────────────────────
const app        = document.getElementById('assessment-app')!;
const dimTitle   = document.getElementById('dim-title')!;
const dimIcon    = document.getElementById('dim-icon')!;
const qText      = document.getElementById('q-text')!;
const qCounter   = document.getElementById('q-counter')!;
const optionsCtr = document.getElementById('options-container')!;
const globalBar  = document.getElementById('global-progress-bar')!;
const globalLbl  = document.getElementById('global-progress-label')!;
const dimIndicators = document.querySelectorAll<HTMLElement>('.dim-indicator');

// ── Helpers ────────────────────────────────────────────────────
function totalAnswered() { return Object.keys(answers).length; }
function totalQuestions() { return 24; }

function updateGlobalProgress() {
  const pct = (totalAnswered() / totalQuestions()) * 100;
  globalBar.style.width = pct + '%';
  globalLbl.textContent = `${totalAnswered()} de ${totalQuestions()} perguntas respondidas`;

  dimIndicators.forEach((el, i) => {
    const dim = DIMS[i];
    const dimQs = QUESTIONS[dim];
    const answered = dimQs.filter(q => answers[q.id] !== undefined).length;
    if (answered === dimQs.length) {
      el.classList.add('completed');
      el.classList.remove('active');
    } else if (i === currentDim) {
      el.classList.add('active');
      el.classList.remove('completed');
    } else {
      el.classList.remove('active', 'completed');
    }
  });
}

function renderQuestion() {
  const dim = DIMS[currentDim];
  const qs  = QUESTIONS[dim];
  const q   = qs[currentQ];
  const color = DIM_COLORS[dim];

  dimTitle.textContent = `${DIM_EMOJIS[dim]} Dimensão ${DIM_LABELS[dim]}`;
  dimTitle.style.color = color;
  dimIcon.innerHTML = DIM_ICONS[dim];
  (dimIcon as HTMLElement).style.color = color;

  qCounter.textContent = `Pergunta ${currentQ + 1} de ${qs.length}`;
  qText.textContent = q.text;

  // Animate question in
  qText.style.opacity = '0';
  qText.style.transform = 'translateY(12px)';
  setTimeout(() => {
    qText.style.transition = 'all 0.3s ease';
    qText.style.opacity = '1';
    qText.style.transform = 'translateY(0)';
  }, 50);

  optionsCtr.innerHTML = '';
  q.labels.forEach((label, idx) => {
    const val = idx + 1; // 1–5
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (answers[q.id] === val ? ' selected' : '');
    btn.style.setProperty('--dim-color', color);
    btn.innerHTML = `
      <span class="option-number">${val}</span>
      <span class="option-label">${label}</span>
    `;
    btn.addEventListener('click', () => selectAnswer(q.id, val));
    optionsCtr.appendChild(btn);
  });

  updateGlobalProgress();
}

function selectAnswer(qId: string, val: number) {
  answers[qId] = val;

  // Highlight selection
  optionsCtr.querySelectorAll('.option-btn').forEach((b, i) => {
    b.classList.toggle('selected', i + 1 === val);
  });

  // Auto-advance after 400ms
  setTimeout(() => {
    advanceQuestion();
  }, 400);
}

function advanceQuestion() {
  const dim = DIMS[currentDim];
  const qs  = QUESTIONS[dim];

  if (currentQ < qs.length - 1) {
    currentQ++;
    renderQuestion();
  } else if (currentDim < DIMS.length - 1) {
    // Next dimension — show transition
    showDimTransition();
  } else {
    // All done
    finishAssessment();
  }
}

function showDimTransition() {
  const nextDim = DIMS[currentDim + 1];
  const color = DIM_COLORS[nextDim];

  const overlay = document.createElement('div');
  overlay.className = 'dim-transition-overlay';
  overlay.style.background = color;
  overlay.innerHTML = `
    <div class="dim-transition-content">
      <div class="dim-transition-check">✓</div>
      <h3>Dimensão ${DIM_LABELS[DIMS[currentDim]]} concluída!</h3>
      <p>Agora vamos avaliar a</p>
      <div class="dim-transition-next">${DIM_EMOJIS[nextDim]} Dimensão ${DIM_LABELS[nextDim]}</div>
    </div>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.remove();
      currentDim++;
      currentQ = 0;
      renderQuestion();
    }, 500);
  }, 2000);
}

function computeScore(dim: DimKey): number {
  const qs = QUESTIONS[dim];
  const total = qs.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
  return Math.round((total / (qs.length * 5)) * 100);
}

function finishAssessment() {
  const scores = {
    bio:   computeScore('bio'),
    psico: computeScore('psico'),
    social: computeScore('social'),
  };
  const overall = Math.round((scores.bio + scores.psico + scores.social) / 3);

  // Store results
  localStorage.setItem('bio_resultado', JSON.stringify({
    scores,
    overall,
    answers,
    date: new Date().toISOString()
  }));

  // Show completion screen with email capture
  app.innerHTML = `
    <div class="completion-screen">
      <div class="completion-icon">🎉</div>
      <h2>Avaliação concluída!</h2>
      <p>Seu <strong>Mapa de Saúde Biopsicossocial</strong> está pronto.<br/>Informe seu e-mail para acessar os resultados.</p>
      <div class="completion-scores-preview">
        <div class="preview-score" style="--c:#C41E3A">
          <span class="preview-dim">🔴 Biológica</span>
          <span class="preview-num">${scores.bio}/100</span>
        </div>
        <div class="preview-score" style="--c:#1351B4">
          <span class="preview-dim">🔵 Psicológica</span>
          <span class="preview-num">??/100</span>
        </div>
        <div class="preview-score" style="--c:#168821">
          <span class="preview-dim">🟢 Social</span>
          <span class="preview-num">??/100</span>
        </div>
      </div>
      <form class="email-capture-form" onsubmit="submitEmail(event)">
        <input type="text" name="nome" placeholder="Seu nome" required />
        <input type="email" name="email" placeholder="Seu melhor e-mail" required />
        <button type="submit" class="btn-reveal">
          Ver Meu Mapa Completo →
        </button>
        <p class="email-note">🔒 Privacidade garantida. Sem spam.</p>
      </form>
    </div>
  `;

  (window as any).submitEmail = function(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
    };
    const leads = JSON.parse(localStorage.getItem('bio_leads') || '[]');
    leads.push({ ...data, scores, overall, date: new Date().toISOString() });
    localStorage.setItem('bio_leads', JSON.stringify(leads));
    console.log('Lead:', data, scores);
    window.location.href = '/resultado.html';
  };
}

// ── Init ───────────────────────────────────────────────────────
renderQuestion();
