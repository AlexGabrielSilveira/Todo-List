import { Status } from "generated/prisma";

export class CreateTaskDto {
    title: string;
    description: string;
    status: Status;
}