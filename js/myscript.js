// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
//
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

$(document).ready(function () {

var button = $('.buttonSearch');
var source = $("#entry-template").html();
var template = Handlebars.compile(source);

  button.click(function () {

      // reset di pagina
       $(".box-film").html("");

      var stringaRicerca = $('.inputRicerca').val()

      // controllo per evitare di inserire messaggi vuoti
      if (stringaRicerca !== "") {

      // var per memorizzare la scelta tra film e serie tv nel select in pagina
      var selectedVal = $("#selector option:selected").text();
      if (selectedVal = Serie) {
      $.ajax({

          //  url API per ricerca type serie:
          url:"https://api.themoviedb.org/3/search/tv",
          method: "GET",
          data: {
                api_key: "61de138c818862f9e6c98cd205b6816b",
                language: "it-IT",
                query: stringaRicerca
            },success:function (data) {
              //  se valore selezionato nel select è di tipo serie allora:
              var tvSeriesList = data.results;
            //impostazioni sistema di rating
              $(".myRating").starRating({
                totalStars: 5,
                starShape: 'rounded',
                starSize: 40,
                emptyColor: 'lightgray',
                activeColor: 'crimson',
                useGradient: false
              });

              generaLista(tvSeriesList);

        }
      )} else {
          //  url API per ricerca type movie:
          url:"https://api.themoviedb.org/3/search/movie",
          method: "GET",
          data: {
                api_key: "61de138c818862f9e6c98cd205b6816b",
                language: "it-IT",
                query: stringaRicerca
            },
          success:function (data) {

            //  se valore selezionato nel select è di tipo movie allora:
            var movieList = data.results;

            generaLista(movieList);

            if (context.lingua = it) {
              context.lingua = img/it.png;
            } else if (context.lingua = es) {
              context.lingua = img/es.png;
            } else if (context.lingua = eng) {
              context.lingua = img/gb.png;
            } else if (context.lingua = pt) {
              context.lingua = img/pt.png;
            }
        },
        error: function(richiesta, stato, errori){
        alert('La richiesta ha prodotto un errore: ', richiesta, stato, errori);
        }

      }

// FUNZIONI GENERICHE
function generaLista(listaOggetti) {
  for (var i = 0; i < listaOggetti.length; i++) {
    var listato = listaOggetti[i];
    var context = {
          titoloFilm: listato.title,
          titoloOrigFilm: listato.original_title ,
          name: listato.title,
          titoloOrigSerie: listato.original_name",
          voto: round(listato.vote_average / 2),
          lingua: listato.original_language,
          locandina:listato.poster_path
          };
    var html = template(context);
    $(".box-film").append(html);
  }
};



})
}
});
