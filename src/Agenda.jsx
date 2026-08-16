import { useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function Agenda() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");
  const [regiao, setRegiao] = useState("");
  const [origem, setOrigem] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      7
    )}-${numeros.slice(7)}`;
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

    // =========================
    // VALIDAÇÃO
    // =========================

    if (!nome || !telefone || !idade || !regiao || !origem) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!telefoneValido(telefone)) {
      setErro(
        "Digite um WhatsApp válido com DDD. Ex: (11) 99999-9999"
      );
      return;
    }

    if (idade < 18 || idade > 100) {
      setErro("Digite uma idade válida.");
      return;
    }

    setEnviando(true);

    try {
      // =========================
      // SALVAR NO FIREBASE
      // =========================

      const contatosRef = collection(db, "contatos");

      await addDoc(contatosRef, {
        nome,
        telefone,
        idade: Number(idade),
        regiao,
        origem,

        // CONTROLE INTERNO
        status: "Novo contato",

        criadoEm: serverTimestamp(),
      });

      // =========================
      // MENSAGEM WHATSAPP
      // =========================

      const mensagem = `Olá! Vim pelo site da Coutinho Habilita.

Meu nome é ${nome}.
Tenho ${idade} anos.
Moro em: ${regiao}.

Meu WhatsApp: ${telefone}

Conheci a Coutinho Habilita por: ${origem}

Gostaria de saber mais sobre as aulas.`;

      // NOVO NÚMERO
      const numeroAtendimento = "5511988988859";

      const linkWhatsapp =
        `https://wa.me/${numeroAtendimento}?text=` +
        encodeURIComponent(mensagem);

      window.open(linkWhatsapp, "_blank");

      // =========================
      // SUCESSO
      // =========================

      setSucesso(true);

      setNome("");
      setTelefone("");
      setIdade("");
      setRegiao("");
      setOrigem("");

    } catch (err) {
      console.error(err);

      setErro(
        "Não foi possível enviar seus dados agora. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  // =========================
  // TELA DE SUCESSO
  // =========================

  if (sucesso) {
    return (
      <div className="agenda-form">

        <p className="quiz-resultado">
          ✅ Dados enviados com sucesso!
        </p>

        <p>
          Obrigado pelo interesse na{" "}
          <strong>Coutinho Habilita</strong>.
        </p>

        <p>
          Nossa equipe entrará em contato pelo WhatsApp
          para passar todas as informações.
        </p>

        <button
          className="close-lesson"
          onClick={() => setSucesso(false)}
        >
          ENVIAR OUTRA SOLICITAÇÃO
        </button>

      </div>
    );
  }

  // =========================
  // FORMULÁRIO
  // =========================

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
          placeholder="Seu nome completo"
        />
      </label>

      <label>
        WhatsApp

        <input
          type="tel"
          value={telefone}
          onChange={handleTelefoneChange}
          placeholder="(11) 99999-9999"
        />
      </label>

      <label>
        Idade

        <input
          type="number"
          min="18"
          max="100"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Sua idade"
        />
      </label>

      <label>
        Onde você mora?

        <input
          type="text"
          value={regiao}
          onChange={(e) => setRegiao(e.target.value)}
          placeholder="Ex: Lapa, Osasco, Barra Funda..."
        />
      </label>

      <label>
        Como conheceu a Coutinho Habilita?

        <select
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        >
          <option value="">
            Selecione uma opção
          </option>

          <option value="Instagram">
            Instagram
          </option>

          <option value="Indicação">
            Indicação
          </option>

          <option value="Google">
            Google
          </option>

          <option value="WhatsApp">
            WhatsApp
          </option>

          <option value="Facebook">
            Facebook
          </option>

          <option value="Outro">
            Outro
          </option>
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
          ? "ENVIANDO..."
          : "TENHO INTERESSE"}
      </button>

    </form>
  );
}

export default Agenda;