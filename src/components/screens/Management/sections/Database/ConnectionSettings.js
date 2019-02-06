import React, { Component } from 'react';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import DatabaseDropdown, { MONGO_DB, DYNAMO_DB } from './DatabaseDropdown';
import saveIcon from './save.svg';

class DatabaseConnectionSettings extends Component {
  constructor() {
    super();

    this.state = {
      type: '',
      name: '',
      region: '',
      endpoint: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleDBTypeChange = this.handleDBTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleDBTypeChange(type) {
    this.setState({ type });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { type, name, region, endpoint } = this.state;

    return (
      <div className="iap-db-connection-section">
        <span className="iap-section__title">
          Connection settings
        </span>

        <p className="iap-section__description">
          You should select from supported database types and provide a connection for it.
        </p>

        <form className="iap-db-form" onSubmit={this.handleSubmit}>
          <Field label="Database type">
            <DatabaseDropdown
              selectedValue={type}
              onChange={this.handleDBTypeChange}
            />
          </Field>

          {type === DYNAMO_DB && (
            <Field label="Region">
              <Input
                name="region"
                value={region}
                placeholder="e.g. ap-northeast-3"
                onChange={this.handleInput}
              />
            </Field>
          )}

          {type === MONGO_DB && (
            <Field label="Name">
              <Input
                name="name"
                value={name}
                autoComplete="off"
                placeholder="e.g. identifo"
                onChange={this.handleInput}
              />
            </Field>
          )}

          <Field label="Endpoint">
            <Input
              name="endpoint"
              value={endpoint}
              placeholder="e.g. localhost:27017"
              onChange={this.handleInput}
            />
          </Field>

          <footer className="iap-db-form__footer">
            <Button
              icon={saveIcon}
              type="submit"
            >
              Save changes
            </Button>
          </footer>
        </form>
      </div>
    );
  }
}

export default DatabaseConnectionSettings;
