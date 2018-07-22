/*----------------------------------------------
mooZoom v1.0


mooZoom copyright: copyright (c) 2008 R'born development  - http://rborn.info

mooZoom license: 

You can use the script for personal or commercial projects, as long as this creditentials remains intact.
You CANNOT sell the script or parts of its code under your brand.


*/



var mooZoom = new Class ({
	options: {},
	initialize : function(options) {
		this.x_fact = options.x_fact || 1.2;
		this.steps = 0;
		this.initial_position = options.image.getCoordinates();

		this.image = options.image.clone().injectAfter(options.image); 
		options.image.setStyle('visibility','hidden');
		
		this.image.setStyles({position:'relative',left:0,top:0,margin:0});
		this.initial_size = options.image.getSize().size;
		this.container = new Element('div').setStyles({width:this.initial_size.x,height:this.initial_size.y,overflow:'hidden',position:'absolute',left:this.initial_position.left,top:this.initial_position.top}).injectInside(document.body).adopt(this.image);


		this.limiter = new Element('div').setStyles({width:this.initial_size.x,height:this.initial_size.y}).injectBefore(this.image).adopt(this.image);

		
		this.container.addEvent('mousemove',function(ev) {
											var ev = new Event(ev);
											this.mouse_x = ev.client.x+window.getScrollLeft();
											this.mouse_y = ev.client.y+window.getScrollTop();

											}.bind(this) );	

		this.image.makeDraggable({
			wait:true, 
			container:this.limiter
		});	
		
		
		this.busy = false;
		this.zoom();	
											
	},
	
	zoom: function() {

		this.image.addEvent('mousewheel', 
		function(e) {
			
			var e = new Event(e).stop();

			if (!this.busy)
			
			if ( !this.mouse_x ) {
				coord = e.target.getCoordinates();
				this.mouse_x = coord.left+coord.width/2;
				this.mouse_y = coord.top+coord.height/2;
			}

			var coord = this.image.getCoordinates();

			rapx = (this.mouse_x - coord.left)/coord.width;
			rapy = (this.mouse_y - coord.top)/coord.height;

			// zoom out ---------------

			if ( e.wheel < 0 && this.container.getCoordinates().width < coord.width ) {

				if (!this.busy) {
					this.busy = true;											

					xo = parseInt(this.image.getStyle('left'))
					yo = parseInt(this.image.getStyle('top'))


					new_h = ( coord.height/this.x_fact);
					new_w = (coord.width/this.x_fact);									

					if (this.steps > 0){
						
						if (xo*(this.steps-1)/this.steps > new_w-this.initial_size.x )	
							l = new_w-this.initial_size.x;
						else 	
							l =xo*(this.steps-1)/this.steps
							
							
							
						if	(yo*(this.steps-1)/this.steps > new_h-this.initial_size.y)
							h = new_h-this.initial_size.y
						else	
							h = yo*(this.steps-1)/this.steps										
										
						wdiff = (-parseInt(this.limiter.getStyle('margin-left'))-(new_w-this.initial_size.x))+l;
						hdiff = (-parseInt(this.limiter.getStyle('margin-top'))-(new_h-this.initial_size.y))+h;

					}

					else  {
						wdiff=(-parseInt(this.limiter.getStyle('margin-left')));
						hdiff=(-parseInt(this.limiter.getStyle('margin-top')));
					}
									
									

				var zoom_out=new Fx.Styles( this.image ,
					{ 
					onComplete: function() {
	
						this.busy = false;
				
						this.limiter.setStyles({
							'margin-left':-(new_w-this.initial_size.x), 
							'width':parseInt(2*new_w-this.initial_size.x),
							'margin-top':-(new_h-this.initial_size.y), 
							'height':parseInt(2*new_h-this.initial_size.y) 
						});																					
				
						if (this.steps > 0){ this.image.setStyles({'left':l,'top':h}); }
						else { this.image.setStyles({'left':0,'top':0}); }
					
						this.steps--;	
						
					}.bind(this),

					duration: 100, transition:Fx.Transitions.linear , wait:true});
					
					zoom_out.start({'left':wdiff, 'top':hdiff,'height':new_h , 'width': new_w});
			}	
		}
									
				// zoom in -----------
				else if  ( e.wheel > 0)  {

					if (!this.busy) {
					this.busy = true;
					this.steps++;

				
					xi = parseInt(this.image.getStyle('left'))
					yi = parseInt(this.image.getStyle('top'))
											
					hdiff = -( (this.x_fact-1)*coord.height*rapy+this.container.getCoordinates().top-coord.top );
					wdiff = -( (this.x_fact-1)*coord.width*rapx+this.container.getCoordinates().left-coord.left);

					new_h = ( coord.height*this.x_fact);
					new_w = ( coord.width*this.x_fact);											
					

			
					this.limiter.setStyles({
						'margin-left':-(coord.width*this.x_fact-this.initial_size.x), 
						'width':(2*coord.width*this.x_fact-this.initial_size.x),
						'margin-top':-(coord.height*this.x_fact-this.initial_size.y), 
						'height':(2*coord.height*this.x_fact-this.initial_size.y) 
					});


					this.image.setStyles({
						'left':(coord.width*this.x_fact-coord.width+xi),
						'top':(coord.height*this.x_fact-coord.height+yi)
					});	
			
					var zoom_in=new Fx.Styles( 
						this.image,
						{ onComplete: function() { this.busy = false;}.bind(this),
						duration: 100, 
						transition:Fx.Transitions.linear, 
						wait:true
					});		

					zoom_in.start({
						'left':wdiff+(coord.width*this.x_fact-this.initial_size.x),
						'top':hdiff+(coord.height*this.x_fact-this.initial_size.y),
						'height':new_h, 
						'width': new_w
					});
				}	
			}

			}.bind(this) )	 ; 

	}
	
	

})


window.addEvent('load', function() {

	$$('.moozoom').each( function(item) { new mooZoom({image:item});	});

});

