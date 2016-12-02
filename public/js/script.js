$(document).ready(function(){

  //When user clicks on submit button post the value of input from user
  $('#sub').click(function(){

    var val = $('#usr').val().split(' ').join('+');
    $.post('/tempor', {data: val});

  })

  //when user click on a gif in the home/index page post the image url
  $('.gif').click(function(){

    var image = $(this).attr('the_image');
    $.post('/tempora', {data: image});

  });

  //when user clicks on delete button removes delete button from DOM and
  //deletes image right above it. Also posts the image url associated with
  //deleted image to send to server side, to be deleted from the DB.
  $('.del').click(function(){

    var del_pic = $(this).attr('connect');
    var image = $(this).prev().attr('the_fav');
    $.post('/temporar', {data: del_pic})

    if(del_pic === image){
      $(this).prev().remove();
      $(this).remove();
    }

  });

  //When user clicks on image on favs page. Post's url and id to server side
  //to be added to the DB.
  $('.fav').click(function(){

    var image = $(this).attr('the_fav');
    var fav_id = $(this).attr('fav_id');
    $.post('/temporary', {data: image, id: fav_id});

  })

});
