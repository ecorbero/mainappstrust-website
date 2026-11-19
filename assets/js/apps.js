/* The five apps, in the same order as the original site.
   Images live in assets/img/apps/ (app01..app05 as in the Flutter build). */
window.APPS = [
  {
    id: 'camera',
    slug: 'pro-camera-simulator',
    asset: 'app05',
    kind: 'app',
    accent: '#2f9df2',
    accent2: '#63c8ff',
    ink: '#ffffff',
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.MainAppsTrust.ProCameraSimulator',
      apple: 'https://apps.apple.com/us/developer/id1458216905',
    },
    shots: 4,
  },
  {
    id: 'puzzle',
    slug: 'puzzle-impossible',
    asset: 'app01',
    kind: 'game',
    accent: '#2b8fd8',
    accent2: '#5ec1ff',
    ink: '#ffffff',
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.MainGamesTrust.PuzzleImpossible',
      apple: 'https://apps.apple.com/us/developer/id1458216905',
    },
    shots: 4,
  },
  {
    id: 'naik',
    slug: 'naik-baik',
    asset: 'app02',
    kind: 'game',
    accent: '#4a9fdd',
    accent2: '#7cc8f5',
    ink: '#ffffff',
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.maingamestrust.NaikBaik',
      apple: 'https://apps.apple.com/us/developer/id1458216905',
    },
    shots: 4,
  },
  {
    id: 'tower',
    slug: 'tower-4-colors',
    asset: 'app03',
    kind: 'game',
    accent: '#35a7bd',
    accent2: '#8fe3ef',
    ink: '#ffffff',
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.MainGamesTrust.Tower4Colors',
      apple: 'https://apps.apple.com/us/developer/id1458216905',
    },
    shots: 5,
  },
  {
    id: 'pendulum',
    slug: 'the-original-pendulum-art',
    asset: 'app04',
    kind: 'game',
    accent: '#4c004b',
    accent2: '#8a2070',
    ink: '#ffffff',
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.MainGamesTrust.TheOriginalPendulumArt',
      apple: 'https://apps.apple.com/us/developer/id1458216905',
    },
    shots: 4,
  },
];

window.APPLE_DEVELOPER = 'https://apps.apple.com/us/developer/id1458216905';
window.SITE = {
  email: 'contact@mainappstrust.com',
  address: '22@ Poblenou, Barcelona, Catalunya',
  developerPage: 'https://play.google.com/store/apps/developer?id=Main+Apps+Trust+s.l.',
};
