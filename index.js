//******************CUANDO HAY CONLICTOS DE JQERY CON PROPTOTYE
// $.noConflict();
// jQuery(document).ready(function(){
//   $ //jQuery
// })
// $ // Prototype

// $(function(){
  // var header = $('#app-header h1')
  //
  // $('#app-header').find('h1') //encontrar de manera mas rapida
  // $('#app-header').has('h1') //todos los appheader que tengan un h1 dentro
  // $('#app-header').not('h1') //todos los header que no tengan h1
  // $('p').filter('.text') //todos los p que tengan class .text
  // //anidaciones
  // $('p')
  //   .filter('.text')
  //   .has('a')
  //   .first() // primero de todos
  //   .eq(1)// el segundo indice
  //
  // //Para actualizar un var
  // var ps = $('p')
  // ps = ps.add(p)

  // var a = $('<a>',{
  //   href: 'http://www.google.com',
  //   target: '_blank',
  //   html: 'Ir a google'
  // })
  // $('#app-body').append(a)
  //
  // // console.log(a.attr('href'))  //getter
  // // a.attr('href', 'http://www.facebook.com') //getter
  //
  // a.attr({
  //   href: 'http://www.facebook.com',
  //   html: 'Vaos a gogoel'
  // })

// })

$(function(){

  var $tvShowsContainer = $('#app-body').find('.tv-shows')
  function renderShows(shows){
    $tvShowsContainer.find('.loader').remove();
    shows.forEach(function (show) {
      //Asignamos el url que tiene ese show a una variable
      //o dejamos la variable imagen como cadena vacia
      var imagen = (show.image != null) ? show.image.medium : '';
      var article = template
        .replace(':name:', show.name)
        .replace(':img:', imagen)
        .replace(':summary:', show.summary)
        .replace(':img alt:', show.name + " Logo")

        var $article = $(article);
        $article.hide();
        $tvShowsContainer.append($article.fadeTo(1000, 1 , "linear"));
    })
  }
  //Submit search form

  $('#app-body')
    .find('form')
    .submit(function (ev) {
      ev.preventDefault();
      var bus = $(this).find('input[type="text"]').val();
      $.ajax({
        url: 'http://api.tvmaze.com/search/shows',
        data: { q: bus },
        success: function (res, textStatus, xhr){
          $tvShowsContainer.find('.tv-show').remove()
          var shows = res.map(function(el){
            return el.show;
          })
          renderShows(shows)
        }
      })
  })


  //AJAX

  var template =
    '<article class="tv-show">' +
      '<div class="left img-container">' +
        '<img src=":img:" alt=":img alt:">' +
      '</div>' +
      '<div class="right info">' +
        '<h1>:name:</h1>' +
        '<p>:summary:</p>' +
      '</div>' +
    '</article>';

  if(!localStorage.showing){
    //Usando promesas
    $.ajax('http://api.tvmaze.com/shows')
    .then(function(shows){
      $tvShowsContainer.find('.loader').remove();
      localStorage.showing = JSON.stringify(shows);
      renderShows(shows);
    })
  } else {
    renderShows(JSON.parse(localStorage.showing));
  }


  })
