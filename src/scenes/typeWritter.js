class TypeWritter extends Phaser.GameObjects.BitmapText {
    constructor(scene, x, y, font, text, size, velocidade, onComplete, onStart, align) {
      // Cria um objeto BitmapText com dois argumentos adicionais: velocidade e onComplete
      super(scene, x, y, font, text, size, align); // Chama o construtor da classe pai
      scene.add.existing(this); // Adiciona o objeto ao display list da cena
      this.speed = velocidade; // Define a velocidade de digitação
      this.textOriginal = text; // Armazena o texto original
      this.index = 0; // Inicializa o índice
      this.typedText = ""; // Inicializa o texto digitado
      this.timer = scene.time.addEvent({
        delay: this.speed,
        callback: this.addChar,
        callbackScope: this,
        loop: true
      }); // Cria um evento de tempo para adicionar caracteres
      this.onComplete = onComplete; // Armazena a função onComplete
    }
    
    addChar() {
      if (this.textOriginal[this.index] === undefined) return; // Verifica se o texto acabou
      this.typedText += this.textOriginal[this.index]; // Adiciona um caractere ao texto digitado
      this.setText(this.typedText); // Define o texto do objeto
      this.index++; // Incrementa o índice
      if (this.index === this.textOriginal.length) {
          // Se o índice for igual ao tamanho do texto original, então remove o evento de tempo e chama a função onComplete
          this.timer.remove();
          if (this.onComplete) this.onComplete();
      }
    }
    skip(){
      // Função para pular a digitação
        this.timer.remove();
        this.setText(this.textOriginal);
        if (this.onComplete) this.onComplete();
    }
    destroy() {
      // Função para destruir o objeto, removendo o evento de tempo e chamando o método destroy da classe pai
      this.timer.remove();
      super.destroy();
    }
    proximoTexto(texto, onComplete){
        // Função para adicionar um novo texto ao objeto e reiniciar a digitação
        console.log(texto)
        this.textOriginal = texto;
        this.index = 0;
        this.typedText = "";
        this.timer = this.scene.time.addEvent({
            delay: this.speed,
            callback: this.addChar,
            callbackScope: this,
            loop: true
        });
        this.onComplete = onComplete;
    }
  }