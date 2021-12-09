import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");

      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room is already closed");

      return;
    }

    navigate(`/rooms/${roomCode}`);
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
          <Button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google logo" />
            Create your room with Google
          </Button>
          <div className="separator">or enter a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Type the room code"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Enter the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
