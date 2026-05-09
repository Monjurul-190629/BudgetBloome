import { instance } from "@/lib/api/apiIntellisence";
import { MUTATE_TICKET } from "../types/ticket.types";


export const createTicket = ({data} : {data : MUTATE_TICKET}) => instance.post("/tickets", {data});

export const getTickets = () => instance.get("/tickets");