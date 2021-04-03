import * as Phaser from 'phaser';
import Scenes from './scenes';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Idle Game',

  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },

  parent: 'game',
  plugins: {
	  global: [
		  NineSlicePlugin.DefaultCfg
	  ]
  }
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
