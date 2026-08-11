import { AppProvider } from './store/AppContext';
import './app.scss';
import { patchTaroPureTextNodeBug } from './utils/taroPatch';

// 修复 Taro 4.x 小程序端 pure-text 节点映射缺失导致的 removeEventListener 崩溃
patchTaroPureTextNodeBug();

function App(props) {
  return (
    <AppProvider>
      {props.children}
    </AppProvider>
  );
}

export default App;
