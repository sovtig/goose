import ProviderDetails from './SupportedProviders';
import DefaultProviderActions from '@/src/components/settings/providers/subcomponents/actions/DefaultProviderActions';
import OllamaActions from '@/src/components/settings/providers/subcomponents/actions/OllamaActions';

export interface ProviderRegistry {
  name: string;
  details: ProviderDetails;
}

export const PROVIDER_REGISTRY: ProviderRegistry[] = [
  {
    name: 'OpenAI',
    details: {
      id: 'openai',
      name: 'OpenAI',
      description: 'Access GPT-4, GPT-3.5 Turbo, and other OpenAI models',
      actions: [
        {
          renderButton: DefaultProviderActions,
          func: () => {},
        },
      ],
    },
  },
  {
    name: 'Anthropic',
    details: {
      id: 'anthropic',
      name: 'Anthropic',
      description: 'Access Claude and other Anthropic models',
      actions: [
        {
          renderButton: DefaultProviderActions,
          func: () => {},
        },
      ],
    },
  },
  {
    name: 'Google',
    details: {
      id: 'google',
      name: 'Google',
      description: 'Access Gemini and other Google AI models',
      actions: [
        {
          renderButton: DefaultProviderActions,
          func: () => {},
        },
      ],
    },
  },
  {
    name: 'Groq',
    details: {
      id: 'groq',
      name: 'Groq',
      description: 'Access Mixtral and other Groq-hosted models',
      actions: [
        {
          renderButton: DefaultProviderActions,
          func: () => {},
        },
      ],
    },
  },
  {
    name: 'Databricks',
    details: {
      id: 'databricks',
      name: 'Databricks',
      description: 'Access models hosted on your Databricks instance',
      actions: [
        {
          renderButton: DefaultProviderActions,
          func: () => {},
        },
      ],
    },
  },
  {
    name: 'OpenRouter',
    details: {
      id: 'openrouter',
      name: 'OpenRouter',
      description: 'Access a variety of AI models through OpenRouter',
      actions: [
        {
          renderButton: DefaultProviderActions,
          func: () => {},
        },
      ],
    },
  },
  {
    name: 'Ollama',
    details: {
      id: 'ollama',
      name: 'Ollama',
      description: 'Run and use open-source models locally',
      actions: [
        {
          renderButton: OllamaActions,
          func: () => {},
        },
      ],
    },
  },
];
