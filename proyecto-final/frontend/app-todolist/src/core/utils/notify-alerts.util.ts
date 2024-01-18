import { Notify, QNotifyCreateOptions } from "quasar";

export function qalertNotify(options: QNotifyCreateOptions) {
  const defaultOptions: QNotifyCreateOptions = {
    position: "top",
    color: "positive",
    ...options,
  };
  Notify.create(defaultOptions);
}
