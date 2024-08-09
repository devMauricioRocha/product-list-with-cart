
let cart = []
const carrinho = document.querySelector("#carrinho")
const divProdutosUl = document.querySelector("#produtos")
const btnConfirm = document.querySelector("#btn-confirm")
const semProdutos = document.querySelector("#sem-produtos")
const cartProdutos = document.querySelector("#cart-produtos")
const btnConfirmOrder = document.querySelector("#btn-confirm-order")
const fundoCard = document.querySelector("#fundo-card")
const btnFecharCard = document.querySelector("#fecharCard")

async function produtosApi() {
    const response = await fetch("../data.json")
    const data = await response.json()
    return data
}

const atualizarDisplay = () => {
    if (cart.length > 0) {
        cartProdutos.classList.remove("hidden")
        semProdutos.classList.add("hidden")
    } else {
        cartProdutos.classList.add("hidden")
        semProdutos.classList.remove("hidden")
    }

    criarItemNoCarrinho()
    valorTotal()
}

const produto = (produtos, nomeImagem) => {
    divProdutosUl.innerHTML = ""
    produtos.forEach((produto, index) => {
        const elementoLi = document.createElement("li")
        elementoLi.classList.add("produto")
        elementoLi.setAttribute("data-id_produto", `${index + 1}`)
        elementoLi.innerHTML = `
            <div class=" w-full relative">
                ${nomeImagem === "tablet" 
                ?`<img src="${produto.image.tablet}" alt="${produto.name}" class="w-full rounded-lg">`
                : nomeImagem === "mobile"
                ?`<img src="${produto.image.mobile}" alt="${produto.name}" class="w-full rounded-lg">`
                :`<img src="${produto.image.desktop}" alt="${produto.name}" class="w-full rounded-lg"></img>`
                }
                <button
                    class="add-cart bg-rose-50 absolute top-[94%] left-[50%] translate-x-[-50%] py-2 w-[80%] justify-center gap-2 rounded-full whitespace-nowrap text-xs font-bold mx-auto flex items-center border hover:text-rose-400 hover:border-rose-400">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="">
                    Add To Cart
                </button>

                <div
                    class="hidden bg-red py-2 px-4 rounded-full absolute top-[94%] left-[50%] translate-x-[-50%] flex justify-between items-center w-[80%]">
                    <button class="decrement w-4 h-4 rounded-full border border-rose-50 flex justify-center items-center">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="">
                    </button>
                    <p class="quantidade text-rose-50">1</p>

                    <button class="increment w-4 h-4 rounded-full border border-rose-50 flex justify-center items-center">
                    <img src="./assets/images/icon-increment-quantity.svg" alt="">
                    </button>
                </div>
            </div>

            <div class="mt-10">
                <h4 class="text-rose-500 text-xs">${produto.category}</h4>
                <h2 class="font-semi_bold text-rose-900 text-base">${produto.name}</h2>
                <p class="text-rose-400 font-semi_bold">$ <span class="preco">${produto.price.toFixed(2)}</span></p>
            </div>
        `
        divProdutosUl.appendChild(elementoLi)

        const btnAdd_cart = elementoLi.querySelector(".add-cart")
        const id = elementoLi.dataset.id_produto
        let quantidade = elementoLi.querySelector(".quantidade")
        let totalPreco = produto.price * Number(quantidade.innerText)
        let infoProduto = null;
        
        btnAdd_cart.addEventListener("click", () => {
            btnAdd_cart.classList.add("hidden")
            btnAdd_cart.nextElementSibling.classList.remove("hidden")

            infoProduto = {
                id: id,
                nome: produto.category,
                subNome: produto.name,
                preco: produto.price,
                quantidade: Number(quantidade.innerText),
                totalPreco: totalPreco,
                thumbnail: produto.image.thumbnail
            }
            cart.push(infoProduto)
            atualizarDisplay()
        })

        const decrement = elementoLi.querySelector(".decrement")
        const increment = elementoLi.querySelector(".increment")

        decrement.addEventListener("click", () => {
            const atualQuantidade = Number(quantidade.innerText)

            if (atualQuantidade > 1) {
                quantidade.innerText = atualQuantidade - 1
                infoProduto.quantidade = Number(quantidade.innerText)
                infoProduto.totalPreco = infoProduto.preco * infoProduto.quantidade
            } else {
                btnAdd_cart.classList.remove("hidden")
                btnAdd_cart.nextElementSibling.classList.add("hidden")
                // Remover o produto do carrinho
                cart.splice(cart.indexOf(infoProduto), 1)
            }

            atualizarDisplay()
        })

        increment.addEventListener("click", () => {
            const atualQuantidade = Number(quantidade.innerText)
            quantidade.innerText = atualQuantidade + 1
            infoProduto.quantidade = Number(quantidade.innerText)
            infoProduto.totalPreco = infoProduto.preco * infoProduto.quantidade
            atualizarDisplay()
        })
    })
}

const criarProtudos = async () => { //Função para buscar os produtos da api. 
    //Verificar o tamanho da largura da tela atual do cliente. E com base na largura cria os produto com a imagem para cada tipo de largura.
    const produtos = await produtosApi()
    let nomeImagem
    let mudarResize = false
    window.addEventListener("resize", (e) => {
        const larguraAtual = e.target.innerWidth
        if (larguraAtual <= 1024 && larguraAtual > 768 && mudarResize === false) {
            nomeImagem = "tablet"
            mudarResize = true
            produto(produtos, nomeImagem)
        }else if(larguraAtual < 768 && mudarResize === true){
            nomeImagem = "mobile"
            produto(produtos, nomeImagem)
            mudarResize = false

        }else if(larguraAtual > 1024 && mudarResize === true){
            nomeImagem = "desktop"
            produto(produtos, nomeImagem)
            mudarResize = false
        }
    })
    produto(produtos, nomeImagem)
}

const criarItemNoCarrinho = () => { //Cria o item no carrinho toda vez que o usuario adiciona
    const listaProdutosPedidos = document.querySelector("#lista-pedidos")
    document.querySelector("#totalItem").innerText = `(${cart.length})`
    carrinho.innerHTML = ""
    listaProdutosPedidos.innerHTML = ""

    cart.forEach((produto) => {
        const itemCart = document.createElement("li")
        itemCart.classList.add("relative", "py-4", "border-b", "border-b-rose-300")
        itemCart.innerHTML = `
                <strong class="text-xs text-rose-900 font-semi_bold">${produto.subNome}</strong>
                <p class="text-rose-500 relative">
                <span class="pr-2">${produto.quantidade}x</span>
                @ $${produto.preco.toFixed(2)} <span class="font-semi_bold">$${produto.totalPreco.toFixed(2)}</span>
                </p>
                <button class="remove cursor-pointer absolute right-0 top-2/4 p-[2px] translate-y-[-50%] rounded-full border border-rose-400 w-4 h-4 "><img class="w-full h-full" src="./assets/images/icon-remove-item.svg" alt=""></button>
        `

        const btnRemove = itemCart.querySelector(".remove")
        btnRemove.addEventListener("click", () => {
            cart = cart.filter(item => item.id !== produto.id) //Exclui o elemento da lista
            const trocarBotao = document.querySelector(`[data-id_produto="${produto.id}"]`)// Pesquisa o produto pelo id data-id e depois pesquisa os botão para remover o .hidden
            trocarBotao.querySelector(".add-cart").classList.remove("hidden")// Botao de adicionar ao carrinho
            trocarBotao.querySelector(".quantidade ").innerText = 1 // Reseta a quantidade para 1 do botão de incrementar
            trocarBotao.querySelector(".add-cart").nextElementSibling.classList.add("hidden") // Vai para o proximo elemento e nesse elemento contem o botão de incrementar
            atualizarDisplay() //Chama a função para atualizar a pagina e assim atualiza as informações
        })

        const produtoPedido = `
            <div class="flex justify-between gap-2 items-center border-b border-b-rose-300 pb-4 last:mb-0 mb-4">
                <div class="flex gap-4 overflow-hidden">
                    <img src="${produto.thumbnail}" alt="" class="rounded-md w-[50px] h-[50px]">
                    
                    <div class="flex flex-col justify-center overflow-hidden">
                        <strong class="text-sm text-rose-900 truncate">${produto.subNome}</strong>
                        <p class="text-rose-400 ">
                        <span class="pr-4 text-rose-500">${produto.quantidade}x</span>
                        @ $${produto.preco.toFixed(2)}
                        </p>
                    </div>
                </div>
                <p class="font-bold text-rose-400">$${produto.totalPreco.toFixed(2)}</p>
            </div>
        `
        carrinho.appendChild(itemCart)
        listaProdutosPedidos.innerHTML += produtoPedido
    })
}

btnConfirm.addEventListener("click", () => { //Abre o modal Card com os item pedido do carrinho
    fundoCard.classList.remove("close")
})

fundoCard.addEventListener("click", (e) => { //Fechar o Card quando clicar fora do card
    if (e.target === fundoCard) {
        fundoCard.classList.add("close")
        fundoCard.removeEventListener("click")
    } else if (e.target === btnFecharCard) {
        fundoCard.classList.add("close")
        fundoCard.removeEventListener("click")
        btnConfirmOrder.removeEventListener("click")
    }
})

const resetarDisplay = () => {
    cart = []
    const btnAddCart = document.querySelectorAll(".add-cart")
    btnAddCart.forEach(btn => {
        btn.classList.remove("hidden")
        btn.nextElementSibling.classList.add("hidden")
    })
    atualizarDisplay()
}

btnConfirmOrder.addEventListener("click", () => { // Confirmação da compra
    fundoCard.classList.add("close")
    resetarDisplay()
    setTimeout(() => {
        alert(`Parabens Compra Realizada!!`)
    }, 50)

})

function valorTotal() { // atualiza o valor total do carrinho
    const valorTotal = cart.reduce((sum, produto) => sum + produto.totalPreco, 0)
    document.querySelector("#totalCarrinho").innerText = "$" + valorTotal.toFixed(2)
    document.querySelector("#totalCard").innerText = "$" + valorTotal.toFixed(2)
}

criarProtudos() //Cria o produto pela primeira vez