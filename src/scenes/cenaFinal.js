class GameOver extends Phaser.Scene {
  constructor() {
    super({
      key: "GameOver",
    });
  }

  preload() {
    // Carrega os elementos utilizados na cena de game over do jogo
    this.load.image("cenaFinal", "src/assets/gocerto.png");
    this.cameras.main.setBackgroundColor(0xa5e2ff);
    this.load.image("botaoMenu", "src/assets/botaoMenu.png");
    this.load.image("botaoInicio", "src/assets/botaoVoltarInicio.png");
    this.load.audio("sfxGameOver", "src/assets/sounds/efeitoSonoroGameOver.wav");
    this.load.bitmapFont("iosevka", "src/assets/fonts/iosevka_0.png", "src/assets/fonts/iosevka.fnt");

  }
  init(params) {
    this.pontuacao = params.pontuacao;
  }
  create() {
    this.musicaGameOver = this.sound.add("sfxGameOver", {
      loop: false,
      volume: 0.5,
    });
    if (this.pontuacao == 0){
      this.pontuacao = "00"
    }
    this.fundoTempoDescontado = this.add.rectangle(640, 360, 450, 610, 0xd4d4d4).setStrokeStyle(6, 0xa57fff);
    this.musicaGameOver.play();
    this.add.image(640, 200, "cenaFinal").setScale(0.16); // Cria a frase: "Acabou o tempo!"
    this.botaoMenu = this.add
      .sprite(535, 575, "botaoMenu")
      .setInteractive()
      .setScale(0.3)
      .setVisible(true)
      .setScrollFactor(0); // Cria o botão de voltar para o menu
    this.botaoVoltar = this.add
      .sprite(735, 585, "botaoInicio")
      .setInteractive()
      .setScale(0.3)
      .setVisible(true)
      .setScrollFactor(0); // Cria o botão de voltar para o início do jogo
    this.textoPontuacao = this.add
      .bitmapText(536, 400, "iosevka",`Pontuação: ${this.pontuacao}`, 40)
      .setVisible(true);

    this.events.on("GameOver", () => {
      console.log("teste");
    });

    this.botaoMenu.on("pointerover", () => {
      // Evento de passar o mouse sobre o botaoMenu
      this.input.setDefaultCursor("pointer"); // Cursor vira mãozinha
    });

    this.botaoMenu.on("pointerout", () => {
      // Evento de retirar o mouse do botaoMenu
      this.input.setDefaultCursor("default"); // Cursor vira setinha
    });

    this.botaoVoltar.on("pointerover", () => {
      // Evento de passar o mouse sobre o botaoVoltarInicio
      this.input.setDefaultCursor("pointer"); // Cursor vira mãozinha
    });

    this.botaoVoltar.on("pointerout", () => {
      // Evento de retirar o mouse do botaoVoltarInicio
      this.input.setDefaultCursor("default"); // Cursor vira setinha
    });

    this.botaoMenu.on("pointerdown", () => {
      //Fecha a cena de game over e volta para o menu do jogo
      this.scene.stop("GameOver");
      this.scene.restart("livros");
      this.scene.start("menu");
      this.scene.start("cenaCases");
    });

    this.botaoVoltar.on("pointerdown", () => {
      //Fecha a cena de game over e volta início do jogo
      this.scene.stop("GameOver");
      this.scene.sleep("livros");
      this.scene.restart("livros");
      this.scene.sleep("quiz");
      this.scene.restart("quiz");
      this.scene.start("cenaPrincipal", { from: "GameOver" });
      this.scene.start("cenaHUD");
      this.scene.start("cenaCases");
    });
  }
}
