import { Input,Button,List, message, Flex } from 'antd';
import { useRef, useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const { TextArea } = Input;

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const textareaRef = useRef()
  const [listData, setListData] = useState([])

  const generateText = () =>{
    const value = textareaRef.current?.resizableTextArea?.textArea?.value || ''
    const arr = value.split('\n').map(item => item.replace(/^\d+\.?/, '').trim()).filter(Boolean)
    setListData(arr)
  }

  return (
    <div>
       {contextHolder}
      <div style={{padding:'20px'}}><TextArea rows={4} ref={textareaRef} /></div>
      <div style={{padding:'20px',paddingTop: 0}}><Button type='primary' onClick={generateText}>生成</Button></div>
      <List
        bordered
        dataSource={listData}
        renderItem={(item,index) => (
          <List.Item>
            <Flex style={{width: '100%'}}>
              <div style={{marginRight:10}}>{index+1}</div>
              <CopyToClipboard text={item}
                onCopy={() => {
                  messageApi.success(`第${index+1}条复制成功`)
                }}>
                <div style={{flex: 1}}>{item}</div>
              </CopyToClipboard>
            </Flex>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
