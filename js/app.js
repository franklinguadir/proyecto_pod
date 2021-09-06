$(function(){
    console.log('jquery is working')
    $('#search').keyup(function(){
        let search = $('search').val();
        $.ajax({
            url: 'conexion.php',
            type: 'POST',
            data: {search},
            succes: function(response){
                console.log(response)
            }
        })
    })
});