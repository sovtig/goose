import { required_keys } from '@/src/components/settings/models/hardcoded_stuff';
import { PROVIDER_REGISTRY, ProviderRegistry } from './ProviderRegistry';
import React from 'react';
import { ProviderCard } from '@/src/components/settings/providers/ProviderCard';

// Common interfaces and helper functions
interface Provider {
  id: string;
  name: string;
  isConfigured: boolean;
  description: string;
}

interface ProviderGridProps {
  providers: Provider[];
  isSelectable?: boolean;
  showSettings?: boolean;
  showDelete?: boolean;
  selectedId?: string | null;
  onSelect?: (providerId: string) => void;
  onAddKeys?: (provider: Provider) => void;
  onConfigure?: (provider: Provider) => void;
  onDelete?: (provider: Provider) => void;
  onTakeoff?: (provider: Provider) => void;
  showTakeoff?: boolean;
}

function GridLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 auto-rows-fr max-w-full [&_*]:z-20">
      {children}
    </div>
  );
}

function ProviderCards({ providers }: { providers: ProviderRegistry[] }) {
  return (
    <>
      {providers.map((provider) => (
        <ProviderCard
          key={provider.name} // helps React efficiently update and track components when rendering lists
          name={provider.name}
          isConfigured={false}
          ollamaConfig={null}
        />
      ))}
    </>
  );
}

export default function ProviderGrid({ providers }: { providers: ProviderRegistry[] }) {
  return (
    <GridLayout>
      <ProviderCards providers={providers} />
    </GridLayout>
  );
}

// export function ProviderGrid({
//                                      providers,
//                                      isSelectable = false,
//                                      showSettings = false,
//                                      showDelete = false,
//                                      selectedId = null,
//                                      onSelect,
//                                      onAddKeys,
//                                      onConfigure,
//                                      onDelete,
//                                      showTakeoff,
//                                      onTakeoff,
//                                  }: ProviderGridProps) {
//     return (
//         <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 auto-rows-fr max-w-full [&_*]:z-20">
//             {providers.map((provider) => {
//                 const hasRequiredKeys = required_keys[provider.name]?.length > 0;
//                 return (
//                     <BaseProviderCard
//                         key={provider.id}
//                         name={provider.name}
//                         description={provider.description}
//                         isConfigured={provider.isConfigured}
//                         isSelected={selectedId === provider.id}
//                         isSelectable={isSelectable}
//                         onSelect={() => onSelect?.(provider.id)}
//                         onAddKeys={() => onAddKeys?.(provider)}
//                         onConfigure={() => onConfigure?.(provider)}
//                         onDelete={() => onDelete?.(provider)}
//                         onTakeoff={() => onTakeoff?.(provider)}
//                         showSettings={showSettings}
//                         showDelete={showDelete}
//                         hasRequiredKeys={hasRequiredKeys}
//                         showTakeoff={showTakeoff}
//                     />
//                 );
//             })}
//         </div>
//     );
// }
