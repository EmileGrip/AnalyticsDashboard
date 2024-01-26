export type IconType = {
  value: string; // Column value
  icon: string; // Use the icon name from iconify (https://iconify.design/icon-sets/mdi/)
};

export type LabelType = {
  value: string; // Column value
  label: string; // Badge label
};

export const icons: IconType[] = [
  {
    value: 's-NF87',
    icon: 'mdi:account-multiple-remove-outline',
  },
  {
    value: 's-NF90',
    icon: 'mdi:phone-cancel-outline',
  },
  {
    value: 's-NF94',
    icon: 'mdi:account-reactivate-outline',
  },
  {
    value: 's-NF96',
    icon: 'mdi:account-multiple-minus-outline',
  },
  {
    value: 's-NF97',
    icon: 'mdi:close-circle-outline',
  },
  {
    value: 's-NF99',
    icon: 'mdi:account-cancel-outline',
  },
  {
    value: 's-EM01',
    icon: 'mdi:lightning-bolt-circle',
  },
  {
    value: 's-FC01',
    icon: 'mdi:bank-transfer-in',
  },
  {
    value: 's-EM02',
    icon: 'mdi:account-cash-outline',
  },
  {
    value: 's-FL01',
    icon: 'mdi:bank-transfer-in',
  },
];

export const labels: LabelType[] = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];
