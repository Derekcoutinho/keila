import { useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const HORARIOS = ["09:00", "10:00", "11:00", "14:00", "15:00"];

function Agenda() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) return numeros;

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(
      7
    )}`;
  };

  const handleTelefoneChange = (e) => {
    setTelefone(formatarTelefone(e.target.value));
  };

  const telefoneValido = (valor) => {
    const numeros = valor.replace(/\D/g, "");

    return numeros.length === 10 || numeros.length === 11;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro("");

    if (!nome || !telefone || !data || !horario) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!telefoneValido(telefone)) {
      setErro(
        "Digite um telefone válido, com DDD. Ex: (11) 99999-9999"
      );
      return;
    }

    setEnviando(true);

    try {
      // ==============================
      // VERIFICA HORÁRIO DISPONÍVEL
      // ==============================

      const agendamentosRef = collection(db, "agendamentos");

      const consulta = query(
        agendamentosRef,
        where("data", "==", data),
        where("horario", "==", horario)
      );

      const resultado = await getDocs(consulta);

      if (!resultado.empty) {
        setErro(
          "Esse horário já está ocupado. Escolha outro dia ou horário."
        );

        setEnviando(false);
        return;
      }

      // ==============================
      // SALVA NO FIREBASE
      // ==============================

      await addDoc(agendamentosRef, {
        nome,
        telefone,
        data,
        horario,
        status: "pendente",
        criadoEm: serverTimestamp(),
      });

      // ==============================
      // FORMATA DATA
      // ==============================

      const dataFormatada = new Date(
        data + "T00:00:00"
      ).toLocaleDateString("pt-BR");

      // ==============================
      // MENSAGEM WHATSAPP
      // ==============================

      const mensagem = `Olá! Vim pelo site da Coutinho Habilita.

Meu nome é ${nome}.

Gostaria de agendar uma aula:

📅 Data: ${dataFormatada}
🕐 Horário: ${horario}
📱 Meu telefone: ${telefone}

Aguardo a confirmação do atendimento.`;

      // ==============================
      // WHATSAPP PRINCIPAL
      // ==============================

      const numeroAtendimento = "5511989138763";

      const linkWhatsapp = `https://wa.me/${numeroAtendimento}?text=${encodeURIComponent(
        mensagem
      )}`;

      window.open(linkWhatsapp, "_blank");

      // ==============================
      // SUCESSO
      // ==============================

      setSucesso(true);

      setNome("");
      setTelefone("");
      setData("");
      setHorario("");

    } catch (err) {
      console.error(err);

      setErro(
        "Não foi possível agendar agora. Tente novamente em instantes."
      );

    } finally {
      setEnviando(false);
    }
  };

  // ==============================
  // TELA DE SUCESSO
  // ==============================

  if (sucesso) {
    return (
      <div className="agenda-form">

        <p className="quiz-resultado">
          ✅ Agendamento registrado!
        </p>

        <p>
          A equipe da <strong>Coutinho Habilita</strong> irá
          confirmar seu atendimento pelo WhatsApp.
        </p>

        <button
          className="close-lesson"
          onClick={() => setSucesso(false)}
        >
          AGENDAR OUTRA AULA
        </button>

      </div>
    );
  }

  // ==============================
  // FORMULÁRIO
  // ==============================

  return (
    <form
      className="agenda-form"
      onSubmit={handleSubmit}
    >

      <label>
        Nome

        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
        />
      </label>

      <label>
        Telefone

        <input
          type="tel"
          value={telefone}
          onChange={handleTelefoneChange}
          placeholder="(11) 99999-9999"
        />
      </label>

      <label>
        Data

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </label>

      <label>
        Horário

        <select
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        >

          <option value="">
            Selecione
          </option>

          {HORARIOS.map((h) => (
            <option
              key={h}
              value={h}
            >
              {h}
            </option>
          ))}

        </select>

      </label>

      {erro && (
        <p className="agenda-erro">
          {erro}
        </p>
      )}

      <button
        className="button primary"
        type="submit"
        disabled={enviando}
      >
        {enviando
          ? "AGENDANDO..."
          : "AGENDAR AULA"}
      </button>

    </form>
  );
}

export default Agenda;