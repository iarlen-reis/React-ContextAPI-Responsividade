// Hook que salva o dado no localStorage:
export const useSaveLocalStorage = (email, username, auth) => {
  const message = auth
    ? "Usuário logado com sucesso"
    : "Usuário deslogado com sucesso";

  const user = {
    username,
    email,
    auth,
  };

  localStorage.setItem("user", JSON.stringify(user));

  return message;
};

// Hook que pega o dado no localStorage:
export const useGetLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) return user;

  return false;
};

// Hook que Remove o dado no localStorage:
export const useRemoveLocalStorage = () => {
  localStorage.removeItem("user");
};
