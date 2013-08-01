image-loader
============

CurlJS Module for loading images and responding to their load events. Small footprint. Easy to use.

Usage
-----

<pre><code>
curl(['js/bulkloader'], function(BulkLoader){

	var loadExample = new BulkLoader({
		assets: ["images/300.jpg","images/400.jpg","images/600.jpg","images/900.jpg"],
		onComplete: function(images){
			console.log("all images have finished loading");
		},
		onProgress: function(options){
			console.log("Image #" + options.id + " has finished loading");
			console.log(options.percentage + '%');
			console.log(options.loaded + " of " + options.total);
			console.log("use the data wherever you want:", options.data);
			
			//if you need to know when a particluar asset is complete
			switch(options.id){
				case 2:
					console.log("The third image was finished loading")
				break;
			}
		}
	});

});
</code></pre>
  
