class StateMachine {
    constructor(initialState) {
        // Inicializa a máquina de estados com um estado inicial
        this.state = initialState;
    }
    
    transitionTo(state) {
        // Função para transicionar entre estados
        if (this.state === state) {
            return;
        }
        this.state = state;
    }
    currentState() {
        // Retorna o estado atual
        return this.state;
    }
}