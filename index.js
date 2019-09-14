window.onload = () => {
  const $tvShowsContainer = document.querySelector("#tv-shows")
  const $loader = document.querySelector(".loader")
  const $form = document.querySelector(".search-form")

  renderMovies = (movie) => {

    const movietemplate = createTemplate(movie)
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = movietemplate


    $tvShowsContainer.appendd(html)




  }

  const createTemplate = (movie) => {
    return `
      <article class="tv-show">
        <div class="left img-container">
          <img src=${movie.image} alt="">
        </div>
        <div class="right info">
          <h1>${movie.name}</h1>
          <p>${movie.summary}</p>
        </div>
      </article>
       `
  }

  const getMovies = async () => {
    const response = await fetch("http://api.tvmaze.com/shows")
    const data = await response.json()
    const movies = data.map(movie => renderMovies(movie))
    console.log(data)
  }

  getMovies()

}





// $(function () {

//   var $tvShowsContainer = $('#app-body').find('.tv-shows')

//   function renderShows(shows) {
//     $tvShowsContainer.find('.loader').remove();
//     shows.forEach(function (show) {
//       //Asignamos el url que tiene ese show a una variable
//       //o dejamos la variable imagen como cadena vacia
//       var imagen = (show.image != null) ? show.image.medium : '';
//       var article = template
//         .replace(':name:', show.name)
//         .replace(':img:', imagen)
//         .replace(':summary:', show.summary)
//         .replace(':img alt:', show.name + " Logo")

//       var $article = $(article);
//       $article.hide();
//       $tvShowsContainer.append($article.fadeTo(1000, 1, "linear"));
//     })
//   }
//Submit search form

// $('#app-body')
//   .find('form')
//   .submit(function (ev) {
//     ev.preventDefault();
//     var bus = $(this).find('input[type="text"]').val();
//     $.ajax({
//       url: 'http://api.tvmaze.com/search/shows',
//       data: {
//         q: bus
//       },
//       success: function (res, textStatus, xhr) {
//         $tvShowsContainer.find('.tv-show').remove()
//         var shows = res.map(function (el) {
//           return el.show;
//         })
//         renderShows(shows)
//       }
//     })
//   })

// $form.addEventListener("onsubmit", (e) => {
//   e.preventDefault()
//   const value = $form.querySelector("input").value
//   console.log(value)

// })


//AJAX
// const videoTemplate = `
// <article class="tv-show">
//    <div class="left img-container">
//      <img src="" alt="">
//    </div>
//    <div class="right info">
//      <h1>name</h1>
//      <p>summary</p>
//    </div>
//  </article>
//  `

// var template =
//   '<article class="tv-show">' +
//   '<div class="left img-container">' +
//   '<img src=":img:" alt=":img alt:">' +
//   '</div>' +
//   '<div class="right info">' +
//   '<h1>:name:</h1>' +
//   '<p>:summary:</p>' +
//   '</div>' +
//   '</article>';

//   if (!localStorage.showing) {
//     //Usando promesas
//     $.ajax('http://api.tvmaze.com/shows')
//       .then(function (shows) {
//         $tvShowsContainer.find('.loader').remove();
//         localStorage.showing = JSON.stringify(shows);
//         renderShows(shows);
//       })
//   } else {
//     renderShows(JSON.parse(localStorage.showing));
//   }


// })