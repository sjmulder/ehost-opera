// By Sijmen Mulder <sjmudler@gmail.com>
// Published under the BSD licence.
// @include *

// <link rel="image_src" href="…">
// used by imgur, TwitPic, PhotoBucket, Flickr, Twitgoo
var getImageSrcLinkImage = function() {
	var imageSrcLink = document.querySelector('link[rel="image_src"]');
	return imageSrcLink ? imageSrcLink.href : null;
};

// <meta property="og:image" value="…">
// used by yFrog
var getOpenGraphImage = function() {
	var metaTags = document.querySelectorAll('meta[property]');
	for (var i = 0; i < metaTags.length; i++) {
		var metaTag = metaTags[i];
		if (metaTag.getAttribute('property') === 'og:image') {
			return metaTag.getAttribute('content');
		}
	}

	return null;
};

var getLargestImage = function() {
	var images = document.images;
	if (images.length < 1) {
		return null;
	}
	
	var largestImage = null;
	var largestImageArea = 0;
	
	for (var i = 0; i < images.length; i++) {
		var image = images[i];
		var imageArea = image.naturalWidth * image.naturalHeight;
		if (imageArea >= largestImageArea) {
			largestImage = image;
			largestImageArea = imageArea;
		}
	}
	
	return largestImage.src;
};

var findImageUrl = function() {
	return (
		getImageSrcLinkImage() || 
		getOpenGraphImage() ||
		getLargestImage()
	);
};

opera.extension.onmessage = function(data) {
	var imageUrl = findImageUrl();
	if (imageUrl) {
		opera.extension.postMessage(imageUrl);
	} else {
		alert('No images could be found on this page.');		
	}
};