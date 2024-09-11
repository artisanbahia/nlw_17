const { select } = require('@inquirer/prompts') // Ou seja, do objeto devolvido a partir do require, eu precisarei do 'select'.

const start = async () => { // Ao usar o await, é preciso utilizar o async.
    while(true){
        const opcao = await select({ // Note que a constante opcao vai receber um value a partir da seleção e que o while seguirá para o switch e se houver o case com o valor idêntico ao da cons opcao, ele executará um determinado bloco.
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },

                {
                    name: "Listar metas",
                    value: "listar"
                },
                
                {
                    name: "Sair",
                    value: "sair"
                },
            ]
        }) // Ou seja, aguarde o usuário selecionar ao invés de continuar com o while.
        
        switch(opcao){
            case "cadastrar":
                console.log("Cadastrar Meta");
                break
            case "listar":
                console.log("Listar Meta");
                break
            case "sair":
                return
        }
    }
}

start();