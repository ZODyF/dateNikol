/**
 * A Special Date Invitation for Nikol
 * Aesthetics: Quiet Luxury & Old Money
 */

// =========================================================
// TELEGRAM BOT CONFIGURATION
// =========================================================
const TELEGRAM_CONFIG = {
  BOT_TOKEN: '8671834812:AAHOpM25LDC8o12YCkOIQK780ZWHVoJP0t8',
  CHAT_ID: '955967550'
};

// =========================================================
// ACTIVITIES DATA (10 OPTIONS)
// =========================================================
const ACTIVITIES_DATA = {
  1: {
    id: 1,
    numeral: 'I',
    title: 'Пирогов',
    description: '«Ты говорила, что не была здесь, так что?»',
    type: 'direct',
    buttonText: 'Принимаю',
    leadsToFood: false
  },
  2: {
    id: 2,
    numeral: 'II',
    title: 'Stand Up',
    description: '«Выбор стендапа остается за тобой»',
    type: 'direct',
    buttonText: 'Принимаю',
    leadsToFood: false
  },
  3: {
    id: 3,
    numeral: 'III',
    title: 'Вечір джазу',
    description: '«Я считаю это одним из лучших выборов, красивый джазовый вечер, вкусные закуски, звон бокалов с игристым и ты - неотразимая, в том самом платье»',
    type: 'direct',
    buttonText: 'Принимаю',
    leadsToFood: false
  },
  4: {
    id: 4,
    numeral: 'IV',
    title: 'Скалолазанье',
    description: '«Я знаю что бы боишься высоты, но почему бы не попробовать?»',
    type: 'direct',
    buttonText: 'Принимаю',
    leadsToFood: false
  },
  5: {
    id: 5,
    numeral: 'V',
    title: 'Стрельба из лука',
    description: '«Можешь почувствовать себя Ангей из игры престолов»',
    type: 'eat',
    buttonText: 'Принимаю, выбрать eat',
    leadsToFood: true
  },
  6: {
    id: 6,
    numeral: 'VI',
    title: 'Біг Тенис',
    description: '«Хули тут сказать - Біг пеніс»',
    type: 'eat',
    buttonText: 'Принимаю, выбрать eat',
    leadsToFood: true
  },
  7: {
    id: 7,
    numeral: 'VII',
    title: 'Хоррор комната (квест)',
    description: '«Если обосраться то вместе»',
    type: 'eat',
    buttonText: 'Принимаю, выбрать eat',
    leadsToFood: true
  },
  8: {
    id: 8,
    numeral: 'VIII',
    title: 'Приют для собачек',
    description: '«Покормить, погладить, сделать доброе дело»',
    type: 'eat',
    buttonText: 'Принимаю, выбрать eat',
    leadsToFood: true
  },
  9: {
    id: 9,
    numeral: 'IX',
    title: 'Стрельбище',
    description: '«Пострілять с gun и сделать няманяма»',
    type: 'gun',
    buttonText: 'Выбрать ✨eat✨',
    leadsToFood: true
  },
  10: {
    id: 10,
    numeral: 'X',
    title: 'Вкусно покушать, кино и 🔞',
    description: '«Хм… кабута уже база»',
    type: 'custom_wishes',
    buttonText: 'Принимаю',
    leadsToFood: false
  }
};

// =========================================================
// APPLICATION STATE
// =========================================================
const appState = {
  currentStage: 1,
  selectedActivity: null,
  selectedRestaurant: null,
  customWish: '',
  isSubmitting: false
};

// =========================================================
// DOM ELEMENTS
// =========================================================
const stage1 = document.getElementById('stage-1');
const stage2 = document.getElementById('stage-2');
const stage3 = document.getElementById('stage-3');
const stage4 = document.getElementById('stage-4');

const envelopeScene = document.getElementById('envelope-scene');
const envelopeBox = document.getElementById('envelope-box');
const waxSeal = document.getElementById('wax-seal');

const activityCards = document.querySelectorAll('.activity-card');
const activityModal = document.getElementById('activity-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalNumeral = document.getElementById('modal-numeral');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalWishBox = document.getElementById('modal-wish-box');
const wishInput = document.getElementById('wish-input');
const modalActions = document.getElementById('modal-actions');

const stage3ActivityName = document.getElementById('stage3-activity-name');
const customRestaurantInput = document.getElementById('custom-restaurant-input');
const btnCustomRestaurant = document.getElementById('btn-custom-restaurant');
const restaurantCards = document.querySelectorAll('.restaurant-card');
const btnBackToStage2 = document.getElementById('btn-back-to-stage2');

const finalActivity = document.getElementById('final-activity');
const finalFoodRow = document.getElementById('final-food-row');
const finalRestaurant = document.getElementById('final-restaurant');
const finalWishesRow = document.getElementById('final-wishes-row');
const finalWishes = document.getElementById('final-wishes');
const tgStatusIndicator = document.getElementById('tg-status-indicator');
const btnReplay = document.getElementById('btn-replay');

// =========================================================
// STAGE TRANSITIONS
// =========================================================
function switchStage(fromStage, toStage) {
  fromStage.classList.remove('active');
  
  setTimeout(() => {
    fromStage.style.display = 'none';
    toStage.style.display = 'flex';
    
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Force layout reflow
    void toStage.offsetWidth;
    
    toStage.classList.add('active');
  }, 350);
}

// =========================================================
// ENVELOPE 3D INTERACTION
// =========================================================
const welcomeContainer = document.getElementById('welcome-container');
const innerLetter = document.getElementById('inner-letter');

let isEnvelopeOpened = false;
let isLetterProceeding = false;
let letterReadingTimer = null;

function proceedFromLetterToStage2() {
  if (isLetterProceeding) return;
  isLetterProceeding = true;
  if (letterReadingTimer) {
    clearTimeout(letterReadingTimer);
    letterReadingTimer = null;
  }

  // Camera zoom & fly-in into the letter
  envelopeScene.classList.add('envelope-flyin');

  // Switch to Stage 2 (Activities Grid)
  setTimeout(() => {
    switchStage(stage1, stage2);
  }, 750);
}

function openEnvelope() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;

  // 1. Gently fade out headers so the letter is 100% unobstructed and easy to read
  if (welcomeContainer) {
    welcomeContainer.classList.add('envelope-opening');
  }

  // 2. Trigger flap fold, wax seal fade, and letter emergence
  envelopeScene.classList.add('envelope-opened');

  // 3. Comfortable reading delay (~4.2s) so Nikol can read at a relaxed pace
  letterReadingTimer = setTimeout(() => {
    proceedFromLetterToStage2();
  }, 4200);
}

if (envelopeBox) {
  envelopeBox.addEventListener('click', () => {
    if (!isEnvelopeOpened) {
      openEnvelope();
    } else {
      proceedFromLetterToStage2();
    }
  });
}
if (waxSeal) {
  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isEnvelopeOpened) {
      openEnvelope();
    }
  });
}
if (innerLetter) {
  innerLetter.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isEnvelopeOpened) {
      proceedFromLetterToStage2();
    }
  });
}

// =========================================================
// MODAL DIALOG CONTROLLER (STAGE 2)
// =========================================================
let currentModalActivity = null;

function openActivityModal(activityId) {
  const data = ACTIVITIES_DATA[activityId];
  if (!data) return;

  currentModalActivity = data;
  modalNumeral.textContent = data.numeral;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;

  // Check if option 10 (Custom wishes)
  if (data.id === 10) {
    modalWishBox.style.display = 'block';
    wishInput.value = appState.customWish || '';
  } else {
    modalWishBox.style.display = 'none';
  }

  // Populate dynamic action buttons
  modalActions.innerHTML = '';

  // Primary Action Button
  const btnAccept = document.createElement('button');
  btnAccept.type = 'button';
  btnAccept.className = 'btn-luxury-primary';
  btnAccept.innerHTML = `<span>${data.buttonText}</span>`;
  btnAccept.addEventListener('click', () => handleActivityAcceptance(data));

  // Secondary "Choose another" button
  const btnCancel = document.createElement('button');
  btnCancel.type = 'button';
  btnCancel.className = 'btn-luxury-secondary';
  btnCancel.textContent = 'Хочу выбрать другое';
  btnCancel.addEventListener('click', closeActivityModal);

  modalActions.appendChild(btnAccept);
  modalActions.appendChild(btnCancel);

  // Show modal
  activityModal.classList.add('active');
  activityModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeActivityModal() {
  activityModal.classList.remove('active');
  activityModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentModalActivity = null;
}

// Activity card clicks
activityCards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    openActivityModal(id);
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const id = card.getAttribute('data-id');
      openActivityModal(id);
    }
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeActivityModal);
}

if (activityModal) {
  activityModal.addEventListener('click', (e) => {
    if (e.target === activityModal) {
      closeActivityModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activityModal.classList.contains('active')) {
    closeActivityModal();
  }
});

// =========================================================
// HANDLING ACTIVITY SELECTION
// =========================================================
function handleActivityAcceptance(activity) {
  appState.selectedActivity = activity;

  // If option 10, save custom wishes text
  if (activity.id === 10 && wishInput) {
    appState.customWish = wishInput.value.trim();
  }

  closeActivityModal();

  if (activity.leadsToFood) {
    // Lead to Stage 3 (Gastronomic selection)
    stage3ActivityName.textContent = activity.title;
    switchStage(stage2, stage3);
  } else {
    // Directly finalize and go to Stage 4
    appState.selectedRestaurant = '— (Прямо на свидание)';
    finalizeSelection();
  }
}

// =========================================================
// STAGE 3: GASTRONOMIC SELECTION
// =========================================================

// Back to Stage 2
if (btnBackToStage2) {
  btnBackToStage2.addEventListener('click', () => {
    switchStage(stage3, stage2);
  });
}

// Select Restaurant from cards
restaurantCards.forEach(card => {
  card.addEventListener('click', () => {
    const name = card.getAttribute('data-name');
    selectRestaurant(name);
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const name = card.getAttribute('data-name');
      selectRestaurant(name);
    }
  });
});

// Custom restaurant submission
if (btnCustomRestaurant) {
  btnCustomRestaurant.addEventListener('click', () => {
    const customValue = customRestaurantInput.value.trim();
    if (customValue) {
      selectRestaurant(`Свой вариант: «${customValue}»`);
    } else {
      customRestaurantInput.focus();
      customRestaurantInput.style.borderColor = '#C5A880';
    }
  });
}

if (customRestaurantInput) {
  customRestaurantInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btnCustomRestaurant.click();
    }
  });
}

function selectRestaurant(restaurantName) {
  appState.selectedRestaurant = restaurantName;
  finalizeSelection();
}

// =========================================================
// FINALIZE SELECTION & TRANSITION TO STAGE 4
// =========================================================
function finalizeSelection() {
  const currentScreen = stage3.classList.contains('active') ? stage3 : stage2;
  
  // Populate summary ticket in Stage 4
  finalActivity.textContent = appState.selectedActivity ? appState.selectedActivity.title : 'Не выбрано';
  
  if (appState.selectedActivity && appState.selectedActivity.leadsToFood && appState.selectedRestaurant) {
    finalFoodRow.style.display = 'flex';
    finalRestaurant.textContent = appState.selectedRestaurant;
  } else if (appState.selectedRestaurant && appState.selectedRestaurant !== '— (Прямо на свидание)') {
    finalFoodRow.style.display = 'flex';
    finalRestaurant.textContent = appState.selectedRestaurant;
  } else {
    finalFoodRow.style.display = 'none';
  }

  if (appState.customWish) {
    finalWishesRow.style.display = 'flex';
    finalWishes.textContent = appState.customWish;
  } else {
    finalWishesRow.style.display = 'none';
  }

  // Switch to Stage 4
  switchStage(currentScreen, stage4);

  // Send Telegram Notification
  sendTelegramNotification();

  // Launch celebratory sparks
  setTimeout(() => {
    startLuxurySparks();
  }, 400);
}

// =========================================================
// TELEGRAM NOTIFICATION DISPATCHER
// =========================================================
async function sendTelegramNotification() {
  const activityTitle = appState.selectedActivity ? appState.selectedActivity.title : 'Не указана';
  const activityNote = appState.selectedActivity ? appState.selectedActivity.description : '';
  const restaurant = appState.selectedRestaurant || 'Не требуется';
  const wish = appState.customWish ? appState.customWish : 'Без особых пожеланий';
  const now = new Date();
  const timeFormatted = now.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

  const messageText = 
`💌 *Приглашение на свидание принято!*

👑 *Для кого:* Николь
✨ *Выбранная активность:* ${activityTitle}
💬 *Цитата:* ${activityNote}
🥂 *Гастрономическая локация:* ${restaurant}
💭 *Пожелание:* ${wish}

📅 *Время ответа:* ${timeFormatted}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown'
      })
    });

    if (response.ok) {
      if (tgStatusIndicator) {
        tgStatusIndicator.innerHTML = '<span class="status-dot"></span> Доставлено в Telegram';
      }
    } else {
      console.warn('Telegram API response not ok, attempting plain text fallback...');
      // Fallback without Markdown in case of special character parsing
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.CHAT_ID,
          text: messageText.replace(/[*_`]/g, '')
        })
      });
      if (tgStatusIndicator) {
        tgStatusIndicator.innerHTML = '<span class="status-dot"></span> Доставлено в Telegram';
      }
    }
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    if (tgStatusIndicator) {
      tgStatusIndicator.innerHTML = '<span class="status-dot" style="background:#C5A880"></span> Выбор зафиксирован локально';
    }
  }
}

// =========================================================
// REPLAY / REVIEW BUTTON
// =========================================================
if (btnReplay) {
  btnReplay.addEventListener('click', () => {
    stopLuxurySparks();
    switchStage(stage4, stage2);
  });
}

// =========================================================
// LUXURY PARTICLES & SPARKS ENGINE (CANVAS)
// Quiet Luxury Palette: Champagne Gold, White Gold, Matte Silver
// =========================================================
let sparksAnimationId = null;
let sparksCanvas = document.getElementById('luxury-canvas');
let sparksCtx = sparksCanvas ? sparksCanvas.getContext('2d') : null;
let particles = [];

const LUXURY_PALETTE = [
  '#C5A880', // Champagne Gold
  '#E2CEB4', // Soft Gold
  '#F5E6CA', // Ivory Gold
  '#F3F4F6', // Platinum Silver
  '#D1D5DB', // Muted Silver
  '#FFFFFF'  // Diamond Sparkle
];

class LuxuryParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 2.5; // slight upward bias
    this.gravity = 0.08;
    this.friction = 0.985;
    this.color = LUXURY_PALETTE[Math.floor(Math.random() * LUXURY_PALETTE.length)];
    this.size = Math.random() * 3.5 + 1.5;
    this.alpha = 1;
    this.decay = Math.random() * 0.012 + 0.007;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.1;
    this.shape = Math.random() > 0.4 ? 'spark' : 'diamond';
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;

    if (this.shape === 'diamond') {
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 1.5);
      ctx.lineTo(this.size, 0);
      ctx.lineTo(0, this.size * 1.5);
      ctx.lineTo(-this.size, 0);
      ctx.closePath();
      ctx.fill();
    } else {
      // Shimmer circular sparkle with glow
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function resizeCanvas() {
  if (!sparksCanvas) return;
  sparksCanvas.width = window.innerWidth;
  sparksCanvas.height = window.innerHeight;
}

function createBurst(x, y, count = 45) {
  for (let i = 0; i < count; i++) {
    particles.push(new LuxuryParticle(x, y));
  }
}

function loopSparks() {
  if (!sparksCtx) return;
  sparksCtx.clearRect(0, 0, sparksCanvas.width, sparksCanvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw(sparksCtx);

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  // Periodic subtle bursts for continuous celebration
  if (Math.random() < 0.04 && particles.length < 220) {
    const rx = window.innerWidth * (0.2 + Math.random() * 0.6);
    const ry = window.innerHeight * (0.2 + Math.random() * 0.4);
    createBurst(rx, ry, Math.floor(Math.random() * 25 + 15));
  }

  sparksAnimationId = requestAnimationFrame(loopSparks);
}

function startLuxurySparks() {
  if (!sparksCanvas) {
    sparksCanvas = document.getElementById('luxury-canvas');
    if (sparksCanvas) sparksCtx = sparksCanvas.getContext('2d');
  }
  if (!sparksCanvas) return;

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  particles = [];
  
  // Initial grand celebration bursts
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.35;
  createBurst(cx, cy, 70);
  createBurst(cx - 180, cy + 40, 50);
  createBurst(cx + 180, cy + 40, 50);

  if (sparksAnimationId) cancelAnimationFrame(sparksAnimationId);
  sparksAnimationId = requestAnimationFrame(loopSparks);
}

function stopLuxurySparks() {
  if (sparksAnimationId) {
    cancelAnimationFrame(sparksAnimationId);
    sparksAnimationId = null;
  }
  if (sparksCtx && sparksCanvas) {
    sparksCtx.clearRect(0, 0, sparksCanvas.width, sparksCanvas.height);
  }
  particles = [];
  window.removeEventListener('resize', resizeCanvas);
}
