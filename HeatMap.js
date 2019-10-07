	var redIncrement = 'a';
	var greenIncrement = 'a';
	var blueIncrement = 'a';
	var squareSize = 'a';
	var redIncrementDefault = 0;
	var greenIncrementDefault = 0;
	var blueIncrementDefault = 0;
	var squareSizeDefault = 100;
	var additiveToggle = true;
	var lastAdditivity = true;
	var listOfColors = ['0,0,0'];
	
	
    var mouseDownCount = 0;
	document.addEventListener('keyup', onKeyUp);
	
	function displayColors(){

		for(var i=0;i<listOfColors.length;i++){
			console.log('Displaying color: '+i+' '+listOfColors[i]);
			$('#rgb'+(i+1)).text((i+1)+'. rgb('+listOfColors[i]+')');
			var colors = listOfColors[i].split(",");
			$('#rgb'+(i+1)).css({'background-color':'rgb('+colors[0]+','+colors[1]+','+colors[2]+')'});
			console.log('color : rgb('+(255-Number(colors[0]))+','+(255-Number[colors[1]])+','+(255-Number(colors[2]))+')');
			$('#rgb'+(i+1)).css({'color':'rgb('+(255-Number(colors[0]))+','+(255-Number(colors[1]))+','+(255-Number(colors[2]))+')'});
		}
	}

	function pushcolor(red,green,blue){
		for(var i=listOfColors.length-1;i>=0;i--){
			if(i<9){
			listOfColors[i+1] = listOfColors[i];
			}
		}
		listOfColors[0]=red+','+green+','+blue;
		displayColors();
		console.log('Length at end:'+listOfColors.length);
	}
	
	function onKeyUp(event){
		if(event.key=="t"){
			getColors();
			displayColors();
			$('#colorChange').toggleClass('activated');
			window.setTimeout(function(){$('#colorChange').toggleClass('activated')},1000);
		}else if(event.key=="e"){
			
			redIncrement = 255;
			greenIncrement=255;
			blueIncrement=255;
			pushcolor(redIncrement, greenIncrement,blueIncrement);
			additiveToggle=true;
			$("#additivity").css({'color':'green'});
			$("#replacement").css({'color':'red'});
			$('#eraser').toggleClass('activated');
			$("#rgb").text("Current rgb("+redIncrement+","+greenIncrement+","+blueIncrement+")");
			$("#storedRgb").text("Stored rgb("+redIncrementDefault+","+greenIncrementDefault+","+blueIncrementDefault+")");
			window.setTimeout(function(){$('#eraser').toggleClass('activated')},1000);
		}else if(event.key=="p"){
			var tempColor = listOfColors[1];
			listOfColors[1] = listOfColors[0];
			listOfColors[0] = tempColor;
			var color=listOfColors[0].split(",")
			redIncrement = color[0];
			greenIncrement = color[1];
			blueIncrement = color[2];

			displayColors();
			
			additiveToggle=lastAdditivity;
			if(additiveToggle==true){
				$("#additivity").css({'color':'green'});
				$("#replacement").css({'color':'red'});
			}else{
				$("#additivity").css({'color':'red'});
				$("#replacement").css({'color':'green'});
			}
			$('#paintbrush').toggleClass('activated');
			window.setTimeout(function(){$('#paintbrush').toggleClass('activated')},1000);
		}else if(event.key=="a"){
			additiveToggle=true;
			lastAdditivity=true;
			$("#additivity").css({'color':'green'});
			$("#replacement").css({'color':'red'});
		}else if(event.key=="r"){
			additiveToggle=false;
			lastAdditivity=false;
			$("#additive").text("Additivity: "+additiveToggle);	
			$("#additivity").css({'color':'red'});
			$("#replacement").css({'color':'green'});
		}else if(!isNaN(event.key)&&event.key>0&&event.key<=10){
			if(listOfColors.length>=event.key){
				var color = listOfColors[event.key-1];
				listOfColors[event.key-1]=listOfColors[0];
				listOfColors[0] = color;
				var rgb = color.split(",");
				console.log(rgb);
				redIncrement = rgb[0];
				greenIncrement = rgb[1];
				blueIncrement = rgb[2];
				displayColors();
			}	
		}
	}
	function onPointerDown(event){  
		mouseDownCount = event.buttons ;
		if(mouseDownCount==1){
			$("#leftClick").css({'color':'green'});
			$("#rightClick").css({'color':'red'});
		}else if(mouseDownCount==2){
			$("#leftClick").css({'color':'red'});
			$("#rightClick").css({'color':'green'});
		}else if(mouseDownCount==3){
			$("#leftClick").css({'color':'green'});
			$("#rightClick").css({'color':'green'});
		}else{
			$("#leftClick").css({'color':'red'});
			$("#rightClick").css({'color':'red'});
		}

	}

	function handler(e){
		e.stopPropagation();
		e.preventDefault();
	}
	
	function getColors(){
			redIncrement='a';
			greenIncrement='a';
			blueIncrement='a';
			
			while(isNaN(redIncrement)){
				redIncrement = prompt("rgb(?,?,?)\nPlease enter paintbrush RED value. (<=255)","0");
				if(isNaN(redIncrement)){
					alert("Value entered must be a number.");
				}else{
					if(redIncrement>255){
						redIncrement=255;
					}
				}
			}
			if (redIncrement==null){
					redIncrement=redIncrementDefault;
				}
			
			while(isNaN(greenIncrement)){
				greenIncrement = prompt("rgb("+redIncrement+",?,?)\nPlease enter paintbrush GREEN value. (<=255)","0");
				if(isNaN(greenIncrement)){
					alert("Value entered must be a number.");
				}else{
					if(greenIncrement>255){
						greenIncrement=255;
					}
				}	
			}
			if (greenIncrement==null){
					greenIncrement=greenIncrementDefault;
				}
			
			while(isNaN(blueIncrement)){
				blueIncrement = prompt("rgb("+redIncrement+","+greenIncrement+",?)\nPlease enter paintbrush BLUE value. (<=255)","0");
				if(isNaN(blueIncrement)){
					alert("Value entered must be a number.");
				}else{
					if(blueIncrement>255){
						blueIncrement=255;
					}
				}
			}
			if (blueIncrement==null){
					blueIncrement=blueIncrementDefault;
				}
				
			pushcolor(redIncrement, greenIncrement,blueIncrement);		
		}
	
		function generateHeatSquares(){
			var floater = document.getElementById("floater");
			for(var i=1;i<=9;i++){
				var element = document.createElement("p");
				element.id='rgb'+(i);
				element.className='rgb';
				floater.appendChild(element);
			}
			$("#additivity").css({'color':'green'});
			$("#replacement").css({'color':'red'});
			$("#leftClick").css({'color':'red'});
			$("#rightClick").css({'color':'red'});
			getColors();
			
			while(isNaN(squareSize) ||squareSize>window.screen.height||squareSize>window.screen.height){
				squareSize = prompt("The image will be comprised of tiled squares.\nPlease enter the pixel size of the squares. (>9)\n100-200 works well.","0");
				if(isNaN(squareSize)){
					alert("Value entered must be a number.");
				}else if(squareSize!=null&&squareSize<10){
					alert("Number must be positive 10 or higher.")
				}
			}
			if (squareSize==null){
					squareSize=squareSizeDefault;
				}else{
					squareSizeDefault=squareSize;
				}
			
			var grid = document.getElementById("grid");
			grid.style.width="calc(100% + "+squareSize+"px)";
			var squareCount = (window.screen.height/squareSize)*(window.screen.width/squareSize)*1.2;
			for(var i = 0;i<squareCount;i++){
				var square = document.createElement("div");
				square.className="heatSquare";
				square.style.width=squareSize+'px';
				square.style.height=squareSize+'px';
				square.ondragstart="return false;";
				square.ondrop="return false;";
				grid.appendChild(square);
			}
		}
	
		$(document).ready(function(){
		  
		  $(".heatSquare").mousedown(onPointerDown);
		  $(window).mouseup(onPointerDown);
		  $(".heatSquare").mousedown(doColoring);
		  $(".heatSquare").mouseenter(doColoring);
		 
		});
		
		function doColoring(div){
			var color = $(this).css('background-color');
			console.log(color);
			var strings = color.split(",");
			var red = strings[0].split('(')[1];
			var green = strings[1];
			var blue = strings[2].split(')')[0];
			if(additiveToggle){
				if(mouseDownCount==1){
					red=Number(red)+Number(redIncrement);
					green=Number(green)+Number(greenIncrement);
					blue=Number(blue)+Number(blueIncrement);
				}
				  if(mouseDownCount==2){
						var redIncrements = (Number(red)/Number(redIncrement))-1;
						if(!isFinite(redIncrements)){
							redIncrements=-1;
						}
						var blueIncrements = (Number(blue)/Number(blueIncrement))-1;
						if(!isFinite(blueIncrements)){
							blueIncrements=-1;
						}
						var greenIncrements = (Number(green)/Number(greenIncrement))-1;
						if(!isFinite(greenIncrements)){
							greenIncrements=-1;
						}
							if(redIncrement>0){
								if(redIncrements>=blueIncrements&&redIncrements>=greenIncrements){
									
									red=Number(redIncrement)*redIncrements;
									if(greenIncrements>0){
										green=Number(greenIncrement)*redIncrements;
									}
									if(blueIncrements>0){
										blue=Number(blueIncrement)*redIncrements;
									}
								}
							}
							if(greenIncrement>0){
								if(greenIncrements>=blueIncrements&&greenIncrements>=redIncrements){
									if(redIncrements>0){
										red=Number(redIncrement)*greenIncrements;
									}
									green=Number(greenIncrement)*greenIncrements;
									if(blueIncrements>0){
										blue=Number(blueIncrement)*greenIncrements;
									}
								}
							}
							if(blueIncrement>0){
								if(blueIncrements>=greenIncrements&&blueIncrements>=redIncrements){
									if(redIncrements>0){
										red=Number(redIncrement)*blueIncrements;
									}
									if(greenIncrements>0){
										green=Number(greenIncrement)*blueIncrements;
									}
									blue=Number(blueIncrement)*blueIncrements;
								}
							}
				  }
			  
				var returnColor ='rgb('+red+','+green+','+blue+')';
				$(this).css({ 'background-color': returnColor});  
			}else{
				if(mouseDownCount==1){  
					var returnColor ='rgb('+redIncrement+','+greenIncrement+','+blueIncrement+')';
					$(this).css({ 'background-color': returnColor}); 
				}
			}			 
		  
		}
		
