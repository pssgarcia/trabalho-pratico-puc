const apiUrlPerfil = "http://localhost:3000/perfil";
const apiUrlRepositorios = "http://localhost:3000/repositorios";
const apiUrlColegas = "http://localhost:3000/colegas";
const apiUrlCarrossel = "http://localhost:3000/carrossel";

async function lerPerfil() {
  try {
    const response = await fetch(apiUrlPerfil);
    if (!response.ok) {
      throw new Error(
        `Erro ao ler perfil via API JSONServer: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function exibirPerfil() {
  const perfil = await lerPerfil();
  const perfilFigure = document.getElementById("perfil-figure");

  perfilFigure.innerHTML = "";
  perfil.forEach((item) => {
    const htmlContent = `
      <img src="${item.imagem}" alt="perfil-imagem" />
      <figcaption>
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        <aside>
          <h3>Localização: ${item.localizacao}</h3>
          <h4>
          <a href="mailto:${item.email}">Email: ${item.email}</a>
          </h4>
        </aside>
        <ul class="sociais">
          <li>
            <a href="${item.linkSociais?.linkedin || "#"}" target="_blank">
              <i class="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="${item.linkSociais?.github || "#"}" target="_blank">
              <i class="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a href="${item.linkSociais?.instagram || "#"}" target="_blank">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
      </figcaption>
        `;
    perfilFigure.innerHTML += htmlContent;
  });
}

async function lerRepositorios() {
  try {
    const response = await fetch(apiUrlRepositorios);
    if (!response.ok) {
      throw new Error(
        `Erro ao ler repositorios via API JSONServer: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function exibirRepositorios() {
  const repositorios = await lerRepositorios();
  const repositoriosSection = document.getElementById("repositorios");

  repositoriosSection.innerHTML = "";
  repositorios.forEach((repositorio) => {
    const htmlContent = `
      <div class="col">
        <a href="readvice.html">
          <div class="card h-100">
            <img
            src="${repositorio.imagem}"
            class="card-img-top"
            alt="readvice-logo"
            />
            <div class="card-body">
              <h5 class="card-title">
                <a href="https://github.com/pssgarcia/readvice.git">${repositorio.titulo}</a>
              </h5>
              <p class="card-text">
              ${repositorio.descricao}
              </p>
            </div>
          </div>
        </a>
      </div>
    `;
    repositoriosSection.innerHTML += htmlContent;
  });
}

async function lerColegas() {
  try {
    const response = await fetch(apiUrlColegas);
    if (!response.ok) {
      throw new Error(
        `Erro ao ler colegas de trabalho via API JSONServer: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function exibirColegas() {
  const colegas = await lerColegas();
  const colegasSection = document.getElementById("colegas");

  colegasSection.innerHTML = "";
  colegas.forEach((colega) => {
    const htmlContent = `
      <figure>
          <img src="${colega.imagem}" alt="joao-murta" />
          <figcaption>
            <h4>${colega.nome}</h4>
          </figcaption>
        </figure>
    `;
    colegasSection.innerHTML += htmlContent;
  });
}

async function lerCarrossel() {
  try {
    const response = await fetch(apiUrlCarrossel);
    if (!response.ok) {
      throw new Error(
        `Erro ao ler carrossel via API JSONServer: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function exibirCarrossel() {
  const carrosselDados = await lerCarrossel();
  const carrosselInner = document.querySelector(".carousel-inner");

  carrosselInner.innerHTML = "";
  for(let i = 0; i < carrosselDados.length; i++) {
    let carrossel = carrosselDados[i];
    const htmlContent = `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <img
            src="${carrossel.imagem}"
            class="d-block w-100"
            alt="pic-1"
          />
          <div class="carousel-caption d-none d-md-block bg-secondary rounded">
            <h4 class="text-white pt-2"">${carrossel.titulo}</h4>
            <p class="p-2">${carrossel.descricao}</p>
            <a href="${carrossel.url}" class="fs-4 text-warning" target="_blank">Saber mais</a>
          </div>
      </div>
    `;
    carrosselInner.innerHTML += htmlContent;
  }
 
  
}

document.addEventListener("DOMContentLoaded", () => {
  exibirPerfil();
  exibirRepositorios();
  exibirColegas();
  exibirCarrossel();
});