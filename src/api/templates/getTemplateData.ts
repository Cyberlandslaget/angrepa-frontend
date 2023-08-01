import { CONFIG } from 'utils/constants';

export const getTemplateNames = async () => {
  return fetch(`${CONFIG.MGMT_SERVER_URL}/templates`)
    .then((res) => res.json())
    .then((data) => data.templates as string[]);
};

export const getTemplate = async (name: string) => {
  return fetch(`${CONFIG.MGMT_SERVER_URL}/templates/${name}`)
    .then((res) => res.body?.getReader().read())
    .then((data) => data?.value);
};

export const downloadTemplate = async (name: string) => {
  window.open(`${CONFIG.MGMT_SERVER_URL}/templates/${name}`, '_blank');
};
