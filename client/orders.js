$.get( "http://localhost:8081/order", function( data ) {
  rows = JSON.parse(data)

  rows.forEach(row => {
    $("#ctn").append('<li class="list-group-item">'+" order: "+ row.name + " quantity: "+ row.quantity + " adress: "+ row.adr +'</li>')
  });
});