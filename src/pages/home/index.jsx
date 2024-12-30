import { useEffect, useState, useRef } from "react";
import "./style.css";
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]);
  const slideIndex = useRef(0); // Referência para controlar o índice do slide

  const inputName = useRef();
  const inputEmail = useRef();
  const inputAge = useRef();

  // Função para buscar os usuários
  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios');
      if (usersFromApi.data) {
        setUsers(usersFromApi.data);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  // Função para criar um novo usuário
  async function createUsers() {
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        age: String(inputAge.current.value), // Garantindo que 'age' seja uma string
      });
      getUsers(); // Atualiza a lista de usuários após a criação
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  // Função para excluir um usuário
  async function deleteUsers(id) {
    try {
      console.log("Excluindo usuário com id:", id); // Verifica se o ID está correto
      await api.delete(`/usuarios/${id}`);
      getUsers(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  }

  // Funções de navegação do slide
  const nextSlide = () => {
    if (slideIndex.current < users.length - 1) {
      slideIndex.current++;
    } else {
      slideIndex.current = 0; // Volta ao primeiro slide
    }
    updateSlide();
  };

  const prevSlide = () => {
    if (slideIndex.current > 0) {
      slideIndex.current--;
    } else {
      slideIndex.current = users.length - 1; // Vai para o último slide
    }
    updateSlide();
  };

  // Atualiza a visibilidade dos slides
  const updateSlide = () => {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.style.display = index === slideIndex.current ? "block" : "none";
    });
  };

  // Chama getUsers ao carregar o componente
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <section>
        <div className="form-box">
          <div className="form-value">
            <form>
              <h2>Cadastro Usuário</h2>
              <div className="inputbox">
                <ion-icon name="person-outline"></ion-icon>
                <input type="text" name="name" ref={inputName} required />
                <label>Nome</label>
              </div>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input type="email" name="email" ref={inputEmail} required />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="calendar-outline"></ion-icon>
                <input type="number" name="age" ref={inputAge} required />
                <label>Idade</label>
              </div>
              <button type="button" onClick={createUsers}>Registrar</button>
            </form>
          </div>
        </div>

        {/* Exibição dos usuários como slides */}
        <div className="slider-container">
          {users.map((user) => (
            <div key={user.id} className="slide">
              <div className="users-left">
                <p>Nome: <span>{user.name}</span></p>
                <p>Email: <span>{user.email}</span></p>
                <p>Idade: <span>{user.age}</span></p>
              </div>
              <button className="button-tresh" onClick={() => deleteUsers(user.id)}>
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
