import {Papper} from '@shared/ui';
import {Group} from './group';

export const Text = () => {
  return (
    <Group title="Text">
      {Array.from({length: 4}).map((_, index) => (
        <Papper className="w-full" key={index}>
          <div className="flex flex-col gap-2">
            <div className="text-text-primary">primary primary primary primary</div>
            <div className="text-text-secondary">secondary secondary secondary</div>
            <div className="text-text-muted">muted muted muted muted muted</div>
          </div>
        </Papper>
      ))}
    </Group>
  );
};
