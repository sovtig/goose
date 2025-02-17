import React from 'react';
import Layout from '@theme/Layout';
import { MCPServer } from '@site/src/types/server';
import { Info, Star, Download } from 'lucide-react';
import { Badge } from '@site/src/components/ui/badge';
import { getGooseInstallLink } from '@site/src/utils/install-links';

interface Props {
  readonly extension: MCPServer;
}

export default function ExtensionDetail(props: Props): JSX.Element {
  const { extension } = props;
  
  if (!extension) {
    return (
      <Layout title="Extension Not Found">
        <main className="container mx-auto px-4 py-16">
          <h1>Extension Not Found</h1>
          <p>The requested extension could not be found.</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={extension.name}>
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-4xl font-medium">{extension.name}</h1>
            {extension.is_builtin && (
              <Badge variant="secondary" className="text-sm">
                Built-in
              </Badge>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl mb-8">{extension.description}</p>

            <div className="flex items-center gap-8 my-8">
              <a
                href={extension.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-textSubtle hover:text-textProminent transition-colors no-underline"
              >
                <Star className="h-5 w-5" />
                <span>{extension.githubStars} stars on GitHub</span>
              </a>

              {extension.is_builtin ? (
                <div className="flex items-center gap-2 text-textSubtle">
                  <Info className="h-5 w-5" />
                  <span>Can be enabled in the goose settings page</span>
                </div>
              ) : (
                <a
                  href={getGooseInstallLink(extension)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-textSubtle hover:text-textProminent transition-colors no-underline"
                >
                  <Download className="h-5 w-5" />
                  <span>Install Extension</span>
                </a>
              )}
            </div>

            {extension.command && (
              <div className="my-8">
                <h2>Installation Command</h2>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                  <code>{`goose session --with-extension "${extension.command}"`}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}