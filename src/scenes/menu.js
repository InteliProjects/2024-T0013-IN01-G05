class MenuPrincipal extends Phaser.Scene {
  constructor() {
    super({
      key: "menu",
    })
  }
  preload() {
    this.load.image("background", "src/assets/backgroundMenu.png") // Fundo da cena do Main Menu
    this.load.image("inteliLogo", "src/assets/logointeli.png") // Fundo da cena do Main Menu
    this.load.image("nuvem", "src/assets/nuvem.png")
    this.load.spritesheet("botaoJogar", "src/assets/botaoJogarNovo.png", {
      frameWidth: 400,
      frameHeight: 200
    }) // Imagem para botaoJogar
    this.load.audio("efeitoSonoroBotaoIniciar", "src/assets/sounds/efeitoSonoroBotaoIniciar.mp3") // SFX do botão iniciar
    this.load.bitmapFont("dyslexic", "src/assets/fonts/dyslexic_0.png", "src/assets/fonts/dyslexic.fnt");
    this.load.bitmapFont("iosevka", "src/assets/fonts/iosevka_0.png", "src/assets/fonts/iosevka.fnt");
  }

  create() {

    // Carrega a cena Main Menu
    this.mainMenu = this.add.image(640, 360, "background").setScale(1)
    this.logoInteli = this.add.image(1180, 630, "inteliLogo").setScale(1)
    this.nuvem1 = this.add.image(532, 320, "nuvem").setScale(1.3);
    this.nuvem2 = this.add.image(680, 165, "nuvem").setScale(1.2).setFlip(true);
    this.nuvem3 = this.add.image(700, 465, "nuvem").setScale(0.3);
    this.nuvem4 = this.add.image(130, 170, "nuvem").setScale(0.4).setFlip(true);
    this.nuvem5 = this.add.image(980, 320, "nuvem").setScale(0.2).setFlip(true);
    this.botaoJogar = this.add.sprite(640, 620, "botaoJogar").setInteractive().setScale(1)

    // Adiciona efeito sonoro do botão iniciar
    this.efeitoSonoroBotaoIniciar = this.sound.add("efeitoSonoroBotaoIniciar",{volume: 0.5});

    // Cria a animação de botaoJogar
    this.anims.create({
      key: "animar",
      frames: this.anims.generateFrameNumbers("botaoJogar", {
        start: 0,
        end: 1
      }),
      frameRate: 2,
      repeat: -1
    });

    // Ativa a animação de botaoJogar
    this.botaoJogar.anims.play("animar", true);

    // Move as nuvens no eixo X
    this.tweens.add({
      targets: this.nuvem1,
      x: -380,
      duration: 5000,
      ease: "Linear",
      repeat: 0,
    })

    this.tweens.add({
      targets: this.nuvem2,
      x: 1550,
      duration: 5000,
      ease: "Linear",
      repeat: 0,
    })
    this.tweens.add({
      targets: this.nuvem3,
      x: 1550,
      duration: 5000,
      ease: "Linear",
      repeat: -1,
      yoyo: true,
    })
    this.tweens.add({
      targets: this.nuvem4,
      x: -380,
      duration: 5000,
      ease: "Linear",
      repeat: -1,
      yoyo: true,
    })
    this.tweens.add({
      targets: this.nuvem5,
      x: 1550,
      duration: 5000,
      ease: "Linear",
      repeat: -1,
      yoyo: true,
    })

    // Lógica para destruir nuvens caso ultrapassem os limites de tela
    

    // Ajuste visual da imagem do mouse para fornecer feedback que o botão jogar é interativo
    this.botaoJogar.on("pointerover", () => {
      // Evento de passar o mouse sobre o botaoJogar
      this.input.setDefaultCursor("pointer") // Cursor vira mãozinha
    })
    this.botaoJogar.on("pointerout", () => {
      // Evento de retirar o mouse do botaoJogar
      this.input.setDefaultCursor("default") // Cursor vira setinha
    })

    // Evento disparado ao clicar no botão (Código temporário apenas para demonstração da funcionalidade na sprint 1)
    this.botaoJogar.on("pointerup", () => {
      // Evento de click do mouse
      this.efeitoSonoroBotaoIniciar.play();
      if (!this.scale.isFullscreen) {
        this.scale.startFullscreen();
      }
      this.cameras.main.fadeOut(1000, 0, 0, 0)
      // Realiza FadeOut antes de passar para próxima cena
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.time.delayedCall(1000, () => {
          this.scene.start("cenaPrincipal", { from: "menu" })
          this.scene.start("cenaHUD")
          this.scene.restart("cenaHUD");
          this.scene.stop("menu")
          this.input.setDefaultCursor("default") // Retorno do cursor do mouse para setinha
        })
      })
      // this.openFullScreen()
    })

    this.scene.sleep("livros");
    this.scene.sleep("quiz");

  }

  update() {
    // Lógica para destruir nuvens caso ultrapassem os limites de tela e criar algumas novas nuvens
  }
}