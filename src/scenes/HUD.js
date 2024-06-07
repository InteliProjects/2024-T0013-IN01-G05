class CenaHUD extends Phaser.Scene {
  constructor() {
    super({ key: "cenaHUD" }); // Define a key da cena e a mantém ativada desde o início do ciclo de jogo
  }

  preload() {
    this.load.image("botaoCaseBaixo", "src/assets/botaoCase_baixo.png");
    this.load.image("botaoCaseAlto", "src/assets/botaoCase_alto.png");
    this.load.spritesheet("HUD", "src/assets/novaHUD.png", {
      frameWidth: 1000,
      frameHeight: 200,
    });
    this.load.image("seta", "src/assets/seta.png");
    this.load.bitmapFont("iosevka2", "src/assets/fonts/iosevka_0.png", "src/assets/fonts/iosevka.fnt");
  }

  create() {
    this.tempo ? this.tempo.remove() : null
    this.habilitarTarefa = false;
    //  Define variáveis de chamada das cenas
    const cenaAtual = this.scene.get("cenaPrincipal");
    const cenaLivros = this.scene.get("livros");
    const cenaCases = this.scene.get("cenaCases");

    this.state = "Tina";
    // Define um tempo inicial para o timer
    this.tempoInicial = 360;
    this.pontuacao = 0;
    // Cria os elementos do timer
    this.HUDImage = this.add
      .sprite(640, 100, "HUD")
      .setScale(1.25)
      .setVisible(false);
    this.textoTempo = this.add.bitmapText(600, 30, "iosevka2", (this.tempoInicial - (this.tempoInicial % 60)) / 60 +"min " + (this.tempoInicial % 60) + "s", 48).setVisible(false); // Adiciona o texto do tempo na tela do jogo
    this.botaoCaseBaixo = this.add
      .image(1140, 180, "botaoCaseBaixo")
      .setScale(3)
      .setVisible(false)
      .setInteractive();
    this.botaoCaseAlto = this.add
      .image(1140, 180, "botaoCaseAlto")
      .setScale(3)
      .setVisible(false)
      .setInteractive();
    this.botaoCase = this.add
      .circle(1140, 180, 70, 0xffffff, 1)
      .setVisible(false)
      .setInteractive()
      .setAlpha(0.1);
    this.fundoTempoDescontado = this.add
      .rectangle(715, 90, 140, 55, 0xf10016)
      .setVisible(false)
      .setAlpha(0.14);
    this.textoTempoDescontado = this.add
      .text(650, 70, "-10s", { fontSize: "50px", fill: "#ff0000" })
      .setVisible(false); // Adiciona o texto do tempo descontado na tela do jogo
    // Cria os elementos da tarefas
    this.textoTarefa = this.add
      .bitmapText(25, 30, "iosevka2", "Procure a Dra. Tina", 42)
      .setVisible(false);
    this.seta = this.add.image(450, 50, "seta").setScale(1.5).setVisible(false);
    // Cria os elementos da pontuação
    this.textoPontos = this.add
      .bitmapText(840, 30, "iosevka2", "Pontos: 0", 42)
      .setVisible(false);

    // Cria evento para mostrar parte da HUD (Tarefas)
    cenaAtual.events.once(
      "mostraTarefaInicial",
      function () {
        // Mostra o texto da tarefa
        this.HUDImage.setVisible(true);
        this.textoTarefa.setVisible(true);
        this.textoPontos.setVisible(true);
        this.seta.setVisible(true);
        this.habilitarTarefa = true;
      },
      this
    );

    // Cria evento para mostrar parte da HUD (Timer)
    cenaAtual.events.once(
      "showTimer",
      function () {
        setTimeout(() => {}, this.tempoInicial * 1000); // função para chamar tela final após o tempo de jogo

        // Redefine alguns elementos do HUD
        this.HUDImage.anims.play("hudAnimate", true);
        this.textoTempo.setVisible(true);
        this.textoTarefa.setVisible(true).setText("Tenda de livros?");
        this.textoPontos.setText(`Pontos: ${this.pontuacao}`);

        this.tempoEvent = this.time.addEvent({
          delay: 1000, // delay de 1000 ms = 1 segundo
          callback: () => {
            this.textoTempo.setVisible(true);
            if (this.tempoInicial > 0) {
              this.tempoInicial -= 1; // Decrementa o contador
            }
            this.textoTempo.setText(
              (this.tempoInicial - (this.tempoInicial % 60)) / 60 +
                "min " +
                (this.tempoInicial % 60) +
                "s"
            );
            // console.log("time: ",time/1000)

            if (
              (this.tempoInicial - (this.tempoInicial % 60)) / 60 === 0 &&
              this.tempoInicial <= 30
            ) {
              //this.textoTempo.setPosition(550, 400);
              this.textoTempo.setTintFill(
                0xff0000,
                0xff0000,
                0xff0000,
                0xff0000
              );
              this.HUDImage.anims.play("hudAnimateRed", true);
            }
            if (this.tempoInicial === 0) {
              this.tempoEvent.remove();
              this.tempoEvent.destroy();
              this.scene.stop("cenaPrincipal");
              this.scene.stop("cenaHUD");
              this.scene.sleep("livros");
              this.scene.sleep("cenaCases");
              cenaAtual.musicaJogo.destroy();
              cenaAtual.efeitoSonoroCriancas.destroy(); // Inicia efeito sonoro das crianças
              this.scene.start("GameOver", {
                pontuacao: this.pontuacao,
              });
            }
          },
          loop: true, // Atualiza o texto
        });
      },
      this
    );

    // Cria evento para mostrar o case por um botão
    cenaAtual.events.on(
      "botaoCase",
      function () // Define o evento "botaoCase"
      {
        this.botaoCase.setVisible(true);
        this.botaoCaseBaixo.setVisible(true);
        this.botaoCase.on("pointerover", () => {
          // Troca o ícone de reabertura do case quando o mouse está em cima
          this.botaoCaseBaixo.setVisible(false);
          this.botaoCaseAlto.setVisible(true);
        });

        this.botaoCaseBaixo.setVisible(true);
        console.log("teste1");
        this.botaoCase.on("pointerout", () => {
          // Retorna o ícone de reabertura do case quando o mouse está em cima
          this.botaoCaseBaixo.setVisible(true);
          this.botaoCaseAlto.setVisible(false);
        });

        this.botaoCase.on("pointerdown", () => {
          // Disparo da cena "abrirCase" quando clicar no botão do case
          this.events.emit("abrirCase");
          console.log("teste2");
        });
      },
      this
    );

    // Cria evento para mudar o texto de elementos do HUD
    cenaLivros.events.on(
      "mudaTarefaParaQuiz",
      function () // Define o evento "botaoCase"
      {
        this.textoTarefa.setText("Tenda do Quiz?");
        this.state = "quiz";
      },
      this
    );

    // Cria evento para mudar o texto de elementos do HUD
    cenaCases.events.on(
      "mudaTarefaParaLivros",
      function () // Define o evento "botaoCase"
      {
        this.textoTarefa.setText("Tenda dos Livros?");
        this.state = "livros";
      },
      this
    );

    this.events.on("quiz-respondido", () => {
      // Fecha tudo do case e volta para o jogo
      this.botaoCaseAlto.setVisible(false);
      this.botaoCaseBaixo.setVisible(false);
      this.botaoCase.setVisible(false);
      this.textoTarefa.setText("Procure a Dra. Tina");
      this.state = "Tina";
    });

    this.anims.create({
      key: "hudAnimate", // Chave que cria o nome para iniciar a animação
      frames: this.anims.generateFrameNumbers("HUD", {
        start: 0,
        end: 3,
      }), // Define quais frames serão utilizados nessa animação
      frameRate: 4, // Velocidade da animação em frames por segundo
      repeat: -1, // -1 para loop infinito
    });
    this.anims.create({
      key: "hudAnimateRed", // Chave que cria o nome para iniciar a animação
      frames: this.anims.generateFrameNumbers("HUD", {
        start: 4,
        end: 7,
      }), // Define quais frames serão utilizados nessa animação
      frameRate: 6, // Velocidade da animação em frames por segundo
      repeat: -1, // -1 para loop infinito
    });
  }
  atualizarPontuacao(pontuacao) {
    // Atualiza a pontuação
    this.pontuacao += pontuacao;
    this.textoPontos.setText(`Pontos: ${this.pontuacao}`);
  }
  atualizarTempo(tempo) {
    // Atualiza o tempo
    this.tempoInicial -= tempo;
    this.textoTempo.setText(
      (this.tempoInicial - (this.tempoInicial % 60)) / 60 +
        "min " +
        (this.tempoInicial % 60) +
        "s"
    );
    this.textoTempoDescontado.setVisible(true);
    this.fundoTempoDescontado.setVisible(true).setStrokeStyle(2, 0xff0000);
    if (this.tempoInicial >= -10 && this.tempoInicial < 0) {
      this.tempoInicial = 0;
    }
  }
  update() {
    if (this.habilitarTarefa) {
      const cenaAtual = this.scene.get("cenaPrincipal");
      if (this.state === "Tina") {
        const rotateAngle =
          Math.atan2(
            cenaAtual.jogador.y - cenaAtual.tina.y,
            cenaAtual.jogador.x - cenaAtual.tina.x
          ) +
          Math.PI / 2;
        this.seta.setRotation(rotateAngle);
      } else if (this.state === "livros") {
        const rotateAngle =
          Math.atan2(cenaAtual.jogador.y - 550, cenaAtual.jogador.x - 150) +
          Math.PI / 2;
        this.seta.setRotation(rotateAngle);
      } else if (this.state === "quiz") {
        const rotateAngle =
          Math.atan2(cenaAtual.jogador.y - 545, cenaAtual.jogador.x - 980) +
          Math.PI / 2;
        this.seta.setRotation(rotateAngle);
      }
    }
  }
}
