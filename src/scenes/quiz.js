class Quiz extends Phaser.Scene {
    constructor() {
        super({
            key: "quiz", // Chave da cena
            active: true // Define a cena como ativa
        })
    }

    preload() {
        // Pré-carregamento de imagens
        this.load.image("x", "src/assets/botaoX.png"); // Carrega a imagem do botão "X"
        this.load.image("simbolo", "src/assets/simboloquiz.png"); // Carrega a imagem do símbolo do quiz
        this.load.audio("efeitoSonoroAcertar", "src/assets/sounds/efeitoSonoroAcertar.mp3") // SFX de Acertar
        this.load.audio("efeitoSonoroErrar", "src/assets/sounds/efeitoSonoroErrar.mp3") // SFX de Errar
    }

    create() {
        this.alternativaRespondida = false;
        this.primeiraCena = this.scene.get("cenaPrincipal"); // Obtém a referência para a cena "cenaPrincipal"
        this.cenaHUD = this.scene.get("cenaHUD"); // Obtém a referência para a cena "cenaPrincipal"
        this.scene.sleep();
        // Adicionando o fundo branco e a borda retangulas
        const bgWhite = this.add.rectangle(gameDimensions.width / 2, gameDimensions.height / 2, 700, 500, 0xffffff).setStrokeStyle(2, 0x000000);
        
        // Centralizando a imagem do símbolo
        this.simboloQuiz = this.add.image(bgWhite.x, bgWhite.y - 130, "simbolo").setScale(0.5);
        this.fundoFeedback = this.add.rectangle (bgWhite.x, bgWhite.y - 130, 500, 130, 0xfddfe6).setVisible(false).setAlpha(0.9)

        // Adiciona efeito sonoro do botão iniciar
        this.efeitoSonoroAcertar = this.sound.add("efeitoSonoroAcertar",{volume: 0.5});
        this.efeitoSonoroErrar = this.sound.add("efeitoSonoroErrar",{volume: 0.5});
        
        // Adicionando a pergunta à cena
        this.primeiraCena.events.on("abrirQuiz", () => {
            this.pergunta ? this.pergunta.destroy() : null;
            this.alternativa1 ? this.alternativa1.destroy() : null;
            this.alternativa2 ? this.alternativa2.destroy() : null;
            this.textoExplicacaoAlternativaErrada ? this.textoExplicacaoAlternativaErrada.destroy() : null;
            this.textoExplicacaoAlternativaCerta ? this.textoExplicacaoAlternativaCerta.destroy() : null;
            this.fundoFeedback ? this.fundoFeedback.setVisible(false) : null;
            
            // Obtém o caso atual
            this.primeiraCena.controlesHabilitados = false;
            const caso = this.primeiraCena.objetoCaso.caso;
            this.pergunta = this.add.text(bgWhite.x, bgWhite.y - 40, caso.quiz.pergunta, {
                fontSize: "20px",
                color: "#000",
                fontFamily: "Arial",
                align: "center",
                wordWrap: {
                    width: 500
                }
            }).setOrigin(0.5);

            // Adicionando as alternativas à cena e suas aparências na interface
            this.alternativa1 = this.add.text(bgWhite.x, bgWhite.y + 60, caso.quiz.alternativas[0], {
                fontSize: "23px",
                color: "#000",
                fontFamily: "Arial",
                backgroundColor: "#008CCC",
                padding: {
                    x: 10,
                    y: 10
                },
                wordWrap: {
                    width: 500
                },
                align: "center"
            }).setOrigin(0.5).setInteractive().on("pointerdown", () => {
                if (!this.alternativaRespondida){
                    // Verifica se a resposta está correta
                    this.verificarResposta(0, caso.quiz.alternativaCorreta);
                    this.primeiraCena.objetoCaso.status = false;
                    this.primeiraCena.objetoCaso.caso = null;
                    this.alternativaRespondida = true;
                    this.cenaHUD.events.emit("quiz-respondido")

                }
            });
    
            this.alternativa2 = this.add.text(bgWhite.x, bgWhite.y + 140, caso.quiz.alternativas[1], {
                fontSize: "21px",
                color: "#000",
                fontFamily: "Arial",
                backgroundColor: "#FFC107",
                padding: {
                    x: 10,
                    y: 10
                },
                wordWrap: {
                    width: 500
                },
                align: "center"
            }).setOrigin(0.5).setInteractive().on("pointerdown", () => {
                if (!this.alternativaRespondida){
                    // Verifica se a resposta está correta
                    this.verificarResposta(1, caso.quiz.alternativaCorreta);
                    this.primeiraCena.objetoCaso.status = false;
                    this.primeiraCena.objetoCaso.caso = null;
                    this.alternativaRespondida = true;
                    this.cenaHUD.events.emit("quiz-respondido")

                }
            });
    

            // Adicionando texto da explicação do porque está certa ou errada a alternativa à cena e também configurações estéticas
            this.textoExplicacaoAlternativaErrada = this.add.text(bgWhite.x, bgWhite.y - 130, caso.feedbackRespostaErrada, {
                fontSize: "22px",
                color: "#ff0000",
                fontFamily: "Arial",
                align: "center",
                wordWrap: {
                    width: 500
                }
            }).setOrigin(0.5).setVisible(false);
            this.textoExplicacaoAlternativaCerta = this.add.text(bgWhite.x, bgWhite.y - 130, caso.feedbackRespostaCerta, {
                fontSize: "22px",
                color: "#008000",
                fontFamily: "Arial",
                align: "center",
                wordWrap: {
                    width: 500
                }
            }).setOrigin(0.5).setVisible(false);
        })


        // Adicionando o botão "X" para voltar à cena principal
        const botaoX = this.add.image(bgWhite.x + 300, bgWhite.y - 200, "x").setScale(0.3).setInteractive();
        botaoX.on("pointerdown", () => {
            // Pausa a cena atual ("quiz")
            this.alternativaRespondida = false;
            this.cenaHUD.textoTempoDescontado.setVisible(false);
            this.cenaHUD.fundoTempoDescontado.setVisible(false);
            this.primeiraCena.controlesHabilitados = true;
            this.alternativa1.destroy();
            this.alternativa2.destroy();
            this.textoExplicacaoAlternativaErrada.destroy();
            this.textoExplicacaoAlternativaCerta.destroy();
            this.scene.sleep("quiz");
            // Reinicia a cena para cada vez que ocorre o overlap com a tenda o quiz voltar a sua forma padrão para que o jogador possa jogar de novo
            this.scene.restart();
            // Resume a física na cena "cenaPrincipal", é útil se a cena principal contiver objetos físicos em movimento ou interações físicas que precisem ser retomadas após o término do quiz
            
        });
    }

    verificarResposta(resposta, alternativaCorreta) {
        // Verifica se a resposta está correta
        this.simboloQuiz.setVisible(false)
        if (resposta === alternativaCorreta) {
            this.efeitoSonoroAcertar.play();
            this.cenaHUD.atualizarPontuacao(10);
            // Define a mensagem de explicação para resposta correta
            this.textoExplicacaoAlternativaCerta.setVisible(true);
            this.fundoFeedback.setVisible(true);
            this.fundoFeedback.setStrokeStyle(2, 0x008000).setVisible(true);
        } else {
            this.efeitoSonoroErrar.play();
            this.cenaHUD.atualizarTempo(10);
            // Define a mensagem de explicação para resposta incorreta
            this.textoExplicacaoAlternativaErrada.setVisible(true);
            this.fundoFeedback.setVisible(true);
            this.fundoFeedback.setStrokeStyle(2, 0xff0000).setVisible(true);
        }
    }
    
}
