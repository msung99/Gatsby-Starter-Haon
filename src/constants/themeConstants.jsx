
export const LIGHT_THEME_COLORS = {
  main: {
    background: '#fff',
    text: '#000',
    icon: '#868e97',
    border: '#E2E2E2'
  },

  menuBar: {
    wrapper: 'linear-gradient(to right, #eef2f3, #FAFAFA)',
    sideMenu: '#eef2f3',
    sideMenuHover: '#eef2f3',
    border: '#E2E2E2'
  },

  profile: {
    description: 'black',
    keyword: '#f3f3f3',
  },

  tag: {
    title: 'black',
    text: '#212529',
    count: '#878f98',
    background: '#f3f3f3',
    circle: 'gray',
    hover: '#ced4da',
  },

  postlist: {
    date: '#899097',
    text: 'black',
    tag: '#626262',
    border: '#f3f3f3'
  },

  post: {
    series: '#f3f3f3',
    toc: {
      a: '#666',
      hover: 'black',
    },
    content: {
      text: 'black',
      blockquote: {
        body: '#f7f6f2',
        left: '#c0c0c0',
        text: 'black',
      },
      hr: '#eef2f3',
      language: {
        bg: '#f1f0eb',
        text: 'black',
      },
      a: 'dimgray',
      li: 'black',
    },
    footer: {
      button: '#f7f6f2',
      hover: '#f1f0eb',
    },
  },

  utterances: 'github-light',

  search: {
    input: {
      bottom: '#A9A9A9',
      bg: '#eef2f3',
    },
    underline: '#c3cad1',
  },

  emoji: '#444',
  serieslist: {
    bg: '#cad8e5',
    descriptionBg: '#fafafa',
    date: '#888',
  },
};

export const DARK_THEME_COLORS = {

  main: {
    background: '#1a1a1a',
    text: 'white',
    border: '#282828'
  },

  menuBar: {
    wrapper: 'linear-gradient(to bottom, #1e1e1e, #121212)',
    sideMenu: '#1e1e1e',
    sideMenuHover: '#282828',
    border: '#282828',
  },

  profile: {
    description: '#bababa',
    keyword: '#484848',
  },

  tag: {    
    title: 'gray',
    text: '#cdd4d9',
    count: 'gray',
    background: '#3C3A39',
    circle: 'white',
    hover: '#555',
  },

  postlist: {
    text: '#cdd4d9',
    date: '#cdd4d9',
    border: '#282828',
    tag: "#cdd4d9",
  },

  post: {
    series: '#3C3A39',
    toc: {
      a: '#a0a0a0',
      hover: '#e8e8e8',
    },
    content: {
      text: '#e8e8e8',
      blockquote: {
        body: '#212121',
        left: '#606060',
        text: '#e6e6e6',
      },
      hr: '#282828',
      language: {
        bg: '#606060',
        text: '#e6e6e6',
      },
      a: '#c9c9ca',
      li: 'white',
    },
    footer: {
      button: '#3c3a39',
      hover: '#555555',
    },
  },

  utterances: 'github-dark',

  search: {
    input: {
      bottom: '##888888',
      bg: '#333',
    },
    underline: 'white',
  },

  emoji: '#E2E2E2',
  serieslist: {
    bg: 'linear-gradient(135deg, #1a1a1a, #222222)',
    descriptionBg: 'linear-gradient(180deg, #1e1e1e, #292929)',
    date: '#a1a6b0',
  },
};