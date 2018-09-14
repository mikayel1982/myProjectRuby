$(document).ready(function(){
   
  $(document).on('live', function(){ 
    LoadInfo(); 
  })

  LoadInfo(); 
  // load
  function LoadInfo() {
    $.ajax({
      url: "/info",
      type: "GET",
      dataType: "html",
      success: function(data) {

        $('#commentSlide').html(data);

        $(".allComments").each(function() {

          if( !$.trim( $(this).children('.theComment').html() ).length) {
            $(this).children('.listComments').hide();
            $(this).children('.theComment').hide(); 
          }
          else if ($(this).children(".theComment").is(":visible")) {
             $(this).children('.listComments').show();
             $(this).children('.theComment').show();
          }
          else {
            $(this).children('.listComments').hide();
            $(this).children('.theComment').hide();
          } 
        })     
      },
      error: function(err) {
          console.log(err)
      }
    });
  }

  // submit post
  $(document).on('submit', '.newPostForm', function(){
    var form = $(this);
      $.ajax({
        url: "/bright_ideas",
        type: "POST",
        data: form.serialize(),
        dataType: "html",
        success: function(data) {

          $('#commentSlide').html(data);
  
          form.children('.post_text').val("");

          $(".listComments").css("display", "none"); 

        },
        error: function(err) {
          console.log("errors!!")
          console.log(err)
        }
      });
      return false;
  });
//////////// POST LIKES UNLIKES
  // like 
  $(document).on('submit', '.like', function(){
    var form = $(this);
      $.ajax({
        url: "/likes",
        type: "POST",
        data: form.serialize(),
        dataType: "html",
        success: function(data) {  
          form.children().last().attr("value", "unlike");
          form.attr("class", "unlike");   
          LoadInfo();      
        },
        error: function(err) {
        console.log(err)
        }
      });
      return false;
    });
  
// unlike
$(document).on('submit', '.unlike', function(){
  var form = $(this);
    $.ajax({
      url: "/likes",
      type: "DELETE",
      data: $(this).serialize(),
      dataType: "html",
      success: function(data) {
        LoadInfo();
      },
      error: function(err) {
        console.log(err);
      }
    });     
    form.children().last().attr("value", "like");
    form.attr("class", "like"); 
    return false;
  });

// delete post
$(document).on('submit', '.delete', function(){
  var form = $(this);
 
    $.ajax({
      url: "/bright_ideas/" + form.children('.delete_id').val(),
      type: "DELETE",
      data: $(this).serialize(),
      dataType: "html",
      success: function(data) {
      LoadInfo();
      },
      error: function(err) {
        console.log(err);
      }
    });
    return false;
  });

///////////// COMMENTS
// comment - create
 $(document).on('submit', '.comment', function(){
  var form = $(this);
    $.ajax({
      url: "/comments",
      type: "POST",
      data: $(this).serialize(),
      dataType: "html",
      success: function(data) {
        LoadInfo();
      },
      error: function(err) {
        console.log(err);
      }
    });
    return false;
  });

// comment - destroy
$(document).on('submit', '.delete_comment', function(){
  var form = $(this);
    $.ajax({
      url: "/comments/" + form.children('.delete_comment_id').val(),
      type: "DELETE",
      data: $(this).serialize(),
      dataType: "html",
      success: function(data) {
        LoadInfo();
      },
      error: function(err) {
        console.log(err);
      }
    });
    return false;
  });

////////// COMMENT LIKE 
    // comment like 
$(document).on('submit', '.like_comment', function(){
  var form = $(this);
    $.ajax({
      url: "/comment_like",
      type: "POST",
      data: form.serialize(),
      dataType: "html",
      success: function(data) {  
        form.children().last().attr("value", "unlike");
        form.attr("class", ".unlike_comment");  
        LoadInfo();      
      },
      error: function(err) {
        console.log(err)
      }
    });
  return false;
 });
  
// comment unlike
$(document).on('submit', '.unlike_comment', function(){
  var form = $(this);
    $.ajax({
      url: "/comment_like",
      type: "DELETE",
      data: $(this).serialize(),
      dataType: "html",
      success: function(data) {
        console.log('comment unlike done successfully');
        LoadInfo();
      },
      error: function(err) {
        console.log('comment like done with error');
        console.log(err);
      }
    });     
    form.children().last().attr("value", "like");
    form.attr("class", ".like_comment"); 
    return false;
  });
  
  // comments show
  $(document).on('click', '.commentCount', function(){ 
    var comments = $(this).parent();

    if( !$.trim( comments.children('.theComment').html() ).length) {
      comments.children('.listComments').hide();
      comments.children('.theComment').hide();
    }
    else {
      comments.children('.listComments').show();
      comments.children('.theComment').show();
    }
  });

  // comments hide
  $(document).on('click', '.listComments', function(){ 
    var comments = $(this).parent();
    comments.children('.listComments').hide();
    comments.children('.theComment').hide();
  });

  // clear session settings
  $(document).on('submit', '#logout', function(){ 
    sessionStorage.clear();
  });

   // open comments in 400px
  $(document).on('click', '#openComments', function(){ 
    $('#commentSlide').show();
    $(this).hide();
    $('#closeComments').show();
  });

   // close comments in 400px
  $(document).on('click', '#closeComments', function(){ 
    $('#commentSlide').hide();
    $(this).hide();
    $('#openComments').show();
  });

  // news
  $.get('https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=7ec0f954c3d94809812987b998678fea', 
    function(res) {
      var title = '';
      var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');  

      console.log(res)
      for (var i=0; i<res.articles.length; i++) {   
        $('#news').append('<div class="newsImg"><a href="' + res.articles[i].url + '" target="_blank"><img src=' + res.articles[i].urlToImage +
          ' alt="'+ res.articles[i].title +'"></a></div>' + '<div class="newsTextSection"><a href="' + res.articles[i].url + '"><h3>' +
         res.articles[i].title + '</h3><p>' + res.articles[i].description + ' Posted by ' + 
        res.articles[i].author + ' at ' + res.articles[i].publishedAt.slice(0, 10) + '</p><p>Read more ...</p></a></div>' +   
        '<form class="newPostForm" class="form-inline">' + 
          '<input type="hidden" name="authenticity_token" value="'+ AUTH_TOKEN +'">' + 
          '<input type="text" class="form-control"  class="post_text" name="post[content]">' +
          '<input type="hidden" name="post[newsTitle]" value="' + res.articles[i].title + '">' +
          '<input type="hidden" name="post[user_id]" value="' + $("#current_user_id").html() + '">' +
          '<input type="hidden" name="post[fullname]" value="' + $("#current_user_name").html() + '">' +
          '<input type="hidden" name="post[image]" value="' + res.articles[i].urlToImage + '">' +
          '<input type="hidden" name="post[description]" value="' + res.articles[i].description + '">' +
          '<input type="hidden" name="post[url]" value="' + res.articles[i].url + '">' +
          '<input class="btn btn-default" class="commentButton" type="submit" value="Share"></form>');
      }              
    }, 'json');   
  return false; 
});