import { RowDataPacket } from 'mysql2';

export interface UserData extends RowDataPacket {
  idUser: number;
  name: string;
  email: string;
  password: string;
}
