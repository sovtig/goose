import Layout from "@theme/Layout";
import { Download, Terminal, Star, ArrowLeft, Info } from "lucide-react";
import { Button } from "@site/src/components/ui/button";
import { Badge } from "@site/src/components/ui/badge";
import { getGooseInstallLink } from "@site/src/utils/install-links";
import { useLocation } from '@docusaurus/router';
import { useEffect, useState } from "react";
import type { MCPServer } from "@site/src/types/server";
import { fetchMCPServers } from "@site/src/utils/mcp-servers";
import Link from '@docusaurus/Link';

function ExtensionDetail({ server }: { server: MCPServer }) {
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex gap-8 max-w-5xl mx-auto py-8">
          <div>
            <Link to="/extensions" className="no-underline">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-textStandard hover:text-textProminent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>

          <div className="bg-bgApp rounded-2xl border border-borderSubtle p-8 w-full">
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-4">
                <h1 className="font-medium text-5xl text-textProminent m-0">
                  {server.name}
                </h1>
                {server.is_builtin && (
                  <Badge variant="secondary" className="text-sm">
                    Built-in
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-xl text-textSubtle m-0">{server.description}</p>
              </div>

              {server.installation_notes && (
                <div>
                  <p className="text-md text-textSubtle m-0">{server.installation_notes}</p>
                </div>
              )}

              <div className="space-y-2">
                {server.is_builtin ? (
                  <div className="flex items-center gap-2">
                    <Info style={{ width: '12px', height: '12px' }} className="text-textSubtle shrink-0" />
                    <span style={{ fontSize: '12px' }} className="text-textSubtle leading-normal">
                      Can be enabled in the goose settings page
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-textStandard">
                      <Terminal className="h-4 w-4" />
                      <h4 className="font-medium m-0">Command</h4>
                    </div>
                    <div className="bg-bgSubtle dark:bg-gray-900 p-4 rounded-lg">
                      <code className="text-sm text-textStandard">
                        {`goose session --with-extension "${server.command}"`}
                      </code>
                    </div>
                  </>
                )}
              </div>

              {server.environmentVariables && server.environmentVariables.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-textStandard m-0">Environment Variables</h2>
                  <div>
                    {server.environmentVariables.map((env) => (
                      <div
                        key={env.name}
                        className="border-b border-borderSubtle pb-4 mb-4 last:border-0"
                      >
                        <div className="text-sm text-textStandard">{env.name}</div>
                        <div className="text-textSubtle text-sm mt-1">
                          {env.description}
                        </div>
                        {env.required && (
                          <Badge variant="secondary" className="mt-2">
                            Required
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <a
                  href={server.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-textSubtle text-sm hover:text-textProminent transition-colors no-underline"
                >
                  <Star className="h-4 w-4" />
                  <span>{server.githubStars} on Github</span>
                </a>

                {server.is_builtin ? (
                  <div
                    className="inline-block"
                    title="This extension is built into goose and can be enabled in the settings page"
                  >
                    <Badge variant="secondary" className="text-xs cursor-help">
                      Built-in
                    </Badge>
                  </div>
                ) : (
                  <a
                    href={getGooseInstallLink(server)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <Button
                      variant="link"
                      className="group flex items-center justify-center text-xs leading-[14px] text-textSubtle hover:text-textProminent px-0 transition-all"
                      title="Install with Goose"
                    >
                      <span>Install</span>
                      <Download className="h-4 w-4 ml-2 group-hover:text-[#FA5204]" />
                    </Button>
                  </a>
                )}
              </div>
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
        // Get the ID from the query parameter
        const params = new URLSearchParams(location.search);
        const id = params.get('id');
        if (!id) {
          setError("No extension ID provided");
          return;
        }
        const foundServer = servers.find((s) => s.id === id);
        if (foundServer) {
          setServer(foundServer);
        } else {
          setError("Extension not found");
        }
      } catch (err) {
        setError("Failed to load extension details");
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
        <div className="container mx-auto">
          <div className="flex gap-8 max-w-5xl mx-auto py-8">
            <div>
              <Link to="/extensions" className="no-underline">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-textStandard hover:text-textProminent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
            <div className="animate-pulse w-full">
              <div className="h-12 w-48 bg-bgSubtle rounded-lg mb-4"></div>
              <div className="h-6 w-full bg-bgSubtle rounded-lg mb-2"></div>
              <div className="h-6 w-2/3 bg-bgSubtle rounded-lg"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !server) {
    return (
      <Layout>
        <div className="container mx-auto">
          <div className="flex gap-8 max-w-5xl mx-auto py-8">
            <div>
              <Link to="/extensions" className="no-underline">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-textStandard hover:text-textProminent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
            <div className="bg-bgApp rounded-2xl border border-borderSubtle p-8 w-full">
              <div className="text-red-500">{error || "Extension not found"}</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return <ExtensionDetail server={server} />;
}