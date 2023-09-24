import fastify from "Fastify";
import fastifyStatic from "@fastify/static";
import { createBareServer } from '@tomphttp/bare-server-node';
import { dirname, join } from 'path';
import chalk from "chalk"
import 'dotenv/config';


const port = process.env.PORT || 3000;

const __dirname = process.cwd();
const app = fastify(server);
const server = http.createServer();
const bareServer = createBareServer("/bare/");
const server = http.createServer();

app.use(fastify.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(fastify.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

server.on("request", (req, res) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeRequest(req, res);
    } else {
      app(req, res);
    }
  });
  
  server.on("upgrade", (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeUpgrade(req, socket, head);
    } else {
      socket.end();
    }
  });
  
  server.on("listening", () => {
    console.log(`incognito tabs listening on port 3000 ${process.env.PORT}`);
  });
  
  server.listen({
    port: process.env.PORT,
}, () => {
    console.log(chalk.green(`Welcome to ${chalk.green.bold('Incognito Tabs. ')}If you encounter an error, report it to xineese#0 on discord.`))
    console.log(chalk.green.bold("[INGOGNITOTABS] ") + "live at port " + chalk.bold.green(port));
  });
 
  







