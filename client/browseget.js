$.get( "http://localhost:8081/browse", function( data ) {
  rows = JSON.parse(data)

  rows.forEach(row => {
    $("#browseCtn").append('<div class="row"><div class="col"><div class="flip-card"><div class="flip-card-inner "><div class="flip-card-front"><h1>name:</h1><h1>'+ row.name +'</h1></div><div class="flip-card-back"><h1>price:</h1><h1>'+ row.price +'</h1><h1>rating:</h1><h1>'+ row.rating +'</h1></div></div></div></div></div>')
  });
});