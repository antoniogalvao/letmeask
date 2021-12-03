import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams() as RoomParams;

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <RoomCode code={params.id} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form>
          <textarea placeholder="O que você quer perguntar" />
          <div className="form-footer">
            <span>
              Para enviar a pergunta, <button>faça seu login</button>
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
        {/* <div>
          <img src={emptyQuestionsImg} alt=""></img>
          <h2>Nenhuma pergunta por aqui...</h2>
          <p>Faça seu login e seja a primeira pessoa a fazer uma pergunta!</p>
        </div> */}
      </main>
    </div>
  );
}
