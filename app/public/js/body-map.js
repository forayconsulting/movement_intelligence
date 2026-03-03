import { regions } from './regions.js';

/**
 * Body map component — image display, SVG overlay, click/hover handlers.
 */

const IMAGES = {
  front_skin: '/images/01-body-front.jpeg',
  back_skin: '/images/02-body-back.jpeg',
  front_muscle: '/images/03-body-front-muscles.jpeg',
  back_muscle: '/images/04-body-back-muscles.jpeg'
};

let currentView = 'front';
let currentLayer = 'skin';
let selectedRegions = new Set();
let deviationHighlights = new Set();
let onSelectionChange = null;

export function initBodyMap(container, { onChange } = {}) {
  onSelectionChange = onChange;

  // Build DOM
  const wrapper = document.createElement('div');
  wrapper.className = 'body-map-container';

  // Skin image (base layer)
  const skinImg = document.createElement('img');
  skinImg.className = 'body-img';
  skinImg.src = IMAGES.front_skin;
  skinImg.alt = 'Body front view';
  skinImg.draggable = false;
  wrapper.appendChild(skinImg);

  // Muscle overlay image
  const muscleImg = document.createElement('img');
  muscleImg.className = 'muscle-img';
  muscleImg.src = IMAGES.front_muscle;
  muscleImg.alt = '';
  muscleImg.draggable = false;
  wrapper.appendChild(muscleImg);

  // SVG overlay
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  wrapper.appendChild(svg);

  // View/Layer overlay
  const overlay = document.createElement('div');
  overlay.className = 'body-map-overlay';
  wrapper.appendChild(overlay);

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'body-tooltip';
  wrapper.appendChild(tooltip);

  container.appendChild(wrapper);

  renderOverlay();

  // Render initial view
  renderRegions(svg, tooltip, wrapper);

  // Wait for image to load to set proper aspect ratio
  skinImg.addEventListener('load', () => {
    const aspect = skinImg.naturalHeight / skinImg.naturalWidth;
    svg.setAttribute('viewBox', `0 0 100 ${100 * aspect}`);
    // Scale polygon points by aspect
    renderRegions(svg, tooltip, wrapper);
  });

  return {
    setView,
    setLayer,
    getSelectedRegions: () => [...selectedRegions],
    getSelectedMuscles,
    clearSelection,
    highlightDeviationRegions,
    clearDeviationHighlights,
    renderOverlay
  };

  function setView(view) {
    currentView = view;
    skinImg.src = view === 'front' ? IMAGES.front_skin : IMAGES.back_skin;
    muscleImg.src = view === 'front' ? IMAGES.front_muscle : IMAGES.back_muscle;
    renderRegions(svg, tooltip, wrapper);
    renderOverlay();
  }

  function setLayer(layer) {
    currentLayer = layer;
    if (layer === 'muscle') {
      muscleImg.classList.add('visible');
    } else {
      muscleImg.classList.remove('visible');
    }
    renderOverlay();
  }

  function clearSelection() {
    selectedRegions.clear();
    deviationHighlights.clear();
    // Reset view/layer to defaults
    currentView = 'front';
    currentLayer = 'skin';
    skinImg.src = IMAGES.front_skin;
    muscleImg.src = IMAGES.front_muscle;
    muscleImg.classList.remove('visible');
    renderOverlay();
    renderRegions(svg, tooltip, wrapper);
    fireChange();
  }

  function renderOverlay() {
    overlay.innerHTML = '';

    // View row
    const viewRow = document.createElement('div');
    viewRow.className = 'overlay-row';
    const viewLabel = document.createElement('span');
    viewLabel.className = 'overlay-label';
    viewLabel.textContent = 'VIEW';
    viewRow.appendChild(viewLabel);

    const viewPills = document.createElement('div');
    viewPills.className = 'overlay-pills';
    for (const { label, value } of [{ label: 'Front', value: 'front' }, { label: 'Back', value: 'back' }]) {
      const btn = document.createElement('button');
      btn.className = 'overlay-pill' + (currentView === value ? ' active' : '');
      btn.textContent = label;
      btn.addEventListener('click', () => setView(value));
      viewPills.appendChild(btn);
    }
    viewRow.appendChild(viewPills);
    overlay.appendChild(viewRow);

    // Layer row
    const layerRow = document.createElement('div');
    layerRow.className = 'overlay-row';
    const layerLabel = document.createElement('span');
    layerLabel.className = 'overlay-label';
    layerLabel.textContent = 'LAYER';
    layerRow.appendChild(layerLabel);

    const layerPills = document.createElement('div');
    layerPills.className = 'overlay-pills';
    for (const { label, value } of [{ label: 'Skin', value: 'skin' }, { label: 'Muscle', value: 'muscle' }]) {
      const btn = document.createElement('button');
      btn.className = 'overlay-pill' + (currentLayer === value ? ' active' : '');
      btn.textContent = label;
      btn.addEventListener('click', () => setLayer(value));
      layerPills.appendChild(btn);
    }
    layerRow.appendChild(layerPills);
    overlay.appendChild(layerRow);
  }

  function highlightDeviationRegions(regionIds) {
    deviationHighlights = new Set(regionIds);
    // Also auto-select them
    regionIds.forEach(id => selectedRegions.add(id));
    renderRegions(svg, tooltip, wrapper);
    fireChange();
  }

  function clearDeviationHighlights() {
    deviationHighlights.clear();
    renderRegions(svg, tooltip, wrapper);
  }

  function getSelectedMuscles() {
    const muscles = new Set();
    for (const id of selectedRegions) {
      const region = regions.find(r => r.id === id);
      if (region) {
        region.muscles.forEach(m => muscles.add(m));
      }
    }
    return [...muscles];
  }

  function renderRegions(svg, tooltip, container) {
    // Clear existing polygons
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const viewRegions = regions.filter(r => r.view === currentView);
    const aspect = svg.getAttribute('viewBox')?.split(' ')[3] || 100;

    for (const region of viewRegions) {
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

      // Scale Y coordinates by aspect ratio / 100
      const scaledPoints = region.points.split(' ').map(pair => {
        const [x, y] = pair.split(',').map(Number);
        const scaledY = y * (aspect / 100);
        return `${x},${scaledY}`;
      }).join(' ');

      poly.setAttribute('points', scaledPoints);
      poly.dataset.regionId = region.id;

      if (selectedRegions.has(region.id)) {
        poly.classList.add('selected');
      }
      if (deviationHighlights.has(region.id)) {
        poly.classList.add('deviation-highlight');
      }

      // Click handler
      poly.addEventListener('click', () => {
        if (selectedRegions.has(region.id)) {
          selectedRegions.delete(region.id);
          poly.classList.remove('selected');
        } else {
          selectedRegions.add(region.id);
          poly.classList.add('selected');
        }
        fireChange();
      });

      // Hover handlers
      poly.addEventListener('mouseenter', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        tooltip.innerHTML = `
          <div class="tooltip-name">${region.name}</div>
          <div class="tooltip-muscles">${region.muscles.join(', ')}</div>
        `;
        tooltip.style.left = `${x + 12}px`;
        tooltip.style.top = `${y - 10}px`;
        tooltip.classList.add('visible');
      });

      poly.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        tooltip.style.left = `${x + 12}px`;
        tooltip.style.top = `${y - 10}px`;
      });

      poly.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });

      svg.appendChild(poly);
    }
  }

  function fireChange() {
    if (onSelectionChange) {
      onSelectionChange({
        selectedRegions: [...selectedRegions],
        muscles: getSelectedMuscles()
      });
    }
  }
}
