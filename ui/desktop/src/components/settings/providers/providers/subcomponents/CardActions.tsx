import React from 'react';
import ConfigurationAction from '../interfaces/ConfigurationAction';

interface CardActionsProps {
  actions: ConfigurationAction[];
}

export default function CardActions({ actions }: CardActionsProps) {
  return (
    <div className="space-x-2">
      {actions.map((action) => {
        // Store the rendered button in a variable first
        const ButtonElement = action.renderButton();

        // Verify it's a valid React element
        if (React.isValidElement(ButtonElement)) {
          console.log('apparently a valid element');
          return <React.Fragment key={action.id}>{ButtonElement}</React.Fragment>;
        }

        // Log an error if we get an invalid element
        console.error('Invalid React element returned from renderButton for action:', action.id);
        return null;
      })}
    </div>
  );
}
