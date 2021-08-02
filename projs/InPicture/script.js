var gQueries = [
  {
    id: 1,
    opts: [
      "These koalas are living the life",
      "These capybaras are chilling on a tree ",
    ],
    correctOptIndex: 0,
  },
  {
    id: 2,
    opts: ["This deer must be cold", "This moose must be cold"],
    correctOptIndex: 0,
  },
  {
    id: 3,
    opts: ["Sports Illustrated tiger", "Sports Illustrated lion"],
    correctOptIndex: 1,
  },
  {
    id: 4,
    opts: ["Stylistic rabbit", "Plain rabbit"],
    correctOptIndex: 0,
  },
  {
    id: 5,
    opts: ["Drowning salmon ", "Drowning sperm whale"],
    correctOptIndex: 1,
  },
];
var gCurrQueryIdx = 0;
renderQuery(0);
function renderQuery(queryIdx) {
  var currQuery = gQueries[queryIdx];
  var strHTML = "";
  strHTML += `<img src="img/${currQuery.id}.jpg">`;
  for (var i = 0; i < currQuery.opts.length; i++) {
    strHTML += `<div class="option" onclick="auth(${i})">${currQuery.opts[i]}</div>`;
  }
  var elContainer = document.querySelector(".container");
  elContainer.innerHTML = strHTML;
}
function auth(i) {
  var query = gQueries[gCurrQueryIdx];
  query.correctOptIndex === i ? gCurrQueryIdx++ : (gCurrQueryIdx = 0);
  if (gCurrQueryIdx === 5) {
    console.log("Victory");
    gCurrQueryIdx = 0;
    return;
  }
  renderQuery(gCurrQueryIdx);
}
