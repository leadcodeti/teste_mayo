export interface ExempleProps {
  //types your values props
}

export interface UserOptionProps {
  setUserOption: (setUserOption: string) => void;
}

export interface InputsProps {
  name: string;
  lastname?: string;
  phone?: string;
  type: string;
  placeholder: string;
  requiredInput: string;
}

export interface newUserDataProps {
  name?: string;
  lastname?: string;
  phone?: string;
  password?: string;
  avatar?: string;
}
