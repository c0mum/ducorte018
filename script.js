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
            destino.scrollIntoView({ behavior: "smooth" });
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

document.getElementById("Agendar").addEventListener("click", function (e) {
    e.preventDefault();

    const nome = document.getElementById("name").value.trim();
    const fone = document.getElementById("phone").value.trim();
    const servico = document.getElementById("service").value;
    const inputData = document.getElementById("date");

    if (!nome || !fone || !servico || !inputData.value) return;

    let dataHora = new Date(inputData.value);
    dataHora.setMinutes(0, 0, 0);

    const dataFinal = dataHora.toISOString().slice(0, 16);

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(dataFinal);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    const dataFormatada = dataHora.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });

    const servicosBonitos = {
        haircut: "Corte de Cabelo",
        beard: "Barba",
        eyebrow: "Sobrancelha",
        combo: "Combo Completo"
    };

    const mensagem =
`Olá Eduardo! Gostaria de agendar um horário.

Nome: ${nome}
Telefone: ${fone}
Serviço: ${servicosBonitos[servico]}
Data e Hora: ${dataFormatada}`;

    const numeroBarbeiro = "5518991451780";
    const link = `https://wa.me/${numeroBarbeiro}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");
});
