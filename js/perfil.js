const apiUrl = "http://localhost:3000/perfil";

async function lerPerfil(processaDados) {
  try {
    const response = await fetch(apiUrl);
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

function exibirPerfil(perfil) {
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

async function iniciar() {
  const perfil = await lerPerfil();
  if (perfil) {
    exibirPerfil(perfil);
  }
}

document.addEventListener("DOMContentLoaded", iniciar);
