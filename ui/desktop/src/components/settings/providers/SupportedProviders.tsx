export default interface ProviderDetails {
  id: string; // lowercase provider name e.g. 'openai'
  name: string; // e.g. "OpenAI"
  description: string;
  isConfigured?: boolean; // determined upon settings page instantiation (taken from ActiveKeysContext)
  actions: ConfigurationAction[];
}

// contains basic, common actions like edit, add, delete etc
// logic for whether or not these buttons get shown is stored in the actions/ folder
// specific providers may want specific methods to handle these operations -- TODO
interface ConfigurationAction {
  renderButton: React.JSX.Element; // button to render
  func: () => void; // what will happen if user clicks the button
}
