import {Button, Papper} from '@shared/ui';
import {Group} from './ui/group';

export const ThemePage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-lg bg-foreground p-2">
        <h1 className="font-bold text-text-primary">Theme Page</h1>
      </div>
      <Group title="Buttons">
        <Button>Primary</Button>
        <Button disabled>Primary Disabled</Button>
        <Button variant="secondary">secondary</Button>
        <Button disabled variant="secondary">
          Secondary Disabled
        </Button>
        <Button variant="success">Success</Button>
        <Button disabled variant="success">
          Success Disabled
        </Button>
        <Button variant="destructive">Destructive</Button>
        <Button disabled variant="destructive">
          Destructive Disabled
        </Button>
        <Button variant="outline">Outline</Button>
        <Button disabled variant="outline">
          Outline Disabled
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled variant="ghost">
          Ghost Disabled
        </Button>
      </Group>

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
    </div>
  );
};
