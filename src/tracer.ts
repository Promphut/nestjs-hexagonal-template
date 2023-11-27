'use strict';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { envDetector, Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { IncomingMessage } from 'http';

import { k8s, traceExporterUrl } from './configs/log.config.env';

const exporterOptions = {
  url: traceExporterUrl,
};
const httpInstrumentConfig = {
  ignoreIncomingRequestHook: (req: IncomingMessage) => req.url == '/health',
};

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations({ '@opentelemetry/instrumentation-http': httpInstrumentConfig })],
  resourceDetectors: [envDetector],
  resource: new Resource({
    [SemanticResourceAttributes.K8S_NODE_NAME]: k8s.nodeName,
    [SemanticResourceAttributes.K8S_POD_NAME]: k8s.podName,
    [SemanticResourceAttributes.K8S_NAMESPACE_NAME]: k8s.namespace,
  }),
});

export const start = () => sdk.start();

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    sdk.shutdown();
  });
});
