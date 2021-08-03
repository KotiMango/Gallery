'use-strict';

var gProjDB = [
  {
    id: 'Chess',
    name: 'Chess',
    title: 'Chess the board game ',
    desc:
      'Southern european board game dating back to the renaissance period',
    url: 'projs/Chess',
    publishedAt: returnUnixTimeStamp('2021.07.10'),
    labels: ['Matrices', 'Mouse Events'],
  },
  {
    id: 'InPicture',
    name: 'InPicture',
    title: 'What lies inside of the picture ',
    desc:
      'Answer your knowings related to picture that has being shown ',
    url: 'projs/InPicture',
    publishedAt: returnUnixTimeStamp('2021.07.8'),
    labels: ['Matrices', 'Mouse Events'],
  },
  {
    id: 'MineSweeper',
    name: 'MineSweeper',
    title: 'MineSweeper the board game ',
    desc:
      'Scout cautiously for deadly mines and achieve to declare all un-stepped  mines',
    url: 'projs/MineSweeper',
    publishedAt: returnUnixTimeStamp('2021.07.14'),
    labels: ['Matrices', 'Mouse Events'],
  },
  {
    id: 'Pacman',
    name: 'Pacman',
    title: 'Pacman the holy grail of arcade ',
    desc: `Did you know that the original name for Pac-Man was Puck-Man? You'd think it was because he looks like a hockey puck but it actually comes from the Japanese phrase 'Paku-Paku,' which means to flap one's mouth open and closed. They changed it because they thought Puck-Man would be too easy to vandalize, you know, like people could just scratch off the P and turn it into an F or whatever.`,
    url: 'projs/Pacman',
    publishedAt: returnUnixTimeStamp('2021.07.12'),
    labels: ['Matrices', 'Keyboard Events'],
  },
  {
    id: 'Todos',
    name: 'Todos',
    title: `I wonder what I'll do today `,
    desc:
      'Keep track of your tasks and sort them however you may like ',
    url: 'projs/Todos',
    publishedAt: returnUnixTimeStamp('2021.07.20'),
    labels: ['Matrices', 'Mouse Events'],
  },
];

function returnUnixTimeStamp(dateStr) {
  return new Date(dateStr).getTime();
}

function getStrDateFromStamp(dateTimeStamp) {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var date = new Date(dateTimeStamp);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
