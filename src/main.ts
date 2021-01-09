import * as scenes from "./scenes";

function main(param: g.GameMainParameterObject): void {
	const initialScene = new scenes.GameScene({
		game: g.game,
	});
	g.game.pushScene(initialScene);
}

export = main;
