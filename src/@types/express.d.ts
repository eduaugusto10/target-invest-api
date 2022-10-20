import { UserEntity } from "../entity/UserEntity";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<UserEntity>
        }
    }
}