var offsetX, offsetY;
var width, height;
var numX, numY;
var unitX, unitY;
var num;
var arr;
var ctx;


onload = function(){
	width = window.innerWidth;  // ウィンドウ幅の取得
	height = window.innerWidth; // ウィンドウ高さの取得
	numX = 16;    // 横方向マス目数
	numY = 16;    // 縦方向マス目数
	unitX = 32;   // マス目の幅
	unitY = 32;   // マス目の高さ
	offsetX = 10; // マス目左端の位置
	offsetY = 10; // マス目上端の位置
	num = 0;      // 置いた石の個数

	arr = new Array(numX);	//0～15

	for (var i = 0; i < arr.length; i++){
		arr[i] = new Array(numY);	//0～15
	}

	for (var i = 0; i < arr.length; i++){
		for (var j = 0; j < arr[i].length; j++){
			arr[i][j] = 0 ;
		}
	}
	draw();

}

function draw(){
	var canvas = document.getElementById('bannmenn');
  	if ( ! canvas || ! canvas.getContext ) { return false; }
 	var ctx = canvas.getContext('2d');

 	ctx.beginPath();
 	ctx.strokeRect(offsetX, offsetY, 480, 480);

 	for(var i=1; i<=14 ; i++){
		ctx.beginPath();
		var sen = i*unitX;
   	 	ctx.moveTo(10+sen,10);
   	 	ctx.lineTo(10+sen,490);
   	 	ctx.stroke();
	 	ctx.moveTo(10,10+sen);
   	 	ctx.lineTo(490,10+sen);
   	 	ctx.stroke();
	}

	document.addEventListener('click', test);

	function test(e) {

	var x = e.clientX;
	var y = e.clientY;

	if (x > -10 && x < 1000) {
		var zx = parseInt(x / unitX);  // 横のマス目位置
		var zy = parseInt(y / unitY);  // 縦のマス目位置

		// まだ石が置かれてない場合
		if (arr[zx][zy] == 0) {
			num++;                     // 手数を加算
			arr[zx][zy] = num % 2 + 1; // 1:白, 2:黒
		} else {alert("すでに置かれています");}
	}

	var color = num % 2 + 1;
	var n0 = count(zx, zy, color, 1, 0);  // 横方向
	var n1 = count(zx, zy, color, 0, 1);  // 縦方向
	var n2 = count(zx, zy, color, 1, 1);  // 斜め下方向
	var n3 = count(zx, zy, color, 1, -1); // 斜め上方向
	console.log(n0 + "," + n1 + "," + n2 + "," + n3);

	if(n0 == 3 || n1 == 3){
		if(n2 == 3 || n3 == 3){
			if(color == 1){alert("白禁じ手(三三禁)");}
			else {alert("黒禁じ手(三三禁)");}
		}
	}

	if(n0 >= 6 || n1 >= 6){
		if(color == 1){alert("白禁じ手(長連)");}
		else {alert("黒禁じ手(長連)");}
	}

	if(n0 == 4 || n1 == 4 || n2 == 4 || n3 == 4){
		if(color == 1){alert("白リーチ！");}
		else {alert("黒リーチ！");}
	}

	if(n0 == 5 || n1 == 5 || n2 == 5 || n3 == 5){
		if(color == 1){alert("白の勝ち");}
		else {alert("黒の勝ち");}
	}



  // 盤面全体での石の描画
	for (var i = 0; i < numX; i++){
		for (var j = 0; j < numY; j++){
			if (arr[i][j] != 0) {
				ctx.beginPath();
				if (arr[i][j] == 1) {  // 白の場合
					ctx.fillStyle = 'rgb(255, 255, 255)';
					//hantei(1);
				} else if(arr[i][j] == 2) {  // 黒の場合
					ctx.fillStyle = 'rgb(0, 0, 0)';
					//hantei(2);
				}
				// それぞれの石の描画
				ctx.arc(i * unitX + offsetX, j * unitY + offsetY, 12, 0, Math.PI*2, true);
				ctx.fill();
			}
		}
	}



	}
}

//document.addEventListener('click', iti);
function iti(){
	console.log("丸の数は"+num);
	var canvas = document.getElementById('tizu');

	//表示
	for (var i = 0; i < arr.length; i++){
		for (var j = 0; j < arr[i].length; j++){
			document.write(arr[i][j]);
		}
	document.write("<br />");
	}
}

function hantei(s){
	for(var i=0;i<16;i++){
		for(var j=0;j<16;j++){

			if(arr[i][j]==s && arr[i][j+1]==s && arr[i][j+2]==s && arr[i][j+3]==s && arr[i][j+4]==s){
				if(s==2){
				alert("黒の勝ち！！");
				}else{alert("白の勝ち！！")}
			}else if(arr[i][j]==s && arr[i+1][j]==s && arr[i+2][j]==s && arr[i+3][j]==s && arr[i+4][j]==s){
				if(s==2){
				alert("黒の勝ち！！");
				}else{alert("白の勝ち！！")}
			}else if(arr[i][j]==s && arr[i+1][j+1]==s && arr[i+2][j+2]==s && arr[i+3][j+3]==s && arr[i+4][j+4]==s){
				if(s==2){
				alert("黒の勝ち！！");
				}else{alert("白の勝ち！！")}
			}else if(arr[i][j]==s && arr[i+1][j-1]==s && arr[i+2][j-2]==s && arr[i+3][j-3]==s && arr[i+4][j-4]==s){
				if(s==2){
				alert("黒の勝ち！！");
				}else{alert("白の勝ち！！")}
			}
		}
	}
}

function count(x, y, c, dx, dy) {
	var px, py;
	var n = 1;

	px = x; py = y;
	while (true) {
		px -= dx;
		py -= dy;
		if (px < 0 || py < 0 || px >= numX || py >= numY) break;
		if (arr[px][py] == c) n++; else break;
	}

	px = x; py = y;
	while (true) {
		px += dx;
		py += dy;
		if (px < 0 || py < 0 || px >= numX || py >= numY) break;
		if (arr[px][py] == c) n++; else break;
	}

	return n;
}

function count2(x, y, c, dx, dy) {
	var px, py;
	var n = 1;

	px = x; py = y;
	while (true) {
		px -= dx;
		py -= dy;
		if (px < 0 || py < 0 || px >= numX || py >= numY) break;
		if (arr[px][py] == c) n++; else break;
	}

	return n;
}
function count3(x, y, c, dx, dy) {
	var px, py;
	var n = 1;

	px = x; py = y;
	while (true) {
		px += dx;
		py += dy;
		if (px < 0 || py < 0 || px >= numX || py >= numY) break;
		if (arr[px][py] == c) n++; else break;
	}

	return n;
}
