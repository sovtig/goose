import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../../ui/Tooltip';
import { Portal } from '@radix-ui/react-portal';
import { Check } from 'lucide-react';
import { ExclamationButton, GreenCheckButton } from './actions/ActionButtons';
import {
  ConfiguredProviderTooltipMessage,
  OllamaNotConfiguredTooltipMessage,
  ProviderDescription,
} from './utils/StringUtils';

export interface OllamaConfigDetails {
  is_set: boolean;
  location: 'app' | 'host' | null;
}

interface CardHeaderProps {
  name: string;
  isConfigured: boolean;
  ollamaConfig?: OllamaConfigDetails;
}

function ProviderNameAndStatus({ name, isConfigured, ollamaConfig }: CardHeaderProps) {
  const showOllamaExclamation = !isConfigured && name === 'Ollama';
  return (
    <div className="flex items-center">
      {CardTitle(name)}

      {/* Configured state: Green check */}
      {isConfigured && <GreenCheckButton tooltip={ConfiguredProviderTooltipMessage(name)} />}

      {/* Not Configured + Ollama => Exclamation */}
      {showOllamaExclamation && <ExclamationButton tooltip={OllamaNotConfiguredTooltipMessage()} />}
    </div>
  );
}

function CardTitle(name: string) {
  return <h3 className="text-base font-medium text-textStandard truncate mr-2">{name}</h3>;
}

// Name and status icon
export default function CardHeader({ name, isConfigured, ollamaConfig }: CardHeaderProps) {
  return (
    <>
      <ProviderNameAndStatus name={name} isConfigured={isConfigured} ollamaConfig={ollamaConfig} />
      <ProviderDescription name={name} />
    </>
  );
}
