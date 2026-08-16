import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function Agenda({ interesseInicial = "" }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");
  const [regiao, setRegiao] = useState("");
  const [nivel, setNivel] = useState("");
  const [origem, setOrigem] = useState("");
  const [interesse, setInteresse] = useState(interesseInicial);

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    setInteresse(interesseInicial);
  }, [interesseInicial]);

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

    if (
      !nome ||
      !telefone ||
      !idade ||
      !regiao ||
      !nivel ||
      !origem ||
      !interesse
    ) {
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
      const contatosRef = collection(db, "contatos");

      await addDoc(contatosRef, {
        nome,
        telefone,
        idade: Number(idade),
        regiao,
        nivel,
        origem,
        interesse,

        // CONTROLE INTERNO
        status: "Novo contato",

        // DATA E HORA AUTOMÁTICAS
        criadoEm: serverTimestamp(),
      });

      const mensagem = interesse.startsWith("Quero conhecer")
        ? "Olá! Vim pelo site da Coutinho Habilita e gostaria de conhecer as opções de aulas."
        : `Olá! Vim pelo site da Coutinho Habilita e tenho interesse no ${interesse}. Gostaria de mais informações.`;

      const numeroAtendimento = "5511988988859";

      const linkWhatsapp =
        `https://wa.me/${numeroAtendimento}?text=` +
        encodeURIComponent(mensagem);

      window.open(linkWhatsapp, "_blank");

      setSucesso(true);

      setNome("");
      setTelefone("");
      setIdade("");
      setRegiao("");
      setNivel("");
      setOrigem("");
      setInteresse("");

    } catch (err) {
      console.error(err);

      setErro(
        "Não foi possível enviar seus dados agora. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  };

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
          Seus dados foram registrados e nossa equipe
          continuará o atendimento pelo WhatsApp.
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
        Qual é o seu nível de conhecimento com direção?

        <select
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        >
          <option value="">
            Selecione uma opção
          </option>

          <option value="Nunca dirigi">
            Nunca dirigi
          </option>

          <option value="Já tive pouco contato com carro">
            Já tive pouco contato com carro
          </option>

          <option value="Já dirijo, mas tenho pouca experiência">
            Já dirijo, mas tenho pouca experiência
          </option>

          <option value="Já tenho bastante experiência">
            Já tenho bastante experiência
          </option>

          <option value="Já sou habilitado e quero aperfeiçoamento">
            Já sou habilitado e quero aperfeiçoamento
          </option>
        </select>
      </label>

      <label>
        Por onde você conheceu a Coutinho Habilita?

        <select
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        >
          <option value="">
            Selecione uma opção
          </option>

          <option value="Indicação">
            Indicação
          </option>

          <option value="CNH Brasil">
            CNH Brasil
          </option>

          <option value="Instagram">
            Instagram
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

          <option value="TikTok">
            TikTok
          </option>

          <option value="Outro">
            Outro
          </option>
        </select>
      </label>

      <label>
        O que você procura?

        <select
          value={interesse}
          onChange={(e) => setInteresse(e.target.value)}
        >
          <option value="">
            Selecione uma opção
          </option>

          <option value="Quero conhecer as opções">
            Quero conhecer as opções
          </option>

          <option value="2 AULAS — R$ 500,00">
            2 AULAS — R$ 500,00
          </option>

          <option value="6 AULAS — R$ 800,00">
            6 AULAS — R$ 800,00
          </option>

          <option value="10 AULAS — R$ 1.100,00">
            10 AULAS — R$ 1.100,00
          </option>

          <option value="15 AULAS — R$ 1.300,00">
            15 AULAS — R$ 1.300,00
          </option>

          <option value="20 AULAS — R$ 1.600,00">
            20 AULAS — R$ 1.600,00
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