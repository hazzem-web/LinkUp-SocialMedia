import { generateHash , compareHash } from './../utils/security/index';

export class SecurityService { 
    constructor(){}

    generateHash = generateHash
    compareHash = compareHash
}