define(function() {

	function BulkLoader(options) {

		new LoadingGroup(options.assets);
		
		//Wrap the image loading so we can identify the asset 
		function ImageLoader(url, id, callback){
			var _id = id;
			var _url = url;

			var _img = new Image();
			_img.onload = function(){
				callback(_img, _id)
			}
			_img.src = url;
		}

		function LoadingGroup(images_array){
			var output_images = [],
				i;

			//store array of statuses
			var loaded_status = [];
			for(i = 0; i < images_array.length; i++){
				loaded_status[i] = false;
			}

			//generate new loaders. Have them check the status when they're done
			for(i = 0; i < images_array.length; i++){
				new ImageLoader(images_array[i], i, checkStatus);
			}

			var filesLoaded = 0;

			function checkStatus(imageData, id){
				//update its status
				loaded_status[id] = true;
				output_images[id] = imageData;
				filesLoaded++;

				if(options.hasOwnProperty("onProgress")){
					options.onProgress({
						loaded: filesLoaded,
						total: images_array.length,
						percentage: (filesLoaded / images_array.length) * 100,
						id: id,
						data: imageData
					});
				}


				//check if any status is still false
				for(i = 0; i < loaded_status.length; i++){
					if(loaded_status[i] == false){
						return;
					}
				}

				//if it makes it here, all images are loaded
				options.onComplete(output_images);

			}
		}
	}

	//that's all.
	return BulkLoader;

})


