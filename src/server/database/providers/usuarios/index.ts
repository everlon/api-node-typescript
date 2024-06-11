import * as GetByEmail from './GetByEmail';
import * as create from './Create';


export const UsuariosProvider = {
  ...GetByEmail,
  ...create,
};
