import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";


export function Subscribe() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  async function handleSubscribe(event: FormEvent) {
    await event?.preventDefault();
    createSubscriber({
      variables: {
        name,
        email,
      },
    });

    navigate("/event");
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center ">
      <div className="max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-2 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong> do
            zero com
            <strong className="text-blue-500"> React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            em apenas uma semana voce vai dominar na prática uma das tecnologias
            mais ultilziadas no mundo e com alta demanda para acessar as
            melhores oportunidades do mercado.
          </p>
          <div className=""></div>
        </div>
        <div className="p-8 bg-greay-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              placeholder="Seu nome completo"
              className="bg-gray-900 rounded px-5 h-14 "
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Digite seu email"
              className="bg-gray-900 rounded px-5 h-14 "
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              disabled={loading}
              type="submit"
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
    </div>
  );
}
