import {Button, Papper} from '@shared/ui';
import {Group} from './ui/group';

export const ThemePage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-lg bg-foreground p-2">
        <h1 className="font-bold text-text-primary">Theme Page</h1>
      </div>
      <Group title="Buttons">
        <Group title="Primary">
          <Button variant="fill" color="primary">
            Fill
          </Button>
          <Button variant="fill" color="primary" disabled>
            Fill disabled
          </Button>
          <Button variant="fill-light" color="primary">
            fill-light
          </Button>
          <Button variant="fill-light" color="primary" disabled>
            fill-light disabled
          </Button>
          <Button variant="outline" color="primary">
            outline-light
          </Button>
          <Button variant="outline" color="primary" disabled>
            outline-light disabled
          </Button>
          <Button variant="ghost" color="primary">
            ghost
          </Button>
          <Button variant="ghost" color="primary" disabled>
            ghost disabled
          </Button>
        </Group>
        <Group title="Secondary">
          <Button variant="fill" color="secondary">
            Fill
          </Button>
          <Button variant="fill" color="secondary" disabled>
            Fill disabled
          </Button>
          <Button variant="fill-light" color="secondary">
            fill-light
          </Button>
          <Button variant="fill-light" color="secondary" disabled>
            fill-light disabled
          </Button>
          <Button variant="outline" color="secondary">
            outline-light
          </Button>
          <Button variant="outline" color="secondary" disabled>
            outline-light disabled
          </Button>
          <Button variant="ghost" color="secondary">
            ghost
          </Button>
          <Button variant="ghost" color="secondary" disabled>
            ghost disabled
          </Button>
        </Group>
        <Group title="Success">
          <Button variant="fill" color="success">
            Fill
          </Button>
          <Button variant="fill" color="success" disabled>
            Fill disabled
          </Button>
          <Button variant="fill-light" color="success">
            fill-light
          </Button>
          <Button variant="fill-light" color="success" disabled>
            fill-light disabled
          </Button>
          <Button variant="outline" color="success">
            outline-light
          </Button>
          <Button variant="outline" color="success" disabled>
            outline-light disabled
          </Button>
          <Button variant="ghost" color="success">
            ghost
          </Button>
          <Button variant="ghost" color="success" disabled>
            ghost disabled
          </Button>
        </Group>
        <Group title="Destructive">
          <Button variant="fill" color="destructive">
            Fill
          </Button>
          <Button variant="fill" color="destructive" disabled>
            Fill disabled
          </Button>
          <Button variant="fill-light" color="destructive">
            fill-light
          </Button>
          <Button variant="fill-light" color="destructive" disabled>
            fill-light disabled
          </Button>
          <Button variant="outline" color="destructive">
            outline-light
          </Button>
          <Button variant="outline" color="destructive" disabled>
            outline-light disabled
          </Button>
          <Button variant="ghost" color="destructive">
            ghost
          </Button>
          <Button variant="ghost" color="destructive" disabled>
            ghost disabled
          </Button>
        </Group>
        <Group title="Default variants">
          <Button>without variant</Button>
          <Button variant="fill">fill</Button>
          <Button variant="fill-light">fill-light</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
        </Group>
        {/* <Button disabled>Primary Disabled</Button> */}

        {/* <Button variant="outline">Outline</Button>
        <Button disabled variant="outline">
          Outline Disabled
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled variant="ghost">
          Ghost Disabled
        </Button> */}
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
