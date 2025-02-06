import React from 'react';
import OllamaActions from './actions/OllamaActions';
import { OllamaConfigDetails } from './CardHeader';

interface CardBodyProps {
  name: string;
  children: React.ReactNode;
  ollamaConfig?: OllamaConfigDetails;
  isConfigured: boolean;
  onTakeoff?: () => void;
}

export interface CardActionsProps {
  name: string;
  isConfigured: boolean;
  ollamaConfig: OllamaConfigDetails;
}

function ConfigurationActions({ name, isConfigured, ollamaConfig }: CardActionsProps) {
  return (
    <div className="space-x-2">
      {name === 'Ollama' && (
        <OllamaActions isConfigured={isConfigured} ollamaConfig={ollamaConfig} />
      )}
    </div>
  );
}

export default function CardBody({
  name,
  children,
  isConfigured,
  ollamaConfig,
  onTakeoff,
}: CardBodyProps) {
  return (
    <div className="space-x-2 text-center flex items-center justify-between">
      <ConfigurationActions name={name} isConfigured={isConfigured} ollamaConfig={ollamaConfig} />
    </div>
  );
}
