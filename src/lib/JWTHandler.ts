import { sign, verify } from "jsonwebtoken";

export default class JWTHandler {
    static encode(payload: any): string {
        return sign(payload, process.env.JWT_SECRET as string, { algorithm: 'RS256' });;
    }

    static decode<T>(token: string): T {
        return JSON.parse(verify(token, process.env.JWT_SECRET as string) as string) as T;
    }
};
