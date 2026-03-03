/**
 * Renders the AI-generated session plan.
 */

const PHASE_ICONS = {
  reset: '/images/icon_reset.jpeg',
  mobilize: '/images/icon_mobilize.jpeg',
  lengthen: '/images/icon_lengthen.jpeg',
  strengthen: '/images/icon_strengthen.jpeg',
  integrate: '/images/icon_integrate.jpeg'
};

export function renderSession(container, session) {
  container.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.className = 'session-header';
  header.innerHTML = `
    <h2>${escapeHtml(session.session_title)}</h2>
    <p class="session-meta">${session.total_minutes} minutes &middot; ${escapeHtml(session.target_pattern)}</p>
  `;
  container.appendChild(header);

  // Reasoning
  if (session.reasoning) {
    const reasoning = document.createElement('div');
    reasoning.className = 'session-reasoning';
    reasoning.textContent = session.reasoning;
    container.appendChild(reasoning);
  }

  // Phase cards
  for (const phase of session.phases) {
    const card = document.createElement('div');
    card.className = 'phase-card';

    const iconKey = (phase.icon || phase.name.toLowerCase()).toLowerCase();
    const iconSrc = PHASE_ICONS[iconKey] || PHASE_ICONS.reset;

    card.innerHTML = `
      <div class="phase-header">
        <img src="${iconSrc}" alt="${escapeHtml(phase.name)}" class="phase-icon" />
        <div>
          <div class="phase-title">${escapeHtml(phase.name)}</div>
          <div class="phase-time">${phase.minutes} min</div>
        </div>
      </div>
    `;

    const exerciseList = document.createElement('div');
    exerciseList.className = 'exercise-list';

    for (const ex of phase.exercises) {
      const exCard = document.createElement('div');
      exCard.className = 'exercise-card';

      const equipBadge = ex.equipment && ex.equipment !== 'none'
        ? `<span class="exercise-badge badge-equipment">${escapeHtml(ex.equipment)}</span>`
        : '';

      const inhibitsText = ex.inhibits?.length
        ? `<div class="exercise-targets">Inhibits: ${ex.inhibits.map(escapeHtml).join(', ')}</div>`
        : '';

      exCard.innerHTML = `
        <div class="exercise-name">${escapeHtml(ex.name)}</div>
        <div class="exercise-meta">
          <span class="exercise-badge badge-dosage">${escapeHtml(ex.dosage)}</span>
          <span class="exercise-badge badge-type">${escapeHtml(ex.type)}</span>
          ${equipBadge}
        </div>
        <div class="exercise-cue">"${escapeHtml(ex.coaching_cue)}"</div>
        <div class="exercise-targets">Targets: ${(ex.target_muscles || []).map(escapeHtml).join(', ')}</div>
        ${inhibitsText}
        ${ex.scaling ? `
          <div class="scaling-row">
            <div class="scaling-item">
              <span class="scaling-label good">Good</span>
              ${escapeHtml(ex.scaling.good)}
            </div>
            <div class="scaling-item">
              <span class="scaling-label better">Better</span>
              ${escapeHtml(ex.scaling.better)}
            </div>
            <div class="scaling-item">
              <span class="scaling-label best">Best</span>
              ${escapeHtml(ex.scaling.best)}
            </div>
          </div>
        ` : ''}
      `;

      exerciseList.appendChild(exCard);
    }

    card.appendChild(exerciseList);
    container.appendChild(card);
  }

  // Start Over button
  const actions = document.createElement('div');
  actions.className = 'session-actions';
  const resetBtn = document.createElement('button');
  resetBtn.className = 'btn btn-ghost';
  resetBtn.textContent = 'Start Over';
  resetBtn.id = 'start-over-btn';
  actions.appendChild(resetBtn);
  container.appendChild(actions);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}
