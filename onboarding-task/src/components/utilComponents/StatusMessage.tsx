import * as React from 'react';

import { MessageType } from '../../utils/MessageType';

const ErrorStatusMessage = ({ error }: { error: string }) =>
  error ? (
    <div className="alert alert-danger" role="alert">
      <strong>Error!</strong> {error}
    </div>
  )
  : <noscript />;

const SuccessStatusMessage = ({ successMessage }: { successMessage: string }) =>
  successMessage ? (
    <div className="alert alert-success" role="alert">
      <strong>Success!</strong> {successMessage}
    </div>
  )
  : <noscript />;

const StatusMessage = ({ message , messageType }: { message: string; messageType: MessageType }) => {
  switch (messageType) {
    case 'Error':
      return <ErrorStatusMessage error={message} />;

    case 'Success':
      return <SuccessStatusMessage successMessage={message} />;

    default:
      return <noscript />;
  }
};

export { StatusMessage };
