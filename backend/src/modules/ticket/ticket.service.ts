import Ticket from "../../models/ticket.model";
import { AppError } from "../../utils/ApiError";

export class TicketService {
  static async createTicket(userId: string, body: any) {
    const data = body?.data ? body.data : body;

    const subject = data?.subject?.trim();
    const message = data?.message?.trim();

    if (!subject || !message) {
      throw new AppError("Subject and message are required", 400);
    }

    const ticket = await Ticket.create({
      user: userId,
      type: data?.type || "question",
      subject,
      message,
      status: data?.status || "open",
    });

    return ticket;
  }

  static async getTickets(userId: string, query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = {
      user: userId,
    };

    const [tickets, total] = await Promise.all([
      Ticket.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Ticket.countDocuments(filter),
    ]);

    return {
      data: tickets,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}