"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const ticket_service_1 = require("./ticket.service");
class TicketController {
    static createTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield ticket_service_1.TicketService.createTicket(req.user._id, req.body);
            res.status(201).json({
                message: "Ticket created successfully",
                data: ticket,
            });
        });
    }
    static getTickets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ticket_service_1.TicketService.getTickets(req.user._id, req.query);
            res.status(200).json({
                message: "Tickets fetched successfully",
                data: result.data,
                meta: result.meta,
            });
        });
    }
}
exports.TicketController = TicketController;
