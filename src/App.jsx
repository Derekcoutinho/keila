
import { useState, useEffect, useRef } from "react";
import "./App.css";
import Agenda from "./Agenda";

function App() {
  // Estado para abrir e fechar os conteúdos
  const [conteudoAberto, setConteudoAberto] = useState(null);

  // Referência para o conteúdo aberto
  const lessonRef = useRef(null);

  // Rola automaticamente até o conteúdo quando ele é aberto
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

  // Estados para controlar o Simulado
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Lista de perguntas do simulado
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

  // Função para processar a resposta do usuário
  const responderPergunta = (indexOpcao) => {
    if (indexOpcao === perguntasSimulado[perguntaAtual].respostaCerta) {
      setPontuacao((pontuacaoAtual) => pontuacaoAtual + 1);
    }

    const proximaPergunta = perguntaAtual + 1;

    if (proximaPergunta < perguntasSimulado.length) {
      setPerguntaAtual(proximaPergunta);
    } else {
      setMostrarResultado(true);
    }
  };

  // Função para reiniciar o simulado
  const fecharEReiniciarSimulado = () => {
    setConteudoAberto(null);
    setPerguntaAtual(0);
    setPontuacao(0);
    setMostrarResultado(false);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">KEILA</div>

        <nav>
          <a href="#inicio">Início</a>
          <a href="#planos">Planos</a>
          <a href="#conteudos">Conteúdos</a>
          <a href="#agenda">Agenda</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main>
        {/* BANNER */}
        <section id="inicio" className="hero">
          <img
            src="/keilaft.jpeg"
            alt="Instrutora Keila credenciada pelo DETRAN SP"
          />

          <div className="hero-buttons">
            <a href="#agenda" className="button primary">
              AGENDAR AULA
            </a>

            <a href="#conteudos" className="button secondary">
              ESTUDAR
            </a>
          </div>
        </section>

        {/* SOBRE */}
        <section className="about">
          <div className="about-content">
            <span className="about-label">SOBRE A INSTRUTORA</span>

            <h2>Aprenda a dirigir com confiança.</h2>

            <p>
              Aulas de habilitação com acompanhamento personalizado,
              buscando preparar você para dirigir com segurança,
              tranquilidade e confiança.
            </p>

            <p>
              Aqui você encontra informações, conteúdos para estudar,
              opções de aulas e uma forma simples de entrar em contato
              para consultar horários disponíveis.
            </p>

            <a
              href="https://wa.me/5511989138763"
              target="_blank"
              rel="noreferrer"
              className="button primary"
            >
              FALAR COM A KEILA
            </a>
          </div>
        </section>

     {/* PLANOS */}
<section id="planos" className="section">
  <h2>PLANOS PARA SUA CNH</h2>

  <div className="cards">
    <div className="card">
      <h3>PLANO BÁSICO</h3>
      <p>2 aulas práticas</p>
      <p>Veículo para prova</p>
      <p>Marcação das provas</p>
      <strong>R$ 299,00</strong>
      <a
        href="https://wa.me/5511989138763?text=Ol%C3%A1%2C%20Keila!%20Vim%20pelo%20seu%20site%20e%20tenho%20interesse%20no%20Plano%20B%C3%A1sico%20de%20R%24%20299%2C00.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F"
        target="_blank"
        rel="noreferrer"
      >
        QUERO ESTE PLANO
      </a>
    </div>

    <div className="card">
      <h3>PLANO INTERMEDIÁRIO</h3>
      <p>6 aulas práticas</p>
      <p>Veículo para prova</p>
      <p>Marcação das provas</p>
      <strong>R$ 599,00</strong>
      <a
        href="https://wa.me/5511989138763?text=Ol%C3%A1%2C%20Keila!%20Vim%20pelo%20seu%20site%20e%20tenho%20interesse%20no%20Plano%20Intermedi%C3%A1rio%20de%20R%24%20599%2C00.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F"
        target="_blank"
        rel="noreferrer"
      >
        QUERO ESTE PLANO
      </a>
    </div>

    <div className="card">
      <h3>PLANO COMPLETO</h3>
      <p>10 aulas práticas</p>
      <p>Veículo para prova</p>
      <p>Marcação das provas</p>
      <strong>R$ 799,00</strong>
      <a
        href="https://wa.me/5511989138763?text=Ol%C3%A1%2C%20Keila!%20Vim%20pelo%20seu%20site%20e%20tenho%20interesse%20no%20Plano%20Completo%20de%20R%24%20799%2C00.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F"
        target="_blank"
        rel="noreferrer"
      >
        QUERO ESTE PLANO
      </a>
    </div>
  </div>
</section>

        {/* CONTEÚDOS */}
        <section id="conteudos" className="section contents">
          <h2>📚 CONTEÚDOS PARA SUA CNH</h2>

          <p className="contents-intro">
            Estude os principais assuntos para chegar preparado para a prova.
          </p>

          <div className="content-grid">
            {/* SINALIZAÇÃO */}
            <div className="content-card">
              <span>🚦</span>
              <h3>Sinalização</h3>
              <p>Conheça placas, sinais e regras de circulação.</p>

              <button onClick={() => setConteudoAberto("sinalizacao")}>
                VER CONTEÚDO
              </button>
            </div>

            {/* LEGISLAÇÃO */}
            <div className="content-card">
              <span>📖</span>
              <h3>Legislação</h3>
              <p>Aprenda as principais leis e normas de trânsito.</p>

              <button onClick={() => setConteudoAberto("legislacao")}>
                VER CONTEÚDO
              </button>
            </div>

            {/* DIREÇÃO DEFENSIVA */}
            <div className="content-card">
              <span>🛡️</span>
              <h3>Direção defensiva</h3>
              <p>Aprenda como dirigir de forma segura e preventiva.</p>

              <button onClick={() => setConteudoAberto("defensiva")}>
                VER CONTEÚDO
              </button>
            </div>

            {/* MECÂNICA */}
            <div className="content-card">
              <span>🔧</span>
              <h3>Mecânica básica</h3>
              <p>
                Entenda os principais componentes e cuidados com o veículo.
              </p>

              <button onClick={() => setConteudoAberto("mecanica")}>
                VER CONTEÚDO
              </button>
            </div>

            {/* PRIMEIROS SOCORROS */}
            <div className="content-card">
              <span>🩹</span>
              <h3>Primeiros socorros</h3>
              <p>
                Saiba como agir em situações de emergência no trânsito.
              </p>

              <button onClick={() => setConteudoAberto("socorros")}>
                VER CONTEÚDO
              </button>
            </div>

            {/* SIMULADOS */}
            <div className="content-card">
              <span>📝</span>
              <h3>Simulados</h3>
              <p>Teste seus conhecimentos antes da prova teórica.</p>

              <button onClick={() => setConteudoAberto("simulado")}>
                COMEÇAR SIMULADO
              </button>
            </div>
          </div>

          {/* SINALIZAÇÃO */}
          {conteudoAberto === "sinalizacao" && (
            <div className="lesson" ref={lessonRef}>
              <h3>🚦 Sinalização de Trânsito</h3>

              <p>
                As placas de trânsito ajudam a organizar a circulação.
              </p>

              <button
                className="close-lesson"
                onClick={() => setConteudoAberto(null)}
              >
                FECHAR CONTEÚDO
              </button>
            </div>
          )}

          {/* LEGISLAÇÃO */}
          {conteudoAberto === "legislacao" && (
            <div className="lesson" ref={lessonRef}>
              <h3>📖 Legislação de Trânsito</h3>

              <p>
                Conheça as principais regras que todo condutor precisa
                conhecer.
              </p>

              <button
                className="close-lesson"
                onClick={() => setConteudoAberto(null)}
              >
                FECHAR CONTEÚDO
              </button>
            </div>
          )}

          {/* DIREÇÃO DEFENSIVA */}
          {conteudoAberto === "defensiva" && (
            <div className="lesson" ref={lessonRef}>
              <h3>🛡️ Direção Defensiva</h3>

              <p>
                Direção defensiva é dirigir de maneira preventiva.
              </p>

              <button
                className="close-lesson"
                onClick={() => setConteudoAberto(null)}
              >
                FECHAR CONTEÚDO
              </button>
            </div>
          )}

          {/* MECÂNICA */}
          {conteudoAberto === "mecanica" && (
            <div className="lesson" ref={lessonRef}>
              <h3>🔧 Mecânica Básica</h3>

              <p>
                Conhecimentos básicos sobre o funcionamento do veículo.
              </p>

              <button
                className="close-lesson"
                onClick={() => setConteudoAberto(null)}
              >
                FECHAR CONTEÚDO
              </button>
            </div>
          )}

          {/* PRIMEIROS SOCORROS */}
          {conteudoAberto === "socorros" && (
            <div className="lesson" ref={lessonRef}>
              <h3>🩹 Primeiros Socorros</h3>

              <p>
                Conhecimentos básicos para saber como agir diante de uma
                emergência.
              </p>

              <button
                className="close-lesson"
                onClick={() => setConteudoAberto(null)}
              >
                FECHAR CONTEÚDO
              </button>
            </div>
          )}

          {/* SIMULADO */}
          {conteudoAberto === "simulado" && (
            <div
              className="lesson simulado-container"
              ref={lessonRef}
            >
              {mostrarResultado ? (
                <div className="resultado-simulado">
                  <h3>🏁 Fim do Simulado!</h3>

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

                  <div
                    className="opcoes-container"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      margin: "20px 0",
                    }}
                  >
                    {perguntasSimulado[perguntaAtual].opcoes.map(
                      (opcao, index) => (
                        <button
                          key={index}
                          style={{
                            padding: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => responderPergunta(index)}
                        >
                          {opcao}
                        </button>
                      )
                    )}
                  </div>

                  <br />

                  <button
                    className="close-lesson"
                    onClick={fecharEReiniciarSimulado}
                  >
                    SAIR DO SIMULADO
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* AGENDA */}
        <section id="agenda" className="section agenda">
          <h2>📅 AGENDE SUA AULA</h2>

          <p>
            Escolha o dia e horário abaixo. A Keila confirma pelo WhatsApp.
          </p>

          <Agenda />
        </section>

        {/* CONTATO */}
        <section id="contato" className="contact">
          <h2>FALE COM A KEILA</h2>

          <p>📱 WhatsApp: (11) 98913-8763</p>
          <p>📱 WhatsApp: (11) 95718-5176</p>
          <p>📸 Instagram: @instrutorakeila</p>
        </section>
      </main>

      <footer>© 2026 Instrutora Keila</footer>
    </div>
  );
}

export default App;