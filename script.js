
//animação sidebar

document.querySelectorAll("#Close-menu").forEach(function(element) {
    element.addEventListener("click", () =>{
        document.querySelector(".container").classList.toggle("show-menu")
    })
})

// Saiba mais 

document.getElementById("button-banner").addEventListener("click", function () {
  const target = document.querySelector(".secao-habilidades");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
});




//debounce

function debounce(func, wait, immediate) {
	let timeout
	return function(...args) {
		const context = this
		const later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		const callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}



// animação scrool =============================
const target = document.querySelectorAll("[data-anime]")

const animationClass = "animate"

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4)
    target.forEach(function(element) {
        if((windowTop) > element.offsetTop){
            element.classList.add(animationClass)
        } else {
            element.classList.remove(animationClass)
        }
        
    })
}

if(target.length) {
    window.addEventListener('scroll', debounce(function() {
        animeScroll()
    },10))
}



const skills = [
    "RPA",
    "IA",
    "Previsões",
    "Automação",
    "Sites",
  ];
  
  let currentIndex = 0;
  let charIndex = 0;
  const skillsElement = document.getElementById("skills");
  
  function typeEffect() {
    const currentSkill = skills[currentIndex];
    skillsElement.textContent = currentSkill.substring(0, charIndex);
    charIndex++;
  
    if (charIndex <= currentSkill.length) {
      setTimeout(typeEffect, 100); // velocidade da digitação
    } else {
      setTimeout(eraseEffect, 1500); // espera antes de apagar
    }
  }
  
  function eraseEffect() {
    const currentSkill = skills[currentIndex];
    skillsElement.textContent = currentSkill.substring(0, charIndex);
    charIndex--;
  
    if (charIndex >= 0) {
      setTimeout(eraseEffect, 50); // velocidade para apagar
    } else {
      currentIndex = (currentIndex + 1) % skills.length;
      setTimeout(typeEffect, 500); // espera antes de escrever o próximo
    }
  }
  
  typeEffect(); // inicia animação

// ============= ORÇAMENTO =============================

// ========== Limita até 3 checkboxes ==========
const checkboxes = document.querySelectorAll('input[type="checkbox"][data-group="orcamento"]');

checkboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    const checked = Array.from(checkboxes).filter(c => c.checked);
    if (checked.length > 3) {
      cb.checked = false;
      alert('Você só pode selecionar até 3 tipos de serviços.');
    }
    calcularOrcamento();
  });
});

// ========== Calcula orçamento e atualiza visual ==========
const layoutSim = document.querySelector('#layout-sim');
const prazoInput = document.querySelector('#prazo');
const precoOutput = document.querySelector('#preco');
const descricaoInput = document.querySelector('#descricao');
const prazoTexto = document.querySelector('#prazo-texto');

function calcularOrcamento() {
  const selecionados = Array.from(checkboxes).filter(c => c.checked);
  const incluiInterface = layoutSim.checked;
  const prazo = parseInt(prazoInput.value);

  let valor = selecionados.length > 0 ? 1875 : 0;
  if (incluiInterface) valor += 486;
  const total = valor * prazo;

  // Atualiza o texto do preço
  precoOutput.innerHTML = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  prazoTexto.textContent = `${prazo} semana(s)`;
}

// Eventos que disparam o cálculo
layoutSim.addEventListener('change', calcularOrcamento);
document.querySelector('#layout-nao').addEventListener('change', calcularOrcamento);
prazoInput.addEventListener('input', calcularOrcamento);

// ========== Enviar para WhatsApp ==========
document.querySelector('#envio-form-orc').addEventListener('click', function (e) {
  e.preventDefault();

  const selecionados = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.nextElementSibling.textContent.trim())
    .join(', ');

  const descricao = descricaoInput.value.trim();
  const prazo = prazoInput.value;
  const incluiInterface = layoutSim.checked ? 'Sim' : 'Não';
  const preco = precoOutput.textContent.trim();

  const mensagem = `
Olá! Quero solicitar um orçamento com as seguintes informações:

Serviços: ${selecionados || 'Nenhum selecionado'}
Interface: ${incluiInterface}
Prazo: ${prazo} semana(s)
Detalhes: ${descricao || 'Não informado'}
Valor estimado: ${preco}
  `.trim();

  const encoded = encodeURIComponent(mensagem);
  const telefone = '5511983352507'; // seu número com DDI (55) + DDD (11)
  const url = `https://wa.me/${telefone}?text=${encoded}`;

  window.open(url, '_blank');
});


// ========== Enviar para E-mail ==========

function enviarEmail() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensage').value.trim();

  if (!nome || !email || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const destinatario = "romacodpro@gmail.com";
  const assunto = `Mensagem de contato de ${nome}`;
  const corpo = `Nome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`;

  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${destinatario}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

  window.open(url, '_blank'); // Abre o Gmail em nova aba
}


// Limites
const limiteCaracteres = 1000;

// ===== CONTADOR CAMPO "mensage" (contato) =====
const mensagemInput = document.getElementById("mensage");
const contadorMensagem = document.getElementById("contador-mensagem");

if (mensagemInput && contadorMensagem) {
  mensagemInput.addEventListener("input", () => {
    const total = mensagemInput.value.length;
    contadorMensagem.textContent = `${total} / ${limiteCaracteres}`;
  
    if (total > limiteCaracteres) {
      mensagemInput.value = mensagemInput.value.substring(0, limiteCaracteres);
      contadorMensagem.textContent = `${limiteCaracteres} / ${limiteCaracteres}`;
    }
  });
}

// ===== CONTADOR CAMPO "descricao" (orçamento) =====
const contadorDescricao = document.getElementById("contador-descricao");

if (descricaoInput && contadorDescricao) {
  descricaoInput.addEventListener("input", () => {
    const total = descricaoInput.value.length;
    contadorDescricao.textContent = `${total} / ${limiteCaracteres}`;
  
    if (total > limiteCaracteres) {
      descricaoInput.value = descricaoInput.value.substring(0, limiteCaracteres);
      contadorDescricao.textContent = `${limiteCaracteres} / ${limiteCaracteres}`;
    }
  });
}



// ===== Clean Pag =====

document.querySelectorAll('.ButtonCustom').forEach(botao => {
  botao.addEventListener('click', function () {
    const formulario = this.closest('form');
    if (!formulario) return;

    // Delay para aguardar envio ou redirecionamento (caso tenha)
    setTimeout(() => {
      formulario.reset(); // Limpa todos os campos

      // Zera contadores, se existirem
      const contadores = formulario.querySelectorAll('#contador-mensagem, .contador-caracteres');
      contadores.forEach(contador => {
        contador.textContent = "0 / 1000";
      });
    }, 300); // tempo suficiente para execução de funções como enviarEmail
  });
});


// ========= Tema Claro ou Escuro ==========
let flag = 0;

function roll() {
  const toggle = document.getElementById("toggle");
  const bod = document.getElementById("bod");

  if (flag === 0) {
    toggle.style.animation = "roll 1.5s forwards";
    bod.classList.add("dark-mode");
    console.log("🌙 MODO ESCURO ATIVADO");

    toggled(); // 🌙 Lua (modo escuro)
    localStorage.setItem("tema", "escuro");
    flag = 1;
  } else {
    toggle.style.animation = "rollback 1.5s forwards";
    bod.classList.remove("dark-mode");
    console.log("☀️ MODO CLARO ATIVADO");

    togglel(); // ☀️ Sol (modo claro)
    localStorage.setItem("tema", "claro");
    flag = 0;
  }
}

// 🌙 Estilo de LUA crescente (modo escuro)
function toggled() {
  const toggle = document.getElementById("toggle");

  toggle.style.backgroundColor = "#1a1a1a"; // corpo escuro da lua
  toggle.style.boxShadow = "0px 0px 0px -5px #E18645 inset, 4px 1px 15px #E18645";
  toggle.style.border = "none";
  border.style.backgroundColor = "rgb(23, 23, 23)";
  border.style.boxShadow = "2px 2px 5px rgb(23, 23, 23) inset, -2px -4px 6px rgb(25, 25, 25) inset";

  container.style.boxShadow = "6px 6px 10px rgba(16,16,16,0.667), -2px -3px 8px rgba(32,32,32,0.453), -3px -3px 10px rgb(17,17,17) inset, 8px 8px 30px rgb(26,26,26) inset";


}


// ☀️ Estilo de SOL (modo claro)
function togglel() {
  const toggle = document.getElementById("toggle");
  toggle.style.backgroundColor = "yellow";
  toggle.style.boxShadow = "0 0 20px 10px yellow, inset 0 0 0px white";
  toggle.style.border = "1px solid white";
  border.style.backgroundColor = "#fff";
  border.style.boxShadow = "none"; // ✅ remove sombra escura
  container.style.boxShadow = "0 0 20px 5px none, inset 0 0 10px #ffffff";


}

// ✅ Aplica tema salvo ao carregar a página
window.onload = function () {
  const saved = localStorage.getItem("tema");
  const toggle = document.getElementById("toggle");
  const bod = document.getElementById("bod");

  if (saved === "escuro") {
    bod.classList.add("dark-mode");
    flag = 1;
    toggle.style.animation = "roll 0s forwards";
    toggled(); // Ativa visual de LUA 🌙
  } else {
    flag = 0;
    toggle.style.animation = "rollback 0s forwards";
    togglel(); // Ativa visual de SOL ☀️
  }
};
