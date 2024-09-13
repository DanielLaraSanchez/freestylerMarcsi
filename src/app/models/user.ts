import { Stats } from './stats';

export interface User {
  id: number;
  name: string;
  profilePicture: string;
  stats: Stats;
}
