function hideShorts() {
  // Find all Shorts links on the page
  var shorts = [...document.querySelectorAll('.shortsLockupViewModelHostEndpoint')];

  var len = shorts.length;

  for (var i = 0; i < len; i++) {
    hideElement(shorts[i], i);
  }
}

function hideElement(s, index) {
  setTimeout(() =>{
    var n = s.nextElementSibling;
    if (n && n.classList.contains('shortsLockupViewModelHostOutsideMetadata')) {
        var hm = n.querySelector('.shortsLockupViewModelHostOutsideMetadataMenu button')
        hm.click()
        setTimeout(() => { 
          var context = document.querySelector('.ytContextualSheetLayoutContentContainer');
          if (context) {
            var hideButton = context.querySelectorAll('.yt-list-item-view-model')[1];
            console.log(s)
            hideButton.click()
          }
        }, 10 * index); 
    }
  }, 25 * index);
}

hideShorts()
