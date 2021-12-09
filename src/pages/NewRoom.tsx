import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration" />
        <strong>Every question has an answer</strong>
        <p>Learn and share knowledge with others</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Room name"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Create room</Button>
          </form>
          <p>
            Want to join a existing room? <Link to="/">Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
