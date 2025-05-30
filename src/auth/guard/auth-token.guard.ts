import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthTokenGuard {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if(!token) {
            if (!token) {
            throw new UnauthorizedException("You need to Loggin first!");
        }
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            })
            request['user'] = payload;
            
        } catch (err){
            console.error("Token verification failed:", err.message);
            throw new UnauthorizedException("Invalid token provided!");
            
        }
        return true;
    }
   extractTokenFromHeader(request: Request): string | null {
    const authorization = request.headers?.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return null;
    }
    return authorization.split(' ')[1];
}

}