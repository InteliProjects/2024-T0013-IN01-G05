class Livros extends Phaser.Scene {
    constructor() {
        super({
            key: "livros",
            active: true
        })
    }

    preload() {
        // Carrega as imagens a serem utilizadas
        this.load.image("livroVerde", "src/assets/livroVerde.png");
        this.load.image("livroAmarelo", "src/assets/livroAmarelo.png");
        this.load.image("livroVermelho", "src/assets/livroVermelho.png");
        this.load.image("livroVerdeAberto", "src/assets/livroVerdeAberto.png");
        this.load.image("livroAmareloAberto", "src/assets/livroAmareloAberto.png");
        this.load.image("livroVermelhoAberto", "src/assets/livroVermelhoAberto.png");
        this.load.image("backgroundLivros", "src/assets/backgroundLivros.png");
        this.load.image("botaoX", "src/assets/botaoX.png");
        this.load.audio("efeitoSonoroVirarPagina", "src/assets/sounds/efeitoSonoroVirarPagina.mp3"); // SFX da página do livro
        this.load.image("primeiro-grau", "src/assets/conteudo-livros/images/primeiro-grau.png");
        this.load.image("segundo-grau", "src/assets/conteudo-livros/images/segundo-grau.png");
        this.load.image("terceiro-grau", "src/assets/conteudo-livros/images/terceiro-grau.png");
        this.load.image("setaVermelha", "src/assets/setaVermelha.png");
        this.load.image("setaVerde", "src/assets/setaVerde.png");
        this.load.image("setaAmarela", "src/assets/setaAmarela.png");

        this.load.image("verdeCase1", "src/assets/paginaCases/case1.png");
        this.load.image("verdeCase2", "src/assets/paginaCases/case2.png");
        this.load.image("verdeCase3", "src/assets/paginaCases/case3.png");
        this.load.image("verdeCase4", "src/assets/paginaCases/case4.png");
        this.load.image("verdeCase5", "src/assets/paginaCases/case5.png");
        this.load.image("amareloCase6", "src/assets/paginaCases/case6.png");
        this.load.image("amareloCase7", "src/assets/paginaCases/case7.png");
        this.load.image("amareloCase8", "src/assets/paginaCases/case8.png");
        this.load.image("amareloCase9", "src/assets/paginaCases/case9.png");
        this.load.image("amareloCase10", "src/assets/paginaCases/case10.png");
        this.load.image("vermelhoCase11", "src/assets/paginaCases/case11.png");
        this.load.image("vermelhoCase12", "src/assets/paginaCases/case12.png");

        this.load.image("tiposQueimadura", "src/assets/paginasIniciais/tipo.png");
        this.load.image("primeirograu1", "src/assets/paginasIniciais/primeirograu1.png");
        this.load.image("primeirograu2", "src/assets/paginasIniciais/primeirograu2.png");
        this.load.image("segundograu1", "src/assets/paginasIniciais/segundograu1.png");
        this.load.image("segundograu2", "src/assets/paginasIniciais/segundograu2.png");
        this.load.image("terceirograu1", "src/assets/paginasIniciais/terceirograu1.png");
        this.load.image("terceirograu2", "src/assets/paginasIniciais/terceirograu2.png");
        this.load.image("setaVoltar", "src/assets/setaVoltar.png")
    }

    create() {
        this.primeiraCena = this.scene.get("cenaPrincipal");
        this.scene.sleep("livros")
        this.texto = this.cache.json.get("conteudo-livros");
        // this.eventoGatilho.on("tendaLivros", () => {
        // Adiciona o background e livros a serem apresentados na cena
        this.add.image(0, 0, "backgroundLivros").setOrigin(0, 0).setScale(2);
        this.livroVerde = this.add.image(100, 200, "livroVerde").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroAmarelo = this.add.image(500, 200, "livroAmarelo").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroVermelho = this.add.image(900, 200, "livroVermelho").setOrigin(0, 0).setScale(1.6).setInteractive();
        this.livroAmareloAberto = this.add.image(640, 350, "livroAmareloAberto").setScale(2.6).setVisible(false);
        this.livroVermelhoAberto = this.add.image(640, 350, "livroVermelhoAberto").setScale(2.6).setVisible(false);
        this.livroVerdeAberto = this.add.image(640, 350, "livroVerdeAberto").setScale(2.6).setVisible(false);
        // inicia os objetos iniciais da cena livro
        // Adiciona efeito sonoro de virar a página
        this.efeitoSonoroVirarPagina = this.sound.add("efeitoSonoroVirarPagina", {
            volume: 0.5
        });

        this.verdeCase1 = this.add.image(850, 325, "verdeCase1").setVisible(false);
        this.verdeCase2 = this.add.image(850, 325, "verdeCase2").setVisible(false);
        this.verdeCase3 = this.add.image(400, 325, "verdeCase3").setVisible(false);
        this.verdeCase4 = this.add.image(850, 325, "verdeCase4").setVisible(false);
        this.verdeCase5 = this.add.image(400, 325, "verdeCase5").setVisible(false);

        this.amareloCase6 = this.add.image(850, 325, "amareloCase6").setVisible(false);
        this.amareloCase7 = this.add.image(850, 325, "amareloCase7").setVisible(false);
        this.amareloCase8 = this.add.image(400, 325, "amareloCase8").setVisible(false);
        this.amareloCase9 = this.add.image(850, 325, "amareloCase9").setVisible(false);
        this.amareloCase10 = this.add.image(400, 325, "amareloCase10").setVisible(false);

        this.vermelhoCase11 = this.add.image(850, 325, "vermelhoCase11").setVisible(false);
        this.vermelhoCase12 = this.add.image(400, 325, "vermelhoCase12").setVisible(false);

        this.tipos = this.add.image(400, 325, "tiposQueimadura").setVisible(false);

        this.livroVerde.on("pointerdown", () => { // Define função que chama o livro verde aberto quando clicar no livro verde fechado
            // Adiciona o evento de clique no livro verde, ao clicar o livro verde é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVerdeAberto.setVisible(true);
            this.paginaAtual = 0;
            this.primeiroGrau1 = this.add.image(400, 325, "primeirograu1").setVisible(true);
            this.primeiroGrau2 = this.add.image(850, 325, "primeirograu2").setVisible(true);
            this.setaDireita = this.add.image(1180, 360, "setaVerde").setScale(0.75).setInteractive().setScrollFactor(0);
            this.setaEsquerda = this.add.image(100, 360, "setaVerde").setScale(0.75).setInteractive().setScrollFactor(0).setVisible(false).setFlip(true, false);

            this.setaDireita.on("pointerdown", () => {
                this.efeitoSonoroVirarPagina.play();
                this.paginaAtual++;

                switch (this.paginaAtual) {

                    case 1:
                        console.log(this.paginaAtual);
                        this.primeiroGrau1.setVisible(false);
                        this.primeiroGrau2.setVisible(false);
                        this.setaEsquerda.setVisible(true);
                        this.tipos.setVisible(true);
                        this.verdeCase1.setVisible(true);
                        break;

                    case 2:
                        console.log(this.paginaAtual);
                        this.tipos.setVisible(false);
                        this.verdeCase1.setVisible(false);
                        this.verdeCase2.setVisible(true);
                        this.verdeCase3.setVisible(true);
                        break;

                    case 3:
                        console.log(this.paginaAtual);
                        this.verdeCase2.setVisible(false);
                        this.verdeCase3.setVisible(false);
                        this.verdeCase4.setVisible(true);
                        this.verdeCase5.setVisible(true);
                        this.setaDireita.setVisible(false);
                }

            });

            this.setaEsquerda.on("pointerdown", () => {
                this.efeitoSonoroVirarPagina.play();
                this.paginaAtual--;

                switch (this.paginaAtual) {
                    case -1:
                        this.primeiroGrau1.setVisible(false);
                        this.primeiroGrau2.setVisible(false);
                        this.setaEsquerda.setVisible(false);
                        this.setaDireita.setVisible(false);
                        this.livroVerde.setVisible(true);
                        this.livroAmarelo.setVisible(true);
                        this.livroVermelho.setVisible(true);
                        this.livroVerdeAberto.setVisible(false);
                        break;
                    case 0:
                        console.log(this.paginaAtual);
                        this.primeiroGrau1.setVisible(true);
                        this.primeiroGrau2.setVisible(true);
                        this.verdeCase1.setVisible(false);
                        this.tipos.setVisible(false);
                        this.setaEsquerda.setVisible(true);
                        this.setaDireita.setVisible(true);
                        break;

                    case 1:

                        this.verdeCase2.setVisible(false);
                        this.verdeCase3.setVisible(false);
                        this.verdeCase1.setVisible(true);
                        this.tipos.setVisible(true)
                        this.setaEsquerda.setVisible(true);
                        console.log(this.paginaAtual);
                        break;

                    case 2:
                        this.verdeCase2.setVisible(true);
                        this.verdeCase3.setVisible(true);
                        this.verdeCase4.setVisible(false);
                        this.verdeCase5.setVisible(false);
                        this.setaDireita.setVisible(true);
                        console.log(this.paginaAtual);
                        break;

                    case 3:
                        this.verdeCase4.setVisible(true);
                        this.verdeCase5.setVisible(true);
                        console.log(this.paginaAtual);
                        this.setaEsquerda.setVisible(true);
                        break;
                }

            })

        });


        this.livroAmarelo.on("pointerdown", () => { // Define função que chama o livro amarelo aberto quando clicar no livro amarelo fechado
            // Adiciona o evento de clique no livro amarelo, ao clicar o livro amarelo é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroAmareloAberto.setVisible(true);
            this.paginaAtual = 0;
            this.segundoGrau1= this.add.image(400, 325, "segundograu1").setVisible(true);
            this.segundoGrau2 = this.add.image(850, 325, "segundograu2").setVisible(true);            
            this.setaDireita = this.add.image(1180, 360, "setaAmarela").setScale(0.75).setInteractive().setScrollFactor(0);
            this.setaEsquerda = this.add.image(100, 360, "setaAmarela").setScale(0.75).setInteractive().setScrollFactor(0).setVisible(false).setFlip(true, false);

            this.setaDireita.on("pointerdown", () => {
                this.efeitoSonoroVirarPagina.play();
                this.paginaAtual++;

                switch (this.paginaAtual) {

                    case 1:
                        console.log(this.paginaAtual);
                        this.segundoGrau1.setVisible(false);
                        this.segundoGrau2.setVisible(false);
                        this.setaEsquerda.setVisible(true);
                        this.tipos.setVisible(true);
                        this.amareloCase6.setVisible(true);
                        break;

                    case 2:
                        console.log(this.paginaAtual);
                        this.tipos.setVisible(false);
                        this.amareloCase6.setVisible(false);
                        this.amareloCase7.setVisible(true);
                        this.amareloCase8.setVisible(true);
                        break;

                    case 3:
                        console.log(this.paginaAtual);
                        this.amareloCase7.setVisible(false);
                        this.amareloCase8.setVisible(false);
                        this.amareloCase9.setVisible(true);
                        this.amareloCase10.setVisible(true);
                        this.setaDireita.setVisible(false);
                        break;
                }

            });

            this.setaEsquerda.on("pointerdown", () => {
                this.efeitoSonoroVirarPagina.play();
                this.paginaAtual--;

                switch (this.paginaAtual) {
                    case -1:
                        this.segundoGrau1.setVisible(false);
                        this.segundoGrau2.setVisible(false);
                        this.setaEsquerda.setVisible(false);
                        this.setaDireita.setVisible(false);
                        this.livroVerde.setVisible(true);
                        this.livroAmarelo.setVisible(true);
                        this.livroVermelho.setVisible(true);
                        this.livroAmareloAberto.setVisible(false);
                        break;
                    case 0:
                        console.log(this.paginaAtual);
                        this.segundoGrau1.setVisible(true);
                        this.segundoGrau2.setVisible(true);
                        this.amareloCase6.setVisible(false);
                        this.tipos.setVisible(false);
                        this.setaEsquerda.setVisible(true);
                        this.setaDireita.setVisible(true);
                        break;

                    case 1:

                        this.amareloCase7.setVisible(false);
                        this.amareloCase8.setVisible(false);
                        this.amareloCase6.setVisible(true);
                        this.tipos.setVisible(true)
                        this.setaEsquerda.setVisible(true);
                        console.log(this.paginaAtual);
                        break;

                    case 2:
                        this.amareloCase7.setVisible(true);
                        this.amareloCase8.setVisible(true);
                        this.amareloCase9.setVisible(false);
                        this.amareloCase10.setVisible(false);
                        this.setaDireita.setVisible(true);
                        console.log(this.paginaAtual);
                        break;

                    case 3:
                        this.amareloCase9.setVisible(true);
                        this.amareloCase10.setVisible(true);
                        console.log(this.paginaAtual);
                        this.setaDireita.setVisible(false);
                        break;
                }

            })
        });

        this.livroVermelho.on("pointerdown", () => { // Define função que chama o livro vermelho aberto quando clicar no livro vermelho fechado
            // Adiciona o evento de clique no livro vermelho, ao clicar o livro vermelho é aberto
            this.efeitoSonoroVirarPagina.play();
            this.livroVerde.setVisible(false);
            this.livroAmarelo.setVisible(false);
            this.livroVermelho.setVisible(false);
            this.livroVermelhoAberto.setVisible(true);
            this.paginaAtual = 0;
            this.terceiroGrau1= this.add.image(400, 325, "terceirograu1").setVisible(true);
            this.terceiroGrau2 = this.add.image(850, 325, "terceirograu2").setVisible(true);            
            this.setaDireita = this.add.image(1180, 360, "setaVermelha").setScale(0.75).setInteractive().setScrollFactor(0);
            this.setaEsquerda = this.add.image(100, 360, "setaVermelha").setScale(0.75).setInteractive().setScrollFactor(0).setVisible(false).setFlip(true, false);

            this.setaDireita.on("pointerdown", () => {
                this.efeitoSonoroVirarPagina.play();
                this.paginaAtual++;

                switch (this.paginaAtual) {
                    
                    case 1:
                        console.log(this.paginaAtual);
                        this.terceiroGrau1.setVisible(false);
                        this.terceiroGrau2.setVisible(false);
                        this.setaEsquerda.setVisible(true);
                        this.tipos.setVisible(true);
                        this.vermelhoCase11.setVisible(true);
                        break;
                    
                    case 2:
                        console.log(this.paginaAtual);
                        this.tipos.setVisible(false);
                        this.vermelhoCase11.setVisible(false);
                        this.vermelhoCase12.setVisible(true);
                        this.setaDireita.setVisible(false);
                        break;
                }

            });

            this.setaEsquerda.on("pointerdown", () => {
                this.efeitoSonoroVirarPagina.play();
                this.paginaAtual--;

                switch (this.paginaAtual) {
                    case -1:
                        this.terceiroGrau1.setVisible(false);
                        this.terceiroGrau2.setVisible(false);
                        this.setaEsquerda.setVisible(false);
                        this.setaDireita.setVisible(false);
                        this.livroVerde.setVisible(true);
                        this.livroAmarelo.setVisible(true);
                        this.livroVermelho.setVisible(true);
                        this.livroVermelhoAberto.setVisible(false);
                        break;
                    case 0:

                        this.terceiroGrau1.setVisible(true);
                        this.terceiroGrau2.setVisible(true);
                        this.vermelhoCase11.setVisible(false);
                        this.tipos.setVisible(false);
                        this.setaEsquerda.setVisible(true);
                        this.setaDireita.setVisible(true);
                        console.log(this.paginaAtual);
                        break;

                    case 1:

                        console.log(this.paginaAtual);
                        this.vermelhoCase11.setVisible(true);
                        this.tipos.setVisible(true);
                        this.vermelhoCase12.setVisible(false);
                        this.setaEsquerda.setVisible(true);
                        this.setaDireita.setVisible(true);

                        break;
                    
                    case 2: 
                    
                        console.log(this.paginaAtual);
                        this.setaDireita.setVisible(false);
                        this.vermelhoCase12.setVisible(false);
                        break;
                }

            })
        });
        
        // Adiciona o botão de fechar a cena e adiciona o evento de clique
        this.botaoFechar = this.add.sprite(1200, 50, "botaoX").setScale(0.5).setInteractive().setScrollFactor(0);
        this.botaoFechar.on("pointerdown", () => {
            // Fecha a cena de livros
            // Inicie a cena principal passando os dados relevantes do estado da cena principal
            this.events.emit("mudaTarefaParaQuiz");
            this.scene.sleep("livros");
            this.scene.restart();
            this.primeiraCena.physics.resume()
        });
    }

}