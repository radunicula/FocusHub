import { DEFAULT_SUBGROUPS, DEFAULT_TODOS, DEFAULT_VISUAL_SETTINGS } from './constants.js';

export function createInitialWidgetsForMain() {
  return [
    {
      id: 'w-links-1',
      type: 'links',
      title: 'Quick Links',
      visible: true,
      position: { x: 24, y: 12, width: 390, height: 440, zIndex: 10 },
      data: {
        viewMode: 'list',
        subgroups: structuredClone(DEFAULT_SUBGROUPS),
      },
    },
    {
      id: 'w-todo-1',
      type: 'todo',
      title: 'To-Do List',
      visible: true,
      position: { x: 436, y: 12, width: 400, height: 440, zIndex: 11 },
      data: {
        filter: 'all',
        items: structuredClone(DEFAULT_TODOS),
      },
    },
    {
      id: 'w-notes-1',
      type: 'notes',
      title: 'Quick Notes',
      visible: true,
      position: { x: 860, y: 12, width: 390, height: 440, zIndex: 12 },
      data: {
        content:
          '# Quick Ideas & Notes\n- [x] Switch between **Workspaces** in the top-left\n- [ ] Add widgets from the **+ Add Widget** menu (Calendar, 5-Day Forecast, Clocks, Countdown)\n- [ ] Click this note to edit it, then click outside to see the formatted preview!',
        lastSaved: 'Synced locally',
      },
    },
  ];
}

export function createInitialWorkspaces() {
  return [
    {
      id: 'ws-main',
      name: '🏠 Main',
      initializedLayout: false,
      widgets: createInitialWidgetsForMain(),
    },
    {
      id: 'ws-work',
      name: '💼 Work & Dev',
      initializedLayout: false,
      widgets: [
        {
          id: 'w-links-work-1',
          type: 'links',
          title: 'Project Resources',
          visible: true,
          position: { x: 40, y: 16, width: 410, height: 420, zIndex: 10 },
          data: {
            viewMode: 'list',
            subgroups: [
              {
                id: 'sg-work-1',
                title: 'Repos & Cloud',
                collapsed: false,
                items: [
                  { id: 'lnk-w1', title: 'GitHub', url: 'https://github.com' },
                  { id: 'lnk-w2', title: 'GitLab', url: 'https://gitlab.com' },
                  { id: 'lnk-w3', title: 'Cloudflare Dashboard', url: 'https://dash.cloudflare.com' },
                ],
              },
              {
                id: 'sg-work-2',
                title: 'Documentation',
                collapsed: false,
                items: [
                  { id: 'lnk-w4', title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs' },
                  { id: 'lnk-w5', title: 'MDN JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
                ],
              },
            ],
          },
        },
        {
          id: 'w-todo-work-1',
          type: 'todo',
          title: 'Sprint & Tasks',
          visible: true,
          position: { x: 475, y: 16, width: 410, height: 420, zIndex: 11 },
          data: {
            filter: 'all',
            items: [
              { id: 'td-w1', text: 'Review open pull requests', completed: false, priority: 'high', dueDate: '' },
              { id: 'td-w2', text: 'Update technical documentation', completed: false, priority: 'normal', dueDate: '' },
            ],
          },
        },
        {
          id: 'w-notes-work-1',
          type: 'notes',
          title: 'Technical Journal',
          visible: true,
          position: { x: 910, y: 16, width: 380, height: 420, zIndex: 12 },
          data: {
            content: 'Notes for work projects...',
            lastSaved: 'Synced locally',
          },
        },
      ],
    },
  ];
}

export function createDefaultState() {
  return {
    userName: 'Explorer',
    dailyFocus: {
      text: '',
      completed: false,
    },
    searchEngineIndex: 0,
    weatherVisible: true,
    weatherCity: 'Sibiu',
    background: {
      mode: 'unsplash', // 'unsplash' | 'gradient' | 'custom'
      index: 0,
      customUrl: '',
      category: 'all', // 'all' | 'automotive' | 'software' | 'radar'
      dailyAutoChange: false,
      lastAutoChangeDate: '',
    },
    layoutLocked: false,
    visual: structuredClone(DEFAULT_VISUAL_SETTINGS),
    quoteIndex: 0,
    maxZIndex: 25,
    activeWorkspaceId: 'ws-main',
    workspaces: createInitialWorkspaces(),
  };
}

export function ensureLinksSubgroups(widget) {
  if (widget.type !== 'links') return;
  if (!widget.data) widget.data = { viewMode: 'list', subgroups: [] };
  if (!widget.data.viewMode) widget.data.viewMode = 'list';

  if (!Array.isArray(widget.data.subgroups)) {
    const legacyItems = Array.isArray(widget.data.items) ? widget.data.items : [];
    widget.data.subgroups = [
      {
        id: `sg-${Date.now()}-1`,
        title: 'General',
        collapsed: false,
        items: legacyItems,
      },
    ];
    delete widget.data.items;
  }

  if (widget.data.subgroups.length === 0) {
    widget.data.subgroups.push({
      id: `sg-${Date.now()}-default`,
      title: 'General',
      collapsed: false,
      items: [],
    });
  }
}
