//   Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

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

            for (var i = 0; i < movieList.length; i++) {
              var movie = movieList[i];
              var context = {
                    titolo: movie.title,
                    titoloOrig: movie.original_title ,
                    voto: movie.vote_average,
                    lingua: movie.original_language
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
