// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
//
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

$(document).ready(function(){

var button = $('.buttonSearch');
var source = $("#entry-template").html();
var template = Handlebars.compile(source);

  button.click(function () {

    // reset di pagina
       $(".box-film").html("");

      var stringaRicerca = $('.inputRicerca').val()

      // controllo per evitare di inserire messaggi vuoti
      if (stringaRicerca !== "") {

      $.ajax({

          url:"https://api.themoviedb.org/3/search/movie",
          method: "GET",
          data: {
                api_key: "61de138c818862f9e6c98cd205b6816b",
                language: "it-IT",
                query: stringaRicerca
            },
          success:function (data) {
            // console.log(data);
            var movieList = data.results;
            // console.log(movielist);

            // for (var i = 0; i < listaOggetti.length; i++) {
            //   var movie = listaOggetti[i];

              // se tipo è movie
              // allora var titoloGenerato = movie.title
              // se tipo è tv
              // var titoloGenerato = movie.name
              //
              // var context = {
              //  titolo: movie.title,
              //  titoloOriginale: movie.original_title,

            for (var i = 0; i < movieList.length; i++) {
              var movie = movieList[i];
              var context = {
                    titolo: movie.title,
                    titoloOrig: movie.original_title ,
                    voto: movie.vote_average,
                    lingua: movie.original_language,
                    locandina:movie.poster_path
                    };
              var html = template(context);
              $(".box-film").append(html);
            }

          },
          error: function(richiesta, stato, errori){
          console.log('La richiesta ha prodotto un errore: ', richiesta, stato, errori);
          }
      })

        }
      }

    );

});
