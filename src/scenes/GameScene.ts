import * as types from "../types";
import BaseScene from "./BaseScene";
import * as entities from "../entities";
import * as handlers from "../handlers";
import * as behaviors from "../behaviors";

export default class extends BaseScene {
	constructor(param: g.SceneParameterObject) {
		super(param);

		this.onLoad.addOnce(this.onLoadHandler, this);
		this.onMessage.add(handlers.LogginHandler);
		this.onMessage.add(this.onMessageHandler, this);
	}

	onLoadHandler() {
		const rect = new entities.RedRect(this);
		new behaviors.LoopMoveToRight(rect).activate();
		this.append(rect);
	}

	onMessageHandler(arg: types.MessageEvent) {
		switch (arg.data.type) {
			default:
			// 無視
		}
	}
}
