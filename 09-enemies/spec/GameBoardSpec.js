/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colección de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se añaden como tableros independientes para que Game pueda
  ejecutar sus métodos step() y draw() periódicamente desde su método
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre sí. Aunque se añadiesen nuevos tableros para los
  misiles y para los enemigos, resulta difícil con esta arquitectura
  pensar en cómo podría por ejemplo detectarse la colisión de una nave
  enemiga con la nave del jugador, o cómo podría detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: diseñar e implementar un mecanismo que permita gestionar
  la interacción entre los elementos del juego. Para ello se diseñará
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego serán las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard será un board más, por lo que deberá ofrecer los
  métodos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos métodos.

  Este prototipo no añade funcionalidad nueva a la que ofrecía el
  prototipo 06.


  Especificación: GameBoard debe

  - mantener una colección a la que se pueden añadir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosión, etc.

  - interacción con Game: cuando Game llame a los métodos step() y
    draw() de un GameBoard que haya sido añadido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los métodos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisión entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deberán
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cuándo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qué tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto sólo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("GameBoard", function(){
		
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

	

	it("GameBoard.remove", function(){
		var objetoPrueba = {};

		spyOn(board,"remove").andCallThrough();
		spyOn(board,"resetRemoved").andCallThrough();
		spyOn(board,"finalizeRemoved").andCallThrough();

		board.add(objetoPrueba);
		board.resetRemoved()
		board.remove(objetoPrueba);

		expect(board.removed[0]).toBe(objetoPrueba);
		expect(board.resetRemoved).toHaveBeenCalled();

		board.finalizeRemoved();
		expect(board.objects.length).toBe(0);
		board.resetRemoved();
		expect(board.removed.length).toBe(0);
		expect(board.finalizeRemoved).toHaveBeenCalled();

	});

	it("GameBoard.add()", function(){
		
		var objetoVacio= {};
		var objeto2= board.add(objetoVacio);
		expect(board.objects[0]).toBe(objetoVacio);
		expect(objeto2.board).toBe(board);
	});

	it("GameBoard.overlap()", function(){

		var objReferencia = {x:0, y:0, w:5, h:10};
                var objColision = {x:0, y:2, w:10, h:10};
		var objNoColision = {x:20, y:20 , w:5 , h:5};

		expect(board.overlap(objReferencia,objColision)).toEqual(true);
		expect(board.overlap(objReferencia,objNoColision)).toEqual(false);
	});

	it("GameBoard.collide()", function(){

		var objReferencia = {x:0, y:0, w:5, h:10, type:0};
                var objColision = {x:0, y:2, w:10, h:10, type:2};
		var objNoColision = {x:20, y:20 , w:5 , h:5, type:4};

		board.add(objReferencia);
		board.add(objColision);
		board.add(objNoColision);

		expect(board.collide(objReferencia,objColision.type)).toBe(objColision);
		expect(board.collide(objReferencia,objNoColision.type)).toBe(false);

	});

	it("GameBoard.step()", function(){
				
		var dt = {};

		spyOn(board,"resetRemoved");
		spyOn(board,"iterate");
		spyOn(board,"finalizeRemoved");

		board.step(dt);

		expect(board.resetRemoved).toHaveBeenCalled();
		expect(board.iterate).toHaveBeenCalled();
		expect(board.finalizeRemoved).toHaveBeenCalled();
		
	});

	it("GameBoard.draw()", function(){
				
		var ctx = {};

		spyOn(board,"iterate");

		board.draw(ctx);

		expect(board.iterate).toHaveBeenCalled();
		
	});

	it("GameBoard.iterate", function(){
		var aux1 = {draw : function(){},step: function(){}};
		var aux2 = {draw : function(){},step: function(){}};

		board.add(aux1);
		board.add(aux2);

		spyOn(aux1, "draw");
		spyOn(aux2, "step");

		board.iterate("draw",10);
		board.iterate("step",10);

		expect(aux1.draw).toHaveBeenCalledWith(10);
		expect(aux2.step).toHaveBeenCalledWith(10);
	
	});

	it("GameBoard.detect", function(){
		var funcionchorra = function(){
			if (this.num === 1){
			  	return false;
			}else{
			  	return true;
			};
		};

		var aux1 = {num : 1};
		var aux2 = {num : 2};

		board.add(aux1);
		board.add(aux2);

		var detectado = board.detect(funcionchorra);

		expect(detectado).toBe(aux2);
 
	});

});
