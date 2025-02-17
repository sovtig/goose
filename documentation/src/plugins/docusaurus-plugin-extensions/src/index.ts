import type { LoadContext, Plugin } from '@docusaurus/types';
import type { PluginOptions } from './types';
import type { MCPServer } from './types/server';
import { fetchMCPServers } from './utils/mcp-servers';
import path from 'path';
import fs from 'fs';

export default function pluginExtensions(
  context: LoadContext,
  options: PluginOptions,
): Plugin<MCPServer[]> {
  const { siteDir } = context;

  return {
    name: 'docusaurus-plugin-extensions',

    async loadContent(): Promise<MCPServer[]> {
      // Fetch all extensions data
      const extensions = await fetchMCPServers();
      return extensions;
    },

    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;
      const extensions: MCPServer[] = content;

      // Create individual data files for each extension
      await Promise.all(
        extensions.map(async (extension: MCPServer) => {
          // Create a JSON file containing the extension data
          const dataPath = await createData(
            `extension-${extension.id}.json`,
            JSON.stringify(extension)
          );

          // Add route for each extension
          addRoute({
            path: `/extensions/detail/${extension.id}`,
            component: '@site/src/components/extension-detail.tsx',
            modules: {
              extension: dataPath,
            },
            exact: true,
          });

          // Log route creation for debugging
          console.log(`Created route for extension: /extensions/detail/${extension.id}`);
        })
      );
    },

    // Register the component globally
    getThemePath() {
      return path.join(__dirname, '..', 'components');
    },

    // This ensures our routes are generated during build time
    async postBuild({ outDir }) {
      const extensions = await fetchMCPServers();
      
      // Create a directory for static extension data
      const extensionsDir = path.join(outDir, 'extensions-data');
      if (!fs.existsSync(extensionsDir)) {
        fs.mkdirSync(extensionsDir);
      }

      // Write extension data as static JSON files
      extensions.forEach((extension: MCPServer) => {
        fs.writeFileSync(
          path.join(extensionsDir, `${extension.id}.json`),
          JSON.stringify(extension)
        );
      });
    },
  };
}