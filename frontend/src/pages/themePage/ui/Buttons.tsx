import {Button} from '@shared/ui';
import {Group} from './group';

export const Buttons = () => {
  return (
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
    </Group>
  );
};
