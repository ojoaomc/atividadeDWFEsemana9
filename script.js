const data = {
  produtos: [
    {
      id: 1,
      nome: "Smartphone Galaxy S23",
      preco: 3899.90,
      categoria: "Celulares",
      imagem: "./img/s23.png",
      descricao: "Smartphone de alta performance com câmera de 50MP e tela 120Hz.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "iPhone 14",
      preco: 4999.00,
      categoria: "Celulares",
      imagem: "./img/iphone14.png",
      descricao: "Design moderno, detecção de acidentes e incrível vida útil da bateria.",
      emEstoque: false
    },
    {
      id: 3,
      nome: "Notebook Nitro 5",
      preco: 4299.99,
      categoria: "Notebooks",
      imagem: "./img/nitro5.png",
      descricao: "Notebook Gamer com processador Intel i5 e placa de vídeo RTX 3050.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "MacBook Air M2",
      preco: 7899.00,
      categoria: "Notebooks",
      imagem: "./img/macbook.png",
      descricao: "Ultrafino com chip M2 da Apple, ideal para produtividade e autonomia.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "Mouse Attack Shark X6",
      preco: 199.90,
      categoria: "Acessórios",
      imagem: "./img/x6.png",
      descricao: "Mouse ergonômico com 16000 DPI e iluminação RGB customizável.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Teclado Mecânico RGB",
      preco: 200.00,
      categoria: "Acessórios",
      imagem: "./img/tDagger.png",
      descricao: "Switches mecânicos Outemu Brown.",
      emEstoque: false
    },
    {
      id: 7,
      nome: "Console PlayStation 5",
      preco: 3799.00,
      categoria: "Games",
      imagem: "./img/ps5.png",
      descricao: "Nova geração de jogos. Modelo via SSD, sem leitor de disco.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "Controle Xbox Wireless",
      preco: 449.00,
      categoria: "Games",
      imagem: "./img/controleXbox.png",
      descricao: "Design aprimorado, pegada texturizada e compatibilidade multiplataforma.",
      emEstoque: true
    }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id);
  card.classList.add("card");
  
  card.style.border = "1px solid #e0e0e0";

  card.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <div>
      <p class="card-category">${produto.categoria}</p>
      <h3 class="card-title">${produto.nome}</h3>
      <p class="card-price">${formatPrice(produto.preco)}</p>
    </div>
    <div class="card-actions">
      <button class="btn-details">Ver detalhes</button>
      <button class="btn-highlight">Destacar</button>
    </div>
  `;

  const btnDetails = card.querySelector(".btn-details");
  const btnHighlight = card.querySelector(".btn-highlight");

  btnDetails.addEventListener("click", () => {
    showProductDetails(produto);
  });

  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach((produto) => {
    const cardElement = createProductCard(produto);
    productList.appendChild(cardElement);
  });

  processAllCards();
}

function renderCategories() {
  const categorias = ["Todas"];
  
  data.produtos.forEach((prod) => {
    if (!categorias.includes(prod.categoria)) {
      categorias.push(prod.categoria);
    }
  });

  categorySelect.innerHTML = "";
  categorias.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  const statusClass = produto.emEstoque ? "in-stock" : "out-of-stock";
  const statusText = produto.emEstoque ? "Em Estoque" : "Fora de Estoque";

  productDetails.innerHTML = `
    <h3>${produto.nome}</h3>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <span class="stock-badge ${statusClass}">${statusText}</span>
    <hr style="margin: 12px 0; border: 0; border-top: 1px solid #eee;">
    <p>${produto.descricao}</p>
  `;
}

function filterProducts() {
  const textValue = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;

  return data.produtos.filter((produto) => {
    const matchesName = produto.nome.toLowerCase().includes(textValue);
    const matchesCategory = selectedCategory === "Todas" || produto.categoria === selectedCategory;
    return matchesName && matchesCategory;
  });
}

function processAllCards() {
  const allCards = document.querySelectorAll(".card");
  console.log(`--- Processando ${allCards.length} cards renderedizados ---`);
  
  allCards.forEach((card) => {
    const cardId = card.getAttribute("data-id");
    console.log(`Card ID: ${cardId}`);
  });
}

searchInput.addEventListener("input", () => {
  const filtered = filterProducts();
  renderProducts(filtered);
});

categorySelect.addEventListener("change", () => {
  const filtered = filterProducts();
  renderProducts(filtered);
});

btnRender.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "Todas";
  renderProducts(data.produtos);
});

renderCategories();
renderProducts(data.produtos);