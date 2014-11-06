
describe("SpriteSpec", function(){
	beforeEach(function(){
		loadFixtures('index.html');
		canvas = $('#game')[0];
		expect(canvas).toExist();
		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
	});

it("draw", function(){
	Sprite1= new Sprite();
	spyOn(SpriteSheet, "draw");
	Sprite1.draw(ctx)
	expect(SpriteSheet.draw).toHaveBeenCalled();
});
it("setup", function(){
		var board = new GameBoard();
		enemigo= new Enemy(enemies.basic);
		enemigo2 =new Enemy(enemies.basic, { x: 100 });
		board.add(enemigo);
		board.add(enemigo2);
		expect(board.objects.length).toEqual(2);

		pruebamerge= new Enemy(enemies.basic, { x : 200});
		spyOn(pruebamerge, "merge");
		pruebamerge.setup(enemies.basic.sprite)
		expect(pruebamerge.merge).toHaveBeenCalled();
	});
});
