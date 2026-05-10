"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const wallet_routes_1 = __importDefault(require("./modules/wallet/wallet.routes"));
const transaction_routes_1 = __importDefault(require("./modules/transaction/transaction.routes"));
const goal_routes_1 = __importDefault(require("./modules/goal/goal.routes"));
const targettedExpense_routes_1 = __importDefault(require("./modules/targetedExpense/targettedExpense.routes"));
const ticket_routes_1 = __importDefault(require("./modules/ticket/ticket.routes"));
const app = (0, express_1.default)();
const allowedOrigins = (_a = process.env.CLIENT_URL) === null || _a === void 0 ? void 0 : _a.split(",").map((url) => url.trim());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        console.log("Request Origin:", origin);
        console.log("Allowed Origins:", allowedOrigins);
        if (!origin || (allowedOrigins === null || allowedOrigins === void 0 ? void 0 : allowedOrigins.includes(origin))) {
            callback(null, true);
        }
        else {
            callback(new Error(`CORS blocked for origin: ${origin}`));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// auth
app.use("/api/auth", auth_routes_1.default);
// user // protected routes
app.use("/api/user", user_routes_1.default);
//  wallet
app.use("/api/wallets", wallet_routes_1.default);
// transaction
app.use("/api/transactions", transaction_routes_1.default);
// goals
app.use("/api/goals", goal_routes_1.default);
// targeted expense
app.use("/api/targeted-expenses", targettedExpense_routes_1.default);
//ticket
app.use("/api/tickets", ticket_routes_1.default);
app.get("/", (req, res) => {
    res.send("Backend is working perfectly");
});
app.use(error_middleware_1.errorHandler);
exports.default = app;
