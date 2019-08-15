import { pause } from '~/utils';

const data = {
  login: {
    loginWith: {
      username: true,
      phone: false,
      federated: false,
    },
    tfaType: 'app',
  },
  externalServices: {
    mailService: 'mock',
    smsService: {
      type: 'mock',
      accountSid: '',
      authToken: '',
      serviceSid: '',
    },
  },
  sessionStorage: {
    type: 'memory',
    sessionDuration: 300,
    address: '',
    password: '',
    db: '',
    region: '',
    endpoint: '',
  },
  staticFiles: {
    serverConfigPath: 'server-config.yaml',
    staticFolderPath: './web/static',
    emailTemplatesPath: './email_templates',
    emailTemplateNames: {
      welcome: 'welcome.html',
      resetPassword: 'reset_password.html',
      invite: 'invite_email.html',
      verify: 'verify_email.html',
      tfa: 'tfa_email.html',
    },
    adminPanelBuildPath: './admin_panel/build',
  },
};

const createSettingsServiceMock = () => {
  const fetchLoginSettings = async () => {
    await pause(400);
    return data.login;
  };

  const updateLoginSettings = async (settings) => {
    await pause(400);
    data.login = settings;
  };

  const fetchExternalServicesSettings = async () => {
    await pause(400);
    return data.externalServices;
  };

  const updateExternalServicesSettings = async (settings) => {
    await pause(400);
    data.externalServices = settings;
  };

  const fetchSessionStorageSettings = async () => {
    await pause(400);
    return data.sessionStorage;
  };

  const updateSessionStorageSettings = async (settings) => {
    await pause(400);
    data.sessionStorage = settings;
  };

  const fetchStaticFilesSettings = async () => {
    await pause(400);
    return data.staticFiles;
  };

  const updateStaticFilesSettings = async (settings) => {
    await pause(400);
    data.staticFiles = settings;
  };

  return {
    fetchLoginSettings,
    updateLoginSettings,
    fetchExternalServicesSettings,
    updateExternalServicesSettings,
    fetchSessionStorageSettings,
    updateSessionStorageSettings,
    fetchStaticFilesSettings,
    updateStaticFilesSettings,
  };
};

export default createSettingsServiceMock;
