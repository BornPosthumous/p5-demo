
var scale ;
function setup() {
  // uncomment this line to make the canvas the full size of the window
  createCanvas(windowWidth, windowHeight);
	scale = .1;

	var arr = makeArray(125);
	var  b = trans();
	

	arr2 = makeFib(arr );
}

function draw() {
  // draw stuff here
  // ellipse(width/2, height/2, 50, 50);
 	scale+= .02;
	var  b = trans();
		iterate(arr2 , b , scale );


}

function mousePressed () { 
	scale+= .01;

}
 function makeArray(  x ) {
	var a = [] ; 

	for ( var i = 0 ; i < x; i++ ) {
		 a[i] = i ;
	}

	return a; 
}


function makeFib (  a ) {

		for ( var i =  0; i < a.length ; i++  ) { 
			
			if ( i == 0 ) {
				
				a[ i ] = [parseInt ( a[i] )  , 0 ]; 
			
			}
			
			if ( i == 1 ) {

				a[ i ] = [parseInt ( a[i] )  , 1 ]; 

			} 

 			if ( i > 1 ) {
 	
 				var f  = parseInt(a[i-2][1]) +  parseInt(a[i-1][1]);

 				a[i] = [parseInt ( a [ i ] )  , f ] ; 

 			}
		
	} 

	return a ; 
}

function iterate (  a ,  b , scale ) {
	
	c = 0;
	var posX = windowWidth/2 ;
	var posY = windowHeight /2 ; 

	
	


	for ( var i =  0; i < a.length ; i++ ) { 
		
		strokeWeight(1);
		
		var l =  a[i][1];
		var trans = b[c];
		//scale = 10;
		textSize ( l );

		if ( i == 0 ) {
	

			//console.log( "Beginning posX: " + posX);
			//console.log( "Beginning posY: " + posY);
			//console.log ( "No Transform on 0 ");
			
			rect ( posX  , posY , 10 , 10);	

	
		}

		else if (i > 0   ) {


			//console.log( "incoming posX: " + posX);
			//console.log( "incoming posY: " + posY);
			//console.log ( "Transformation is " + b[c]);

			
			scale_fib_x = a[i][1] * scale; 
			scale_fib_y = a[i][1] * scale; 
			//console.log("Scale X : " + scale_fib_x + " scale Y: "+ scale_fib_y);

			var delta_x = (	scale_fib_x * trans[0] );
			var delta_y = (	scale_fib_y * trans[1] );
			
			//Copy these values before we change them 
			var init_pos_x = posX;
			var init_pos_y = posY;
			
			//console.log( "Delta X : " + delta_x + " Delta Y : " + delta_y);
			posX = posX +  delta_x;
			posY = posY +  delta_y;

			//console.log( "new posX: " + posX);
			//console.log( "new posY: " + posY);
			
			fill( 255 , 255, 255);
			strokeWeight ( 1 );
			//rect( posX,posY, scale_fib_x , scale_fib_y);
			// Now posX and posY are the values for the opposite corners 
			// We have to recalculate this value to be the top left corner no matter what
			// So that we can draw it properly

			//if we're applying the [1,1] transformation 
				
			//(b[1]) --> navigate from  to top left
				if (trans[0] == 1 && trans[1] == -1 ) {
					
					//In this case we want to change the x but not y
					var draw_pos_y = init_pos_y + delta_y;
					rect( init_pos_x, draw_pos_y, scale_fib_x , scale_fib_y);
					
					}

			//(b[2]) --> navigate from bot left to top right
				if (trans[0] == -1 && trans[1] == -1 ) {
					
					//Reorient the position
	
					//In this case we want to change the x and the y

					var draw_pos_x = init_pos_x + delta_x; 
					var draw_pos_y = init_pos_y + delta_y; 

						rect( draw_pos_x, draw_pos_y, scale_fib_x , scale_fib_y);
					}

			//(b[3]) --> navigate from bot left to top right
				if (trans[0] == -1 && trans[1] == 1 ) {
					
					//Reorient the position
	
					//In this case we want to change the x not the y

					var draw_pos_x = init_pos_x + delta_x; 

						rect( draw_pos_x, init_pos_y, scale_fib_x , scale_fib_y);
					}

			//(b[0]) --> navigate from bot left to top right
				if (trans[0] == 1 && trans[1] == 1 ) {
					
					//Reorient the position
	
					//In this case we want to change the x not the y

						rect( init_pos_x, init_pos_y, scale_fib_x , scale_fib_y);
					}
		//rect( draw_pos_x, draw_pos_y, scale_fib_x , scale_fib_y);

			//Counter business
				c += 1;
				if (c > 3){c = 0;}
		}

			
			//rect( (a[i-1][1] + a[i][1])  , 0 , l  , l   );
		
			//fill ( 255- ( l  ),  l , 255-(l));
			//text  ( a[i][1] , 0 ,   (a[i-1][1] + a[i][1]) );
		}
	

}


function trans(){
	var a = [ [1,1] , [1,-1] , [-1,-1] , [-1,1] ] ;
	return a; 
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}