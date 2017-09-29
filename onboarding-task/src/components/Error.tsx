import * as React from 'react';
import { IAction } from '../actions/IAction';
import * as PropTypes from 'prop-types';

export interface IErrorDataProps {
  id: IdType;
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

export const Error: React.StatelessComponent<IErrorProps> = (props) =>
  <div className="alert alert-danger"> {props.errorText} <i className="pull-right glyphicon glyphicon-remove" onClick={props.onClick} /></div>;

Error.displayName = 'Error';
Error.propTypes = errorPropTypes;
