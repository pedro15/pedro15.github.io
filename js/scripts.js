// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600);
      }
    }
  });

  const project_item = ({image,title,description,project_url}) => `
  <div class="card text-white bg-dark mb-3 project-card">          
  <div class="card-body">
    <div class="row">
      <div class="col-sm-10 col-md-5 col-lg-4">
        <div class="card-img">
          <img src="${image}" alt="image">
        </div>
      </div>
      <div class="col">
        <div class="container card-body card-body-big">
          <h3 class="card-title">${title}</h3>
            ${description}
        </div>
        <div class="container-fluid">
            <a href="${project_url}" target="_blank" class="btn btn-dark float-right">Ver Proyecto <i class="fa fa-arrow-right"></i></a>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
  
  $(document).ready(function(){
     $.getJSON("./projects.json",function(projects)
     {
          var profesional = projects["profesional-projects"];  
          $('#pro-projects-container').html(profesional.map(project_item).join(''));

          var personal = projects["personal-projects"];
          $('#per-projects-container').html(personal.map(project_item).join(''));

          var elm = $('.project-card');
          elm.mouseenter(function(event){
            $(event.currentTarget).find('img').transition({scale:1.2},400);
          });
          
          elm.mouseleave(function(event){
            $(event.currentTarget).find('img').transition({scale:1.0},400);
          });
     });
  });