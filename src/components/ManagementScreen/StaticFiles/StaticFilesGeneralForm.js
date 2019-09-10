import React from 'react';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { Select, Option } from '~/components/shared/Select';
import useForm from '~/hooks/useForm';

const [LOCAL, S3] = ['local', 's3'];

const StaticFilesGeneralForm = (props) => {
  const { loading, error, settings, onSubmit } = props;

  const initialValues = {
    type: settings.type || '',
    serverConfigPath: settings.serverConfigPath || '',
    staticFilesLocation: settings.staticFilesLocation || '',
    region: settings.region || '',
  };

  const handleSubmit = (values) => {
    onSubmit(update(settings, values));
  };

  const form = useForm(initialValues, null, handleSubmit);

  React.useEffect(() => {
    if (!settings) return;

    form.setValues(settings);
  }, [settings]);

  return (
    <form className="iap-apps-form" onSubmit={form.handleSubmit}>
      <Field label="Storage Type">
        <Select
          value={form.values.type}
          onChange={value => form.setValue('type', value)}
          placeholder="Select storage type"
        >
          <Option value={LOCAL} title="Local" />
          <Option value={S3} title="S3" />
        </Select>
      </Field>

      <Field label="Server Config Path">
        <Input
          name="serverConfigPath"
          value={form.values.serverConfigPath}
          autoComplete="off"
          placeholder="Specify path to server config"
          onChange={form.handleChange}
          disabled={loading}
        />
      </Field>

      <Field label="Static Files Location">
        <Input
          name="staticFilesLocation"
          value={form.values.staticFilesLocation}
          autoComplete="off"
          placeholder="Specify path to static folder"
          onChange={form.handleChange}
          disabled={loading}
        />
      </Field>

      {form.values.type === S3 && (
        <Field label="Region">
          <Input
            name="region"
            value={form.values.region}
            autoComplete="off"
            placeholder="Specify s3 region"
            onChange={form.handleChange}
            disabled={loading}
          />
        </Field>
      )}

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          Icon={loading ? LoadingIcon : SaveIcon}
          disabled={loading}
          error={!loading && !!error}
        >
          Save Changes
        </Button>
      </footer>
    </form>
  );
};

export default StaticFilesGeneralForm;