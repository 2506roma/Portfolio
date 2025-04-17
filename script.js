
//animação sidebar
document.querySelectorAll("#Close-menu").forEach(function(element) {
    element.addEventListener("click", () =>{
        document.querySelector(".container").classList.toggle("show-menu")
    })
})

// Saiba mais 
document.getElementById("button-banner").addEventListener("click", function () {
    window.location.href = "sobre.html";
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


