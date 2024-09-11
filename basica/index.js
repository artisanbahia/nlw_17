const { select, input, checkbox } = require('@inquirer/prompts') // Ou seja, do objeto devolvido a partir do require, eu precisarei do 'select'.

//----------------------------------------------------------------------------------------------------------------------------

let metas = [];

// ---------------------------------------------------------------------------------------------------------------------------

const cadastrarMeta  = async () => {
    const meta = await input(
        { message: "Digite a meta:" }
    )

    if(meta.length == 0){
        console.log("A meta não pode ser vazia") // Perceba que se o usuário não digitou nada no input, o tamanho da const meta será zero e isso, lá no switch, não satisfaz a condição para sair e, portanto, a função start volta para o while e dá nova oportunidade do usuário tentar novamente.
        return // Permitirá sair da função e continuar executando a função start
    }

    metas.push(
        {
            value: meta,
            checked: false
        }
    ) // Caso o usuário tenha digitado algo, inserimos a meta dentro da listagem de metas com o atributo checked sendo false, sinalizando que a meta ainda não foi cumprida
}

//-----------------------------------------------------------------------------------------------------------------------------

const listarMetas = async () => {
    const respostas = await checkbox(
        {
            message: "Use as setas para mudar de meta, o espaço para marcar e desmarcar e o enter para finalizar esta etapa",
            choices: [...metas] // Aqui há um espalhamento "...", a criação de uma espécie de cópia do conteúdo do array de metas, visando que alterações realizadas não se consolidem imediatamente, mas sim, após satisfazerem as condições necessárias.
        }
    )

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada");
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true;
    })

}

//-----------------------------------------------------------------------------------------------------------------------------

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
                await cadastrarMeta(); // Porque também precisa aguardar
                // console.log(metas)
                break
            case "listar":
                await listarMetas();
                break
            case "sair":
                return
        }
    }
}

start();