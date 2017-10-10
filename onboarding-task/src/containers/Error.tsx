import { Error as ErrorComponent, IErrorDataProps } from '../components/Error';
import { connect } from 'react-redux';
import * as React from 'react';
import { deleteError } from '../actions/actionCreators';
import { IAppState } from '../reducers/IAppState';

type IErrorContainerProps = {
  id: Guid
};

const mapStateToProps = ({nodesList: {errors}}: IAppState, {id}: IErrorContainerProps): IErrorDataProps => ({
  id,
  errorText: errors.get(id)
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: IErrorContainerProps) => ({
  onClick: () => dispatch(deleteError(id))
});

export const Error: React.ComponentClass<IErrorContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
