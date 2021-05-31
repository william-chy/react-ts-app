import Editor from 'wangeditor';

import React, { useCallback, useState, useEffect } from 'react';

function debounce(fn: Function, wait: number, { maxWait }: { maxWait?: number } = {}) {
  let timerId: any = null;
  let timeLast: number = 0;
  return function debounced(this: any) {
    let context: any = this;
    let args = arguments;
    const timeNow = +new Date();
    if (!timeLast) {
      timeLast = timeNow;
    }
    if (!!maxWait && timeNow - timeLast >= maxWait) {
      clearTimeout(timerId);
      timeLast = timeNow;
      fn.apply(context, args);
      return;
    }
    clearTimeout(timerId);
    timerId = setTimeout(function() {
      fn.apply(context, args);
    }, wait);
  };
}

function throttle(fn: Function, wait: number) {
  return debounce(fn, wait, { maxWait: wait });
}

export default function Memo() {
  const [ height, setheight ] = useState(document.documentElement.clientHeight);
  const [ ctx, setCtx ] = useState('');
  let editor: Editor | null;
  const throttledSet = throttle(() => {
    console.log('调用了setheight');
    setheight(document.documentElement.clientHeight);
  }, 1000);

  useEffect(() => {
    window.addEventListener('resize', throttledSet);
    return () => {
      window.removeEventListener('resize', throttledSet);
    };
  }, []);

  const fetchCtx = useCallback(() => {
    setTimeout(() => {
      setCtx('<p>用 JS 设置的内容</p>');
    }, 500);
  }, []);

  useEffect(
    () => {
      fetchCtx();
    },
    [ fetchCtx ]
  );

  useEffect(
    () => {
      editor = new Editor('#editer');
      editor.config.height = height - 150;
      // 默认情况下，只有 IE 和 旧版 Edge 会使用兼容模式，如果需要在其它浏览器上也使用兼容模式，可以在函数内进行判定
      editor.config.compatibleMode = function() {
        // 返回 true 表示使用兼容模式；返回 false 使用标准模式
        return true;
      };
      editor.config.onchangeTimeout = 500; // 修改为 500 ms
      editor.config.historyMaxSize = 50; // 修改为 50 步
      editor.config.onchange = function(newHtml: string) {
        console.log('newHtml', newHtml);
      };
      editor.create();
      editor.txt.html(ctx);
      console.log('editor', editor, ctx);

      return () => {
        editor && editor.destroy();
        editor = null;
      };
    },
    [ height, ctx ]
  );
  return <div id="editer" />;
}
