import React from 'react';

// Functions for string / string-based element creation (e.g. tooltips for each provider, descriptions, etc)
export function OllamaNotConfiguredTooltipMessage() {
  return (
    <p>
      To use, either the{' '}
      <a
        href="https://ollama.com/download"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Ollama app
      </a>{' '}
      must be installed on your machine and open, or you must enter a value for OLLAMA_HOST.
    </p>
  );
}

export function ConfiguredProviderTooltipMessage(name: string) {
  return `${name} provider is configured`;
}

export function ProviderDescription(name: { name: string }) {
  function getProviderDescription(provider) {
    const descriptions = {
      OpenAI: 'Access GPT-4, GPT-3.5 Turbo, and other OpenAI models',
      Anthropic: 'Access Claude and other Anthropic models',
      Google: 'Access Gemini and other Google AI models',
      Groq: 'Access Mixtral and other Groq-hosted models',
      Databricks: 'Access models hosted on your Databricks instance',
      OpenRouter: 'Access a variety of AI models through OpenRouter',
      Ollama: 'Run and use open-source models locally',
    };
    return descriptions[provider] || `Access ${provider} models`;
  }
  return (
    <p className="text-xs text-textSubtle mt-1.5 mb-3 leading-normal overflow-y-auto max-h-[54px] ">
      {getProviderDescription(name)}
    </p>
  );
}
