import { useState, useEffect, useRef } from "react";
import "./App.css";
import Agenda from "./Agenda";

function App() {
  const [conteudoAberto, setConteudoAberto] = useState(null);
  const [mostrarEntrada, setMostrarEntrada] = useState(true);

  const lessonRef = useRef(null);

  useEffect(() => {
    if (conteudoAberto && lessonRef.current) {
      setTimeout(() => {
        lessonRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [conteudoAberto]);

  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const perguntasSimulado = [
    {
      pergunta:
        "Qual é a velocidade máxima permitida em vias arteriais onde não existe sinalização?",
      opcoes: ["40 km/h", "60 km/h", "80 km/h", "30 km/h"],
      respostaCerta: 1,
    },
    {
      pergunta:
        "A placa de regulamentação 'Pare' (R-1) tem qual formato geométrico?",
      opcoes: ["Triangular", "Circular", "Octogonal", "Quadrado"],
      respostaCerta: 2,
    },
    {
      pergunta:
        "Qual a distância mínima de segurança que deve ser mantida ao ultrapassar uma bicicleta?",
      opcoes: ["1,0 metro", "1,5 metro", "2,0 metros", "0,5 metro"],
      respostaCerta: 1,
    },
  ];

  const responderPergunta = (indexOpcao) => {
    if (
      indexOpcao ===
      perguntasSimulado[perguntaAtual].respostaCerta
    ) {
      setPontuacao(
        (pontuacaoAtual) => pontuacaoAtual + 1
      );
    }

    const proximaPergunta = perguntaAtual + 1;

    if (proximaPergunta < perguntasSimulado.length) {
      setPerguntaAtual(proximaPergunta);
    } else {
      setMostrarResultado(true);
    }
  };

  const fecharEReiniciarSimulado = () => {
    setConteudoAberto(null);
    setPerguntaAtual(0);
    setPontuacao(0);
    setMostrarResultado(false);
  };

  // WHATSAPP PRINCIPAL
  const abrirWhatsApp = (mensagem = "") => {
    const numero = "5511988988859";

    const url = mensagem
      ? `https://wa.me/${numero}?text=${encodeURIComponent(
          mensagem
        )}`
      : `https://wa.me/${numero}`;

    window.open(url, "_blank");
  };

  const planos = [
    {
      aulas: "2 AULAS",
      valor: "R$ 500,00",
    },
    {
      aulas: "6 AULAS",
      valor: "R$ 800,00",
    },
    {
      aulas: "10 AULAS",
      valor: "R$ 1.100,00",
    },
    {
      aulas: "15 AULAS",
      valor: "R$ 1.300,00",
    },
    {
      aulas: "20 AULAS",
      valor: "R$ 1.600,00",
    },
  ];

  return (
    <div className="site">

      {/* =========================
          TELA DE ENTRADA
      ========================== */}

      {mostrarEntrada && (
        <div className="welcome-overlay">

          <div className="welcome-card">

            <div className="welcome-icon">
              🚗
            </div>

            <span className="welcome-small">
              INSTRUTORES DE TRÂNSITO
            </span>

            <h1>COUTINHO HABILITA</h1>

            <div className="welcome-line"></div>

            <h2>Vanderlei & Queila</h2>

            <p>
              Sua habilitação, nosso compromisso.
            </p>

            <p className="welcome-description">
              Aprenda a dirigir com segurança, confiança e
              acompanhamento personalizado.
            </p>

            <div className="welcome-buttons">

              <button
                className="welcome-primary"
                onClick={() =>
                  setMostrarEntrada(false)
                }
              >
                CONHECER O SITE
              </button>

              <button
                className="welcome-secondary"
                onClick={() => {
                  setMostrarEntrada(false);

                  setTimeout(() => {
                    document
                      .getElementById("agenda")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }, 100);
                }}
              >
                SOLICITAR ATENDIMENTO
              </button>

            </div>

            <div className="welcome-info">

              <span>
                ✓ Credenciados pelo DETRAN SP
              </span>

              <span>
                ✓ +500 alunos aprovados
              </span>

              <span>
                ✓ 1ª habilitação e habilitados
              </span>

            </div>

          </div>

        </div>
      )}

      {/* =========================
          HEADER
      ========================== */}

      <header className="header">

        <div className="logo">
          COUTINHO <span>HABILITA</span>
        </div>

        <nav>

          <a href="#inicio">
            Início
          </a>

          <a href="#instrutores">
            Instrutores
          </a>

          <a href="#planos">
            Planos
          </a>

          <a href="#conteudos">
            Conteúdos
          </a>

          <a href="#agenda">
            Atendimento
          </a>

          <a href="#contato">
            Contato
          </a>

        </nav>

      </header>

      <main>

        {/* =========================
            HERO
        ========================== */}

        <section
          id="inicio"
          className="hero"
        >

          <img
            src="/banner-coutinho.jpeg"
            alt="Coutinho Habilita - Instrutores de Trânsito"
          />

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <span>
              INSTRUTORES DE TRÂNSITO
            </span>

            <h1>
              COUTINHO HABILITA
            </h1>

            <p>
              Vanderlei & Queila
            </p>

            <div className="hero-buttons">

              <a
                href="#agenda"
                className="button primary"
              >
                SOLICITAR ATENDIMENTO
              </a>

              <a
                href="#planos"
                className="button secondary"
              >
                VER PLANOS
              </a>

            </div>

          </div>

        </section>

        {/* =========================
            INSTRUTORES
        ========================== */}

        <section
          id="instrutores"
          className="instructors section"
        >

          <span className="section-label">
            CONHEÇA QUEM VAI TE ACOMPANHAR
          </span>

          <h2>
            NOSSOS INSTRUTORES
          </h2>

          <p className="section-intro">
            Experiência, acompanhamento personalizado e foco em
            preparar você para dirigir com segurança e confiança.
          </p>

          <div className="instructors-grid">

            <div className="instructor-card">

              <div className="instructor-photo">
                👨‍🏫
              </div>

              <span>
                INSTRUTOR
              </span>

              <h3>
                Vanderlei
              </h3>

              <p>
                Atendimento personalizado para quem busca
                aprender a dirigir com segurança e tranquilidade.
              </p>

            </div>

            <div className="instructor-card">

              <div className="instructor-photo">
                👩‍🏫
              </div>

              <span>
                INSTRUTORA
              </span>

              <h3>
                Queila
              </h3>

              <p>
                Acompanhamento personalizado para ajudar você
                a conquistar sua habilitação com confiança.
              </p>

            </div>

          </div>

          <div className="instructor-highlights">

            <div>
              <strong>
                +500
              </strong>

              <span>
                ALUNOS APROVADOS
              </span>
            </div>

            <div>
              <strong>
                SP
              </strong>

              <span>
                ZONA OESTE, NORTE E CENTRO
              </span>
            </div>

            <div>
              <strong>
                CNH
              </strong>

              <span>
                1ª HABILITAÇÃO E HABILITADOS
              </span>
            </div>

          </div>

        </section>

        {/* =========================
            PLANOS
        ========================== */}

        <section
          id="planos"
          className="section plans-section"
        >

          <span className="section-label">
            ESCOLHA O MELHOR PARA VOCÊ
          </span>

          <h2>
            PLANOS PARA SUA CNH
          </h2>

          <p className="section-intro">
            Todos os planos contam com veículo para prova e
            marcação das provas.
          </p>

          <div className="cards">

            {planos.map((plano, index) => (

              <div
                className="card"
                key={index}
              >

                <h3>
                  {plano.aulas}
                </h3>

                <div className="card-tag">
                  PRIMEIRA HABILITAÇÃO
                </div>

                <p>
                  ✓ Veículo para prova
                </p>

                <p>
                  ✓ Marcação das provas
                </p>

                <strong>
                  {plano.valor}
                </strong>

                <small>
                  à vista
                </small>

                <button
                  onClick={() =>
                    abrirWhatsApp(
                      `Olá! Vim pelo site da Coutinho Habilita e tenho interesse no plano de ${plano.aulas} no valor de ${plano.valor}. Gostaria de mais informações.`
                    )
                  }
                >
                  QUERO ESTE PLANO
                </button>

              </div>

            ))}

          </div>

          <p className="taxas">
            ⚠️ Taxas estaduais, exames, emissão da CNH e demais
            taxas do DETRAN são cobradas à parte.
          </p>

        </section>

        {/* =========================
            CONTEÚDOS
        ========================== */}

        <section
          id="conteudos"
          className="section contents"
        >

          <h2>
            📚 CONTEÚDOS PARA SUA CNH
          </h2>

          <p className="contents-intro">
            Estude os principais assuntos para chegar preparado
            para a prova.
          </p>

          <div className="content-grid">

            <div className="content-card">

              <span>
                🚦
              </span>

              <h3>
                Sinalização
              </h3>

              <p>
                Conheça placas, sinais e regras de circulação.
              </p>

              <button
                onClick={() =>
                  setConteudoAberto("sinalizacao")
                }
              >
                VER CONTEÚDO
              </button>

            </div>

            <div className="content-card">

              <span>
                📖
              </span>

              <h3>
                Legislação
              </h3>

              <p>
                Aprenda as principais leis e normas de trânsito.
              </p>

              <button
                onClick={() =>
                  setConteudoAberto("legislacao")
                }
              >
                VER CONTEÚDO
              </button>

            </div>

            <div className="content-card">

              <span>
                🛡️
              </span>

              <h3>
                Direção defensiva
              </h3>

              <p>
                Aprenda como dirigir de forma segura e preventiva.
              </p>

              <button
                onClick={() =>
                  setConteudoAberto("defensiva")
                }
              >
                VER CONTEÚDO
              </button>

            </div>

            <div className="content-card">

              <span>
                🔧
              </span>

              <h3>
                Mecânica básica
              </h3>

              <p>
                Entenda os principais componentes e cuidados
                com o veículo.
              </p>

              <button
                onClick={() =>
                  setConteudoAberto("mecanica")
                }
              >
                VER CONTEÚDO
              </button>

            </div>

            <div className="content-card">

              <span>
                🩹
              </span>

              <h3>
                Primeiros socorros
              </h3>

              <p>
                Saiba como agir em situações de emergência
                no trânsito.
              </p>

              <button
                onClick={() =>
                  setConteudoAberto("socorros")
                }
              >
                VER CONTEÚDO
              </button>

            </div>

            <div className="content-card">

              <span>
                📝
              </span>

              <h3>
                Simulados
              </h3>

              <p>
                Teste seus conhecimentos antes da prova teórica.
              </p>

              <button
                onClick={() =>
                  setConteudoAberto("simulado")
                }
              >
                COMEÇAR SIMULADO
              </button>

            </div>

          </div>

          {/* =========================
              CONTEÚDOS ABERTOS
          ========================== */}

          {conteudoAberto === "sinalizacao" && (

            <div
              className="lesson"
              ref={lessonRef}
            >

              <h3>
                🚦 Sinalização de Trânsito
              </h3>

              <p>
                As placas de trânsito ajudam a organizar a circulação.
              </p>

              <button
                className="close-lesson"
                onClick={() =>
                  setConteudoAberto(null)
                }
              >
                FECHAR CONTEÚDO
              </button>

            </div>

          )}

          {conteudoAberto === "legislacao" && (

            <div
              className="lesson"
              ref={lessonRef}
            >

              <h3>
                📖 Legislação de Trânsito
              </h3>

              <p>
                Conheça as principais regras que todo condutor
                precisa conhecer.
              </p>

              <button
                className="close-lesson"
                onClick={() =>
                  setConteudoAberto(null)
                }
              >
                FECHAR CONTEÚDO
              </button>

            </div>

          )}

          {conteudoAberto === "defensiva" && (

            <div
              className="lesson"
              ref={lessonRef}
            >

              <h3>
                🛡️ Direção Defensiva
              </h3>

              <p>
                Direção defensiva é dirigir de maneira preventiva.
              </p>

              <button
                className="close-lesson"
                onClick={() =>
                  setConteudoAberto(null)
                }
              >
                FECHAR CONTEÚDO
              </button>

            </div>

          )}

          {conteudoAberto === "mecanica" && (

            <div
              className="lesson"
              ref={lessonRef}
            >

              <h3>
                🔧 Mecânica Básica
              </h3>

              <p>
                Conhecimentos básicos sobre o funcionamento do veículo.
              </p>

              <button
                className="close-lesson"
                onClick={() =>
                  setConteudoAberto(null)
                }
              >
                FECHAR CONTEÚDO
              </button>

            </div>

          )}

          {conteudoAberto === "socorros" && (

            <div
              className="lesson"
              ref={lessonRef}
            >

              <h3>
                🩹 Primeiros Socorros
              </h3>

              <p>
                Conhecimentos básicos para saber como agir diante
                de uma emergência.
              </p>

              <button
                className="close-lesson"
                onClick={() =>
                  setConteudoAberto(null)
                }
              >
                FECHAR CONTEÚDO
              </button>

            </div>

          )}

          {/* =========================
              SIMULADO
          ========================== */}

          {conteudoAberto === "simulado" && (

            <div
              className="lesson simulado-container"
              ref={lessonRef}
            >

              {mostrarResultado ? (

                <div className="resultado-simulado">

                  <h3>
                    🏁 Fim do Simulado!
                  </h3>

                  <p>
                    Você acertou {pontuacao} de{" "}
                    {perguntasSimulado.length} perguntas.
                  </p>

                  <button
                    className="button primary"
                    onClick={fecharEReiniciarSimulado}
                  >
                    FINALIZAR
                  </button>

                </div>

              ) : (

                <div className="pergunta-simulado">

                  <h3>
                    📝 Pergunta {perguntaAtual + 1} de{" "}
                    {perguntasSimulado.length}
                  </h3>

                  <p className="texto-pergunta">
                    {perguntasSimulado[perguntaAtual].pergunta}
                  </p>

                  <div className="opcoes-container">

                    {perguntasSimulado[
                      perguntaAtual
                    ].opcoes.map(
                      (opcao, index) => (

                        <button
                          key={index}
                          onClick={() =>
                            responderPergunta(index)
                          }
                        >
                          {opcao}
                        </button>

                      )
                    )}

                  </div>

                  <button
                    className="close-lesson"
                    onClick={
                      fecharEReiniciarSimulado
                    }
                  >
                    SAIR DO SIMULADO
                  </button>

                </div>

              )}

            </div>

          )}

        </section>

        {/* =========================
            ATENDIMENTO
        ========================== */}

        <section
          id="agenda"
          className="section agenda"
        >

          <span className="section-label">
            FALE COM A NOSSA EQUIPE
          </span>

          <h2>
            📋 SOLICITE SEU ATENDIMENTO
          </h2>

          <p>
            Preencha seus dados e envie para o nosso WhatsApp.
            Nossa equipe entrará em contato para apresentar as
            opções de aulas e combinar o melhor dia e horário.
          </p>

          <Agenda />

        </section>

        {/* =========================
            CONTATO
        ========================== */}

        <section
          id="contato"
          className="contact"
        >

          <span className="section-label">
            FALE CONOSCO
          </span>

          <h2>
            ENTRE EM CONTATO
          </h2>

          <p>
            📱 WhatsApp:{" "}
            <strong>
              (11) 98898-8859
            </strong>
          </p>

          <a
            href="https://www.instagram.com/habilitacoutinho/"
            target="_blank"
            rel="noreferrer"
            className="instagram-link"
          >
            📸 Instagram: @habilitacoutinho
          </a>

          <div className="contact-buttons">

            <button
              className="button primary"
              onClick={() =>
                abrirWhatsApp(
                  "Olá! Vim pelo site da Coutinho Habilita e gostaria de informações sobre as aulas."
                )
              }
            >
              FALAR NO WHATSAPP
            </button>

            <a
              href="https://www.instagram.com/habilitacoutinho/"
              target="_blank"
              rel="noreferrer"
              className="button instagram-button"
            >
              ABRIR INSTAGRAM
            </a>

          </div>

        </section>

      </main>

      {/* =========================
          FOOTER
      ========================== */}

      <footer>
        © 2026 COUTINHO HABILITA — Vanderlei & Queila
      </footer>

    </div>
  );
}

export default App;