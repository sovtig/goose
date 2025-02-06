import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../../../ui/Tooltip';
import { Button } from '../../../../ui/button';
import { Portal } from '@radix-ui/react-portal';
import { RefreshCw, Plus, Settings, X, Rocket } from 'lucide-react';

interface OllamaConfigDetails {
  is_set: boolean;
  location: 'app' | 'host' | null;
}

interface CardActionsProps {
  name: string;
  isConfigured: boolean;
  ollamaConfig?: OllamaConfigDetails;
  hasRequiredKeys?: boolean;
  tooltipText: string;
  showSettings?: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
  onConfigure?: () => void;
  onAddKeys?: () => void;
  onRefreshOllama?: (e: React.MouseEvent) => void;
  onTakeoff?: () => void;
  showTakeoff?: boolean;
}

export function CardActions({
  name,
  isConfigured,
  ollamaConfig,
  hasRequiredKeys,
  tooltipText,
  showSettings,
  showDelete,
  onDelete,
  onConfigure,
  onAddKeys,
  onRefreshOllama,
  onTakeoff,
  showTakeoff,
}: CardActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-x-2">
        {/* Refresh button for unconfigured Ollama */}
        {!isConfigured && name === 'Ollama' && onRefreshOllama && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  onClick={onRefreshOllama}
                  className="rounded-full h-7 w-7 p-0 bg-bgApp hover:bg-bgApp shadow-none text-textSubtle
                             border border-borderSubtle hover:border-borderStandard hover:text-textStandard transition-colors"
                >
                  <RefreshCw className="!size-4" />
                </Button>
              </TooltipTrigger>
              <Portal>
                <TooltipContent side="top" align="center" className="z-[9999]">
                  <p>Click to re-check for active Ollama app.</p>
                </TooltipContent>
              </Portal>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Plus button for app-based Ollama */}
        {isConfigured && name === 'Ollama' && ollamaConfig?.location === 'app' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfigure?.();
                  }}
                  className="rounded-full h-7 w-7 p-0 bg-bgApp hover:bg-bgApp shadow-none text-textSubtle
                             border border-borderSubtle hover:border-borderStandard hover:text-textStandard transition-colors"
                >
                  <Plus className="!size-4" />
                </Button>
              </TooltipTrigger>
              <Portal>
                <TooltipContent side="top" align="center" className="z-[9999]">
                  <p>Use specific host url for Ollama.</p>
                </TooltipContent>
              </Portal>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Gear button for host-based Ollama */}
        {isConfigured && name === 'Ollama' && ollamaConfig?.location === 'host' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfigure?.();
                  }}
                  className="rounded-full h-7 w-7 p-0 bg-bgApp hover:bg-bgApp shadow-none text-textSubtle
                             border border-borderSubtle hover:border-borderStandard hover:text-textStandard transition-colors"
                >
                  <Settings className="!size-4" />
                </Button>
              </TooltipTrigger>
              <Portal>
                <TooltipContent side="top" align="center" className="z-[9999]">
                  <p>Edit Ollama host url.</p>
                </TooltipContent>
              </Portal>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Default "Add Keys" Button for other providers */}
        {!isConfigured && onAddKeys && hasRequiredKeys && name !== 'Ollama' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddKeys();
                  }}
                  className="rounded-full h-7 w-7 p-0 bg-bgApp hover:bg-bgApp shadow-none text-textSubtle
                             border border-borderSubtle hover:border-borderStandard hover:text-textStandard transition-colors"
                >
                  <Plus className="!size-4" />
                </Button>
              </TooltipTrigger>
              <Portal>
                <TooltipContent side="top" align="center" className="z-[9999]">
                  <p>{tooltipText}</p>
                </TooltipContent>
              </Portal>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Gear icon for configured providers (non-Ollama) */}
        {isConfigured && showSettings && hasRequiredKeys && name !== 'Ollama' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-7 w-7 p-0 bg-bgApp hover:bg-bgApp shadow-none text-textSubtle
                             border border-borderSubtle hover:border-borderStandard hover:text-textStandard transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfigure?.();
                  }}
                >
                  <Settings className="!size-4" />
                </Button>
              </TooltipTrigger>
              <Portal>
                <TooltipContent side="top" align="center" className="z-[9999]">
                  <p>Configure {name} settings</p>
                </TooltipContent>
              </Portal>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Delete button */}
        {showDelete && hasRequiredKeys && isConfigured && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-7 w-7 p-0 bg-bgApp hover:bg-bgApp shadow-none text-textSubtle
                             border border-borderSubtle hover:border-borderStandard hover:text-textStandard transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                  }}
                >
                  <X className="!size-4" />
                </Button>
              </TooltipTrigger>
              <Portal>
                <TooltipContent side="top" align="center" className="z-[9999]">
                  <p>Remove {name} API Key or Host</p>
                </TooltipContent>
              </Portal>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Rocket (launch) button */}
      {isConfigured && onTakeoff && showTakeoff !== false && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onTakeoff();
                }}
                className="rounded-full h-7 w-7 p-0 bg-bgApp hover:bg-bgApp shadow-none text-textSubtle
                           border border-borderSubtle hover:border-borderStandard hover:text-textStandard transition-colors"
              >
                <Rocket className="!size-4" />
              </Button>
            </TooltipTrigger>
            <Portal>
              <TooltipContent side="top" align="center" className="z-[9999]">
                <p>Launch goose with {name}</p>
              </TooltipContent>
            </Portal>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
