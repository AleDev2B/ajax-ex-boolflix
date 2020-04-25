// Milestone 4:
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix:
// Un header che contiene logo e search bar
// Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio la poster_path con w342)
// Andando con il mouse sopra una card (on hover), appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview


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

// RICHIAMO API PER I FILM
      ajaxRequest ("https://api.themoviedb.org/3/search/movie", "film")

// RICHIAMO API PER LE SERIE TV
      ajaxRequest ("https://api.themoviedb.org/3/search/tv", "serie")

        }

        // FUNZIONI GENERALISTE

        // funzione di generazione della chiamata ajax
          function ajaxRequest (url, tipo) {
            $.ajax({

                url:url,
                method: "GET",
                data: {
                      api_key: "61de138c818862f9e6c98cd205b6816b",
                      language: "it-IT",
                      query: stringaRicerca
                  },
                success:function (data) {
                  // console.log(data);
                  var movieFilmList = data.results;


                  generaLista (movieFilmList, tipo);

                },
                error: function(richiesta, stato, errori){
                console.log('La richiesta ha prodotto un errore: ', richiesta, stato, errori);
                }
            })
          }

          function generaLista(movieFilmList, tipo) {

            for (var i = 0; i < movieFilmList.length; i++) {

              var movie = movieFilmList[i];
              var title,originalTitle;

              if (tipo === "serie") {
                title = movie.name;
                originalTitle = movie.original_name;
              } else if (tipo === "film") {
                title = movie.title;
                originalTitle = movie.original_title;
              };

              // funzione di generazione locandina film
              function genLocandina(imageUrl) {

                var mem ;

                if (movie.poster_path) {
                  mem = 'https://image.tmdb.org/t/p/w300//' + movie.poster_path;
                }
                else if (!movie.poster_path) {
                  mem = 'img/sfondo-grigio.png'
                }
                return mem;
                }

                $(".box-film-ricerca").on({
                  mouseenter: function(){
                    $(".marginUpDownClass",this).fadeOut(500);
                    $(".displayNoneClass",this).show(350);
                  }
                })

                $(".box-film-ricerca").on({
                  mouseleave: function(){
                $(".marginUpDownClass",this).fadeIn(500);
                  $(".displayNoneClass",this).fadeOut(350);
                }
              })
              var context = {
                    titolo: title,
                    titoloOrig: originalTitle,
                    voto: generaStelle(movie.vote_average),
                    lingua: flagGenerator(movie.original_language),
                    tipo: tipo,
                    locandina: genLocandina(movie.poster_path)
                    };
              var html = template(context);
              $(".box-film").append(html);

            }
          }

        // funzione di output voto in stelline
    function generaStelle(voto) {
      // passo da voto base 10 a voto base 5
      var votoBase5 = Math.ceil(voto/2);

      var stars = "";

      for (var i = 1; i <= 5; i++) {
          if(i <= votoBase5){
          // <!-- stella piena -->
    			stars += '<i class="fas fa-star"></i>';
        } else {
          // <!-- stella vuota -->
    			stars += '<i class="far fa-star"></i>';
          // stars = stars + '<i class="far fa-star"></i>';
        }
      }
      return stars;
    }

    // funzione di output bandierine
 function flagGenerator(codiceLang) {
   // lista imgs presenti in cartella img
   var images =  ["it", "en","es","pt"];
   var imgGenerata;

   if(images.includes(codiceLang)){
     imgGenerata = '<img src="img/' + codiceLang + '.png" alt="immagine" class="flags" >';
     return imgGenerata;
   }
   return codiceLang;
 }

      }

    );

});
