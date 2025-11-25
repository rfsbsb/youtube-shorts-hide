function hideShorts() {
  // Find all Shorts links on the page
  var shorts = [...document.querySelectorAll('.shortsLockupViewModelHostEndpoint')];

  var counter = 0;

  for (var s of shorts) {
    hideElement(s, counter);
    counter++;
  }
}

function hideElement(s, index) {
  setTimeout(() =>{
    var n = s.nextElementSibling;
    if (n && n.classList.contains('shortsLockupViewModelHostOutsideMetadata')) {
        var hm = n.querySelector('.shortsLockupViewModelHostOutsideMetadataMenu button')
        hm.click()
        var context = document.querySelector('.ytContextualSheetLayoutContentContainer');
        if (context) {
          var hideButton = context.querySelectorAll('.yt-list-item-view-model')[1];
          console.log(s)
          hideButton.click()
        }
    }
  }, 100 * index);
}

hideShorts()