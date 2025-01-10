import {EmblaCarouselType, OptionsHandlerType} from 'embla-carousel';
import {CreateOptionsType} from 'embla-carousel/components/Options';
import {CreatePluginType} from 'embla-carousel/components/Plugins';

export type SlideOnWheelPluginOptions = CreateOptionsType<{
  forceWheelAxis?: 'x' | 'y';
  target?: HTMLElement;
}>;

// eslint-disable-next-line
type SlideOnWheelPluginType = CreatePluginType<{}, SlideOnWheelPluginOptions>;

const defaultOptions: SlideOnWheelPluginOptions = {
  breakpoints: {},
  active: true,
  forceWheelAxis: undefined,
  target: undefined,
};

export function slideOnWheelPlugin(
  userOptions: SlideOnWheelPluginType['options'] = {},
): SlideOnWheelPluginType {
  let options: SlideOnWheelPluginOptions;
  let cleanup = () => {};

  function init(embla: EmblaCarouselType, optionsHandler: OptionsHandlerType) {
    const {mergeOptions, optionsAtMedia} = optionsHandler;
    const optionsBase = mergeOptions(defaultOptions);
    const allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);

    const targetNode: HTMLElement =
      options.target ?? (embla.containerNode().parentNode as HTMLElement);

    const handleOnWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) embla.scrollNext();
      else if (event.deltaY < 0) embla.scrollPrev();
    };

    targetNode.addEventListener('wheel', handleOnWheel);

    cleanup = () => {
      targetNode.removeEventListener('wheel', handleOnWheel);
    };
  }

  return {
    name: 'slideOnWheelPlugin',
    options: userOptions,
    init,
    destroy: () => cleanup(),
  };
}
