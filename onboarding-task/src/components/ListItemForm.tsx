import * as React from 'react';

import { IAction } from '../interfaces/IAction';
import { ListItemSavedFlag } from './utilComponents/ListItemSavedFlag';
import { ListItemValidatedInput } from './utilComponents/ListItemValidatedInput';
import { isValid } from '../utils/validationHelpers/itemValidationHelpers';

interface IListItemFormDataProps {
  readonly index: number;
  readonly inputValue: string;
  readonly savedOnServer: boolean;
}

interface IListItemFormCallbacksProps {
  readonly onFormSubmit: (input: string) => IAction;
  readonly onFormCancelClick: () => IAction;
  readonly onFormDeleteClick: () => IAction;
}

interface IListItemFormState {
  readonly input: string;
}

class ListItemForm extends React.PureComponent<IListItemFormDataProps & IListItemFormCallbacksProps, IListItemFormState> {

  static displayName = 'ListItemForm';

  constructor(props: IListItemFormDataProps & IListItemFormCallbacksProps) {
    super(props);

    this.state = {
      input: props.inputValue,
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onInputChange(input: string) {
    this.setState({ input });
  }

  _onSubmit(event: any) {
    event.preventDefault();
    this.props.onFormSubmit(this.state.input);
  }

  render() {
    return (
      <div className="container-fluid">
        <form className="form-inline col-md-10" onSubmit={this._onSubmit}>
          {this.props.index}. <ListItemValidatedInput onInputChange={this._onInputChange} input={this.state.input} />
        <button type="submit" className="btn btn-primary" disabled={!isValid(this.state.input)} > Change</button>
        <button type="button" className="btn btn-default" onClick={this.props.onFormCancelClick}> Cancel</button>
        <button type="button" className="btn btn-danger" onClick={this.props.onFormDeleteClick}> Delete</button>
      </form>
      <ListItemSavedFlag saved={this.props.savedOnServer}/>
    </div>
    );
  }
}

export { ListItemForm, IListItemFormDataProps, IListItemFormCallbacksProps };
