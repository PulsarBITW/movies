import {EmblaCarouselType, OptionsHandlerType} from 'embla-carousel';
import {CreateOptionsType} from 'embla-carousel/components/Options';
import {CreatePluginType} from 'embla-carousel/components/Plugins';

export type SlideOnArrowPluginOptions = CreateOptionsType<{
  forceWheelAxis?: 'x' | 'y';
  target?: HTMLElement;
}>;

// eslint-disable-next-line
type SlideOnArrowPluginType = CreatePluginType<{}, SlideOnArrowPluginOptions>;

const defaultOptions: SlideOnArrowPluginOptions = {
  breakpoints: {},
  active: true,
  target: undefined,
};

export function slideOnArrowPlugin(
  userOptions: SlideOnArrowPluginType['options'] = {},
): SlideOnArrowPluginType {
  let options: SlideOnArrowPluginOptions;
  let cleanup = () => {};

  function init(embla: EmblaCarouselType, optionsHandler: OptionsHandlerType) {
    const {mergeOptions, optionsAtMedia} = optionsHandler;
    const optionsBase = mergeOptions(defaultOptions);
    const allOptions = mergeOptions(optionsBase, userOptions);
    options = optionsAtMedia(allOptions);

    const targetNode: HTMLElement =
      options.target ?? (embla.containerNode().parentNode as HTMLElement);

    const handleOnKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        embla.scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        embla.scrollNext();
      }
    };

    targetNode.addEventListener('keydown', handleOnKeyDown);

    cleanup = () => {
      targetNode.removeEventListener('keydown', handleOnKeyDown);
    };
  }

  return {
    name: 'slideOnArrowPlugin',
    options: userOptions,
    init,
    destroy: () => cleanup(),
  };
}
