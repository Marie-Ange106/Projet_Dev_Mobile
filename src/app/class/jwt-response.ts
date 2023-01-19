import { Authority } from './authority';
export class JwtResponse {
    username!: string;
    authorities!: Authority[];
    tokenType =  'Bearer';
    accessToken!: string;

}
