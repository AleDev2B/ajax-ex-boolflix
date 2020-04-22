//   Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function(){


var button = $('.buttonSearch');

  button.click(
    function () {
      var stringaRicerca = $('.inputRicerca').val()
      // controllo per evitare di inserire messaggi vuoti
      if (stringaRicerca !== "") {

      // sostituisco gli spazi con +, cosi da agevolare la ricerca
      stringaRicerca = stringaRicerca.replace(" ","+")
      // console.log(stringaRicerca);

      $.ajax({

          url:"https://api.themoviedb.org/3/movie/550?api_key=61de138c818862f9e6c98cd205b6816b",
          method: "GET",
          dataType: "json",
          data: {
                api_key: "61de138c818862f9e6c98cd205b6816b",
                query: stringaRicerca,
            },
          success:function (data) {
            for (var i = 0; i < data.length; i++) {

              var source = $("#entry-template").html();
              var template = Handlebars.compile(source);
              var context = {
                    titolo: data.results[i].title,
                    titoloOrig: data.results[i].original_title ,
                    voto: data.results[i].vote_average,
                    lingua: data.results[i].original_language
                    };
                var html = template(context);
              source.append(html);

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
