import Layout from "@theme/Layout";
import { Download, Terminal } from "lucide-react";
import { Button } from "@site/src/components/ui/button";
import { Badge } from "@site/src/components/ui/badge";
import { getGooseInstallLink } from "@site/src/utils/install-links";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import { useEffect, useState } from "react";
import type { MCPServer } from "@site/src/types/server";
import { fetchMCPServers } from "@site/src/utils/mcp-servers";

function ExtensionDetail({ server }: { server: MCPServer }) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-medium">{server.name}</h1>
          {server.is_builtin && (
            <Badge variant="secondary" className="text-sm">
              Built-in
            </Badge>
          )}
        </div>

        <p className="text-lg mt-4 text-gray-600">{server.description}</p>

        {!server.is_builtin && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-5 w-5" />
              <h2 className="text-xl font-medium">Installation</h2>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
              <code className="text-lg">
                {`goose session --with-extension "${server.command}"`}
              </code>
            </div>
            <div className="mt-4">
              <a
                href={getGooseInstallLink(server)}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button className="group flex items-center gap-2">
                  Install with Goose
                  <Download className="h-4 w-4 group-hover:text-[#FA5204]" />
                </Button>
              </a>
            </div>
          </div>
        )}

        {server.is_builtin && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-5 w-5" />
              <h2 className="text-xl font-medium">Built-in Extension</h2>
            </div>
            <p className="text-gray-600">
              This extension is built into goose and can be enabled in the settings
              page.
            </p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">Additional Information</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Repository</h3>
              <a
                href={server.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                View on GitHub
              </a>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-medium mb-2">GitHub Stars</h3>
              <p>{server.githubStars}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function DetailPage(): JSX.Element {
  const location = useLocation();
  const [server, setServer] = useState<MCPServer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServer = async () => {
      try {
        setLoading(true);
        setError(null);
        const servers = await fetchMCPServers();
        // Extract the ID from the URL path
        const pathParts = location.pathname.split('/');
        const id = pathParts[pathParts.length - 1];
        const foundServer = servers.find((s) => s.id === id);
        if (foundServer) {
          setServer(foundServer);
        } else {
          setError("Server not found");
        }
      } catch (err) {
        setError("Failed to load server details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadServer();
  }, [location]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4">
          <div className="py-8">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error || !server) {
    return (
      <Layout>
        <div className="container mx-auto px-4">
          <div className="py-8 text-red-500">{error || "Server not found"}</div>
        </div>
      </Layout>
    );
  }

  return <ExtensionDetail server={server} />;
}