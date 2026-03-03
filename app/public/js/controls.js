/**
 * Controls panel — time, equipment, build button.
 */

let state = {
  minutes: null,
  equipment: new Set()
};

let bodyMap = null;
let onBuild = null;

export function initControls(container, map, { onBuildSession } = {}) {
  bodyMap = map;
  onBuild = onBuildSession;

  container.innerHTML = '';

  // Time
  container.appendChild(makeControlGroup('Session Length', () => {
    return makePillGroup([
      { label: '6 min', value: 6 },
      { label: '12 min', value: 12 },
      { label: '20 min', value: 20 },
      { label: '30 min', value: 30 }
    ].map(t => ({ ...t, active: state.minutes === t.value })), (val) => {
      state.minutes = Number(val);
      renderAll();
      updateBuildButton();
    });
  }));

  // Equipment
  container.appendChild(makeControlGroup('Equipment', () => {
    const group = document.createElement('div');
    group.className = 'pill-group';

    const items = ['None', 'Band', 'Wall', 'Chair', 'Dumbbell'];
    for (const item of items) {
      const chip = document.createElement('button');
      chip.className = 'chip' + (state.equipment.has(item.toLowerCase()) ? ' active' : '');
      chip.textContent = item;
      chip.addEventListener('click', () => {
        const val = item.toLowerCase();
        if (state.equipment.has(val)) {
          state.equipment.delete(val);
        } else {
          state.equipment.add(val);
        }
        renderAll();
      });
      group.appendChild(chip);
    }
    return group;
  }));

  // Divider
  container.appendChild(makeDivider());

  // Build button
  const buildWrap = document.createElement('div');
  buildWrap.className = 'build-btn-wrap';

  const buildBtn = document.createElement('button');
  buildBtn.id = 'build-session-btn';
  buildBtn.className = 'btn btn-primary btn-build';
  buildBtn.textContent = 'Build My Session';
  buildBtn.disabled = true;
  buildBtn.addEventListener('click', handleBuild);

  buildWrap.appendChild(buildBtn);
  container.appendChild(buildWrap);

  updateBuildButton();

  function renderAll() {
    initControls(container, bodyMap, { onBuildSession: onBuild });
  }
}

export function getControlState() {
  return {
    minutes: state.minutes,
    equipment: [...state.equipment]
  };
}

export function resetControls() {
  state = {
    minutes: null,
    equipment: new Set()
  };
}

function updateBuildButton() {
  const btn = document.getElementById('build-session-btn');
  if (!btn) return;

  const hasTarget = bodyMap.getSelectedRegions().length > 0;
  const hasTime = state.minutes != null;
  btn.disabled = !(hasTarget && hasTime);
}

// Called externally when body map selection changes
export function onMapSelectionChange() {
  updateBuildButton();
}

async function handleBuild() {
  if (!onBuild) return;

  const muscles = bodyMap.getSelectedMuscles();

  await onBuild({
    muscles,
    deviation: null,
    minutes: state.minutes,
    equipment: state.equipment.size > 0 ? [...state.equipment] : ['none']
  });
}

// Helpers
function makeControlGroup(title, contentFn) {
  const group = document.createElement('div');
  group.className = 'control-group';
  const h4 = document.createElement('h4');
  h4.textContent = title;
  group.appendChild(h4);
  group.appendChild(contentFn());
  return group;
}

function makePillGroup(options, onSelect) {
  const group = document.createElement('div');
  group.className = 'pill-group';

  for (const opt of options) {
    const pill = document.createElement('button');
    pill.className = 'pill' + (opt.active ? ' active' : '');
    pill.textContent = opt.label;
    pill.addEventListener('click', () => onSelect(opt.value));
    group.appendChild(pill);
  }
  return group;
}

function makeDivider() {
  const div = document.createElement('div');
  div.className = 'control-divider';
  return div;
}
