const logLevelType = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
type LogLevelType = (typeof logLevelType)[number];
const logLevel = (process.env.LOG_LEVEL as LogLevelType) || 'info';

const isPinoPretty = process.env.IS_PINO_PRETTY === 'true';
const pinoTransport = isPinoPretty
  ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    }
  : undefined;

export const pinoHttp = {
  level: logLevel,
  transport: pinoTransport,
};
export const isLogGlobalPayload = process.env.IS_LOG_GLOBAL_PAYLOAD === 'true';

export const traceExporterUrl = process.env.TRACE_EXPORTER_URL;
export const k8s = {
  nodeName: process.env.NODE_NAME,
  podName: process.env.POD_NAME,
  namespace: process.env.POD_NAMESPACE,
};
