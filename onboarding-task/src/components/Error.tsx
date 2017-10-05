import * as React from 'react';
import { IAction } from '../actions/IAction';
import * as PropTypes from 'prop-types';

export interface IErrorDataProps {
  id: Guid;
  errorText: string;
}

export interface IErrorCallbacksProps {
  onClick: () => IAction;
}

type IErrorProps = IErrorDataProps & IErrorCallbacksProps;

const errorPropTypes: React.ValidationMap<IErrorProps> = {
  id: PropTypes.any,
  onClick: PropTypes.func.isRequired
};

export const Error: React.StatelessComponent<IErrorProps> = ({errorText, onClick}) =>
  <div className="alert alert-danger">
    <b> {errorText} </b>
    <button onClick={onClick} type="button" className="pull-right btn btn-default btn-xs">
      <span className="glyphicon glyphicon-remove" hidden={true}/>
    </button>
  </div>;

Error.displayName = 'Error';
Error.propTypes = errorPropTypes;
