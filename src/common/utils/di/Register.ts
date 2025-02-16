import { container } from "@common/utils/di/DIContainer";
import { LifecycleType } from "@common/utils/di/types";

export function Register(token: symbol, lifecycle: LifecycleType = LifecycleType.Transient) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    container.register(token, constructor, lifecycle);
  }
}