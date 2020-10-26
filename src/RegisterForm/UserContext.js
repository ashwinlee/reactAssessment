import React, { createContext, useState } from "react";
export const UserContext = createContext([{}, () => {}]);

export default props => {
  const [state, setState] = useState({
    user: {
      email: "",
      password: "",
      confirmPassword: "",
      birthdate: new Date().toISOString().slice(0, 10),
      phone: ""
    },
    errors: {}
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};
