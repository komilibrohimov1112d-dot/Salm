import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

interface SchoolPhones {
  reception: string;
  director: string;
}

interface SchoolState {
  phones: SchoolPhones;
  schedule: Record<string, string>;
  updatedAt: number;
}

const DEFAULT_STATE: SchoolState = {
  phones: {
    reception: '+998 (69) 227-71-00',
    director: '+998 (94) 590-08-08',
  },
  schedule: {},
  updatedAt: Date.now(),
};

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'school-state.json');

function loadState(): SchoolState {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<SchoolState>;
      return {
        phones: {
          reception: parsed.phones?.reception || DEFAULT_STATE.phones.reception,
          director: parsed.phones?.director || DEFAULT_STATE.phones.director,
        },
        schedule: parsed.schedule && typeof parsed.schedule === 'object' ? parsed.schedule : {},
        updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : Date.now(),
      };
    }
  } catch (err) {
    console.error('Failed to read school state file:', err);
  }
  return { ...DEFAULT_STATE };
}

function persistState(state: SchoolState): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write school state file:', err);
  }
}

function isValidPhoneCode(code: unknown): boolean {
  if (typeof code !== 'string') return false;
  return code.trim() === '5244';
}

function isValidScheduleCode(code: unknown): boolean {
  if (typeof code !== 'string') return false;
  const normalized = code.trim().toLowerCase().replace(/\s+/g, ' ');
  return normalized === '71 maktab' || normalized === '71-maktab' || normalized === '5244';
}

async function startServer() {
  const app = express();
  app.use(express.json());

  let schoolState: SchoolState = loadState();
  const sseClients = new Set<Response>();

  const broadcastState = () => {
    const payload = `data: ${JSON.stringify(schoolState)}\n\n`;
    for (const client of sseClients) {
      try {
        client.write(payload);
      } catch {
        sseClients.delete(client);
      }
    }
  };

  app.get('/api/school-state', (_req: Request, res: Response) => {
    res.json(schoolState);
  });

  app.get('/api/school-state/stream', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    res.write(`data: ${JSON.stringify(schoolState)}\n\n`);
    sseClients.add(res);

    const keepAlive = setInterval(() => {
      try {
        res.write(': keepalive\n\n');
      } catch {
        clearInterval(keepAlive);
      }
    }, 25_000);

    req.on('close', () => {
      clearInterval(keepAlive);
      sseClients.delete(res);
    });
  });

  app.post('/api/school-state/verify-phone-code', (req: Request, res: Response) => {
    const { code } = req.body as { code?: string };
    if (!isValidPhoneCode(code)) {
      res.status(403).json({ ok: false, error: "Kod noto'g'ri." });
      return;
    }
    res.json({ ok: true });
  });

  app.put('/api/school-state/phones', (req: Request, res: Response) => {
    const { code, phones } = req.body as {
      code?: string;
      phones?: Partial<SchoolPhones>;
    };

    if (!isValidPhoneCode(code)) {
      res.status(403).json({ error: "Kod noto'g'ri." });
      return;
    }

    const nextReception =
      typeof phones?.reception === 'string' && phones.reception.trim()
        ? phones.reception.trim().slice(0, 40)
        : schoolState.phones.reception;
    const nextDirector =
      typeof phones?.director === 'string' && phones.director.trim()
        ? phones.director.trim().slice(0, 40)
        : schoolState.phones.director;

    schoolState = {
      ...schoolState,
      phones: {
        reception: nextReception,
        director: nextDirector,
      },
      updatedAt: Date.now(),
    };

    persistState(schoolState);
    broadcastState();
    res.json(schoolState);
  });

  app.put('/api/school-state/schedule', (req: Request, res: Response) => {
    const { code, schedule } = req.body as {
      code?: string;
      schedule?: Record<string, string>;
    };

    if (!isValidScheduleCode(code)) {
      res.status(403).json({ error: "Kod noto'g'ri." });
      return;
    }

    const sanitized: Record<string, string> = {};
    if (schedule && typeof schedule === 'object') {
      for (const [key, value] of Object.entries(schedule)) {
        if (typeof value === 'string' && value.trim()) {
          sanitized[key.slice(0, 32)] = value.trim().slice(0, 60);
        }
      }
    }

    schoolState = {
      ...schoolState,
      schedule: sanitized,
      updatedAt: Date.now(),
    };

    persistState(schoolState);
    broadcastState();
    res.json(schoolState);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
