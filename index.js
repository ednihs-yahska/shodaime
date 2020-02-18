"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 9000;
app.use(express_1.default.static('dist'));
app.use(express_1.default.static('assets'));
//app.get('/', (req: Request, res: Response) => res.sendFile('index.html', {root:'.'}))
app.get('*', function (req, res) { return res.sendFile('dist/index.html', { root: '.' }); });
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
//# sourceMappingURL=index.js.map