import './style.css';

// ====================================
// BIOPSICOSSOCIAL — Main Application
// ====================================

// === Navbar Scroll Effect ===
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function handleNavScroll() {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);
handleNavScroll();

// === Hamburger Menu ===
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
  const actions = document.querySelector('.navbar-actions') as HTMLElement;
  actions?.classList.toggle('active');
  
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (navLinks?.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const actions = document.querySelector('.navbar-actions') as HTMLElement;
    actions?.classList.remove('active');
    const spans = hamburger?.querySelectorAll('span');
    if (spans) {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
});

// === Smooth Scroll ===
(window as any).scrollToSection = function(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// === Modal ===
const modalOverlay = document.getElementById('modal-overlay');
const modalWaitlist = document.getElementById('modal-waitlist');
const modalSuccess = document.getElementById('modal-success');

(window as any).openModal = function(type: string) {
  if (type === 'waitlist' || type === 'login') {
    modalWaitlist?.classList.remove('modal-hidden');
    modalSuccess?.classList.add('modal-hidden');
  }
  modalOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
};

(window as any).closeModal = function() {
  modalOverlay?.classList.remove('active');
  document.body.style.overflow = '';
};

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    (window as any).closeModal();
    // Also close chatbot
    const chatWindow = document.getElementById('chatbot-window');
    chatWindow?.classList.remove('active');
  }
});

// === Form Submit ===
(window as any).handleSubmit = function(e: Event) {
  e.preventDefault();
  
  const form = document.getElementById('waitlist-form') as HTMLFormElement;
  const formData = new FormData(form);
  const data: Record<string, string> = {};
  formData.forEach((value, key) => { data[key] = value as string; });
  
  // Store locally
  const leads = JSON.parse(localStorage.getItem('biopsicossocial_leads') || '[]');
  leads.push({ ...data, timestamp: new Date().toISOString() });
  localStorage.setItem('biopsicossocial_leads', JSON.stringify(leads));
  
  // Show success
  modalWaitlist?.classList.add('modal-hidden');
  modalSuccess?.classList.remove('modal-hidden');
  
  // Reset form
  form.reset();
  
  console.log('📧 Lead captured:', data);
};

// === FAQ Accordion ===
(window as any).toggleFaq = function(btn: HTMLElement) {
  const item = btn.closest('.faq-item');
  const isActive = item?.classList.contains('active');
  
  // Close all
  document.querySelectorAll('.faq-item').forEach(faq => {
    faq.classList.remove('active');
  });
  
  // Open clicked (if wasn't active)
  if (!isActive) {
    item?.classList.add('active');
  }
};

// === Chatbot ===
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input') as HTMLInputElement;

(window as any).toggleChatbot = function() {
  chatbotWindow?.classList.toggle('active');
  if (chatbotWindow?.classList.contains('active')) {
    chatbotInput?.focus();
  }
};

// Chatbot knowledge base
const chatResponses: Record<string, string> = {
  'modelo': `O modelo biopsicossocial é a abordagem científica mais completa para entender a saúde humana. Ele avalia 3 dimensões:

🔴 **Biológica** — corpo, sono, alimentação, doenças, dores
🔵 **Psicológica** — mente, emoções, ansiedade, estresse, autoestima
🟢 **Social** — família, trabalho, renda, moradia, suporte social

É reconhecido pela OMS (através da CIF), pelo INSS e pelo Judiciário brasileiro.`,

  'avaliacao': `A avaliação funciona em 3 etapas simples:

1️⃣ **Questionário** — Responda às perguntas validadas das 3 dimensões (≈15 minutos)
2️⃣ **Mapa de Saúde** — Nossa IA processa e gera seu relatório personalizado
3️⃣ **Recomendações** — Ações concretas e conexão com especialistas se necessário

Totalmente anônimo se preferir. No celular ou computador.`,

  'gratuito': `Sim! A **avaliação inicial é 100% gratuita**, sem cartão de crédito.

Planos disponíveis:
🆓 **Grátis** — 1 avaliação/trimestre
⭐ **Essencial** — R$ 29/mês (avaliações ilimitadas + plano de ação por IA)
👨‍⚕️ **Profissional** — R$ 97/mês (laudos INSS/Judiciário + marketplace)

Comece sem compromisso e evolua conforme sua necessidade.`,

  'profissional': `Para profissionais de saúde (psicólogos, médicos, assistentes sociais), oferecemos:

📋 **Laudos estruturados** em formato CIF para o INSS
⚖️ **Laudos para perícias** judiciais
👥 **Dashboard** de acompanhamento de pacientes
🏥 **Perfil no marketplace** — seja encontrado por usuários da plataforma

Tudo a partir de R$ 97/mês. Quer cadastrar seu consultório?`,

  'lgpd': `Sim, 100% em conformidade com a LGPD! 🔒

• Avaliação completamente anônima se preferir
• Nenhum dado vincula resposta a pessoa específica
• Dados criptografados e armazenados no Brasil
• Você controla e pode deletar seus dados a qualquer momento`,

  'default': `Que ótimo que está buscando entender melhor sua saúde! 💙

Posso te ajudar com:
• **O que é** o modelo biopsicossocial
• **Como funciona** a avaliação
• **Preços** e planos disponíveis
• **Para profissionais** de saúde
• **Privacidade** e proteção de dados

O que deseja saber?`
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes('modelo') || lower.includes('o que é') || lower.includes('biopsicossocial') || lower.includes('cif') || lower.includes('oms')) {
    return chatResponses['modelo'];
  }
  if (lower.includes('funciona') || lower.includes('avaliação') || lower.includes('avaliacao') || lower.includes('como') || lower.includes('mapa')) {
    return chatResponses['avaliacao'];
  }
  if (lower.includes('gratu') || lower.includes('preço') || lower.includes('preco') || lower.includes('valor') || lower.includes('quanto') || lower.includes('plano') || lower.includes('custo')) {
    return chatResponses['gratuito'];
  }
  if (lower.includes('profissional') || lower.includes('psicólogo') || lower.includes('medico') || lower.includes('laudo') || lower.includes('inss') || lower.includes('judici')) {
    return chatResponses['profissional'];
  }
  if (lower.includes('lgpd') || lower.includes('segur') || lower.includes('dado') || lower.includes('anônim') || lower.includes('anonim') || lower.includes('privacidade')) {
    return chatResponses['lgpd'];
  }
  
  return chatResponses['default'];
}

function addMessage(text: string, isUser: boolean) {
  const div = document.createElement('div');
  div.className = `chat-message ${isUser ? 'chat-user' : 'chat-bot'}`;
  
  // Convert markdown-like bold to HTML
  const htmlText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  div.innerHTML = htmlText.split('\n').map(line => `<p>${line}</p>`).join('');
  
  chatbotMessages?.appendChild(div);
  chatbotMessages?.scrollTo({ top: chatbotMessages.scrollHeight, behavior: 'smooth' });
}

(window as any).sendMessage = function() {
  const message = chatbotInput?.value.trim();
  if (!message) return;
  
  // Add user message
  addMessage(message, true);
  chatbotInput.value = '';
  
  // Hide suggestions after first message
  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';
  
  // Simulate typing delay
  setTimeout(() => {
    const response = getBotResponse(message);
    addMessage(response, false);
  }, 600 + Math.random() * 800);
};

(window as any).sendSuggestion = function(text: string) {
  addMessage(text, true);
  
  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';
  
  setTimeout(() => {
    const response = getBotResponse(text);
    addMessage(response, false);
  }, 600 + Math.random() * 800);
};

// === Scroll Animations (Intersection Observer) ===
function initScrollAnimations() {
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Add fade-in class to elements
  const animateElements = document.querySelectorAll(
    '.modelo-card, .publico-card, .step, .plano-card, .stat-item, .faq-item, .section-header, .mapa-preview'
  );
  
  animateElements.forEach((el, index) => {
    el.classList.add('fade-in');
    (el as HTMLElement).style.transitionDelay = `${index % 4 * 100}ms`;
    observer.observe(el);
  });
}

// === Mouse Glow Effect on Cards ===
function initCardGlowEffect() {
  const cards = document.querySelectorAll('.solucao-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      
      const glow = card.querySelector('.solucao-card-glow') as HTMLElement;
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.08), transparent 50%)`;
        glow.style.opacity = '1';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.solucao-card-glow') as HTMLElement;
      if (glow) {
        glow.style.opacity = '0';
      }
    });
  });
}

// === Active Nav Link Highlighting ===
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// === Initialize Everything ===
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCardGlowEffect();
  initActiveNavHighlight();
});
