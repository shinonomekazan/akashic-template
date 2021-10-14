import * as tile from "@akashic-extension/akashic-tile";
import { WolfAutoTile } from "akashic-wolf-autotile";
import { Character4 } from "akashic-simple-character4";
import * as types from "../types";
import * as entities from "../entities";
import * as handlers from "../handlers";
import * as behaviors from "../behaviors";
import * as components from "../components";
import * as utils from "../utils";
import BaseScene from "./BaseScene";
export default class extends BaseScene {
	button?: components.BasicButton;

	rect?: entities.RedRect;

	constructor(param: g.SceneParameterObject) {
		super(utils.mergeAssetPaths(param, [
			"/assets/parts/buttons.png",
			"/assets/maps/basic.png",
			"/assets/maps/wolf_sea.png",
			"/assets/maps/wolf_sand.png",
			"/assets/characters/pipo-charachip001.png",
		]));

		this.onLoad.addOnce(this.onLoadHandler, this);
		this.onMessage.add(handlers.LogginHandler);
		this.onMessage.add(this.handleMessage, this);
		this.button = undefined;
		this.rect = undefined;
	}

	onLoadHandler() {
		new tile.Tile({
			scene: this,
			src: this.asset.getImage("/assets/maps/basic.png"),
			tileData: [
				[-1,-1,-1,-1,-1],
				[-1, 0, 1, 2,-1],
				[-1,16,17,18,-1],
				[-1,32,33,34,-1],
			],
			tileWidth: 32,
			tileHeight: 32,
			parent: this,
		});
		const autoTile = new WolfAutoTile({
			scene: this,
			src: this.asset.getImage("/assets/maps/wolf_sea.png"),
			// src: this.asset.getImage("/assets/maps/wolf_sand.png"),
			tileData: [
				[-1,-1,-1,-1,-1, 0],
				[-1, 0, 0, 0,-1, 0],
				[-1, 0, 0, 0,-1, 0],
				[-1, 0, 0, 0,-1,-1],
				[-1,-1,-1,-1,-1,-1],
				[-1, 0, 0,-1, 0,-1],
				[-1, 0, 0,-1,-1,-1],
				[-1,-1,-1,-1, 0,-1],
				[-1, 0, 0, 0, 0,-1],
				[-1, 0,-1,-1,-1,-1],
			],
			tileWidth: 16,
			tileHeight: 16,
			parent: this,
		});
		this.setInterval(() => {
			autoTile.tileData.forEach((row, y) => {
				row.forEach((col, x) => {
					if (col === 0) {
						autoTile.tileData[y][x] = 5;
					} else if (col === 5) {
						autoTile.tileData[y][x] = 0;
					}
				});
			});
			autoTile.invalidate();
		}, 200);

		const chara4 = new Character4({
			scene: this,
			src: this.asset.getImage("/assets/characters/pipo-charachip001.png"),
			animationFrameCount: 3,
			interval: 200,
			width: 32,
			height: 32,
			parent: this,
			x: g.game.width / 2,
			y: g.game.height / 2,
		});
		chara4.start();

		this.rect = new entities.RedRect(this);
		new behaviors.LoopMoveToRight(this.rect).activate();

		this.button = new components.BasicButton({
			scene: this,
			src: this.asset.getImage("/assets/parts/buttons.png"),
			width: 34,
			height: 34,
			x: this.game.width / 2 - 34 / 2,
			y: this.game.height - 34 - 17,
			parent: this,
		});
		this.button.onClick.add(this.handleButtonClick, this);

		this.onPointDownCapture.add((e) => {
			chara4.animationMoveTo(
				Math.floor(e.point.x / 32) * 32,
				Math.floor(e.point.y / 32) * 32,
			);
		});

		this.append(this.rect);
	}

	handleButtonClick() {
		if (this.rect.visible()) {
			this.rect.hide();
		} else {
			this.rect.show();
		}
		this.rect.modified();
		console.log("clicked");
	}

	handleMessage(arg: types.MessageEvent) {
		switch (arg.data.type) {
			default:
			// 無視
		}
	}
}
