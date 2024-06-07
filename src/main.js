// Cria as configurações para Phaser.Game
const gameDimensions = {
    width: 1280,
    height: 720,
}
const config = {
    type: Phaser.WEBGL, // Ajusta o renderizador automaticamente (WebGL e Canvas)
    width: gameDimensions.width, // Ajusta a largura para 1334 pixels (temporário)
    height: gameDimensions.height, // Ajusta a altura
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta a tela para mobile
    },
    scene: [
        MenuPrincipal, CenaPrincipal, CenaHUD, CenaCases, Livros, Quiz, GameOver
    ],
    pixelArt: true,

};

// Cria o jogo passando a variável config como atributos
const game = new Phaser.Game(config);