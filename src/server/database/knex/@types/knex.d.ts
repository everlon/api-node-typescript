import { IMarca, IModelo, IUsuario } from '../../models';


declare module "knex/types/tables" {
  interface Tables {
    marcas: IMarca;
    modelo: IModelo;
    usuario: IUsuario;
  }
}
