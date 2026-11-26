import { getActiveWorkspace, saveState, state } from './state.js';
import { renderAllWidgets } from './widgets/manager.js';

// ==========================================================================
// 6. SISTEMUL MULTI-WIDGET CU MUTARE ORIUNDE & DRAG-AND-DROP
// ==========================================================================

// Global state for dragging and dropping a link or task
export let draggedLinkPayload = null;
export let draggedTodoPayload = null;

export const canvasEl = document.getElementById('widgets-canvas');
export const widgetsCountBadge = document.getElementById('widgets-count-badge');
export const widgetsManagerBtn = document.getElementById('widgets-manager-btn');
export const widgetsManagerPopover = document.getElementById('widgets-manager-popover');
export const widgetsManagerList = document.getElementById('widgets-manager-list');
export const showAllWidgetsBtn = document.getElementById('show-all-widgets-btn');
export const autoArrangeBtn = document.getElementById('auto-arrange-btn');

const NARROW_STACK_BREAKPOINT = 680;
let layoutSyncRafId = null;

function getCanvasDimensions() {
  const rect = canvasEl.getBoundingClientRect();
  const width = Math.max(Math.floor(canvasEl.clientWidth || window.innerWidth - 32), 260);
  const footerEl = document.querySelector('footer');
  const footerHeight = footerEl ? footerEl.getBoundingClientRect().height : 48;
  const canvasTop = rect.top + window.scrollY;
  const availableHeight = Math.max(
    260,
    Math.floor(window.innerHeight - canvasTop - footerHeight - 32)
  );
  return { width, availableHeight };
}

function getWorkspaceReferenceSize(ws, currentWidth, currentHeight) {
  if (ws.layoutWidth > 0 && ws.layoutHeight > 0) {
    return { refWidth: ws.layoutWidth, refHeight: ws.layoutHeight };
  }
  let maxRight = 0;
  let maxBottom = 0;
  ws.widgets.forEach((w) => {
    if (!w.visible) return;
    const right = (w.position?.x ?? 0) + (w.position?.width ?? 390);
    const bottom = (w.position?.y ?? 0) + (w.position?.height ?? 420);
    if (right > maxRight) maxRight = right;
    if (bottom > maxBottom) maxBottom = bottom;
  });
  return {
    refWidth: maxRight > currentWidth ? maxRight + 16 : currentWidth,
    refHeight: maxBottom > currentHeight ? maxBottom + 16 : currentHeight,
  };
}

export function computeRenderedLayout(ws) {
  const { width: canvasWidth, availableHeight } = getCanvasDimensions();
  const rects = new Map();
  const visibleWidgets = ws.widgets.filter((w) => w.visible);

  if (canvasWidth < NARROW_STACK_BREAKPOINT) {
    const gap = 14;
    let cursorY = 6;
    const stackedHeight = Math.max(260, Math.min(400, Math.floor(availableHeight * 0.78)));
    visibleWidgets.forEach((w) => {
      const h = Math.max(220, Math.min(stackedHeight, w.position?.height ?? 380));
      rects.set(w.id, { x: 0, y: cursorY, width: canvasWidth, height: h });
      cursorY += h + gap;
    });
    return { rects, canvasWidth, availableHeight, isStacked: true };
  }

  // Only the horizontal axis scales with the viewport; heights stay as the user set them and
  // the page scrolls instead (vertical scaling combined with the minimum height caused overlaps).
  const { refWidth } = getWorkspaceReferenceSize(ws, canvasWidth, availableHeight);
  const scaleX = refWidth > 0 ? canvasWidth / refWidth : 1;
  const minW = Math.min(280, Math.max(220, canvasWidth - 8));
  const minH = 220;

  visibleWidgets.forEach((w) => {
    const pos = w.position || { x: 20, y: 20, width: 390, height: 420 };
    let width = Math.round((pos.width ?? 390) * scaleX);
    width = Math.max(minW, Math.min(canvasWidth, width));

    let x = Math.round((pos.x ?? 20) * scaleX);
    const maxX = Math.max(0, canvasWidth - width);
    x = Math.max(0, Math.min(maxX, x));

    const height = Math.max(minH, Math.round(pos.height ?? 420));

    let y = Math.round(pos.y ?? 20);
    y = y >= 0 ? y : Math.max(-210, y);

    rects.set(w.id, { x, y, width, height });
  });

  resolveOverlaps(rects);

  return { rects, canvasWidth, availableHeight, isStacked: false };
}

const LAYOUT_GAP = 16;

function rectsOverlap(a, b, gap = 0) {
  return (
    a.x < b.x + b.width + gap &&
    b.x < a.x + a.width + gap &&
    a.y < b.y + b.height + gap &&
    b.y < a.y + a.height + gap
  );
}

// Pushes widgets down (top-to-bottom, left-to-right) until none of them overlap.
function resolveOverlaps(rects) {
  const ordered = [...rects.values()].sort((a, b) => a.y - b.y || a.x - b.x);
  const placed = [];
  ordered.forEach((rect) => {
    let collided = true;
    while (collided) {
      collided = false;
      for (const other of placed) {
        if (rectsOverlap(rect, other)) {
          rect.y = other.y + other.height + LAYOUT_GAP;
          collided = true;
        }
      }
    }
    placed.push(rect);
  });
}

// First free spot (top-most, then left-most) where a widget of the given size fits without overlapping.
export function findFreeSlot(occupied, width, height, canvasWidth) {
  const maxX = Math.max(0, canvasWidth - width);
  const xs = new Set([0]);
  const ys = new Set([6]);
  occupied.forEach((r) => {
    xs.add(r.x);
    xs.add(r.x + r.width + LAYOUT_GAP);
    ys.add(r.y);
    ys.add(r.y + r.height + LAYOUT_GAP);
  });
  const xList = [...xs].filter((x) => x >= 0 && x <= maxX).sort((a, b) => a - b);
  const yList = [...ys].filter((y) => y >= 0).sort((a, b) => a - b);

  for (const y of yList) {
    for (const x of xList) {
      const candidate = { x, y, width, height };
      if (!occupied.some((r) => rectsOverlap(candidate, r, LAYOUT_GAP))) return { x, y };
    }
  }
  const bottom = occupied.reduce((max, r) => Math.max(max, r.y + r.height), 0);
  return { x: 0, y: occupied.length ? bottom + LAYOUT_GAP : 6 };
}

export function bakeWorkspaceLayoutToCurrentViewport(ws) {
  const { rects, canvasWidth, availableHeight, isStacked } = computeRenderedLayout(ws);
  if (isStacked) return { canvasWidth, availableHeight, isStacked };

  ws.widgets.forEach((w) => {
    const rect = rects.get(w.id);
    if (rect) {
      w.position = {
        ...(w.position || {}),
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    }
  });
  ws.layoutWidth = canvasWidth;
  ws.layoutHeight = availableHeight;
  return { canvasWidth, availableHeight, isStacked };
}

export function autoArrangeWidgets(shouldSave = true) {
  const activeWs = getActiveWorkspace();
  const { width: canvasWidth, availableHeight } = getCanvasDimensions();
  const visibleWidgets = activeWs.widgets.filter((w) => w.visible);
  if (visibleWidgets.length === 0) return;

  const gap = canvasWidth < 700 ? 14 : 20;
  const maxCols =
    canvasWidth >= 2200 ? 5 :
    canvasWidth >= 1680 ? 4 :
    canvasWidth >= 1100 ? 3 :
    canvasWidth >= 700 ? 2 : 1;
  const cols = Math.min(maxCols, visibleWidgets.length);
  const maxColWidth =
    cols === 1
      ? canvasWidth
      : Math.min(580, Math.floor((canvasWidth - gap * (cols - 1)) / cols));
  const colWidth = Math.max(Math.min(260, canvasWidth), maxColWidth);
  const totalGridWidth = cols * colWidth + (cols - 1) * gap;
  const startX = Math.max(0, Math.floor((canvasWidth - totalGridWidth) / 2));

  const singleRow = visibleWidgets.length <= cols;
  const singleRowHeight = Math.max(260, Math.min(620, availableHeight - 16));

  const colHeights = new Array(cols).fill(6);

  visibleWidgets.forEach((widget) => {
    // Choose the shortest column for balanced placement
    let shortestCol = 0;
    for (let i = 1; i < cols; i++) {
      if (colHeights[i] < colHeights[shortestCol]) {
        shortestCol = i;
      }
    }

    const x = startX + shortestCol * (colWidth + gap);
    const y = colHeights[shortestCol];
    // Multi-row layouts keep each widget's own height (masonry), so content isn't squeezed.
    const height = singleRow
      ? singleRowHeight
      : Math.max(280, Math.min(480, widget.position?.height ?? 420));

    widget.position = {
      x,
      y,
      width: colWidth,
      height,
      zIndex: ++state.maxZIndex,
    };

    colHeights[shortestCol] += height + gap;
  });

  activeWs.layoutWidth = canvasWidth;
  activeWs.layoutHeight = availableHeight;

  updateCanvasMinHeight();
  if (shouldSave) saveState();
  renderAllWidgets();
}

export function updateCanvasMinHeight(precomputedLayout = null) {
  const activeWs = getActiveWorkspace();
  const { rects, availableHeight } = precomputedLayout || computeRenderedLayout(activeWs);
  let maxBottom = 0;
  rects.forEach((rect) => {
    const bottom = rect.y + rect.height + 8;
    if (bottom > maxBottom) maxBottom = bottom;
  });
  canvasEl.style.minHeight = maxBottom > availableHeight ? `${maxBottom}px` : '';
}

function applyWidgetLayoutToDOM() {
  const activeWs = getActiveWorkspace();
  const layout = computeRenderedLayout(activeWs);
  const cards = canvasEl.querySelectorAll('.draggable-widget[data-widget-id]');
  cards.forEach((cardEl) => {
    const rect = layout.rects.get(cardEl.dataset.widgetId);
    if (!rect) return;
    cardEl.style.left = `${rect.x}px`;
    cardEl.style.top = `${rect.y}px`;
    cardEl.style.width = `${rect.width}px`;
    cardEl.style.height = `${rect.height}px`;
  });
  updateCanvasMinHeight(layout);
}

export function scheduleLayoutSync() {
  if (layoutSyncRafId !== null) return;
  layoutSyncRafId = window.requestAnimationFrame(() => {
    layoutSyncRafId = null;
    applyWidgetLayoutToDOM();
  });
}

// After a drag/resize: persist the overlap-free layout and slide displaced widgets into place.
function commitLayoutAfterInteraction() {
  bakeWorkspaceLayoutToCurrentViewport(getActiveWorkspace());
  applyWidgetLayoutToDOM();
  saveState();
}

export function bringToFront(widget, domEl) {
  state.maxZIndex = (state.maxZIndex || 25) + 1;
  widget.position.zIndex = state.maxZIndex;
  if (domEl) {
    domEl.style.zIndex = String(widget.position.zIndex);
  }
}

const SNAP_THRESHOLD = 10;
const SNAP_GAP = 16;

function clearSnapGuides() {
  canvasEl.querySelectorAll('.snap-guide-line').forEach((el) => el.remove());
}

function renderSnapGuides(guideX, guideY) {
  clearSnapGuides();
  if (guideX !== null) {
    const lineV = document.createElement('div');
    lineV.className = 'snap-guide-line snap-guide-v';
    lineV.style.left = `${guideX}px`;
    canvasEl.appendChild(lineV);
  }
  if (guideY !== null) {
    const lineH = document.createElement('div');
    lineH.className = 'snap-guide-line snap-guide-h';
    lineH.style.top = `${guideY}px`;
    canvasEl.appendChild(lineH);
  }
}

export function applyLockLayoutState() {
  const locked = Boolean(state.layoutLocked);
  document.body.classList.toggle('layout-locked', locked);
  const btn = document.getElementById('lock-layout-btn');
  const icon = document.getElementById('lock-layout-icon');
  const label = document.getElementById('lock-layout-label');
  if (btn) {
    btn.classList.toggle('is-locked', locked);
    btn.title = locked
      ? 'Layout is locked (click to unlock dragging & resizing)'
      : 'Lock widget positions and sizes';
  }
  if (icon) icon.textContent = locked ? '🔒' : '🔓';
  if (label) label.textContent = locked ? 'Locked' : 'Lock';
}

export function attachDragBehavior(widget, cardEl, handleEl) {
  handleEl.addEventListener('pointerdown', (e) => {
    if (state.layoutLocked) return;
    if (
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('select') ||
      e.target.closest('[contenteditable="true"]')
    ) {
      return;
    }

    e.preventDefault();
    bringToFront(widget, cardEl);

    const activeWs = getActiveWorkspace();
    const { canvasWidth, isStacked } = bakeWorkspaceLayoutToCurrentViewport(activeWs);
    if (isStacked) return;

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startX = widget.position.x || 0;
    const startY = widget.position.y || 0;
    const currentWidth = widget.position.width || 320;
    const currentHeight = widget.position.height || 420;

    const siblings = activeWs.widgets
      .filter((w) => w.visible && w.id !== widget.id)
      .map((w) => ({
        x: w.position?.x || 0,
        y: w.position?.y || 0,
        w: w.position?.width || 390,
        h: w.position?.height || 420,
      }));

    cardEl.classList.add('is-dragging');
    handleEl.setPointerCapture(e.pointerId);

    const onPointerMove = (moveEvent) => {
      const dx = moveEvent.clientX - startMouseX;
      const dy = moveEvent.clientY - startMouseY;

      const maxX = Math.max(0, canvasWidth - currentWidth);
      let nextX = Math.max(0, Math.min(maxX, Math.round(startX + dx)));
      let nextY = Math.max(-210, Math.round(startY + dy));
      let guideX = null;
      let guideY = null;

      // Magnetic snap to canvas edges & sibling widgets
      const xCandidates = [
        { target: 0, guide: 0 },
        { target: maxX, guide: canvasWidth },
      ];
      const yCandidates = [{ target: 6, guide: 6 }];

      siblings.forEach((s) => {
        xCandidates.push(
          { target: s.x, guide: s.x },
          { target: s.x + s.w - currentWidth, guide: s.x + s.w },
          { target: s.x + s.w + SNAP_GAP, guide: s.x + s.w + SNAP_GAP },
          { target: s.x - currentWidth - SNAP_GAP, guide: s.x - SNAP_GAP }
        );
        yCandidates.push(
          { target: s.y, guide: s.y },
          { target: s.y + s.h - currentHeight, guide: s.y + s.h },
          { target: s.y + s.h + SNAP_GAP, guide: s.y + s.h + SNAP_GAP },
          { target: s.y - currentHeight - SNAP_GAP, guide: s.y - SNAP_GAP }
        );
      });

      let bestDx = SNAP_THRESHOLD + 1;
      for (const c of xCandidates) {
        const dist = Math.abs(nextX - c.target);
        if (dist < bestDx && c.target >= 0 && c.target <= maxX) {
          bestDx = dist;
          nextX = c.target;
          guideX = c.guide;
        }
      }

      let bestDy = SNAP_THRESHOLD + 1;
      for (const c of yCandidates) {
        const dist = Math.abs(nextY - c.target);
        if (dist < bestDy && c.target >= -210) {
          bestDy = dist;
          nextY = c.target;
          guideY = c.guide;
        }
      }

      renderSnapGuides(guideX, guideY);

      widget.position.x = nextX;
      widget.position.y = nextY;

      cardEl.style.left = `${nextX}px`;
      cardEl.style.top = `${nextY}px`;
    };

    const onPointerUp = (upEvent) => {
      cardEl.classList.remove('is-dragging');
      clearSnapGuides();
      if (handleEl.hasPointerCapture(upEvent.pointerId)) {
        handleEl.releasePointerCapture(upEvent.pointerId);
      }
      handleEl.removeEventListener('pointermove', onPointerMove);
      handleEl.removeEventListener('pointerup', onPointerUp);
      handleEl.removeEventListener('pointercancel', onPointerUp);
      commitLayoutAfterInteraction();
    };

    handleEl.addEventListener('pointermove', onPointerMove);
    handleEl.addEventListener('pointerup', onPointerUp);
    handleEl.addEventListener('pointercancel', onPointerUp);
  });
}

export function attachResizeBehavior(widget, cardEl, resizeEl) {
  resizeEl.addEventListener('pointerdown', (e) => {
    if (state.layoutLocked) return;
    e.preventDefault();
    e.stopPropagation();
    bringToFront(widget, cardEl);

    const activeWs = getActiveWorkspace();
    const { canvasWidth } = bakeWorkspaceLayoutToCurrentViewport(activeWs);

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startW = widget.position.width || 390;
    const startH = widget.position.height || 430;
    const currentX = widget.position.x || 0;
    const maxAllowedW = Math.max(280, canvasWidth - currentX);
    const maxAllowedH = Math.max(900, Math.floor(window.innerHeight * 0.9));

    cardEl.classList.add('is-dragging');
    resizeEl.setPointerCapture(e.pointerId);

    const onPointerMove = (moveEvent) => {
      const dw = moveEvent.clientX - startMouseX;
      const dh = moveEvent.clientY - startMouseY;

      const nextW = Math.max(260, Math.min(maxAllowedW, Math.round(startW + dw)));
      const nextH = Math.max(220, Math.min(maxAllowedH, Math.round(startH + dh)));

      widget.position.width = nextW;
      widget.position.height = nextH;

      cardEl.style.width = `${nextW}px`;
      cardEl.style.height = `${nextH}px`;
    };

    const onPointerUp = (upEvent) => {
      cardEl.classList.remove('is-dragging');
      if (resizeEl.hasPointerCapture(upEvent.pointerId)) {
        resizeEl.releasePointerCapture(upEvent.pointerId);
      }
      resizeEl.removeEventListener('pointermove', onPointerMove);
      resizeEl.removeEventListener('pointerup', onPointerUp);
      resizeEl.removeEventListener('pointercancel', onPointerUp);
      commitLayoutAfterInteraction();
    };

    resizeEl.addEventListener('pointermove', onPointerMove);
    resizeEl.addEventListener('pointerup', onPointerUp);
    resizeEl.addEventListener('pointercancel', onPointerUp);
  });
}

// Move a dragged link to the target subgroup/position
export function moveLinkViaDragDrop(targetWidgetId, targetSubgroupId, targetLinkId = null) {
  if (!draggedLinkPayload) return;
  const { sourceWidgetId, sourceSubgroupId, linkId } = draggedLinkPayload;
  if (
    sourceWidgetId === targetWidgetId &&
    sourceSubgroupId === targetSubgroupId &&
    linkId === targetLinkId
  ) {
    return;
  }

  const activeWs = getActiveWorkspace();
  const srcWidget = activeWs.widgets.find((w) => w.id === sourceWidgetId);
  const dstWidget = activeWs.widgets.find((w) => w.id === targetWidgetId);
  if (!srcWidget || !dstWidget) return;

  const srcSg = srcWidget.data?.subgroups?.find((s) => s.id === sourceSubgroupId);
  const dstSg = dstWidget.data?.subgroups?.find((s) => s.id === targetSubgroupId);
  if (!srcSg || !dstSg) return;

  const linkIdx = srcSg.items.findIndex((item) => item.id === linkId);
  if (linkIdx === -1) return;

  const [movedLink] = srcSg.items.splice(linkIdx, 1);
  dstSg.collapsed = false;

  if (targetLinkId) {
    const dstIdx = dstSg.items.findIndex((item) => item.id === targetLinkId);
    if (dstIdx !== -1) {
      dstSg.items.splice(dstIdx, 0, movedLink);
    } else {
      dstSg.items.push(movedLink);
    }
  } else {
    dstSg.items.push(movedLink);
  }

  draggedLinkPayload = null;
  saveState();
  renderAllWidgets();
}

// Move a dragged to-do task within the same list or to another to-do panel
export function moveTodoViaDragDrop(targetWidgetId, targetTodoId = null) {
  if (!draggedTodoPayload) return;
  const { sourceWidgetId, todoId } = draggedTodoPayload;
  if (sourceWidgetId === targetWidgetId && todoId === targetTodoId) return;

  const activeWs = getActiveWorkspace();
  const srcWidget = activeWs.widgets.find((w) => w.id === sourceWidgetId);
  const dstWidget = activeWs.widgets.find((w) => w.id === targetWidgetId);
  if (!srcWidget || !dstWidget || srcWidget.type !== 'todo' || dstWidget.type !== 'todo') return;

  const srcItems = srcWidget.data?.items || [];
  const dstItems = dstWidget.data?.items || [];
  const srcIdx = srcItems.findIndex((t) => t.id === todoId);
  if (srcIdx === -1) return;

  const [movedTodo] = srcItems.splice(srcIdx, 1);
  if (targetTodoId) {
    const dstIdx = dstItems.findIndex((t) => t.id === targetTodoId);
    if (dstIdx !== -1) {
      dstItems.splice(dstIdx, 0, movedTodo);
    } else {
      dstItems.push(movedTodo);
    }
  } else {
    dstItems.push(movedTodo);
  }

  draggedTodoPayload = null;
  saveState();
  renderAllWidgets();
}

export function setDraggedLinkPayload(payload) {
  draggedLinkPayload = payload;
}

export function setDraggedTodoPayload(payload) {
  draggedTodoPayload = payload;
}
