$(function () {
  renderModals();
  renderProjs();
  getEmailLink();
});

function renderProjs() {
  var strHtmls = gProjDB.map(function (val, idx, arr) {
    return `<div class="col-md-4 col-sm-6 portfolio-item">
    <a
      class="portfolio-link"
      data-toggle="modal"
      href="#portfolioModal${idx + 1}"
    >
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img
        class="img-thumbnail img-fluid"
        src="./img/portfolio/0${idx + 1}-thumbnail.jpg"
        alt=""
      />
    </a>
    <div class="portfolio-caption">
      <h4>${val.name}</h4>
      <p class="text-muted">${val.labels
        .map(function (val) {
          return `<span class="m-2 badge badge-primary">${val}</span>`;
        })
        .join('')}</p>
    </div>
  </div>`;
  });
  //map over projdb to create html for it
  $('.row-portfolio').html(strHtmls.join(''));
}

function renderModals() {
  var strHtmls = gProjDB.map(function (val, idx, arr) {
    return ` <div
    class="portfolio-modal modal fade"
    id="portfolioModal${idx + 1}"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${val.name}</h2>
                <p class="item-intro text-muted">
                  In JS we trust
                </p>
                <img
                  class="img-fluid d-block mx-auto"
                  src="./img/portfolio/0${idx + 1}-thumbnail.jpg"
                  alt=""
                />
                <p>
                ${val.desc}
                </p>
                <ul class="list-inline">
                  <li>Date: ${getStrDateFromStamp(
                    val.publishedAt
                  )}</li>
                  <li>Client: ${val.name}</li>
                  <li>Category: Game</li>
                </ul>
                <button
                  class="btn btn-primary"
                  data-dismiss="modal"
                  type="button"
                >
                  <i class="fa fa-times"></i>
                  Close Project
                </button>
                <a
                  class="btn btn-primary"
                  href='./${val.url}/index.html'"
                  target="_blank"
                >
                  <i class="fa fa-hand-pointer-o"></i>
                  redirect to project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  });
  console.log(strHtmls);
  $('.row-modals').html(strHtmls.join(''));
}

function getEmailLink() {
  $('#contact-btn').click(function () {
    var emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=rons20000@gmail.com&su=${$(
      '#contact-subject'
    ).val()}&body=${$('#msg-body').val()}`;
    window.open(emailLink, '_blank');
  });
}
