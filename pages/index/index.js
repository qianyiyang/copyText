Page({
  data: {
    data: {
      value: undefined,
      listData: []
    },
  },

  onShow(){
    wx.getStorage({
      key: 'list',
      success:(res) => {
        console.log(res.data)
        this.setData({
          listData: res.data || []
        })
      }
    })
  },

  handleText(){
    const arr = this.data.value && this.data.value.replace(/\n/g, '').split(/\d+\./).map(item => item.trim()).filter((item,index) => index !== 0);
    wx.setStorage({
      key:"list",
      data: arr
    })
    this.setData({
      listData: arr || []
    })
  },

  handleCopy(e){
    const {text,index} = e.currentTarget.dataset;
    wx.setClipboardData({
      data: text, // 要复制的文本
      success(res) {
        wx.showToast({
          title: `第${index+1}条复制成功`,
          icon: 'none',
          duration: 1000,
        });
      },
      fail(err) {
        console.error('复制失败', err);
      },
    });
  }
})
