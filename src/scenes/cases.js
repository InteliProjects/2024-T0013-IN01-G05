class CenaCases extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaCases', active: true });
    }

    preload() {
        this.load.image("base-case", "src/assets/base-case.png");
        this.load.image("botao-fechar", "src/assets/botaoX.png");
        this.load.audio("efeitoSonoroBotaoX", "src/assets/sounds/efeitoSonoroBotaoX.mp3") // SFX do Botao de Fechar do Case
        this.load.image("ronald", "src/assets/cases/pessoas/ronald.png");
        this.load.image("maria", "src/assets/cases/pessoas/maria.png");
        this.load.image("sofia", "src/assets/cases/pessoas/sofia.png");
        this.load.image("apolo", "src/assets/cases/pessoas/apolo.png");
        this.load.image("carlo", "src/assets/cases/pessoas/carlo.png");
        this.load.image("fernanda", "src/assets/cases/pessoas/fernanda.png");
        this.load.image("graca", "src/assets/cases/pessoas/graca.png");
        this.load.image("henrique", "src/assets/cases/pessoas/henrique.png");
        this.load.image("leonardo", "src/assets/cases/pessoas/leonardo.png");
        this.load.image("monica", "src/assets/cases/pessoas/monica.png");
        this.load.image("pedro", "src/assets/cases/pessoas/pedro.png");
        this.load.image("penelope", "src/assets/cases/pessoas/penelope.png");
        this.load.image("pepita", "src/assets/cases/pessoas/pepita.png");
        this.load.image("tony", "src/assets/cases/pessoas/tony.png");
        this.load.bitmapFont("pixelBitmapFont", "src/assets/fonts/pixel_0.png", "src/assets/fonts/pixel.fnt");
    }

    create() {   
        this.primeiraCena = this.scene.get("cenaPrincipal"); // Pega a cena principal para pausar o jogo

        // Reserva as posições de X e Y da câmera
        this.centroX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.centroY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        // Adiciona o case e botão para fechar nas coordenadas específicas tendo como referência centro X e Y
        
        this.case1 = this.add.image(this.centroX, this.centroY, "base-case").setScale(0.50).setVisible(false).setScrollFactor(0); // Adiciona a imagem do case, quando ocorre esse overlap
        this.botaoX = this.add.sprite(this.case1.x + 210, this.case1.y - 275, "botao-fechar").setInteractive().setScale(0.25).setVisible(false).setScrollFactor(0); // Adiciona a imagem do botao, quando ocorre esse overlap

        // Adiciona efeito sonoro do botão iniciar
        this.efeitoSonoroBotaoX = this.sound.add("efeitoSonoroBotaoX",{volume: 0.5});

        this.botaoX.on("pointerover", () => {
            // Evento de passar o mouse sobre o botaoJogar
            this.input.setDefaultCursor("pointer") // Cursor vira mãozinha
        });
            
        this.botaoX.on("pointerout", () => {
            // Evento de retirar o mouse do botaoJogar
            this.input.setDefaultCursor("default") // Cursor vira setinha
        });
            
        // Evento disparado ao clicar no botão (Código temporário apenas para demonstração da funcionalidade na sprint 1)
        this.botaoX.on("pointerdown", () => {
            //Fecha tudo do case e volta para o jogo
            this.efeitoSonoroBotaoX.play();
            this.nomeTexto.destroy();
            this.casoTexto.destroy();
            this.sintomasTexto.destroy();
            this.classificacaoTexto.destroy();
            this.casoImage.destroy();
            this.case1.setVisible(false);
            this.botaoX.setVisible(false);
            this.primeiraCena.events.emit("fecharCase");    
            this.primeiraCena.controlesHabilitados = true; // Habilita os controles do jogador
            this.events.emit("mudaTarefaParaLivros");
            });
        // Requisições de informações de outras cenas

        this.abrirCase = this.scene.get("cenaHUD"); // Pega a cena HUD para abrir o case       
        const abrirCase = () => {
            // Adiciona as informações do caso na tela de casos
            this.primeiraCena.controlesHabilitados = false; // Desabilita os controles do jogador
            const caso = this.primeiraCena.objetoCaso.caso;
            this.efeitoSonoroBotaoX.play(); // Efeito sonoro do botão de fechar
            this.case1.setVisible(true);
            this.botaoX.setVisible(true); // Mostra o botão de fechar
            this.nomeTexto ? this.nomeTexto.destroy() : null; // Verifica se o texto já existe, se sim, destroi
            this.casoTexto ? this.casoTexto.destroy() : null;
            this.sintomasTexto ? this.sintomasTexto.destroy() : null;
            this.classificacaoTexto ? this.classificacaoTexto.destroy() : null;
            this.casoImage ? this.casoImage.destroy() : null;
            this.nomeTexto = this.add.text(this.centroX, this.centroY - 220, caso.nome, { fontSize: '36px', fill: '#000000', backgroundColor: "#5CE1E6", padding: {x: 10, y: 10} }).setVisible(true).setOrigin(0.5); // Adiciona o nome do caso importando do JSON
            this.casoImage = this.add.image(this.centroX, this.centroY - 100, caso.fotoKey).setScale(0.40).setVisible(true); // Adiciona a imagem do caso importando do JSON
            this.casoTexto = this.add.bitmapText(this.centroX - 210, this.centroY, "iosevka", caso.desc, 28).setVisible(true).setMaxWidth(450); // Adiciona a descrição do caso importando do JSON
            for (let i = 0; i < caso.colored.length; i++){
                this.casoTexto.setWordTint(caso.colored[i], 1, true, 0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff); // Adiciona a cor azul para as palavras que estão no array colored
            }
            this.sintomasTexto = this.add.bitmapText(this.centroX - 210, this.centroY + this.casoTexto.height + 10, "iosevka", "Sintomas: "+caso.sintomas, 24).setVisible(true).setMaxWidth(450); // Adiciona os sintomas do caso importando do JSON
            this.classificacaoTexto = this.add.bitmapText(this.centroX - 210, this.centroY + this.casoTexto.height + this.sintomasTexto.height + 20, "iosevka", "Classificação: "+caso.classificacao, 24).setVisible(true).setMaxWidth(450).setWordTint(caso.classificacao.split(" ")[0], 1, true, Number(caso.classificacaoCor), Number(caso.classificacaoCor), Number(caso.classificacaoCor), Number(caso.classificacaoCor)); // Adiciona a classificação do caso importando do JSON
            this.primeiraCena.controlesHabilitados = false; // Desabilita os controles do jogador
            this.primeiraCena.jogador.setVelocity(0, 0); // Para o jogador
            
        }
        this.abrirCase.events.on("abrirCase", abrirCase, this); // Evento para abrir o case
        this.primeiraCena.events.on("abrirCase", abrirCase, this); // Evento para abrir o case
    } 
}