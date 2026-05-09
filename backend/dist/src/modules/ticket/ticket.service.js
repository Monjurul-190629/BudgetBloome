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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const ticket_model_1 = __importDefault(require("../../models/ticket.model"));
const ApiError_1 = require("../../utils/ApiError");
class TicketService {
    static createTicket(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const data = (body === null || body === void 0 ? void 0 : body.data) ? body.data : body;
            const subject = (_a = data === null || data === void 0 ? void 0 : data.subject) === null || _a === void 0 ? void 0 : _a.trim();
            const message = (_b = data === null || data === void 0 ? void 0 : data.message) === null || _b === void 0 ? void 0 : _b.trim();
            if (!subject || !message) {
                throw new ApiError_1.AppError("Subject and message are required", 400);
            }
            const ticket = yield ticket_model_1.default.create({
                user: userId,
                type: (data === null || data === void 0 ? void 0 : data.type) || "question",
                subject,
                message,
                status: (data === null || data === void 0 ? void 0 : data.status) || "open",
            });
            return ticket;
        });
    }
    static getTickets(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 5;
            const skip = (page - 1) * limit;
            const filter = {
                user: userId,
            };
            const [tickets, total] = yield Promise.all([
                ticket_model_1.default.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
                ticket_model_1.default.countDocuments(filter),
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
        });
    }
}
exports.TicketService = TicketService;
