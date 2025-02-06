import React from 'react';
import CardContainer from './subcomponents/CardContainer';
import CardHeader from './subcomponents/CardHeader';
import { OllamaConfigDetails } from './subcomponents/CardHeader';

export function ProviderCard({
  name,
  isConfigured,
  ollamaConfig,
}: {
  name: string;
  isConfigured: boolean;
  ollamaConfig: OllamaConfigDetails;
}) {
  return (
    <CardContainer>
      <CardHeader name={name} isConfigured={isConfigured} ollamaConfig={ollamaConfig} />
    </CardContainer>
  );
}
