const sessionsContainer = document.getElementById('sessions');

const hands = ['TT', 'JJ', 'QQ', 'KK', 'AA'];
const startDate = new Date('2025-05-12');
const endDate = new Date('2025-11-12');

// Génère tous les lundis et jeudis entre deux dates
function generateSessions(start, end) {
  const sessions = [];
  let date = new Date(start);

  while (date <= end) {
    const day = date.getDay();
    if (day === 1 || day === 4) {
      sessions.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return sessions;
}

// Format date à la française : "12/05/2025"
function formatDateFr(date) {
  return date.toLocaleDateString('fr-FR');
}

function createSessionElement(date) {
  const sessionDiv = document.createElement('div');
  sessionDiv.classList.add('session');

  const h2 = document.createElement('h2');
  h2.textContent = formatDateFr(date);
  sessionDiv.appendChild(h2);

  hands.forEach(hand => {
    const row = document.createElement('div');
    row.classList.add('hand-row');

    const label = document.createElement('div');
    label.classList.add('hand-label');
    label.textContent = hand;
    row.appendChild(label);

    const checkboxesDiv = document.createElement('div');
    checkboxesDiv.classList.add('checkboxes');

    for (let i = 0; i < 4; i++) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `${formatDateFr(date)}_${hand}_${i}`;
      checkbox.name = `${formatDateFr(date)}_${hand}`;
      checkboxesDiv.appendChild(checkbox);
    }

    row.appendChild(checkboxesDiv);
    sessionDiv.appendChild(row);
  });

  return sessionDiv;
}

function init() {
  const sessions = generateSessions(startDate, endDate);
  sessionsContainer.innerHTML = '';
  sessions.forEach(sessionDate => {
    sessionsContainer.appendChild(createSessionElement(sessionDate));
  });
}

init();
