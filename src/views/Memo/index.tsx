import Editor from 'wangeditor';
import { Link } from 'react-router-dom';

import React, { useCallback, useState, useEffect } from 'react';
import { updateMemo, getMemo } from '../../apis';

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
    console.log('调用了setheight', height, document.documentElement.clientHeight);
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
      setCtx(localStorage.getItem('editor') || '输入后会保存在本地');
    }, 500);
  }, []);

  let syncFlag = false;
  const syncFn = async () => {
    if (syncFlag) return;
    const id = localStorage.getItem('memo_id');
    const content = localStorage.getItem('editor');
    const update_timestamp = localStorage.getItem('update_timestamp');

    const res = await updateMemo({ id: Number.isNaN(Number(id)) ? 10000 : id, content, update_timestamp });
    if (res.code === 200) {
      const { id } = res.data;
      localStorage.setItem('memo_id', id);
      alert('上传成功');
    }
  };

  const downloadFn = async () => {
    if (syncFlag) return;
    const id = localStorage.getItem('memo_id');
    const res = await getMemo({ id: Number.isNaN(Number(id)) ? 10000 : id });
    if (res.code === 200) {
      const { id, content, update_timestamp } = res.data;
      localStorage.setItem('memo_id', id);
      localStorage.setItem('editor', content);
      localStorage.setItem('update_timestamp', update_timestamp);
      setCtx(content);
      alert('下载成功');
    } else {
      alert(res.msg);
    }
  };

  useEffect(() => {
    fetchCtx();
  }, []);

  useEffect(
    () => {
      if (!editor) {
        console.log('init');
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
          localStorage.setItem('editor', newHtml);
          localStorage.setItem('update_timestamp', String(+new Date()));
          console.log('newHtml', newHtml);
        };
        editor.create();
      }

      editor.txt.html(ctx);
      console.log('editor', editor, ctx);

      return () => {
        console.log('destroy');
        editor && editor.destroy();
        editor = null;
      };
    },
    [ height, ctx ]
  );
  return (
    <div>
      <div className="text-right px-2">
        <button onClick={syncFn} className="btn btn-primary btn-sm m-2">
          上传
        </button>
        <button onClick={downloadFn} className="btn btn-primary btn-sm m-2">
          下载
        </button>
        <Link className="m-2" to="/">
          back
        </Link>
      </div>
      <div id="editer" />
    </div>
  );
}
