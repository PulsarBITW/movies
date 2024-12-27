import {Button, Papper} from '@shared/ui';
import {Group} from './ui/group';
import {ButtonV2} from '@shared/ui/buttonV2';

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

      <Group title="Buttons V2">
        <Group title="Primary">
          <ButtonV2 variant="fill" color="primary">
            Fill
          </ButtonV2>
          <ButtonV2 variant="fill" color="primary" disabled>
            Fill disabled
          </ButtonV2>
          <ButtonV2 variant="fill-light" color="primary">
            fill-light
          </ButtonV2>
          <ButtonV2 variant="fill-light" color="primary" disabled>
            fill-light disabled
          </ButtonV2>
          <ButtonV2 variant="outline" color="primary">
            outline-light
          </ButtonV2>
          <ButtonV2 variant="outline" color="primary" disabled>
            outline-light disabled
          </ButtonV2>
          <ButtonV2 variant="ghost" color="primary">
            ghost
          </ButtonV2>
          <ButtonV2 variant="ghost" color="primary" disabled>
            ghost disabled
          </ButtonV2>
        </Group>
        <Group title="Secondary">
          <ButtonV2 variant="fill" color="secondary">
            Fill
          </ButtonV2>
          <ButtonV2 variant="fill" color="secondary" disabled>
            Fill disabled
          </ButtonV2>
          <ButtonV2 variant="fill-light" color="secondary">
            fill-light
          </ButtonV2>
          <ButtonV2 variant="fill-light" color="secondary" disabled>
            fill-light disabled
          </ButtonV2>
          <ButtonV2 variant="outline" color="secondary">
            outline-light
          </ButtonV2>
          <ButtonV2 variant="outline" color="secondary" disabled>
            outline-light disabled
          </ButtonV2>
          <ButtonV2 variant="ghost" color="secondary">
            ghost
          </ButtonV2>
          <ButtonV2 variant="ghost" color="secondary" disabled>
            ghost disabled
          </ButtonV2>
        </Group>
        <Group title="Success">
          <ButtonV2 variant="fill" color="success">
            Fill
          </ButtonV2>
          <ButtonV2 variant="fill" color="success" disabled>
            Fill disabled
          </ButtonV2>
          <ButtonV2 variant="fill-light" color="success">
            fill-light
          </ButtonV2>
          <ButtonV2 variant="fill-light" color="success" disabled>
            fill-light disabled
          </ButtonV2>
          <ButtonV2 variant="outline" color="success">
            outline-light
          </ButtonV2>
          <ButtonV2 variant="outline" color="success" disabled>
            outline-light disabled
          </ButtonV2>
          <ButtonV2 variant="ghost" color="success">
            ghost
          </ButtonV2>
          <ButtonV2 variant="ghost" color="success" disabled>
            ghost disabled
          </ButtonV2>
        </Group>
        <Group title="Destructive">
          <ButtonV2 variant="fill" color="destructive">
            Fill
          </ButtonV2>
          <ButtonV2 variant="fill" color="destructive" disabled>
            Fill disabled
          </ButtonV2>
          <ButtonV2 variant="fill-light" color="destructive">
            fill-light
          </ButtonV2>
          <ButtonV2 variant="fill-light" color="destructive" disabled>
            fill-light disabled
          </ButtonV2>
          <ButtonV2 variant="outline" color="destructive">
            outline-light
          </ButtonV2>
          <ButtonV2 variant="outline" color="destructive" disabled>
            outline-light disabled
          </ButtonV2>
          <ButtonV2 variant="ghost" color="destructive">
            ghost
          </ButtonV2>
          <ButtonV2 variant="ghost" color="destructive" disabled>
            ghost disabled
          </ButtonV2>
        </Group>
        <Group title="Default variants">
          <ButtonV2>without variant</ButtonV2>
          <ButtonV2 variant="fill">fill</ButtonV2>
          <ButtonV2 variant="fill-light">fill-light</ButtonV2>
          <ButtonV2 variant="outline">outline</ButtonV2>
          <ButtonV2 variant="ghost">ghost</ButtonV2>
        </Group>
        {/* <ButtonV2 disabled>Primary Disabled</ButtonV2> */}

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
