/**
 * App entry point — orchestrates views and data flow.
 */
import { initBodyMap } from './body-map.js';
import { initControls, getControlState, onMapSelectionChange, resetControls } from './controls.js';
import { renderSession } from './session.js';
import { buildSession } from './api.js';
import { regions } from './regions.js';

// DOM refs
const heroSection = document.getElementById('hero');
const heroCta = document.getElementById('hero-cta');
const bodyMapSection = document.getElementById('body-map-section');
const bodyMapEl = document.getElementById('body-map');
const controlsEl = document.getElementById('controls');
const selectedList = document.getElementById('selected-list');
const selectionSummary = document.getElementById('selection-summary');
const musclesTargeted = document.getElementById('muscles-targeted');
const clearBtn = document.getElementById('clear-selection');
const sessionSection = document.getElementById('session-section');
const sessionContainer = document.getElementById('session-container');
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize body map
const bodyMap = initBodyMap(bodyMapEl, {
  onChange: handleSelectionChange
});

// Initialize controls
initControls(controlsEl, bodyMap, {
  onBuildSession: handleBuildSession
});

// Hero CTA
heroCta.addEventListener('click', () => {
  bodyMapSection.scrollIntoView({ behavior: 'smooth' });
});

// Clear selection button
clearBtn.addEventListener('click', () => {
  bodyMap.clearSelection();
  resetControls();
  initControls(controlsEl, bodyMap, { onBuildSession: handleBuildSession });
  handleSelectionChange({ selectedRegions: [], muscles: [] });
});

function handleSelectionChange({ selectedRegions: selected, muscles }) {
  // Update info panel
  if (selected.length === 0) {
    selectedList.innerHTML = '<li class="selected-list-empty">Click on the body to select muscle regions</li>';
    selectionSummary.hidden = true;
    clearBtn.hidden = true;
  } else {
    selectedList.innerHTML = '';
    for (const id of selected) {
      const region = regions.find(r => r.id === id);
      if (!region) continue;

      const li = document.createElement('li');
      const tag = document.createElement('span');
      tag.className = 'selected-tag';
      tag.innerHTML = `${region.name} <span class="remove-tag" data-id="${id}">&times;</span>`;
      li.appendChild(tag);
      selectedList.appendChild(li);
    }

    // Remove-tag click delegation
    selectedList.querySelectorAll('.remove-tag').forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove from body map selection
        const regionId = btn.dataset.id;
        bodyMap.clearSelection();
        // Re-select everything except this one
        const remaining = selected.filter(id => id !== regionId);
        if (remaining.length > 0) {
          bodyMap.highlightDeviationRegions(remaining);
        }
      });
    });

    selectionSummary.hidden = false;
    musclesTargeted.textContent = muscles.join(', ');
    clearBtn.hidden = false;
  }

  // Let controls know selection changed
  onMapSelectionChange();
}

async function handleBuildSession(params) {
  // Show loading
  loadingOverlay.classList.add('visible');
  sessionSection.hidden = true;

  try {
    const session = await buildSession(params);

    // Render session
    renderSession(sessionContainer, session);
    sessionSection.hidden = false;

    // Scroll to session
    setTimeout(() => {
      sessionSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Wire up Start Over button
    const startOverBtn = document.getElementById('start-over-btn');
    if (startOverBtn) {
      startOverBtn.addEventListener('click', () => {
        sessionSection.hidden = true;
        bodyMap.clearSelection();
        resetControls();
        initControls(controlsEl, bodyMap, { onBuildSession: handleBuildSession });
        handleSelectionChange({ selectedRegions: [], muscles: [] });
        bodyMapSection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  } catch (err) {
    // Show error in session area
    sessionSection.hidden = false;
    sessionContainer.innerHTML = `
      <div class="error-banner">
        <div class="error-title">Couldn't build your session</div>
        <div>${err.message}</div>
      </div>
    `;
    sessionSection.scrollIntoView({ behavior: 'smooth' });
  } finally {
    loadingOverlay.classList.remove('visible');
  }
}
