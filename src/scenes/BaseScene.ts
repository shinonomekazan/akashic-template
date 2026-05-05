import * as types from "../types";

export class BaseScene extends g.Scene {
	get gameVars() {
		return this.game.vars as types.GameVars;
	}

	get config() {
		return this.gameVars.config;
	}

	get gameState() {
		return this.gameVars.gameState;
	}
}
