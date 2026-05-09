import { Request, Response } from "express";
import { TicketService } from "./ticket.service";

interface AuthRequest extends Request {
  user?: any;
}

export class TicketController {
  static async createTicket(req: AuthRequest, res: Response) {
    const ticket = await TicketService.createTicket(
      req.user._id,
      req.body,
    );

    res.status(201).json({
      message: "Ticket created successfully",
      data: ticket,
    });
  }

  static async getTickets(req: AuthRequest, res: Response) {
    const result = await TicketService.getTickets(
      req.user._id,
      req.query,
    );

    res.status(200).json({
      message: "Tickets fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  }
}