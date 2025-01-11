import {EmblaCarouselType, OptionsHandlerType} from 'embla-carousel';
import {CreateOptionsType} from 'embla-carousel/components/Options';
import {CreatePluginType} from 'embla-carousel/components/Plugins';

export type SlideOnWheelUserOptions = {
  enableShiftToSlide?: boolean;
  target?: HTMLElement;
};

export type SlideOnWheelPluginOptions = CreateOptionsType<SlideOnWheelUserOptions>;

// eslint-disable-next-line
type SlideOnWheelPluginType = CreatePluginType<{}, SlideOnWheelPluginOptions>;

const defaultOptions: SlideOnWheelPluginOptions = {
  breakpoints: {},
  active: true,
  enableShiftToSlide: true,
  target: undefined,
};

/**
 *  @param enableShiftToSlide -  Switch slides only by holding Shift; `boolean`; default `true`
 *  @param target - target for event handlers; default: embla.containerNode().parentNode
 *  */
export function slideOnWheelPlugin(
  userOptions: SlideOnWheelUserOptions = {},
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

    const baseHandler = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) embla.scrollNext();
      else if (event.deltaY < 0) embla.scrollPrev();
    };

    const shiftOnlyHandler = (event: WheelEvent) => {
      if (event.shiftKey) baseHandler(event);
    };

    const onWheelHandler = options.enableShiftToSlide ? shiftOnlyHandler : baseHandler;

    targetNode.addEventListener('wheel', onWheelHandler);

    cleanup = () => {
      targetNode.removeEventListener('wheel', onWheelHandler);
    };
  }

  return {
    name: 'slideOnWheelPlugin',
    options: userOptions,
    init,
    destroy: () => cleanup(),
  };
}
