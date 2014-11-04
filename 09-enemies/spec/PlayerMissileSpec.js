/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
    la clase en el prototipo

*/

describe("Missiles", function(){
		
		var canvas, ctx;
		var board; 

		beforeEach(function(){
	
			loadFixtures('index.html');

			canvas = $('#game')[0];
			expect(canvas).toExist();

			ctx = canvas.getContext('2d');
			expect(ctx).toBeDefined(); 
			board = new GameBoard();
		});

		it("PlayerMissile", function() {
			SpriteSheet.map = {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 } };
			misil = new PlayerMissile(1,1);
			expect(misil.w).toBe(SpriteSheet.map['missile'].w);
			expect(misil.h).toBe(SpriteSheet.map['missile'].h);
			expect(misil.x).toBe(1 - misil.w/2);
			expect(misil.y).toBe(1 - misil.h);
			expect(misil.vy).toBe(-700);
		});

		it("PlayerMissile.draw", function() {
			SpriteSheet = { draw:function(){},map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }} };
			var aux = {};
			misil = new PlayerMissile(1,1);
			spyOn(SpriteSheet, "draw");
			misil.draw(aux);
			expect(SpriteSheet.draw).toHaveBeenCalled();
		});

		it("PlayerMissile.step", function() {
			misil = new PlayerMissile(1, 1);
			var aux = misil.y;
			var numnegativo = -10;
			var tablero = {remove: function(){}};
			misil.board = tablero;
			spyOn(tablero, "remove");
			misil.step(numnegativo);
			expect(misil.y).toBe(aux + misil.vy*numnegativo);
			expect(tablero.remove).not.toHaveBeenCalled();
			misil.step(1+(-misil.h-misil.y)/misil.vy);
			expect(tablero.remove).toHaveBeenCalledWith(misil);
		});

		
});
