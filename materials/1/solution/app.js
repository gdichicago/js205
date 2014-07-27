/* We could also load this data in using AJAX from the server.*/
var videosJSON = [
  {"youtubeId": "TddFnTB_7IM",
  "title": "Trip through the 80s",
  "author": "meliberty"
  },
  {"youtubeId": "oOlDewpCfZQ",
  "title": "Four Chords",
  "author": "axisofawesome"
  },
  {"youtubeId": "il2IrgFHfsg",
  "title": "The Ooooh Cat",
  "author": "RnBTree"
  },
  {"youtubeId": "epUk3T2Kfno",
  "title": "Otters Holding Hands",
  "author": "cynthiaholmes"
  }
];

function VideoModel(videoJSON) {
  this.youtubeId = videoJSON.youtubeId;
  this.title     = videoJSON.title || 'Untitled';
  this.author    = videoJSON.author || 'No author';
  this.thumbURL  = 'http://i3.ytimg.com/vi/' + this.youtubeId + '/default.jpg';
  this.embedURL  = 'http://www.youtube.com/embed/' + this.youtubeId;
}

function VideoCollection(videosJSON) {
  // More on the Array.prototype.map function:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2Fmap
  this.items = videosJSON.map(function(videoJSON){
    return new VideoModel(videoJSON)
  });
};

VideoCollection.prototype.sort = function() {
  this.items.sort(function(videoA, videoB){
    return videoA.title.localeCompare(videoB.title);
  });
};

/* Adds a video to the list */
function addVideoToList(video) {
  var videoLink = $('<a>');
  videoLink.append(video.title);
  var linkUrl = videoLink.attr('href');
  var thumbnailImg = $('<img>');
  thumbnailImg.attr('src', video.thumbURL);
  videoLink.append(thumbnailImg);

  /* On click, we'll make a modal with the title and video iframe */
  videoLink.on('click', function(e) {
    e.preventDefault();

    var videoTitle = $('<h2>');
    videoTitle.html(video.title + ' <small>' + video.author + '</small>');
    var videoEmbed = $('<iframe></iframe>');
    videoEmbed.attr('src', video.embedURL);
    videoEmbed.attr('width', 560);
    videoEmbed.attr('height', 315);

    $('.video-modal').remove();
    var videoModal = $('<div class="video-modal">');
    videoModal.append(videoTitle);
    videoModal.append(videoEmbed);
    $('body').append(videoModal);
  });

  var videoItem = $('<li>');
  videoItem.append(videoLink);
  $('#videos-list').append(videoItem);
}

$(document).ready(function() {

  var videos = new VideoCollection(videosJSON);

  videos.sort();
  // Array.prototype.forEach
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FforEach
  videos.items.forEach(function(video){
    addVideoToList(video)
  });

});