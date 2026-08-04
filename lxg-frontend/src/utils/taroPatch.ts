// ============================================
// Taro 4.x 运行时补丁
// 修复 getComponentsAlias 缺少 PureText 映射导致的 removeEventListener 崩溃
// ============================================

import { TaroElement } from '@tarojs/runtime';

let installed = false;

/**
 * Taro 4.x 的 getComponentsAlias 只注册了 StaticText，没有 PureText。
 * 当 text 元素移除最后一个事件监听器且无额外属性时（isHasExtractProp=false），
 * removeEventListener 尝试查找 componentsAlias['pure-text']._num 会崩溃
 * （因为 componentsAlias['pure-text'] 为 undefined）。
 *
 * 此补丁包裹 TaroElement.prototype.removeEventListener，
 * 在 alias 查找失败时安全降级，避免页面崩溃。
 */
export function patchTaroPureTextNodeBug(): void {
  if (process.env.TARO_ENV === 'h5') return;
  if (installed) return;
  if (!TaroElement?.prototype) return;

  const proto = TaroElement.prototype as any;
  if (proto.__pureTextPatched) return;

  const origRemove = proto.removeEventListener;
  if (typeof origRemove !== 'function') return;

  proto.removeEventListener = function (this: any, type: string, handler: any, sideEffect?: boolean) {
    try {
      return origRemove.call(this, type, handler, sideEffect);
    } catch {
      // removeEventListener 因 componentsAlias[value] 为 undefined 而崩溃
      // 静默降级：手动清理 __handlers 防止事件泄漏，不影响核心功能
      try {
        const key = String(type).toLowerCase();
        const handlers = this.__handlers?.[key];
        if (Array.isArray(handlers)) {
          const idx = handlers.findIndex((item: any) => item === handler || item?.oldHandler === handler);
          if (idx !== -1) handlers.splice(idx, 1);
        }
      } catch { /* 忽略 */ }
    }
  };

  proto.__pureTextPatched = true;
  installed = true;
}
