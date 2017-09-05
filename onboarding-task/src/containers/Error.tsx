import { Error as ErrorComponent, IErrorDataProps } from '../components/Error';
import { connect } from 'react-redux';
import * as React from 'react';
import { removeError } from '../actions/actionCreators';
import { IAppState } from '../reducers/IAppState';

type IErrorContainerProps = {
  id: IdType
};

 const mapStateToProps = ({nodesList: {}}: IAppState, {id }: IErrorContainerProps): IErrorDataProps => ({
  id
 });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClick: () => dispatch(removeError())
});

export const Error: React.ComponentClass<IErrorContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
