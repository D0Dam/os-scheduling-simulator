import type { SlotMapValue } from '../Select';

type GroupedSlot = {
  label: string;
  element: SlotMapValue[];
};

const groupSlotByLabel = (input: SlotMapValue[]) =>
  input.reduce(
    (acc, item) => {
      if (item.groupLabel) {
        const groupIndex = acc.findIndex(
          (group) => 'label' in group && group.label === item.groupLabel
        );

        if (groupIndex === -1) {
          acc.push({ label: item.groupLabel, element: [item] });
        } else {
          const group = acc[groupIndex];

          if ('element' in group) {
            group.element.push(item);
          }
        }
      } else {
        acc.push(item);
      }

      return acc;
    },
    [] as (SlotMapValue | GroupedSlot)[]
  );

export default groupSlotByLabel;
