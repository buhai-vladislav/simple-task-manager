import { notification } from 'antd';
import { ReactNode, useCallback } from 'react';
import type {
  ArgsProps,
  NotificationPlacement,
} from 'antd/es/notification/interface';

export enum ToastType {
  INFO,
  SUCCESS,
  ERROR,
}

interface IMessage {
  message: string;
  description?: string;
}

export type ClbType = (
  data: IMessage,
  type: ToastType,
  onClose?: () => void,
) => () => void;

export const useToast = (
  placement: NotificationPlacement,
  duration?: number,
): [ReactNode, ClbType] => {
  const [api, contextHolder] = notification.useNotification();

  const callNotification = (type: ToastType, args: ArgsProps) => {
    switch (type) {
      case ToastType.INFO: {
        api.info(args);
        break;
      }
      case ToastType.ERROR: {
        api.error(args);
        break;
      }
      case ToastType.SUCCESS: {
        api.success(args);
        break;
      }
      default: {
        api.info(args);
        break;
      }
    }
  };

  const openNotification = useCallback(
    (data: IMessage, type: ToastType, onClose?: () => void) => () => {
      const args: ArgsProps = {
        message: data.message,
        duration,
        placement,
        onClose,
      };
      callNotification(type, args);
    },
    [duration, placement],
  );

  return [contextHolder, openNotification];
};
