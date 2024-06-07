class NPCsAlunos {
  constructor(aluno, scene, keySprite) {
    this.aluno = aluno; // Recebe o aluno no construtor
    this.aluno.direction = 0; // Recebe a direção inicial
    this.aluno.speed = 0; // Recebe a velocidade inicial
    this.scene = scene; // Recebe a cena para setar as fisicas
    this.keySprite = keySprite; // Recebe a key do sprite para setar a animação
    this.scene.anims.create({
      // Cria a animação de andar de cada npc
      key: `${this.keySprite}Walk`,
      frames: this.scene.anims.generateFrameNumbers(this.keySprite, {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    })
  }
  
  update(){
    this.scene.physics.velocityFromAngle(this.aluno.direction, this.aluno.speed, this.aluno.body.velocity);
    // Alterar a direção e a velocidade em intervalos aleatórios
    if (Phaser.Math.Between(0, 100) > 95) {
      // Altera a direção e a velocidade com numeros aleatórios
      this.aluno.direction = Phaser.Math.Between(0, 360);
      this.aluno.speed = Phaser.Math.Between(80, 120);
    }
    this.updateAnimation();
  }
  updateAnimation(){
    // Atualiza a animação do aluno
    if (this.aluno.body.velocity.x > 0) {
      // Adiciona a animação de andar para a direita
      this.aluno.anims.play(`${this.keySprite}Walk`, true);
      this.aluno.flipX = false;
    }
    else if (this.aluno.body.velocity.x < 0) {
      // Adiciona a animação de andar para a esquerda
      this.aluno.anims.play(`${this.keySprite}Walk`, true)
      this.aluno.flipX = true;
    }
  }
  setCollisionBetweenItens(...phaserPhysics){
    // Adiciona a colisão entre o aluno e os itens passados como argumento desse método. Esse metodo aceita um número variável de argumentos e foi feito para evitar a repetição de código
    for (let i = 0; i < phaserPhysics.length; i++) this.scene.physics.add.collider(this.aluno, phaserPhysics[i])
  }
}