import React from 'react';
import { CardActionsProps } from '../CardBody';
import OllamaActions from '../actions/OllamaActions';

// TODO: factory? map provider with action determination functions like 'Ollama': [showOllamaActions]

// functions to help determine if a button should be displayed
export function showOllamaActions({ name, isConfigured, ollamaConfig }: CardActionsProps) {
  if (name === 'Ollama') {
    return <OllamaActions isConfigured={isConfigured} ollamaConfig={ollamaConfig} />;
  }
}
