$(document).ready(function(){

  $('#sub').click(function(){

    var val = $('#usr').val().split(' ').join('+');
    $.post('/tempor', {data: val});

  })

  $('.gif').click(function(){

    var image = $(this).attr('the_image');
    $.post('/tempora', {data: image});

  });

  $('.del').click(function(){

    var del_pic = $(this).attr('connect');
    var image = $(this).prev().attr('the_fav');
    $.post('/temporar', {data: del_pic})

    if(del_pic === image){
      $(this).prev().remove();
      $(this).remove();
    }

  });

  $('.fav').click(function(){

    var image = $(this).attr('the_fav');
    var fav_id = $(this).attr('fav_id');
    $.post('/temporary', {data: image, id: fav_id});

  })

});
