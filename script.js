AOS.init({
    duration: 900,
    easing: "ease-out-quart",
    once: true
});


document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        nav.classList.add("nav-scroll");
    } else {
        nav.classList.remove("nav-scroll");
    }
});
 

document.getElementById("Agendar").addEventListener("click", function(e) {
    e.preventDefault();

    const nome = document.getElementById("name").value.trim();
    const fone = document.getElementById("phone").value.trim();
    const servico = document.getElementById("service").value;
    const dataHora = document.getElementById("date").value;

    if (!nome || !fone || !servico || !dataHora) {
        alert("Preencha tudo, campeão. Nem o Batman trabalha com falta de dados");
        return;
    }

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

    if (agendamentos.includes(dataHora)) {
        alert("Esse horário já foi reservado! Escolha outro, meu chapa. 💈");
        return;
    }


    agendamentos.push(dataHora);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    const dataFormatada = new Date(dataHora).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });

    const servicosBonitos = {
        "haircut": "Corte de Cabelo",
        "beard": "Barba",
        "eyebrow": "Sobrancelha",
        "combo": "Combo (Cabelo + Barba + Sobrancelha)"
    };

    const mensagem = 
`Olá Eduardo! Gostaria de agendar um horário.

Nome: ${nome}
Telefone: ${fone}
Serviço: ${servicosBonitos[servico]}
Data e Hora: ${dataFormatada}

Pode confirmar?`;

    const numeroBarbeiro = "5518991451780"; // Troque aqui!

    const link = `https://wa.me/${numeroBarbeiro}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");
});


window.addEventListener("DOMContentLoaded", () => {
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    
    document.getElementById("date").addEventListener("change", function() {
        const valor = this.value;

        if (agendamentos.includes(valor)) {
            alert("Esse horário já está reservado! Escolha outro, meu consagrado.");
            this.value = ""; 
        }
    });
});

(function() {
    const agora = Date.now();
    const ultimoReset = localStorage.getItem("ultimoReset") 
        ? Number(localStorage.getItem("ultimoReset"))
        : 0;

    const dozeHoras = 12 * 60 * 60 * 1000;

    if (agora - ultimoReset >= dozeHoras) {
        console.log("Limpando agendamentos (12h já passaram).");
        localStorage.removeItem("agendamentos");
        localStorage.setItem("ultimoReset", agora);
    }
})();


const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });


function mostrarAvisoReset() {
    const aviso = document.createElement("div");
    aviso.innerText = "🔄 Horários resetados automaticamente (12h já passaram).";
    aviso.style.position = "fixed";
    aviso.style.top = "20px";
    aviso.style.right = "20px";
    aviso.style.padding = "15px 20px";
    aviso.style.background = "#e7b563";
    aviso.style.color = "#000";
    aviso.style.fontSize = "16px";
    aviso.style.fontWeight = "bold";
    aviso.style.borderRadius = "10px";
    aviso.style.boxShadow = "0 0 10px rgba(0,0,0,0.4)";
    aviso.style.zIndex = "9999";
    aviso.style.opacity = "0";
    aviso.style.transition = "opacity .4s ease";

    document.body.appendChild(aviso);

    setTimeout(() => {
        aviso.style.opacity = "1";
    }, 100);

    setTimeout(() => {
        aviso.style.opacity = "0";
        setTimeout(() => aviso.remove(), 400);
    }, 4000);
}
