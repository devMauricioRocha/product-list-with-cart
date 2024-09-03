![Logo do projeto](./preview.jpg)
<div align="center">
    <a href="https://confeitaria-charmosa.vercel.app/" target="_blank">Visualizar o projeto</a>
</div>

# Desafio Frontend Mentor - Lista de Produtos com Carrinho de Compras

Este projeto foi desenvolvido para o desafio do Frontend Mentor, onde o objetivo é construir uma lista de produtos com um carrinho de compras funcional, seguindo o design fornecido o mais próximo possível. Os dados dos produtos são carregados a partir de um arquivo JSON local.

## Funcionalidades

- Adicionar itens ao carrinho e removê-los.
- Aumentar ou diminuir a quantidade de itens no carrinho.
- Visualizar um modal de confirmação de pedido ao clicar em "Confirmar Pedido".
- Reiniciar a seleção de produtos ao clicar em "Iniciar Novo Pedido".
- Visualizar o layout ideal para a interface dependendo do tamanho da tela do dispositivo.
- Ver estados de hover e foco para todos os elementos interativos na página.

## Tecnologias Utilizadas

- HTML
- Tailwind CSS
- JavaScript

## Estrutura do Projeto

- `index.html` - Página principal da aplicação.
- `styles.css` - Arquivo CSS gerado pelo Tailwind CSS.
- `script.js` - Lógica da aplicação.
- `data.json` - Arquivo JSON contendo a lista de produtos.

## Instalação e Execução

### 1. Clonar o Repositório

   ```bash
   git clone https://github.com/devMauricioRocha/product-list-with-cart.git
   cd product-list-with-cart
   ```

### 2. Instalar Dependências

   Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Em seguida, instale o Tailwind CSS e suas dependências:

   ```bash
   npm install
   ```

### 3. Instalar o Tailwind CSS

   Se ainda não tiver o Tailwind CSS configurado, siga estes passos:

   - **Instale o Tailwind CSS e suas dependências:**

     ```bash
     npm install tailwindcss
     ```

### 4. Construir o CSS

   Execute o script para gerar o CSS:

   ```bash
   npm run build:css
   ```

### 5. Abrir a Aplicação

   Simplesmente abra o arquivo `index.html` em seu navegador.

## Como Funciona

1. **Carregamento dos Produtos**

   O script JavaScript carrega o arquivo `data.json` e exibe os produtos na página.

2. **Adicionar ao Carrinho**

   Cada produto na lista possui um botão "Adicionar ao Carrinho". Ao clicar, o produto é adicionado ao carrinho.

3. **Gerenciar Itens no Carrinho**

   É possível aumentar ou diminuir a quantidade de cada item no carrinho e removê-los quando necessário.

4. **Confirmação do Pedido**

   Ao clicar em "Confirmar Pedido", um modal de confirmação será exibido.

5. **Iniciar Novo Pedido**

   O botão "Iniciar Novo Pedido" reinicia a seleção de produtos e o estado do carrinho.

6. **Layout Responsivo**

   O layout da aplicação é otimizado para diferentes tamanhos de tela.

7. **Estados de Hover e Foco**

   Todos os elementos interativos possuem estados de hover e foco visíveis.

## Contribuindo

Sinta-se à vontade para contribuir com melhorias ou correções. Faça um fork do repositório, crie uma branch para suas mudanças e envie um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
