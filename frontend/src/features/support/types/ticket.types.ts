import z from "zod";
import { ticketSchema } from "../schema/ticket.schema";


export type MUTATE_TICKET = z.infer<typeof ticketSchema>;

export interface TICKET extends MUTATE_TICKET{
    _id: string;
}
