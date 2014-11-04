/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
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
